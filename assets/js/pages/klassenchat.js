/**
 * Modus 2 — Cybermobbing im Klassenchat.
 *
 * Der Unterschied zu den Scam-Storys: Entscheidungen laufen unter Zeitdruck
 * ab. Wer nichts anklickt, hat trotzdem entschieden — das Schweigen wird
 * gewertet und am Ende auch so benannt.
 */

import {
  initChrome, el, sleep, meter, toast, learnMode,
  addMessage, playMessages, scrollDown, reducedMotion,
  addTactic, addTeach, addInfo, addChapter,
} from '../ui.js';
import { t, L, onLangChange } from '../i18n.js';
import * as store from '../storage.js';
import * as audio from '../audio.js';
import { StoryRun } from '../engine.js';
import script, { pickEnding } from '../data/klassenchat.js';
import { TACTICS } from '../data/tactics.js';

const view = document.getElementById('view');

let run = null;
let abort = null;
let bodyEl = null;
let footEl = null;
let courageMeter = null;
let miaMeter = null;
let timerHandle = null;

/** Zivilcourage läuft roh von etwa -14 bis +18; für die Anzeige auf 0–100. */
const couragePct = (v) => Math.round(((v + 14) / 32) * 100);
const miaPct = (v) => Math.max(0, Math.min(100, v));

/* ============================================================
   Inhaltshinweis vorab
   ============================================================ */

function showWarning() {
  audio.stopPad();
  view.replaceChildren(el('div', { style: 'max-width:620px;margin-inline:auto' },
    el('div', { class: 'card stack', style: '--gap:1rem' },
      el('h1', { style: 'margin:0;font-size:1.5rem', text: t('chat.warnTitle') }),
      el('p', { style: 'margin:0;color:var(--text-dim)', text: t('chat.warnBody') }),
      el('div', { class: 'note note-safe' },
        el('p', { style: 'margin:0;font-weight:600', text: t('chat.warnHelp') })),
      el('div', { style: 'display:flex;gap:.5rem;flex-wrap:wrap' },
        el('button', { class: 'btn btn-primary', type: 'button', text: t('chat.warnStart'),
                       onclick: () => { audio.sfx.choice(); start(); } }),
        el('a', { class: 'btn btn-ghost', href: './index.html', text: t('chat.warnLeave') })))));
}

/* ============================================================
   Der Chat
   ============================================================ */

function start() {
  abort?.abort();
  abort = new AbortController();
  run = new StoryRun(script, { stats: { courage: 0, mia: 70 } });

  bodyEl = el('div', { class: 'phone-body', 'aria-live': 'polite', 'aria-relevant': 'additions' });
  footEl = el('div', { class: 'phone-foot' });
  courageMeter = meter('chat.courage');
  miaMeter = meter('chat.mia');

  const phone = el('div', { class: 'phone phone-wide' },
    el('div', { class: 'phone-top' },
      el('div', { class: 'avatar', style: 'background:var(--warn);color:#241a02', 'aria-hidden': 'true', text: '8B' }),
      el('div', { class: 'phone-who' },
        el('div', { class: 'name', text: L(script.contact.name) }),
        el('div', { class: 'sub', text: t('chat.groupSub') })),
      el('span', { class: 'chan-badge', text: '27' })),
    bodyEl, footEl);

  view.replaceChildren(el('div', { class: 'stack', style: '--gap:1rem' },
    el('div', { style: 'display:grid;gap:.7rem;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))' },
      courageMeter.node, miaMeter.node),
    phone));

  updateMeters();
  audio.startPad();
  playNode();
}

function updateMeters() {
  const { courage = 0, mia = 70 } = run.stats;
  courageMeter.set(couragePct(courage), String(courage));
  miaMeter.set(miaPct(mia), `${miaPct(mia)} %`);
  // Mias Balken ist eine Warnung, kein Erfolg: er wird rot, wenn es ihr schlecht geht.
  const fill = miaMeter.node.querySelector('.meter-fill');
  fill.classList.toggle('is-danger', miaPct(mia) < 35);
  fill.classList.toggle('is-warn', miaPct(mia) >= 35 && miaPct(mia) < 65);
  fill.classList.toggle('is-safe', miaPct(mia) >= 65);
}

async function playNode() {
  const node = run.node;
  const signal = abort.signal;
  footEl.replaceChildren();

  if (node.chapter) addChapter(bodyEl, node.chapter);

  await playMessages(bodyEl, node.messages || [], { signal });
  if (signal.aborted) return;

  // Im Lernmodus wird benannt, was im Chat gerade psychologisch passiert.
  if (learnMode()) {
    if (node.tactic && TACTICS[node.tactic]) {
      await sleep(reducedMotion() ? 40 : 260);
      if (signal.aborted) return;
      addTactic(bodyEl, TACTICS[node.tactic]);
    }
    if (node.info) {
      await sleep(reducedMotion() ? 40 : 260);
      if (signal.aborted) return;
      addInfo(bodyEl, node.info);
    }
  }

  if (run.finished) {
    await sleep(reducedMotion() ? 100 : 600);
    if (signal.aborted) return;
    finish();
    return;
  }

  renderChoices(node);
}

function renderChoices(node) {
  const wrap = el('div', { class: 'choices', role: 'group' });

  if (node.prompt) {
    footEl.append(el('div', {
      style: 'font-size:.83rem;color:var(--muted);margin-bottom:.5rem',
      text: L(node.prompt),
    }));
  }

  node.choices.forEach((choice, i) => {
    wrap.append(el('button', {
      class: 'choice', type: 'button',
      onclick: () => pick(i, choice),
    },
    el('span', { class: 'key', 'aria-hidden': 'true', text: String(i + 1) }),
    el('span', { text: L(choice.text) })));
  });

  if (node.timer) startTimer(node.timer);
  footEl.append(wrap);
  wrap.querySelector('.choice')?.focus({ preventScroll: true });
}

/** Läuft die Zeit ab, greift die als `timeout` markierte Auswahl. */
function startTimer(seconds) {
  stopTimer();
  const bar = el('span');
  const track = el('div', { class: 'timer' }, bar);
  const label = el('div', { class: 'timer-label' },
    el('span', { text: t('chat.decide') }),
    el('span', { text: `${seconds} ${t('chat.timeLeft')}` }));
  footEl.append(label, track);

  const started = performance.now();
  const total = seconds * 1000;
  let lastWhole = seconds;

  timerHandle = setInterval(() => {
    const left = Math.max(0, total - (performance.now() - started));
    bar.style.transform = `scaleX(${left / total})`;
    const whole = Math.ceil(left / 1000);
    if (whole !== lastWhole) {
      lastWhole = whole;
      label.lastChild.textContent = `${whole} ${t('chat.timeLeft')}`;
      if (whole <= 3 && whole > 0) audio.sfx.tick(true);
    }
    track.classList.toggle('is-urgent', left / total < 0.3);
    if (left <= 0) {
      stopTimer();
      timeoutChoice();
    }
  }, 80);
}

function stopTimer() {
  if (timerHandle) { clearInterval(timerHandle); timerHandle = null; }
}

async function timeoutChoice() {
  const node = run.node;
  footEl.replaceChildren();
  addMessage(bodyEl, { kind: 'system', text: t('chat.silence') });
  toast(t('chat.silenceNote'), 'danger');
  const choice = run.chooseTimeout();
  await afterChoice(choice);
}

async function pick(index, choice) {
  stopTimer();
  audio.sfx.choice();
  footEl.replaceChildren();
  run.choose(index);
  await afterChoice(choice);
}

/** Zeigt die Folge der Entscheidung und geht weiter. */
async function afterChoice(choice) {
  updateMeters();
  if (choice?.echo) {
    await sleep(reducedMotion() ? 60 : 300);
    if (abort.signal.aborted) return;
    addMessage(bodyEl, choice.echo);
    if (choice.echo.from === 'me') audio.sfx.msgOut();
    scrollDown(bodyEl);
  }
  if (learnMode() && choice?.why) {
    await sleep(reducedMotion() ? 60 : 400);
    if (abort.signal.aborted) return;
    addTeach(bodyEl, choice.why, choice.verdict);
  }
  await sleep(reducedMotion() ? 80 : 900);
  if (abort.signal.aborted) return;
  playNode();
}

/* ============================================================
   Auswertung
   ============================================================ */

const TONE_CLASS = { safe: 'verdict-safe', close: 'verdict-close', scammed: 'verdict-scammed' };
const TONE_ICON = { safe: '🫂', close: '😔', scammed: '💔' };

function finish() {
  stopTimer();
  audio.stopPad();
  const result = run.result();
  const courage = result.stats.courage || 0;
  const ending = pickEnding(script, courage);
  store.recordChat({ ending: ending.id, courage, role: ending.id });
  audio.sfx[ending.tone === 'safe' ? 'success' : 'fail']();
  renderEnding(result, ending);
}

function section(titleKey, ...children) {
  return el('section', { class: 'stack', style: '--gap:.6rem;text-align:left;margin-top:1.6rem' },
    el('h3', { style: 'margin:0;font-size:1.02rem', text: t(titleKey) }),
    ...children);
}

const bullets = (items) => el('ul', {
  style: 'margin:0;padding-left:1.15rem;display:grid;gap:.4rem;font-size:.9rem',
}, ...items.map((i) => el('li', { text: L(i) })));

function renderEnding(result, ending) {
  const courage = result.stats.courage || 0;
  const mia = miaPct(result.stats.mia ?? 70);

  const usedTactics = [...new Set(
    run.visited.map((id) => script.nodes[id]?.tactic).filter(Boolean))];
  const tacticList = usedTactics.length
    ? el('ul', { class: 'tactic-list' }, ...usedTactics.map((key) => {
      const tac = TACTICS[key];
      return el('li', {},
        el('span', { class: 'ic', 'aria-hidden': 'true', text: tac.icon }),
        el('div', {},
          el('b', { text: L(tac.label) }),
          el('span', { class: 'how', text: L(tac.how) }),
          el('span', { class: 'counter', text: `↳ ${L(tac.counter)}` })));
    }))
    : null;

  const card = el('div', { class: `verdict ${TONE_CLASS[ending.tone]}` },
    el('div', { class: 'icon', 'aria-hidden': 'true', text: TONE_ICON[ending.tone] }),
    el('div', { class: 'headline', role: 'status', text: L(ending.role) }),
    el('div', { class: 'damage', text: `${t('chat.courage')}: ${courage} · ${t('chat.mia')}: ${mia} %` }),

    section('chat.roleTitle',
      el('p', { style: 'margin:0;font-size:.92rem', text: L(ending.roleWhy) })),

    section('chat.outcomeTitle',
      el('p', { style: 'margin:0;font-size:.92rem', text: L(ending.outcome) })),

    section('scam.replayTitle',
      el('div', { class: 'replay' },
        ...result.replay.map((h, i) => el('div', { class: `replay-item ${h.verdict}` },
          el('span', { class: 'n', 'aria-hidden': 'true', text: String(i + 1) }),
          el('span', { class: 'what', text: h.wasTimeout ? t('chat.silence') : L(h.text) }),
          el('span', { class: 'why', text: L(h.why) }))))),

    section('chat.momentsTitle', bullets(script.moments)),

    tacticList ? section('scam.tacticsTitle', tacticList) : null,

    section('scam.flagsTitle',
      el('ul', { class: 'flaglist' },
        ...result.flags.map((f) => el('li', { class: f.caught ? 'caught' : 'missed' },
          el('span', { class: 'mark', 'aria-hidden': 'true', text: f.caught ? '✅' : '❌' }),
          el('div', {},
            el('b', { text: L(f.label) }),
            el('span', { class: 'flag-why', text: L(f.why) })))))),

    section('chat.helpTitle',
      el('div', { class: 'note note-safe' }, bullets(script.help))),

    section('chat.legalTitle',
      el('p', { style: 'margin:0;font-size:.9rem;color:var(--text-dim)', text: t('chat.legalBody') })),

    el('div', { class: 'verdict-actions' },
      el('button', { class: 'btn btn-primary', type: 'button', text: t('common.again'),
                     onclick: () => { audio.sfx.choice(); start(); } }),
      el('a', { class: 'btn btn-ghost', href: './index.html', text: t('common.overview') })));

  view.replaceChildren(el('div', { style: 'max-width:640px;margin-inline:auto' }, card));
  window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });
}

/* ============================================================
   Start
   ============================================================ */

document.addEventListener('keydown', (e) => {
  if (!run || run.finished || !footEl) return;
  if (e.target.matches('input, textarea')) return;
  const n = Number(e.key);
  if (!Number.isInteger(n) || n < 1 || n > 9) return;
  const btn = footEl.querySelectorAll('.choice')[n - 1];
  if (btn) { e.preventDefault(); btn.click(); }
});

initChrome('chat');
showWarning();

onLangChange(() => {
  stopTimer();
  abort?.abort();
  if (run?.finished) {
    const result = run.result();
    renderEnding(result, pickEnding(script, result.stats.courage || 0));
  } else {
    showWarning();
  }
});
