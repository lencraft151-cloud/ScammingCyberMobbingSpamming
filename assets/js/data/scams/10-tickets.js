import { bi } from '../bi.js';

/** Story 10 — Ticket-Betrug: die Karte für ein ausverkauftes Konzert. */
export default {
  id: 'tickets',
  icon: '🎫',
  channel: 'instagram',
  difficulty: 2,
  title: bi('Die Karte für ausverkauft', 'A Ticket for a Sold-Out Show'),
  teaser: bi(
    'Alle deine Freundinnen fahren hin. Du bist beim Vorverkauf leer ausgegangen.',
    'All your friends are going. You came away empty-handed in the presale.'),
  contact: {
    name: bi('@lea_mrsch', '@lea_mrsch'),
    sub: bi('Fangruppe · folgt dir nicht', 'Fan group · does not follow you'),
  },

  redFlags: {
    friendsFamily: {
      label: bi('Zahlung als „Freunde und Familie"',
                'Payment sent as “friends and family”'),
      why: bi('Diese Option ist für Geldgeschenke gedacht und hat deshalb keinen Käuferschutz. Wer sie für einen Verkauf verlangt, verlangt genau die Zahlart, bei der du dein Geld nicht zurückholen kannst.',
              'That option is meant for gifts between people who know each other, so it carries no buyer protection. Anyone requesting it for a sale is requesting precisely the method you cannot claw money back from.'),
    },
    newProfile: {
      label: bi('Das Profil ist frisch und leer',
                'The profile is new and empty'),
      why: bi('Angelegt vor elf Tagen, vier Beiträge, alle vom selben Tag. Betrugsprofile für Konzerte werden pro Tour neu angelegt und danach gelöscht.',
              'Created eleven days ago, four posts, all from the same day. Ticket scam profiles are set up fresh for each tour and deleted afterwards.'),
    },
    screenshotTicket: {
      label: bi('Ein Screenshot ist kein Ticket',
                'A screenshot is not a ticket'),
      why: bi('Ein Foto oder PDF eines Barcodes lässt sich beliebig oft weiterschicken. Am Einlass zählt nur, wer zuerst gescannt wird — alle danach stehen draußen.',
              'A photo or PDF of a barcode can be forwarded any number of times. At the door only the first scan counts — everybody after that is left outside.'),
    },
    personalised: {
      label: bi('Personalisierte Tickets sind nicht einfach übertragbar',
                'Personalised tickets are not simply transferable'),
      why: bi('Steht ein fremder Name auf dem Ticket, brauchst du bei vielen Veranstaltern eine offizielle Umschreibung. Ohne sie kommst du auch mit einem echten Ticket nicht hinein.',
              'If somebody else’s name is on the ticket, many promoters require an official transfer. Without it even a genuine ticket will not get you in.'),
    },
    noOfficial: {
      label: bi('Der offizielle Zweitmarkt wird umgangen',
                'The official resale channel is being avoided'),
      why: bi('Fast jeder große Veranstalter hat eine eigene Weiterverkaufsseite mit garantierter Gültigkeit. Wer daran vorbei verkaufen will, hat einen Grund dafür.',
              'Almost every major promoter runs its own resale page with guaranteed validity. Anyone wanting to sell around it has a reason.'),
    },
    otherBuyers: {
      label: bi('„Es wollen noch drei andere"',
                '“Three other people want them”'),
      why: bi('Der klassische Zeitdruck. Ob es die drei anderen gibt, kannst du nicht prüfen — und genau deshalb werden sie erwähnt.',
              'The classic time pressure. Whether those three people exist is unverifiable — which is exactly why they get mentioned.'),
    },
    faceValue: {
      label: bi('Verkauf zum Originalpreis wirkt selbstlos',
                'Selling at face value seems selfless'),
      why: bi('Kein Aufschlag zu verlangen entwaffnet das Misstrauen: Wer nichts verdienen will, wirkt ehrlich. Für die Täter ist der Originalpreis trotzdem reiner Gewinn — sie haben nie ein Ticket gekauft.',
              'Charging no mark-up disarms suspicion: somebody who is not profiting seems honest. For the offender face value is pure profit anyway — they never bought a ticket.'),
    },
    tooManyBuyers: {
      label: bi('Dasselbe Ticket wird mehrfach verkauft',
                'The same ticket gets sold several times over'),
      why: bi('Ein einziger echter Barcode kann an zehn Leute gehen. Der Schaden vervielfacht sich, ohne dass die Täter mehr Aufwand hätten.',
              'A single genuine barcode can go to ten people. The damage multiplies with no extra effort for the offenders.'),
    },
  },

  start: 'n1',
  nodes: {

    /* ============ Kapitel 1: Die Anzeige ============ */

    n1: {
      chapter: bi('Kapitel 1 — Die Anzeige', 'Chapter 1 — The listing'),
      messages: [
        { kind: 'system', text: bi(
          'Der Vorverkauf war in elf Minuten vorbei. Deine drei besten Freundinnen haben Karten, du nicht. Das Konzert ist in zwei Wochen.',
          'The presale sold out in eleven minutes. Your three closest friends have tickets, you do not. The concert is in two weeks.') },
        { kind: 'system', text: bi(
          'In der Fangruppe postet ein Account: „Muss leider 2 Karten abgeben (Innenraum), Originalpreis 89 € pro Stück. Kein Aufschlag, will nur nicht drauf sitzen bleiben."',
          'In the fan group an account posts: “Sadly have to let 2 tickets go (standing), face value €89 each. No mark-up, I just do not want them going to waste.”') },
        { from: 'them', time: '19:42', text: bi(
          'hey! hab deinen kommentar gesehen — die 2 karten sind noch da. willst du sie?',
          'hey! saw your comment — the 2 tickets are still available. do you want them?') },
      ],
      flags: ['faceValue', 'newProfile'],
      tactic: 'greed',
      info: {
        icon: '🎟️',
        title: bi('Warum Konzerttickets so beliebt bei Betrügern sind',
                  'Why concert tickets are such a favourite'),
        body: [
          bi('Es gibt eine feste Frist, eine begrenzte Menge und viele Menschen, die unbedingt hinwollen. Diese drei Dinge zusammen erzeugen Eile ganz von allein — die Täter müssen keinen Druck erfinden.',
             'There is a fixed date, a limited quantity and a lot of people who desperately want to go. Those three things generate urgency by themselves — the offenders do not have to invent any pressure.'),
          bi('Dazu kommt: Ob das Ticket echt war, merkst du erst am Einlass. Bis dahin sind Wochen vergangen und das Profil ist längst gelöscht.',
             'On top of that: you only find out whether the ticket was real at the door. By then weeks have passed and the profile is long gone.'),
        ],
      },
      prompt: bi('Zum Originalpreis, ohne Aufschlag. Das klingt fair.',
                 'At face value, no mark-up. That sounds fair.'),
      choices: [
        { text: bi('Profil ansehen: Wie alt, wie viele Beiträge?',
                   'Check the profile: how old, how many posts?'),
          next: 'n2_profile', risk: 0, verdict: 'good', catches: ['newProfile'],
          why: bi('Dreißig Sekunden, die den Rest der Geschichte entscheiden. Ein Profil kann man nicht so schnell altern lassen wie ein Foto.',
                  'Thirty seconds that decide the rest of this story. You cannot age a profile as fast as you can fake a photo.') },
        { text: bi('Fragen, ob es über den offiziellen Zweitmarkt geht',
                   'Ask whether it can go through the official resale'),
          next: 'n2_official', risk: -1, verdict: 'good', catches: ['noOfficial'],
          why: bi('Die eine Frage, die diese ganze Masche beendet. Ehrliche Verkäufer sagen sofort ja.',
                  'The one question that ends this entire con. Honest sellers say yes immediately.') },
        { text: bi('„Ja, gerne! Wie machen wir das?"',
                   '“Yes please! How do we do this?”'),
          next: 'n3_payment', risk: 2, verdict: 'bad',
          why: bi('Zusagen, bevor du weißt, wer da schreibt und wie bezahlt wird. Ab hier bestimmt die andere Seite den Ablauf.',
                  'Agreeing before you know who is writing or how payment works. From here the other side sets the process.') },
      ],
    },

    n2_profile: {
      messages: [
        { kind: 'system', text: bi(
          'Profil seit elf Tagen. Vier Beiträge, alle vom selben Tag. 38 Follower, davon 30 mit Zahlen im Namen. In der Fangruppe seit einer Woche.',
          'Profile eleven days old. Four posts, all from the same day. 38 followers, 30 of them with digits in their names. In the fan group for one week.') },
      ],
      flags: ['newProfile'],
      tactic: 'socialProof',
      info: {
        icon: '📅',
        title: bi('Ein Profilalter lässt sich nicht fälschen',
                  'A profile’s age cannot be faked'),
        body: [
          bi('Fotos, Namen und Followerzahlen sind in Minuten beschafft. Ein Konto, das seit Jahren echte Beiträge, echte Kommentare und echte Freunde hat, nicht.',
             'Photos, names and follower counts are obtained in minutes. An account with years of real posts, real comments and real friends is not.'),
          bi('Bei Ticketverkäufen gilt: gemeinsame Bekannte, ein gewachsenes Profil und die Bereitschaft, offiziell umzuschreiben. Fehlt alles drei, ist es keine Gelegenheit, sondern eine Falle.',
             'For ticket sales the test is: mutual acquaintances, an established profile, and willingness to transfer officially. If all three are missing it is not an opportunity, it is a trap.'),
        ],
      },
      prompt: bi('Elf Tage alt, 30 Zahlen-Follower.', 'Eleven days old, 30 followers with digits in their names.'),
      choices: [
        { text: bi('Absagen und in der Gruppe warnen',
                   'Decline and warn the group'),
          next: 'end_warned', risk: -2, verdict: 'good', catches: ['newProfile', 'faceValue'],
          why: bi('In Fangruppen sind immer mehrere im Visier. Eine Warnung erreicht sie alle auf einmal.',
                  'In fan groups several people are always being targeted at once. A warning reaches all of them at the same time.') },
        { text: bi('Nach dem offiziellen Zweitmarkt fragen',
                   'Ask about the official resale'),
          next: 'n2_official', risk: -1, verdict: 'good', catches: ['noOfficial'],
          why: bi('Auch mit Zweifeln am Profil: Über den offiziellen Weg wäre selbst ein echter Verkauf sicher.',
                  'Even with doubts about the profile: through the official route even a genuine sale would be safe.') },
        { text: bi('Egal, ich will unbedingt hin',
                   'Never mind, I really want to go'),
          next: 'n3_payment', risk: 3, verdict: 'bad',
          why: bi('„Ich will unbedingt" ist genau die Haltung, auf die diese Anzeige gewartet hat.',
                  '“I really want to” is exactly the state of mind this listing was waiting for.') },
      ],
    },

    n2_official: {
      messages: [
        { from: 'them', time: '19:51', text: bi(
          'ne das dauert bei denen ewig und die nehmen gebühren 🙄 ich schick dir einfach die pdfs, ist viel schneller. hab die als screenshot',
          'nah that takes forever with them and they charge fees 🙄 I will just send you the pdfs, much quicker. I have them as a screenshot') },
      ],
      flags: ['noOfficial', 'screenshotTicket'],
      tactic: 'distraction',
      info: {
        icon: '🔁',
        title: bi('Der offizielle Zweitmarkt ist die ganze Antwort',
                  'The official resale answers the whole question'),
        body: [
          bi('Bei einem offiziellen Weiterverkauf wird das alte Ticket entwertet und ein neues auf deinen Namen ausgestellt. Damit ist ausgeschlossen, dass dasselbe Ticket noch jemand anderem gehört.',
             'In an official resale the old ticket is cancelled and a new one issued in your name. That makes it impossible for the same ticket to belong to somebody else as well.'),
          bi('Gebühren und Wartezeit sind reale Nachteile — und trotzdem der Preis dafür, dass du am Einlass tatsächlich hineinkommst. Wer sie als Grund gegen den offiziellen Weg anführt, verkauft dir Risiko als Bequemlichkeit.',
             'Fees and waiting are real drawbacks — and still the price of actually getting through the door. Anyone citing them as a reason against the official route is selling you risk dressed up as convenience.'),
        ],
      },
      prompt: bi('Kein offizieller Weg. Dafür Screenshots.',
                 'No official route. Screenshots instead.'),
      choices: [
        { text: bi('Absagen. Ohne offizielle Umschreibung kaufe ich nicht',
                   'Decline. No official transfer, no purchase'),
          next: 'end_declined', risk: -2, verdict: 'good', catches: ['noOfficial', 'screenshotTicket'],
          why: bi('Die stärkste Regel beim Ticketkauf: entweder offiziell umgeschrieben oder gar nicht.',
                  'The strongest rule when buying tickets: officially transferred, or not at all.') },
        { text: bi('Nach einem Treffen und Bargeld fragen',
                   'Ask to meet in person and pay cash'),
          next: 'n2_meet', risk: -1, verdict: 'good', catches: ['screenshotTicket'],
          why: bi('Bei physischen Tickets eine gute Lösung. Der Vorschlag zeigt außerdem sofort, ob es die Person überhaupt gibt.',
                  'A good solution for physical tickets. The suggestion also reveals instantly whether the person even exists.') },
        { text: bi('Screenshots akzeptieren, Hauptsache ich komme rein',
                   'Accept the screenshots, as long as I get in'),
          next: 'n3_payment', risk: 3, verdict: 'bad',
          why: bi('Ein Screenshot beweist nur, dass jemand ein Ticket fotografiert hat. Nicht, dass es dir gehört.',
                  'A screenshot only proves somebody photographed a ticket. Not that it belongs to you.') },
      ],
    },

    n2_meet: {
      messages: [
        { from: 'them', time: '20:04', text: bi(
          'geht leider nicht, ich bin bis nächste woche bei meiner oma in österreich. deshalb verkauf ich die ja auch 😅',
          'sorry that will not work, I am at my grandma’s in austria until next week. that is why I am selling them 😅') },
      ],
      flags: ['noOfficial', 'otherBuyers'],
      tactic: 'familiarity',
      prompt: bi('Kein Treffen möglich, aus einem plausiblen Grund.',
                 'No meeting possible, for a plausible reason.'),
      choices: [
        { text: bi('Dann eben nicht. Absagen',
                   'Then no deal. Decline'),
          next: 'end_declined', risk: -2, verdict: 'good', catches: ['noOfficial', 'screenshotTicket'],
          why: bi('Kein Treffen, kein offizieller Weg, nur Screenshots: Drei Ausschlüsse hintereinander sind kein Zufall.',
                  'No meeting, no official route, only screenshots: three exclusions in a row is not coincidence.') },
        { text: bi('Vorschlagen, erst nach dem Einlass zu bezahlen',
                   'Suggest paying only after you are through the door'),
          next: 'n2_after', risk: -1, verdict: 'good', catches: ['screenshotTicket'],
          why: bi('Clever: Wer echte Tickets hat, verliert dabei nichts. Wer keine hat, lehnt sofort ab.',
                  'Clever: anybody with real tickets loses nothing by it. Anybody without them refuses at once.') },
        { text: bi('Okay, dann per Überweisung', 'Fine, bank transfer then'),
          next: 'n3_payment', risk: 3, verdict: 'bad',
          why: bi('Der Grund war vorbereitet. Bei dieser Masche gibt es für jede Prüfung eine passende Ausrede.',
                  'The reason was prepared. In this con there is a ready-made excuse for every check.') },
      ],
    },

    n2_after: {
      messages: [
        { from: 'them', time: '20:11', text: bi(
          'sorry aber so mach ich das nicht, dann bin ich ja die dumme. es wollen eh noch drei andere, ich geb sie denen',
          'sorry but I am not doing it that way, then I am the one at risk. three other people want them anyway, I will give them to them') },
      ],
      flags: ['otherBuyers'],
      tactic: 'urgency',
      prompt: bi('Sofortiger Rückzug, plus drei angebliche andere Interessenten.',
                 'An immediate walk-away, plus three supposed other buyers.'),
      choices: [
        { text: bi('Gehen lassen und in der Gruppe warnen',
                   'Let it go and warn the group'),
          next: 'end_warned', risk: -2, verdict: 'good', catches: ['otherBuyers', 'noOfficial', 'newProfile'],
          why: bi('Wer bei einem fairen Vorschlag sofort abspringt, hatte nie etwas zu verkaufen.',
                  'Anyone who bails the moment you make a fair suggestion never had anything to sell.') },
        { text: bi('Einlenken, du willst die Karten nicht verlieren',
                   'Back down, you do not want to lose the tickets'),
          next: 'n3_payment', risk: 3, verdict: 'bad',
          why: bi('Genau darauf war der Rückzug berechnet. Er kostet die Gegenseite nichts und wirkt fast immer.',
                  'That walk-away was calculated for exactly this. It costs the other side nothing and works almost every time.') },
      ],
    },

    /* ============ Kapitel 2: Die Zahlung ============ */

    n3_payment: {
      chapter: bi('Kapitel 2 — Die Zahlung', 'Chapter 2 — The payment'),
      messages: [
        { from: 'them', time: '20:20', text: bi(
          'super! 178 € für beide. bitte über paypal als „freunde und familie", sonst gehen mir 8 € gebühren ab und ich verkauf ja zum originalpreis',
          'great! €178 for both. please send it via paypal as “friends and family”, otherwise I lose €8 in fees and I am selling at face value') },
        { from: 'them', time: '20:21', text: bi('sobald das da ist schick ich dir die pdfs 👍',
                                                'as soon as that lands I will send you the pdfs 👍') },
      ],
      flags: ['friendsFamily'],
      tactic: 'reciprocity',
      info: {
        icon: '🛡️',
        title: bi('Der Unterschied zwischen den beiden PayPal-Optionen',
                  'The difference between the two PayPal options'),
        body: [
          bi('„Waren und Dienstleistungen" kostet den Verkäufer eine kleine Gebühr und gibt dir Käuferschutz: Kommt nichts an, bekommst du dein Geld zurück.',
             '“Goods and services” costs the seller a small fee and gives you buyer protection: if nothing arrives, you get your money back.'),
          bi('„Freunde und Familie" ist für Geldgeschenke gedacht, ist gebührenfrei und hat keinerlei Schutz. Eine gesendete Zahlung dieser Art ist endgültig.',
             '“Friends and family” is meant for gifts, is free of charge, and carries no protection at all. Once sent, a payment of that kind is final.'),
          bi('Die Begründung mit den Gebühren ist deshalb die Masche selbst: Du sollst acht Euro sparen und dafür 178 € ungesichert verschicken.',
             'So the argument about fees is the con itself: you are asked to save eight euros by sending €178 with no protection.'),
        ],
      },
      prompt: bi('178 € als „Freunde und Familie", um 8 € Gebühren zu sparen.',
                 '€178 as “friends and family”, to save €8 in fees.'),
      choices: [
        { text: bi('„Nur als Warenkorb. Die 8 € übernehme ich."',
                   '“Goods and services only. I will cover the €8.”'),
          next: 'n3_refuse', risk: -1, verdict: 'good', catches: ['friendsFamily'],
          why: bi('Der perfekte Zug: Du nimmst der Ausrede die Grundlage. Jetzt gibt es keinen Grund mehr — außer dem echten.',
                  'The perfect move: you remove the basis of the excuse. Now there is no reason left — except the real one.') },
        { text: bi('Absagen. Ohne Käuferschutz zahle ich nicht',
                   'Decline. I do not pay without buyer protection'),
          next: 'end_declined', risk: -2, verdict: 'good', catches: ['friendsFamily', 'noOfficial'],
          why: bi('Kurz und richtig. „Freunde und Familie" für einen Verkauf zu verlangen ist für sich genommen schon der Beweis.',
                  'Short and correct. Requesting “friends and family” for a sale is proof in itself.') },
        { text: bi('Als Freunde und Familie senden',
                   'Send it as friends and family'),
          next: 'n4_wait', risk: 3, verdict: 'bad',
          why: bi('Damit ist das Geld endgültig weg, egal was danach passiert. Diese Zahlart lässt sich nicht zurückholen.',
                  'The money is now final, whatever happens next. That payment type cannot be reversed.') },
      ],
    },

    n3_refuse: {
      messages: [
        { from: 'them', time: '20:26', text: bi(
          'boah jetzt mach doch nicht so ein ding draus 😤 ich hab schon 3 leute die sofort zahlen. entweder so oder gar nicht',
          'ugh do not make such a thing of it 😤 I already have 3 people who will pay right away. either this way or not at all') },
      ],
      flags: ['friendsFamily', 'otherBuyers'],
      tactic: 'urgency',
      prompt: bi('Du zahlst die Gebühr — und trotzdem soll es „Freunde und Familie" sein.',
                 'You offered to cover the fee — and it still has to be “friends and family”.'),
      choices: [
        { text: bi('Genau das ist die Antwort. Absagen und melden',
                   'That is the answer right there. Decline and report'),
          next: 'end_warned', risk: -2, verdict: 'good', catches: ['friendsFamily', 'otherBuyers', 'newProfile'],
          why: bi('Sobald die Gebühr wegfällt und trotzdem auf der ungeschützten Zahlart bestanden wird, ist der Grund eindeutig.',
                  'Once the fee is off the table and the unprotected method is still insisted on, the reason is unambiguous.') },
        { text: bi('Nachgeben, sonst sind die Karten weg',
                   'Give in, otherwise the tickets are gone'),
          next: 'n4_wait', risk: 3, verdict: 'bad',
          why: bi('Du hattest den Beweis in der Hand. Der Zeitdruck war stärker — genau dafür ist er da.',
                  'You had the proof in your hand. The time pressure was stronger — which is what it is for.') },
      ],
    },

    /* ============ Kapitel 3: Der Einlass ============ */

    n4_wait: {
      chapter: bi('Kapitel 3 — Der Einlass', 'Chapter 3 — The door'),
      messages: [
        { kind: 'system', text: bi(
          'Zwanzig Minuten später kommen zwei PDFs. Sie sehen echt aus: Barcode, Sitzplatzangabe, Veranstalterlogo. Oben steht ein fremder Name.',
          'Twenty minutes later two PDFs arrive. They look genuine: barcode, seating details, promoter logo. Somebody else’s name is at the top.') },
      ],
      flags: ['personalised', 'screenshotTicket'],
      tactic: 'distraction',
      info: {
        icon: '🔦',
        title: bi('Was du jetzt noch prüfen kannst',
                  'What you can still check now'),
        body: [
          bi('Viele Veranstalter bieten eine Ticketprüfung an: Barcode oder Bestellnummer eingeben und sehen, ob das Ticket gültig und auf wen es ausgestellt ist. Das kostet nichts.',
             'Many promoters offer a ticket check: enter the barcode or order number and see whether the ticket is valid and who it is issued to. It costs nothing.'),
          bi('Steht ein fremder Name darauf, ist die Frage nicht, ob das Ticket echt ist, sondern ob du damit hineinkommst. Bei personalisierten Tickets ist die Antwort oft nein.',
             'If somebody else’s name is on it, the question is not whether the ticket is genuine but whether it gets you in. With personalised tickets the answer is often no.'),
        ],
      },
      prompt: bi('Zwei PDFs mit fremdem Namen. Bezahlt ist schon.',
                 'Two PDFs with somebody else’s name. Already paid for.'),
      choices: [
        { text: bi('Beim Veranstalter prüfen lassen',
                   'Have the promoter check them'),
          next: 'n4_check', risk: -1, verdict: 'good', catches: ['personalised'],
          why: bi('Jetzt noch sinnvoll: Je früher du weißt, woran du bist, desto mehr Zeit bleibt für eine echte Karte.',
                  'Still worth doing: the sooner you know where you stand, the more time you have to find a real ticket.') },
        { text: bi('Passt schon, ich geh einfach hin',
                   'It will be fine, I will just turn up'),
          next: 'end_door', risk: 2, verdict: 'bad',
          why: bi('Am Einlass ist es zu spät für alles. Zwei Wochen früher wäre noch vieles möglich gewesen.',
                  'At the door it is too late for everything. Two weeks earlier a lot was still possible.') },
      ],
    },

    n4_check: {
      messages: [
        { kind: 'system', text: bi(
          'Der Veranstalter antwortet am nächsten Tag: Die Barcodes gehören zu einer Bestellung, die bereits als „mehrfach weitergegeben" markiert ist. Beide Tickets wurden an mindestens vier Personen verschickt.',
          'The promoter replies the next day: the barcodes belong to an order already flagged as “shared multiple times”. Both tickets went to at least four people.') },
      ],
      flags: ['tooManyBuyers'],
      tactic: 'shame',
      prompt: bi('Vier Käuferinnen, zwei Tickets.', 'Four buyers, two tickets.'),
      choices: [
        { text: bi('PayPal einschalten und Anzeige erstatten',
                   'Involve PayPal and file a report'),
          next: 'end_lost', risk: -1, verdict: 'good', catches: ['tooManyBuyers', 'friendsFamily'],
          why: bi('Bei „Freunde und Familie" ist die Aussicht gering, aber nicht null — und die Anzeige hilft, das Konto zu sperren.',
                  'With “friends and family” the odds are slim but not zero — and the report helps get the account shut down.') },
        { text: bi('Nichts tun, ist ja eh zu spät',
                   'Do nothing, it is too late anyway'),
          next: 'end_silent', risk: 2, verdict: 'bad',
          why: bi('Es ist zu spät für dein Geld, aber nicht für die anderen drei — und nicht für die nächste Tour.',
                  'It is too late for your money, but not for the other three — and not for the next tour.') },
      ],
    },

    /* ============ Ausgänge ============ */

    end_declined: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'Du sagst ab. Eine Woche später gibt der Veranstalter Restkarten frei und du bekommst eine — für 89 €, offiziell.',
          'You decline. A week later the promoter releases returns and you get one — for €89, officially.') },
      ],
      damage: bi('0 € — und trotzdem auf dem Konzert', '€0 — and you got to the concert anyway'),
      lessons: [
        bi('Nur über den offiziellen Zweitmarkt kaufen. Dort wird das alte Ticket entwertet und ein neues auf deinen Namen ausgestellt.',
           'Only buy through the official resale. There the old ticket is cancelled and a new one issued in your name.'),
        bi('„Freunde und Familie" ist für Geschenke, nicht für Käufe. Es gibt dabei keinen Käuferschutz.',
           '“Friends and family” is for gifts, not purchases. It carries no buyer protection.'),
        bi('Veranstalter geben oft kurz vor dem Termin Restkarten frei. Warten ist häufig die bessere Option.',
           'Promoters often release returns shortly before the date. Waiting is frequently the better option.'),
      ],
    },

    end_warned: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'Du postest in der Fangruppe, was passiert ist. Zwei andere schreiben, sie hätten fast bezahlt. Der Account ist am Abend gelöscht.',
          'You post in the fan group about what happened. Two other people write that they had nearly paid. The account is gone by the evening.') },
      ],
      damage: bi('0 € — und zwei andere gewarnt', '€0 — and two other people warned'),
      lessons: [
        bi('In Fangruppen sind immer mehrere gleichzeitig im Visier. Eine Warnung erreicht sie alle.',
           'In fan groups several people are always targeted at once. One warning reaches all of them.'),
        bi('Wer auf einer ungeschützten Zahlart besteht, obwohl du die Gebühr übernimmst, hat den wahren Grund gerade zugegeben.',
           'Anyone insisting on an unprotected payment method after you offer to cover the fee has just admitted the real reason.'),
      ],
    },

    end_door: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi(
          'Am Einlass piept der Scanner rot. „Das Ticket wurde vor vierzig Minuten schon eingelöst." Hinter dir stehen zweitausend Leute.',
          'At the door the scanner beeps red. “This ticket was already scanned forty minutes ago.” Two thousand people are queuing behind you.') },
        { kind: 'system', text: bi(
          'Deine Freundinnen sind drin. Du stehst draußen. Der Account @lea_mrsch existiert nicht mehr.',
          'Your friends are inside. You are outside. The account @lea_mrsch no longer exists.') },
      ],
      flags: ['tooManyBuyers', 'personalised'],
      damage: bi('178 € — und das Konzert verpasst', '€178 — and the concert missed'),
      lessons: [
        bi('Ein Barcode-Screenshot kann an beliebig viele Menschen gehen. Nur der erste Scan kommt hinein.',
           'A screenshot of a barcode can go to any number of people. Only the first scan gets in.'),
        bi('Ob das Ticket echt war, merkst du erst am Einlass — deshalb muss die Prüfung vorher passieren.',
           'You only find out whether the ticket was real at the door — which is why the checking has to happen before.'),
        bi('Beim Ticketkauf gilt: offizieller Zweitmarkt oder gar nicht.',
           'When buying tickets the rule is: official resale, or nothing.'),
      ],
      recover: [
        bi('Bei PayPal einen Fall eröffnen — auch bei „Freunde und Familie" lohnt der Versuch.',
           'Open a case with PayPal — even with “friends and family” it is worth trying.'),
        bi('Anzeige erstatten, mit Chatverlauf, Profilnamen und Zahlungsbeleg.',
           'File a police report, with the chat history, the profile name and the payment receipt.'),
        bi('In der Fangruppe warnen — dort sitzen die nächsten Ziele.',
           'Warn the fan group — the next targets are in there.'),
      ],
    },

    end_lost: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi(
          'PayPal lehnt ab: Bei „Freunde und Familie" greift kein Käuferschutz. Die Anzeige führt immerhin dazu, dass das Konto gesperrt wird.',
          'PayPal declines: “friends and family” carries no buyer protection. The report does at least get the account shut down.') },
        { kind: 'system', text: bi(
          'Du warnst die Fangruppe. Zwei der drei anderen Käuferinnen melden sich ebenfalls.',
          'You warn the fan group. Two of the three other buyers come forward as well.') },
      ],
      flags: ['friendsFamily'],
      damage: bi('178 € weg — aber rechtzeitig gewusst', '€178 gone — but you found out in time'),
      lessons: [
        bi('Der Unterschied zwischen den beiden PayPal-Optionen ist bares Geld. Acht Euro Gebühr sind der Preis für Käuferschutz.',
           'The difference between the two PayPal options is real money. An €8 fee is the price of buyer protection.'),
        bi('Früh zu prüfen rettet nicht das Geld, aber den Abend: Du weißt vorher Bescheid statt am Einlass.',
           'Checking early does not save the money but it saves the evening: you know beforehand rather than at the door.'),
      ],
      recover: [
        bi('Fall bei PayPal eröffnen und Anzeige erstatten.',
           'Open a PayPal case and file a police report.'),
        bi('Alle Beweise sichern: Chatverlauf, Profil, PDFs, Zahlungsbeleg.',
           'Preserve all the evidence: chat history, profile, PDFs, payment receipt.'),
        bi('Die Fangruppe warnen und die anderen Betroffenen zusammenbringen.',
           'Warn the fan group and bring the other victims together.'),
      ],
    },

    end_silent: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi(
          'Du sagst niemandem etwas. Bei der nächsten Tour taucht derselbe Account unter neuem Namen wieder auf, mit demselben Text.',
          'You tell nobody. For the next tour the same account reappears under a new name, with the same wording.') },
      ],
      damage: bi('178 € weg — und die Masche läuft weiter', '€178 gone — and the con carries on'),
      lessons: [
        bi('Ticketbetrug wird selten gemeldet, weil die Beträge klein sind und es peinlich ist. Genau deshalb funktioniert er im großen Stil.',
           'Ticket fraud is rarely reported, because the amounts are small and it feels embarrassing. Which is exactly why it works at scale.'),
        bi('Eine Warnung in der Fangruppe kostet zwei Minuten und schützt die nächsten fünf Leute.',
           'A warning in the fan group costs two minutes and protects the next five people.'),
      ],
      recover: [
        bi('Auch spät noch melden — bei PayPal, beim Veranstalter und in der Gruppe.',
           'Report it even late — to PayPal, to the promoter and in the group.'),
        bi('Anzeige erstatten. Mehrere Anzeigen zum selben Konto führen viel eher zu Ermittlungen.',
           'File a report. Several reports about the same account are far more likely to trigger an investigation.'),
      ],
    },
  },
};
