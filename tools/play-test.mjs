/**
 * Spielt die drei Modi tatsächlich durch, statt sie nur zu laden.
 *
 * Geprüft wird, ob eine Scam-Story bis zu beiden Enden führt, ob im
 * Klassenchat das Ablaufen der Zeit als Schweigen gewertet wird und ob
 * die Spam-Flut auf Klicks in die Falle reagiert.
 *
 * Aufruf:  node tools/play-test.mjs     (Webserver auf Port 8000 nötig)
 */

import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

const BASE = process.env.SMOKE_BASE || 'http://127.0.0.1:8000';
const CHROME = process.env.CHROME_BIN || '/opt/pw-browsers/chromium';
const PORT = 9335;
const shotsAt = process.argv.indexOf('--shots');
const SHOT_DIR = shotsAt >= 0 ? process.argv[shotsAt + 1] : null;

const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, '--no-sandbox',
  '--disable-gpu', '--disable-dev-shm-usage', '--hide-scrollbars', '--window-size=1280,1000',
  '--autoplay-policy=no-user-gesture-required', 'about:blank'], { stdio: 'ignore' });

function socket(url) {
  const ws = new WebSocket(url);
  let id = 0;
  const pending = new Map();
  const errors = [];
  ws.addEventListener('message', (e) => {
    const m = JSON.parse(e.data);
    if (m.id != null && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
    if (m.method === 'Runtime.exceptionThrown') {
      errors.push(m.params.exceptionDetails?.exception?.description || m.params.exceptionDetails?.text);
    }
    if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
      errors.push((m.params.args || []).map((a) => a.value ?? a.description).join(' '));
    }
  });
  const ready = new Promise((r) => ws.addEventListener('open', r, { once: true }));
  const send = (method, params = {}) => {
    const i = ++id;
    ws.send(JSON.stringify({ id: i, method, params }));
    return new Promise((res, rej) => {
      pending.set(i, res);
      setTimeout(() => { if (pending.delete(i)) rej(new Error(`timeout ${method}`)); }, 60000);
    });
  };
  return { ready, send, errors };
}

let browser;
for (let i = 0; i < 60; i += 1) {
  try {
    const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
    if (r.ok) { browser = socket((await r.json()).webSocketDebuggerUrl); await browser.ready; break; }
  } catch { /* noch nicht bereit */ }
  await delay(250);
}

async function openPage(url) {
  const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
  const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const page = socket(list.find((x) => x.id === targetId).webSocketDebuggerUrl);
  await page.ready;
  await page.send('Runtime.enable');
  await page.send('Page.enable');
  await page.send('Page.navigate', { url: BASE + url });
  await delay(1500);
  page.targetId = targetId;
  page.eval = async (expression) => {
    const { result, exceptionDetails } = await page.send('Runtime.evaluate', {
      expression, returnByValue: true, awaitPromise: true,
    });
    if (exceptionDetails) throw new Error(exceptionDetails.exception?.description || 'eval failed');
    return result.value;
  };
  page.shot = async (name) => {
    if (!SHOT_DIR) return;
    await mkdir(SHOT_DIR, { recursive: true });
    const s = await page.send('Page.captureScreenshot', { format: 'png' });
    await writeFile(`${SHOT_DIR}/${name}.png`, Buffer.from(s.data, 'base64'));
  };
  page.close = () => browser.send('Target.closeTarget', { targetId });
  return page;
}

let failures = 0;
const check = (label, ok, detail = '') => {
  if (ok) console.log(`✓ ${label}`);
  else { failures += 1; console.error(`✗ ${label}${detail ? ` — ${detail}` : ''}`); }
};
/** Für Prüfungen, die auf ein zufällig auftauchendes Fenster angewiesen sind. */
const skip = (label, reason) => console.log(`– ${label} (übersprungen: ${reason})`);

/**
 * Klickt eine Auswahl und wartet auf den nächsten Zustand. Manche
 * Entscheidungen öffnen erst ein nachgebautes Log-in-Formular — das wird
 * ausgefüllt und abgeschickt, weil genau das der Scam-Moment ist.
 * `pick` ist ein Index oder 'last' für die jeweils vorsichtigste Wahl.
 */
const advance = `(async (pick) => {
  const btns = [...document.querySelectorAll('.phone-foot .choice')];
  if (!btns.length) return 'keine Auswahl';
  const btn = pick === 'last' ? btns[btns.length - 1] : (btns[pick] || btns[btns.length - 1]);
  btn.click();
  for (let i = 0; i < 120; i++) {
    await new Promise(r => setTimeout(r, 120));
    if (document.querySelector('.verdict')) return 'verdict';
    const form = document.querySelector('.phone-foot form.fakepage');
    if (form) {
      form.querySelectorAll('input').forEach((el, n) => { el.value = '4242 4242 ' + n; });
      form.querySelector('button[type=submit]').click();
      continue;
    }
    if (document.querySelectorAll('.phone-foot .choice').length) return 'weiter';
  }
  return 'timeout';
})`;

try {
  /* ---------- Scam: bis „gescammt" ---------- */
  {
    const p = await openPage('/scam.html#story=paket-sms');
    await p.eval("localStorage.clear()");
    await delay(2500);
    // Ein fester Pfad durch paket-sms, der verlässlich im Schaden endet:
    // Link antippen → Kartendaten eingeben → abwarten statt sperren.
    const risky = [0, 1, 2, 0, 0, 0, 0, 0];
    let state = 'weiter';
    for (const idx of risky) {
      if (state !== 'weiter') break;
      state = await p.eval(`(${advance})(${idx})`);
    }
    const verdict = await p.eval("document.querySelector('.verdict')?.className || ''");
    const headline = await p.eval("document.querySelector('.verdict .headline')?.textContent || ''");
    const flags = await p.eval("document.querySelectorAll('.flaglist li').length");
    const replay = await p.eval("document.querySelectorAll('.replay-item').length");
    check('Scam-Story erreicht ein Ende', state === 'verdict', state);
    check('Ende ist „gescammt"', /verdict-scammed|verdict-close/.test(verdict), verdict);
    check('Ergebnis nennt das Resultat', headline.length > 3, headline);
    check('Warnsignale werden aufgelistet', flags >= 3, `${flags} Einträge`);
    check('Entscheidungen werden zurückgespielt', replay >= 2, `${replay} Einträge`);
    check('Scam-Lauf ohne Konsolenfehler', p.errors.length === 0, p.errors.join(' | '));
    await p.shot('play-scam-verdict');
    await p.close();
  }

  /* ---------- Scam: bis „nicht draufgefallen" ---------- */
  {
    const p = await openPage('/scam.html#story=paket-sms');
    await delay(2500);
    let guard = 0;
    let state = 'weiter';
    // Die letzte Auswahl ist durchweg die vorsichtige.
    while (state === 'weiter' && guard++ < 14) state = await p.eval(`(${advance})('last')`);
    const verdict = await p.eval("document.querySelector('.verdict')?.className || ''");
    check('Vorsichtiger Pfad endet sauber', /verdict-safe/.test(verdict), verdict);
    const stored = await p.eval("JSON.parse(localStorage.getItem('durchschaut.v1') || '{}').scam?.['paket-sms']?.plays || 0");
    check('Fortschritt wird gespeichert', stored >= 2, `plays=${stored}`);
    await p.close();
  }

  /* ---------- Lernmodus ---------- */
  {
    const p = await openPage('/scam.html');
    await p.eval("localStorage.setItem('durchschaut.v1', JSON.stringify({lang:'de',sound:false,learn:true}))");
    await p.eval("location.hash = 'story=paket-sms'");
    await delay(5000);
    const on = await p.eval(`JSON.stringify({
      chapter: !!document.querySelector('.chapter'),
      tactic: !!document.querySelector('.tactic'),
      info: !!document.querySelector('.infobox'),
    })`);
    const parsed = JSON.parse(on);
    check('Lernmodus zeigt Kapitelmarke', parsed.chapter);
    check('Lernmodus benennt den Hebel', parsed.tactic);
    check('Lernmodus zeigt den Hintergrundkasten', parsed.info);

    // Eine Entscheidung treffen: die Erklärung muss direkt danach erscheinen.
    const teach = await p.eval(`(async () => {
      document.querySelectorAll('.phone-foot .choice')[0]?.click();
      for (let i = 0; i < 40; i++) {
        await new Promise(r => setTimeout(r, 150));
        if (document.querySelector('.teach')) return 'da';
      }
      return 'fehlt';
    })()`);
    check('Erklärung erscheint direkt nach der Wahl', teach === 'da', teach);

    // Und mit abgeschaltetem Lernmodus darf nichts davon auftauchen.
    await p.eval("localStorage.setItem('durchschaut.v1', JSON.stringify({lang:'de',sound:false,learn:false}))");
    await p.send('Page.reload', { ignoreCache: true });
    await delay(5000);
    const off = await p.eval(`JSON.stringify({
      tactic: !!document.querySelector('.tactic'),
      info: !!document.querySelector('.infobox'),
      teach: !!document.querySelector('.teach'),
      messages: document.querySelectorAll('.bubble, .sys-line').length,
    })`);
    const o = JSON.parse(off);
    check('Lernmodus aus blendet die Erklärungen aus', !o.tactic && !o.info && !o.teach, off);
    check('Die Geschichte läuft trotzdem', o.messages >= 2, `${o.messages} Nachrichten`);
    check('Lernmodus ohne Konsolenfehler', p.errors.length === 0, p.errors.join(' | '));
    await p.shot('play-lernmodus');
    await p.close();
  }

  /* ---------- Maschen-Seite ---------- */
  {
    const p = await openPage('/maschen.html');
    const counts = await p.eval(`JSON.stringify({
      rules: document.querySelectorAll('#rules .card').length,
      levers: document.querySelectorAll('#levers details').length,
      terms: document.querySelectorAll('#glossary dt').length,
    })`);
    const c = JSON.parse(counts);
    check('Maschen-Seite listet die Regeln', c.rules === 6, counts);
    check('Maschen-Seite listet alle zwölf Hebel', c.levers === 12, counts);
    check('Maschen-Seite listet die Begriffe', c.terms >= 12, counts);
    check('Maschen-Seite ohne Konsolenfehler', p.errors.length === 0, p.errors.join(' | '));
    await p.close();
  }

  /* ---------- Klassenchat: Zeit ablaufen lassen ---------- */
  {
    const p = await openPage('/klassenchat.html');
    await p.eval("document.querySelector('.btn-primary').click()");
    await delay(6000);
    const hasTimer = await p.eval("!!document.querySelector('.timer')");
    check('Klassenchat zeigt einen Zeitbalken', hasTimer);
    const meters = await p.eval("document.querySelectorAll('.meter').length");
    check('Zwei Anzeigen laufen mit', meters >= 2, `${meters} gefunden`);

    // Zeit einmal komplett ablaufen lassen: Schweigen muss gewertet werden.
    const silence = await p.eval(`(async () => {
      for (let i = 0; i < 80; i++) {
        await new Promise(r => setTimeout(r, 250));
        const sys = [...document.querySelectorAll('.sys-line')].map(n => n.textContent);
        if (sys.some(s => /schreibst nichts|type nothing/i.test(s))) return 'gewertet';
      }
      return 'nichts passiert';
    })()`);
    check('Ablaufende Zeit zählt als Schweigen', silence === 'gewertet', silence);
    check('Klassenchat ohne Konsolenfehler', p.errors.length === 0, p.errors.join(' | '));
    await p.shot('play-klassenchat');
    await p.close();
  }

  /* ---------- Klassenchat: bis zum Ende durchklicken ---------- */
  {
    const p = await openPage('/klassenchat.html');
    await p.eval("document.querySelector('.btn-primary').click()");
    const chatStep = `(async () => {
      for (let i = 0; i < 70; i++) {
        await new Promise(r => setTimeout(r, 200));
        if (document.querySelector('.verdict')) return 'ende';
        const b = document.querySelectorAll('.phone-foot .choice');
        if (b.length) { b[0].click(); return 'gewaehlt'; }
      }
      return 'wartet';
    })()`;
    let result = 'gewaehlt';
    for (let step = 0; step < 20 && result === 'gewaehlt'; step += 1) {
      result = await p.eval(chatStep);
    }
    check('Klassenchat erreicht eine Auswertung', result === 'ende', result);
    const role = await p.eval("document.querySelector('.verdict .headline')?.textContent || ''");
    check('Auswertung nennt eine Rolle', role.length > 3, role);
    const help = await p.eval("document.body.innerText.includes('116 111') || document.body.innerText.includes('Childline')");
    check('Auswertung nennt echte Hilfsangebote', help);
    await p.shot('play-klassenchat-ende');
    await p.close();
  }

  /* ---------- Spam-Flut ---------- */
  {
    const p = await openPage('/spam.html');
    await p.eval("document.querySelector('.btn-primary').click()");
    await delay(3500);
    const pops = await p.eval("document.querySelectorAll('.pop').length");
    check('Spam-Fenster erscheinen', pops >= 1, `${pops} offen`);
    await p.shot('play-spam');

    const riskBefore = await p.eval("document.querySelectorAll('.meter-fill')[1]?.style.width || '0%'");
    await p.eval("document.querySelector('.pop .pop-btn.primary')?.click()");
    await delay(600);   // Der Balken wird erst im nächsten Takt aktualisiert.
    const riskAfter = await p.eval("document.querySelectorAll('.meter-fill')[1]?.style.width || '0%'");
    check('Klick in die Falle erhöht das Risiko',
      parseFloat(riskAfter) > parseFloat(riskBefore), `${riskBefore} -> ${riskAfter}`);

    // Das eine Fenster muss verschwinden. Die Gesamtzahl taugt dafür nicht:
    // beim Hydra-Muster öffnen sich beim Schließen absichtlich zwei neue.
    // Welche Fenstertypen offen sind, ist Zufall — deshalb wird auf ein
    // passendes gewartet, statt das erstbeste zu erwischen.
    const closed = await p.eval(`(async () => {
      for (let i = 0; i < 60; i++) {
        const pop = [...document.querySelectorAll('.pop')]
          .find(p => p.dataset.pattern !== 'fakeX' && p.dataset.pattern !== 'hydra');
        if (pop) {
          pop.querySelector('.pop-x').click();
          return pop.isConnected ? 'blieb offen' : 'geschlossen';
        }
        await new Promise(r => setTimeout(r, 250));
      }
      return 'kein passendes Fenster aufgetaucht';
    })()`);
    check('Echtes Schließkreuz schließt das Fenster', closed === 'geschlossen', closed);

    // Ein falsches Schließkreuz darf gerade nicht harmlos sein.
    // Der Risikobalken wird erst im nächsten Takt (100 ms) neu gezeichnet —
    // ohne kurzes Warten liest man immer noch den alten Wert.
    const fakeX = await p.eval(`(async () => {
      const risk = () => parseFloat(document.querySelectorAll('.meter-fill')[1].style.width) || 0;
      for (let i = 0; i < 120; i++) {
        const pop = [...document.querySelectorAll('.pop')].find(p => p.dataset.pattern === 'fakeX');
        if (pop) {
          const before = risk();
          pop.querySelector('.pop-x').click();
          await new Promise(r => setTimeout(r, 400));
          return risk() > before ? 'schadet' : 'schadet nicht (' + before + ' -> ' + risk() + ')';
        }
        await new Promise(r => setTimeout(r, 250));
      }
      return 'nicht aufgetaucht';
    })()`);
    if (fakeX === 'nicht aufgetaucht') {
      skip('Falsches Schließkreuz erhöht das Risiko', 'kein solches Fenster in dieser Runde');
    } else {
      check('Falsches Schließkreuz erhöht das Risiko', fakeX === 'schadet', fakeX);
    }

    // Spiel bis zum Ende treiben, indem gezielt in die Fallen geklickt wird.
    const ended = await p.eval(`(async () => {
      for (let i = 0; i < 60; i++) {
        await new Promise(r => setTimeout(r, 250));
        if (document.querySelector('.verdict')) return 'ende';
        document.querySelector('.pop .pop-btn.primary')?.click();
      }
      return 'kein ende';
    })()`);
    check('Spam-Runde erreicht eine Auswertung', ended === 'ende', ended);
    const traps = await p.eval("document.querySelectorAll('.trap-list li').length + (document.querySelector('.note-safe') ? 1 : 0)");
    check('Auswertung erklärt die Tricks', traps >= 1, `${traps} Einträge`);
    check('Spam-Modus ohne Konsolenfehler', p.errors.length === 0, p.errors.join(' | '));
    await p.shot('play-spam-ende');
    await p.close();
  }

  /* ---------- Abspann ---------- */
  {
    const p = await openPage('/credits.html');
    const blocks = await p.eval("document.querySelectorAll('.roll-block').length");
    check('Abspann hat Inhalt', blocks >= 12, `${blocks} Bausteine`);

    // Er muss von allein laufen: Der Versatz verändert sich über die Zeit.
    const moved = await p.eval(`(async () => {
      const tr = document.getElementById('rollTrack');
      const before = tr.style.transform;
      await new Promise(r => setTimeout(r, 2500));
      return JSON.stringify({ before, after: tr.style.transform });
    })()`);
    const m = JSON.parse(moved);
    check('Abspann läuft von allein durch', m.before !== m.after, moved);

    // Pause muss ihn wirklich anhalten.
    const paused = await p.eval(`(async () => {
      document.querySelectorAll('.roll-controls button')[0].click();
      const tr = document.getElementById('rollTrack');
      const before = tr.style.transform;
      await new Promise(r => setTimeout(r, 1200));
      return before === tr.style.transform ? 'steht' : 'läuft weiter';
    })()`);
    check('Pause hält den Abspann an', paused === 'steht', paused);

    // Die Story-Titel im Abspann kommen aus den Daten, nicht aus fester Liste.
    const listed = await p.eval(
      "document.querySelector('.roll-track').innerText.includes('Das Paket, das nie kam')");
    check('Abspann nennt die echten Story-Titel', listed);

    const asList = await p.eval(`(async () => {
      const btns = [...document.querySelectorAll('.roll-controls button')];
      btns[btns.length - 1].click();
      await new Promise(r => setTimeout(r, 300));
      return document.body.classList.contains('roll-static') ? 'liste' : 'immer noch abspann';
    })()`);
    check('Abspann lässt sich als Liste lesen', asList === 'liste', asList);
    check('Abspann ohne Konsolenfehler', p.errors.length === 0, p.errors.join(' | '));
    await p.shot('play-abspann');
    await p.close();
  }

  /* ---------- Sprachumschalter ---------- */
  {
    const p = await openPage('/index.html');
    const before = await p.eval("document.querySelector('h2')?.textContent || ''");
    await p.eval(`(async () => {
      document.querySelector('[data-open-settings]').click();
      await new Promise(r => setTimeout(r, 300));
      const segs = document.querySelectorAll('.drawer-panel .seg');
      const buttons = [...segs[0].querySelectorAll('button')];
      const target = buttons.find(b => b.textContent !== 'Deutsch') ;
      (document.documentElement.lang === 'de' ? buttons[1] : buttons[0]).click();
      await new Promise(r => setTimeout(r, 400));
    })()`);
    const after = await p.eval("document.querySelector('h2')?.textContent || ''");
    const htmlLang = await p.eval("document.documentElement.lang");
    check('Sprachumschalter ändert die Texte', before !== after && after.length > 0, `${before} -> ${after}`);
    check('Sprachumschalter setzt html[lang]', ['de', 'en'].includes(htmlLang), htmlLang);
    const persisted = await p.eval("JSON.parse(localStorage.getItem('durchschaut.v1') || '{}').lang");
    check('Sprache wird gespeichert', persisted === htmlLang, `${persisted} / ${htmlLang}`);
    await p.close();
  }
} finally {
  chrome.kill();
}

if (failures) {
  console.error(`\n${failures} Prüfung(en) fehlgeschlagen.`);
  process.exit(1);
}
console.log('\nAlle drei Modi lassen sich durchspielen.');
