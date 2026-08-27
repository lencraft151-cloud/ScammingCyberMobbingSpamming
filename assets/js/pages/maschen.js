/** Übersichtsseite: Hebel, Begriffe und die kurzen Regeln. */

import { initChrome, el } from '../ui.js';
import { t, L, onLangChange } from '../i18n.js';
import { TACTICS, TACTIC_ORDER } from '../data/tactics.js';
import { GLOSSARY, RULES, CHECKLIST } from '../data/glossary.js';

function renderRules() {
  document.getElementById('rules').replaceChildren(...RULES.map((r, i) => el('div', { class: 'card' },
    el('div', { style: 'display:flex;gap:.6rem;align-items:baseline;margin-bottom:.35rem' },
      el('span', {
        style: 'font-family:var(--mono);font-weight:800;color:var(--accent-2);font-size:.85rem',
        'aria-hidden': 'true', text: String(i + 1).padStart(2, '0'),
      }),
      el('b', { style: 'font-size:1rem', text: L(r.rule) })),
    el('p', { style: 'margin:0;font-size:.89rem;color:var(--text-dim)', text: L(r.text) }))));
}

function renderChecklist() {
  document.getElementById('checklist').replaceChildren(...CHECKLIST.map((c) => el('li', {},
    el('span', { class: 'q', text: L(c.q) }),
    el('span', { class: 'a', text: L(c.a) }))));
}

function renderLevers() {
  document.getElementById('levers').replaceChildren(...TACTIC_ORDER.map((key) => {
    const tac = TACTICS[key];
    return el('details', { class: 'card', style: 'padding:0' },
      el('summary', {
        style: 'display:flex;gap:.7rem;align-items:center;padding:.85rem 1.1rem;cursor:pointer;font-weight:700',
      },
      el('span', { style: 'font-size:1.3rem', 'aria-hidden': 'true', text: tac.icon }),
      el('span', { text: L(tac.label) })),
      el('div', { style: 'padding:0 1.1rem 1.1rem;display:grid;gap:.7rem' },
        block('learn.how', L(tac.how)),
        block('learn.feels', L(tac.feels)),
        block('learn.counter', L(tac.counter), true)));
  }));
}

function block(labelKey, text, highlight) {
  return el('div', {},
    el('div', {
      style: `font-size:.7rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;margin-bottom:.15rem;color:${highlight ? 'var(--safe)' : 'var(--muted)'}`,
      text: t(labelKey),
    }),
    el('p', { style: 'margin:0;font-size:.9rem', text }));
}

function renderGlossary() {
  const dl = document.getElementById('glossary');
  dl.replaceChildren(...GLOSSARY.flatMap((g, i) => [
    el('dt', {
      style: `font-weight:750;margin-top:${i ? '1rem' : '0'};color:var(--accent-2)`,
      text: L(g.term),
    }),
    el('dd', { style: 'margin:.15rem 0 0;font-size:.9rem;color:var(--text-dim)', text: L(g.text) }),
  ]));
}

function draw() {
  renderRules();
  renderChecklist();
  renderLevers();
  renderGlossary();
}

initChrome('tactics');
draw();
onLangChange(draw);
