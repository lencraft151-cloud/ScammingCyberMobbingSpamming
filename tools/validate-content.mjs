/**
 * Prüft die Inhaltsdateien, bevor sie jemand zu Gesicht bekommt.
 *
 * Geprüft wird:
 *   • jedes `next` zeigt auf einen existierenden Knoten
 *   • kein Knoten ist von nirgendwo erreichbar
 *   • jeder Endknoten hat ein `outcome`
 *   • jedes Textfeld hat sowohl `de` als auch `en`
 *   • alle verwendeten Warnsignale sind auch definiert
 *
 * Aufruf:  node tools/validate-content.mjs
 */

import { validateStory } from '../assets/js/engine.js';
import stories from '../assets/js/data/scams/index.js';
import klassenchat, { pickEnding } from '../assets/js/data/klassenchat.js';
import { POPUPS, DARK_PATTERNS, TIPS } from '../assets/js/data/spam.js';

let failures = 0;
const report = (label, problems) => {
  if (problems.length) {
    failures += problems.length;
    console.error(`\n✗ ${label}`);
    problems.forEach((p) => console.error(`    ${p}`));
  } else {
    console.log(`✓ ${label}`);
  }
};

/* ---------- Scam-Storys ---------- */

console.log('Scam-Storys');
const ids = new Set();
for (const story of stories) {
  const problems = validateStory(story, { minEndings: 3 });
  if (ids.has(story.id)) problems.push(`doppelte id "${story.id}"`);
  ids.add(story.id);
  if (!story.icon) problems.push('ohne icon');
  if (!story.channel) problems.push('ohne channel');
  if (!story.difficulty) problems.push('ohne difficulty');
  report(`  ${story.id}`, problems);
}
if (stories.length !== 8) {
  failures += 1;
  console.error(`\n✗ erwartet 8 Storys, gefunden ${stories.length}`);
}

/* ---------- Klassenchat ---------- */

console.log('\nKlassenchat');
// Der Klassenchat hat bewusst nur einen End-Knoten: welcher Ausgang greift,
// ergibt sich aus dem gesammelten Zivilcourage-Wert, nicht aus dem Pfad.
const chatProblems = validateStory(klassenchat, { minEndings: 1 });

const walkBi = (value, path, sink) => {
  if (value == null || typeof value !== 'object') return;
  const keys = Object.keys(value);
  if (keys.includes('de') || keys.includes('en')) {
    if (!value.de) sink.push(`${path}: deutscher Text fehlt`);
    if (!value.en) sink.push(`${path}: englischer Text fehlt`);
    return;
  }
  for (const k of keys) walkBi(value[k], `${path}.${k}`, sink);
};

if (!Array.isArray(klassenchat.endings) || klassenchat.endings.length < 3) {
  chatProblems.push('weniger als 3 Ausgänge definiert');
} else {
  klassenchat.endings.forEach((e, i) => {
    walkBi(e, `endings[${i}]`, chatProblems);
    if (typeof e.min !== 'number') chatProblems.push(`endings[${i}]: ohne min`);
    if (!e.tone) chatProblems.push(`endings[${i}]: ohne tone`);
  });
  // Absteigend sortiert, sonst greift der erste Treffer nie richtig.
  for (let i = 1; i < klassenchat.endings.length; i += 1) {
    if (klassenchat.endings[i].min >= klassenchat.endings[i - 1].min) {
      chatProblems.push(`endings[${i}]: min muss kleiner sein als beim Eintrag davor`);
    }
  }
  // Jeder erreichbare Zivilcourage-Wert muss zu einem Ausgang führen.
  for (let c = -40; c <= 40; c += 1) {
    if (!pickEnding(klassenchat, c)) chatProblems.push(`kein Ausgang für Zivilcourage ${c}`);
  }
}
walkBi(klassenchat.moments, 'moments', chatProblems);
walkBi(klassenchat.help, 'help', chatProblems);
report('  klassenchat', chatProblems);

/* ---------- Spam-Modus ---------- */

console.log('\nSpam-Flut');
const spamProblems = [];
const bilingual = (value, path) => {
  if (value == null) return;
  if (typeof value !== 'object') return;
  const keys = Object.keys(value);
  if (keys.includes('de') || keys.includes('en')) {
    if (!value.de) spamProblems.push(`${path}: deutscher Text fehlt`);
    if (!value.en) spamProblems.push(`${path}: englischer Text fehlt`);
    return;
  }
  for (const k of keys) bilingual(value[k], `${path}.${k}`);
};

const patternKeys = new Set(DARK_PATTERNS.map((p) => p.id));
POPUPS.forEach((p, i) => {
  bilingual(p, `POPUPS[${i}]`);
  if (!p.id) spamProblems.push(`POPUPS[${i}]: ohne id`);
  if (!p.buttons?.length) spamProblems.push(`POPUPS[${i}]: keine Knöpfe`);
  if (p.pattern && !patternKeys.has(p.pattern)) {
    spamProblems.push(`POPUPS[${i}]: unbekanntes Dark Pattern "${p.pattern}"`);
  }
  (p.buttons || []).forEach((b, j) => {
    if (!b.role) spamProblems.push(`POPUPS[${i}].buttons[${j}]: ohne role`);
  });
  if (!(p.buttons || []).some((b) => b.role === 'close' || b.role === 'decline')) {
    spamProblems.push(`POPUPS[${i}]: kein Weg, das Fenster loszuwerden`);
  }
});
DARK_PATTERNS.forEach((p, i) => bilingual(p, `DARK_PATTERNS[${i}]`));
TIPS.forEach((p, i) => bilingual(p, `TIPS[${i}]`));
report('  Popups & Dark Patterns', spamProblems);

/* ---------- Ergebnis ---------- */

if (failures) {
  console.error(`\n${failures} Problem(e) gefunden.`);
  process.exit(1);
}
console.log('\nAlle Inhalte in Ordnung.');
