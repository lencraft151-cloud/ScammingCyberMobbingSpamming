/**
 * Zweisprachigkeit (Deutsch / Englisch).
 *
 * Zwei Mechanismen:
 *   1. Kurze Oberflächentexte:  t('nav.home')  bzw.  <span data-i18n="nav.home">
 *   2. Längere Fließtexte:      <div data-lang="de"> … </div><div data-lang="en"> … </div>
 *      — es wird jeweils nur der Block der aktiven Sprache angezeigt.
 *
 * Inhaltsdaten (Storys) nutzen  t(de, en)  aus lang.js und werden mit  L()  aufgelöst.
 */

import * as store from './storage.js';
import { bi } from './data/bi.js';

export const LANGS = ['de', 'en'];

const STRINGS = {
  de: {
    'brand.tagline': 'Erkennst du die Masche?',

    'nav.home': 'Start',
    'nav.scam': 'Scam-Storys',
    'nav.chat': 'Klassenchat',
    'nav.spam': 'Spam-Flut',
    'nav.credits': 'Credits',
    'nav.settings': 'Einstellungen',
    'nav.skip': 'Zum Hauptinhalt springen',

    'settings.title': 'Einstellungen',
    'settings.lang': 'Sprache',
    'settings.sound': 'Ton',
    'settings.soundHint': 'Alle Klänge werden live im Browser erzeugt.',
    'settings.volume': 'Lautstärke',
    'settings.theme': 'Darstellung',
    'settings.motion': 'Bewegung',
    'settings.motionHint': 'Reduziert Animationen und Schreibmaschineneffekt.',
    'settings.reset': 'Fortschritt löschen',
    'settings.resetHint': 'Löscht alle Ergebnisse aus diesem Browser.',
    'settings.resetDone': 'Fortschritt gelöscht.',
    'settings.close': 'Schließen',
    'theme.dark': 'Dunkel',
    'theme.light': 'Hell',
    'motion.full': 'Normal',
    'motion.reduced': 'Reduziert',
    'common.on': 'An',
    'common.off': 'Aus',
    'common.back': 'Zurück',
    'common.next': 'Weiter',
    'common.again': 'Nochmal',
    'common.start': 'Los geht’s',
    'common.overview': 'Zur Übersicht',
    'common.continue': 'Weiter',
    'common.you': 'Du',
    'common.of': 'von',

    'home.intro': 'Drei Spielmodi, eine Frage: Würdest du es merken? Alle Geschichten sind erfunden — die Maschen dahinter nicht.',
    'home.modes': 'Wähle einen Modus',
    'home.progress': 'Dein Fortschritt',
    'home.progressNone': 'Noch nichts gespielt. Fang irgendwo an.',
    'home.storiesDone': 'Storys gespielt',
    'home.storiesClean': 'davon ohne Schaden',
    'home.chatDone': 'Klassenchat abgeschlossen',
    'home.spamBest': 'Spam-Bestwert',
    'home.notYet': 'noch offen',
    'home.play': 'Spielen',
    'home.disclaimerTitle': 'Wichtig',
    'home.disclaimer': 'Diese Seite ist eine Übung. Alle Namen, Nummern, Firmen und Nachrichten sind frei erfunden. Es werden keine Daten gesendet oder gespeichert — außer deinem Fortschritt, der nur in diesem Browser bleibt.',

    'mode.scam.title': 'Scam-Storys',
    'mode.scam.desc': 'Acht Geschichten aus SMS, WhatsApp, Insta und Mail. Du entscheidest — am Ende erfährst du, ob du gescammt wurdest.',
    'mode.chat.title': 'Cybermobbing im Klassenchat',
    'mode.chat.desc': 'Ein Gruppenchat kippt. Du siehst alles mit. Was tust du — und was passiert, wenn du nichts tust?',
    'mode.spam.title': 'Spam-Flut',
    'mode.spam.desc': 'Popups, Fake-Warnungen, Cookie-Fallen. Halte 90 Sekunden durch, ohne auf die Tricks hereinzufallen.',

    'scam.lead': 'Acht echte Maschen, nachgebaut. Wähle eine Geschichte.',
    'scam.difficulty': 'Schwierigkeit',
    'scam.notPlayed': 'ungespielt',
    'scam.bestSafe': 'sauber überstanden',
    'scam.bestClose': 'knapp entkommen',
    'scam.bestScammed': 'gescammt',
    'scam.plays': 'Versuche',
    'scam.step': 'Schritt',
    'scam.leave': 'Story verlassen',
    'scam.leaveConfirm': 'Story wirklich abbrechen? Der Fortschritt dieser Runde geht verloren.',
    'scam.typing': 'schreibt …',
    'scam.formSend': 'Absenden',
    'scam.formCancel': 'Abbrechen',
    'scam.formNote': 'Übung: Diese Eingaben werden nirgendwo gespeichert oder gesendet.',
    'scam.verdict.scammed': 'Gescammt',
    'scam.verdict.safe': 'Nicht draufgefallen',
    'scam.verdict.close': 'Knapp entkommen',
    'scam.damage': 'Schaden',
    'scam.flagsTitle': 'Die Warnsignale in dieser Story',
    'scam.flagsCaught': 'erkannt',
    'scam.flagsMissed': 'übersehen',
    'scam.replayTitle': 'Deine Entscheidungen',
    'scam.lessonsTitle': 'Merk dir das',
    'scam.whatNowTitle': 'Wenn es dich wirklich erwischt hat',
    'scam.nextStory': 'Nächste Story',
    'scam.allDone': 'Du hast alle acht Storys gespielt. Respekt.',

    'chat.warnTitle': 'Kurzer Hinweis',
    'chat.warnBody': 'In diesem Modus geht es um Mobbing in einem Klassenchat. Die Nachrichten sind erfunden, können aber unangenehm sein. Wenn dich das Thema gerade selbst betrifft: Du bist nicht allein, und weiter unten stehen Nummern, bei denen dir jemand zuhört.',
    'chat.warnHelp': 'Nummer gegen Kummer: 116 111 (kostenlos, anonym, Mo–Sa 14–20 Uhr)',
    'chat.warnStart': 'Verstanden, starten',
    'chat.warnLeave': 'Lieber nicht',
    'chat.groupSub': 'Du, Mia, Jonas, Leo, Emily, Tarek und 21 weitere',
    'chat.courage': 'Zivilcourage',
    'chat.mia': 'Mias Stimmung',
    'chat.decide': 'Du kannst jetzt reagieren',
    'chat.timeLeft': 'Sekunden',
    'chat.silence': 'Du schreibst nichts.',
    'chat.silenceNote': 'Zeit abgelaufen — Schweigen ist auch eine Entscheidung.',
    'chat.privateTo': 'Privat an Mia',
    'chat.roleTitle': 'Deine Rolle',
    'chat.outcomeTitle': 'Was aus Mia wurde',
    'chat.momentsTitle': 'Momente, in denen du etwas hättest ändern können',
    'chat.helpTitle': 'Echte Hilfe',
    'chat.legalTitle': 'Und rechtlich?',
    'chat.legalBody': 'Beleidigung, Bedrohung, Verleumdung und das Verbreiten von Bildern ohne Erlaubnis sind in Deutschland Straftaten — auch in einem Klassenchat, auch unter 14-Jährigen. Screenshots mit Datum und Uhrzeit sind Beweise. Nicht löschen, sondern sichern und einer erwachsenen Person zeigen.',

    'spam.lead': 'Dein Bildschirm wird gleich zugemüllt. Schließe die Fenster — aber pass auf, welchen Knopf du drückst.',
    'spam.rules': 'So läuft es',
    'spam.rule1': 'Halte 90 Sekunden durch.',
    'spam.rule2': 'Jedes offene Fenster treibt das Nerv-Level hoch. Bei 100 % ist Schluss.',
    'spam.rule3': 'Manche Knöpfe sind Fallen. Ein Klick darauf erhöht dein Risiko.',
    'spam.rule4': 'Esc schließt das oberste echte Fenster.',
    'spam.begin': 'Spam starten',
    'spam.annoy': 'Nerv-Level',
    'spam.risk': 'Risiko',
    'spam.time': 'Zeit',
    'spam.score': 'Punkte',
    'spam.closed': 'geschlossen',
    'spam.overTitle': 'Dein Gerät wurde übernommen',
    'spam.overBody': 'Zu viele Klicks auf die falschen Knöpfe. In echt hättest du dir jetzt Schadsoftware, ein Abo oder beides eingefangen.',
    'spam.wonTitle': 'Durchgehalten!',
    'spam.wonBody': '90 Sekunden Dauerbeschuss überstanden, ohne dass dein Gerät übernommen wurde.',
    'spam.drownTitle': 'Im Müll versunken',
    'spam.drownBody': 'So viele Fenster gleichzeitig, dass nichts mehr ging. Genau darauf setzen die Betreiber solcher Seiten.',
    'spam.trapsTitle': 'Diese Tricks haben dich erwischt',
    'spam.trapsNone': 'Kein einziger Trick hat gezogen. Sehr stark.',
    'spam.tipsTitle': 'So wirst du sie wirklich los',
    'spam.retry': 'Nochmal versuchen',

    'credits.title': 'Credits & Hilfe',
  },

  en: {
    'brand.tagline': 'Can you spot the con?',

    'nav.home': 'Start',
    'nav.scam': 'Scam stories',
    'nav.chat': 'Class chat',
    'nav.spam': 'Spam flood',
    'nav.credits': 'Credits',
    'nav.settings': 'Settings',
    'nav.skip': 'Skip to main content',

    'settings.title': 'Settings',
    'settings.lang': 'Language',
    'settings.sound': 'Sound',
    'settings.soundHint': 'Every sound is generated live in your browser.',
    'settings.volume': 'Volume',
    'settings.theme': 'Appearance',
    'settings.motion': 'Motion',
    'settings.motionHint': 'Reduces animation and the typewriter effect.',
    'settings.reset': 'Clear progress',
    'settings.resetHint': 'Deletes every result stored in this browser.',
    'settings.resetDone': 'Progress cleared.',
    'settings.close': 'Close',
    'theme.dark': 'Dark',
    'theme.light': 'Light',
    'motion.full': 'Normal',
    'motion.reduced': 'Reduced',
    'common.on': 'On',
    'common.off': 'Off',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.again': 'Again',
    'common.start': 'Start',
    'common.overview': 'Back to overview',
    'common.continue': 'Continue',
    'common.you': 'You',
    'common.of': 'of',

    'home.intro': 'Three game modes, one question: would you notice? Every story here is invented — the tricks behind them are not.',
    'home.modes': 'Pick a mode',
    'home.progress': 'Your progress',
    'home.progressNone': 'Nothing played yet. Start anywhere.',
    'home.storiesDone': 'stories played',
    'home.storiesClean': 'of those unscathed',
    'home.chatDone': 'Class chat finished',
    'home.spamBest': 'Spam best score',
    'home.notYet': 'not yet',
    'home.play': 'Play',
    'home.disclaimerTitle': 'Important',
    'home.disclaimer': 'This site is a drill. Every name, number, company and message is made up. Nothing is sent or stored anywhere — except your progress, which never leaves this browser.',

    'mode.scam.title': 'Scam stories',
    'mode.scam.desc': 'Eight stories from SMS, WhatsApp, Instagram and email. You choose — and at the end you find out whether you got scammed.',
    'mode.chat.title': 'Cyberbullying in the class chat',
    'mode.chat.desc': 'A group chat turns nasty. You see all of it. What do you do — and what happens if you do nothing?',
    'mode.spam.title': 'Spam flood',
    'mode.spam.desc': 'Pop-ups, fake warnings, cookie traps. Survive 90 seconds without falling for the tricks.',

    'scam.lead': 'Eight real-world cons, rebuilt. Pick a story.',
    'scam.difficulty': 'Difficulty',
    'scam.notPlayed': 'unplayed',
    'scam.bestSafe': 'came out clean',
    'scam.bestClose': 'narrow escape',
    'scam.bestScammed': 'scammed',
    'scam.plays': 'attempts',
    'scam.step': 'Step',
    'scam.leave': 'Leave story',
    'scam.leaveConfirm': 'Really quit this story? You will lose this run.',
    'scam.typing': 'typing …',
    'scam.formSend': 'Submit',
    'scam.formCancel': 'Cancel',
    'scam.formNote': 'Drill: nothing you type here is stored or sent anywhere.',
    'scam.verdict.scammed': 'You got scammed',
    'scam.verdict.safe': 'You did not fall for it',
    'scam.verdict.close': 'Narrow escape',
    'scam.damage': 'Damage',
    'scam.flagsTitle': 'The warning signs in this story',
    'scam.flagsCaught': 'spotted',
    'scam.flagsMissed': 'missed',
    'scam.replayTitle': 'Your decisions',
    'scam.lessonsTitle': 'Remember this',
    'scam.whatNowTitle': 'If it really happens to you',
    'scam.nextStory': 'Next story',
    'scam.allDone': 'You have played all eight stories. Respect.',

    'chat.warnTitle': 'Quick heads-up',
    'chat.warnBody': 'This mode is about bullying in a class group chat. The messages are invented, but they can be uncomfortable to read. If this is something you are going through right now: you are not alone, and there are numbers below where someone will listen.',
    'chat.warnHelp': 'Childline (UK): 0800 1111 · Germany: Nummer gegen Kummer 116 111 — free and anonymous',
    'chat.warnStart': 'Understood, start',
    'chat.warnLeave': 'Rather not',
    'chat.groupSub': 'You, Mia, Jonas, Leo, Emily, Tarek and 21 others',
    'chat.courage': 'Moral courage',
    'chat.mia': 'How Mia is doing',
    'chat.decide': 'You can react now',
    'chat.timeLeft': 'seconds',
    'chat.silence': 'You type nothing.',
    'chat.silenceNote': 'Time ran out — staying silent is a decision too.',
    'chat.privateTo': 'Private message to Mia',
    'chat.roleTitle': 'Your role',
    'chat.outcomeTitle': 'What happened to Mia',
    'chat.momentsTitle': 'Moments where you could have changed something',
    'chat.helpTitle': 'Real help',
    'chat.legalTitle': 'What about the law?',
    'chat.legalBody': 'Insults, threats, defamation and sharing someone’s picture without permission are criminal offences in Germany — in a class chat too, and for under-14s too. Screenshots with a date and time are evidence. Do not delete them: save them and show an adult you trust.',

    'spam.lead': 'Your screen is about to get buried. Close the windows — but watch which button you press.',
    'spam.rules': 'How it works',
    'spam.rule1': 'Survive 90 seconds.',
    'spam.rule2': 'Every open window pushes the annoyance level up. At 100 % it is over.',
    'spam.rule3': 'Some buttons are traps. Clicking one raises your risk.',
    'spam.rule4': 'Esc closes the topmost genuine window.',
    'spam.begin': 'Start the spam',
    'spam.annoy': 'Annoyance',
    'spam.risk': 'Risk',
    'spam.time': 'Time',
    'spam.score': 'Score',
    'spam.closed': 'closed',
    'spam.overTitle': 'Your device has been taken over',
    'spam.overBody': 'Too many clicks on the wrong buttons. In real life you would now have malware, a subscription, or both.',
    'spam.wonTitle': 'You made it!',
    'spam.wonBody': '90 seconds of non-stop bombardment survived without your device being taken over.',
    'spam.drownTitle': 'Buried in junk',
    'spam.drownBody': 'So many windows at once that nothing worked any more. That is exactly what the people behind these sites are counting on.',
    'spam.trapsTitle': 'These tricks caught you',
    'spam.trapsNone': 'Not a single trick worked on you. Very strong.',
    'spam.tipsTitle': 'How to actually get rid of them',
    'spam.retry': 'Try again',

    'credits.title': 'Credits & help',
  },
};

let current = 'de';
const listeners = new Set();

/** Inhaltshelfer: erzeugt ein zweisprachiges Feld. */
export { bi };

/** Löst ein zweisprachiges Feld (oder einen einfachen String) auf. */
export function L(field) {
  if (field == null) return '';
  if (typeof field === 'string') return field;
  return field[current] ?? field.de ?? field.en ?? '';
}

/** Übersetzt einen Oberflächenschlüssel. */
export function t(key) {
  return STRINGS[current]?.[key] ?? STRINGS.de[key] ?? key;
}

export function lang() {
  return current;
}

function detect() {
  const saved = store.get('lang');
  if (LANGS.includes(saved)) return saved;
  const nav = (navigator.language || 'de').slice(0, 2).toLowerCase();
  return LANGS.includes(nav) ? nav : 'de';
}

/** Alle markierten Stellen im Dokument auf die aktive Sprache bringen. */
export function applyI18n(root = document) {
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  root.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    // Format:  data-i18n-attr="aria-label:nav.settings; title:nav.settings"
    el.dataset.i18nAttr.split(';').forEach((pair) => {
      const [attr, key] = pair.split(':').map((s) => s && s.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    });
  });
  root.querySelectorAll('[data-lang]').forEach((el) => {
    el.hidden = el.dataset.lang !== current;
  });
}

export function setLang(next) {
  if (!LANGS.includes(next) || next === current) return;
  current = next;
  store.set('lang', next);
  document.documentElement.lang = next;
  applyI18n();
  listeners.forEach((fn) => fn(next));
}

/** Wird bei jedem Sprachwechsel gerufen — Seiten zeichnen sich damit neu. */
export function onLangChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function initI18n() {
  current = detect();
  document.documentElement.lang = current;
  applyI18n();
}
