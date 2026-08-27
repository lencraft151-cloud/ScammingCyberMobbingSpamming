/**
 * Erzählmaschine für verzweigte Geschichten.
 *
 * Wird von zwei Modi genutzt:
 *   • Scam-Storys  — Risiko sammeln, am Ende „gescammt / nicht gescammt"
 *   • Klassenchat  — zusätzlich Zeitdruck und zwei laufende Anzeigen
 *
 * Aufbau einer Geschichte:
 *
 *   {
 *     id, icon, channel, difficulty,
 *     title, teaser, contact: { name, sub },
 *     redFlags: { schluessel: { label, why } },
 *     start: 'n1',
 *     nodes: {
 *       n1: {
 *         messages: [ { from:'them'|'me'|'system', text, image, time } ],
 *         flags:   ['urgency'],          // Warnsignale, die hier sichtbar sind
 *         timer:   12,                   // optional: Sekunden bis zur Vorgabe
 *         onTimeout: 'n5',               // optional: Ziel, wenn die Zeit abläuft
 *         choices: [ {
 *           text, next, risk, verdict:'good'|'bad'|'meh', why,
 *           catches: ['urgency'],        // damit erkannte Warnsignale
 *           effects: { courage:+2 },     // beliebige Zähler
 *           form: { … }                  // optional: gefälschte Log-in-Seite
 *         } ]
 *       },
 *       ende: { messages:[…], outcome:'scammed'|'safe'|'close'|<eigen>,
 *               damage, lessons:[…], recover:[…] }
 *     }
 *   }
 */

/** Ein Knoten ist ein Ende, sobald er ein Ergebnis trägt oder keine Auswahl hat. */
export function isEnding(node) {
  return !!node && (node.outcome != null || !node.choices || node.choices.length === 0);
}

export class StoryRun {
  /**
   * @param {object} story
   * @param {object} [opts]  { stats: Startwerte der Zähler }
   */
  constructor(story, opts = {}) {
    this.story = story;
    this.id = story.start;
    this.risk = 0;
    this.stats = { ...(opts.stats || {}) };
    this.seenFlags = new Set();
    this.caughtFlags = new Set();
    this.history = [];        // Rückblick: jede getroffene Entscheidung
    this.visited = [this.story.start];
    this.#absorb(this.node);
  }

  get node() {
    return this.story.nodes[this.id];
  }

  get finished() {
    return isEnding(this.node);
  }

  /** Ungefährer Fortschritt in Prozent — für die Leiste über dem Chat. */
  get progress() {
    const total = Object.keys(this.story.nodes).length;
    return Math.min(96, Math.round((this.visited.length / Math.max(total * 0.6, 1)) * 100));
  }

  /** Warnsignale eines Knotens vormerken, sobald er gesehen wurde. */
  #absorb(node) {
    (node?.flags || []).forEach((f) => this.seenFlags.add(f));
  }

  /**
   * Eine Auswahl treffen.
   * @param {number} index
   * @returns {object} der gewählte Eintrag
   */
  choose(index) {
    const node = this.node;
    const choice = node?.choices?.[index];
    if (!choice) return null;
    this.#apply(choice, node);
    return choice;
  }

  /** Zeit abgelaufen: die als `timeout` markierte Auswahl greift. */
  chooseTimeout() {
    const node = this.node;
    if (!node?.choices) return null;
    const idx = node.choices.findIndex((c) => c.timeout);
    const choice = idx >= 0 ? node.choices[idx] : node.choices[node.choices.length - 1];
    this.#apply({ ...choice, wasTimeout: true }, node);
    return choice;
  }

  #apply(choice, node) {
    this.risk += choice.risk || 0;
    (choice.catches || []).forEach((f) => this.caughtFlags.add(f));
    for (const [k, v] of Object.entries(choice.effects || {})) {
      this.stats[k] = (this.stats[k] || 0) + v;
    }
    this.history.push({
      nodeId: this.id,
      text: choice.text,
      verdict: choice.verdict || 'meh',
      why: choice.why,
      wasTimeout: !!choice.wasTimeout,
      prompt: node.prompt,
    });
    if (choice.next && this.story.nodes[choice.next]) {
      this.id = choice.next;
      this.visited.push(this.id);
      this.#absorb(this.node);
    }
  }

  /**
   * Auswertung am Ende.
   * @returns {{outcome, score, damage, lessons, recover, flags, replay}}
   */
  result() {
    const end = this.node;
    const flags = [...this.seenFlags].map((key) => {
      const def = this.story.redFlags?.[key] || {};
      return {
        key,
        label: def.label,
        why: def.why,
        caught: this.caughtFlags.has(key),
      };
    });

    const good = this.history.filter((h) => h.verdict === 'good').length;
    const bad = this.history.filter((h) => h.verdict === 'bad').length;
    const total = Math.max(this.history.length, 1);
    const score = Math.round(((good + (total - good - bad) * 0.5) / total) * 100);

    return {
      outcome: end?.outcome || 'safe',
      score,
      risk: this.risk,
      stats: this.stats,
      damage: end?.damage,
      lessons: end?.lessons || [],
      recover: end?.recover || [],
      endText: end?.endText,
      flags,
      replay: this.history,
    };
  }
}

/**
 * Prüft eine Geschichte auf Sackgassen und fehlende Übersetzungen.
 * Wird von tools/validate-content.mjs genutzt und ist deshalb frei von
 * Browser-Abhängigkeiten.
 * @returns {string[]} Liste der Probleme (leer = alles in Ordnung)
 */
export function validateStory(story, opts = {}) {
  const problems = [];
  const say = (m) => problems.push(`[${story.id || '?'}] ${m}`);
  const nodes = story.nodes || {};
  const ids = Object.keys(nodes);

  if (!story.id) say('ohne id');
  if (!story.start) say('ohne start');
  else if (!nodes[story.start]) say(`start "${story.start}" existiert nicht`);
  if (!ids.length) say('keine Knoten');

  // Zweisprachigkeit aller Textfelder
  const seen = new WeakSet();
  const walk = (value, path) => {
    if (value == null || typeof value !== 'object') return;
    if (seen.has(value)) return;
    seen.add(value);
    const keys = Object.keys(value);
    const looksBilingual = keys.includes('de') || keys.includes('en');
    if (looksBilingual) {
      if (!value.de) say(`${path}: deutscher Text fehlt`);
      if (!value.en) say(`${path}: englischer Text fehlt`);
      return;
    }
    for (const k of keys) walk(value[k], `${path}.${k}`);
  };
  walk(story.title, 'title');
  walk(story.teaser, 'teaser');
  walk(story.contact, 'contact');
  walk(story.redFlags, 'redFlags');

  const reachable = new Set();
  const known = new Set(Object.keys(story.redFlags || {}));
  const knownTactics = new Set(opts.tactics || []);

  for (const [nid, node] of Object.entries(nodes)) {
    walk(node.messages, `${nid}.messages`);
    walk(node.prompt, `${nid}.prompt`);
    walk(node.info, `${nid}.info`);
    walk(node.chapter, `${nid}.chapter`);
    walk(node.damage, `${nid}.damage`);
    walk(node.lessons, `${nid}.lessons`);
    walk(node.recover, `${nid}.recover`);

    (node.flags || []).forEach((f) => {
      if (!known.has(f)) say(`${nid}: unbekanntes Warnsignal "${f}"`);
    });
    if (node.tactic && knownTactics.size && !knownTactics.has(node.tactic)) {
      say(`${nid}: unbekannter Hebel "${node.tactic}"`);
    }
    if (node.info && !node.info.title) say(`${nid}: Hintergrundkasten ohne Titel`);

    if (isEnding(node)) {
      if (!node.outcome) say(`${nid}: Endknoten ohne outcome`);
      continue;
    }

    node.choices.forEach((c, i) => {
      walk(c.text, `${nid}.choices[${i}].text`);
      walk(c.why, `${nid}.choices[${i}].why`);
      walk(c.echo, `${nid}.choices[${i}].echo`);
      walk(c.form, `${nid}.choices[${i}].form`);
      if (!c.next) say(`${nid}.choices[${i}]: kein next`);
      else if (!nodes[c.next]) say(`${nid}.choices[${i}]: next "${c.next}" existiert nicht`);
      else reachable.add(c.next);
      (c.catches || []).forEach((f) => {
        if (!known.has(f)) say(`${nid}.choices[${i}]: unbekanntes catches "${f}"`);
      });
    });

    if (node.timer && !node.choices.some((c) => c.timeout)) {
      say(`${nid}: timer gesetzt, aber keine Auswahl mit timeout:true`);
    }
  }

  reachable.add(story.start);
  ids.forEach((nid) => {
    if (!reachable.has(nid)) say(`${nid}: von nirgendwo erreichbar`);
  });

  const endings = ids.filter((nid) => isEnding(nodes[nid]));
  if (!endings.length) say('keine Endknoten');
  if (opts.minEndings && endings.length < opts.minEndings) {
    say(`nur ${endings.length} Enden, erwartet mindestens ${opts.minEndings}`);
  }

  return problems;
}
