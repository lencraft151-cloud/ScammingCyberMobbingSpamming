import { bi } from '../bi.js';

/** Story 7 — Gewinnbenachrichtigung per Mail: Datenabgriff und Abo-Falle. */
export default {
  id: 'gewinnspiel',
  icon: '🎁',
  channel: 'email',
  difficulty: 1,
  title: bi('Du hast gewonnen!', 'You Have Won!'),
  teaser: bi(
    'Ein Smartphone, kostenlos. Es fehlt nur noch die Versandpauschale von 1,95 €.',
    'A smartphone, free of charge. All that is missing is a €1.95 shipping fee.'),
  contact: {
    name: bi('Gewinn-Service', 'Prize Service'),
    sub: bi('gewinn@mediamarkt-aktion-de.com', 'gewinn@mediamarkt-aktion-de.com'),
  },
  mail: {
    from: bi('MediaMarkt Gewinn-Service <gewinn@mediamarkt-aktion-de.com>',
             'MediaMarkt Prize Service <gewinn@mediamarkt-aktion-de.com>'),
    to: bi('undisclosed-recipients', 'undisclosed-recipients'),
    subject: bi('Herzlichen Glückwunsch! Ihr Gewinn wartet auf Abholung',
                'Congratulations! Your prize is waiting to be claimed'),
  },

  redFlags: {
    noEntry: {
      label: bi('Du hast nie teilgenommen',
                'You never entered'),
      why: bi('Man kann nichts gewinnen, wofür man sich nie angemeldet hat. Das ist keine Faustregel, sondern eine logische Grenze — und sie erledigt den ganzen Fall in einem Satz.',
              'You cannot win something you never entered. That is not a rule of thumb but a logical limit — and it settles the entire case in one sentence.'),
    },
    fakeDomain: {
      label: bi('Absenderadresse mit angehängtem Zusatz',
                'A sender address with an extra bit tacked on'),
      why: bi('Entscheidend ist, was hinter dem @ steht: mediamarkt-aktion-de.com gehört nicht MediaMarkt, sondern demjenigen, der sich diesen Namen registriert hat. Der Anzeigename davor ist frei erfindbar.',
              'What counts is what comes after the @: mediamarkt-aktion-de.com does not belong to MediaMarkt but to whoever registered that name. The display name in front of it can be invented freely.'),
    },
    bcc: {
      label: bi('Die Mail geht an eine verdeckte Empfängerliste',
                'The mail goes to an undisclosed recipient list'),
      why: bi('Im Kopf der Mail steht „undisclosed-recipients" statt deiner Adresse. Ein persönlicher Gewinn geht an eine Person, nicht an einen Verteiler mit Zehntausenden.',
              'The header says “undisclosed-recipients” rather than your address. A personal prize goes to one person, not to a list of tens of thousands.'),
    },
    smallFee: {
      label: bi('Kleine Gebühr für einen großen Gewinn',
                'A small fee for a large prize'),
      why: bi('Wer etwas verschenkt, verlangt nichts. Die 1,95 € sind nicht der Preis, sondern der Vorwand, ein Kartenformular zu zeigen — und die Zustimmung zu einem Abo einzusammeln.',
              'Anyone giving something away asks for nothing. The €1.95 is not the price but the pretext for showing a card form — and for collecting consent to a subscription.'),
    },
    subscription: {
      label: bi('Im Kleingedruckten steckt ein Abo',
                'The small print hides a subscription'),
      why: bi('Unter dem Formular steht in grauer Kleinschrift: 39,90 € monatlich nach sieben Tagen, Mindestlaufzeit zwölf Monate. Das vorangekreuzte Kästchen gilt als deine Zustimmung.',
              'Below the form, in grey small type: €39.90 a month after seven days, minimum term twelve months. The pre-ticked box counts as your consent.'),
    },
    dataGrab: {
      label: bi('Weit mehr Daten als nötig',
                'Far more data than the task requires'),
      why: bi('Für einen Paketversand braucht niemand Geburtsdatum, Beruf, Einkommen und Handynummer. Diese Angaben bestimmen, wie viel dein Datensatz beim Weiterverkauf wert ist.',
              'Nobody needs your date of birth, occupation, income and mobile number to post a parcel. Those fields determine what your record is worth when it gets resold.'),
    },
    pressure: {
      label: bi('Eine Frist für einen angeblichen Gewinn',
                'A deadline on a supposed prize'),
      why: bi('„Nur 48 Stunden gültig" soll verhindern, dass du in Ruhe nachdenkst oder jemanden fragst. Ein echter Gewinn verfällt nicht, weil du eine Nacht darüber geschlafen hast.',
              '“Valid for 48 hours only” exists to stop you thinking it over or asking somebody. A genuine prize does not expire because you slept on it.'),
    },
    unsubscribe: {
      label: bi('Der Abmelde-Link bestätigt nur deine Adresse',
                'The unsubscribe link merely confirms your address'),
      why: bi('Bei echten Newslettern funktioniert Abmelden. Bei Spam bestätigt der Klick, dass die Adresse gelesen wird — danach kommt mehr, nicht weniger.',
              'With genuine newsletters unsubscribing works. With spam the click confirms the address is read — after which you get more, not less.'),
    },
  },

  start: 'n1',
  nodes: {

    /* ============ Kapitel 1: Die Mail ============ */

    n1: {
      chapter: bi('Kapitel 1 — Die Mail', 'Chapter 1 — The email'),
      messages: [
        { kind: 'system', text: bi(
          'Montag, 09:03. Zwischen zwei Arbeitsmails liegt eine Nachricht mit einem Konfetti-Emoji im Betreff.',
          'Monday, 09:03. Between two work emails sits a message with a confetti emoji in the subject line.') },
        { from: 'them', time: '09:03', text: bi(
          'Herzlichen Glückwunsch! Sie wurden aus 50.000 Teilnehmern ausgelost und erhalten ein Smartphone der neuesten Generation. Zur Abholung bitte innerhalb von 48 Stunden bestätigen.',
          'Congratulations! You have been drawn from 50,000 entrants and will receive a latest-generation smartphone. Please confirm within 48 hours to claim it.') },
      ],
      flags: ['noEntry', 'fakeDomain', 'bcc', 'pressure'],
      tactic: 'greed',
      info: {
        icon: '📧',
        title: bi('Was im Kopf einer E-Mail steht',
                  'What an email header tells you'),
        body: [
          bi('Der Anzeigename („MediaMarkt Gewinn-Service") ist ein frei wählbares Textfeld. Jeder kann dort hineinschreiben, was er will — auch den Namen deiner Bank.',
             'The display name (“MediaMarkt Prize Service”) is a free text field. Anyone can put anything in it — including the name of your bank.'),
          bi('Verlässlich ist nur der Teil hinter dem @. Auf dem Handy muss man den Absender oft erst antippen, um ihn ganz zu sehen — genau darauf wird gesetzt.',
             'The only reliable part is what comes after the @. On a phone you often have to tap the sender to see it in full — which is exactly what this relies on.'),
          bi('Im Empfängerfeld steht hier „undisclosed-recipients". Deine Adresse taucht gar nicht auf, weil die Mail als Massenversand raus ist.',
             'The recipient field here reads “undisclosed-recipients”. Your address does not appear at all, because the mail went out as a bulk send.'),
        ],
      },
      prompt: bi('Du erinnerst dich an kein Gewinnspiel.', 'You do not remember entering anything.'),
      choices: [
        { text: bi('Absenderadresse und Empfängerfeld genau ansehen',
                   'Look closely at the sender and recipient fields'),
          next: 'n2_header', risk: 0, verdict: 'good', catches: ['fakeDomain', 'bcc'],
          why: bi('Der erste Griff bei jeder verdächtigen Mail: Was steht wirklich hinter dem @, und an wen ging das überhaupt?',
                  'The first move with any suspicious mail: what is really after the @, and who was this actually sent to?') },
        { text: bi('Löschen. Ich habe nie teilgenommen',
                   'Delete it. I never entered anything'),
          next: 'end_deleted', risk: -2, verdict: 'good', catches: ['noEntry', 'bcc'],
          why: bi('Die kürzeste richtige Antwort auf jede Gewinnbenachrichtigung. Es braucht keine weitere Prüfung.',
                  'The shortest correct response to any prize notification. No further checking required.') },
        { text: bi('„Bestätigen" anklicken', 'Click “Confirm”'),
          next: 'n3_form', risk: 2, verdict: 'bad',
          why: bi('Schon der Klick bestätigt, dass diese Adresse gelesen wird. Allein das erhöht ihren Wert auf dem Markt für Adresslisten.',
                  'The click alone confirms this address is read. That by itself raises its value on the market for address lists.') },
        { text: bi('Auf „Abmelden" ganz unten klicken',
                   'Click “unsubscribe” at the bottom'),
          next: 'n2_unsub', risk: 1, verdict: 'meh',
          why: bi('Bei echten Newslettern richtig, bei Spam falsch. Hier ist der Link nur ein weiterer Bestätigungsmechanismus.',
                  'Right for genuine newsletters, wrong for spam. Here the link is just another confirmation mechanism.') },
      ],
    },

    n2_unsub: {
      messages: [
        { kind: 'system', text: bi(
          '„Sie wurden erfolgreich abgemeldet." In den nächsten zehn Tagen kommen vierzehn weitere Mails — von unterschiedlichen Absendern, alle an dieselbe Adresse.',
          '“You have been successfully unsubscribed.” Over the next ten days fourteen more emails arrive — from different senders, all to the same address.') },
      ],
      flags: ['unsubscribe'],
      tactic: 'distraction',
      info: {
        icon: '🚪',
        title: bi('Warum Abmelden bei Spam nach hinten losgeht',
                  'Why unsubscribing from spam backfires'),
        body: [
          bi('Bei seriösen Newslettern ist der Abmelde-Link Pflicht und funktioniert. Bei Spam dient er dazu, aktive Adressen von toten zu trennen — und aktive Adressen sind mehr wert.',
             'With legitimate newsletters the unsubscribe link is mandatory and works. With spam it serves to separate live addresses from dead ones — and live addresses are worth more.'),
          bi('Richtig ist stattdessen: als Spam markieren und löschen. Damit lernt der Filter, ohne dass die Gegenseite etwas erfährt.',
             'The right move instead: mark as spam and delete. That teaches your filter without telling the other side anything.'),
        ],
      },
      prompt: bi('Aus einer Mail sind vierzehn geworden.', 'One email has become fourteen.'),
      choices: [
        { text: bi('Ab jetzt nur noch als Spam markieren und löschen',
                   'From now on only mark as spam and delete'),
          next: 'end_deleted', risk: -1, verdict: 'good', catches: ['unsubscribe', 'noEntry'],
          why: bi('Genau richtig. Der Spamfilter lernt mit, und die Gegenseite bekommt keine Rückmeldung.',
                  'Exactly right. The spam filter learns, and the other side gets no feedback.') },
        { text: bi('Jetzt doch mal auf den Gewinn klicken',
                   'Click through to the prize after all'),
          next: 'n3_form', risk: 2, verdict: 'bad',
          why: bi('Nach vierzehn Mails ist die Sache eindeutig. Hartnäckigkeit ist kein Zeichen von Echtheit.',
                  'After fourteen emails the matter is unambiguous. Persistence is no sign of authenticity.') },
      ],
    },

    n2_header: {
      messages: [
        { kind: 'system', text: bi(
          'Hinter dem @ steht mediamarkt-aktion-de.com. Die echte Domain wäre mediamarkt.de. Im Empfängerfeld: „undisclosed-recipients". Die Domain wurde vor neun Tagen registriert.',
          'After the @ it says mediamarkt-aktion-de.com. The genuine domain would be mediamarkt.de. The recipient field reads “undisclosed-recipients”. The domain was registered nine days ago.') },
      ],
      flags: ['fakeDomain', 'bcc'],
      tactic: 'authority',
      prompt: bi('Falsche Domain, Massenversand, neun Tage alt.',
                 'Wrong domain, bulk send, nine days old.'),
      choices: [
        { text: bi('Als Phishing melden und löschen',
                   'Report as phishing and delete'),
          next: 'end_reported', risk: -2, verdict: 'good', catches: ['fakeDomain', 'bcc', 'noEntry'],
          why: bi('Melden trainiert den Spamfilter — für dich und für alle anderen beim selben Anbieter.',
                  'Reporting trains the spam filter — for you and for everyone else with the same provider.') },
        { text: bi('Trotzdem schauen, was dahinter steckt',
                   'Have a look anyway to see what is behind it'),
          next: 'n3_form', risk: 1, verdict: 'meh',
          why: bi('Neugier ist verständlich. Nur bitte nichts ausfüllen und nichts anklicken.',
                  'Curiosity is understandable. Just do not fill anything in and do not click anything.') },
      ],
    },

    /* ============ Kapitel 2: Das Formular ============ */

    n3_form: {
      chapter: bi('Kapitel 2 — Das Formular', 'Chapter 2 — The form'),
      messages: [
        { kind: 'system', text: bi(
          'Ein Formular öffnet sich: Name, Adresse, Geburtsdatum, Handynummer, Beruf, monatliches Einkommen, Krankenkasse. Unten ein bereits angekreuztes Kästchen.',
          'A form opens: name, address, date of birth, mobile number, occupation, monthly income, health insurer. At the bottom, an already-ticked box.') },
      ],
      flags: ['dataGrab', 'subscription'],
      tactic: 'distraction',
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
      info: {
        icon: '📊',
        title: bi('Warum ausgerechnet Einkommen und Krankenkasse?',
                  'Why income and health insurer of all things?'),
        body: [
          bi('Eine Adresse allein bringt wenig. Eine Adresse mit Alter, Beruf, Einkommen und Krankenkasse ergibt ein Profil, das gezielt weiterverkauft wird — an Werbeanrufer, Versicherungsvertreter und die nächsten Betrüger.',
             'An address alone is worth little. An address with age, occupation, income and health insurer makes a profile that gets resold with purpose — to cold callers, insurance salespeople and the next set of scammers.'),
          bi('Faustregel: Je mehr Felder ein Formular hat, die mit der eigentlichen Sache nichts zu tun haben, desto klarer ist der Zweck.',
             'Rule of thumb: the more fields a form has that have nothing to do with the stated purpose, the clearer that purpose becomes.'),
        ],
      },
      prompt: bi('Einkommen und Krankenkasse — für einen Paketversand.',
                 'Income and health insurer — to post a parcel.'),
      choices: [
        { text: bi('Das vorangekreuzte Kästchen lesen',
                   'Read the pre-ticked box'),
          next: 'n4_smallprint', risk: 0, verdict: 'good', catches: ['subscription'],
          why: bi('Vorangekreuzte Kästchen sind der Ort, an dem Abos wohnen. Ein Blick dorthin lohnt sich immer.',
                  'Pre-ticked boxes are where subscriptions live. A look there always pays off.') },
        { text: bi('Tab schließen', 'Close the tab'),
          next: 'end_deleted', risk: -1, verdict: 'good', catches: ['dataGrab'],
          why: bi('Wer nach deinem Einkommen fragt, will kein Handy verschenken.',
                  'Anyone asking about your income is not giving away a phone.') },
        { text: bi('Formular ausfüllen und absenden',
                   'Fill in the form and submit'),
          next: 'n4_fee', risk: 3, verdict: 'bad', form: true,
          why: bi('Diese Daten sind der eigentliche Gewinn — für die andere Seite. Das Handy hat nie existiert.',
                  'That data is the actual prize — for the other side. The phone never existed.') },
      ],
    },

    n4_smallprint: {
      messages: [
        { kind: 'system', text: bi(
          'In grauer 8-Punkt-Schrift: „Mit dem Absenden schließen Sie ein Premium-Abo ab. Nach 7 Tagen Testphase 39,90 € monatlich, Mindestlaufzeit 12 Monate, Verlängerung automatisch."',
          'In grey 8-point type: “By submitting you enter a premium subscription. After a 7-day trial, €39.90 per month, minimum term 12 months, renews automatically.”') },
      ],
      flags: ['subscription'],
      tactic: 'distraction',
      info: {
        icon: '⚖️',
        title: bi('Wäre so ein Abo überhaupt gültig?',
                  'Would a subscription like that even be valid?'),
        body: [
          bi('In Deutschland muss bei einem kostenpflichtigen Online-Vertrag der Bestellknopf eindeutig beschriftet sein — etwa „zahlungspflichtig bestellen". Ein Knopf mit „Gewinn anfordern" erfüllt das nicht, der Vertrag kommt dann gar nicht wirksam zustande.',
             'In Germany a paid online contract requires an unambiguously labelled order button — something like “order with obligation to pay”. A button reading “claim your prize” does not qualify, so no valid contract is formed.'),
          bi('Das heißt aber nicht, dass nichts passiert: Es wird trotzdem abgebucht und gemahnt. Wer nicht widerspricht, zahlt faktisch — auch ohne wirksamen Vertrag.',
             'That does not mean nothing happens: charges and demand letters follow regardless. Anyone who does not object ends up paying in practice — valid contract or not.'),
        ],
      },
      prompt: bi('479 € im Jahr für ein „geschenktes" Handy.',
                 '€479 a year for a “free” phone.'),
      choices: [
        { text: bi('Tab schließen und die Mail melden',
                   'Close the tab and report the mail'),
          next: 'end_reported', risk: -2, verdict: 'good', catches: ['subscription', 'smallFee', 'dataGrab'],
          why: bi('Kleingedrucktes gelesen und richtig gehandelt. Genau dafür ist es da — auch wenn es niemand lesen soll.',
                  'You read the small print and acted on it. That is what it is for — even though nobody is meant to read it.') },
        { text: bi('Egal, ich kündige einfach in der Testphase',
                   'Whatever, I will just cancel during the trial'),
          next: 'n4_fee', risk: 3, verdict: 'bad',
          why: bi('Genau darauf wird gesetzt: dass du es vergisst oder die Kündigungsadresse nicht existiert. Beides ist eingeplant.',
                  'That is precisely the bet: that you forget, or that the cancellation address does not exist. Both are part of the plan.') },
      ],
    },

    n4_fee: {
      messages: [
        { kind: 'system', text: bi(
          '„Fast geschafft! Für den Versand fällt eine Pauschale von 1,95 € an. Bitte Kartendaten eingeben."',
          '“Almost there! A shipping fee of €1.95 applies. Please enter your card details.”') },
      ],
      flags: ['smallFee'],
      tactic: 'commitment',
      prompt: bi('1,95 € — und dafür Kartennummer, Ablaufdatum und Prüfziffer.',
                 '€1.95 — and for that, your card number, expiry date and security code.'),
      choices: [
        { text: bi('Abbrechen. Für 1,95 € gebe ich keine Karte raus',
                   'Cancel. I am not handing over a card for €1.95'),
          next: 'end_data', risk: -1, verdict: 'good', catches: ['smallFee'],
          why: bi('Die Daten sind raus, aber die Karte bleibt sauber. Deutlich das kleinere Übel.',
                  'The data is out but the card stays clean. Clearly the lesser evil.') },
        { text: bi('1,95 € zahlen, das ist ja nichts',
                   'Pay the €1.95, that is nothing'),
          next: 'n5_sub', risk: 3, verdict: 'bad',
          why: bi('Die 1,95 € waren nie der Punkt. Sie sind die Eintrittskarte für das Abo und der Beweis, dass die Karte gültig ist.',
                  'The €1.95 was never the point. It is the entry ticket to the subscription and proof that the card is live.') },
      ],
    },

    /* ============ Kapitel 3: Die Abbuchungen ============ */

    n5_sub: {
      chapter: bi('Kapitel 3 — Die Abbuchungen', 'Chapter 3 — The charges'),
      messages: [
        { kind: 'system', text: bi('Kein Handy. Kein Paket. Keine Sendungsnummer.',
                                   'No phone. No parcel. No tracking number.') },
        { kind: 'system', text: bi(
          'Ab dem achten Tag: 39,90 € monatlich. Die angegebene Kündigungsadresse existiert nicht, das Kontaktformular antwortet nie.',
          'From day eight: €39.90 a month. The cancellation address given does not exist, the contact form never replies.') },
        { kind: 'system', text: bi(
          'Nach vier Monaten: 159,60 € abgebucht, dazu ein Schreiben eines Inkassobüros über 289 €.',
          'After four months: €159.60 taken, plus a letter from a debt collection agency for €289.') },
      ],
      flags: ['subscription'],
      tactic: 'fear',
      info: {
        icon: '📮',
        title: bi('Was tun bei einer Inkasso-Forderung aus so einer Falle?',
                  'What to do about a debt collection demand from a trap like this?'),
        body: [
          bi('Nicht zahlen, aber auch nicht ignorieren. Der Forderung schriftlich widersprechen, den Widerspruch nachweisbar versenden und begründen, dass kein wirksamer Vertrag zustande kam.',
             'Do not pay, but do not ignore it either. Object in writing, send the objection in a provable way, and state that no valid contract was formed.'),
          bi('Inkassobüros dürfen keine Gerichtsvollzieher schicken. Das kann nur ein Gericht, und dazu müsste die Gegenseite den Vertrag beweisen — was ihr bei einem falsch beschrifteten Bestellknopf nicht gelingt.',
             'Debt collectors cannot send bailiffs. Only a court can, and for that the other side would have to prove the contract — which they cannot with a mislabelled order button.'),
          bi('Die Verbraucherzentrale hat für genau diesen Fall kostenlose Musterbriefe.',
             'Consumer advice centres have free template letters for exactly this situation.'),
        ],
      },
      prompt: bi('Abbuchungen laufen, das Inkassobüro schreibt.',
                 'The charges are running and the debt collector is writing.'),
      choices: [
        { text: bi('Lastschriften zurückbuchen und schriftlich widersprechen',
                   'Reverse the direct debits and object in writing'),
          next: 'end_fixed', risk: -2, verdict: 'good', catches: ['subscription', 'smallFee'],
          why: bi('Genau der richtige Weg. Lastschriften lassen sich acht Wochen lang ohne Angabe von Gründen zurückholen.',
                  'Exactly the right move. Direct debits can be reversed for eight weeks with no reason required.') },
        { text: bi('Die 289 € zahlen, damit Ruhe ist',
                   'Pay the €289 to make it stop'),
          next: 'end_sub', risk: 3, verdict: 'bad',
          why: bi('Zahlen bestätigt die Forderung und macht dich zum dankbaren Kunden. Es folgt die nächste Rechnung, nicht Ruhe.',
                  'Paying confirms the claim and marks you as a willing customer. What follows is the next invoice, not peace and quiet.') },
      ],
    },

    /* ============ Ausgänge ============ */

    end_deleted: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi('Mail gelöscht. Es kommen noch vier ähnliche, dann greift der Spamfilter.',
                                   'Mail deleted. Four similar ones follow, then the spam filter catches on.') },
      ],
      damage: bi('0 € — nichts preisgegeben', '€0 — nothing given away'),
      lessons: [
        bi('Bei einem Gewinnspiel, an dem du nie teilgenommen hast, ist die Sache schon entschieden.',
           'If you never entered the competition, the matter is already settled.'),
        bi('Entscheidend ist immer, was hinter dem @ steht — nicht der Anzeigename davor.',
           'What counts is always what comes after the @ — never the display name in front of it.'),
        bi('Spam als Spam markieren statt abzumelden. Der Abmelde-Link bestätigt nur, dass die Adresse gelesen wird.',
           'Mark spam as spam rather than unsubscribing. The unsubscribe link only confirms the address is read.'),
      ],
    },

    end_reported: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'Als Phishing gemeldet. Der Anbieter sperrt die Absenderdomain innerhalb von zwei Tagen.',
          'Reported as phishing. Your provider blocks the sender domain within two days.') },
      ],
      damage: bi('0 € — und die Domain gemeldet', '€0 — and the domain reported'),
      lessons: [
        bi('Ein Gewinn, für den man zahlen oder Daten liefern muss, ist kein Gewinn.',
           'A prize you have to pay for or hand over data for is not a prize.'),
        bi('Melden hilft allen anderen beim selben Anbieter mit.',
           'Reporting helps everyone else using the same provider.'),
        bi('Verdächtige Mails lassen sich auch an die Verbraucherzentrale weiterleiten, die daraus einen Phishing-Radar pflegt.',
           'Suspicious emails can also be forwarded to consumer protection bodies, which maintain public phishing trackers.'),
      ],
    },

    end_data: {
      outcome: 'close',
      messages: [
        { kind: 'system', text: bi(
          'Kein Abo, keine Abbuchung. Aber Name, Adresse, Handynummer, Beruf und Einkommen sind jetzt im Umlauf.',
          'No subscription, no charge. But your name, address, mobile number, occupation and income are now in circulation.') },
        { kind: 'system', text: bi(
          'In den Wochen darauf: deutlich mehr Werbeanrufe, Spam-SMS und passgenaue Betrugsversuche.',
          'Over the following weeks: markedly more cold calls, spam texts and unnervingly well-targeted scam attempts.') },
      ],
      damage: bi('0 € — aber deine Daten sind verkauft', '€0 — but your data has been sold'),
      lessons: [
        bi('Daten sind die eigentliche Währung. Adresslisten werden mehrfach weiterverkauft.',
           'Data is the real currency. Address lists get resold many times over.'),
        bi('Der nächste Betrugsversuch wirkt dadurch glaubwürdiger, weil die Gegenseite plötzlich Details über dich weiß.',
           'The next scam attempt becomes more convincing, because the other side suddenly knows details about you.'),
        bi('Je mehr Felder ein „Gewinnformular" hat, desto klarer ist sein Zweck.',
           'The more fields a “prize form” has, the clearer its purpose.'),
      ],
      recover: [
        bi('Unbekannte Nummern blockieren und Werbeanrufe der Bundesnetzagentur melden.',
           'Block unknown numbers and report cold calls to the telecoms regulator.'),
        bi('Der Nutzung deiner Daten schriftlich widersprechen und Auskunft nach DSGVO verlangen.',
           'Object in writing to the use of your data and request disclosure under data protection law.'),
      ],
    },

    end_fixed: {
      outcome: 'close',
      messages: [
        { kind: 'system', text: bi(
          'Die Bank bucht 159,60 € zurück. Dein Widerspruch mit dem Musterbrief der Verbraucherzentrale beendet die Inkasso-Schreiben nach zwei Monaten.',
          'The bank reverses €159.60. Your objection, using a consumer advice template letter, stops the collection letters after two months.') },
      ],
      damage: bi('159,60 € abgebucht — zurückgeholt', '€159.60 charged — recovered'),
      lessons: [
        bi('Lastschriften lassen sich acht Wochen lang ohne Angabe von Gründen zurückbuchen.',
           'Direct debits can be reversed for eight weeks with no reason required.'),
        bi('Untergeschobene Abos brauchen einen klar beschrifteten Bestellknopf. Fehlt er, kommt kein wirksamer Vertrag zustande.',
           'A slipped-in subscription needs a clearly labelled order button. Without one, no valid contract exists.'),
        bi('Inkasso-Schreiben nicht ignorieren, sondern schriftlich und nachweisbar widersprechen.',
           'Do not ignore collection letters — object in writing, provably.'),
      ],
      recover: [
        bi('Lastschrift bei der Bank zurückbuchen lassen.', 'Have the direct debit reversed by your bank.'),
        bi('Der Forderung schriftlich widersprechen, per Einwurf-Einschreiben.',
           'Object to the claim in writing, by recorded delivery.'),
        bi('Kostenlose Musterbriefe der Verbraucherzentrale nutzen.',
           'Use the free template letters from a consumer advice centre.'),
      ],
    },

    end_sub: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi(
          'Nach der Zahlung folgt die nächste Rechnung. Nach zwölf Monaten stehen 767 € auf dem Konto — inklusive „Mahngebühren".',
          'After the payment comes the next invoice. After twelve months €767 has gone from the account — including “reminder fees”.') },
      ],
      damage: bi('767 € insgesamt', '€767 in total'),
      lessons: [
        bi('Zahlen beendet eine untergeschobene Forderung nicht, es bestätigt sie.',
           'Paying does not end a slipped-in claim, it confirms it.'),
        bi('Vorangekreuzte Kästchen und graues Kleingedrucktes sind der Ort, an dem das Abo wohnt.',
           'Pre-ticked boxes and grey small print are where the subscription lives.'),
        bi('Bei Inkasso aus Abo-Fallen hilft die Verbraucherzentrale kostenlos weiter.',
           'For debt collection from subscription traps, consumer advice centres help free of charge.'),
      ],
      recover: [
        bi('Alle Lastschriften der letzten acht Wochen zurückbuchen lassen.',
           'Reverse every direct debit from the last eight weeks.'),
        bi('Abo schriftlich und nachweisbar widerrufen, weitere Zahlungen einstellen.',
           'Cancel the subscription in writing and provably, and stop all further payments.'),
        bi('Der Inkasso-Forderung widersprechen und nicht aus Angst zahlen.',
           'Object to the collection claim and do not pay out of fear.'),
        bi('Kostenlose Beratung bei der Verbraucherzentrale holen.',
           'Get free advice from a consumer advice centre.'),
      ],
    },
  },
};
