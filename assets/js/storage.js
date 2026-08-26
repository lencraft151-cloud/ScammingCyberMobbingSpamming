/**
 * Dauerhafte Einstellungen und Spielfortschritt.
 * Alles bleibt im Browser (localStorage) — keine Server, keine Cookies.
 * Jeder Zugriff ist gekapselt, damit die Seite auch im privaten Modus
 * oder bei blockiertem Speicher weiterläuft.
 */

const KEY = 'durchschaut.v1';

const DEFAULTS = {
  lang: null,          // null => Sprache des Browsers erraten
  sound: true,
  volume: 0.7,
  theme: 'dark',
  motion: 'full',
  scam: {},            // storyId -> { outcome, score, plays, best }
  chat: null,          // { ending, courage, role }
  spam: null,          // { best, survived }
};

let cache = null;

function read() {
  if (cache) return cache;
  let stored = {};
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) stored = JSON.parse(raw) || {};
  } catch {
    // Privater Modus oder Speicher gesperrt — wir laufen dann ohne Persistenz.
  }
  cache = { ...DEFAULTS, ...stored };
  return cache;
}

function write() {
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    /* Nicht speicherbar: kein Grund, das Spiel abzubrechen. */
  }
}

export function get(key) {
  return read()[key];
}

export function set(key, value) {
  read()[key] = value;
  write();
}

/** Ergebnis einer Scam-Story festhalten; behält das beste Resultat. */
export function recordScam(storyId, outcome, score) {
  const state = read();
  const prev = state.scam[storyId] || { plays: 0, best: null };
  const rank = { scammed: 0, close: 1, safe: 2 };
  const isBetter = prev.best == null || rank[outcome] > rank[prev.best];
  state.scam[storyId] = {
    outcome,
    score,
    plays: prev.plays + 1,
    best: isBetter ? outcome : prev.best,
  };
  write();
}

export function scamProgress() {
  const played = read().scam;
  const ids = Object.keys(played);
  return {
    played: ids.length,
    clean: ids.filter((id) => played[id].best === 'safe').length,
    byId: played,
  };
}

export function recordChat(result) {
  set('chat', result);
}

export function recordSpam(result) {
  const prev = read().spam;
  set('spam', {
    survived: result.survived || prev?.survived || false,
    best: Math.max(result.score || 0, prev?.best || 0),
    lastScore: result.score || 0,
  });
}

/** Alles zurücksetzen — im Einstellungsfenster erreichbar. */
export function resetAll() {
  cache = { ...DEFAULTS };
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* egal */
  }
}
