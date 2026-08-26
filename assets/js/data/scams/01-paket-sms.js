import { bi } from '../bi.js';

/** Story 1 — Paket-SMS mit angeblicher Zollgebühr (Smishing). */
export default {
  id: 'paket-sms',
  icon: '📦',
  channel: 'sms',
  difficulty: 1,
  title: bi('Das Paket, das nie kam', 'The Parcel That Never Came'),
  teaser: bi(
    'Eine SMS sagt, dein Paket hängt fest. Es fehlen nur 2,99 €.',
    'A text says your parcel is stuck. Just €2.99 short.'),
  contact: {
    name: bi('+49 1573 8842019', '+49 1573 8842019'),
    sub: bi('Unbekannte Nummer', 'Unknown number'),
  },

  redFlags: {
    sender: {
      label: bi('Absender ist eine private Handynummer',
                'The sender is a private mobile number'),
      why: bi('Paketdienste schreiben aus einem Kurznamen wie „DHL", nie aus einer 015x-Nummer.',
              'Delivery firms send from a short name like “DHL”, never from a personal mobile number.'),
    },
    domain: {
      label: bi('Die Adresse im Link gehört nicht zu DHL',
                'The link domain does not belong to DHL'),
      why: bi('Vor dem ersten einzelnen Schrägstrich muss dhl.de stehen. Bei dhl-paket-zustellung.info gehört die Seite dem Betrüger.',
              'What matters is the name right before the first single slash. In dhl-paket-zustellung.info the site belongs to the scammer.'),
    },
    fee: {
      label: bi('Eine winzige Gebühr, die zur Kartenzahlung zwingt',
                'A tiny fee that forces you to hand over a card'),
      why: bi('2,99 € tun niemandem weh — genau deshalb zahlt man ohne nachzudenken. Es geht nicht um die 2,99 €, sondern um die Kartendaten.',
              'Nobody agonises over €2.99 — which is the point. The fee is not the prize, your card details are.'),
    },
    urgency: {
      label: bi('Zeitdruck: „innerhalb von 24 Stunden"',
                'Time pressure: “within 24 hours”'),
      why: bi('Eile schaltet das Nachdenken ab. Kein echter Zusteller vernichtet dein Paket nach einem Tag.',
              'Hurry switches off thinking. No real courier destroys your parcel after a day.'),
    },
    noOrder: {
      label: bi('Keine Sendungsnummer, kein Bezug zu einer Bestellung',
                'No tracking number, no link to an actual order'),
      why: bi('Echte Benachrichtigungen nennen Sendungsnummer und Absender. Diese SMS geht an Zehntausende gleichzeitig.',
              'Real notifications name a tracking number and a sender. This text goes to tens of thousands at once.'),
    },
    cardData: {
      label: bi('Vollständige Kartendaten inklusive Prüfziffer',
                'Full card details including the security code'),
      why: bi('Für 2,99 € braucht niemand deine Prüfziffer plus Ablaufdatum plus Adresse. Damit kann man weltweit einkaufen.',
              'Nobody needs your CVC, expiry date and address to take €2.99. With those you can shop worldwide.'),
    },
  },

  start: 'n1',
  nodes: {

    n1: {
      messages: [
        { from: 'them', time: '14:07', text: bi(
          'DHL: Ihr Paket konnte nicht zugestellt werden. Es fällt eine Zollgebühr von 2,99 EUR an. Bitte begleichen Sie diese innerhalb von 24 Stunden: dhl-paket-zustellung.info/de',
          'DHL: your parcel could not be delivered. An import fee of EUR 2.99 is due. Please settle it within 24 hours: dhl-paket-zustellung.info/de') },
      ],
      flags: ['sender', 'domain', 'fee', 'urgency'],
      prompt: bi('Du wartest tatsächlich auf Sneaker. Was machst du?',
                 'You actually are waiting on a pair of trainers. What do you do?'),
      choices: [
        { text: bi('Link antippen — passt ja, ich warte auf was',
                   'Tap the link — makes sense, I am expecting something'),
          next: 'n2_page', risk: 2, verdict: 'bad',
          why: bi('Der Link war das eigentliche Ziel der SMS. Ab hier arbeitet die Seite gegen dich.',
                  'The link was the whole point of the text. From here on the page is working against you.') },
        { text: bi('Kurz nachdenken: Habe ich überhaupt etwas aus dem Ausland bestellt?',
                   'Think for a second: did I order anything from abroad at all?'),
          next: 'n2_think', risk: 0, verdict: 'good', catches: ['noOrder'],
          why: bi('Genau die richtige Frage. Zoll fällt innerhalb der EU gar nicht an.',
                  'Exactly the right question. There is no customs fee inside the EU.') },
        { text: bi('Nummer blockieren, SMS löschen',
                   'Block the number, delete the text'),
          next: 'end_blocked', risk: -1, verdict: 'good', catches: ['sender', 'domain'],
          why: bi('Kurz und richtig. Eine private Handynummer als DHL-Absender ist schon das Ende der Diskussion.',
                  'Short and correct. A private mobile number claiming to be DHL ends the discussion right there.') },
      ],
    },

    n2_think: {
      messages: [
        { kind: 'system', text: bi(
          'Du denkst nach: Die Sneaker kamen aus Hamburg. Innerhalb der EU gibt es keinen Zoll. Und eine Sendungsnummer steht in der SMS auch nicht.',
          'You think it through: the trainers shipped from Hamburg. There is no customs inside the EU. And the text does not mention a tracking number either.') },
      ],
      flags: ['noOrder'],
      prompt: bi('Und jetzt?', 'So now what?'),
      choices: [
        { text: bi('In der echten DHL-App nachsehen',
                   'Check the real DHL app instead'),
          next: 'end_app', risk: -1, verdict: 'good', catches: ['domain', 'noOrder'],
          why: bi('Der Königsweg: nie dem Link folgen, immer selbst die echte App oder Seite öffnen.',
                  'The gold standard: never follow the link, always open the genuine app or site yourself.') },
        { text: bi('Trotzdem draufklicken, nur mal gucken',
                   'Tap it anyway, just to look'),
          next: 'n2_page', risk: 2, verdict: 'bad',
          why: bi('„Nur mal gucken" ist genau das, worauf die Masche baut.',
                  '“Just to look” is precisely what the con is built on.') },
      ],
    },

    n2_page: {
      messages: [
        { kind: 'system', text: bi('Die Seite öffnet sich. Sie sieht aus wie DHL — gelbes Logo, richtige Schrift.',
                                   'The page opens. It looks like DHL — yellow logo, correct typeface.') },
      ],
      flags: ['domain', 'cardData'],
      page: {
        url: bi('dhl-paket-zustellung.info', 'dhl-paket-zustellung.info'),
        badPart: bi('-zustellung.info', '-zustellung.info'),
        heading: bi('Zollgebühr begleichen — 2,99 €', 'Settle import fee — €2.99'),
        fields: [
          bi('Kartennummer', 'Card number'),
          bi('Gültig bis', 'Expiry date'),
          bi('Prüfziffer (CVC)', 'Security code (CVC)'),
        ],
      },
      prompt: bi('Das Formular will Kartennummer, Ablaufdatum und Prüfziffer.',
                 'The form wants your card number, expiry date and security code.'),
      choices: [
        { text: bi('Kartendaten eingeben und zahlen',
                   'Enter the card details and pay'),
          next: 'n3_paid', risk: 3, verdict: 'bad', form: true,
          why: bi('Damit hat der Betrüger eine vollständig nutzbare Karte — nicht 2,99 €, sondern alles.',
                  'The scammer now holds a fully usable card — not €2.99, but everything on it.') },
        { text: bi('Erst die Adresszeile im Browser genau lesen',
                   'Read the browser address bar carefully first'),
          next: 'n3_url', risk: 0, verdict: 'good', catches: ['domain'],
          why: bi('Die Adresszeile lügt nie. Das Logo schon.',
                  'The address bar never lies. The logo does.') },
        { text: bi('Tab schließen, mir ist das zu komisch',
                   'Close the tab, this feels off'),
          next: 'end_closed', risk: -1, verdict: 'good', catches: ['domain', 'cardData'],
          why: bi('Auf das komische Gefühl zu hören, ist eine völlig legitime Sicherheitsstrategie.',
                  'Listening to that uneasy feeling is a perfectly legitimate security strategy.') },
      ],
    },

    n3_url: {
      messages: [
        { kind: 'system', text: bi(
          'Da steht dhl-paket-zustellung.info — nicht dhl.de. Vor dem ersten Schrägstrich steht der wahre Eigentümer der Seite, und der heißt hier nicht DHL.',
          'It reads dhl-paket-zustellung.info — not dhl.de. The name before the first slash is the true owner of the page, and here it is not DHL.') },
      ],
      prompt: bi('Jetzt ist es eindeutig. Was tust du?', 'Now it is unambiguous. What do you do?'),
      choices: [
        { text: bi('Tab schließen und die Nummer als Spam melden',
                   'Close the tab and report the number as spam'),
          next: 'end_closed', risk: -1, verdict: 'good', catches: ['domain', 'sender', 'urgency'],
          why: bi('Melden hilft auch allen anderen, die dieselbe SMS bekommen haben.',
                  'Reporting also helps everyone else who received the same text.') },
        { text: bi('Ach, die 2,99 € riskiere ich', 'Ah, I will risk the €2.99'),
          next: 'n3_paid', risk: 3, verdict: 'bad',
          why: bi('Du riskierst nicht 2,99 €. Du gibst eine Karte heraus, die überall auf der Welt funktioniert.',
                  'You are not risking €2.99. You are handing over a card that works anywhere in the world.') },
      ],
    },

    n3_paid: {
      messages: [
        { kind: 'system', text: bi('„Vielen Dank. Ihr Paket wird morgen zugestellt."',
                                   '“Thank you. Your parcel will be delivered tomorrow.”') },
        { kind: 'system', text: bi('Drei Tage später. Kein Paket. Dafür drei Abbuchungen: 89,00 € · 89,00 € · 71,90 €.',
                                   'Three days later. No parcel. But three charges: €89.00 · €89.00 · €71.90.') },
      ],
      flags: ['cardData'],
      prompt: bi('Du siehst die Abbuchungen in der Banking-App.',
                 'You spot the charges in your banking app.'),
      choices: [
        { text: bi('Sofort Karte sperren und der Bank melden',
                   'Freeze the card immediately and tell the bank'),
          next: 'end_scammed_fast', risk: 0, verdict: 'good',
          why: bi('Schnelles Sperren begrenzt den Schaden — und bei unautorisierten Abbuchungen bekommst du oft alles zurück.',
                  'Freezing fast limits the damage — and unauthorised charges are often refunded in full.') },
        { text: bi('Abwarten, vielleicht kommt das Paket ja doch',
                   'Wait and see, maybe the parcel still turns up'),
          next: 'end_scammed_slow', risk: 3, verdict: 'bad',
          why: bi('Jede Stunde Zögern kostet Geld. Die Karte wird weiterbelastet, bis sie gesperrt ist.',
                  'Every hour of hesitation costs money. The card keeps getting charged until it is blocked.') },
      ],
    },

    /* ---------- Enden ---------- */

    end_blocked: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi('Nummer blockiert, SMS gelöscht. Zwei Tage später steht dein Paket ganz normal vor der Tür.',
                                   'Number blocked, text deleted. Two days later your parcel simply turns up at the door.') },
      ],
      damage: bi('0 € — nichts passiert', '€0 — nothing happened'),
      lessons: [
        bi('Paketdienste verlangen keine Zollgebühren per SMS-Link.',
           'Delivery companies do not collect customs fees through a link in a text.'),
        bi('Innerhalb der EU gibt es überhaupt keinen Zoll.',
           'There is no customs charge at all within the EU.'),
        bi('Verdächtige Nummer blockieren und an 7726 (Spam-Kurzwahl) weiterleiten.',
           'Block the number and forward the message to 7726, the spam short code.'),
      ],
    },

    end_app: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi('In der echten DHL-App: keine offene Sendung, keine Gebühr. Die SMS war frei erfunden.',
                                   'In the genuine DHL app: no pending shipment, no fee. The text was pure invention.') },
      ],
      damage: bi('0 € — sauber erkannt', '€0 — spotted cleanly'),
      lessons: [
        bi('Nie dem Link folgen. Immer selbst die App oder die getippte Adresse öffnen.',
           'Never follow the link. Always open the app yourself, or type the address by hand.'),
        bi('Eine Sendungsnummer, die es nicht gibt, ist der schnellste Gegenbeweis.',
           'A tracking number that does not exist is the fastest possible disproof.'),
      ],
    },

    end_closed: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi('Tab zu, Nummer gemeldet. Der Betrugsversuch endet hier.',
                                   'Tab closed, number reported. The attempt ends here.') },
      ],
      damage: bi('0 € — Seite rechtzeitig verlassen', '€0 — you left the page in time'),
      lessons: [
        bi('Die Adresszeile ist die Wahrheit. Vor dem ersten einzelnen Schrägstrich steht, wem die Seite gehört.',
           'The address bar is the truth. The name before the first single slash owns the page.'),
        bi('Ein Logo lässt sich in dreißig Sekunden kopieren, eine Domain nicht.',
           'A logo can be copied in thirty seconds. A domain cannot.'),
      ],
    },

    end_scammed_fast: {
      outcome: 'close',
      messages: [
        { kind: 'system', text: bi('Die Bank sperrt die Karte sofort und bucht 249,90 € zurück. Eine neue Karte kommt in einer Woche.',
                                   'The bank freezes the card at once and reverses €249.90. A new card arrives within a week.') },
      ],
      damage: bi('249,90 € abgebucht — zurückgeholt', '€249.90 charged — recovered'),
      lessons: [
        bi('Kartendaten waren weg, aber schnelles Handeln hat den Schaden geheilt.',
           'The card details were gone, but acting fast undid the damage.'),
        bi('Für 2,99 € braucht niemand deine Prüfziffer. Genau da hätte es klingeln müssen.',
           'Nobody needs your security code to take €2.99. That was the moment to stop.'),
      ],
      recover: [
        bi('Karte sofort über die Banking-App oder 116 116 sperren.',
           'Freeze the card immediately in your banking app or via your bank’s hotline.'),
        bi('Abbuchungen schriftlich widersprechen — unautorisierte Zahlungen müssen erstattet werden.',
           'Dispute the charges in writing — unauthorised payments have to be refunded.'),
        bi('Anzeige bei der Polizei erstatten, online oder auf der Wache.',
           'File a police report, online or in person.'),
      ],
    },

    end_scammed_slow: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi('Nach einer Woche stehen 1.240 € auf der Abrechnung. Die Karte war die ganze Zeit offen.',
                                   'A week later the statement shows €1,240. The card was live the whole time.') },
      ],
      damage: bi('1.240 € abgebucht', '€1,240 charged'),
      lessons: [
        bi('Bei Kartenbetrug zählt jede Stunde. Zuerst sperren, dann in Ruhe klären.',
           'With card fraud every hour counts. Freeze first, work out the details afterwards.'),
        bi('Abwarten ist bei Betrug nie die neutrale Option — es ist die teure.',
           'With fraud, waiting is never the neutral option. It is the expensive one.'),
      ],
      recover: [
        bi('Karte sperren lassen, auch Tage später noch.',
           'Have the card blocked, even days later.'),
        bi('Allen Abbuchungen widersprechen und auf Erstattung bestehen.',
           'Dispute every charge and insist on a refund.'),
        bi('Anzeige erstatten und die Bestätigung der Bank vorlegen.',
           'File a police report and give the confirmation to your bank.'),
        bi('Kontoauszüge wochenlang weiter kontrollieren.',
           'Keep checking your statements for weeks afterwards.'),
      ],
    },
  },
};
