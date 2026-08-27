/**
 * Modus 3 — Spam-Flut.
 *
 * Ein Überlebensspiel: 90 Sekunden lang öffnen sich immer schneller
 * Popups. Sie lassen sich alle schließen — aber jedes hat einen großen,
 * einladenden Knopf, der schadet, und einen kleinen, der hilft.
 */

import { initChrome, el, toast, meter, reducedMotion } from '../ui.js';
import { t, L, onLangChange } from '../i18n.js';
import * as store from '../storage.js';
import * as audio from '../audio.js';
import { POPUPS, DARK_PATTERNS, TIPS } from '../data/spam.js';

const view = document.getElementById('view');

const DURATION = 90;      // Sekunden
const MAX_OPEN = 9;       // ab hier ist der Bildschirm dicht
const RISK_PER_HIT = 18;  // Risikoanstieg pro Klick in die Falle

const state = {
  running: false,
  started: 0,
  risk: 0,
  closed: 0,
  open: new Set(),
  traps: new Set(),
  spawnTimer: null,
  tickTimer: null,
  // Nachzügler des „kommt wieder"-Musters, damit sie eine Runde nicht überleben.
  pending: new Set(),
};

let stage = null;
let hud = {};

/* ============================================================
   Startbildschirm
   ============================================================ */

function showIntro() {
  audio.stopPad();
  const rules = ['spam.rule1', 'spam.rule2', 'spam.rule3', 'spam.rule4'];
  view.replaceChildren(el('div', { style: 'max-width:620px;margin-inline:auto' },
    el('div', { class: 'card stack', style: '--gap:1rem' },
      el('h1', { style: 'margin:0;font-size:1.6rem', text: t('mode.spam.title') }),
      el('p', { style: 'margin:0;color:var(--text-dim)', text: t('spam.lead') }),
      el('div', {},
        el('h2', { style: 'font-size:1rem;margin:0 0 .4rem', text: t('spam.rules') }),
        el('ul', { style: 'margin:0;padding-left:1.15rem;display:grid;gap:.3rem;font-size:.9rem' },
          ...rules.map((k) => el('li', { text: t(k) })))),
      el('button', { class: 'btn btn-primary btn-lg', type: 'button', text: t('spam.begin'),
                     onclick: () => { audio.sfx.choice(); startGame(); } }))));
}

/* ============================================================
   Spielaufbau
   ============================================================ */

function startGame() {
  state.pending.forEach(clearTimeout);
  clearTimeout(state.spawnTimer);
  clearInterval(state.tickTimer);
  Object.assign(state, {
    running: true, started: performance.now(),
    risk: 0, closed: 0, open: new Set(), traps: new Set(), pending: new Set(),
  });

  stage = el('div', { class: 'spam-stage', id: 'stage' },
    el('div', { class: 'stage-hint' },
      el('div', { style: 'font-size:2rem', text: '🖥️' }),
      el('div', { text: t('spam.rule4') })));

  hud = {
    time: hudBox('spam.time', `${DURATION}s`),
    score: hudBox('spam.score', '0'),
    annoy: meter('spam.annoy', { invert: true }),
    risk: meter('spam.risk', { invert: true }),
  };

  view.replaceChildren(el('div', {},
    el('div', { class: 'spam-hud' },
      hud.time.node, hud.score.node,
      el('div', { class: 'hud-box' }, hud.annoy.node),
      el('div', { class: 'hud-box' }, hud.risk.node)),
    stage));

  audio.startPad();
  scheduleSpawn();
  state.tickTimer = setInterval(tick, 100);
  spawn();
}

function hudBox(labelKey, initial) {
  const v = el('div', { class: 'v', text: initial });
  return { node: el('div', { class: 'hud-box' }, el('div', { class: 'k', text: t(labelKey) }), v), v };
}

/* ============================================================
   Spielschleife
   ============================================================ */

function elapsed() {
  return (performance.now() - state.started) / 1000;
}

function tick() {
  if (!state.running) return;
  const left = Math.max(0, DURATION - elapsed());
  hud.time.v.textContent = `${Math.ceil(left)}s`;

  const annoy = (state.open.size / MAX_OPEN) * 100;
  hud.annoy.set(annoy, `${state.open.size} / ${MAX_OPEN}`);
  hud.risk.set(state.risk, `${Math.round(state.risk)} %`);
  hud.risk.node.parentElement.classList.toggle('is-danger', state.risk >= 70);

  if (state.risk >= 100) return end('taken');
  if (state.open.size >= MAX_OPEN) return end('drowned');
  if (left <= 0) return end('survived');
}

/** Der Abstand zwischen zwei Popups schrumpft mit der Zeit. */
function scheduleSpawn() {
  if (!state.running) return;
  const progress = Math.min(1, elapsed() / DURATION);
  const gap = 2100 - progress * 1500 + Math.random() * 350;
  state.spawnTimer = setTimeout(() => { spawn(); scheduleSpawn(); }, gap);
}

function pickTemplate() {
  const pool = POPUPS.flatMap((p) => Array(p.weight || 1).fill(p));
  return pool[Math.floor(Math.random() * pool.length)];
}

function spawn(template = pickTemplate()) {
  if (!state.running || state.open.size >= MAX_OPEN) return;
  stage.querySelector('.stage-hint')?.remove();

  const node = buildPopup(template);
  const box = stage.getBoundingClientRect();
  const w = Math.min(270, box.width * 0.82);
  const h = 190;
  node.style.left = `${Math.random() * Math.max(8, box.width - w - 12) + 6}px`;
  node.style.top = `${Math.random() * Math.max(8, box.height - h - 12) + 6}px`;

  stage.append(node);
  state.open.add(node);
  audio.sfx.popup(state.open.size);
}

/* ============================================================
   Ein Popup bauen
   ============================================================ */

function buildPopup(tpl) {
  const node = el('div', {
    class: `pop kind-${tpl.kind} ${reducedMotion() ? '' : 'jitter'}`,
    role: 'dialog', 'aria-label': L(tpl.title),
    dataset: { pattern: tpl.pattern || '' },
  });

  // Das Kreuz oben rechts: manchmal echt, manchmal die Falle selbst.
  const xIsTrap = tpl.pattern === 'fakeX';
  const x = el('button', {
    class: `pop-x ${tpl.pattern === 'runawayX' ? 'runaway' : ''}`,
    type: 'button', 'aria-label': t('settings.close'), text: '✕',
    onclick: () => (xIsTrap ? hit(node, tpl) : close(node, tpl)),
  });

  if (tpl.pattern === 'runawayX') {
    // Das Kreuz weicht dem Zeiger aus — dreimal, dann lässt es sich fangen.
    let dodges = 0;
    x.addEventListener('pointerenter', () => {
      if (dodges >= 3) return;
      dodges += 1;
      state.traps.add('runawayX');
      x.style.transform = `translate(${dodges % 2 ? -26 : 20}px, ${dodges * 7}px)`;
    });
  }

  const body = el('div', { class: 'pop-body' },
    el('div', { class: 'icon', 'aria-hidden': 'true', text: tpl.icon }),
    el('h4', { text: L(tpl.title) }),
    el('p', { text: L(tpl.body) }),
    tpl.fine ? el('p', { class: 'fine', text: L(tpl.fine) }) : null);

  // Ein Balken, der aussieht, als würde er etwas prüfen. Er misst nichts.
  if (tpl.progress) {
    state.traps.add('fakeProgress');
    body.append(el('div', { class: 'pop-scan' }, el('span')));
  }

  if (tpl.countdown) {
    const count = el('span', { class: 'pop-count', text: `00:0${tpl.countdown}` });
    body.append(el('div', {}, count));
    let left = tpl.countdown;
    const iv = setInterval(() => {
      left -= 1;
      if (!node.isConnected || left <= 0) {
        clearInterval(iv);
        if (node.isConnected) {
          // Abgelaufener Countdown wirft ein weiteres Fenster aus.
          state.traps.add('countdown');
          spawn();
        }
        return;
      }
      count.textContent = `00:0${left}`;
    }, 1000);
  }

  // Beim vertauschten Muster steht der harmlose Knopf dort, wo sonst der
  // gefährliche sitzt — die Reihenfolge im DOM bleibt für Screenreader korrekt.
  const actions = el('div', {
    class: `pop-actions ${tpl.pattern === 'wrongSide' ? 'is-swapped' : ''}`,
  },
  ...tpl.buttons.map((b) => el('button', {
    class: `pop-btn ${b.emphasis || ''}`,
    type: 'button', text: L(b.label),
    onclick: () => (b.role === 'malicious' ? hit(node, tpl) : close(node, tpl, b.role)),
  })));
  if (tpl.pattern === 'wrongSide') state.traps.add('wrongSide');
  if (tpl.pattern === 'disguised') state.traps.add('disguised');
  body.append(actions);

  node.append(el('div', { class: 'pop-bar' },
    el('span', { class: 't', text: L(tpl.barTitle) }), x), body);
  return node;
}

/* ---------- Reaktionen ---------- */

function remove(node) {
  state.open.delete(node);
  node.remove();
}

function close(node, tpl, role) {
  if (!state.running) return;
  remove(node);
  state.closed += 1;
  hud.score.v.textContent = String(score());
  audio.sfx.closePopup();

  if (tpl.pattern === 'tinyDecline' && role === 'decline') {
    // Richtig gemacht — aber der Trick hat trotzdem stattgefunden.
    state.traps.add('tinyDecline');
  }
  if (tpl.pattern === 'hydra') {
    state.traps.add('hydra');
    spawn();
    spawn();
  }
  if (tpl.pattern === 'nagging') {
    // Weggeklickt heißt hier nicht weg: nach ein paar Sekunden ist es zurück.
    state.traps.add('nagging');
    const id = setTimeout(() => {
      state.pending.delete(id);
      if (state.running) spawn(tpl);
    }, 3200);
    state.pending.add(id);
  }
}

function hit(node, tpl) {
  if (!state.running) return;
  remove(node);
  state.risk = Math.min(100, state.risk + RISK_PER_HIT);
  if (tpl.pattern) state.traps.add(tpl.pattern);
  audio.sfx.fail();
  toast(L(tpl.title), 'danger');
  // Wer einmal klickt, bekommt Nachschub.
  spawn();
}

/** Esc schließt das oberste echte Fenster — die Tastatur ist die faire Waffe. */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape' || !state.running) return;
  const last = [...state.open].pop();
  if (last) { e.preventDefault(); remove(last); state.closed += 1; audio.sfx.closePopup(); }
});

function score() {
  return state.closed * 10 + Math.round(elapsed()) * 2;
}

/* ============================================================
   Auswertung
   ============================================================ */

const OUTCOME = {
  taken: { cls: 'verdict-scammed', icon: '💀', title: 'spam.overTitle', body: 'spam.overBody' },
  drowned: { cls: 'verdict-close', icon: '🌊', title: 'spam.drownTitle', body: 'spam.drownBody' },
  survived: { cls: 'verdict-safe', icon: '🛡️', title: 'spam.wonTitle', body: 'spam.wonBody' },
};

function end(kind) {
  state.running = false;
  clearTimeout(state.spawnTimer);
  clearInterval(state.tickTimer);
  state.pending.forEach(clearTimeout);
  state.pending.clear();
  audio.stopPad();
  audio.sfx[kind === 'survived' ? 'success' : 'glitch']();

  const finalScore = score();
  store.recordSpam({ survived: kind === 'survived', score: finalScore });
  renderResult(kind, finalScore);
}

function renderResult(kind, finalScore) {
  const o = OUTCOME[kind];
  const caught = DARK_PATTERNS.filter((p) => state.traps.has(p.id));

  const card = el('div', { class: `verdict ${o.cls}` },
    el('div', { class: 'icon', 'aria-hidden': 'true', text: o.icon }),
    el('div', { class: 'headline', role: 'status', text: t(o.title) }),
    el('p', { style: 'margin:.4rem 0 0;color:var(--text-dim);font-size:.93rem', text: t(o.body) }),
    el('div', { class: 'damage', text: `${t('spam.score')}: ${finalScore} · ${state.closed} ${t('spam.closed')}` }),

    el('section', { class: 'stack', style: '--gap:.6rem;text-align:left;margin-top:1.6rem' },
      el('h3', { style: 'margin:0;font-size:1.02rem', text: t('spam.trapsTitle') }),
      caught.length
        ? el('ul', { class: 'trap-list' }, ...caught.map((p) => el('li', {},
            el('b', { text: L(p.label) }),
            el('span', { text: L(p.why) }))))
        : el('div', { class: 'note note-safe' },
            el('p', { style: 'margin:0', text: t('spam.trapsNone') }))),

    el('section', { class: 'stack', style: '--gap:.6rem;text-align:left;margin-top:1.6rem' },
      el('h3', { style: 'margin:0;font-size:1.02rem', text: t('spam.tipsTitle') }),
      el('ul', { style: 'margin:0;padding-left:1.15rem;display:grid;gap:.4rem;font-size:.9rem' },
        ...TIPS.map((tip) => el('li', { text: L(tip) })))),

    el('div', { class: 'verdict-actions' },
      el('button', { class: 'btn btn-primary', type: 'button', text: t('spam.retry'),
                     onclick: () => { audio.sfx.choice(); startGame(); } }),
      el('a', { class: 'btn btn-ghost', href: './index.html', text: t('common.overview') })));

  view.replaceChildren(el('div', { style: 'max-width:640px;margin-inline:auto' }, card));
  window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });
}

/* ============================================================
   Start
   ============================================================ */

initChrome('spam');
showIntro();

onLangChange(() => {
  if (state.running) {
    state.running = false;
    clearTimeout(state.spawnTimer);
    clearInterval(state.tickTimer);
    state.pending.forEach(clearTimeout);
    state.pending.clear();
    audio.stopPad();
  }
  showIntro();
});
