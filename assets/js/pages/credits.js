/**
 * Credits-Seite.
 *
 * Der Abspann läuft wie im Kino durch. Die Inhalte kommen direkt aus den
 * Datendateien — so stehen im Abspann immer genau die Storys und Hebel,
 * die es auch wirklich gibt.
 */

import { initChrome, el, reducedMotion } from '../ui.js';
import { t, L, lang, onLangChange } from '../i18n.js';
import * as store from '../storage.js';
import * as audio from '../audio.js';
import stories from '../data/scams/index.js';
import { TACTICS, TACTIC_ORDER } from '../data/tactics.js';
import { GLOSSARY } from '../data/glossary.js';

const stage = document.getElementById('rollStage');
const track = document.getElementById('rollTrack');
const bar = document.getElementById('rollBar');

/* ============================================================
   Inhalt des Abspanns
   ============================================================ */

const de = (deText, enText) => (lang() === 'en' ? enText : deText);

const block = (...kids) => el('div', { class: 'roll-block' }, ...kids.filter(Boolean));
const role = (text) => el('div', { class: 'roll-role', text });
const name = (text) => el('p', { class: 'roll-name', text });
const line = (text) => el('p', { class: 'roll-line', text });
const note = (text) => el('p', { class: 'roll-note', text });

function pairs(rows) {
  const grid = el('div', { class: 'roll-pairs' });
  rows.forEach(([l, r]) => {
    grid.append(
      el('span', { class: 'l', text: l }),
      el('span', { class: 'd', 'aria-hidden': 'true', text: '·' }),
      el('span', { class: 'r', text: r }),
    );
  });
  return grid;
}

function buildRoll() {
  const t2 = de;
  return [
    block(
      el('h2', { class: 'roll-title', text: 'Durchschaut!' }),
      el('p', { class: 'roll-sub', text: t2(
        'Ein Lernspiel über Betrug, Mobbing und Spam',
        'A learning game about fraud, bullying and spam') })),

    block(el('hr', { class: 'roll-rule' })),

    block(
      role(t2('Drei Spielmodi', 'Three game modes')),
      pairs([
        [t2('Scam-Storys', 'Scam stories'), t2('acht Geschichten, 118 Szenen', 'eight stories, 118 scenes')],
        [t2('Klassenchat', 'Class chat'), t2('Cybermobbing in Echtzeit', 'cyberbullying in real time')],
        [t2('Spam-Flut', 'Spam flood'), t2('90 Sekunden Dauerbeschuss', '90 seconds of bombardment')],
      ])),

    block(
      role(t2('Die acht Maschen', 'The eight cons')),
      el('ul', { class: 'roll-list' },
        ...stories.map((s) => el('li', { text: `${s.icon}  ${L(s.title)}` })))),

    block(
      role(t2('Die zwölf Hebel', 'The twelve levers')),
      el('ul', { class: 'roll-list' },
        ...TACTIC_ORDER.map((k) => el('li', { text: `${TACTICS[k].icon}  ${L(TACTICS[k].label)}` })))),

    block(el('hr', { class: 'roll-rule' })),

    block(
      role(t2('Wichtig', 'Important')),
      name(t2('Alles hier ist erfunden.', 'Everything here is invented.')),
      note(t2(
        'Sämtliche Namen, Telefonnummern, Adressen, Firmen, Konten und Nachrichten sind frei erfunden. Genannte Marken dienen nur dazu, eine realistische Situation nachzustellen — sie haben mit diesem Projekt nichts zu tun.',
        'Every name, phone number, address, company, account and message is fictional. Brands are named only to make a situation feel realistic — they have nothing to do with this project.'))),

    block(
      role(t2('Technik', 'Built with')),
      pairs([
        [t2('Grundlage', 'Foundation'), t2('HTML, CSS, JavaScript', 'HTML, CSS, JavaScript')],
        [t2('Frameworks', 'Frameworks'), t2('keine', 'none')],
        [t2('Abhängigkeiten', 'Dependencies'), t2('keine', 'none')],
        [t2('Build-Schritt', 'Build step'), t2('keiner', 'none')],
        [t2('Externe Anfragen', 'External requests'), t2('keine', 'none')],
        [t2('Tracking', 'Tracking'), t2('keins', 'none')],
        [t2('Schriften', 'Fonts'), t2('deine Systemschriften', 'your system fonts')],
      ])),

    block(
      role(t2('Ton', 'Sound')),
      name(t2('Jeder Klang entsteht live im Browser.', 'Every sound is generated live in your browser.')),
      note(t2(
        'Oszillatoren, Filter und Rauschen über die Web Audio API. Es gibt keine einzige Audiodatei in diesem Projekt — nichts nachzuladen, nichts zu lizenzieren.',
        'Oscillators, filters and noise through the Web Audio API. There is not one audio file in this project — nothing to download, nothing to license.'))),

    block(
      role(t2('Begriffe erklärt', 'Terms explained')),
      line(`${GLOSSARY.length} ${t2('Begriffe von Smishing bis Money Mule', 'terms from smishing to money mule')}`),
      note(t2('Nachzulesen unter „Maschen & Begriffe".', 'All listed under “Cons & terms”.'))),

    block(el('hr', { class: 'roll-rule' })),

    block(
      role(t2('Wo es echte Hilfe gibt', 'Where to get real help')),
      el('div', { class: 'roll-help' },
        ...(lang() === 'en' ? [
          'Childline (UK) — 0800 1111',
          'Nummer gegen Kummer (DE) — 116 111',
          'Action Fraud (UK) — report online',
          'Suspicious texts — forward to 7726',
          'Card blocking (DE) — 116 116',
        ] : [
          'Nummer gegen Kummer — 116 111',
          'Für Eltern — 0800 111 0 550',
          'Telefonseelsorge — 0800 111 0 111',
          'Verdächtige SMS — weiterleiten an 7726',
          'Karten sperren — 116 116',
          'Polizei — Notruf 110',
        ]).map((x) => el('div', { text: x })))),

    block(
      role(t2('Beratung und Material', 'Advice and material')),
      el('ul', { class: 'roll-list' },
        el('li', { text: 'klicksafe.de' }),
        el('li', { text: 'juuuport.de' }),
        el('li', { text: t2('Verbraucherzentrale', 'Verbraucherzentrale (DE)') }),
        el('li', { text: t2('BSI — Bundesamt für Sicherheit in der Informationstechnik', 'BSI — German federal cyber security office') }))),

    block(el('hr', { class: 'roll-rule' })),

    block(
      role(t2('Lizenz', 'Licence')),
      pairs([
        [t2('Code', 'Code'), 'MIT'],
        [t2('Texte und Szenarien', 'Text and scenarios'), 'CC BY 4.0'],
      ])),

    block(
      role(t2('Idee, Inhalte, Umsetzung', 'Concept, content, build')),
      name('lencraft151-cloud'),
      line(t2('Entwickelt mit Claude Code', 'Developed with Claude Code'))),

    block(
      role(t2('Danke', 'Thank you')),
      note(t2(
        'An alle, die darüber sprechen, wenn es sie erwischt hat. Scham hält diese Maschen am Laufen — nicht ihre Raffinesse.',
        'To everyone who talks about it when it happens to them. Shame keeps these cons running — not their sophistication.'))),

    block(el('hr', { class: 'roll-rule' })),

    block(el('p', { class: 'roll-end', text: t2('Erkennst du die Masche?', 'Can you spot the con?') })),

    // Etwas Luft am Ende, damit die letzte Zeile ganz durchläuft.
    el('div', { style: 'height:40%' }),
  ];
}

/* ============================================================
   Ablauf
   ============================================================ */

const SPEEDS = [0.5, 1, 1.5, 2];
let speedIndex = 1;
let offset = 0;
let playing = false;
let raf = null;
let lastTs = 0;
let staticMode = false;

const distance = () => Math.max(1, track.scrollHeight - stage.clientHeight * 0.15);

function frame(ts) {
  if (!playing) return;
  const dt = lastTs ? Math.min(64, ts - lastTs) : 16;
  lastTs = ts;
  offset += (dt / 1000) * 42 * SPEEDS[speedIndex];
  if (offset >= distance()) {
    offset = distance();
    setPlaying(false);
    audio.sfx.success();
  }
  apply();
  raf = requestAnimationFrame(frame);
}

function apply() {
  track.style.transform = `translateY(${stage.clientHeight - offset}px)`;
  bar.style.width = `${Math.min(100, (offset / distance()) * 100)}%`;
}

function setPlaying(next) {
  playing = next;
  lastTs = 0;
  cancelAnimationFrame(raf);
  if (playing) raf = requestAnimationFrame(frame);
  updateButtons();
}

function restart() {
  offset = 0;
  apply();
  setPlaying(true);
}

/* ---------- Bedienelemente ---------- */

const btnPlay = el('button', { class: 'btn btn-primary is-playback', type: 'button' });
const btnSpeed = el('button', { class: 'btn is-playback', type: 'button' });
const btnRestart = el('button', { class: 'btn btn-ghost is-playback', type: 'button' });
const btnStatic = el('button', { class: 'btn btn-ghost', type: 'button' });

function updateButtons() {
  btnPlay.textContent = playing ? `⏸ ${t('credits.pause')}` : `▶ ${t('credits.play')}`;
  btnSpeed.textContent = `${SPEEDS[speedIndex]}×`;
  btnRestart.textContent = `↻ ${t('credits.restart')}`;
  btnStatic.textContent = staticMode ? t('credits.asRoll') : t('credits.asText');
  btnPlay.setAttribute('aria-pressed', String(playing));
}

btnPlay.addEventListener('click', () => { audio.sfx.choice(); setPlaying(!playing); });
btnSpeed.addEventListener('click', () => {
  audio.sfx.choice();
  speedIndex = (speedIndex + 1) % SPEEDS.length;
  updateButtons();
});
btnRestart.addEventListener('click', () => { audio.sfx.choice(); restart(); });
btnStatic.addEventListener('click', () => { audio.sfx.choice(); setStatic(!staticMode); });

function setStatic(next) {
  staticMode = next;
  document.body.classList.toggle('roll-static', staticMode);
  if (staticMode) {
    setPlaying(false);
    track.style.transform = '';
    bar.style.width = '100%';
  } else {
    restart();
  }
  updateButtons();
}

/* ---------- Aufbau ---------- */

function draw() {
  track.replaceChildren(...buildRoll());
  offset = 0;
  if (!staticMode) apply();
  updateButtons();
}

initChrome('credits');

document.getElementById('rollControls').append(
  btnPlay, btnSpeed, btnRestart, el('span', { class: 'spacer' }), btnStatic);

draw();

// Wer Bewegung reduziert hat, bekommt den Abspann sofort als ruhige Liste.
if (reducedMotion()) {
  setStatic(true);
} else {
  setPlaying(true);
}

// Läuft nur, solange die Seite sichtbar ist — sonst rauscht der Abspann
// im Hintergrund durch, während niemand hinsieht.
document.addEventListener('visibilitychange', () => {
  if (document.hidden && playing) setPlaying(false);
});

onLangChange(() => {
  const wasPlaying = playing;
  draw();
  if (wasPlaying && !staticMode) setPlaying(true);
});

// Leertaste hält an und startet wieder — wie bei jedem Videoplayer.
document.addEventListener('keydown', (e) => {
  if (e.code !== 'Space' || staticMode) return;
  if (e.target.matches('button, a, input, textarea, select')) return;
  e.preventDefault();
  setPlaying(!playing);
});
