/**
 * Gemeinsame Oberflächenbausteine für alle Seiten:
 * Kopfzeile, Einstellungsfenster, Kurzmeldungen, Chatdarstellung.
 */

import * as store from './storage.js';
import * as audio from './audio.js';
import { t, L, lang, setLang, applyI18n, onLangChange, initI18n } from './i18n.js';

/* ---------- Kleine Helfer ---------- */

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export const el = (tag, attrs = {}, ...kids) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k === 'text') node.textContent = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else if (k === 'dataset') Object.assign(node.dataset, v);
    else node.setAttribute(k, v === true ? '' : v);
  }
  kids.flat().forEach((c) => c != null && node.append(c));
  return node;
};

export function reducedMotion() {
  return document.documentElement.dataset.motion === 'reduced'
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Stabile Farbe pro Name — für Avatare und Sprechernamen im Gruppenchat. */
export function tintFor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i += 1) h = (h * 31 + name.charCodeAt(i)) % 360;
  return `hsl(${h} 62% 58%)`;
}

export function initials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0] ?? '').join('').toUpperCase();
}

/* ---------- Kurzmeldungen ---------- */

let toastHost = null;

export function toast(message, kind = '') {
  if (!toastHost) {
    toastHost = el('div', { class: 'toast-host', 'aria-live': 'polite' });
    document.body.append(toastHost);
  }
  const node = el('div', { class: `toast ${kind ? `toast-${kind}` : ''}`, text: message });
  toastHost.append(node);
  setTimeout(() => node.remove(), 3200);
}

/* ---------- Darstellung ---------- */

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  store.set('theme', theme);
}

function applyMotion(mode) {
  document.documentElement.dataset.motion = mode;
  store.set('motion', mode);
}

/* ---------- Einstellungsfenster ---------- */

function segment(labelKey, options, currentValue, onPick) {
  const seg = el('div', { class: 'seg', role: 'group' });
  const buttons = options.map(({ value, key }) => {
    const b = el('button', {
      type: 'button',
      'data-i18n': key,
      'aria-pressed': String(value === currentValue),
      onclick: () => {
        buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        audio.sfx.choice();
        onPick(value);
      },
    });
    return b;
  });
  seg.append(...buttons);
  return el('div', { class: 'field' },
    el('span', { class: 'field-label', 'data-i18n': labelKey }),
    seg);
}

function buildDrawer() {
  const panel = el('div', { class: 'drawer-panel', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'settings-title' });
  const drawer = el('div', { class: 'drawer', id: 'settings-drawer' },
    el('button', { class: 'drawer-scrim', type: 'button', 'aria-label': t('settings.close'), onclick: () => closeDrawer() }),
    panel);

  const head = el('div', { style: 'display:flex;align-items:center;gap:.6rem;margin-bottom:1.1rem' },
    el('h2', { id: 'settings-title', 'data-i18n': 'settings.title', style: 'margin:0;font-size:1.15rem;flex:1' }),
    el('button', {
      class: 'btn btn-icon btn-ghost', type: 'button',
      'data-i18n-attr': 'aria-label:settings.close',
      text: '✕', onclick: () => closeDrawer(),
    }));

  const langField = segment('settings.lang',
    [{ value: 'de', key: 'lang.de' }, { value: 'en', key: 'lang.en' }],
    lang(), (v) => setLang(v));
  // Sprachnamen stehen bewusst nicht im Katalog — sie heißen immer gleich.
  langField.querySelectorAll('.seg button').forEach((b, i) => {
    b.removeAttribute('data-i18n');
    b.textContent = i === 0 ? 'Deutsch' : 'English';
  });

  const soundField = segment('settings.sound',
    [{ value: 'on', key: 'common.on' }, { value: 'off', key: 'common.off' }],
    audio.isMuted() ? 'off' : 'on',
    (v) => audio.setMuted(v === 'off'));
  soundField.append(el('span', { class: 'hint', 'data-i18n': 'settings.soundHint' }));

  const vol = el('input', {
    type: 'range', min: '0', max: '1', step: '0.05',
    value: String(audio.getVolume()),
    'data-i18n-attr': 'aria-label:settings.volume',
    oninput: (e) => audio.setVolume(e.target.value),
    onchange: () => audio.sfx.notify(),
  });
  const volField = el('div', { class: 'field' },
    el('span', { class: 'field-label', 'data-i18n': 'settings.volume' }), vol);

  const themeField = segment('settings.theme',
    [{ value: 'dark', key: 'theme.dark' }, { value: 'light', key: 'theme.light' }],
    store.get('theme') || 'dark', applyTheme);

  const motionField = segment('settings.motion',
    [{ value: 'full', key: 'motion.full' }, { value: 'reduced', key: 'motion.reduced' }],
    store.get('motion') || 'full', applyMotion);
  motionField.append(el('span', { class: 'hint', 'data-i18n': 'settings.motionHint' }));

  const resetField = el('div', { class: 'field' },
    el('button', {
      class: 'btn btn-danger', type: 'button', 'data-i18n': 'settings.reset',
      onclick: () => {
        store.resetAll();
        toast(t('settings.resetDone'));
        setTimeout(() => window.location.reload(), 700);
      },
    }),
    el('span', { class: 'hint', 'data-i18n': 'settings.resetHint' }));

  panel.append(head, langField, soundField, volField, themeField, motionField, resetField);
  document.body.append(drawer);
  applyI18n(drawer);
  return drawer;
}

let drawerNode = null;
let lastFocus = null;

export function openDrawer() {
  if (!drawerNode) drawerNode = buildDrawer();
  lastFocus = document.activeElement;
  drawerNode.classList.add('is-open');
  drawerNode.querySelector('.drawer-panel button')?.focus();
}

export function closeDrawer() {
  drawerNode?.classList.remove('is-open');
  lastFocus?.focus?.();
}

/* ---------- Kopfzeile aktivieren ---------- */

export function initChrome(activePage) {
  initI18n();
  audio.initAudio();
  applyTheme(store.get('theme') || 'dark');
  applyMotion(store.get('motion') || 'full');

  document.querySelectorAll('.nav a').forEach((a) => {
    if (a.dataset.page === activePage) a.setAttribute('aria-current', 'page');
  });

  document.querySelectorAll('[data-open-settings]').forEach((b) => {
    b.addEventListener('click', () => openDrawer());
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawerNode?.classList.contains('is-open')) {
      e.stopPropagation();
      closeDrawer();
    }
  });

  onLangChange(() => {
    if (drawerNode) applyI18n(drawerNode);
  });
}

/* ---------- Chatdarstellung ---------- */

/**
 * Hängt eine Nachricht an den Chatverlauf.
 * @param {HTMLElement} body   Behälter (.phone-body)
 * @param {object} m           { from, text, sender, time, image, reactions, kind }
 */
export function addMessage(body, m) {
  if (m.kind === 'system') {
    const line = el('div', { class: 'sys-line', text: L(m.text) });
    body.append(line);
    scrollDown(body);
    return line;
  }

  const mine = m.from === 'me';
  const row = el('div', { class: `msg-row ${mine ? 'from-me' : 'from-them'}` });
  const senderName = m.sender ? L(m.sender) : null;

  if (!mine && m.showAvatar !== false && senderName) {
    row.append(el('div', {
      class: 'avatar avatar-sm',
      style: `background:${tintFor(senderName)}`,
      text: initials(senderName),
      'aria-hidden': 'true',
    }));
  }

  const bubble = el('div', { class: 'bubble' });
  if (!mine && senderName && m.showSender !== false) {
    bubble.append(el('b', { class: 'sender', style: `--tint:${tintFor(senderName)}`, text: senderName }));
  }
  if (m.image) {
    bubble.append(el('div', { class: 'msg-image', text: L(m.image) }));
  }
  if (m.text) {
    bubble.append(el('span', { text: L(m.text) }));
  }
  if (m.reactions?.length) {
    bubble.append(el('div', { class: 'reactions' },
      ...m.reactions.map((r) => el('span', { class: 'reaction', text: r }))));
  }
  if (m.time) bubble.append(el('span', { class: 'time', text: m.time }));

  row.append(bubble);
  body.append(row);
  scrollDown(body);
  return row;
}

/** E-Mail-Kopf (Von / An / Betreff) als eigener Block. */
export function addMailHead(body, mail) {
  const dl = el('dl');
  [['Von / From', L(mail.from)], ['An / To', L(mail.to)], ['Betreff / Subject', L(mail.subject)]]
    .forEach(([k, v]) => {
      dl.append(el('dt', { text: k }), el('dd', { text: v }));
    });
  const head = el('div', { class: 'mail-head' }, dl);
  body.append(head);
  scrollDown(body);
  return head;
}

export function scrollDown(body) {
  body.scrollTop = body.scrollHeight;
}

/** Tippanzeige einblenden und einen Entferner zurückgeben. */
export function showTyping(body, senderName) {
  const row = el('div', { class: 'msg-row from-them' });
  if (senderName) {
    row.append(el('div', {
      class: 'avatar avatar-sm',
      style: `background:${tintFor(senderName)}`,
      text: initials(senderName), 'aria-hidden': 'true',
    }));
  }
  row.append(el('div', { class: 'typing', role: 'status', 'aria-label': t('scam.typing') },
    el('i'), el('i'), el('i')));
  body.append(row);
  scrollDown(body);
  return () => row.remove();
}

/** Nachrichten nacheinander mit Tippanzeige einlaufen lassen. */
export async function playMessages(body, messages, opts = {}) {
  const { onEach, signal } = opts;
  const fast = reducedMotion();
  for (const m of messages) {
    if (signal?.aborted) return;
    const senderName = m.sender ? L(m.sender) : null;
    const mine = m.from === 'me';

    if (!mine && m.kind !== 'system') {
      const chars = (L(m.text) || '').length;
      const think = fast ? 120 : Math.min(1500, 320 + chars * 13);
      const stop = showTyping(body, senderName);
      await sleep(think);
      stop();
      if (signal?.aborted) return;
    } else if (!fast) {
      await sleep(220);
    }

    addMessage(body, m);
    if (m.kind !== 'system') (mine ? audio.sfx.msgOut : audio.sfx.msgIn)();
    onEach?.(m);
    await sleep(fast ? 60 : 260);
  }
}

/* ---------- Anzeigebalken ---------- */

export function meter(labelKey, opts = {}) {
  const fill = el('span', { class: 'meter-fill' });
  const valueNode = el('span', { class: 'meter-value', text: opts.initial ?? '' });
  const node = el('div', { class: 'meter' },
    el('div', { class: 'meter-head' },
      el('span', { 'data-i18n': labelKey, text: t(labelKey) }),
      valueNode),
    el('div', {
      class: 'meter-track', role: 'progressbar',
      'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': '0',
    }, fill));

  return {
    node,
    /** @param {number} pct 0–100 @param {string} [text] Anzeige rechts */
    set(pct, text) {
      const v = Math.max(0, Math.min(100, pct));
      fill.style.width = `${v}%`;
      node.querySelector('.meter-track').setAttribute('aria-valuenow', String(Math.round(v)));
      fill.classList.toggle('is-danger', !!opts.invert && v >= 70);
      fill.classList.toggle('is-warn', !!opts.invert && v >= 40 && v < 70);
      fill.classList.toggle('is-safe', !opts.invert && v >= 60);
      if (text != null) valueNode.textContent = text;
    },
  };
}
