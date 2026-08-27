import { bi } from './bi.js';

/**
 * Die psychologischen Hebel hinter den Maschen.
 *
 * Der wichtigste Lerneffekt der Seite steckt hier: Wer nur einzelne Maschen
 * auswendig lernt, erkennt die nächste nicht. Wer die Hebel kennt, erkennt
 * auch eine Masche, die es heute noch gar nicht gibt.
 *
 * Jeder Eintrag hat drei Teile:
 *   how     — wie der Hebel angesetzt wird
 *   feels   — woran man im eigenen Kopf merkt, dass er wirkt
 *   counter — was ihn zuverlässig aushebelt
 */
export const TACTICS = {

  authority: {
    icon: '🎖️',
    label: bi('Autorität', 'Authority'),
    how: bi(
      'Die Täter geben sich als Bank, Polizei, Zusteller, Support oder Vorgesetzte aus. Menschen widersprechen Autoritäten ungern — besonders am Telefon.',
      'The scammer poses as a bank, the police, a courier, support staff or a manager. People are reluctant to contradict authority — especially over the phone.'),
    feels: bi(
      'Du hast das Gefühl, dich rechtfertigen zu müssen, obwohl die andere Seite etwas von dir will.',
      'You feel you have to justify yourself, even though the other side is the one who wants something.'),
    counter: bi(
      'Echte Stellen haben nichts gegen eine Rückfrage. Auflegen und über die selbst herausgesuchte Nummer zurückrufen kostet zwei Minuten und beendet jede dieser Maschen.',
      'Genuine organisations have no problem with you checking. Hanging up and calling back on a number you looked up yourself takes two minutes and ends every one of these cons.'),
  },

  urgency: {
    icon: '⏱️',
    label: bi('Zeitdruck', 'Urgency'),
    how: bi(
      'Fristen, Countdowns, „nur noch heute", „in vier Minuten ist es zu spät". Eile ist der zuverlässigste Weg, das Nachdenken abzuschalten.',
      'Deadlines, countdowns, “today only”, “in four minutes it will be too late”. Hurry is the most reliable way to switch off thinking.'),
    feels: bi(
      'Du merkst, dass du schneller handeln willst, als du verstehst, worum es geht.',
      'You notice you want to act faster than you understand what is going on.'),
    counter: bi(
      'Echte Fristen halten eine Nacht aus. Erfundene nicht. Genau deshalb ist „ich schlafe eine Nacht darüber" die stärkste Antwort, die es gibt.',
      'Real deadlines survive a night’s sleep. Invented ones do not. Which is why “I will sleep on it” is the strongest answer there is.'),
  },

  fear: {
    icon: '😰',
    label: bi('Angst', 'Fear'),
    how: bi(
      'Gesperrte Konten, Viren, Inkasso, ein Kind in Not, eine Anzeige. Angst erzeugt Handlungsdruck und schaltet die Prüfung ab.',
      'Frozen accounts, viruses, debt collectors, a child in trouble, a criminal charge. Fear creates pressure to act and switches off checking.'),
    feels: bi(
      'Dein Puls geht hoch, bevor du überhaupt geprüft hast, ob die Behauptung stimmt.',
      'Your pulse rises before you have checked whether the claim is even true.'),
    counter: bi(
      'Die Behauptung zuerst überprüfen, nicht die Forderung erfüllen. Fast immer stellt sich heraus, dass es das Problem gar nicht gibt.',
      'Verify the claim first, do not satisfy the demand. Almost always it turns out the problem does not exist at all.'),
  },

  familiarity: {
    icon: '🤝',
    label: bi('Vertrautheit', 'Familiarity'),
    how: bi(
      'Die Nachricht kommt scheinbar von der Tochter, einem Freund oder einem bekannten Unternehmen. Bei Vertrauten prüfen wir grundsätzlich weniger.',
      'The message appears to come from your daughter, a friend or a familiar company. We check far less when we think we know the sender.'),
    feels: bi(
      'Du erkennst einen Namen und hörst innerlich auf zu prüfen.',
      'You recognise a name and internally stop checking.'),
    counter: bi(
      'Über einen zweiten Kanal nachfragen: anrufen, wenn geschrieben wurde. Ein gekaperter Account kann alles nachahmen — außer der vertrauten Stimme.',
      'Check through a second channel: call if they wrote. A hijacked account can imitate anything — except a familiar voice.'),
  },

  socialProof: {
    icon: '👥',
    label: bi('Soziale Bewährtheit', 'Social proof'),
    how: bi(
      'Bewertungen, Followerzahlen, „11 von 11 finden das auch", ein Freund, der bürgt. Wenn scheinbar alle mitmachen, wirkt es sicher.',
      'Reviews, follower counts, “11 out of 11 agree”, a friend who vouches for it. If everyone seems to be doing it, it feels safe.'),
    feels: bi(
      'Du denkst „so viele können sich nicht irren" — obwohl du keinen einzigen davon kennst.',
      'You think “that many people cannot be wrong” — though you know none of them.'),
    counter: bi(
      'Zählen, wie viele davon überprüfbar sind. Gekaufte Bewertungen kommen im Block, echte über Monate verteilt.',
      'Count how many of them you can actually verify. Bought reviews arrive in a block; real ones spread over months.'),
  },

  greed: {
    icon: '💰',
    label: bi('Aussicht auf Gewinn', 'Prospect of gain'),
    how: bi(
      'Ein Gewinn, ein Schnäppchen, eine sichere Rendite, ein Gratis-Skin. Die Aussicht auf Vorteil verdrängt die Frage, warum ausgerechnet du.',
      'A prize, a bargain, a guaranteed return, a free skin. The prospect of gain crowds out the question of why you, of all people.'),
    feels: bi(
      'Du suchst nach Gründen, warum es doch echt sein könnte, statt nach Gründen dagegen.',
      'You start looking for reasons it might be real instead of reasons it is not.'),
    counter: bi(
      'Die Frage stellen: Was hat die andere Seite davon? Wenn du nicht die Kundschaft bist, bist du die Ware.',
      'Ask what the other side gets out of it. If you are not the customer, you are the product.'),
  },

  reciprocity: {
    icon: '🎁',
    label: bi('Gegenseitigkeit', 'Reciprocity'),
    how: bi(
      'Erst ein Geschenk, ein Gefallen, wochenlange Aufmerksamkeit — dann die Bitte. Wer etwas bekommen hat, sagt schwerer Nein.',
      'First a gift, a favour, weeks of attention — then the request. Having received something makes it much harder to say no.'),
    feels: bi(
      'Du hast das Gefühl, etwas schuldig zu sein, obwohl du nie darum gebeten hast.',
      'You feel indebted, even though you never asked for any of it.'),
    counter: bi(
      'Was unaufgefordert kam, verpflichtet zu nichts. Das gilt auch für Zuwendung, die sich echt angefühlt hat.',
      'Anything that arrived uninvited obliges you to nothing. That holds for affection that felt genuine, too.'),
  },

  commitment: {
    icon: '🪜',
    label: bi('Schritt für Schritt', 'Foot in the door'),
    how: bi(
      'Erst eine winzige Bitte, dann eine etwas größere. Wer 2,99 € gezahlt hat, zahlt auch 250 €. Wer 250 € investiert hat, investiert auch 5.000 €.',
      'A tiny request first, then a slightly bigger one. Someone who paid €2.99 will pay €250. Someone who invested €250 will invest €5,000.'),
    feels: bi(
      'Du willst nicht aussteigen, weil du schon so weit gegangen bist.',
      'You do not want to stop because you have already come this far.'),
    counter: bi(
      'Bereits gezahltes Geld ist weg — es ist kein Grund, mehr zu zahlen. Jede Forderung für sich bewerten, nicht als Fortsetzung.',
      'Money already paid is gone — it is not a reason to pay more. Judge each demand on its own, not as a continuation.'),
  },

  isolation: {
    icon: '🤫',
    label: bi('Isolation', 'Isolation'),
    how: bi(
      '„Erzähl niemandem davon", „nicht auflegen", „Ihre Kollegen dürfen das nicht wissen". Ein Außenstehender würde die Masche in zwei Minuten erkennen.',
      '“Do not tell anyone”, “do not hang up”, “your colleagues must not know”. An outsider would spot the con in two minutes.'),
    feels: bi(
      'Du überlegst, ob du überhaupt jemanden fragen darfst.',
      'You find yourself wondering whether you are even allowed to ask anyone.'),
    counter: bi(
      'Die Bitte um Geheimhaltung ist selbst das Erkennungszeichen. Reden zerstört jede dieser Maschen — deshalb wird es verboten.',
      'The request for secrecy is itself the tell. Talking destroys every one of these cons — which is precisely why it gets forbidden.'),
  },

  distraction: {
    icon: '🎭',
    label: bi('Ablenkung', 'Misdirection'),
    how: bi(
      'Über etwas Kleines reden, damit das Große unbemerkt passiert: 2,99 € Gebühr statt Kartendaten, „Stornierung" statt Überweisung, ein Countdown statt der Frage, wer da eigentlich schreibt.',
      'Talk about the small thing so the big one passes unnoticed: a €2.99 fee rather than your card details, a “cancellation” rather than a transfer, a countdown rather than the question of who is actually writing.'),
    feels: bi(
      'Du triffst eine Entscheidung über den Betrag — und übersiehst die Entscheidung über die Daten.',
      'You make a decision about the amount — and miss the decision about the data.'),
    counter: bi(
      'Nicht fragen „wie viel kostet das", sondern „was gebe ich hier eigentlich heraus".',
      'Do not ask “how much does this cost”. Ask “what am I actually handing over here”.'),
  },

  sunkCost: {
    icon: '🕳️',
    label: bi('Verlustangst', 'Loss chasing'),
    how: bi(
      'Ist das erste Geld weg, kommt das Angebot, es zurückzuholen — gegen eine Gebühr. Die Hoffnung, den Verlust auszugleichen, ist stärker als die Vorsicht.',
      'Once the first money is gone, along comes an offer to recover it — for a fee. The hope of undoing a loss is stronger than caution.'),
    feels: bi(
      'Du zahlst weiter, nicht weil es plausibel ist, sondern weil Aufhören den Verlust endgültig machen würde.',
      'You keep paying, not because it is plausible, but because stopping would make the loss final.'),
    counter: bi(
      'Wer Geld verlangt, um dir Geld zurückzuholen, ist die zweite Masche — oft von denselben Leuten. Niemals Vorkasse für eine Rückholung.',
      'Anyone asking for money to recover your money is the second con — often run by the same people. Never pay up front for a recovery.'),
  },

  shame: {
    icon: '🙈',
    label: bi('Scham', 'Shame'),
    how: bi(
      'Nach dem Betrug sorgt Scham dafür, dass niemand davon erfährt. Deshalb laufen die Maschen jahrelang weiter und dieselben Menschen werden erneut zum Ziel.',
      'After the fraud, shame ensures nobody finds out. That is why these cons run for years and the same people get targeted again.'),
    feels: bi(
      'Du überlegst eher, wie du es verheimlichst, als wie du es meldest.',
      'You are thinking more about how to hide it than about how to report it.'),
    counter: bi(
      'Diese Maschen sind darauf ausgelegt, zu funktionieren — bei klugen Menschen genauso. Reden ist der einzige Schritt, der etwas zurückholt.',
      'These cons are engineered to work, on clever people just the same. Talking is the only step that recovers anything.'),
  },
};

/** Reihenfolge für die Übersichtsseite. */
export const TACTIC_ORDER = [
  'authority', 'urgency', 'fear', 'familiarity', 'socialProof', 'greed',
  'reciprocity', 'commitment', 'isolation', 'distraction', 'sunkCost', 'shame',
];
