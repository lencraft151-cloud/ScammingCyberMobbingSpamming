import { bi } from '../bi.js';

/** Story 1 — Paket-SMS mit angeblicher Zollgebühr (Smishing). */
export default {
  id: 'paket-sms',
  icon: '📦',
  channel: 'sms',
  difficulty: 1,
  title: bi('Das Paket, das nie kam', 'The Parcel That Never Came'),
  teaser: bi(
    'Samstag ist der Geburtstag deines Bruders. Das Geschenk hängt angeblich im Zoll.',
    'Your brother’s birthday is on Saturday. His present is supposedly stuck at customs.'),
  contact: {
    name: bi('+49 1573 8842019', '+49 1573 8842019'),
    sub: bi('Unbekannte Nummer', 'Unknown number'),
  },

  redFlags: {
    sender: {
      label: bi('Absender ist eine private Handynummer',
                'The sender is a private mobile number'),
      why: bi('Paketdienste versenden aus einem registrierten Kurznamen wie „DHL" oder einer fünfstelligen Kurzwahl — nie aus einer 015x-Nummer, die jeder für neun Euro im Supermarkt kaufen kann.',
              'Delivery firms send from a registered short name like “DHL” or a five-digit short code — never from an 015x number anyone can buy in a supermarket for nine euros.'),
    },
    domain: {
      label: bi('Die Adresse im Link gehört nicht zu DHL',
                'The link domain does not belong to DHL'),
      why: bi('Entscheidend ist der Name direkt vor dem ersten einzelnen Schrägstrich. Bei dhl-paket-zustellung.info heißt der Eigentümer „dhl-paket-zustellung.info" — und das ist nicht DHL, sondern jemand, der sich diesen Namen gekauft hat.',
              'What counts is the name immediately before the first single slash. In dhl-paket-zustellung.info the owner is “dhl-paket-zustellung.info” — which is not DHL, but somebody who bought that name.'),
    },
    fee: {
      label: bi('Eine winzige Gebühr, die zur Kartenzahlung zwingt',
                'A tiny fee that forces you to hand over a card'),
      why: bi('2,99 € tun niemandem weh — genau deshalb prüft man nicht. Die Gebühr ist nicht die Beute, sie ist der Vorwand, ein Kartenformular zu zeigen.',
              'Nobody agonises over €2.99 — which is exactly why nobody checks. The fee is not the prize, it is the pretext for showing you a card form.'),
    },
    urgency: {
      label: bi('Zeitdruck: „innerhalb von 24 Stunden"',
                'Time pressure: “within 24 hours”'),
      why: bi('Kein Zusteller der Welt vernichtet ein Paket nach einem Tag. Die Frist steht dort, damit du handelst, bevor du nachfragst.',
              'No courier on earth destroys a parcel after one day. The deadline is there so you act before you ask.'),
    },
    noOrder: {
      label: bi('Keine Sendungsnummer, kein Bezug zu einer Bestellung',
                'No tracking number, no link to an actual order'),
      why: bi('Echte Benachrichtigungen nennen Sendungsnummer, Absender und Zustelldatum. Diese SMS nennt nichts davon, weil sie an Zehntausende gleichzeitig geht und der Absender nicht weiß, wer du bist.',
              'Real notifications name a tracking number, a sender and a delivery date. This text names none of them, because it goes to tens of thousands at once and the sender has no idea who you are.'),
    },
    cardData: {
      label: bi('Vollständige Kartendaten inklusive Prüfziffer',
                'Full card details including the security code'),
      why: bi('Für eine Zahlung von 2,99 € braucht niemand Prüfziffer, Ablaufdatum und Rechnungsadresse. Zusammen ergibt das eine Karte, mit der man weltweit einkaufen kann.',
              'A €2.99 payment needs no security code, expiry date and billing address. Together those make a card you can shop with anywhere in the world.'),
    },
    noEuCustoms: {
      label: bi('Zoll innerhalb der EU gibt es nicht',
                'There is no customs charge inside the EU'),
      why: bi('Sendungen aus EU-Ländern sind zollfrei. Eine „Zollgebühr" für ein Paket aus Hamburg kann es nicht geben — das ist keine Vermutung, sondern eine Tatsache, die man in dreißig Sekunden nachliest.',
              'Shipments from EU countries are duty-free. A “customs fee” on a parcel from Hamburg cannot exist — that is not a hunch, it is a fact you can look up in thirty seconds.'),
    },
    recovery: {
      label: bi('Die zweite Masche: Hilfe gegen Vorkasse',
                'The second con: help for a fee up front'),
      why: bi('Wer einmal gezahlt hat, landet auf einer Liste, die weiterverkauft wird. Der angebliche Rückhol-Dienst ist fast immer dieselbe Bande.',
              'Anyone who paid once lands on a list that gets resold. The supposed recovery service is almost always the same gang.'),
    },
  },

  start: 'n1',
  nodes: {

    /* ============ Kapitel 1: Die Nachricht ============ */

    n1: {
      chapter: bi('Kapitel 1 — Die Nachricht', 'Chapter 1 — The message'),
      messages: [
        { kind: 'system', text: bi(
          'Donnerstag, 14:07. Samstag hat dein Bruder Geburtstag. Die Sneaker, die du vor drei Wochen bestellt hast, sind immer noch nicht da.',
          'Thursday, 14:07. Your brother’s birthday is on Saturday. The trainers you ordered three weeks ago still have not arrived.') },
        { from: 'them', time: '14:07', text: bi(
          'DHL: Ihr Paket konnte nicht zugestellt werden. Es fällt eine Zollgebühr von 2,99 EUR an. Bitte begleichen Sie diese innerhalb von 24 Stunden, andernfalls geht die Sendung zurück an den Absender: dhl-paket-zustellung.info/de',
          'DHL: your parcel could not be delivered. An import fee of EUR 2.99 is due. Please settle it within 24 hours or the shipment will be returned to sender: dhl-paket-zustellung.info/de') },
      ],
      flags: ['sender', 'urgency', 'fee'],
      tactic: 'urgency',
      info: {
        icon: '📲',
        title: bi('Das nennt man Smishing', 'This is called smishing'),
        body: [
          bi('Phishing per SMS heißt Smishing. Es funktioniert besser als per E-Mail, weil eine SMS privater wirkt: Im Postfach rechnet man mit Werbung, im SMS-Verlauf steht sonst die Familie.',
             'Phishing by text is called smishing. It works better than email because a text feels more personal: your inbox is full of marketing, your text thread is where your family writes.'),
          bi('Die Nachricht geht an Hunderttausende Nummern gleichzeitig. Dass sie bei dir zufällig passt, weil du wirklich auf ein Paket wartest, ist kein Beweis — bei so vielen Empfängern wartet immer jemand auf ein Paket.',
             'The message goes to hundreds of thousands of numbers at once. That it happens to fit because you really are waiting on a parcel proves nothing — with that many recipients, somebody always is.'),
        ],
      },
      prompt: bi('Das Geschenk muss bis Samstag da sein. Was machst du?',
                 'The present has to arrive by Saturday. What do you do?'),
      choices: [
        { text: bi('Link antippen — ich warte ja wirklich auf ein Paket',
                   'Tap the link — I really am waiting for a parcel'),
          next: 'n2_page', risk: 2, verdict: 'bad',
          why: bi('Der Link war das eigentliche Ziel der SMS. Dass du gerade ein Paket erwartest, macht die Nachricht nicht echt — es macht dich nur zum passenden Empfänger unter Hunderttausenden.',
                  'The link was the whole point of the text. Expecting a parcel does not make the message genuine — it only makes you the right recipient among hundreds of thousands.') },
        { text: bi('Die Absendernummer genauer ansehen',
                   'Take a closer look at the sender number'),
          next: 'n1_sender', risk: 0, verdict: 'good', catches: ['sender'],
          why: bi('Der erste Griff bei jeder unerwarteten Nachricht: Wer schreibt hier eigentlich? Die Antwort steht ganz oben und kostet keine Sekunde.',
                  'The first move with any unexpected message: who is actually writing? The answer is right at the top and costs no time at all.') },
        { text: bi('Kurz nachdenken: Kann es überhaupt Zoll sein?',
                   'Think for a second: could this even be customs?'),
          next: 'n2_think', risk: 0, verdict: 'good', catches: ['noOrder'],
          why: bi('Statt die Nachricht zu prüfen, prüfst du die Behauptung. Das ist oft schneller — und hier führt es direkt zum Kern.',
                  'Instead of checking the message you check the claim. That is often faster — and here it goes straight to the heart of it.') },
        { text: bi('Nummer blockieren, SMS löschen',
                   'Block the number, delete the text'),
          next: 'end_blocked', risk: -1, verdict: 'good', catches: ['sender', 'domain'],
          why: bi('Kurz und richtig. Eine private Handynummer, die behauptet, DHL zu sein, beendet die Diskussion schon von allein.',
                  'Short and correct. A private mobile number claiming to be DHL ends the discussion by itself.') },
      ],
    },

    n1_sender: {
      messages: [
        { kind: 'system', text: bi(
          'Du tippst auf die Nummer. +49 1573 8842019 — eine ganz normale Prepaid-Handynummer. Keine Kurzwahl, kein hinterlegter Name, kein Kontakt bei DHL.',
          'You tap the number. +49 1573 8842019 — an ordinary prepaid mobile number. No short code, no registered name, no connection to DHL.') },
        { kind: 'system', text: bi(
          'Bei deiner letzten echten Sendung stand als Absender schlicht „DHL" — kein Zahlenkolonne.',
          'On your last genuine delivery the sender simply read “DHL” — not a string of digits.') },
      ],
      flags: ['sender'],
      tactic: 'authority',
      info: {
        icon: '🏷️',
        title: bi('Absendernamen sind nicht frei wählbar — Nummern schon',
                  'Sender names are regulated — numbers are not'),
        body: [
          bi('Ein Firmenname als SMS-Absender („DHL", „DPD", „Sparkasse") muss beim Mobilfunkanbieter registriert werden. Eine Prepaid-Nummer bekommt man anonym an der Supermarktkasse.',
             'A company name as an SMS sender (“DHL”, “DPD”, your bank) has to be registered with the mobile networks. A prepaid number can be bought anonymously at a supermarket till.'),
          bi('Deshalb ist der Absender das erste, worauf sich ein Blick lohnt — und oft schon das letzte, das man braucht.',
             'That is why the sender is the first thing worth a look — and often the last thing you need.'),
        ],
      },
      prompt: bi('Der Absender passt nicht. Und jetzt?', 'The sender does not fit. So now what?'),
      choices: [
        { text: bi('Reicht mir. Blockieren und an 7726 weiterleiten',
                   'Seen enough. Block it and forward to 7726'),
          next: 'end_reported', risk: -2, verdict: 'good', catches: ['sender', 'domain', 'urgency'],
          why: bi('7726 ist die kostenlose Spam-Kurzwahl der Mobilfunkanbieter. Weiterleiten dauert fünf Sekunden und hilft, die Nummer für alle zu sperren.',
                  '7726 is the mobile networks’ free spam short code. Forwarding takes five seconds and helps get the number blocked for everyone.') },
        { text: bi('Trotzdem in der echten DHL-App nachsehen',
                   'Check the genuine DHL app anyway'),
          next: 'end_app', risk: -1, verdict: 'good', catches: ['noOrder', 'domain'],
          why: bi('Gründlich und richtig. Die App weiß, ob es eine Sendung gibt — die SMS weiß es nicht.',
                  'Thorough and correct. The app knows whether a shipment exists. The text does not.') },
        { text: bi('Der Absender ist komisch, aber ich klicke trotzdem',
                   'The sender is odd, but I will click anyway'),
          next: 'n2_page', risk: 2, verdict: 'bad',
          why: bi('Du hast das Warnsignal erkannt und bist trotzdem hineingegangen. Genau darauf setzt die Masche: dass Neugier stärker ist als das ungute Gefühl.',
                  'You spotted the warning sign and walked in regardless. That is what the con counts on: curiosity outweighing the uneasy feeling.') },
      ],
    },

    n2_think: {
      messages: [
        { kind: 'system', text: bi(
          'Du denkst nach. Die Sneaker kamen aus Hamburg — ein deutscher Shop. Und in der SMS steht keine einzige Sendungsnummer.',
          'You think it through. The trainers shipped from Hamburg — a German shop. And the text does not contain a single tracking number.') },
      ],
      flags: ['noOrder', 'noEuCustoms'],
      tactic: 'distraction',
      info: {
        icon: '🇪🇺',
        title: bi('Warum es hier gar keinen Zoll geben kann',
                  'Why there cannot be any customs here'),
        body: [
          bi('Zoll fällt nur bei Sendungen von außerhalb der EU an. Innerhalb der EU gibt es keine Zollgebühren — bei einem Paket aus Hamburg ist die Behauptung also nicht unwahrscheinlich, sondern unmöglich.',
             'Customs only applies to shipments from outside the EU. Within the EU there are no customs charges at all — so for a parcel from Hamburg the claim is not unlikely, it is impossible.'),
          bi('Und wenn wirklich einmal Gebühren anfallen, zieht der Zusteller sie an der Haustür ein oder legt eine Karte in den Briefkasten. Nie per Link in einer SMS.',
             'And when a genuine fee does apply, the courier collects it at your door or leaves a card in your letterbox. Never through a link in a text.'),
        ],
      },
      prompt: bi('Die Behauptung kann nicht stimmen. Was tust du?',
                 'The claim cannot be true. What do you do?'),
      choices: [
        { text: bi('In der echten DHL-App nachsehen',
                   'Check the real DHL app'),
          next: 'end_app', risk: -1, verdict: 'good', catches: ['domain', 'noOrder'],
          why: bi('Der Königsweg: nie dem Link folgen, immer selbst die echte App öffnen oder die Adresse von Hand eintippen.',
                  'The gold standard: never follow the link, always open the genuine app yourself or type the address by hand.') },
        { text: bi('Beim Shop nachfragen, wo die Sneaker bleiben',
                   'Ask the shop where the trainers are'),
          next: 'n2_shop', risk: -1, verdict: 'good', catches: ['noOrder'],
          why: bi('Auch richtig: Wer die Ware verkauft hat, kennt den echten Sendungsstatus.',
                  'Also right: whoever sold you the goods knows the real shipping status.') },
        { text: bi('Trotzdem draufklicken, nur mal gucken',
                   'Tap it anyway, just to look'),
          next: 'n2_page', risk: 2, verdict: 'bad',
          why: bi('„Nur mal gucken" ist genau das, worauf die Masche baut. Die Seite ist nicht zum Angucken gebaut, sondern zum Ausfüllen.',
                  '“Just to look” is precisely what the con is built on. The page is not built to be looked at, it is built to be filled in.') },
      ],
    },

    n2_shop: {
      messages: [
        { kind: 'system', text: bi(
          'Der Shop antwortet innerhalb einer Stunde: Sendung ist unterwegs, voraussichtlich morgen. Sendungsnummer im Anhang. Von einer Gebühr weiß niemand.',
          'The shop replies within the hour: shipment on its way, expected tomorrow. Tracking number attached. Nobody knows anything about a fee.') },
      ],
      prompt: bi('Zwei unabhängige Quellen widersprechen der SMS.',
                 'Two independent sources contradict the text.'),
      choices: [
        { text: bi('SMS melden und löschen', 'Report the text and delete it'),
          next: 'end_reported', risk: -2, verdict: 'good', catches: ['sender', 'urgency', 'noOrder'],
          why: bi('Sauber abgeschlossen. Prüfen, dann melden — mehr braucht es nicht.',
                  'Cleanly finished. Check, then report — that is all it takes.') },
      ],
    },

    /* ============ Kapitel 2: Die Seite ============ */

    n2_page: {
      chapter: bi('Kapitel 2 — Die Seite', 'Chapter 2 — The page'),
      messages: [
        { kind: 'system', text: bi(
          'Die Seite öffnet sich. Gelbes Logo, die richtige Schrift, sogar das Cookie-Banner sieht echt aus. Oben ein Fortschrittsbalken: „Sendung · Zahlung · Zustellung".',
          'The page opens. Yellow logo, the correct typeface, even the cookie banner looks genuine. At the top a progress bar: “Shipment · Payment · Delivery”.') },
      ],
      flags: ['domain'],
      tactic: 'authority',
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
      info: {
        icon: '🔗',
        title: bi('So liest man eine Internetadresse richtig',
                  'How to read a web address properly'),
        body: [
          bi('Lies die Adresse von rechts nach links bis zum ersten einzelnen Schrägstrich. Der letzte Teil davor ist der Eigentümer: bei dhl.de/sendung ist es dhl.de, bei dhl-paket-zustellung.info/de ist es dhl-paket-zustellung.info.',
             'Read the address from right to left up to the first single slash. The last chunk before it is the owner: in dhl.de/tracking it is dhl.de; in dhl-paket-zustellung.info/de it is dhl-paket-zustellung.info.'),
          bi('Alles davor darf frei erfunden sein. dhl.sicherheit-check.ru gehört zu sicherheit-check.ru, nicht zu DHL. Das Wort „dhl" am Anfang bedeutet gar nichts.',
             'Everything before that can be invented freely. dhl.security-check.ru belongs to security-check.ru, not to DHL. The word “dhl” at the front means nothing at all.'),
          bi('Auch das Schloss-Symbol beweist nichts: Es sagt nur, dass die Verbindung verschlüsselt ist — nicht, dass die Seite ehrlich ist. Betrüger benutzen Verschlüsselung genauso.',
             'The padlock icon proves nothing either: it only says the connection is encrypted, not that the site is honest. Scammers use encryption too.'),
        ],
      },
      prompt: bi('Das Formular will Kartennummer, Ablaufdatum und Prüfziffer.',
                 'The form wants your card number, expiry date and security code.'),
      choices: [
        { text: bi('Adresszeile im Browser genau lesen',
                   'Read the browser address bar carefully'),
          next: 'n3_url', risk: 0, verdict: 'good', catches: ['domain'],
          why: bi('Die Adresszeile lügt nie. Das Logo, die Schrift und der Fortschrittsbalken schon — die sind in dreißig Minuten nachgebaut.',
                  'The address bar never lies. The logo, the typeface and the progress bar do — those are rebuilt in half an hour.') },
        { text: bi('Kartendaten eingeben und zahlen',
                   'Enter the card details and pay'),
          next: 'n3_paid', risk: 3, verdict: 'bad', form: true,
          why: bi('Damit hat die andere Seite eine vollständig nutzbare Karte — nicht 2,99 €, sondern alles, was auf ihr verfügbar ist.',
                  'The other side now holds a fully usable card — not €2.99, but everything available on it.') },
        { text: bi('Tab schließen, mir ist das zu komisch',
                   'Close the tab, this feels off'),
          next: 'end_closed', risk: -1, verdict: 'good', catches: ['domain', 'cardData'],
          why: bi('Auf das ungute Gefühl zu hören ist eine völlig legitime Sicherheitsstrategie. Man muss nicht beweisen können, warum etwas faul ist, um wegzugehen.',
                  'Listening to that uneasy feeling is a perfectly legitimate security strategy. You do not have to prove something is wrong in order to walk away.') },
      ],
    },

    n3_url: {
      messages: [
        { kind: 'system', text: bi(
          'Da steht dhl-paket-zustellung.info — nicht dhl.de. Der Teil vor dem ersten Schrägstrich gehört jemandem, der sich diesen Namen für ein paar Euro registriert hat.',
          'It reads dhl-paket-zustellung.info — not dhl.de. The part before the first slash belongs to somebody who registered that name for a few euros.') },
        { kind: 'system', text: bi(
          'Ein kurzer Blick auf die Domain-Abfrage: registriert vor elf Tagen.',
          'A quick look at the domain record: registered eleven days ago.') },
      ],
      flags: ['domain'],
      tactic: 'authority',
      prompt: bi('Elf Tage alt, falscher Name. Jetzt ist es eindeutig.',
                 'Eleven days old, wrong name. Now it is unambiguous.'),
      choices: [
        { text: bi('Tab schließen und die Nummer als Spam melden',
                   'Close the tab and report the number as spam'),
          next: 'end_reported', risk: -2, verdict: 'good', catches: ['domain', 'sender', 'urgency'],
          why: bi('Melden hilft allen anderen mit, die dieselbe SMS bekommen haben — und das sind Zehntausende.',
                  'Reporting helps everyone else who got the same text — and that is tens of thousands of people.') },
        { text: bi('Ach, die 2,99 € riskiere ich', 'Ah, I will risk the €2.99'),
          next: 'n3_paid', risk: 3, verdict: 'bad',
          why: bi('Du riskierst nicht 2,99 €. Du gibst eine Karte heraus, die weltweit funktioniert — der Betrag im Formular hat mit dem Schaden nichts zu tun.',
                  'You are not risking €2.99. You are handing over a card that works worldwide — the amount on the form has nothing to do with the damage.') },
      ],
    },

    /* ============ Kapitel 3: Die Abbuchungen ============ */

    n3_paid: {
      chapter: bi('Kapitel 3 — Die Abbuchungen', 'Chapter 3 — The charges'),
      messages: [
        { kind: 'system', text: bi('„Vielen Dank. Ihr Paket wird morgen zugestellt."',
                                   '“Thank you. Your parcel will be delivered tomorrow.”') },
        { kind: 'system', text: bi(
          'Freitag: kein Paket. Samstag: kein Paket. Der Geburtstag deines Bruders läuft ohne Geschenk.',
          'Friday: no parcel. Saturday: no parcel. Your brother’s birthday passes without the present.') },
        { kind: 'system', text: bi(
          'Sonntagabend, Banking-App: drei Abbuchungen. 89,00 € · 89,00 € · 71,90 €. Alle drei aus einem Elektronikshop, den du nicht kennst.',
          'Sunday evening, banking app: three charges. €89.00 · €89.00 · €71.90. All three from an electronics shop you have never heard of.') },
      ],
      flags: ['cardData'],
      tactic: 'distraction',
      info: {
        icon: '💳',
        title: bi('Warum dreimal knapp unter 100 €?',
                  'Why three charges just under €100?'),
        body: [
          bi('Kleine Beträge lösen seltener eine Prüfung durch die Bank aus und fallen auf dem Kontoauszug weniger auf als eine einzelne große Buchung. Getestet wird oft zuerst mit einem Centbetrag, ob die Karte überhaupt lebt.',
             'Small amounts trigger fewer checks from the bank and stand out less on a statement than one large debit. Often a few cents get charged first, just to test whether the card is live.'),
          bi('Deshalb lohnt es sich, auch winzige unbekannte Buchungen ernst zu nehmen — sie sind oft der Probelauf für die großen.',
             'Which is why even tiny unfamiliar charges are worth taking seriously — they are often the rehearsal for the big ones.'),
        ],
      },
      prompt: bi('249,90 € sind weg. Was tust du zuerst?',
                 '€249.90 is gone. What do you do first?'),
      choices: [
        { text: bi('Sofort Karte sperren und der Bank melden',
                   'Freeze the card immediately and tell the bank'),
          next: 'n4_bank', risk: 0, verdict: 'good',
          why: bi('Genau die richtige Reihenfolge: erst die Blutung stoppen, dann alles andere. Jede Stunde offen ist eine Stunde, in der weiter abgebucht wird.',
                  'Exactly the right order: stop the bleeding first, everything else after. Every hour the card stays live is another hour of charges.') },
        { text: bi('Erst mal beim Elektronikshop anrufen und nachfragen',
                   'Ring the electronics shop first and ask'),
          next: 'n4_slow', risk: 2, verdict: 'meh',
          why: bi('Verständlich, aber die falsche Reihenfolge. Der Shop hat die Ware längst verschickt — die Karte läuft derweil weiter.',
                  'Understandable, but the wrong order. The shop shipped the goods long ago — and meanwhile the card keeps running.') },
        { text: bi('Abwarten, vielleicht klärt sich das von selbst',
                   'Wait and see, maybe it sorts itself out'),
          next: 'n4_slow', risk: 3, verdict: 'bad',
          why: bi('Bei Kartenbetrug klärt sich nie etwas von selbst. Abwarten ist nicht die neutrale Option, sondern die teuerste.',
                  'With card fraud nothing ever sorts itself out. Waiting is not the neutral option, it is the most expensive one.') },
      ],
    },

    n4_bank: {
      messages: [
        { kind: 'system', text: bi(
          'Die Bank sperrt die Karte sofort. Die Mitarbeiterin nimmt alle drei Buchungen auf und schickt dir ein Formular für den Widerspruch.',
          'The bank freezes the card at once. The adviser records all three charges and sends you a dispute form.') },
        { kind: 'system', text: bi(
          '„Haben Sie die Daten auf einer Seite eingegeben, die Sie über einen Link erreicht haben?" — „Ja." — „Dann bitte auch Anzeige erstatten, das brauchen wir für die Erstattung."',
          '“Did you enter the details on a page you reached through a link?” — “Yes.” — “Then please file a police report too, we need it for the refund.”') },
      ],
      tactic: 'shame',
      info: {
        icon: '⚖️',
        title: bi('Bekommt man das Geld zurück?', 'Do you get the money back?'),
        body: [
          bi('Bei nicht autorisierten Kartenzahlungen muss die Bank grundsätzlich erstatten. Wichtig ist, dass du unverzüglich meldest, sobald du es bemerkst.',
             'For unauthorised card payments the bank generally has to refund you. What matters is that you report it immediately once you notice.'),
          bi('Anders liegt es, wenn du eine Zahlung selbst freigegeben hast — etwa mit einer Push-Bestätigung in der Banking-App. Dann gilt sie als autorisiert und die Erstattung ist deutlich schwerer.',
             'It is different if you approved a payment yourself — for example by confirming a push notification in your banking app. Then it counts as authorised and a refund becomes much harder.'),
        ],
      },
      prompt: bi('Die Bank will eine Anzeige. Machst du das?',
                 'The bank wants a police report. Will you file one?'),
      choices: [
        { text: bi('Anzeige online erstatten, alles dokumentieren',
                   'File the report online, document everything'),
          next: 'end_recovered', risk: -1, verdict: 'good',
          why: bi('Unangenehm, aber genau das holt das Geld zurück. Die Anzeige geht online in fünfzehn Minuten.',
                  'Uncomfortable, but this is what gets the money back. The report takes fifteen minutes online.') },
        { text: bi('Lieber nicht, das ist mir zu peinlich',
                   'Rather not, it is too embarrassing'),
          next: 'end_ashamed', risk: 2, verdict: 'bad',
          why: bi('Scham ist der beste Verbündete der Täter. Sie ist der Grund, warum die meisten Fälle nie gemeldet werden — und die Masche jahrelang weiterläuft.',
                  'Shame is the offender’s best ally. It is why most cases are never reported — and why the con runs for years.') },
      ],
    },

    n4_slow: {
      messages: [
        { kind: 'system', text: bi(
          'Der Shop sagt, die Bestellung sei bezahlt und bereits versandt — an eine Packstation in einer anderen Stadt.',
          'The shop says the order was paid and already dispatched — to a parcel locker in another city.') },
        { kind: 'system', text: bi(
          'Während des Telefonats kommt die nächste Benachrichtigung: 340,00 €.',
          'During the call the next notification arrives: €340.00.') },
      ],
      flags: ['cardData'],
      tactic: 'commitment',
      prompt: bi('Es geht weiter, während du telefonierst.',
                 'It is still going while you are on the phone.'),
      choices: [
        { text: bi('Auflegen und sofort die Karte sperren',
                   'Hang up and freeze the card right now'),
          next: 'n4_bank', risk: 0, verdict: 'good',
          why: bi('Spät, aber richtig. Ab dem Moment der Sperre kann nichts mehr passieren.',
                  'Late, but right. From the moment it is frozen, nothing more can happen.') },
        { text: bi('Das Gespräch zu Ende führen', 'Finish the call first'),
          next: 'end_scammed_slow', risk: 3, verdict: 'bad',
          why: bi('Höflichkeit kostet hier Geld. Die Sperre ist ein Klick in der App und geht auch während eines Telefonats.',
                  'Politeness costs money here. Freezing the card is one tap in the app and works mid-call.') },
      ],
    },

    /* ============ Kapitel 4: Die zweite Welle ============ */

    end_recovered: {
      chapter: bi('Kapitel 4 — Danach', 'Chapter 4 — Afterwards'),
      outcome: 'close',
      messages: [
        { kind: 'system', text: bi(
          'Nach vier Wochen sind die 249,90 € zurück auf dem Konto. Die neue Karte ist längst da.',
          'Four weeks later the €249.90 is back in the account. The new card arrived long ago.') },
        { kind: 'system', text: bi(
          'Sechs Wochen später eine E-Mail: „Wir haben Ihre Daten in einem Datenleck gefunden und können Ihr Geld zurückholen. Bearbeitungsgebühr 89 €." Du löschst sie.',
          'Six weeks later an email: “We found your data in a breach and can recover your money. Processing fee €89.” You delete it.') },
      ],
      damage: bi('249,90 € abgebucht — vollständig zurückgeholt', '€249.90 charged — fully recovered'),
      lessons: [
        bi('Kartendaten gehören nie auf eine Seite, die du über einen Link erreicht hast.',
           'Card details never belong on a page you reached through a link.'),
        bi('Für 2,99 € braucht niemand deine Prüfziffer. Spätestens da hätte es klingeln müssen.',
           'Nobody needs your security code to take €2.99. That was the moment to stop.'),
        bi('Schnelles Sperren macht den Unterschied zwischen Ärger und Verlust.',
           'Freezing fast is the difference between an annoyance and a loss.'),
        bi('Wer einmal gezahlt hat, wird erneut kontaktiert. Rückhol-Angebote gegen Vorkasse sind immer die zweite Masche.',
           'Anyone who paid once gets contacted again. Recovery offers that want money up front are always the second con.'),
      ],
      recover: [
        bi('Karte sofort sperren — in der Banking-App oder über den Sperr-Notruf 116 116.',
           'Freeze the card immediately — in your banking app or via the card-blocking hotline.'),
        bi('Allen Buchungen schriftlich widersprechen. Unautorisierte Zahlungen müssen erstattet werden.',
           'Dispute every charge in writing. Unauthorised payments have to be refunded.'),
        bi('Anzeige erstatten und die Bestätigung der Bank vorlegen.',
           'File a police report and give the confirmation to your bank.'),
      ],
    },

    end_ashamed: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi(
          'Ohne Anzeige lehnt die Bank die Erstattung ab. Die 249,90 € bleiben weg.',
          'Without a police report the bank refuses the refund. The €249.90 stays gone.') },
        { kind: 'system', text: bi(
          'Zwei Monate später steht dieselbe Nummer wieder im Posteingang — diesmal mit einer angeblichen Rückerstattung.',
          'Two months later the same number is back in the inbox — this time offering a supposed refund.') },
      ],
      flags: ['recovery'],
      damage: bi('249,90 € — nicht erstattet', '€249.90 — not refunded'),
      lessons: [
        bi('Die Anzeige ist kein Formalismus. Ohne sie erstattet die Bank in vielen Fällen nicht.',
           'The police report is not red tape. Without it, banks frequently refuse to refund.'),
        bi('Scham kostet hier bares Geld. Diese Maschen sind darauf ausgelegt, zu funktionieren — bei klugen Menschen genauso.',
           'Shame costs real money here. These cons are engineered to work, on clever people just the same.'),
      ],
      recover: [
        bi('Die Anzeige lässt sich nachholen — auch Wochen später noch.',
           'You can still file the report — even weeks later.'),
        bi('Der Bank gegenüber auf einer schriftlichen Prüfung bestehen.',
           'Insist on a written review of the case with your bank.'),
        bi('Auf keine „Rückerstattungs"-Angebote reagieren. Das ist dieselbe Bande.',
           'Do not respond to any “refund” offers. That is the same gang.'),
      ],
    },

    end_scammed_slow: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi(
          'Bis die Karte am nächsten Morgen gesperrt ist, stehen 1.240 € auf der Abrechnung.',
          'By the time the card is frozen the next morning, the statement shows €1,240.') },
      ],
      flags: ['cardData'],
      damage: bi('1.240 € abgebucht', '€1,240 charged'),
      lessons: [
        bi('Bei Kartenbetrug zählt jede Stunde. Zuerst sperren, dann alles andere klären.',
           'With card fraud every hour counts. Freeze first, sort out the details afterwards.'),
        bi('Die Sperre geht in der App in zehn Sekunden — auch mitten in einem Telefonat.',
           'Freezing takes ten seconds in the app — even in the middle of a phone call.'),
      ],
      recover: [
        bi('Karte sperren, auch Tage später noch.', 'Have the card blocked, even days later.'),
        bi('Allen Abbuchungen widersprechen und auf Erstattung bestehen.',
           'Dispute every charge and insist on a refund.'),
        bi('Anzeige erstatten und die Kontoauszüge wochenlang weiter kontrollieren.',
           'File a police report and keep checking your statements for weeks.'),
      ],
    },

    /* ============ Saubere Ausgänge ============ */

    end_blocked: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'Nummer blockiert, SMS gelöscht. Am Freitag steht das Paket ganz normal vor der Tür — pünktlich zum Geburtstag.',
          'Number blocked, text deleted. On Friday the parcel simply turns up at the door — in time for the birthday.') },
      ],
      damage: bi('0 € — nichts passiert', '€0 — nothing happened'),
      lessons: [
        bi('Paketdienste verlangen keine Zollgebühren per Link in einer SMS.',
           'Delivery companies do not collect customs fees through a link in a text.'),
        bi('Innerhalb der EU gibt es überhaupt keinen Zoll.',
           'There is no customs charge at all within the EU.'),
        bi('Verdächtige SMS an die Kurzwahl 7726 weiterleiten und die Nummer blockieren.',
           'Forward suspicious texts to the short code 7726 and block the number.'),
      ],
    },

    end_app: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'In der echten DHL-App: eine Sendung, unterwegs, Zustellung morgen. Keine offene Gebühr, kein Zoll, kein Problem.',
          'In the genuine DHL app: one shipment, in transit, delivery tomorrow. No outstanding fee, no customs, no problem.') },
      ],
      damage: bi('0 € — sauber erkannt', '€0 — spotted cleanly'),
      lessons: [
        bi('Nie dem Link folgen. Immer selbst die App öffnen oder die Adresse von Hand eintippen.',
           'Never follow the link. Always open the app yourself or type the address by hand.'),
        bi('Eine Sendungsnummer, die es nicht gibt, ist der schnellste Gegenbeweis überhaupt.',
           'A tracking number that does not exist is the fastest possible disproof.'),
        bi('Das gilt für jede Nachricht mit Link: Bank, Streaming-Dienst, Finanzamt, Paketdienst.',
           'This holds for every message with a link: banks, streaming services, the tax office, couriers.'),
      ],
    },

    end_closed: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi('Tab zu. Der Betrugsversuch endet hier.',
                                   'Tab closed. The attempt ends here.') },
      ],
      damage: bi('0 € — Seite rechtzeitig verlassen', '€0 — you left the page in time'),
      lessons: [
        bi('Die Adresszeile ist die Wahrheit. Der Name vor dem ersten einzelnen Schrägstrich besitzt die Seite.',
           'The address bar is the truth. The name before the first single slash owns the page.'),
        bi('Ein Logo ist in dreißig Minuten nachgebaut, eine Domain nicht.',
           'A logo can be rebuilt in half an hour. A domain cannot.'),
        bi('Das Schloss-Symbol bedeutet nur „verschlüsselt", nicht „ehrlich".',
           'The padlock only means “encrypted”, never “honest”.'),
      ],
    },

    end_reported: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'Gemeldet, blockiert, gelöscht. Zwei Tage später ist die Nummer abgeschaltet — auch für alle anderen.',
          'Reported, blocked, deleted. Two days later the number is shut down — for everyone else too.') },
      ],
      damage: bi('0 € — und die Masche gemeldet', '€0 — and the con reported'),
      lessons: [
        bi('Der Absender ist das erste Warnsignal und oft schon das letzte, das man braucht.',
           'The sender is the first warning sign, and often the only one you need.'),
        bi('Melden kostet fünf Sekunden und schützt die Nächsten, die dieselbe SMS bekommen.',
           'Reporting costs five seconds and protects the next people to get the same text.'),
        bi('7726 ist die kostenlose Spam-Kurzwahl aller großen Mobilfunkanbieter.',
           '7726 is the free spam short code used by all the major mobile networks.'),
      ],
    },
  },
};
