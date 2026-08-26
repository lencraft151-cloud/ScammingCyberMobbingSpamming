/**
 * Klang-Engine.
 *
 * Sämtliche Geräusche entstehen zur Laufzeit über die Web Audio API.
 * Es gibt keine Audiodateien im Projekt: nichts nachzuladen, nichts zu
 * lizenzieren, und die Seite funktioniert offline.
 *
 * Browser erlauben Ton erst nach einer Nutzergeste — der AudioContext wird
 * deshalb beim ersten Klick oder Tastendruck erzeugt.
 */

import * as store from './storage.js';

let ctx = null;
let master = null;
let unlocked = false;
let muted = false;
let volume = 0.7;

/* ---------- Aufbau ---------- */

function build() {
  if (ctx) return true;
  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) return false;
  try {
    ctx = new Ctor();
  } catch {
    return false;
  }
  master = ctx.createGain();
  master.gain.value = muted ? 0 : volume;
  // Weiche Begrenzung, damit gleichzeitige Klänge nicht übersteuern.
  const limiter = ctx.createDynamicsCompressor();
  limiter.threshold.value = -10;
  limiter.knee.value = 22;
  limiter.ratio.value = 12;
  limiter.attack.value = 0.003;
  limiter.release.value = 0.2;
  master.connect(limiter).connect(ctx.destination);
  return true;
}

function unlock() {
  if (!build()) return;
  unlocked = true;
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
}

function live() {
  if (!unlocked || muted || !ctx) return false;
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return true;
}

/* ---------- Bausteine ---------- */

/**
 * Ein Ton mit Hüllkurve.
 * @param {object} o  freq, to (Gleitziel), type, dur, gain, delay, detune
 */
function tone(o = {}) {
  if (!live()) return;
  const {
    freq = 440, to = null, type = 'sine',
    dur = 0.16, gain = 0.2, delay = 0,
    attack = 0.008, detune = 0,
  } = o;
  const t0 = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (to != null) osc.frequency.exponentialRampToValueAtTime(Math.max(to, 1), t0 + dur);
  osc.detune.value = detune;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(Math.max(gain, 0.0002), t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(master);
  osc.start(t0);
  osc.stop(t0 + dur + 0.03);
}

/** Gefiltertes Rauschen — für Klicks, Zischen, Störgeräusche. */
function noise(o = {}) {
  if (!live()) return;
  const { dur = 0.12, gain = 0.12, freq = 1400, q = 1, type = 'bandpass', delay = 0 } = o;
  const t0 = ctx.currentTime + delay;
  const frames = Math.max(1, Math.floor(ctx.sampleRate * dur));
  const buf = ctx.createBuffer(1, frames, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < frames; i += 1) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const filt = ctx.createBiquadFilter();
  filt.type = type;
  filt.frequency.value = freq;
  filt.Q.value = q;
  const g = ctx.createGain();
  g.gain.setValueAtTime(gain, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(filt).connect(g).connect(master);
  src.start(t0);
  src.stop(t0 + dur + 0.02);
}

/* ---------- Benannte Klänge ---------- */

export const sfx = {
  /** Eingehende Nachricht — zwei kurze Töne aufwärts. */
  msgIn() {
    tone({ freq: 660, type: 'sine', dur: 0.09, gain: 0.14 });
    tone({ freq: 880, type: 'sine', dur: 0.13, gain: 0.12, delay: 0.07 });
  },
  /** Gesendete Nachricht — knapper, tiefer. */
  msgOut() {
    tone({ freq: 520, to: 760, type: 'triangle', dur: 0.11, gain: 0.13 });
  },
  /** Einzelner Tastenanschlag beim Schreibmaschineneffekt. */
  typing() {
    noise({ dur: 0.02, gain: 0.03, freq: 2600, q: 0.7 });
  },
  /** Auswahl angeklickt. */
  choice() {
    tone({ freq: 420, to: 620, type: 'square', dur: 0.06, gain: 0.06 });
  },
  /** Neutrale Benachrichtigung. */
  notify() {
    tone({ freq: 990, type: 'sine', dur: 0.1, gain: 0.13 });
    tone({ freq: 1320, type: 'sine', dur: 0.16, gain: 0.1, delay: 0.09 });
  },
  /** Popup springt auf — je höher stack, desto schriller. */
  popup(stack = 0) {
    const f = 700 + Math.min(stack, 9) * 85;
    tone({ freq: f, to: f * 1.5, type: 'square', dur: 0.08, gain: 0.07 });
    noise({ dur: 0.05, gain: 0.05, freq: 3000, q: 0.8 });
  },
  /** Popup geschlossen. */
  closePopup() {
    tone({ freq: 600, to: 240, type: 'triangle', dur: 0.1, gain: 0.09 });
  },
  /** Richtige Entscheidung. */
  success() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      tone({ freq: f, type: 'triangle', dur: 0.26, gain: 0.11, delay: i * 0.085 });
    });
  },
  /** Falsche Entscheidung — abwärts, dumpf. */
  fail() {
    tone({ freq: 300, to: 120, type: 'sawtooth', dur: 0.42, gain: 0.14 });
    tone({ freq: 148, to: 62, type: 'square', dur: 0.5, gain: 0.09, delay: 0.05 });
  },
  /** Ende einer Scam-Story mit Schaden. */
  alarm() {
    for (let i = 0; i < 3; i += 1) {
      tone({ freq: 880, type: 'square', dur: 0.14, gain: 0.11, delay: i * 0.24 });
      tone({ freq: 660, type: 'square', dur: 0.14, gain: 0.11, delay: i * 0.24 + 0.12 });
    }
  },
  /** Gerät übernommen — kaputtes Rauschen. */
  glitch() {
    noise({ dur: 0.5, gain: 0.16, freq: 700, q: 0.4, type: 'lowpass' });
    tone({ freq: 220, to: 40, type: 'sawtooth', dur: 0.7, gain: 0.13 });
    tone({ freq: 233, to: 44, type: 'sawtooth', dur: 0.7, gain: 0.1, detune: 30 });
  },
  /** Sekundenschlag im Countdown. */
  tick(urgent = false) {
    tone({ freq: urgent ? 1000 : 700, type: 'square', dur: 0.03, gain: urgent ? 0.09 : 0.05 });
  },
  /** Punktgewinn. */
  coin() {
    tone({ freq: 988, type: 'square', dur: 0.06, gain: 0.07 });
    tone({ freq: 1319, type: 'square', dur: 0.12, gain: 0.06, delay: 0.055 });
  },
};

/* ---------- Spannungsteppich ---------- */

let pad = null;

/** Leiser, langsam wabernder Flächenklang für angespannte Momente. */
export function startPad() {
  if (!live() || pad) return;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 2.2);

  const filt = ctx.createBiquadFilter();
  filt.type = 'lowpass';
  filt.frequency.value = 420;
  filt.Q.value = 3.5;

  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.value = 0.07;
  lfoGain.gain.value = 190;
  lfo.connect(lfoGain).connect(filt.frequency);

  const a = ctx.createOscillator();
  const b = ctx.createOscillator();
  a.type = b.type = 'sawtooth';
  a.frequency.value = 55;
  b.frequency.value = 55;
  b.detune.value = 11;

  a.connect(filt);
  b.connect(filt);
  filt.connect(g).connect(master);
  [a, b, lfo].forEach((n) => n.start());
  pad = { nodes: [a, b, lfo], gain: g };
}

export function stopPad() {
  if (!pad || !ctx) return;
  const { nodes, gain } = pad;
  pad = null;
  const now = ctx.currentTime;
  try {
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(Math.max(gain.gain.value, 0.0001), now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
  } catch { /* egal */ }
  nodes.forEach((n) => { try { n.stop(now + 0.9); } catch { /* egal */ } });
}

/* ---------- Steuerung ---------- */

export function setMuted(next) {
  muted = !!next;
  store.set('sound', !muted);
  if (master && ctx) {
    master.gain.setTargetAtTime(muted ? 0 : volume, ctx.currentTime, 0.02);
  }
  if (muted) stopPad();
}

export function setVolume(next) {
  volume = Math.min(1, Math.max(0, Number(next) || 0));
  store.set('volume', volume);
  if (master && ctx && !muted) {
    master.gain.setTargetAtTime(volume, ctx.currentTime, 0.02);
  }
}

export function isMuted() { return muted; }
export function getVolume() { return volume; }

export function initAudio() {
  muted = store.get('sound') === false;
  volume = typeof store.get('volume') === 'number' ? store.get('volume') : 0.7;
  const once = () => {
    unlock();
    window.removeEventListener('pointerdown', once);
    window.removeEventListener('keydown', once);
  };
  window.addEventListener('pointerdown', once, { once: true });
  window.addEventListener('keydown', once, { once: true });
}
