import { bi } from './bi.js';

/**
 * Modus 3 — Spam-Flut.
 *
 * Jedes Popup ist nach demselben Muster gebaut: ein großer, einladender
 * Knopf, der schadet, und ein Weg heraus, der klein, grau oder versteckt
 * ist. Genau dieses Verhältnis ist die Lektion.
 *
 * Knopf-Rollen:
 *   close     — schließt das Fenster, kein Schaden
 *   decline   — ebenfalls harmlos, aber absichtlich unattraktiv gestaltet
 *   malicious — erhöht das Risiko
 */

export const DARK_PATTERNS = [
  {
    id: 'fakeX',
    label: bi('Das falsche X', 'The fake X'),
    why: bi('Das Schließkreuz gehört zur Werbung, nicht zum Fenster. Ein Klick darauf öffnet sie.',
            'The close cross belongs to the advert, not to the window. Clicking it opens the advert.'),
  },
  {
    id: 'runawayX',
    label: bi('Das flüchtende X', 'The runaway X'),
    why: bi('Das Kreuz weicht dem Zeiger aus, bis man danebentrifft — und trifft dann die Werbung.',
            'The cross dodges your pointer until you miss it — and hit the advert instead.'),
  },
  {
    id: 'hydra',
    label: bi('Die Hydra', 'The hydra'),
    why: bi('Für jedes geschlossene Fenster öffnen sich zwei neue. Wegklicken ist hier die Falle.',
            'For every window you close, two more open. Clicking them away is the trap.'),
  },
  {
    id: 'tinyDecline',
    label: bi('Der versteckte Ablehnen-Knopf', 'The hidden reject button'),
    why: bi('„Alle akzeptieren" ist groß und bunt, „Ablehnen" ist grau und winzig. Beide sind gleich gültig.',
            '“Accept all” is big and colourful, “Reject” is grey and tiny. Both are equally valid choices.'),
  },
  {
    id: 'confirmshaming',
    label: bi('Beschämen statt überzeugen', 'Shaming instead of persuading'),
    why: bi('„Nein danke, ich bleibe lieber ungeschützt" — man soll sich beim Ablehnen schlecht fühlen.',
            '“No thanks, I would rather stay unprotected” — you are meant to feel bad for declining.'),
  },
  {
    id: 'countdown',
    label: bi('Der künstliche Countdown', 'The artificial countdown'),
    why: bi('Der Zähler misst nichts. Er läuft auf jeder Seite und beginnt beim Neuladen von vorn.',
            'The counter measures nothing. It runs on every page and restarts on reload.'),
  },
];

export const POPUPS = [
  {
    id: 'virus',
    kind: 'warning',
    weight: 3,
    pattern: 'confirmshaming',
    barTitle: bi('Systemwarnung', 'System warning'),
    icon: '⚠️',
    title: bi('17 Viren gefunden!', '17 viruses found!'),
    body: bi('Ihr Gerät ist stark beschädigt. Sofortige Bereinigung erforderlich.',
             'Your device is severely damaged. Immediate cleaning required.'),
    buttons: [
      { label: bi('Jetzt bereinigen', 'Clean now'), role: 'malicious', emphasis: 'primary' },
      { label: bi('Nein danke, ich riskiere es', 'No thanks, I will risk it'), role: 'decline', emphasis: 'tiny' },
    ],
  },
  {
    id: 'prize',
    kind: 'prize',
    weight: 3,
    pattern: 'countdown',
    countdown: 8,
    barTitle: bi('Glückwunsch', 'Congratulations'),
    icon: '🎉',
    title: bi('Du bist der 1.000.000. Besucher!', 'You are visitor number 1,000,000!'),
    body: bi('Wähle jetzt deinen Gewinn aus. Das Angebot verfällt gleich.',
             'Choose your prize now. The offer expires in a moment.'),
    buttons: [
      { label: bi('Gewinn abholen', 'Claim prize'), role: 'malicious', emphasis: 'primary' },
      { label: bi('Schließen', 'Close'), role: 'close' },
    ],
  },
  {
    id: 'cookie',
    kind: 'cookie',
    weight: 3,
    pattern: 'tinyDecline',
    barTitle: bi('Datenschutz-Einstellungen', 'Privacy settings'),
    icon: '🍪',
    title: bi('Wir schätzen Ihre Privatsphäre', 'We value your privacy'),
    body: bi('Wir und 1.482 Partner speichern Informationen auf Ihrem Gerät.',
             'We and 1,482 partners store information on your device.'),
    fine: bi('Verarbeitung zu Werbezwecken, Profilbildung und Standortermittlung.',
             'Processing for advertising, profiling and precise geolocation.'),
    buttons: [
      { label: bi('Alle akzeptieren', 'Accept all'), role: 'malicious', emphasis: 'primary' },
      { label: bi('Ablehnen', 'Reject'), role: 'decline', emphasis: 'tiny' },
    ],
  },
  {
    id: 'update',
    kind: 'update',
    weight: 2,
    pattern: 'fakeX',
    barTitle: bi('Aktualisierung verfügbar', 'Update available'),
    icon: '⬇️',
    title: bi('Ihr Player ist veraltet', 'Your player is out of date'),
    body: bi('Version 11.2 wird benötigt, um diese Seite anzuzeigen.',
             'Version 11.2 is required to display this page.'),
    buttons: [
      { label: bi('Jetzt aktualisieren', 'Update now'), role: 'malicious', emphasis: 'primary' },
      { label: bi('Später', 'Later'), role: 'close' },
    ],
  },
  {
    id: 'dating',
    kind: 'ad',
    weight: 2,
    pattern: 'runawayX',
    barTitle: bi('Anzeige', 'Advertisement'),
    icon: '💘',
    title: bi('3 Singles in deiner Nähe', '3 singles near you'),
    body: bi('Sie warten darauf, dass du dich meldest.', 'They are waiting for you to get in touch.'),
    buttons: [
      { label: bi('Profile ansehen', 'View profiles'), role: 'malicious', emphasis: 'primary' },
      { label: bi('Schließen', 'Close'), role: 'close' },
    ],
  },
  {
    id: 'newsletter',
    kind: 'ad',
    weight: 2,
    pattern: 'hydra',
    barTitle: bi('Newsletter', 'Newsletter'),
    icon: '✉️',
    title: bi('Verpasse nichts mehr!', 'Never miss a thing!'),
    body: bi('Melde dich an und erhalte täglich unsere Angebote.',
             'Sign up and get our offers every single day.'),
    buttons: [
      { label: bi('Anmelden', 'Sign up'), role: 'malicious', emphasis: 'primary' },
      { label: bi('Vielleicht später', 'Maybe later'), role: 'close' },
    ],
  },
  {
    id: 'trial',
    kind: 'prize',
    weight: 2,
    pattern: 'tinyDecline',
    barTitle: bi('Premium', 'Premium'),
    icon: '⭐',
    title: bi('7 Tage kostenlos testen', 'Try free for 7 days'),
    body: bi('Voller Zugriff, jederzeit kündbar.', 'Full access, cancel any time.'),
    fine: bi('Danach 49,90 € monatlich, Mindestlaufzeit 24 Monate, automatische Verlängerung.',
             'Then €49.90 per month, minimum term 24 months, renews automatically.'),
    buttons: [
      { label: bi('Kostenlos starten', 'Start for free'), role: 'malicious', emphasis: 'primary' },
      { label: bi('Kein Interesse', 'Not interested'), role: 'decline', emphasis: 'tiny' },
    ],
  },
  {
    id: 'support',
    kind: 'warning',
    weight: 2,
    pattern: 'fakeX',
    barTitle: bi('Sicherheitszentrum', 'Security centre'),
    icon: '📞',
    title: bi('Rufen Sie sofort den Support an', 'Call support immediately'),
    body: bi('Ihr Konto wurde aus einem anderen Land aufgerufen. Nicht auflegen.',
             'Your account was accessed from another country. Do not hang up.'),
    buttons: [
      { label: bi('Support anrufen', 'Call support'), role: 'malicious', emphasis: 'primary' },
      { label: bi('Ignorieren', 'Ignore'), role: 'close' },
    ],
  },
];

export const TIPS = [
  bi('Nie im Popup klicken — auch nicht auf „Schließen". Stattdessen den ganzen Tab schließen.',
     'Never click inside a pop-up — not even “Close”. Close the whole tab instead.'),
  bi('Hängt der Browser fest, hilft der Task-Manager: Anwendung beenden, danach ohne Wiederherstellung starten.',
     'If the browser is stuck, use the task manager: quit the application, then reopen without restoring tabs.'),
  bi('Ein Popup-Blocker und ein Werbefilter nehmen den meisten dieser Fenster von vornherein die Grundlage.',
     'A pop-up blocker and a content blocker remove the basis for most of these windows in the first place.'),
  bi('Kein Betriebssystem und kein Browser meldet je Viren über eine Webseite. Solche Warnungen sind immer falsch.',
     'No operating system and no browser ever reports viruses through a web page. Such warnings are always fake.'),
  bi('„Ablehnen" ist immer erlaubt, auch wenn der Knopf klein und grau ist. Rechtlich zählt er genauso.',
     '“Reject” is always allowed, even when the button is tiny and grey. Legally it counts just the same.'),
  bi('Der Ton lässt sich abschalten. Lärm ist Teil des Drucks — nimm ihn ihnen weg.',
     'You can mute the sound. Noise is part of the pressure — take it away from them.'),
];
