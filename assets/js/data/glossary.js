import { bi } from './bi.js';

/** Begriffe, die auf dieser Seite und in echten Warnmeldungen immer wieder vorkommen. */
export const GLOSSARY = [
  {
    term: bi('Phishing', 'Phishing'),
    text: bi('Der Versuch, an Zugangsdaten oder Kartendaten zu kommen, indem man sich als jemand Vertrauenswürdiges ausgibt. Der Name kommt von „fishing" — es wird ein Köder ausgeworfen und abgewartet, wer anbeißt.',
             'An attempt to obtain login or card details by posing as somebody trustworthy. The name comes from fishing — bait goes out and you wait to see who bites.'),
  },
  {
    term: bi('Smishing', 'Smishing'),
    text: bi('Phishing per SMS. Funktioniert oft besser als per Mail, weil im SMS-Verlauf sonst die Familie steht und man dort weniger mit Betrug rechnet.',
             'Phishing by text message. Often works better than email, because your text thread is where family writes and you expect fraud less there.'),
  },
  {
    term: bi('Vishing', 'Vishing'),
    text: bi('Phishing per Telefonanruf („voice phishing"). Besonders wirksam, weil eine echte Stimme Druck aufbauen und auf Nachfragen sofort reagieren kann.',
             'Phishing by phone call (“voice phishing”). Particularly effective because a real voice can apply pressure and respond to questions instantly.'),
  },
  {
    term: bi('Spoofing', 'Spoofing'),
    text: bi('Das Fälschen einer Absenderangabe — einer Rufnummer, einer E-Mail-Adresse oder eines SMS-Absenders. Technisch trivial. Deshalb beweist eine angezeigte Nummer nichts.',
             'Forging a sender identifier — a phone number, an email address or an SMS sender name. Technically trivial. Which is why a displayed number proves nothing.'),
  },
  {
    term: bi('Social Engineering', 'Social engineering'),
    text: bi('Der Oberbegriff für alles auf dieser Seite: Menschen manipulieren, statt Technik anzugreifen. Es ist meist einfacher, jemanden zur Herausgabe eines Passworts zu bewegen, als es zu knacken.',
             'The umbrella term for everything on this site: manipulating people instead of attacking technology. It is usually easier to get somebody to hand over a password than to crack it.'),
  },
  {
    term: bi('Zwei-Faktor-Authentifizierung (2FA)', 'Two-factor authentication (2FA)'),
    text: bi('Ein zweiter Nachweis zusätzlich zum Passwort, meist ein Code auf dem Handy. Der beste einzelne Schutz für Accounts — solange man den Code niemals weitergibt.',
             'A second proof on top of the password, usually a code on your phone. The single best protection for accounts — as long as you never share the code.'),
  },
  {
    term: bi('Finanzagent / Money Mule', 'Money mule'),
    text: bi('Eine Person, die fremdes Geld über ihr Konto weiterleitet. Meist über ein angebliches Job-Angebot angeworben. Das ist Geldwäsche und strafbar — auch ohne Vorsatz.',
             'Somebody who forwards other people’s money through their own account, usually recruited through a supposed job offer. That is money laundering and a criminal offence — even without intent.'),
  },
  {
    term: bi('Dark Pattern', 'Dark pattern'),
    text: bi('Eine Gestaltung, die dich zu etwas bringt, das du nicht wolltest: ein riesiges „Akzeptieren" neben einem winzigen „Ablehnen", ein Schließkreuz, das die Werbung öffnet, ein Abo im Kleingedruckten.',
             'A design that steers you into something you did not want: a huge “accept” beside a tiny “reject”, a close cross that opens the advert, a subscription in the small print.'),
  },
  {
    term: bi('Love Bombing', 'Love bombing'),
    text: bi('Sehr viel Zuwendung in sehr kurzer Zeit, um schnell eine Bindung aufzubauen. Beim Romance-Scam die Vorbereitung für die spätere Geldforderung.',
             'A great deal of affection in a very short time, to build attachment fast. In a romance scam it is the groundwork for the later request for money.'),
  },
  {
    term: bi('Recovery Scam', 'Recovery scam'),
    text: bi('Die zweite Masche nach einem Betrug: jemand bietet an, das verlorene Geld zurückzuholen — gegen Vorkasse. Oft von denselben Leuten, die schon das erste Mal kassiert haben.',
             'The second con after a fraud: somebody offers to recover the lost money — for a fee up front. Often the same people who collected the first time.'),
  },
  {
    term: bi('Vorkasse', 'Paying up front'),
    text: bi('Zahlung, bevor die Ware da ist. Per Überweisung gibt es dabei keinen Käuferschutz — das Geld ist nach dem Absenden endgültig weg. Deshalb wird diese Zahlart bei Fake-Shops zur einzigen Möglichkeit erklärt.',
             'Paying before the goods arrive. By bank transfer this comes with no buyer protection — once sent, the money is final. Which is why fake shops declare it the only available method.'),
  },
  {
    term: bi('Echtzeitüberweisung', 'Instant transfer'),
    text: bi('Eine Überweisung, die in Sekunden ankommt und praktisch nicht zurückgeholt werden kann. Bei Betrug wird gezielt darauf gedrängt. Eine normale Überweisung lässt sich am nächsten Werktag oft noch stoppen.',
             'A transfer that arrives within seconds and is practically impossible to recall. Fraudsters push for it deliberately. A normal transfer can often still be stopped the next working day.'),
  },
  {
    term: bi('Fernwartung', 'Remote access'),
    text: bi('Software, die einer anderen Person deinen Bildschirm zeigt und ihr Maus und Tastatur gibt. Völlig legitim unter Bekannten — verheerend bei jemandem, der dich angerufen hat.',
             'Software that shows another person your screen and gives them your mouse and keyboard. Entirely legitimate between people who know each other — devastating with somebody who called you.'),
  },
  {
    term: bi('Zuschauereffekt', 'Bystander effect'),
    text: bi('Je mehr Menschen zusehen, desto seltener greift der Einzelne ein — jeder nimmt an, jemand anderes tue es. In großen Gruppenchats ist der Effekt besonders stark.',
             'The more people are watching, the less likely any individual is to intervene — everyone assumes somebody else will. In large group chats the effect is especially strong.'),
  },
  {
    term: bi('Pluralistische Ignoranz', 'Pluralistic ignorance'),
    text: bi('Alle schweigen, weil jeder glaubt, die anderen fänden es in Ordnung. Deshalb verändert eine einzige Gegenstimme so viel: Sie zeigt allen, dass sie nicht allein sind.',
             'Everybody stays quiet because each believes the others are fine with it. Which is why one dissenting voice changes so much: it shows everyone they are not alone.'),
  },
];

/** Die kurze Fassung: Regeln, die fast alle Maschen auf dieser Seite abdecken. */
export const RULES = [
  {
    rule: bi('Ruf selbst zurück.', 'Call back yourself.'),
    text: bi('Bei jedem Anruf und jeder Nachricht, die etwas von dir will: auflegen, Nummer selbst heraussuchen, selbst wählen. Das erledigt Bankbetrug, Enkeltrick und den falschen Support auf einen Schlag.',
             'With any call or message that wants something from you: hang up, look the number up yourself, dial it yourself. That deals with bank fraud, the grandparent scam and fake support in one move.'),
  },
  {
    rule: bi('Folge keinem Link zum Einloggen.', 'Never follow a link to log in.'),
    text: bi('Login-Daten gehören nur in die offizielle App oder auf eine Adresse, die du selbst getippt hast. Kein echter Anbieter braucht je etwas anderes.',
             'Login details belong only in the official app, or on an address you typed yourself. No genuine provider ever needs anything else.'),
  },
  {
    rule: bi('Eile ist das Warnsignal.', 'Hurry is the warning sign.'),
    text: bi('Echte Fristen halten eine Nacht aus, erfundene nicht. „Ich schlafe eine Nacht darüber" ist die stärkste Antwort, die es gibt.',
             'Real deadlines survive a night’s sleep, invented ones do not. “I will sleep on it” is the strongest answer there is.'),
  },
  {
    rule: bi('Zahl nur mit Käuferschutz.', 'Only pay with buyer protection.'),
    text: bi('Kreditkarte, PayPal-Warenkorb, Lastschrift oder Rechnung lassen sich zurückholen. Überweisung, Guthabenkarten und Krypto nicht — deshalb werden genau die verlangt.',
             'Card, PayPal goods and services, direct debit or invoice can be reversed. Bank transfer, gift cards and crypto cannot — which is exactly why they get demanded.'),
  },
  {
    rule: bi('Gib niemals einen Bestätigungscode weiter.', 'Never share a confirmation code.'),
    text: bi('Ein 2FA-Code ist ein Schlüssel, kein Beleg. Wer danach fragt, steht vor der Tür — auch wenn er sich Support nennt.',
             'A 2FA code is a key, not a receipt. Anyone who asks for it is standing at the door — even if they call themselves support.'),
  },
  {
    rule: bi('Erzähl es jemandem.', 'Tell somebody.'),
    text: bi('Jede Bitte um Geheimhaltung ist selbst das Erkennungszeichen. Und hinterher ist Reden der einzige Schritt, der etwas zurückholt — Scham hält diese Maschen am Laufen, nicht ihre Raffinesse.',
             'Every request for secrecy is itself the tell. And afterwards, talking is the only step that recovers anything — shame keeps these cons running, not their sophistication.'),
  },
];
