/** Startseite: Modusauswahl und Fortschrittsübersicht. */

import { initChrome, el } from '../ui.js';
import { t, onLangChange } from '../i18n.js';
import * as store from '../storage.js';
import { sfx } from '../audio.js';
import stories from '../data/scams/index.js';

const MODES = [
  { href: './scam.html',        emoji: '🎣', key: 'scam', accent: 'var(--danger)' },
  { href: './klassenchat.html', emoji: '💬', key: 'chat', accent: 'var(--warn)' },
  { href: './spam.html',        emoji: '🌊', key: 'spam', accent: 'var(--accent-2)' },
];

function renderModes() {
  const host = document.getElementById('modes');
  host.replaceChildren(...MODES.map((m) => el('a', {
    class: 'card story-card',
    href: m.href,
    style: `border-top:3px solid ${m.accent}`,
    onclick: () => sfx.choice(),
  },
  el('div', { class: 'top' },
    el('span', { class: 'emoji', 'aria-hidden': 'true', text: m.emoji }),
    el('h3', { text: t(`mode.${m.key}.title`) })),
  el('p', { text: t(`mode.${m.key}.desc`) }),
  el('div', { class: 'foot' },
    el('span', { class: 'badge', text: `${t('home.play')} →` })))));
}

function stat(value, labelKey, tone) {
  return el('div', { style: 'min-width:120px' },
    el('div', {
      style: `font-size:1.8rem;font-weight:800;line-height:1.1;color:${tone || 'var(--text)'}`,
      text: String(value),
    }),
    el('div', { style: 'font-size:.83rem;color:var(--muted)', text: t(labelKey) }));
}

function renderProgress() {
  const host = document.getElementById('progress');
  const scam = store.scamProgress();
  const chat = store.get('chat');
  const spam = store.get('spam');

  if (!scam.played && !chat && !spam) {
    host.replaceChildren(el('p', {
      style: 'margin:0;color:var(--muted)',
      text: t('home.progressNone'),
    }));
    return;
  }

  host.replaceChildren(el('div', {
    style: 'display:flex;flex-wrap:wrap;gap:1.6rem 2.2rem;align-items:flex-start',
  },
  stat(`${scam.played} / ${stories.length}`, 'home.storiesDone'),
  stat(scam.clean, 'home.storiesClean', scam.clean ? 'var(--safe)' : null),
  stat(chat ? '✓' : '–', 'home.chatDone', chat ? 'var(--safe)' : 'var(--muted)'),
  stat(spam?.best ?? '–', 'home.spamBest', spam?.best ? 'var(--accent-2)' : 'var(--muted)')));
}

function draw() {
  renderModes();
  renderProgress();
}

initChrome('home');
draw();
onLangChange(draw);
