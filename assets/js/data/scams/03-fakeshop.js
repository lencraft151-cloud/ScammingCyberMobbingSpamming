import { bi } from '../bi.js';

/** Story 3 — Fake-Shop über eine Instagram-Anzeige. */
export default {
  id: 'fakeshop',
  icon: '👟',
  channel: 'instagram',
  difficulty: 2,
  title: bi('Sneaker für 39 €', 'Trainers for €39'),
  teaser: bi(
    'Du sparst seit vier Monaten auf diese Schuhe. Jetzt kosten sie plötzlich ein Fünftel.',
    'You have been saving for these shoes for four months. Suddenly they cost a fifth of the price.'),
  contact: {
    name: bi('@sneaker.outlet.de', '@sneaker.outlet.de'),
    sub: bi('Gesponsert · 2.140 Follower', 'Sponsored · 2,140 followers'),
  },

  redFlags: {
    tooCheap: {
      label: bi('Ein Preis, den es nicht geben kann',
                'A price that cannot exist'),
      why: bi('80 % unter Marktpreis ist kein Schnäppchen, sondern eine Ansage. Kein Händler verkauft dauerhaft unter Einkaufspreis — und wenn doch, wäre die Ware in Stunden ausverkauft, nicht wochenlang in jeder Größe verfügbar.',
              '80 % below market price is not a bargain, it is a statement. No retailer sells below cost for long — and if they did, stock would sell out in hours, not stay available in every size for weeks.'),
    },
    newAccount: {
      label: bi('Das Profil ist erst wenige Wochen alt',
                'The profile is only a few weeks old'),
      why: bi('Fake-Shops leben kurz: aufbauen, Geld einsammeln, verschwinden, bevor die ersten Anzeigen bei der Polizei landen. Ein Profil mit elf Beiträgen und 2.000 Followern ist meist gekaufte Reichweite.',
              'Fake shops live briefly: build, collect, disappear before the first police reports land. A profile with eleven posts and 2,000 followers is usually bought reach.'),
    },
    prepay: {
      label: bi('Nur Vorkasse per Überweisung',
                'Bank transfer up front, nothing else'),
      why: bi('PayPal-Warenkorb und Kreditkarte holen dir dein Geld zurück, eine Überweisung nicht. Deshalb sind die geschützten Zahlarten immer „wegen Wartungsarbeiten vorübergehend nicht verfügbar".',
              'PayPal goods-and-services and card payments can be reversed. A bank transfer cannot. Which is why the protected methods are always “temporarily unavailable due to maintenance”.'),
    },
    noImprint: {
      label: bi('Kein Impressum, keine erreichbare Adresse',
                'No legal notice, no reachable address'),
      why: bi('In Deutschland ist ein Impressum mit ladungsfähiger Anschrift Pflicht. Fehlt es oder ist es kopiert, gibt es niemanden, den man verklagen könnte — und genau das ist der Zweck.',
              'German law requires a legal notice with a serviceable address. If it is missing or copied, there is nobody to sue — and that is precisely the point.'),
    },
    fakeReviews: {
      label: bi('Lauter Fünf-Sterne-Kommentare vom selben Tag',
                'A wall of five-star comments, all from the same day'),
      why: bi('Echte Kundschaft schreibt über Monate verteilt, unterschiedlich lang und manchmal kritisch. Gekaufte Kommentare kommen im Block, klingen gleich und stammen von Profilen ohne eigene Beiträge.',
              'Real customers post over months, at different lengths, sometimes critically. Bought comments arrive in a block, sound alike, and come from profiles with no posts of their own.'),
    },
    pressure: {
      label: bi('Countdown und „nur noch 3 Stück"',
                'A countdown and “only 3 left”'),
      why: bi('Der Zähler steht auf jeder Produktseite und springt beim Neuladen zurück. Er misst keinen Lagerbestand, sondern erzeugt Eile.',
              'The counter appears on every product page and resets on reload. It measures no stock level, it manufactures hurry.'),
    },
    stolenPhotos: {
      label: bi('Die Produktfotos gehören jemand anderem',
                'The product photos belong to somebody else'),
      why: bi('Fake-Shops kopieren Bilder aus echten Shops oder von Influencern. Eine Rückwärts-Bildersuche findet die Quelle in Sekunden — oft samt Originalpreis.',
              'Fake shops copy images from real retailers or influencers. A reverse image search finds the source in seconds — often complete with the original price.'),
    },
    reshipFee: {
      label: bi('Die Nachforderung für ein Paket, das es nie gab',
                'A follow-up fee for a parcel that never existed'),
      why: bi('Wer einmal gezahlt hat, steht auf einer Liste. Die „Zollgebühr" für die nie versandte Ware ist die zweite Masche — diesmal geht es um die Kartendaten.',
              'Anyone who paid once is on a list. The “customs fee” for goods that were never shipped is the second con — and this time it is about your card details.'),
    },
  },

  start: 'n1',
  nodes: {

    /* ============ Kapitel 1: Die Anzeige ============ */

    n1: {
      chapter: bi('Kapitel 1 — Die Anzeige', 'Chapter 1 — The advert'),
      messages: [
        { kind: 'system', text: bi(
          'Du sparst seit vier Monaten auf diese Sneaker. 179 € — noch 40 € fehlen. Abends beim Scrollen taucht die Anzeige zum dritten Mal auf.',
          'You have been saving for these trainers for four months. €179 — you are still €40 short. Scrolling in the evening, the advert appears for the third time.') },
        { from: 'them', time: '20:14',
          image: bi('[Anzeige: genau dein Modell, Preis 179 € durchgestrichen → 39 €]',
                    '[Ad: exactly your model, €179 struck through → €39]'),
          text: bi('LAGERAUFLÖSUNG 🔥 Alle Modelle 39 € statt 179 €. Nur noch heute! Versand aus Deutschland, 2–3 Tage.',
                   'CLEARANCE 🔥 All models €39 instead of €179. Today only! Ships from Germany, 2–3 days.'),
          reactions: ['❤️ 412', '💬 38'] },
      ],
      flags: ['tooCheap', 'pressure'],
      tactic: 'greed',
      info: {
        icon: '🎯',
        title: bi('Warum dir ausgerechnet diese Anzeige gezeigt wird',
                  'Why you are being shown this particular advert'),
        body: [
          bi('Werbeanzeigen lassen sich sehr genau ausrichten: nach Alter, Ort, Interessen und danach, wonach du zuletzt gesucht hast. Dass die Anzeige perfekt passt, ist kein Zufall und kein Glück — dafür wurde bezahlt.',
             'Adverts can be targeted very precisely: by age, location, interests and what you searched for recently. The advert fitting perfectly is neither coincidence nor luck — somebody paid for that.'),
          bi('Auch betrügerische Shops kaufen ganz normal Werbeplätze. Dass etwas als „gesponsert" auf einer großen Plattform läuft, ist kein Gütesiegel.',
             'Fraudulent shops buy ad space like anyone else. Something running as “sponsored” on a major platform is not a mark of quality.'),
        ],
      },
      prompt: bi('Genau dein Modell, genau deine Größe. Und du bist fast am Ziel.',
                 'Exactly your model, exactly your size. And you are nearly there.'),
      choices: [
        { text: bi('Profil öffnen und genauer angucken',
                   'Open the profile and take a proper look'),
          next: 'n2_profile', risk: 0, verdict: 'good', catches: ['tooCheap'],
          why: bi('Erst prüfen, dann kaufen. Dreißig Sekunden, die über 39 € und deine Kontodaten entscheiden.',
                  'Check first, buy second. Thirty seconds that decide the fate of €39 and your bank details.') },
        { text: bi('Das Modell zum Vergleich woanders suchen',
                   'Search for the model elsewhere to compare'),
          next: 'n2_compare', risk: -1, verdict: 'good', catches: ['tooCheap'],
          why: bi('Preisvergleich ist die einfachste Betrugsprüfung überhaupt und dauert eine halbe Minute.',
                  'Comparing prices is the simplest fraud check there is, and it takes half a minute.') },
        { text: bi('Direkt in den Shop, bevor sie weg sind',
                   'Straight to the shop before they sell out'),
          next: 'n3_shop', risk: 2, verdict: 'bad',
          why: bi('Der Countdown hat genau das bewirkt, wofür er gebaut wurde: Du handelst, bevor du prüfst.',
                  'The countdown did precisely what it was built for: you acted before you checked.') },
      ],
    },

    n2_compare: {
      messages: [
        { kind: 'system', text: bi(
          'Überall 165 bis 185 €. Kein einziger seriöser Händler geht unter 150 €. Von einer Lagerauflösung weiß niemand — auch der Hersteller nicht.',
          'Everywhere between €165 and €185. Not one reputable retailer goes below €150. Nobody knows about a clearance sale — not even the manufacturer.') },
      ],
      flags: ['tooCheap'],
      tactic: 'greed',
      info: {
        icon: '🧮',
        title: bi('Rechne kurz nach, wer dabei verlieren müsste',
                  'Work out for a second who would be losing money'),
        body: [
          bi('Bei 39 € Verkaufspreis müsste der Einkauf unter 30 € liegen, dazu Versand, Verpackung, Rücksendungen und Gebühren. Für ein Markenprodukt, das im Großhandel über 90 € kostet, ist das unmöglich.',
             'At a €39 selling price, purchase cost would have to be under €30, plus shipping, packaging, returns and fees. For a branded product that costs over €90 wholesale, that is impossible.'),
          bi('Es bleiben zwei Möglichkeiten: gefälschte Ware — oder gar keine Ware. Bei dieser Masche ist es fast immer die zweite.',
             'Two possibilities remain: counterfeit goods — or no goods at all. With this con it is almost always the second.'),
        ],
      },
      prompt: bi('Der Preis ist rechnerisch unmöglich. Und jetzt?',
                 'The price is mathematically impossible. So now what?'),
      choices: [
        { text: bi('Finger weg und den Account melden',
                   'Walk away and report the account'),
          next: 'end_avoided', risk: -2, verdict: 'good', catches: ['tooCheap', 'newAccount'],
          why: bi('Melden nimmt der Anzeige die Reichweite, bevor sie jemanden trifft, der weniger genau hinsieht.',
                  'Reporting cuts the advert’s reach before it hits somebody who looks less closely.') },
        { text: bi('Trotzdem probieren — 39 € sind ja verkraftbar',
                   'Try anyway — €39 is survivable'),
          next: 'n3_shop', risk: 2, verdict: 'bad',
          why: bi('Es bleibt selten bei 39 €. Der Shop bekommt außerdem deinen Namen, deine Adresse und deine Kontonummer — und die sind mehr wert als die 39 €.',
                  'It rarely stays at €39. The shop also gets your name, address and account number — and those are worth more than the €39.') },
      ],
    },

    n2_profile: {
      messages: [
        { kind: 'system', text: bi(
          'Profil seit drei Wochen. 2.140 Follower, aber nur elf Beiträge. Unter jedem Bild dieselben vier Kommentare: „Ware top, schnell geliefert 😍" — alle vom selben Tag, alle von Profilen ohne eigene Beiträge.',
          'Profile three weeks old. 2,140 followers but only eleven posts. The same four comments under every picture: “Great product, fast delivery 😍” — all from the same day, all from profiles with no posts of their own.') },
      ],
      flags: ['newAccount', 'fakeReviews'],
      tactic: 'socialProof',
      info: {
        icon: '⭐',
        title: bi('Wie man gekaufte Bewertungen erkennt',
                  'How to spot bought reviews'),
        body: [
          bi('Zeitliche Häufung: Zwanzig Bewertungen an einem Tag, danach nichts. Echte kommen verteilt über Monate.',
             'Clustering in time: twenty reviews in one day, then nothing. Real ones arrive spread over months.'),
          bi('Gleichförmigkeit: gleiche Länge, gleiche Emojis, keine Kritik, keine Details zum Produkt. Echte Kundschaft erwähnt die Größe, die Farbe, was gestört hat.',
             'Uniformity: same length, same emojis, no criticism, no product detail. Real customers mention the size, the colour, what annoyed them.'),
          bi('Leere Profile: Konten ohne eigene Beiträge, ohne Freunde, oft mit einer Zahlenkolonne im Namen.',
             'Empty profiles: accounts with no posts, no friends, often with a string of digits in the name.'),
        ],
      },
      prompt: bi('Das Bild wird deutlicher.', 'The picture is getting clearer.'),
      choices: [
        { text: bi('Die Produktfotos rückwärts im Netz suchen',
                   'Reverse-search the product photos'),
          next: 'n2_photos', risk: -1, verdict: 'good', catches: ['stolenPhotos'],
          why: bi('Gründlich. Die Bildersuche zeigt in Sekunden, ob die Fotos aus einem echten Shop geklaut wurden.',
                  'Thorough. A reverse image search shows within seconds whether the photos were lifted from a real shop.') },
        { text: bi('Reicht mir. Melden und weiterscrollen',
                   'Seen enough. Report it and scroll on'),
          next: 'end_avoided', risk: -2, verdict: 'good', catches: ['newAccount', 'fakeReviews', 'tooCheap'],
          why: bi('Drei unabhängige Warnsignale in einem Profil sind kein Zufall mehr.',
                  'Three independent warning signs in one profile stop being coincidence.') },
        { text: bi('Zum Shop gehen und wenigstens gucken',
                   'Go to the shop and at least have a look'),
          next: 'n3_shop', risk: 1, verdict: 'meh',
          why: bi('Gucken ist harmlos — solange du an der Kasse genauso kritisch bleibst wie hier.',
                  'Looking is harmless — as long as you stay as critical at the checkout as you are here.') },
      ],
    },

    n2_photos: {
      messages: [
        { kind: 'system', text: bi(
          'Die Bildersuche findet dieselben Fotos in einem großen Sportshop — dort kosten die Schuhe 179 €. Sogar der Schatten auf dem Boden ist identisch.',
          'The reverse search finds the same photos in a major sports retailer — where the shoes cost €179. Even the shadow on the floor is identical.') },
      ],
      flags: ['stolenPhotos'],
      tactic: 'socialProof',
      prompt: bi('Geklaute Fotos, erfundener Preis.', 'Stolen photos, invented price.'),
      choices: [
        { text: bi('Anzeige melden und den Shop den Freunden zeigen',
                   'Report the advert and warn your friends'),
          next: 'end_warned', risk: -2, verdict: 'good', catches: ['stolenPhotos', 'tooCheap', 'newAccount'],
          why: bi('Die Anzeige läuft bei allen in deinem Umfeld. Eine Warnung erreicht mehr Leute als jede Meldung.',
                  'That advert is running for everyone around you. A warning reaches more people than any report does.') },
        { text: bi('Egal, ich probier es trotzdem', 'Whatever, I will try it anyway'),
          next: 'n3_shop', risk: 2, verdict: 'bad',
          why: bi('Du hast den Beweis in der Hand und gehst trotzdem hinein.',
                  'You have the proof in your hand and you are walking in regardless.') },
      ],
    },

    /* ============ Kapitel 2: Der Shop ============ */

    n3_shop: {
      chapter: bi('Kapitel 2 — Der Shop', 'Chapter 2 — The shop'),
      messages: [
        { kind: 'system', text: bi(
          'Der Shop sieht ordentlich aus: Produktfilter, Größentabelle, Kundenbewertungen. Ein roter Balken zählt: „Angebot endet in 08:41". Unten in der Fußzeile stehen die üblichen Links.',
          'The shop looks tidy: product filters, size chart, customer reviews. A red bar counts down: “Offer ends in 08:41”. The usual links sit in the footer.') },
      ],
      flags: ['pressure'],
      tactic: 'urgency',
      prompt: bi('Du legst die Sneaker in den Warenkorb.',
                 'You add the trainers to the basket.'),
      choices: [
        { text: bi('Fußzeile prüfen: Wer betreibt diesen Shop?',
                   'Check the footer: who runs this shop?'),
          next: 'n4_imprint', risk: -1, verdict: 'good', catches: ['noImprint'],
          why: bi('Das Impressum ist die Pflichtangabe, an der Fake-Shops fast immer scheitern.',
                  'The legal notice is the mandatory detail that fake shops almost always fail on.') },
        { text: bi('Die Seite neu laden und auf den Countdown achten',
                   'Reload the page and watch the countdown'),
          next: 'n4_countdown', risk: -1, verdict: 'good', catches: ['pressure'],
          why: bi('Ein simpler Test, der jeden künstlichen Countdown sofort entlarvt.',
                  'A simple test that exposes any artificial countdown instantly.') },
        { text: bi('Weiter zur Kasse', 'Continue to checkout'),
          next: 'n5_checkout', risk: 2, verdict: 'meh',
          why: bi('An der Kasse zeigt sich, wie ernst es ein Shop meint. Bis dahin ist noch nichts passiert.',
                  'The checkout is where a shop shows how serious it is. Nothing has happened yet.') },
      ],
    },

    n4_countdown: {
      messages: [
        { kind: 'system', text: bi(
          'Nach dem Neuladen steht wieder „08:41". Und auf jeder anderen Produktseite steht dieselbe Zahl.',
          'After the reload it reads “08:41” again. And every other product page shows the same number.') },
      ],
      flags: ['pressure'],
      tactic: 'urgency',
      info: {
        icon: '⏳',
        title: bi('Der Countdown misst nichts', 'The countdown measures nothing'),
        body: [
          bi('Ein echtes Angebot endet zu einem festen Zeitpunkt — für alle gleichzeitig. Ein Zähler, der bei jedem Besucher neu bei 08:41 startet, zählt nicht die Zeit bis zum Ende, sondern die Zeit seit deinem Eintreffen.',
             'A genuine offer ends at a fixed time — the same moment for everybody. A counter that restarts at 08:41 for every visitor is not counting down to an end, it is counting up from your arrival.'),
          bi('Dasselbe gilt für „nur noch 3 Stück" und „17 Personen sehen sich das gerade an". Beides sind Textbausteine, keine Messwerte.',
             'The same goes for “only 3 left” and “17 people are viewing this”. Both are text snippets, not measurements.'),
        ],
      },
      prompt: bi('Der Zeitdruck ist frei erfunden.', 'The time pressure is pure invention.'),
      choices: [
        { text: bi('Tab schließen, Anzeige melden',
                   'Close the tab, report the advert'),
          next: 'end_avoided', risk: -2, verdict: 'good', catches: ['pressure', 'tooCheap'],
          why: bi('Wer beim Countdown lügt, lügt auch beim Rest.',
                  'Anyone lying about the countdown is lying about the rest.') },
        { text: bi('Trotzdem zur Kasse', 'To the checkout anyway'),
          next: 'n5_checkout', risk: 2, verdict: 'bad',
          why: bi('Du hast die Lüge bewiesen und kaufst trotzdem.',
                  'You proved the lie and you are buying anyway.') },
      ],
    },

    n4_imprint: {
      messages: [
        { kind: 'system', text: bi(
          'Die Seite „Impressum" ist leer. Die AGB sind aus einem anderen Shop kopiert — im Text steht noch ein fremder Firmenname. Als Kontakt gibt es nur ein Formular.',
          'The “Legal notice” page is blank. The terms are copied from another shop — a different company name is still in the text. The only contact is a web form.') },
      ],
      flags: ['noImprint'],
      tactic: 'authority',
      info: {
        icon: '📋',
        title: bi('Was in einem echten Impressum stehen muss',
                  'What a genuine legal notice must contain'),
        body: [
          bi('Vollständiger Firmenname, ladungsfähige Anschrift (kein Postfach), Telefonnummer und E-Mail, Handelsregisternummer und Umsatzsteuer-ID. Fehlt eines davon, ist das ein Rechtsverstoß.',
             'Full company name, a serviceable address (not a PO box), phone number and email, company register number and VAT ID. Any one of them missing is a legal breach.'),
          bi('Die Adresse lässt sich in einer Karten-App prüfen: Steht dort ein Wohnhaus in einem anderen Land oder ein leeres Grundstück, ist die Sache klar.',
             'The address can be checked in a maps app: if it shows a residential building in another country or an empty plot, the matter is settled.'),
        ],
      },
      prompt: bi('Kopierte AGB mit fremdem Firmennamen, kein Impressum.',
                 'Copied terms with somebody else’s company name, no legal notice.'),
      choices: [
        { text: bi('Tab schließen, Anzeige melden',
                   'Close the tab, report the advert'),
          next: 'end_avoided', risk: -2, verdict: 'good', catches: ['noImprint', 'newAccount'],
          why: bi('Wer die eigenen AGB nicht selbst schreibt, will nicht gefunden werden.',
                  'Anyone who cannot write their own terms does not want to be found.') },
        { text: bi('Egal, ich probier es', 'Whatever, I will risk it'),
          next: 'n5_checkout', risk: 2, verdict: 'bad',
          why: bi('Ohne Impressum gibt es hinterher niemanden, an den du dich wenden kannst. Genau dafür fehlt es.',
                  'With no legal notice there is nobody to turn to afterwards. That is exactly why it is missing.') },
      ],
    },

    /* ============ Kapitel 3: Die Kasse ============ */

    n5_checkout: {
      chapter: bi('Kapitel 3 — Die Kasse', 'Chapter 3 — The checkout'),
      messages: [
        { kind: 'system', text: bi(
          'An der Kasse: PayPal und Kreditkarte sind ausgegraut — „wegen technischer Wartung vorübergehend nicht verfügbar". Bleibt: Vorkasse per Überweisung.',
          'At the checkout: PayPal and card are greyed out — “temporarily unavailable due to maintenance”. That leaves: bank transfer up front.') },
      ],
      flags: ['prepay'],
      tactic: 'distraction',
      info: {
        icon: '🛡️',
        title: bi('Welche Zahlart dich schützt — und welche nicht',
                  'Which payment method protects you — and which does not'),
        body: [
          bi('Geschützt: PayPal als „Waren und Dienstleistungen", Kreditkarte (Rückbuchung möglich), Lastschrift (acht Wochen widerrufbar), Kauf auf Rechnung.',
             'Protected: PayPal “goods and services”, credit card (chargeback possible), direct debit (reversible for eight weeks), payment on invoice.'),
          bi('Nicht geschützt: Überweisung, PayPal „Freunde und Familie", Guthabenkarten, Krypto. Bei allen vieren ist das Geld nach dem Absenden endgültig weg.',
             'Not protected: bank transfer, PayPal “friends and family”, gift cards, crypto. With all four the money is final the moment you send it.'),
          bi('Wenn ein Shop dich in eine ungeschützte Zahlart drängt, ist das keine Panne. Es ist der Zweck.',
             'When a shop pushes you towards an unprotected method, that is not a glitch. It is the purpose.'),
        ],
      },
      prompt: bi('Nur Überweisung. Genau die Zahlart ohne Käuferschutz.',
                 'Bank transfer only. The one payment method with no buyer protection.'),
      choices: [
        { text: bi('Abbrechen. Ohne Käuferschutz kaufe ich nicht',
                   'Cancel. I do not buy without buyer protection'),
          next: 'end_avoided', risk: -2, verdict: 'good', catches: ['prepay', 'noImprint'],
          why: bi('Der wichtigste Reflex beim Online-Kauf: geschützte Zahlart oder gar kein Kauf.',
                  'The single most useful reflex when shopping online: a protected payment method, or no purchase.') },
        { text: bi('Nachfragen, wann PayPal wieder geht',
                   'Ask when PayPal will work again'),
          next: 'n5_ask', risk: 0, verdict: 'good', catches: ['prepay'],
          why: bi('Eine faire Frage, auf die ein echter Shop eine Antwort hätte.',
                  'A fair question that a genuine shop would have an answer to.') },
        { text: bi('39 € überweisen — das Risiko ist überschaubar',
                   'Transfer the €39 — the risk is manageable'),
          next: 'n6_waiting', risk: 3, verdict: 'bad',
          why: bi('Der Geldverlust ist überschaubar. Das Problem sind deine Daten und die Nachfolge-Maschen, die darauf aufbauen.',
                  'The financial loss is manageable. Your data and the follow-up cons built on it are not.') },
      ],
    },

    n5_ask: {
      messages: [
        { from: 'them', time: '20:39', text: bi(
          'Hallo! Leider dauert die Wartung noch bis nächste Woche. Wenn Sie heute per Überweisung zahlen, legen wir Ihnen ein Paar Socken gratis dazu 😊 Das Angebot gilt aber nur bis Mitternacht.',
          'Hello! Unfortunately the maintenance runs until next week. If you pay by transfer today we will add a free pair of socks 😊 But the offer only stands until midnight.') },
      ],
      flags: ['prepay', 'pressure'],
      tactic: 'reciprocity',
      prompt: bi('Statt einer Antwort kommt ein Geschenk und eine neue Frist.',
                 'Instead of an answer you get a gift and a fresh deadline.'),
      choices: [
        { text: bi('Abbrechen. Das war keine Antwort',
                   'Cancel. That was not an answer'),
          next: 'end_avoided', risk: -2, verdict: 'good', catches: ['prepay', 'pressure'],
          why: bi('Auf eine sachliche Frage kommt ein Anreiz plus Zeitdruck. Das ist keine Kundenbetreuung, das ist Verkaufsdruck.',
                  'A factual question is answered with an incentive plus time pressure. That is not customer service, that is sales pressure.') },
        { text: bi('Gratis-Socken klingen fair — überweisen',
                   'Free socks sound fair — transfer the money'),
          next: 'n6_waiting', risk: 3, verdict: 'bad',
          why: bi('Ein kleines Geschenk erzeugt das Gefühl, etwas schuldig zu sein. Es kostet die andere Seite nichts, weil es die Socken nie geben wird.',
                  'A small gift creates a sense of obligation. It costs the other side nothing, because the socks will never exist.') },
      ],
    },

    /* ============ Kapitel 4: Das Warten ============ */

    n6_waiting: {
      chapter: bi('Kapitel 4 — Das Warten', 'Chapter 4 — The wait'),
      messages: [
        { kind: 'system', text: bi(
          'Bestätigungsmail kommt sofort. „Sendungsnummer folgt in Kürze."',
          'The confirmation email arrives instantly. “Tracking number to follow shortly.”') },
        { kind: 'system', text: bi(
          'Nach fünf Tagen: nichts. Nach zwei Wochen: das Kontaktformular antwortet nicht, der Instagram-Account ist gelöscht, der Shop zeigt „Wartungsarbeiten".',
          'After five days: nothing. After two weeks: the contact form goes unanswered, the Instagram account is deleted, the shop shows “under maintenance”.') },
      ],
      tactic: 'shame',
      prompt: bi('Zwei Wochen, keine Ware, kein Kontakt.',
                 'Two weeks, no goods, no contact.'),
      choices: [
        { text: bi('Bank anrufen und Anzeige erstatten',
                   'Call the bank and file a police report'),
          next: 'n7_after', risk: 0, verdict: 'good',
          why: bi('Richtig, auch wenn das Geld meist weg bleibt. Die Anzeige hilft, das Empfängerkonto stillzulegen — für alle nach dir.',
                  'Correct, even though the money is usually gone. The report helps get the receiving account shut down — for everyone after you.') },
        { text: bi('Peinlich. Einfach abhaken und nichts sagen',
                   'Embarrassing. Write it off and say nothing'),
          next: 'end_silent', risk: 2, verdict: 'bad',
          why: bi('Verständlich, aber genau darauf ist die Masche gebaut: Bei 39 € meldet fast niemand — deshalb läuft der Shop unter neuem Namen einfach weiter.',
                  'Understandable, but that is exactly what the con is built on: at €39 almost nobody reports it — so the shop simply reopens under a new name.') },
      ],
    },

    n7_after: {
      messages: [
        { kind: 'system', text: bi(
          'Die Bank kann nichts zurückholen — Überweisungen sind endgültig. Die Anzeige wird aufgenommen.',
          'The bank cannot recover anything — transfers are final. The report is filed.') },
        { kind: 'system', text: bi(
          'Drei Wochen später eine E-Mail: „Ihr Paket hängt im Zoll fest. Zur Freigabe bitte 4,90 € zahlen." Absender: eine Adresse, die dem Shop ähnelt.',
          'Three weeks later an email: “Your parcel is held at customs. Please pay €4.90 to release it.” Sender: an address resembling the shop’s.') },
      ],
      flags: ['reshipFee'],
      tactic: 'sunkCost',
      info: {
        icon: '🕳️',
        title: bi('Die zweite Masche zielt auf die Hoffnung',
                  'The second con targets your hope'),
        body: [
          bi('Wer Geld verloren hat, will es zurück. Genau darauf setzt die Nachfolge-Masche: eine kleine Zahlung, die angeblich das große Problem löst.',
             'Anyone who has lost money wants it back. That is what the follow-up con relies on: a small payment that supposedly solves the big problem.'),
          bi('Diesmal geht es nicht um die 4,90 €, sondern um die Kartendaten im Formular. Das Paket hat nie existiert — es kann also auch nicht im Zoll hängen.',
             'This time it is not about the €4.90 but about the card details on the form. The parcel never existed, so it cannot be stuck at customs.'),
        ],
      },
      prompt: bi('Ein Paket, das es nie gab, hängt angeblich im Zoll.',
                 'A parcel that never existed is supposedly held at customs.'),
      choices: [
        { text: bi('Löschen. Das Paket hat nie existiert',
                   'Delete it. The parcel never existed'),
          next: 'end_lost', risk: -1, verdict: 'good', catches: ['reshipFee'],
          why: bi('Klar erkannt. Aus einem 39-€-Verlust wird so kein 600-€-Verlust.',
                  'Correctly spotted. That is how a €39 loss avoids becoming a €600 one.') },
        { text: bi('4,90 € zahlen, vielleicht kommt es ja doch',
                   'Pay the €4.90, maybe it will turn up after all'),
          next: 'end_double', risk: 3, verdict: 'bad',
          why: bi('Die Hoffnung, den Verlust auszugleichen, ist genau der Hebel. Jetzt sind auch die Kartendaten weg.',
                  'The hope of undoing the loss is exactly the lever. Now the card details are gone too.') },
      ],
    },

    /* ============ Ausgänge ============ */

    end_avoided: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'Du kaufst nicht. Vier Wochen später ist der Shop offline, der Account gelöscht. Deine Sneaker kaufst du im Sommer im Schlussverkauf für 119 €.',
          'You do not buy. Four weeks later the shop is offline and the account deleted. You get your trainers in the summer sale for €119.') },
      ],
      damage: bi('0 € — Shop rechtzeitig durchschaut', '€0 — you saw through the shop in time'),
      lessons: [
        bi('Preis zu gut, Profil zu neu, Impressum fehlt, nur Vorkasse: vier Signale, von denen zwei schon reichen.',
           'Price too good, profile too new, no legal notice, prepayment only: four signals, of which two are already enough.'),
        bi('Immer mit Käuferschutz zahlen — PayPal-Warenkorb, Kreditkarte oder auf Rechnung.',
           'Always pay with protection — PayPal goods and services, credit card, or on invoice.'),
        bi('Verdächtige Shops lassen sich bei der Verbraucherzentrale prüfen und melden.',
           'Suspicious shops can be checked and reported with consumer protection bodies.'),
      ],
    },

    end_warned: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'Du meldest die Anzeige und postest den Vergleich in deine Story. Zwei Leute schreiben, sie hätten fast bestellt.',
          'You report the advert and post the comparison to your story. Two people write back saying they had nearly ordered.') },
      ],
      damage: bi('0 € — und zwei andere gewarnt', '€0 — and two other people warned'),
      lessons: [
        bi('Die Rückwärts-Bildersuche entlarvt Fake-Shops in Sekunden.',
           'A reverse image search exposes fake shops within seconds.'),
        bi('Eine Warnung im Freundeskreis erreicht mehr Leute als jede Meldung an die Plattform.',
           'A warning to your friends reaches more people than any report to the platform.'),
      ],
    },

    end_lost: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi(
          'Die 39 € bleiben weg. Immerhin endet es hier: Du reagierst auf keine der weiteren Mails.',
          'The €39 stays gone. At least it ends here: you respond to none of the further emails.') },
      ],
      damage: bi('39 € weg — plus Name, Adresse und IBAN', '€39 gone — plus name, address and IBAN'),
      lessons: [
        bi('Bei Vorkasse gibt es keinen Käuferschutz. Das ist der ganze Grund, warum sie angeboten wird.',
           'Paying up front by transfer carries no buyer protection. That is the entire reason it is offered.'),
        bi('Der eigentliche Schaden sind die Daten: Name, Adresse und IBAN landen in der nächsten Masche.',
           'The real damage is the data: your name, address and IBAN feed the next con.'),
        bi('Auf keine Nachforderung reagieren. Ein Paket, das nie versandt wurde, kann nicht im Zoll hängen.',
           'Respond to no follow-up demand. A parcel that was never shipped cannot be stuck at customs.'),
      ],
      recover: [
        bi('Anzeige online bei der Polizei erstatten, mit Screenshots von Shop und Anzeige.',
           'File a police report online, with screenshots of the shop and the advert.'),
        bi('Der Bank den Empfänger melden — selten erfolgreich, aber wichtig, um das Konto zu sperren.',
           'Report the recipient to your bank — rarely successful, but important for getting the account frozen.'),
        bi('Kontoauszüge im Blick behalten und keine „Nachzahlungs"-Mails beantworten.',
           'Keep an eye on your statements and ignore any “outstanding payment” emails.'),
      ],
    },

    end_silent: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi(
          'Du sagst niemandem etwas. Zwei Monate später bestellt deine beste Freundin beim selben Shop unter neuem Namen.',
          'You tell nobody. Two months later your best friend orders from the same shop under its new name.') },
      ],
      damage: bi('39 € weg — und die Masche läuft weiter', '€39 gone — and the con carries on'),
      lessons: [
        bi('Kleine Beträge werden fast nie gemeldet. Genau deshalb funktioniert diese Masche im großen Stil.',
           'Small amounts are almost never reported. Which is exactly why this con works at scale.'),
        bi('Eine Anzeige dauert fünfzehn Minuten online und hilft allen nach dir.',
           'A police report takes fifteen minutes online and helps everyone who comes after you.'),
      ],
      recover: [
        bi('Die Anzeige lässt sich jederzeit nachholen.', 'You can still file the report at any time.'),
        bi('Im Freundeskreis Bescheid sagen. Das ist der wirksamste Schutz.',
           'Tell your friends. That is the most effective protection there is.'),
      ],
    },

    end_double: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi(
          'Für die 4,90 € gibst du deine Kartendaten ein. Fünf Tage später fehlen 612 €.',
          'You enter your card details for the €4.90. Five days later €612 is missing.') },
      ],
      flags: ['reshipFee'],
      damage: bi('39 € + 612 € = 651 €', '€39 + €612 = €651'),
      lessons: [
        bi('Nach dem ersten Betrug kommt fast immer ein zweiter — an dieselbe Person.',
           'A first scam is almost always followed by a second, aimed at the same person.'),
        bi('Die Hoffnung, einen Verlust auszugleichen, ist der stärkste Hebel überhaupt.',
           'The hope of undoing a loss is the strongest lever of all.'),
        bi('Für einen Kleinbetrag braucht niemand deine vollständigen Kartendaten.',
           'Nobody needs your full card details for a trivial amount.'),
      ],
      recover: [
        bi('Karte sofort sperren und allen Abbuchungen widersprechen.',
           'Freeze the card immediately and dispute every charge.'),
        bi('Anzeige erstatten und beide Vorfälle zusammen angeben.',
           'File a police report covering both incidents together.'),
        bi('Damit rechnen, weiter kontaktiert zu werden — und nicht mehr reagieren.',
           'Expect further contact — and stop responding to all of it.'),
      ],
    },
  },
};
