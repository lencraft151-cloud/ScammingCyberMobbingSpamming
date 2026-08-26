import { bi } from '../bi.js';

/** Story 3 — Fake-Shop über eine Instagram-Anzeige. */
export default {
  id: 'fakeshop',
  icon: '👟',
  channel: 'instagram',
  difficulty: 2,
  title: bi('Sneaker für 39 €', 'Trainers for €39'),
  teaser: bi(
    'Die Schuhe, die überall 180 € kosten. Hier nur heute für 39 €.',
    'The shoes that cost €180 everywhere else. Here, today only, €39.'),
  contact: {
    name: bi('@sneaker.outlet.de', '@sneaker.outlet.de'),
    sub: bi('Gesponsert · 2.140 Follower', 'Sponsored · 2,140 followers'),
  },

  redFlags: {
    tooCheap: {
      label: bi('Ein Preis, den es nicht geben kann',
                'A price that cannot exist'),
      why: bi('80 % unter Marktpreis ist kein Schnäppchen, sondern eine Ansage. Niemand verschenkt Ware.',
              '80 % below market price is not a bargain, it is a statement. Nobody gives stock away.'),
    },
    newAccount: {
      label: bi('Das Profil ist erst wenige Wochen alt',
                'The profile is only a few weeks old'),
      why: bi('Fake-Shops leben kurz. Sie werden aufgebaut, geleert und verschwinden, bevor die Anzeigen kommen.',
              'Fake shops live briefly. They are set up, drained, and gone before the complaints arrive.'),
    },
    prepay: {
      label: bi('Nur Vorkasse per Überweisung',
                'Bank transfer up front, nothing else'),
      why: bi('PayPal-Warenkorb und Kreditkarte holen dir dein Geld zurück. Eine Überweisung nicht. Deshalb fällt sie „gerade aus".',
              'PayPal goods-and-services and card payments can be reversed. A bank transfer cannot. That is why it is the only option “right now”.'),
    },
    noImprint: {
      label: bi('Kein Impressum, keine erreichbare Adresse',
                'No legal notice, no reachable address'),
      why: bi('In Deutschland ist ein Impressum Pflicht. Fehlt es, gibt es niemanden, den man belangen könnte — genau das ist der Zweck.',
              'A legal notice is mandatory in Germany. If it is missing there is nobody to hold responsible — which is the whole point.'),
    },
    fakeReviews: {
      label: bi('Lauter Fünf-Sterne-Kommentare vom selben Tag',
                'A wall of five-star comments, all from the same day'),
      why: bi('Echte Kundschaft schreibt über Monate verteilt und unterschiedlich. Gekaufte Kommentare kommen im Block.',
              'Real customers post over months and write differently. Bought comments arrive in a block.'),
    },
    pressure: {
      label: bi('Countdown und „nur noch 3 Stück"',
                'A countdown and “only 3 left”'),
      why: bi('Der Zähler steht auf jeder Seite und springt bei jedem Neuladen zurück. Er misst nichts.',
              'The counter is on every page and resets on reload. It measures nothing.'),
    },
  },

  start: 'n1',
  nodes: {

    n1: {
      messages: [
        { from: 'them', time: '20:14', image: bi('[Anzeige: Sneaker, gestrichener Preis 179 € → 39 €]',
                                                 '[Ad: trainers, price struck through 179 € → 39 €]'),
          text: bi('LAGERAUFLÖSUNG 🔥 Alle Modelle 39 € statt 179 €. Nur noch heute! Versand aus Deutschland.',
                   'CLEARANCE 🔥 All models €39 instead of €179. Today only! Ships from Germany.') },
      ],
      flags: ['tooCheap', 'pressure'],
      prompt: bi('Genau das Modell, das du seit Monaten willst.',
                 'Exactly the model you have wanted for months.'),
      choices: [
        { text: bi('Profil öffnen und genauer angucken',
                   'Open the profile and take a proper look'),
          next: 'n2_profile', risk: 0, verdict: 'good', catches: ['tooCheap'],
          why: bi('Erst prüfen, dann kaufen. Dreißig Sekunden, die alles entscheiden.',
                  'Check first, buy second. Thirty seconds that decide everything.') },
        { text: bi('Direkt in den Shop, bevor sie weg sind',
                   'Straight to the shop before they sell out'),
          next: 'n3_shop', risk: 2, verdict: 'bad',
          why: bi('Der Countdown hat genau das bewirkt, wofür er da ist.',
                  'The countdown did precisely the job it was built for.') },
        { text: bi('Das Modell zum Vergleich woanders suchen',
                   'Search for the model elsewhere to compare'),
          next: 'n2_compare', risk: -1, verdict: 'good', catches: ['tooCheap'],
          why: bi('Preisvergleich ist die einfachste Betrugsprüfung, die es gibt.',
                  'Comparing prices is the simplest fraud check there is.') },
      ],
    },

    n2_compare: {
      messages: [
        { kind: 'system', text: bi(
          'Überall 165 bis 185 €. Kein einziger seriöser Händler geht unter 150 €. Nirgendwo eine Lagerauflösung.',
          'Everywhere between €165 and €185. Not one reputable retailer goes below €150. No clearance sale anywhere.') },
      ],
      flags: ['tooCheap'],
      prompt: bi('Der Preis ist unmöglich. Und jetzt?', 'The price is impossible. So now what?'),
      choices: [
        { text: bi('Finger weg und den Account melden',
                   'Walk away and report the account'),
          next: 'end_avoided', risk: -2, verdict: 'good', catches: ['tooCheap', 'newAccount'],
          why: bi('Melden nimmt der Anzeige die Reichweite, bevor sie andere trifft.',
                  'Reporting cuts the ad’s reach before it hits somebody else.') },
        { text: bi('Trotzdem probieren — 39 € sind ja verkraftbar',
                   'Try anyway — €39 is survivable'),
          next: 'n3_shop', risk: 2, verdict: 'bad',
          why: bi('Es bleibt selten bei 39 €. Und die Bankdaten hat der Shop dann auch.',
                  'It rarely stays at €39. And the shop then has your bank details too.') },
      ],
    },

    n2_profile: {
      messages: [
        { kind: 'system', text: bi(
          'Profil seit drei Wochen. 2.140 Follower, aber nur elf Beiträge. Unter jedem Bild dieselben vier Kommentare: „Ware top, schnell geliefert 😍" — alle vom selben Tag.',
          'Profile three weeks old. 2,140 followers but only eleven posts. The same four comments under every picture: “Great product, fast delivery 😍” — all from the same day.') },
      ],
      flags: ['newAccount', 'fakeReviews'],
      prompt: bi('Das Bild wird deutlicher.', 'The picture is getting clearer.'),
      choices: [
        { text: bi('Reicht mir. Melden und weiterscrollen',
                   'Seen enough. Report it and scroll on'),
          next: 'end_avoided', risk: -2, verdict: 'good', catches: ['newAccount', 'fakeReviews', 'tooCheap'],
          why: bi('Drei unabhängige Warnsignale in einem Profil sind keine Zufälle mehr.',
                  'Three independent warning signs in one profile stop being coincidence.') },
        { text: bi('Zum Shop gehen und wenigstens gucken',
                   'Go to the shop and at least have a look'),
          next: 'n3_shop', risk: 1, verdict: 'meh',
          why: bi('Gucken ist harmlos — solange du beim Bezahlen wieder genauso kritisch bist.',
                  'Looking is harmless — as long as you stay just as critical at the checkout.') },
      ],
    },

    n3_shop: {
      messages: [
        { kind: 'system', text: bi(
          'Der Shop sieht ordentlich aus. Unten in der Fußzeile: kein Impressum, keine Telefonnummer, nur ein Kontaktformular. Ein roter Balken zählt: „Angebot endet in 08:41".',
          'The shop looks tidy. Down in the footer: no legal notice, no phone number, just a contact form. A red bar counts down: “Offer ends in 08:41”.') },
      ],
      flags: ['noImprint', 'pressure'],
      prompt: bi('Du legst die Sneaker in den Warenkorb.',
                 'You add the trainers to the basket.'),
      choices: [
        { text: bi('Fußzeile prüfen: Wer betreibt diesen Shop überhaupt?',
                   'Check the footer: who actually runs this shop?'),
          next: 'n4_imprint', risk: -1, verdict: 'good', catches: ['noImprint'],
          why: bi('Kein Impressum heißt: niemand haftet, niemand ist erreichbar.',
                  'No legal notice means nobody is liable and nobody is reachable.') },
        { text: bi('Weiter zur Kasse', 'Continue to checkout'),
          next: 'n4_checkout', risk: 2, verdict: 'meh',
          why: bi('An der Kasse zeigt sich, wie ernst es der Shop meint.',
                  'The checkout is where a shop shows how serious it is.') },
      ],
    },

    n4_imprint: {
      messages: [
        { kind: 'system', text: bi(
          'Die Seite „Impressum" ist leer. Die AGB sind aus einem anderen Shop kopiert — da steht noch ein fremder Firmenname drin.',
          'The “Legal notice” page is blank. The terms are copied from another shop — a different company name is still in the text.') },
      ],
      flags: ['noImprint'],
      prompt: bi('Kopierte AGB mit fremdem Firmennamen.',
                 'Copied terms with somebody else’s company name in them.'),
      choices: [
        { text: bi('Tab schließen, Anzeige melden',
                   'Close the tab, report the ad'),
          next: 'end_avoided', risk: -2, verdict: 'good', catches: ['noImprint', 'newAccount'],
          why: bi('Wer die eigenen AGB nicht selbst schreibt, will nicht gefunden werden.',
                  'Anyone who cannot write their own terms does not want to be found.') },
        { text: bi('Egal, ich probier es', 'Whatever, I will risk it'),
          next: 'n4_checkout', risk: 2, verdict: 'bad',
          why: bi('Ohne Impressum gibt es hinterher niemanden, an den du dich wenden kannst.',
                  'With no legal notice there is nobody to turn to afterwards.') },
      ],
    },

    n4_checkout: {
      messages: [
        { kind: 'system', text: bi(
          'An der Kasse: PayPal und Kreditkarte sind ausgegraut — „wegen technischer Wartung vorübergehend nicht verfügbar". Bleibt: Vorkasse per Überweisung.',
          'At the checkout: PayPal and card are greyed out — “temporarily unavailable due to maintenance”. That leaves: bank transfer up front.') },
      ],
      flags: ['prepay'],
      prompt: bi('Nur Überweisung. Genau die Zahlart ohne Käuferschutz.',
                 'Bank transfer only. The one payment method with no buyer protection.') ,
      choices: [
        { text: bi('Abbrechen. Ohne Käuferschutz kaufe ich nicht',
                   'Cancel. I do not buy without buyer protection'),
          next: 'end_avoided', risk: -2, verdict: 'good', catches: ['prepay', 'noImprint'],
          why: bi('Der wichtigste Reflex beim Online-Kauf: Zahlart mit Schutz oder gar nicht.',
                  'The single most useful reflex when shopping online: protected payment method, or no purchase.') },
        { text: bi('39 € überweisen — das Risiko ist überschaubar',
                   'Transfer the €39 — the risk is manageable'),
          next: 'n5_waiting', risk: 3, verdict: 'bad',
          why: bi('Der Verlust ist überschaubar. Das Problem sind die Daten und die Nachfolge-Maschen.',
                  'The loss is manageable. The data and the follow-up cons are not.') },
      ],
    },

    n5_waiting: {
      messages: [
        { kind: 'system', text: bi('Bestätigungsmail kommt sofort. Sendungsnummer „folgt in Kürze".',
                                   'The confirmation email arrives instantly. A tracking number “to follow shortly”.') },
        { kind: 'system', text: bi('Nach zwei Wochen: kein Paket. Das Kontaktformular antwortet nicht. Der Instagram-Account ist gelöscht.',
                                   'Two weeks later: no parcel. The contact form goes unanswered. The Instagram account is gone.') },
      ],
      prompt: bi('Zwei Wochen, keine Ware, kein Kontakt.',
                 'Two weeks, no goods, no contact.'),
      choices: [
        { text: bi('Bank anrufen und Anzeige erstatten',
                   'Call the bank and file a police report'),
          next: 'end_lost', risk: 0, verdict: 'good',
          why: bi('Richtig, auch wenn das Geld meist weg bleibt. Die Anzeige hilft, den Shop stillzulegen.',
                  'Correct, even though the money is usually gone. The report helps get the shop shut down.') },
        { text: bi('Auf die Mail „Ihr Paket hängt im Zoll — 4,90 € nachzahlen" reagieren',
                   'Respond to the email “your parcel is held at customs — pay €4.90”'),
          next: 'end_double', risk: 3, verdict: 'bad',
          why: bi('Zweite Masche auf dieselbe Person. Wer einmal gezahlt hat, steht auf einer Liste.',
                  'A second con on the same person. Anyone who paid once ends up on a list.') },
      ],
    },

    /* ---------- Enden ---------- */

    end_avoided: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi('Du kaufst nicht. Vier Wochen später ist der Shop offline und der Account gelöscht.',
                                   'You do not buy. Four weeks later the shop is offline and the account deleted.') },
      ],
      damage: bi('0 € — Shop rechtzeitig durchschaut', '€0 — you saw through the shop in time'),
      lessons: [
        bi('Preis zu gut, Profil zu neu, Impressum fehlt: drei Signale reichen völlig.',
           'Price too good, profile too new, no legal notice: three signals are plenty.'),
        bi('Immer mit Käuferschutz zahlen — PayPal-Warenkorb, Kreditkarte oder Rechnung.',
           'Always pay with protection — PayPal goods and services, credit card, or on invoice.'),
        bi('Fake-Shops lassen sich bei der Verbraucherzentrale prüfen und melden.',
           'Suspected fake shops can be checked and reported with consumer protection bodies.'),
      ],
    },

    end_lost: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi('Die Bank kann nichts zurückholen — Überweisungen sind endgültig. Die Anzeige läuft ins Leere, der Kontoinhaber ist ein Strohmann.',
                                   'The bank cannot recover anything — transfers are final. The report goes nowhere, the account holder is a front.') },
      ],
      damage: bi('39 € weg — plus deine Adress- und Kontodaten', '€39 gone — plus your address and bank details'),
      lessons: [
        bi('Bei Vorkasse gibt es keinen Käuferschutz. Das ist der ganze Grund, warum sie angeboten wird.',
           'Paying up front by transfer carries no buyer protection. That is the entire reason it is offered.'),
        bi('Der eigentliche Schaden sind die Daten: Name, Adresse, IBAN landen in der nächsten Masche.',
           'The real damage is the data: your name, address and IBAN feed the next con.'),
      ],
      recover: [
        bi('Bank informieren und den Empfänger melden — selten erfolgreich, aber wichtig für die Statistik.',
           'Tell your bank and report the recipient — rarely successful, but it matters for the record.'),
        bi('Anzeige online bei der Polizei erstatten, mit Screenshots des Shops.',
           'File a police report online, with screenshots of the shop.'),
        bi('Kontoauszüge im Blick behalten und keine „Nachzahlungs"-Mails beantworten.',
           'Keep an eye on your statements and ignore any “outstanding payment” emails.'),
      ],
    },

    end_double: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi('Für die 4,90 € gibst du deine Kartendaten ein. Drei Tage später fehlen 612 €.',
                                   'You enter your card details for the €4.90. Three days later €612 is missing.') },
      ],
      damage: bi('39 € + 612 € = 651 €', '€39 + €612 = €651'),
      lessons: [
        bi('Nach dem ersten Betrug kommt fast immer ein zweiter — an dieselbe Person.',
           'A first scam is almost always followed by a second, aimed at the same person.'),
        bi('Eine „Zollgebühr" für ein Paket, das es nie gab, kann es nicht geben.',
           'There cannot be a customs fee on a parcel that never existed.'),
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
