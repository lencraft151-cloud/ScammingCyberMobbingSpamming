import { bi } from '../bi.js';

/** Story 7 — Gewinnbenachrichtigung per Mail, dahinter Datenabgriff und Abo-Falle. */
export default {
  id: 'gewinnspiel',
  icon: '🎁',
  channel: 'email',
  difficulty: 1,
  title: bi('Du hast gewonnen!', 'You Have Won!'),
  teaser: bi(
    'Ein Smartphone, kostenlos. Es fehlt nur noch die Versandpauschale.',
    'A smartphone, free of charge. All that is missing is the shipping fee.'),
  contact: {
    name: bi('Gewinn-Service', 'Prize Service'),
    sub: bi('gewinn@mediamarkt-aktion-de.com', 'gewinn@mediamarkt-aktion-de.com'),
  },
  mail: {
    from: bi('Gewinn-Service <gewinn@mediamarkt-aktion-de.com>', 'Prize Service <gewinn@mediamarkt-aktion-de.com>'),
    to: bi('(unbekannte Empfängerliste)', '(undisclosed recipients)'),
    subject: bi('Herzlichen Glückwunsch! Ihr Gewinn wartet auf Abholung',
                'Congratulations! Your prize is waiting to be claimed'),
  },

  redFlags: {
    noEntry: {
      label: bi('Du hast nie teilgenommen',
                'You never entered'),
      why: bi('Man kann nichts gewinnen, wofür man sich nie angemeldet hat. Das ist der ganze Fall.',
              'You cannot win something you never entered. That is the whole case.'),
    },
    fakeDomain: {
      label: bi('Absenderadresse mit angehängtem Zusatz',
                'A sender address with an extra bit tacked on'),
      why: bi('mediamarkt-aktion-de.com gehört nicht zu MediaMarkt. Alles vor dem @ ist frei erfindbar, alles danach entscheidet.',
              'mediamarkt-aktion-de.com does not belong to MediaMarkt. Anything before the @ is free to invent; what comes after decides.'),
    },
    bcc: {
      label: bi('Die Mail geht an eine verdeckte Empfängerliste',
                'The mail goes to an undisclosed recipient list'),
      why: bi('Ein persönlicher Gewinn geht an eine Person, nicht an zehntausend gleichzeitig.',
              'A personal prize goes to one person, not to ten thousand at once.'),
    },
    smallFee: {
      label: bi('Kleine Gebühr für einen großen Gewinn',
                'A small fee for a large prize'),
      why: bi('Wer etwas verschenkt, verlangt nichts. Die 1,95 € dienen nur dazu, an Zahlungsdaten zu kommen.',
              'Anyone giving something away asks for nothing. The €1.95 exists only to harvest payment details.'),
    },
    subscription: {
      label: bi('Im Kleingedruckten steckt ein Abo',
                'The small print hides a subscription'),
      why: bi('Unter dem Gewinnformular steht in Grau: 39,90 € monatlich nach der Testphase.',
              'Under the prize form, in grey: €39.90 per month once the trial ends.'),
    },
    dataGrab: {
      label: bi('Weit mehr Daten als nötig',
                'Far more data than the task requires'),
      why: bi('Für einen Versand braucht niemand Geburtsdatum, Beruf, Einkommen und Handynummer.',
              'Nobody needs your date of birth, job, income and mobile number in order to post a parcel.'),
    },
  },

  start: 'n1',
  nodes: {

    n1: {
      messages: [
        { from: 'them', time: '09:03', text: bi(
          'Herzlichen Glückwunsch! Sie wurden aus 50.000 Teilnehmern ausgelost und erhalten ein Smartphone der neuesten Generation. Zur Abholung bitte innerhalb von 48 Stunden bestätigen.',
          'Congratulations! You have been drawn from 50,000 entrants and will receive a latest-generation smartphone. Please confirm within 48 hours to claim it.') },
      ],
      flags: ['noEntry', 'fakeDomain', 'bcc'],
      prompt: bi('Du erinnerst dich an kein Gewinnspiel.', 'You do not remember entering anything.'),
      choices: [
        { text: bi('Absenderadresse genau ansehen',
                   'Look closely at the sender address'),
          next: 'n2_sender', risk: 0, verdict: 'good', catches: ['fakeDomain'],
          why: bi('Der erste Griff bei jeder verdächtigen Mail: Was steht wirklich hinter dem @?',
                  'The first move with any suspicious mail: what is actually after the @?') },
        { text: bi('„Bestätigen" anklicken', 'Click “Confirm”'),
          next: 'n3_form', risk: 2, verdict: 'bad',
          why: bi('Ein Klick bestätigt schon, dass diese Adresse gelesen wird — allein das ist Geld wert.',
                  'A single click already confirms this address is read — which by itself has resale value.') },
        { text: bi('Löschen. Ich habe nie teilgenommen',
                   'Delete it. I never entered anything'),
          next: 'end_deleted', risk: -2, verdict: 'good', catches: ['noEntry', 'bcc'],
          why: bi('Die kürzeste richtige Antwort auf jede Gewinnbenachrichtigung.',
                  'The shortest correct response to any prize notification.') },
      ],
    },

    n2_sender: {
      messages: [
        { kind: 'system', text: bi(
          'Hinter dem @ steht mediamarkt-aktion-de.com. Die echte Domain wäre mediamarkt.de. Im Kopf der Mail: Empfänger „undisclosed-recipients".',
          'After the @ it says mediamarkt-aktion-de.com. The genuine domain would be mediamarkt.de. In the header: recipients “undisclosed-recipients”.') },
      ],
      flags: ['fakeDomain', 'bcc'],
      prompt: bi('Falsche Domain, Massenversand.', 'Wrong domain, mass mailing.'),
      choices: [
        { text: bi('Als Phishing melden und löschen',
                   'Report as phishing and delete'),
          next: 'end_deleted', risk: -2, verdict: 'good', catches: ['fakeDomain', 'bcc', 'noEntry'],
          why: bi('Melden trainiert den Spamfilter — für dich und für alle anderen.',
                  'Reporting trains the spam filter — for you and for everyone else.') },
        { text: bi('Trotzdem schauen, was dahinter steckt',
                   'Have a look anyway to see what is behind it'),
          next: 'n3_form', risk: 1, verdict: 'meh',
          why: bi('Neugier ist verständlich. Nur bitte nichts ausfüllen.',
                  'Curiosity is understandable. Just do not fill anything in.') },
      ],
    },

    n3_form: {
      messages: [
        { kind: 'system', text: bi(
          'Ein Formular öffnet sich: Name, Adresse, Geburtsdatum, Handynummer, Beruf, monatliches Einkommen. Unten ein vorangekreuztes Kästchen.',
          'A form opens: name, address, date of birth, mobile number, occupation, monthly income. At the bottom, a pre-ticked box.') },
      ],
      flags: ['dataGrab', 'subscription'],
      page: {
        url: bi('mediamarkt-aktion-de.com/gewinn', 'mediamarkt-aktion-de.com/gewinn'),
        badPart: bi('-aktion-de.com', '-aktion-de.com'),
        heading: bi('Gewinn anfordern', 'Claim your prize'),
        fields: [
          bi('Vor- und Nachname', 'Full name'),
          bi('Handynummer', 'Mobile number'),
          bi('Monatliches Einkommen', 'Monthly income'),
        ],
      },
      prompt: bi('Einkommen und Beruf — für einen Paketversand.',
                 'Income and occupation — for posting a parcel.'),
      choices: [
        { text: bi('Das vorangekreuzte Kästchen lesen',
                   'Read the pre-ticked box'),
          next: 'n4_smallprint', risk: 0, verdict: 'good', catches: ['subscription'],
          why: bi('Vorangekreuzte Kästchen sind der Ort, an dem Abos versteckt werden.',
                  'Pre-ticked boxes are exactly where subscriptions get buried.') },
        { text: bi('Formular ausfüllen und absenden',
                   'Fill in the form and submit'),
          next: 'n4_fee', risk: 3, verdict: 'bad', form: true,
          why: bi('Diese Daten sind der eigentliche Gewinn — für die andere Seite.',
                  'That data is the actual prize — for the other side.') },
        { text: bi('Tab schließen', 'Close the tab'),
          next: 'end_deleted', risk: -1, verdict: 'good', catches: ['dataGrab'],
          why: bi('Wer nach dem Einkommen fragt, will kein Handy verschenken.',
                  'Anyone asking about your income is not giving away a phone.') },
      ],
    },

    n4_smallprint: {
      messages: [
        { kind: 'system', text: bi(
          'In grauer 8-Punkt-Schrift: „Mit dem Absenden schließen Sie ein Premium-Abo ab. Nach 7 Tagen Testphase 39,90 € monatlich, Mindestlaufzeit 12 Monate."',
          'In grey 8-point type: “By submitting you enter a premium subscription. After a 7-day trial, €39.90 per month, minimum term 12 months.”') },
      ],
      flags: ['subscription'],
      prompt: bi('479 € im Jahr für ein „geschenktes" Handy.',
                 '€479 a year for a “free” phone.'),
      choices: [
        { text: bi('Tab schließen und die Mail melden',
                   'Close the tab and report the mail'),
          next: 'end_deleted', risk: -2, verdict: 'good', catches: ['subscription', 'smallFee', 'dataGrab'],
          why: bi('Kleingedrucktes gelesen und richtig gehandelt. Genau so ist es gedacht.',
                  'You read the small print and acted on it. That is exactly how it should go.') },
        { text: bi('Egal, ich kündige einfach in der Testphase',
                   'Whatever, I will just cancel during the trial'),
          next: 'n4_fee', risk: 3, verdict: 'bad',
          why: bi('Genau darauf wird gesetzt: dass du es vergisst oder die Kündigung ins Leere läuft.',
                  'That is precisely the bet: that you forget, or that the cancellation goes nowhere.') },
      ],
    },

    n4_fee: {
      messages: [
        { kind: 'system', text: bi('„Fast geschafft! Für den Versand fällt eine Pauschale von 1,95 € an."',
                                   '“Almost there! A shipping fee of €1.95 applies.”') },
      ],
      flags: ['smallFee'],
      prompt: bi('1,95 € — und dafür die vollständigen Kartendaten.',
                 '€1.95 — and for that, your full card details.'),
      choices: [
        { text: bi('Abbrechen. Für 1,95 € gebe ich keine Karte raus',
                   'Cancel. I am not handing over a card for €1.95'),
          next: 'end_data', risk: -1, verdict: 'good', catches: ['smallFee'],
          why: bi('Die Daten sind raus, aber die Karte bleibt sauber. Deutlich das kleinere Übel.',
                  'The data is out but the card stays clean. Clearly the lesser evil.') },
        { text: bi('1,95 € zahlen, das ist ja nichts',
                   'Pay the €1.95, that is nothing'),
          next: 'end_sub', risk: 3, verdict: 'bad',
          why: bi('Die 1,95 € waren nie der Punkt. Sie waren die Eintrittskarte für das Abo.',
                  'The €1.95 was never the point. It was the entry ticket to the subscription.') },
      ],
    },

    /* ---------- Enden ---------- */

    end_deleted: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi('Mail gemeldet und gelöscht. Es kommen noch vier ähnliche, dann greift der Spamfilter.',
                                   'Mail reported and deleted. Four similar ones follow, then the spam filter catches on.') },
      ],
      damage: bi('0 € — nichts preisgegeben', '€0 — nothing given away'),
      lessons: [
        bi('Bei einem Gewinnspiel, an dem du nie teilgenommen hast, ist die Sache schon entschieden.',
           'If you never entered the competition, the matter is already settled.'),
        bi('Entscheidend ist immer, was hinter dem @ steht — nicht der Anzeigename.',
           'What counts is always what comes after the @ — never the display name.'),
        bi('Als Phishing melden statt nur löschen. Das hilft allen anderen mit.',
           'Report as phishing rather than just deleting. It helps everyone else too.'),
      ],
    },

    end_data: {
      outcome: 'close',
      messages: [
        { kind: 'system', text: bi('Kein Abo, keine Abbuchung. Aber Name, Adresse, Handynummer und Einkommen sind jetzt im Umlauf.',
                                   'No subscription, no charge. But your name, address, mobile number and income are now in circulation.') },
        { kind: 'system', text: bi('In den Wochen darauf: deutlich mehr Werbeanrufe und Spam-SMS.',
                                   'Over the following weeks: markedly more cold calls and spam texts.') },
      ],
      damage: bi('0 € — aber deine Daten sind verkauft', '€0 — but your data has been sold'),
      lessons: [
        bi('Daten sind die eigentliche Währung. Adresslisten werden mehrfach weiterverkauft.',
           'Data is the real currency. Address lists get resold many times over.'),
        bi('Je mehr Felder ein „Gewinnformular" hat, desto klarer ist der Zweck.',
           'The more fields a “prize form” has, the clearer its purpose.'),
      ],
      recover: [
        bi('Unbekannte Nummern blockieren und Werbeanrufe der Bundesnetzagentur melden.',
           'Block unknown numbers and report cold calls to the telecoms regulator.'),
        bi('Bei Werbepost der Nutzung deiner Daten schriftlich widersprechen.',
           'Object in writing to the use of your data when marketing post arrives.'),
      ],
    },

    end_sub: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi('Kein Handy. Dafür ab dem achten Tag 39,90 € monatlich. Die Kündigungsadresse existiert nicht.',
                                   'No phone. Instead €39.90 a month from day eight. The cancellation address does not exist.') },
        { kind: 'system', text: bi('Nach vier Monaten: 159,60 € abgebucht, dazu Mahnungen eines Inkassobüros.',
                                   'After four months: €159.60 taken, plus letters from a debt collection agency.') },
      ],
      damage: bi('159,60 € + laufendes Abo', '€159.60 + an ongoing subscription'),
      lessons: [
        bi('Ein Gewinn, für den man zahlen muss, ist kein Gewinn.',
           'A prize you have to pay for is not a prize.'),
        bi('Vorangekreuzte Kästchen und graues Kleingedrucktes sind der Ort, an dem das Abo wohnt.',
           'Pre-ticked boxes and grey small print are where the subscription lives.'),
      ],
      recover: [
        bi('Lastschrift bei der Bank zurückbuchen lassen — acht Wochen lang ohne Angabe von Gründen möglich.',
           'Have the direct debit reversed by your bank — possible for eight weeks with no reason needed.'),
        bi('Abo schriftlich widerrufen und den Widerruf nachweisbar versenden.',
           'Cancel the subscription in writing and send it in a provable way.'),
        bi('Inkassoforderungen aus untergeschobenen Abos nicht einfach zahlen — Verbraucherzentrale fragen.',
           'Do not simply pay debt collection demands from a slipped-in subscription — ask a consumer advice centre.'),
      ],
    },
  },
};
