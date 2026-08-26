/**
 * Modus 1 — Scam-Storys.
 * Drei Ansichten in einem Behälter: Auswahl, laufende Geschichte, Auswertung.
 */

import {
  initChrome, el, esc, toast, sleep, meter,
  addMessage, addMailHead, playMessages, scrollDown, reducedMotion,
} from '../ui.js';
import { t, L, lang, onLangChange } from '../i18n.js';
import * as store from '../storage.js';
import * as audio from '../audio.js';
import { StoryRun } from '../engine.js';
import stories, { storyById } from '../data/scams/index.js';

const view = document.getElementById('view');

/** Laufende Geschichte; null, solange die Auswahl zu sehen ist. */
let run = null;
let currentStory = null;
let abort = null;

/* ============================================================
   Ansicht 1 — Auswahl
   ============================================================ */

const BEST_LABEL = {
  safe: { key: 'scam.bestSafe', cls: 'badge-safe', mark: '✅' },
  close: { key: 'scam.bestClose', cls: 'badge-warn', mark: '⚠️' },
  scammed: { key: 'scam.bestScammed', cls: 'badge-danger', mark: '❌' },
};

function difficultyDots(n) {
  return el('span', { class: 'dots', 'aria-label': `${t('scam.difficulty')} ${n}/3` },
    ...[1, 2, 3].map((i) => el('i', { class: i <= n ? 'on' : '' })));
}

function showPicker() {
  run = null;
  currentStory = null;
  audio.stopPad();
  const progress = store.scamProgress();

  const cards = stories.map((story) => {
    const played = progress.byId[story.id];
    const best = played && BEST_LABEL[played.best];
    return el('button', {
      class: 'story-card', type: 'button',
      onclick: () => { audio.sfx.choice(); startStory(story); },
    },
    el('div', { class: 'top' },
      el('span', { class: 'emoji', 'aria-hidden': 'true', text: story.icon }),
      el('h3', { text: L(story.title) })),
    el('p', { text: L(story.teaser) }),
    el('div', { class: 'foot' },
      difficultyDots(story.difficulty),
      best
        ? el('span', { class: `badge ${best.cls}`, text: `${best.mark} ${t(best.key)}` })
        : el('span', { class: 'badge', text: t('scam.notPlayed') }),
      played ? el('span', { class: 'badge', text: `${played.plays}× ${t('scam.plays')}` }) : null));
  });

  view.replaceChildren(
    el('div', { class: 'stack', style: '--gap:1.4rem' },
      el('div', { class: 'stack', style: '--gap:.5rem' },
        el('h1', { style: 'margin:0', text: t('mode.scam.title') }),
        el('p', { style: 'margin:0;color:var(--text-dim)', text: t('scam.lead') })),
      el('div', { class: 'grid grid-cards' }, ...cards),
      progress.played === stories.length
        ? el('div', { class: 'note note-safe' }, el('p', { style: 'margin:0', text: t('scam.allDone') }))
        : null));

  window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });
}

/* ============================================================
   Ansicht 2 — laufende Geschichte
   ============================================================ */

const CHANNEL_LABEL = {
  sms: 'SMS', whatsapp: 'WhatsApp', instagram: 'Instagram',
  discord: 'Discord', email: 'E-Mail', call: 'Telefon', dating: 'Dating-App',
};

function startStory(story) {
  currentStory = story;
  run = new StoryRun(story);
  abort?.abort();
  abort = new AbortController();
  window.location.hash = `story=${story.id}`;
  renderRunner();
}

let bodyEl = null;
let footEl = null;
let progressMeter = null;

function renderRunner() {
  const story = currentStory;
  bodyEl = el('div', { class: 'phone-body', 'aria-live': 'polite', 'aria-relevant': 'additions' });
  footEl = el('div', { class: 'phone-foot' });
  progressMeter = meter('scam.step');

  const phone = el('div', { class: 'phone' },
    el('div', { class: 'phone-top' },
      el('span', { class: 'back', 'aria-hidden': 'true', text: '‹' }),
      el('div', { class: 'avatar', style: 'background:var(--surface-3);font-size:1.1rem',
                  'aria-hidden': 'true', text: story.icon }),
      el('div', { class: 'phone-who' },
        el('div', { class: 'name', text: L(story.contact.name) }),
        el('div', { class: 'sub', text: L(story.contact.sub) })),
      el('span', { class: 'chan-badge', text: CHANNEL_LABEL[story.channel] || story.channel })),
    bodyEl, footEl);

  view.replaceChildren(
    el('div', { class: 'stack', style: '--gap:1rem' },
      el('div', { class: 'run-head' },
        el('button', {
          class: 'btn btn-sm btn-ghost', type: 'button', text: `← ${t('scam.leave')}`,
          onclick: () => {
            if (run && !run.finished && !window.confirm(t('scam.leaveConfirm'))) return;
            abort?.abort();
            window.location.hash = '';
            showPicker();
          },
        }),
        progressMeter.node),
      phone));

  if (story.channel === 'email') addMailHead(bodyEl, story.mail);
  audio.startPad();
  playNode();
}

async function playNode() {
  const node = run.node;
  const signal = abort.signal;
  footEl.replaceChildren();
  progressMeter.set(run.progress, `${run.visited.length}`);

  await playMessages(bodyEl, node.messages || [], { signal });
  if (signal.aborted) return;

  if (node.page) renderFakePage(node.page);

  if (run.finished) {
    await sleep(reducedMotion() ? 100 : 550);
    if (signal.aborted) return;
    finish();
    return;
  }

  renderChoices(node);
}

function renderFakePage(page) {
  const url = L(page.url);
  const bad = L(page.badPart);
  const idx = bad ? url.indexOf(bad) : -1;
  const urlNode = el('span', { class: 'url' });
  if (idx >= 0) {
    urlNode.append(url.slice(0, idx), el('b', { text: bad }), url.slice(idx + bad.length));
  } else {
    urlNode.textContent = url;
  }

  bodyEl.append(el('div', { class: 'fakepage' },
    el('div', { class: 'fakebar' },
      el('span', { class: 'lock', 'aria-hidden': 'true', text: '⚠' }),
      urlNode),
    el('div', { class: 'fakepage-body' },
      el('h4', { text: L(page.heading) }),
      ...(page.fields || []).map((f) => el('label', {},
        el('span', { text: L(f) }),
        el('input', { type: 'text', disabled: true, placeholder: '' }))))));
  scrollDown(bodyEl);
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
      onclick: () => pick(i, choice, node),
    },
    el('span', { class: 'key', 'aria-hidden': 'true', text: String(i + 1) }),
    el('span', { text: L(choice.text) })));
  });

  footEl.append(wrap);
  wrap.querySelector('.choice')?.focus({ preventScroll: true });
}

/** Ziffern 1–3 wählen die Antwort. */
document.addEventListener('keydown', (e) => {
  if (!run || run.finished || !footEl) return;
  if (e.target.matches('input, textarea')) return;
  const n = Number(e.key);
  if (!Number.isInteger(n) || n < 1 || n > 9) return;
  const btn = footEl.querySelectorAll('.choice')[n - 1];
  if (btn) { e.preventDefault(); btn.click(); }
});

async function pick(index, choice, node) {
  audio.sfx.choice();
  footEl.replaceChildren();

  // Gefälschtes Formular: Das Ausfüllen ist der eigentliche Moment.
  if (choice.form && node.page) {
    const submitted = await askFakeForm(node.page);
    if (!submitted) { renderChoices(node); return; }
  }

  addMessage(bodyEl, { from: 'me', text: choice.text });
  audio.sfx.msgOut();
  await sleep(reducedMotion() ? 80 : 420);
  if (abort.signal.aborted) return;

  run.choose(index);
  playNode();
}

/** Blendet ein ausfüllbares Formular ein; löst mit true auf, wenn abgeschickt wurde. */
function askFakeForm(page) {
  return new Promise((resolve) => {
    const inputs = (page.fields || []).map((f) => el('input', {
      type: 'text', 'aria-label': L(f), placeholder: L(f),
      oninput: () => audio.sfx.typing(),
    }));

    const form = el('form', { class: 'fakepage', onsubmit: (e) => { e.preventDefault(); done(true); } },
      el('div', { class: 'fakebar' },
        el('span', { class: 'lock', 'aria-hidden': 'true', text: '⚠' }),
        el('span', { class: 'url', text: L(page.url) })),
      el('div', { class: 'fakepage-body' },
        el('h4', { text: L(page.heading) }),
        ...(page.fields || []).map((f, i) => el('label', {}, el('span', { text: L(f) }), inputs[i])),
        el('div', { style: 'display:flex;gap:.4rem;margin-top:.2rem' },
          el('button', { class: 'btn btn-primary btn-sm', type: 'submit', text: t('scam.formSend') }),
          el('button', { class: 'btn btn-ghost btn-sm', type: 'button', text: t('scam.formCancel'),
                         onclick: () => done(false) })),
        el('div', { class: 'fakepage-note', text: t('scam.formNote') })));

    footEl.replaceChildren(form);
    inputs[0]?.focus();

    function done(ok) {
      footEl.replaceChildren();
      resolve(ok);
    }
  });
}

/* ============================================================
   Ansicht 3 — Auswertung
   ============================================================ */

const VERDICT = {
  scammed: { cls: 'verdict-scammed', icon: '❌', key: 'scam.verdict.scammed', sound: 'alarm' },
  close: { cls: 'verdict-close', icon: '⚠️', key: 'scam.verdict.close', sound: 'fail' },
  safe: { cls: 'verdict-safe', icon: '✅', key: 'scam.verdict.safe', sound: 'success' },
};

function finish() {
  const result = run.result();
  store.recordScam(currentStory.id, result.outcome, result.score);
  audio.stopPad();
  const v = VERDICT[result.outcome] || VERDICT.safe;
  audio.sfx[v.sound]?.();
  renderVerdict(result, v);
}

function section(titleKey, ...children) {
  return el('section', { class: 'stack', style: '--gap:.6rem;text-align:left;margin-top:1.6rem' },
    el('h3', { style: 'margin:0;font-size:1.02rem', text: t(titleKey) }),
    ...children);
}

function renderVerdict(result, v) {
  const flagsCaught = result.flags.filter((f) => f.caught).length;

  const flagList = el('ul', { class: 'flaglist' },
    ...result.flags.map((f) => el('li', { class: f.caught ? 'caught' : 'missed' },
      el('span', { class: 'mark', 'aria-hidden': 'true', text: f.caught ? '✅' : '❌' }),
      el('div', {},
        el('b', { text: L(f.label) }),
        el('span', { class: 'flag-why', text: L(f.why) })))));

  const replayList = el('div', { class: 'replay' },
    ...result.replay.map((h, i) => el('div', { class: `replay-item ${h.verdict}` },
      el('span', { class: 'n', 'aria-hidden': 'true', text: String(i + 1) }),
      el('span', { class: 'what', text: L(h.text) }),
      el('span', { class: 'why', text: L(h.why) }))));

  const nextStory = stories[(stories.indexOf(currentStory) + 1) % stories.length];

  const card = el('div', { class: `verdict ${v.cls}` },
    el('div', { class: 'icon', 'aria-hidden': 'true', text: v.icon }),
    el('div', { class: 'headline', role: 'status', text: t(v.key) }),
    result.damage ? el('div', { class: 'damage', text: `${t('scam.damage')}: ${L(result.damage)}` }) : null,

    section('scam.flagsTitle',
      el('p', { style: 'margin:0;color:var(--muted);font-size:.85rem',
                text: `${flagsCaught} / ${result.flags.length} ${t('scam.flagsCaught')}` }),
      flagList),

    result.replay.length ? section('scam.replayTitle', replayList) : null,

    result.lessons.length ? section('scam.lessonsTitle',
      el('ul', { style: 'margin:0;padding-left:1.15rem;display:grid;gap:.35rem;font-size:.9rem' },
        ...result.lessons.map((l) => el('li', { text: L(l) })))) : null,

    result.recover.length ? section('scam.whatNowTitle',
      el('div', { class: 'note note-warn' },
        el('ul', { style: 'margin:0;padding-left:1.15rem;display:grid;gap:.35rem;font-size:.9rem' },
          ...result.recover.map((r) => el('li', { text: L(r) }))))) : null,

    el('div', { class: 'verdict-actions' },
      el('button', { class: 'btn btn-primary', type: 'button', text: t('common.again'),
                     onclick: () => { audio.sfx.choice(); startStory(currentStory); } }),
      el('button', { class: 'btn', type: 'button', text: `${t('scam.nextStory')} →`,
                     onclick: () => { audio.sfx.choice(); startStory(nextStory); } }),
      el('button', { class: 'btn btn-ghost', type: 'button', text: t('common.overview'),
                     onclick: () => { audio.sfx.choice(); window.location.hash = ''; showPicker(); } })));

  view.replaceChildren(el('div', { style: 'max-width:640px;margin-inline:auto' }, card));
  window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });
}

/* ============================================================
   Start
   ============================================================ */

initChrome('scam');

function fromHash() {
  const m = /story=([\w-]+)/.exec(window.location.hash);
  const story = m && storyById(m[1]);
  if (story) startStory(story);
  else showPicker();
}

window.addEventListener('hashchange', () => {
  if (!window.location.hash) { abort?.abort(); showPicker(); }
});

// Beim Sprachwechsel die aktuelle Ansicht neu aufbauen; eine laufende
// Geschichte startet dabei bewusst neu, damit der Verlauf einsprachig bleibt.
onLangChange(() => {
  if (run && !run.finished && currentStory) {
    toast(L({ de: 'Story in neuer Sprache neu gestartet.', en: 'Story restarted in the new language.' }));
    startStory(currentStory);
  } else if (run?.finished) {
    const result = run.result();
    renderVerdict(result, VERDICT[result.outcome] || VERDICT.safe);
  } else {
    showPicker();
  }
});

fromHash();
