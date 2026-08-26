import { bi } from '../bi.js';

/**
 * Story 9 — Der Nebenjob als „Zahlungsabwickler".
 *
 * Die einzige Masche hier, bei der man am Ende nicht Opfer ist, sondern
 * beschuldigt wird. Genau deshalb gehört sie dazu.
 */
export default {
  id: 'nebenjob',
  icon: '💼',
  channel: 'email',
  difficulty: 3,
  title: bi('Der Nebenjob von zu Hause', 'The Job You Can Do From Home'),
  teaser: bi(
    'Zwei Stunden am Tag, 15 % Provision, keine Vorkenntnisse. Und dein eigenes Konto.',
    'Two hours a day, 15 % commission, no experience needed. And your own bank account.'),
  contact: {
    name: bi('Nordline Logistics GmbH', 'Nordline Logistics GmbH'),
    sub: bi('hr@nordline-logistics-de.com', 'hr@nordline-logistics-de.com'),
  },
  mail: {
    from: bi('Nordline Logistics — Personal <hr@nordline-logistics-de.com>',
             'Nordline Logistics — HR <hr@nordline-logistics-de.com>'),
    to: bi('deine Adresse', 'your address'),
    subject: bi('Ihre Bewerbung: Zahlungsabwickler (m/w/d), Homeoffice',
                'Your application: payment processor, remote'),
  },

  redFlags: {
    tooEasy: {
      label: bi('Viel Geld für eine Tätigkeit ohne Qualifikation',
                'Good money for work requiring no qualifications'),
      why: bi('2.400 € im Monat für zwei Stunden täglich, ohne Ausbildung, ohne Erfahrung, ohne Vorstellungsgespräch. Kein legaler Arbeitsmarkt zahlt so. Der Lohn ist hoch, weil das Risiko bei dir liegt.',
              '€2,400 a month for two hours a day, with no training, no experience and no interview. No legal labour market pays like that. The pay is high because the risk is yours.'),
    },
    ownAccount: {
      label: bi('Du sollst dein privates Konto benutzen',
                'You are told to use your own private account'),
      why: bi('Kein echtes Unternehmen wickelt Zahlungen über die Privatkonten seiner Angestellten ab. Firmen haben Geschäftskonten. Wenn deins gebraucht wird, ist genau das die eigentliche Dienstleistung, für die du bezahlt wirst.',
              'No real company processes payments through its employees’ personal accounts. Companies have business accounts. If yours is needed, that is precisely the service you are being paid for.'),
    },
    forwarding: {
      label: bi('Geld empfangen und weiterleiten',
                'Receiving money and passing it on'),
      why: bi('Das ist die Tätigkeitsbeschreibung eines Finanzagenten. Das eingehende Geld stammt fast immer von anderen Betrugsopfern, und das Weiterleiten ist Geldwäsche.',
              'That is the job description of a money mule. The incoming money almost always comes from other fraud victims, and forwarding it is money laundering.'),
    },
    noCompany: {
      label: bi('Die Firma ist nirgends auffindbar',
                'The company cannot be found anywhere'),
      why: bi('Kein Handelsregistereintrag, keine Festnetznummer, die Adresse ist ein Bürodienstleister. Die Webseite wurde vor sechs Wochen registriert.',
              'No company register entry, no landline, and the address belongs to a virtual office provider. The website was registered six weeks ago.'),
    },
    chatOnly: {
      label: bi('Bewerbungsgespräch nur per Chat',
                'The interview happens only in a chat'),
      why: bi('Kein Video, kein Telefonat, keine Unterschrift vor Ort. Wer dich einstellt, ohne dich je gehört zu haben, will keine Arbeitskraft — er will deine Kontoverbindung.',
              'No video, no phone call, no signature in person. Anybody hiring you without ever hearing your voice does not want your labour — they want your bank details.'),
    },
    percentage: {
      label: bi('Bezahlung als Prozentsatz des durchgeleiteten Geldes',
                'Pay as a percentage of the money passing through'),
      why: bi('Ein Gehalt hängt an der Arbeitszeit, nicht an der Summe, die durch dein Konto läuft. Eine Provision auf Durchleitung gibt es nur dort, wo das Durchleiten selbst der Zweck ist.',
              'A salary depends on hours worked, not on the sum passing through your account. A commission on throughput exists only where the throughput itself is the point.'),
    },
    startNow: {
      label: bi('Sofortiger Beginn, Vertrag später',
                'Start immediately, contract later'),
      why: bi('„Die Unterlagen schicken wir nach" heißt, dass es keine gibt. Der Start soll erfolgen, bevor jemand die Firma nachschlägt.',
              '“We will send the paperwork on” means there is none. They want you to start before anybody looks the company up.'),
    },
    yourName: {
      label: bi('Am Ende steht dein Name auf allem',
                'In the end your name is on everything'),
      why: bi('Die Täter bleiben unsichtbar, dein Konto nicht. Die Rückforderung, die Kontokündigung und das Ermittlungsverfahren treffen dich — auch wenn du nichts geahnt hast.',
              'The offenders stay invisible, your account does not. The clawback, the account closure and the criminal investigation land on you — even if you had no idea.'),
    },
  },

  start: 'n1',
  nodes: {

    /* ============ Kapitel 1: Das Angebot ============ */

    n1: {
      chapter: bi('Kapitel 1 — Das Angebot', 'Chapter 1 — The offer'),
      messages: [
        { kind: 'system', text: bi(
          'Du suchst seit zwei Monaten einen Nebenjob. Vor drei Wochen hast du auf einem Jobportal ein Profil angelegt. Heute liegt eine Antwort im Postfach.',
          'You have been looking for a side job for two months. Three weeks ago you put a profile on a job site. Today there is a reply in your inbox.') },
        { from: 'them', time: '10:14', text: bi(
          'Sehr geehrte Bewerberin, wir haben Ihr Profil gesehen und suchen aktuell Zahlungsabwickler im Homeoffice. Ca. 2 Stunden täglich, freie Zeiteinteilung, keine Vorkenntnisse nötig. Vergütung: 15 % Provision, im Schnitt 2.400 € monatlich.',
          'Dear applicant, we have seen your profile and are currently looking for remote payment processors. Around 2 hours a day, flexible hours, no experience required. Pay: 15 % commission, averaging €2,400 a month.') },
      ],
      flags: ['tooEasy', 'percentage'],
      tactic: 'greed',
      info: {
        icon: '🧲',
        title: bi('Warum diese Anzeigen so gut aussehen',
                  'Why these adverts look so good'),
        body: [
          bi('Sie sind gezielt auf Menschen zugeschnitten, die gerade Geld brauchen und wenig Verhandlungsmacht haben: Studierende, Alleinerziehende, Menschen kurz nach einer Kündigung. Die Profile dafür kommen aus Jobportalen.',
             'They are aimed at people who need money right now and have little bargaining power: students, single parents, people just after a redundancy. The profiles come from job sites.'),
          bi('Die Bezeichnungen wechseln ständig: Zahlungsabwickler, Finanzagent, Treuhandassistent, Payment Officer, Regionalvertreter. Gemeint ist immer dasselbe.',
             'The job titles keep changing: payment processor, financial agent, trust assistant, payment officer, regional representative. They all mean the same thing.'),
        ],
      },
      prompt: bi('2.400 € für zwei Stunden am Tag. Ohne Vorkenntnisse.',
                 '€2,400 for two hours a day. With no experience.'),
      choices: [
        { text: bi('Nachfragen, was genau die Aufgabe ist',
                   'Ask what the job actually involves'),
          next: 'n2_task', risk: 0, verdict: 'good', catches: ['tooEasy'],
          why: bi('Die richtige Frage. Bei einem seriösen Job steht die Aufgabe schon in der Anzeige — hier musst du sie erfragen, und die Antwort ist verräterisch.',
                  'The right question. With a legitimate job the task is already in the advert — here you have to ask, and the answer gives it away.') },
        { text: bi('Die Firma im Handelsregister nachschlagen',
                   'Look the company up in the company register'),
          next: 'n2_register', risk: -1, verdict: 'good', catches: ['noCompany'],
          why: bi('Der schnellste Weg. Jede echte GmbH steht im Handelsregister, kostenlos einsehbar.',
                  'The fastest route. Every real limited company is in the public register, free to search.') },
        { text: bi('Zusagen, das klingt gut',
                   'Say yes, this sounds good'),
          next: 'n3_contract', risk: 2, verdict: 'bad',
          why: bi('Zusagen, bevor du weißt, was du tun sollst. Genau darauf ist die Anzeige gebaut.',
                  'Agreeing before you know what you are meant to do. That is exactly what the advert is built for.') },
        { text: bi('Löschen, das ist zu schön',
                   'Delete it, this is too good to be true'),
          next: 'end_deleted', risk: -2, verdict: 'good', catches: ['tooEasy', 'percentage'],
          why: bi('Ein Bauchgefühl reicht als Grund. Bei Jobangeboten gilt dieselbe Regel wie bei Gewinnen: Wenn es zu gut aussieht, ist es keins.',
                  'A gut feeling is reason enough. With job offers the same rule applies as with prizes: if it looks too good, it is not one.') },
      ],
    },

    n2_register: {
      messages: [
        { kind: 'system', text: bi(
          'Kein Eintrag im Handelsregister. Die Adresse gehört einem Anbieter für virtuelle Büros. Die Domain wurde vor sechs Wochen registriert. Eine Telefonnummer gibt es nicht, nur ein Kontaktformular.',
          'No entry in the company register. The address belongs to a virtual office provider. The domain was registered six weeks ago. There is no phone number, only a contact form.') },
      ],
      flags: ['noCompany'],
      tactic: 'authority',
      info: {
        icon: '🔍',
        title: bi('Wie man einen Arbeitgeber in fünf Minuten prüft',
                  'How to check an employer in five minutes'),
        body: [
          bi('Handelsregister: Gibt es die Firma überhaupt, und seit wann? Impressum: ladungsfähige Anschrift und Telefonnummer? Karten-App: Steht an der Adresse ein Unternehmen oder ein Briefkasten?',
             'Company register: does the firm exist at all, and since when? Legal notice: a serviceable address and a phone number? Maps app: is there a business at that address, or a letterbox?'),
          bi('Und der einfachste Test: Ruf die Nummer an. Bei diesen Angeboten gibt es keine, oder es geht nie jemand ran.',
             'And the simplest test: ring the number. With these offers there is none, or nobody ever answers.'),
        ],
      },
      prompt: bi('Die Firma existiert auf dem Papier nicht.',
                 'On paper the company does not exist.'),
      choices: [
        { text: bi('Melden und löschen', 'Report it and delete'),
          next: 'end_reported', risk: -2, verdict: 'good', catches: ['noCompany', 'tooEasy'],
          why: bi('Sauber erledigt. Jobportale nehmen solche Meldungen ernst — die Anzeige verschwindet oft am selben Tag.',
                  'Cleanly done. Job sites take these reports seriously — the advert often disappears the same day.') },
        { text: bi('Trotzdem antworten, vielleicht sind sie einfach neu',
                   'Reply anyway, maybe they are just new'),
          next: 'n2_task', risk: 2, verdict: 'bad',
          why: bi('Eine sechs Wochen alte Domain plus virtuelles Büro plus fehlendes Register ist kein Startup-Problem, sondern ein Muster.',
                  'A six-week-old domain plus a virtual office plus no register entry is not a start-up problem, it is a pattern.') },
      ],
    },

    n2_task: {
      messages: [
        { from: 'them', time: '11:02', text: bi(
          'Sehr einfach: Unsere internationalen Kunden überweisen Zahlungen auf Ihr Konto. Sie behalten 15 % und leiten den Rest über einen von uns genannten Weg weiter. Wir nutzen dafür Privatkonten, weil unsere Geschäftskonten wegen der Umstellung auf SEPA-Instant derzeit blockiert sind.',
          'Very simple: our international clients transfer payments into your account. You keep 15 % and forward the rest by a route we specify. We use private accounts because our business accounts are currently blocked due to the SEPA instant migration.') },
      ],
      flags: ['ownAccount', 'forwarding'],
      tactic: 'authority',
      info: {
        icon: '⚖️',
        title: bi('Das ist die juristische Definition von Geldwäsche',
                  'This is the legal definition of money laundering'),
        body: [
          bi('Wer Geld entgegennimmt, von dem er wissen müsste, dass es aus einer Straftat stammt, und es weiterleitet, macht sich strafbar. „Ich dachte, es sei ein Job" schützt nicht — es genügt, dass du es hättest erkennen können.',
             'Receiving money you ought to know comes from a crime and passing it on is a criminal offence. “I thought it was a job” is no defence — it is enough that you could have realised.'),
          bi('Und du hättest es erkennen können: An dieser Stelle steht die Tätigkeit ausdrücklich in der Nachricht. Das hier ist der letzte Moment, in dem Aussteigen folgenlos bleibt.',
             'And you could have realised: at this point the task is spelled out in the message. This is the last moment at which walking away costs you nothing.'),
        ],
      },
      prompt: bi('Fremdes Geld über dein Konto weiterleiten. Für 15 %.',
                 'Forwarding other people’s money through your account. For 15 %.'),
      choices: [
        { text: bi('Absagen. Das ist Geldwäsche',
                   'Decline. That is money laundering'),
          next: 'end_refused', risk: -2, verdict: 'good', catches: ['forwarding', 'ownAccount'],
          why: bi('Genau erkannt, und im richtigen Moment. Diese Tätigkeitsbeschreibung ist kein Job, sondern eine Straftat mit Gehaltsangabe.',
                  'Correctly identified, and at the right moment. That job description is not employment, it is a criminal offence with a salary attached.') },
        { text: bi('Bei der Verbraucherzentrale oder der Bank nachfragen',
                   'Ask a consumer advice centre or your bank'),
          next: 'end_asked', risk: -2, verdict: 'good', catches: ['forwarding', 'noCompany'],
          why: bi('Der sicherste Weg bei Unsicherheit. Banken kennen diese Masche genau — sie sehen die Folgen jede Woche.',
                  'The safest route when unsure. Banks know this con inside out — they see the consequences every week.') },
        { text: bi('„Klingt logisch." Zusagen',
                   '“Makes sense.” Say yes'),
          next: 'n3_contract', risk: 3, verdict: 'bad',
          why: bi('Die Erklärung mit den blockierten Geschäftskonten ist frei erfunden. Sie klingt technisch genug, dass man nicht nachfragt.',
                  'The explanation about blocked business accounts is pure invention. It sounds technical enough that nobody asks.') },
      ],
    },

    /* ============ Kapitel 2: Der Vertrag ============ */

    n3_contract: {
      chapter: bi('Kapitel 2 — Der Vertrag', 'Chapter 2 — The contract'),
      messages: [
        { from: 'them', time: '14:20', text: bi(
          'Willkommen im Team! Das Einstellungsgespräch führen wir hier im Chat, das spart allen Zeit. Bitte senden Sie: Ausweisfoto (Vorder- und Rückseite), IBAN, Anschrift und Geburtsdatum.',
          'Welcome to the team! We will do the hiring interview here in the chat, it saves everybody time. Please send: photo of your ID (front and back), IBAN, address and date of birth.') },
        { from: 'them', time: '14:21', text: bi(
          'Den Arbeitsvertrag schicken wir Ihnen in den nächsten Tagen nach. Sie können sofort anfangen.',
          'We will send the employment contract on in the next few days. You can start straight away.') },
      ],
      flags: ['chatOnly', 'startNow'],
      tactic: 'commitment',
      info: {
        icon: '🪪',
        title: bi('Was mit dem Ausweisfoto passiert',
                  'What happens to the photo of your ID'),
        body: [
          bi('Ein Ausweisbild plus Geburtsdatum plus Anschrift reicht aus, um in deinem Namen Konten zu eröffnen, Verträge abzuschließen und Kredite zu beantragen. Es ist mehr wert als jedes Passwort.',
             'A photo of your ID plus date of birth plus address is enough to open accounts, sign contracts and apply for loans in your name. It is worth more than any password.'),
          bi('Ein echter Arbeitgeber prüft den Ausweis persönlich oder über ein zertifiziertes Verfahren — und braucht ihn erst, wenn der Vertrag unterschrieben ist, nicht vorher.',
             'A genuine employer checks ID in person or through a certified process — and needs it only once the contract is signed, not before.'),
        ],
      },
      prompt: bi('Ausweis, IBAN, Geburtsdatum. Vertrag angeblich später.',
                 'ID, IBAN, date of birth. Contract supposedly later.'),
      choices: [
        { text: bi('Auf einem Vertrag vor allem anderen bestehen',
                   'Insist on a contract before anything else'),
          next: 'n3_pressure', risk: -1, verdict: 'good', catches: ['startNow'],
          why: bi('Völlig normale Forderung — und genau die, an der diese Angebote scheitern.',
                  'An entirely normal request — and precisely the one these offers fail at.') },
        { text: bi('Absagen und die Anzeige melden',
                   'Decline and report the advert'),
          next: 'end_refused', risk: -2, verdict: 'good', catches: ['chatOnly', 'startNow', 'noCompany'],
          why: bi('Kein Video, kein Telefonat, kein Vertrag, aber sofort der Ausweis: Das ist kein Einstellungsverfahren.',
                  'No video, no phone call, no contract, but your ID right away: that is not a hiring process.') },
        { text: bi('Unterlagen schicken', 'Send the documents'),
          next: 'n4_first', risk: 3, verdict: 'bad', form: true,
          why: bi('Damit sind Ausweis und Kontoverbindung draußen. Beides lässt sich nicht zurückholen.',
                  'Your ID and your bank details are now out. Neither can be recalled.') },
      ],
    },

    n3_pressure: {
      messages: [
        { from: 'them', time: '14:40', text: bi(
          'Der Vertrag kommt selbstverständlich. Nur läuft gerade eine Zahlung eines Kunden auf, die heute noch abgewickelt werden muss. Wenn Sie erst nächste Woche starten können, müssen wir die Stelle leider anders besetzen.',
          'The contract will follow of course. It is just that a client payment is coming in that has to be processed today. If you can only start next week we will unfortunately have to give the position to somebody else.') },
      ],
      flags: ['startNow'],
      tactic: 'urgency',
      prompt: bi('Der Job soll weg sein, wenn du auf einen Vertrag wartest.',
                 'The job will supposedly be gone if you wait for a contract.'),
      choices: [
        { text: bi('Dann eben nicht. Absagen',
                   'Then so be it. Decline'),
          next: 'end_refused', risk: -2, verdict: 'good', catches: ['startNow', 'chatOnly'],
          why: bi('Ein Arbeitgeber, der die Stelle vergibt, weil du einen Vertrag sehen willst, wollte dich nie einstellen.',
                  'An employer who gives the job away because you asked to see a contract never intended to hire you.') },
        { text: bi('Nachgeben, du brauchst das Geld',
                   'Give in, you need the money'),
          next: 'n4_first', risk: 3, verdict: 'bad',
          why: bi('Genau darauf zielt die Anzeige: Wer Geld braucht, prüft weniger. Der Zeitdruck ist der letzte Baustein.',
                  'That is exactly what the advert targets: people who need money check less. The time pressure is the final piece.') },
      ],
    },

    /* ============ Kapitel 3: Die erste Überweisung ============ */

    n4_first: {
      chapter: bi('Kapitel 3 — Die erste Überweisung', 'Chapter 3 — The first transfer'),
      messages: [
        { kind: 'system', text: bi(
          'Am nächsten Morgen gehen 4.180 € auf deinem Konto ein. Absender: eine Privatperson aus Bochum, Verwendungszweck „Anzahlung Wohnmobil".',
          'The next morning €4,180 arrives in your account. Sender: a private individual in Bochum, reference “deposit, motorhome”.') },
        { from: 'them', time: '09:15', text: bi(
          'Perfekt. Bitte behalten Sie 627 € und senden Sie 3.553 € über den beiliegenden Krypto-Dienst weiter. Bitte heute noch.',
          'Perfect. Please keep €627 and forward €3,553 via the crypto service attached. Today if possible.') },
      ],
      flags: ['forwarding', 'yourName'],
      tactic: 'commitment',
      info: {
        icon: '🚨',
        title: bi('Der Verwendungszweck verrät alles',
                  'The payment reference gives it away'),
        body: [
          bi('„Anzahlung Wohnmobil" von einer Privatperson: Das ist keine Kundenzahlung an eine Logistikfirma. Da hat jemand ein Fahrzeug gekauft, das es nicht gibt — und das Geld auf dein Konto überwiesen.',
             '“Deposit, motorhome” from a private individual: that is not a client paying a logistics company. Somebody has bought a vehicle that does not exist — and sent the money to your account.'),
          bi('Weiterleiten über Krypto macht die Spur unumkehrbar. Bis dahin ist das Geld noch auffindbar, danach nicht mehr. Das ist der Grund für die Eile.',
             'Forwarding via crypto makes the trail irreversible. Until then the money can still be traced; afterwards it cannot. That is the reason for the hurry.'),
          bi('Hier ist der letzte Punkt, an dem du auf der richtigen Seite stehst: Das Geld liegt noch auf deinem Konto und lässt sich zurückholen.',
             'This is the last point at which you are still on the right side of it: the money is still in your account and can be sent back.'),
        ],
      },
      prompt: bi('4.180 € von einer Privatperson. Du sollst 3.553 € in Krypto weiterschicken.',
                 '€4,180 from a private individual. You are to forward €3,553 in crypto.'),
      choices: [
        { text: bi('Nichts weiterleiten und sofort die Bank anrufen',
                   'Forward nothing and call the bank immediately'),
          next: 'end_stopped', risk: -2, verdict: 'good', catches: ['forwarding', 'yourName'],
          why: bi('Der rettende Zug. Solange das Geld nicht weiter ist, bist du Zeugin und nicht Beschuldigte.',
                  'The move that saves you. As long as the money has not moved on, you are a witness and not a suspect.') },
        { text: bi('Den Absender in Bochum anrufen und fragen',
                   'Call the sender in Bochum and ask'),
          next: 'n4_victim', risk: -1, verdict: 'good', catches: ['yourName'],
          why: bi('Ungewöhnlich, aber klug. Der Absender kann dir in einem Satz sagen, was hier läuft.',
                  'Unusual, but smart. The sender can tell you in one sentence what is going on here.') },
        { text: bi('Weiterleiten, das ist ja der Job',
                   'Forward it, that is the job'),
          next: 'n5_more', risk: 3, verdict: 'bad',
          why: bi('Ab jetzt bist du in den Akten. Der Zeitpunkt der Weiterleitung ist der Zeitpunkt, an dem du strafbar wirst.',
                  'From now on you are in the file. The moment of forwarding is the moment you become criminally liable.') },
      ],
    },

    n4_victim: {
      messages: [
        { kind: 'system', text: bi(
          'Der Mann aus Bochum ist verzweifelt: Er hat ein Wohnmobil aus einer Kleinanzeige gekauft. Die Verkäuferin hieß angeblich wie du und hat ihm deine Kontonummer geschickt.',
          'The man in Bochum is distraught: he bought a motorhome from a classified ad. The seller supposedly had your name and gave him your account number.') },
      ],
      flags: ['yourName'],
      tactic: 'shame',
      prompt: bi('Dein Name und dein Konto stehen in einer Betrugsanzeige, von der du nichts wusstest.',
                 'Your name and your account are in a fraud advert you knew nothing about.'),
      choices: [
        { text: bi('Geld zurücküberweisen, Bank informieren, Anzeige erstatten',
                   'Send the money back, tell the bank, file a report'),
          next: 'end_stopped', risk: -2, verdict: 'good', catches: ['forwarding', 'yourName', 'noCompany'],
          why: bi('Genau die richtige Reihenfolge. Wer selbst zur Polizei geht, steht am Ende als Zeugin da, nicht als Beschuldigte.',
                  'Exactly the right order. Anyone who goes to the police themselves ends up as a witness, not a suspect.') },
        { text: bi('Trotzdem weiterleiten — du hast ja zugesagt',
                   'Forward it anyway — you did agree to'),
          next: 'n5_more', risk: 3, verdict: 'bad',
          why: bi('Du weißt jetzt sicher, woher das Geld kommt. Ab diesem Wissen ist es kein Versehen mehr.',
                  'You now know for certain where the money came from. With that knowledge it stops being an accident.') },
      ],
    },

    n5_more: {
      messages: [
        { kind: 'system', text: bi(
          'In den nächsten neun Tagen laufen sechs weitere Zahlungen ein. Insgesamt 27.400 €. Du behältst 4.110 €.',
          'Over the next nine days six more payments arrive. €27,400 in total. You keep €4,110.') },
        { kind: 'system', text: bi(
          'Am zehnten Tag ist das Konto gesperrt. Zwei Wochen später liegt ein Schreiben der Staatsanwaltschaft im Briefkasten.',
          'On the tenth day the account is frozen. Two weeks later a letter from the public prosecutor arrives.') },
      ],
      flags: ['yourName'],
      tactic: 'fear',
      prompt: bi('Ermittlungsverfahren wegen Geldwäsche. Gegen dich.',
                 'A money laundering investigation. Against you.'),
      choices: [
        { text: bi('Sofort anwaltliche Hilfe holen und alles offenlegen',
                   'Get legal help immediately and disclose everything'),
          next: 'end_charged', risk: -1, verdict: 'good',
          why: bi('Das Richtige im schlechtesten Fall. Der vollständige Chatverlauf belegt, wie es dazu kam — das ist entscheidend.',
                  'The right move in the worst case. The complete chat history documents how it happened — and that is what counts.') },
        { text: bi('Erst mal nichts sagen und hoffen',
                   'Say nothing for now and hope'),
          next: 'end_worst', risk: 3, verdict: 'bad',
          why: bi('Schweigen macht es schlimmer: Ohne deine Darstellung bleibt nur die Aktenlage, und die sieht nach Vorsatz aus.',
                  'Silence makes it worse: without your account of it only the file remains, and the file looks deliberate.') },
      ],
    },

    /* ============ Ausgänge ============ */

    end_deleted: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi('Mail gelöscht. Zwei Wochen später kommt dieselbe Anzeige unter anderem Firmennamen.',
                                   'Mail deleted. Two weeks later the same advert appears under a different company name.') },
      ],
      damage: bi('0 € — und keine Akte', '€0 — and no criminal record'),
      lessons: [
        bi('Kein legaler Job zahlt viel Geld für wenig Arbeit ohne Qualifikation.',
           'No legal job pays a lot of money for little work with no qualifications.'),
        bi('Bezahlung als Prozentsatz durchgeleiteten Geldes gibt es nur dort, wo das Durchleiten der Zweck ist.',
           'Pay as a percentage of money passing through exists only where the passing through is the point.'),
      ],
    },

    end_reported: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'Du meldest die Anzeige beim Jobportal. Sie ist am selben Abend offline.',
          'You report the advert to the job site. It is offline the same evening.') },
      ],
      damage: bi('0 € — Anzeige gemeldet', '€0 — advert reported'),
      lessons: [
        bi('Arbeitgeber lassen sich in fünf Minuten prüfen: Handelsregister, Impressum, Telefonnummer, Adresse in der Karten-App.',
           'Employers can be checked in five minutes: company register, legal notice, phone number, address in a maps app.'),
        bi('Jobportale nehmen Meldungen ernst. Eine Meldung schützt die Nächsten.',
           'Job sites take reports seriously. One report protects the next people.'),
      ],
    },

    end_refused: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'Du sagst ab. Es kommen noch vier Nachrichten mit besseren Konditionen, dann ist Ruhe.',
          'You decline. Four more messages arrive with better terms, then it stops.') },
      ],
      damage: bi('0 € — und kein Ermittlungsverfahren', '€0 — and no investigation'),
      lessons: [
        bi('Wer dein privates Konto für Geschäftszahlungen braucht, will genau das — dein Konto.',
           'Anybody who needs your private account for business payments wants exactly that — your account.'),
        bi('Geld für Dritte weiterzuleiten ist Geldwäsche, auch ohne Vorsatz und ohne eigenen Gewinn.',
           'Forwarding money for third parties is money laundering, even without intent and without profit.'),
        bi('Ein Angebot, das bei der Frage nach einem Vertrag verschwindet, war nie ein Angebot.',
           'An offer that vanishes when you ask for a contract was never an offer.'),
      ],
    },

    end_asked: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'Die Beraterin braucht zwei Sätze: „Das ist Finanzagenten-Werbung. Bitte auf keinen Fall zusagen — und wenn schon Daten raus sind, sofort die Bank informieren."',
          'The adviser needs two sentences: “That is money mule recruitment. Please do not agree to it — and if any data is already out, tell your bank at once.”') },
      ],
      damage: bi('0 € — Masche früh eingeordnet', '€0 — the con identified early'),
      lessons: [
        bi('Bei Unsicherheit fragen kostet nichts. Verbraucherzentrale und Bank kennen diese Masche genau.',
           'Asking when unsure costs nothing. Consumer advice centres and banks know this con inside out.'),
        bi('Diese Masche ist die einzige, bei der man am Ende nicht als Opfer, sondern als Beschuldigte dasteht.',
           'This is the only con where you end up not as a victim but as a defendant.'),
      ],
    },

    end_stopped: {
      outcome: 'close',
      messages: [
        { kind: 'system', text: bi(
          'Die Bank holt die 4.180 € zurück zum Absender und sperrt das Konto vorsorglich. Du erstattest selbst Anzeige.',
          'The bank returns the €4,180 to the sender and freezes the account as a precaution. You file a report yourself.') },
        { kind: 'system', text: bi(
          'Das Verfahren gegen dich wird eingestellt: Du hast nichts weitergeleitet und dich selbst gemeldet. Ein neues Konto dauert drei Wochen.',
          'The case against you is dropped: you forwarded nothing and reported it yourself. A new account takes three weeks.') },
      ],
      damage: bi('Kein Geld verloren — aber drei Wochen ohne Konto',
                 'No money lost — but three weeks without a bank account'),
      lessons: [
        bi('Solange nichts weitergeleitet ist, bist du Zeugin. Ab der ersten Weiterleitung Beschuldigte.',
           'As long as nothing has been forwarded you are a witness. From the first forwarding onwards, a suspect.'),
        bi('Selbst zur Polizei zu gehen ist der entscheidende Unterschied. Es zeigt, dass du nichts verbergen wolltest.',
           'Going to the police yourself is the decisive difference. It shows you had nothing to hide.'),
        bi('Ausweisfoto und IBAN waren trotzdem draußen — beides sollte man ab da im Blick behalten.',
           'Your ID photo and IBAN were out regardless — both are worth keeping an eye on from then on.'),
      ],
      recover: [
        bi('Sofort die Bank informieren und das Geld unangetastet lassen.',
           'Tell the bank immediately and leave the money untouched.'),
        bi('Selbst Anzeige erstatten und den kompletten Chatverlauf sichern.',
           'File a report yourself and preserve the entire chat history.'),
        bi('Bei der Schufa eine Selbstauskunft einholen, falls der Ausweis verwendet wurde.',
           'Request a copy of your credit record in case the ID was used.'),
      ],
    },

    end_charged: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi(
          'Mit Anwältin und vollständigem Chatverlauf endet das Verfahren nach acht Monaten gegen Geldauflage. Die 4.110 € musst du zurückzahlen, dazu die Anwaltskosten.',
          'With a lawyer and the full chat history the case ends after eight months with a fine. You have to repay the €4,110, plus legal costs.') },
        { kind: 'system', text: bi(
          'Deine Bank kündigt das Konto. Eine neue Bank zu finden dauert Monate.',
          'Your bank closes the account. Finding a new one takes months.') },
      ],
      flags: ['yourName'],
      damage: bi('4.110 € zurückzuzahlen + Anwaltskosten + Konto gekündigt',
                 '€4,110 to repay + legal costs + account closed'),
      lessons: [
        bi('Der Verdienst aus dieser Tätigkeit muss vollständig zurückgezahlt werden — es bleibt nie etwas übrig.',
           'Everything earned from this has to be repaid — nothing is ever left over.'),
        bi('„Ich wusste es nicht" schützt nicht. Es genügt, dass du es hättest erkennen können.',
           '“I did not know” is no defence. It is enough that you could have realised.'),
        bi('Der vollständige Chatverlauf war das Wichtigste, was du noch hattest. Nie löschen.',
           'The complete chat history was the most important thing you still had. Never delete it.'),
      ],
      recover: [
        bi('Sofort anwaltliche Beratung — bei Geldwäschevorwürfen nicht ohne.',
           'Get legal advice immediately — never face a money laundering allegation without it.'),
        bi('Alles offenlegen und den kompletten Verlauf vorlegen.',
           'Disclose everything and hand over the complete history.'),
        bi('Nichts löschen, auch nichts Unangenehmes. Es entlastet dich.',
           'Delete nothing, not even the uncomfortable parts. It works in your favour.'),
      ],
    },

    end_worst: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi(
          'Ohne Erklärung sieht die Akte nach Vorsatz aus. Es kommt zur Anklage; am Ende steht eine Geldstrafe und ein Eintrag im Führungszeugnis.',
          'With no explanation the file looks deliberate. Charges follow; the outcome is a fine and an entry on your criminal record.') },
        { kind: 'system', text: bi(
          'Sechs Betrugsopfer verlangen ihr Geld von dir zurück — insgesamt 27.400 €.',
          'Six fraud victims want their money back from you — €27,400 in total.') },
      ],
      flags: ['yourName'],
      damage: bi('27.400 € Rückforderung + Geldstrafe + Eintrag im Führungszeugnis',
                 '€27,400 clawback + a fine + a criminal record'),
      lessons: [
        bi('Schweigen hilft hier nicht. Ohne deine Darstellung bleibt nur die Aktenlage.',
           'Silence does not help here. Without your account of it only the file remains.'),
        bi('Die Opfer der ursprünglichen Betrügereien halten sich an das Konto, das sie kennen — und das ist deins.',
           'The victims of the original frauds go after the account they know about — and that is yours.'),
        bi('Diese Masche kostet nicht nur Geld, sondern die Möglichkeit, ein normales Konto zu führen.',
           'This con costs not only money but the ability to hold an ordinary bank account.'),
      ],
      recover: [
        bi('Auch spät noch anwaltliche Hilfe holen und aussagen.',
           'Get legal help and give your account of it, even late.'),
        bi('Den gesamten Schriftverkehr sichern und vorlegen.',
           'Preserve and submit all the correspondence.'),
        bi('Mit der Bank und den Geschädigten über Rückzahlung sprechen — Kooperation wirkt strafmildernd.',
           'Talk to the bank and the victims about repayment — cooperation reduces the sentence.'),
      ],
    },
  },
};
