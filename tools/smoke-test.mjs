/**
 * Lädt jede Seite in einem echten Chromium und meldet Konsolenfehler.
 *
 * Nutzt das DevTools-Protokoll direkt über den in Node eingebauten
 * WebSocket — damit braucht das Projekt keine einzige Abhängigkeit.
 *
 * Aufruf:  node tools/smoke-test.mjs [--shots verzeichnis]
 * Erwartet einen laufenden Webserver auf http://127.0.0.1:8000
 */

import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

const BASE = process.env.SMOKE_BASE || 'http://127.0.0.1:8000';
const CHROME = process.env.CHROME_BIN || '/opt/pw-browsers/chromium';
const PORT = 9333;

const shotsAt = process.argv.indexOf('--shots');
const SHOT_DIR = shotsAt >= 0 ? process.argv[shotsAt + 1] : null;

// --only home,scam  prüft nur die genannten Seiten (nützlich beim Bauen).
const onlyAt = process.argv.indexOf('--only');
const ONLY = onlyAt >= 0 ? new Set(process.argv[onlyAt + 1].split(',')) : null;

/** Seiten und die Aktionen, die dort ausgeführt werden sollen. */
const PAGES = [
  { path: '/index.html', name: 'home' },
  { path: '/scam.html', name: 'scam-auswahl' },
  { path: '/scam.html#story=paket-sms', name: 'scam-story', settle: 4000 },
  { path: '/klassenchat.html', name: 'klassenchat' },
  { path: '/spam.html', name: 'spam' },
  { path: '/maschen.html', name: 'maschen' },
  { path: '/credits.html', name: 'credits' },
];

/* ---------- Minimaler CDP-Client ---------- */

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.handlers = new Map();
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id != null && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
      } else if (msg.method) {
        (this.handlers.get(msg.method) || []).forEach((fn) => fn(msg.params));
      }
    });
  }

  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      setTimeout(() => {
        if (this.pending.delete(id)) reject(new Error(`Zeitüberschreitung bei ${method}`));
      }, 30000);
    });
  }

  on(method, fn) {
    if (!this.handlers.has(method)) this.handlers.set(method, []);
    this.handlers.get(method).push(fn);
  }
}

async function openSocket(url) {
  const ws = new WebSocket(url);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', () => reject(new Error(`WebSocket zu ${url} fehlgeschlagen`)), { once: true });
  });
  return ws;
}

async function waitForDevtools() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) return (await res.json()).webSocketDebuggerUrl;
    } catch { /* noch nicht bereit */ }
    await delay(250);
  }
  throw new Error('Chromium hat den Debug-Port nicht geöffnet.');
}

/* ---------- Ablauf ---------- */

const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  '--no-sandbox',
  '--disable-gpu',
  '--disable-dev-shm-usage',
  '--hide-scrollbars',
  '--window-size=1280,900',
  '--autoplay-policy=no-user-gesture-required',
  'about:blank',
], { stdio: ['ignore', 'ignore', 'pipe'] });

let failures = 0;

try {
  const browserWsUrl = await waitForDevtools();
  const browser = new CDP(await openSocket(browserWsUrl));
  if (SHOT_DIR) await mkdir(SHOT_DIR, { recursive: true });

  for (const page of PAGES.filter((p) => !ONLY || ONLY.has(p.name))) {
    const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
    const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    const target = list.find((x) => x.id === targetId);
    const cdp = new CDP(await openSocket(target.webSocketDebuggerUrl));

    const problems = [];
    cdp.on('Runtime.exceptionThrown', (p) => {
      problems.push(`Ausnahme: ${p.exceptionDetails?.exception?.description
        || p.exceptionDetails?.text || 'unbekannt'}`);
    });
    cdp.on('Runtime.consoleAPICalled', (p) => {
      if (p.type !== 'error' && p.type !== 'warning') return;
      const text = (p.args || []).map((a) => a.value ?? a.description ?? '').join(' ');
      problems.push(`console.${p.type}: ${text}`);
    });
    cdp.on('Log.entryAdded', (p) => {
      if (p.entry.level !== 'error') return;
      // Fehlendes Favicon o. Ä. interessiert hier nicht.
      if (/favicon/i.test(p.entry.text || '')) return;
      problems.push(`${p.entry.source}: ${p.entry.text}`);
    });

    await cdp.send('Runtime.enable');
    await cdp.send('Log.enable');
    await cdp.send('Page.enable');

    await cdp.send('Page.navigate', { url: BASE + page.path });
    await new Promise((resolve) => {
      const done = () => resolve();
      cdp.on('Page.loadEventFired', done);
      setTimeout(done, 15000);
    });
    await delay(page.settle ?? 1200);

    // Prüfen, dass wirklich unsere Seite dasteht.
    //
    // „Text vorhanden und keine Konsolenfehler" genügt nicht: Chromes eigene
    // Fehlerseite („Diese Seite ist nicht erreichbar") bringt über 150 Zeichen
    // Text mit und führt kein Skript aus, erzeugt also auch keine Fehler.
    // Gegen ein unerreichbares Deployment wäre der Test damit blind.
    const { result } = await cdp.send('Runtime.evaluate', {
      expression: `JSON.stringify({
        url: location.href,
        chars: document.body.innerText.trim().length,
        title: document.title,
        // Jede Seite des Projekts trägt Kopfzeile und Fußzeile.
        chrome: !!document.querySelector('.site-header .brand')
              && !!document.querySelector('.site-footer'),
      })`,
      returnByValue: true,
    });
    const page_ = JSON.parse(result.value);

    if (/^chrome-error:|^about:blank$/.test(page_.url)) {
      problems.push(`Seite nicht geladen — Browser steht auf ${page_.url}`);
    } else if (!page_.chrome) {
      problems.push('Kopf- oder Fußzeile fehlt — das ist nicht unsere Seite');
    } else if (!/Durchschaut/.test(page_.title)) {
      problems.push(`unerwarteter Titel: "${page_.title}"`);
    } else if (page_.chars < 60) {
      problems.push(`Seite wirkt leer (nur ${page_.chars} Zeichen Text)`);
    }

    if (SHOT_DIR) {
      const shot = await cdp.send('Page.captureScreenshot', { format: 'png' });
      await writeFile(`${SHOT_DIR}/${page.name}.png`, Buffer.from(shot.data, 'base64'));
    }

    if (problems.length) {
      failures += problems.length;
      console.error(`✗ ${page.path}`);
      problems.forEach((p) => console.error(`    ${p}`));
    } else {
      console.log(`✓ ${page.path}`);
    }

    await browser.send('Target.closeTarget', { targetId });
  }
} finally {
  chrome.kill();
}

if (failures) {
  console.error(`\n${failures} Problem(e) im Browser gefunden.`);
  process.exit(1);
}
console.log('\nAlle Seiten laden ohne Konsolenfehler.');
