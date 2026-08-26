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
import { TACTICS, TACTIC_ORDER } from '../assets/js/data/tactics.js';
import { GLOSSARY, RULES } from '../assets/js/data/glossary.js';
import { readFile, readdir } from 'node:fs/promises';

const TACTIC_KEYS = Object.keys(TACTICS);

/** Läuft rekursiv durch ein Objekt und meldet einsprachige Felder. */
const walkBilingual = (value, path, sink) => {
  if (value == null || typeof value !== 'object') return;
  const keys = Object.keys(value);
  if (keys.includes('de') || keys.includes('en')) {
    if (!value.de) sink.push(`${path}: deutscher Text fehlt`);
    if (!value.en) sink.push(`${path}: englischer Text fehlt`);
    return;
  }
  for (const k of keys) walkBilingual(value[k], `${path}.${k}`, sink);
};

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
  const problems = validateStory(story, { minEndings: 3, tactics: TACTIC_KEYS });
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
const chatProblems = validateStory(klassenchat, { minEndings: 1, tactics: TACTIC_KEYS });

const walkBi = walkBilingual;

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

/* ---------- Hebel, Begriffe und Regeln ---------- */

console.log('\nHebel & Begriffe');
const learnProblems = [];
TACTIC_KEYS.forEach((key) => {
  const tac = TACTICS[key];
  walkBilingual(tac, `TACTICS.${key}`, learnProblems);
  ['label', 'how', 'feels', 'counter'].forEach((field) => {
    if (!tac[field]) learnProblems.push(`TACTICS.${key}: ${field} fehlt`);
  });
  if (!tac.icon) learnProblems.push(`TACTICS.${key}: icon fehlt`);
});
// Die Übersichtsseite läuft über TACTIC_ORDER — dort muss jeder Hebel genau einmal stehen.
TACTIC_KEYS.forEach((key) => {
  if (!TACTIC_ORDER.includes(key)) learnProblems.push(`TACTIC_ORDER: "${key}" fehlt`);
});
TACTIC_ORDER.forEach((key) => {
  if (!TACTICS[key]) learnProblems.push(`TACTIC_ORDER: "${key}" existiert nicht`);
});
if (new Set(TACTIC_ORDER).size !== TACTIC_ORDER.length) {
  learnProblems.push('TACTIC_ORDER enthält Doppelungen');
}
GLOSSARY.forEach((g, i) => {
  walkBilingual(g, `GLOSSARY[${i}]`, learnProblems);
  if (!g.term || !g.text) learnProblems.push(`GLOSSARY[${i}]: unvollständig`);
});
RULES.forEach((r, i) => {
  walkBilingual(r, `RULES[${i}]`, learnProblems);
  if (!r.rule || !r.text) learnProblems.push(`RULES[${i}]: unvollständig`);
});
report(`  ${TACTIC_KEYS.length} Hebel, ${GLOSSARY.length} Begriffe, ${RULES.length} Regeln`, learnProblems);

/* ---------- Oberflächentexte ---------- */

// Jeder data-i18n-Schlüssel im HTML muss in beiden Sprachen existieren,
// sonst steht auf der Seite später der nackte Schlüssel.
console.log('\nOberflächentexte');
const i18nSource = await readFile(new URL('../assets/js/i18n.js', import.meta.url), 'utf8');
const catalogues = {};
for (const langMatch of i18nSource.matchAll(/^  (de|en): \{$([\s\S]*?)^  \},$/gm)) {
  catalogues[langMatch[1]] = new Set(
    [...langMatch[2].matchAll(/^\s*'([\w.]+)':/gm)].map((m) => m[1]));
}

const uiProblems = [];
for (const lang of ['de', 'en']) {
  if (!catalogues[lang]) uiProblems.push(`Katalog "${lang}" nicht gefunden`);
}
if (catalogues.de && catalogues.en) {
  [...catalogues.de].forEach((k) => {
    if (!catalogues.en.has(k)) uiProblems.push(`"${k}" fehlt im englischen Katalog`);
  });
  [...catalogues.en].forEach((k) => {
    if (!catalogues.de.has(k)) uiProblems.push(`"${k}" fehlt im deutschen Katalog`);
  });
}

const root = new URL('../', import.meta.url);
const htmlFiles = (await readdir(root)).filter((f) => f.endsWith('.html'));
for (const file of htmlFiles) {
  const html = await readFile(new URL(file, root), 'utf8');
  const keys = [
    ...[...html.matchAll(/data-i18n="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/data-i18n-attr="([^"]+)"/g)]
      .flatMap((m) => m[1].split(';').map((pair) => pair.split(':')[1]?.trim()).filter(Boolean)),
  ];
  keys.forEach((k) => {
    if (!catalogues.de?.has(k)) uiProblems.push(`${file}: "${k}" fehlt im deutschen Katalog`);
    if (!catalogues.en?.has(k)) uiProblems.push(`${file}: "${k}" fehlt im englischen Katalog`);
  });
  // Zweisprachige Fließtextblöcke müssen paarweise auftreten.
  const de = (html.match(/data-lang="de"/g) || []).length;
  const en = (html.match(/data-lang="en"/g) || []).length;
  if (de !== en) uiProblems.push(`${file}: ${de} deutsche, aber ${en} englische Textblöcke`);
}

// Auch die aus dem JavaScript heraus gesetzten Schlüssel prüfen.
for (const dir of ['../assets/js', '../assets/js/pages']) {
  const base = new URL(`${dir}/`, import.meta.url);
  for (const file of (await readdir(base)).filter((f) => f.endsWith('.js'))) {
    const code = await readFile(new URL(file, base), 'utf8');
    for (const m of code.matchAll(/\bt\('([\w.]+)'\)/g)) {
      if (!catalogues.de?.has(m[1])) uiProblems.push(`${file}: t('${m[1]}') fehlt im deutschen Katalog`);
      if (!catalogues.en?.has(m[1])) uiProblems.push(`${file}: t('${m[1]}') fehlt im englischen Katalog`);
    }
    for (const m of code.matchAll(/'data-i18n': '([\w.]+)'/g)) {
      if (!catalogues.de?.has(m[1])) uiProblems.push(`${file}: data-i18n "${m[1]}" fehlt (de)`);
      if (!catalogues.en?.has(m[1])) uiProblems.push(`${file}: data-i18n "${m[1]}" fehlt (en)`);
    }
  }
}
report(`  ${htmlFiles.length} HTML-Seiten und alle t()-Aufrufe`, [...new Set(uiProblems)]);

/* ---------- Ergebnis ---------- */

if (failures) {
  console.error(`\n${failures} Problem(e) gefunden.`);
  process.exit(1);
}
console.log('\nAlle Inhalte in Ordnung.');
