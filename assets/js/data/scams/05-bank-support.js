import { bi } from '../bi.js';

/** Story 5 — Falscher Bankmitarbeiter am Telefon (Vishing + Push-Freigabe). */
export default {
  id: 'bank-support',
  icon: '🏦',
  channel: 'call',
  difficulty: 3,
  title: bi('Ihr Konto wurde gesperrt', 'Your Account Has Been Frozen'),
  teaser: bi(
    'Die Bank ruft an, um dich vor Betrug zu schützen. Die Nummer stimmt sogar.',
    'The bank calls to protect you from fraud. The number even checks out.'),
  contact: {
    name: bi('Sicherheitsabteilung', 'Security department'),
    sub: bi('+49 30 12345-0 · Nummer deiner Bank', '+49 30 12345-0 · your bank’s number'),
  },

  redFlags: {
    spoofedNumber: {
      label: bi('Die angezeigte Rufnummer beweist gar nichts',
                'The number on your display proves nothing'),
      why: bi('Rufnummern lassen sich frei fälschen — technisch ist das so einfach wie einen Absender auf einen Briefumschlag zu schreiben. Auf deinem Display kann jede Nummer der Welt stehen, auch die 110.',
              'Caller IDs can be forged freely — technically it is as easy as writing a return address on an envelope. Any number in the world can appear on your display, including the emergency services.'),
    },
    theyCalled: {
      label: bi('Der Anruf kam von außen zu dir',
                'They called you, not the other way round'),
      why: bi('Bei einem eingehenden Anruf weißt du nie, wer wirklich spricht. Bei einem selbst gewählten Anruf schon. Dieser eine Unterschied entscheidet über fast jeden Fall.',
              'On an incoming call you never know who is really speaking. On a call you dialled yourself, you do. That single difference decides almost every case.'),
    },
    pressure: {
      label: bi('Angst und Eile: „Es läuft gerade eine Abbuchung"',
                'Fear and hurry: “a payment is going through right now”'),
      why: bi('Die laufende Abbuchung gibt es nicht. Sie existiert nur, damit du keine Zeit hast, aufzulegen und selbst zurückzurufen.',
              'The payment in progress does not exist. It exists only so that you have no time to hang up and call back yourself.'),
    },
    pushApprove: {
      label: bi('Du sollst eine Push-Benachrichtigung freigeben',
                'You are asked to approve a push notification'),
      why: bi('Eine Freigabe in der Banking-App bestätigt immer eine echte Zahlung, die gerade ausgelöst wurde. Es gibt keine Freigabe für eine „Stornierung" — Stornierungen brauchen deine Zustimmung nicht.',
              'An approval in your banking app always confirms a real payment that has just been initiated. There is no approval for a “cancellation” — cancellations do not need your consent.'),
    },
    safeAccount: {
      label: bi('Das Märchen vom „Sicherheitskonto"',
                'The myth of the “safe account”'),
      why: bi('So etwas existiert nicht. Wenn eine Bank ein Konto für gefährdet hält, sperrt sie es — sie bittet dich nicht, dein Geld woandershin zu überweisen.',
              'No such thing exists. If a bank considers an account at risk it freezes it — it does not ask you to move your money somewhere else.'),
    },
    noStaffAsk: {
      label: bi('Bankmitarbeiter fragen nie nach TAN oder Passwort',
                'Bank staff never ask for a TAN or a password'),
      why: bi('Echte Mitarbeitende sehen dein Konto bereits vor sich. Sie brauchen weder Passwort noch TAN noch eine Freigabe — sie haben ihre eigenen Systeme.',
              'Real staff already have your account in front of them. They need no password, no TAN, no approval — they have their own systems.'),
    },
    dontHangUp: {
      label: bi('„Bitte bleiben Sie in der Leitung"',
                '“Please stay on the line”'),
      why: bi('Auflegen ist der einzige Ausweg, deshalb wird er verboten. Zusätzlich kann die Leitung offen gehalten werden: Du wählst danach eine Nummer und sprichst wieder mit denselben Leuten.',
              'Hanging up is the only way out, so it gets forbidden. On top of that the line can be held open: you dial a number afterwards and end up speaking to the same people again.'),
    },
    insider: {
      label: bi('Sie wissen Dinge über dich',
                'They know things about you'),
      why: bi('Name, Adresse, letzte Ziffern der Karte, manchmal echte Buchungen: alles aus Datenlecks oder früheren Betrugsversuchen. Wissen ist kein Ausweis.',
              'Name, address, the last digits of your card, sometimes genuine transactions: all from data breaches or earlier scam attempts. Knowledge is not identification.'),
    },
  },

  start: 'n1',
  nodes: {

    /* ============ Kapitel 1: Der Anruf ============ */

    n1: {
      chapter: bi('Kapitel 1 — Der Anruf', 'Chapter 1 — The call'),
      messages: [
        { kind: 'system', text: bi(
          'Dienstag, 11:04. Du bist im Büro. Dein Handy klingelt — auf dem Display steht die Servicenummer deiner Bank, so wie sie gespeichert ist.',
          'Tuesday, 11:04. You are at work. Your phone rings — the display shows your bank’s service number, exactly as you saved it.') },
        { from: 'them', time: '11:04', sender: bi('„Herr Neumann, Sicherheit"', '“Mr Neumann, Security”'),
          text: bi('Guten Tag Frau Berger. Neumann, Sicherheitsabteilung. Wir sehen einen Abbuchungsversuch über 2.890 € aus Litauen auf Ihrer Karte mit den Endziffern 4417. Haben Sie den veranlasst?',
                   'Good morning Ms Berger. Neumann, security department. We are seeing an attempted debit of €2,890 from Lithuania on your card ending 4417. Did you authorise that?') },
      ],
      flags: ['spoofedNumber', 'theyCalled', 'pressure', 'insider'],
      tactic: 'authority',
      info: {
        icon: '☎️',
        title: bi('Warum die richtige Nummer im Display steht',
                  'Why the correct number shows on your display'),
        body: [
          bi('Die Absendernummer eines Anrufs wird vom Anrufer selbst mitgeschickt und unterwegs nicht geprüft. Sie zu fälschen ist ein Menüpunkt in gängiger Telefonie-Software, kein Hackerangriff.',
             'The caller ID is supplied by the caller and is not verified along the way. Forging it is a menu option in ordinary telephony software, not a hacking feat.'),
          bi('Deshalb ist die angezeigte Nummer als Beweis wertlos. Sie beweist nur, was die andere Seite dich glauben lassen will.',
             'So the displayed number is worthless as evidence. It only proves what the other side wants you to believe.'),
          bi('Dass er deinen Namen und die letzten Kartenziffern kennt, beweist ebenfalls nichts: Solche Daten stammen aus Datenlecks und werden gehandelt.',
             'Knowing your name and the last digits of your card proves nothing either: data like that comes from breaches and gets traded.'),
        ],
      },
      prompt: bi('Die Nummer stimmt, dein Name stimmt, die Kartenziffern stimmen.',
                 'The number matches, your name matches, the card digits match.'),
      choices: [
        { text: bi('Auflegen und selbst die Nummer von der Bankkarte wählen',
                   'Hang up and dial the number on your bank card yourself'),
          next: 'n2_callback', risk: -2, verdict: 'good', catches: ['spoofedNumber', 'theyCalled'],
          why: bi('Der einzig sichere Weg — und eine echte Bank hat damit kein Problem. Alles andere ist Vertrauen ohne Grundlage.',
                  'The only safe route — and a genuine bank has no problem with it. Anything else is trust without a basis.') },
        { text: bi('„Woher weiß ich, dass Sie wirklich von der Bank sind?"',
                   '“How do I know you are really from the bank?”'),
          next: 'n2_doubt', risk: 0, verdict: 'good', catches: ['theyCalled'],
          why: bi('Berechtigte Frage. Wie sie beantwortet wird, ist verräterischer als die Antwort selbst.',
                  'A fair question. How it gets answered gives more away than the answer itself.') },
        { text: bi('„Nein! Was muss ich tun?"', '“No! What do I need to do?”'),
          next: 'n2_hook', risk: 2, verdict: 'bad',
          why: bi('Der Schreck war das Ziel. Ab jetzt führt der Anrufer das Gespräch und du reagierst nur noch.',
                  'The shock was the objective. From here the caller runs the conversation and you only react.') },
      ],
    },

    n2_doubt: {
      messages: [
        { from: 'them', time: '11:05', sender: bi('„Herr Neumann"', '“Mr Neumann”'), text: bi(
          'Sehr gut, dass Sie fragen — genau so soll es sein. Sehen Sie einfach auf Ihr Display: Sie sehen unsere offizielle Servicenummer. Aber bitte beeilen Sie sich, die Buchung geht in vier Minuten durch.',
          'Very good that you ask — exactly as it should be. Just look at your display: you can see our official service number. But please hurry, the payment clears in four minutes.') },
      ],
      flags: ['spoofedNumber', 'pressure'],
      tactic: 'authority',
      info: {
        icon: '🧠',
        title: bi('Ein Lob für deine Vorsicht — als Werkzeug',
                  'Praise for your caution — as a tool'),
        body: [
          bi('„Gut, dass Sie fragen" ist eine Standardformel. Sie bestätigt dein Sicherheitsgefühl, ohne die Frage zu beantworten — und macht dich zugänglicher für den nächsten Schritt.',
             '“Good that you ask” is a stock phrase. It affirms your sense of safety without answering the question — and makes you more receptive to the next step.'),
          bi('Achte darauf, ob eine Frage beantwortet oder nur gelobt wird. Hier wird als Beweis genau das angeführt, was sich am leichtesten fälschen lässt.',
             'Notice whether a question is answered or merely praised. Here the evidence offered is precisely the thing that is easiest to forge.'),
        ],
      },
      prompt: bi('Er beruft sich auf die angezeigte Nummer. Und drückt auf die Zeit.',
                 'He points to the number on screen. And leans on the clock.'),
      choices: [
        { text: bi('Auflegen und selbst zurückrufen',
                   'Hang up and call back yourself'),
          next: 'n2_callback', risk: -2, verdict: 'good', catches: ['spoofedNumber', 'theyCalled', 'pressure'],
          why: bi('Die angezeigte Nummer als Beweis anzuführen ist das Erkennungszeichen schlechthin — genau das kann eine echte Bank nicht nötig haben.',
                  'Citing the displayed number as evidence is the tell of tells — a genuine bank would never need to.') },
        { text: bi('Nach seiner Personalnummer und einem Rückruf fragen',
                   'Ask for his staff number and a callback'),
          next: 'n2_number', risk: -1, verdict: 'good', catches: ['theyCalled'],
          why: bi('Gute Idee im Ansatz — aber Personalnummern kann man erfinden. Der Rückruf ist der Teil, der zählt.',
                  'Good instinct — but staff numbers can be invented. The callback is the part that matters.') },
        { text: bi('Die Nummer stimmt ja wirklich — weitermachen',
                   'The number really does match — carry on'),
          next: 'n2_hook', risk: 3, verdict: 'bad',
          why: bi('Rufnummern zu fälschen kostet nichts. Dein Display ist kein Ausweis.',
                  'Forging a caller ID costs nothing. Your display is not an identity document.') },
      ],
    },

    n2_number: {
      messages: [
        { from: 'them', time: '11:06', sender: bi('„Herr Neumann"', '“Mr Neumann”'), text: bi(
          'Personalnummer 4471-B. Aber ein Rückruf geht leider nicht, unsere Sicherheitsleitung ist nur ausgehend. Bitte bleiben Sie in der Leitung, sonst können wir die Buchung nicht mehr stoppen.',
          'Staff number 4471-B. A callback is not possible I am afraid, our security line is outbound only. Please stay on the line, otherwise we cannot stop the payment.') },
      ],
      flags: ['dontHangUp', 'pressure'],
      tactic: 'isolation',
      info: {
        icon: '📴',
        title: bi('„Nicht auflegen" ist immer ein Warnsignal',
                  '“Do not hang up” is always a warning sign'),
        body: [
          bi('Es gibt keine Bankabteilung, die man nicht zurückrufen kann. Der Satz existiert nur, um den einen Schritt zu verhindern, der die Masche beendet.',
             'There is no bank department you cannot call back. The sentence exists purely to prevent the one step that ends the con.'),
          bi('Zusatzrisiko: Der Anrufer kann die Leitung offen halten. Wählst du danach eine Nummer, landest du wieder bei denselben Leuten. Deshalb: ein anderes Telefon nehmen oder ein paar Minuten warten.',
             'Extra risk: the caller can hold the line open. If you dial afterwards you reach the same people again. So: use another phone, or wait a few minutes first.'),
        ],
      },
      prompt: bi('Kein Rückruf möglich. Und du sollst nicht auflegen.',
                 'No callback possible. And you are told not to hang up.'),
      choices: [
        { text: bi('Trotzdem auflegen — vom Bürotelefon zurückrufen',
                   'Hang up anyway — call back from the office phone'),
          next: 'n2_callback', risk: -2, verdict: 'good', catches: ['dontHangUp', 'spoofedNumber', 'theyCalled'],
          why: bi('Perfekt: ein anderes Gerät umgeht auch die offen gehaltene Leitung.',
                  'Perfect: a different device also gets around a line held open.') },
        { text: bi('In der Leitung bleiben, er klingt kompetent',
                   'Stay on the line, he sounds competent'),
          next: 'n2_hook', risk: 3, verdict: 'bad',
          why: bi('Kompetenz ist hier eine Berufsqualifikation. Diese Anrufe werden geübt und nach Skript geführt.',
                  'Competence is a job requirement here. These calls are rehearsed and run from a script.') },
      ],
    },

    /* ============ Kapitel 2: Die Freigabe ============ */

    n2_hook: {
      chapter: bi('Kapitel 2 — Die Freigabe', 'Chapter 2 — The approval'),
      messages: [
        { from: 'them', time: '11:07', sender: bi('„Herr Neumann"', '“Mr Neumann”'), text: bi(
          'Kein Problem, wir stornieren das sofort. Sie bekommen gleich eine Push-Nachricht in Ihrer Banking-App. Bitte bestätigen Sie die — damit wird die Abbuchung zurückgenommen.',
          'No problem, we will cancel it right away. You are about to get a push notification in your banking app. Please approve it — that reverses the debit.') },
        { kind: 'system', text: bi('Push: „Überweisung 2.890 € an M. Petrauskas freigeben?"',
                                   'Push: “Approve transfer of €2,890 to M. Petrauskas?”') },
      ],
      flags: ['pushApprove', 'noStaffAsk'],
      tactic: 'distraction',
      info: {
        icon: '📱',
        title: bi('Die Push-Nachricht ist der ehrlichste Teil des Gesprächs',
                  'The push notification is the most honest part of the call'),
        body: [
          bi('Der Text in der App kommt von deiner Bank, nicht vom Anrufer. Er lässt sich nicht fälschen und beschreibt exakt, was passiert, wenn du bestätigst.',
             'The text in the app comes from your bank, not from the caller. It cannot be forged and describes exactly what happens if you confirm.'),
          bi('Hier steht „Überweisung freigeben", nicht „Stornierung bestätigen". Wer am Telefon etwas anderes behauptet, während dein Handy die Wahrheit anzeigt, lügt nachweislich.',
             'It says “approve transfer”, not “confirm cancellation”. Anyone claiming otherwise on the phone while your handset displays the truth is demonstrably lying.'),
          bi('Deshalb gilt: Push-Nachrichten immer zu Ende lesen, besonders wenn jemand mitredet und Eile macht.',
             'So: always read push notifications to the end, especially when somebody is talking over you and rushing you.'),
        ],
      },
      prompt: bi('Die Push spricht von einer Überweisung. Nicht von einer Stornierung.',
                 'The push says transfer. It does not say cancellation.'),
      choices: [
        { text: bi('Den Text der Push genau lesen und ablehnen',
                   'Read the push text carefully and decline'),
          next: 'n3_refuse', risk: -2, verdict: 'good', catches: ['pushApprove'],
          why: bi('In der Push steht immer die Wahrheit. Sie lässt sich nicht fälschen — nur überlesen.',
                  'The push always tells the truth. It cannot be forged, only skim-read.') },
        { text: bi('Nachfragen, warum dort „Überweisung" steht',
                   'Ask why it says “transfer”'),
          next: 'n3_excuse', risk: -1, verdict: 'good', catches: ['pushApprove'],
          why: bi('Genau die Frage, auf die es keine gute Antwort gibt. Hör auf die Ausrede, die jetzt kommt.',
                  'Exactly the question there is no good answer to. Listen to the excuse that comes next.') },
        { text: bi('Freigeben, er hat es ja erklärt',
                   'Approve it, he explained what it is'),
          next: 'n4_approved', risk: 3, verdict: 'bad',
          why: bi('Du hast die Überweisung selbst autorisiert. Damit gilt sie rechtlich als von dir gewollt — und die Erstattung wird sehr schwer.',
                  'You authorised the transfer yourself. Legally that makes it your own instruction — and a refund becomes very hard.') },
      ],
    },

    n3_excuse: {
      messages: [
        { from: 'them', time: '11:08', sender: bi('„Herr Neumann"', '“Mr Neumann”'), text: bi(
          'Das ist ein bekannter Anzeigefehler in unserem System, die Techniker arbeiten daran. Technisch ist es eine Rückbuchung. Bitte bestätigen Sie jetzt, uns läuft die Zeit weg.',
          'That is a known display bug in our system, the engineers are on it. Technically it is a reversal. Please confirm now, we are running out of time.') },
      ],
      flags: ['pushApprove', 'pressure'],
      tactic: 'urgency',
      prompt: bi('Ein „Anzeigefehler" — ausgerechnet an der Stelle, an der es um dein Geld geht.',
                 'A “display bug” — precisely at the point where your money is at stake.'),
      choices: [
        { text: bi('Ablehnen und auflegen', 'Decline and hang up'),
          next: 'n3_refuse', risk: -2, verdict: 'good', catches: ['pushApprove', 'pressure', 'noStaffAsk'],
          why: bi('Eine Bank, deren Sicherheitssystem angeblich falsche Beträge anzeigt, hätte ein größeres Problem als deine Karte. Die Ausrede ist die Bestätigung.',
                  'A bank whose security system supposedly displays wrong amounts would have a bigger problem than your card. The excuse is the confirmation.') },
        { text: bi('Freigeben, das klingt plausibel',
                   'Approve it, that sounds plausible'),
          next: 'n4_approved', risk: 3, verdict: 'bad',
          why: bi('„Anzeigefehler" ist die Standardausrede an genau dieser Stelle. Sie kommt in fast jedem dieser Gespräche vor.',
                  '“Display bug” is the stock excuse at exactly this point. It appears in almost every one of these calls.') },
      ],
    },

    /* ============ Kapitel 3: Das Sicherheitskonto ============ */

    n3_refuse: {
      chapter: bi('Kapitel 3 — Das Sicherheitskonto', 'Chapter 3 — The safe account'),
      messages: [
        { from: 'them', time: '11:09', sender: bi('„Herr Neumann"', '“Mr Neumann”'), text: bi(
          'Gut, dann machen wir es anders. Wir richten Ihnen ein Sicherheitskonto ein, dort ist Ihr Guthaben vor dem Zugriff geschützt. Bitte überweisen Sie Ihr Guthaben dorthin, wir buchen es morgen zurück.',
          'Very well, we will do it differently. We will set up a safe account for you where your balance is protected from access. Please transfer your balance there and we will move it back tomorrow.') },
        { from: 'them', time: '11:10', sender: bi('„Herr Neumann"', '“Mr Neumann”'), text: bi(
          'Und bitte erwähnen Sie das in der Filiale nicht — die Kolleginnen dort sind nicht in den Vorgang eingebunden.',
          'And please do not mention this in the branch — the colleagues there are not part of this process.') },
      ],
      flags: ['safeAccount', 'dontHangUp'],
      tactic: 'isolation',
      info: {
        icon: '🚩',
        title: bi('Drei Sätze, die es bei einer echten Bank nie gibt',
                  'Three sentences a real bank never says'),
        body: [
          bi('„Überweisen Sie Ihr Geld auf ein Sicherheitskonto." — Banken sperren gefährdete Konten, sie räumen sie nicht.',
             '“Transfer your money to a safe account.” — Banks freeze accounts at risk, they do not empty them.'),
          bi('„Bitte erwähnen Sie das in der Filiale nicht." — Genau die Filiale würde die Masche in dreißig Sekunden erkennen.',
             '“Please do not mention this in the branch.” — The branch is exactly where this con would be spotted in thirty seconds.'),
          bi('„Nennen Sie mir Ihre TAN." — Mitarbeitende brauchen nie eine TAN, ein Passwort oder eine Freigabe von dir.',
             '“Give me your TAN.” — Staff never need a TAN, a password or an approval from you.'),
        ],
      },
      prompt: bi('Ein „Sicherheitskonto". Und niemand in der Filiale soll davon wissen.',
                 'A “safe account”. And nobody in the branch is to know about it.'),
      choices: [
        { text: bi('Auflegen. So etwas gibt es nicht',
                   'Hang up. No such thing exists'),
          next: 'end_survived', risk: -2, verdict: 'good', catches: ['safeAccount', 'noStaffAsk', 'theyCalled'],
          why: bi('Spätestens hier ist alles klar. Keine Bank lässt dich dein Geld „in Sicherheit" überweisen, und keine bittet dich, ihre eigenen Filialen zu umgehen.',
                  'At this point it is beyond doubt. No bank has you transfer money “to safety”, and none asks you to bypass its own branches.') },
        { text: bi('In die Filiale gehen und dort nachfragen',
                   'Walk into the branch and ask'),
          next: 'end_branch', risk: -2, verdict: 'good', catches: ['safeAccount', 'dontHangUp'],
          why: bi('Die Bitte um Geheimhaltung zu ignorieren ist der wirksamste Gegenzug überhaupt.',
                  'Ignoring the request for secrecy is the single most effective counter-move.') },
        { text: bi('Klingt vernünftig — Guthaben überweisen',
                   'Sounds sensible — move the balance'),
          next: 'end_scammed', risk: 3, verdict: 'bad',
          why: bi('Das Sicherheitskonto ist das Konto der Täter. Es ist die älteste Variante dieser Masche und immer noch die teuerste.',
                  'The safe account is the offenders’ account. It is the oldest version of this con and still the most expensive.') },
      ],
    },

    n4_approved: {
      chapter: bi('Kapitel 3 — Danach', 'Chapter 3 — Afterwards'),
      messages: [
        { kind: 'system', text: bi('Freigabe erteilt. 2.890 € verlassen dein Konto.',
                                   'Approval granted. €2,890 leaves your account.') },
        { from: 'them', time: '11:11', sender: bi('„Herr Neumann"', '“Mr Neumann”'), text: bi(
          'Sehr gut. Es kommt gleich noch eine zweite Bestätigung, das ist die Gegenbuchung. Bitte auch freigeben.',
          'Very good. A second confirmation is coming, that is the counter-entry. Please approve that one too.') },
      ],
      flags: ['pushApprove'],
      tactic: 'commitment',
      prompt: bi('Eine zweite Freigabe. Angeblich die Gegenbuchung.',
                 'A second approval. Supposedly the counter-entry.'),
      choices: [
        { text: bi('Auflegen und sofort die echte Bank anrufen',
                   'Hang up and call the real bank at once'),
          next: 'end_partial', risk: -1, verdict: 'good', catches: ['pushApprove', 'theyCalled'],
          why: bi('Sofort auflegen und sperren lassen. In den ersten Minuten lässt sich oft noch etwas retten.',
                  'Hang up immediately and get it frozen. In the first few minutes something can often still be saved.') },
        { text: bi('Auch die zweite Freigabe erteilen',
                   'Approve the second one as well'),
          next: 'end_scammed', risk: 3, verdict: 'bad',
          why: bi('Es gibt keine Gegenbuchung. Es gibt nur eine zweite Überweisung — und danach eine dritte.',
                  'There is no counter-entry. There is only a second transfer — and after that a third.') },
      ],
    },

    /* ============ Ausgänge ============ */

    n2_callback: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'Du legst auf, wartest zwei Minuten und rufst die Nummer von der Rückseite deiner Karte an.',
          'You hang up, wait two minutes and dial the number from the back of your card.') },
        { kind: 'system', text: bi(
          'Die echte Bank: kein Abbuchungsversuch, kein Anruf von ihnen, keine Sicherheitsabteilung namens Neumann. Dein Konto ist völlig unauffällig.',
          'The real bank: no attempted debit, no call from them, no security officer called Neumann. Your account is entirely unremarkable.') },
      ],
      damage: bi('0 € — richtig zurückgerufen', '€0 — you called back correctly'),
      lessons: [
        bi('Bei Anrufen zur Bank immer auflegen und die Nummer von der Rückseite deiner Karte wählen.',
           'On any banking call: hang up and dial the number on the back of your card.'),
        bi('Angezeigte Rufnummern sind frei fälschbar und beweisen nichts.',
           'Displayed caller IDs can be forged freely and prove nothing.'),
        bi('Nach dem Auflegen kurz warten oder ein anderes Telefon nehmen — die Leitung kann offen gehalten werden.',
           'After hanging up, wait a moment or use a different phone — the line can be held open.'),
        bi('Dass jemand deinen Namen und deine Kartenziffern kennt, ist kein Ausweis. Solche Daten werden gehandelt.',
           'Somebody knowing your name and card digits is not identification. Data like that gets traded.'),
      ],
    },

    end_survived: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'Du legst auf und rufst die Bank selbst an. Dort war nie ein Anruf geplant. Die gefälschte Nummer wird gemeldet.',
          'You hang up and ring the bank yourself. No call was ever planned. The forged number gets reported.') },
      ],
      damage: bi('0 € — Masche durchschaut', '€0 — you saw through it'),
      lessons: [
        bi('Ein „Sicherheitskonto" existiert nicht. Keine Bank verlangt je eine Überweisung zum Schutz deines Geldes.',
           'A “safe account” does not exist. No bank ever asks for a transfer to protect your money.'),
        bi('Bankmitarbeitende fragen nie nach TAN, Passwort oder einer Freigabe.',
           'Bank staff never ask for a TAN, a password, or an approval.'),
        bi('Jede Bitte um Geheimhaltung gegenüber der eigenen Filiale ist ein Geständnis.',
           'Any request to keep something from your own branch is a confession.'),
      ],
    },

    end_branch: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'In der Filiale hört die Beraterin zwei Sätze und sagt: „Legen Sie auf. Das ist ein bekannter Betrugsanruf, wir hatten heute drei davon."',
          'In the branch the adviser hears two sentences and says: “Hang up. That is a known scam call, we have had three today.”') },
      ],
      damage: bi('0 € — die Filiale hat es sofort erkannt', '€0 — the branch spotted it instantly'),
      lessons: [
        bi('Bankfilialen kennen diese Masche. Sie ist einer der häufigsten Fälle überhaupt.',
           'Bank branches know this con. It is one of the most common cases there is.'),
        bi('Die Bitte um Geheimhaltung ignorieren ist der wirksamste Gegenzug.',
           'Ignoring the request for secrecy is the most effective counter-move.'),
      ],
    },

    end_partial: {
      outcome: 'close',
      messages: [
        { kind: 'system', text: bi(
          'Die Bank sperrt das Konto innerhalb von Minuten und meldet die Zahlung als Betrugsfall.',
          'The bank freezes the account within minutes and flags the payment as fraud.') },
        { kind: 'system', text: bi(
          'Nach drei Monaten Streit werden 1.445 € erstattet — die Hälfte. Der Rest bleibt bei dir hängen, weil du selbst freigegeben hast.',
          'After three months of dispute €1,445 is refunded — half. The rest stays with you, because you approved it yourself.') },
      ],
      damage: bi('2.890 € freigegeben — 1.445 € endgültig weg', '€2,890 approved — €1,445 gone for good'),
      lessons: [
        bi('Selbst freigegebene Überweisungen gelten als autorisiert. Eine Erstattung ist dann Kulanz, kein Anspruch.',
           'A transfer you approved counts as authorised. A refund is then goodwill, not an entitlement.'),
        bi('Der Text in der Push-Benachrichtigung ist die Wahrheit — immer zu Ende lesen.',
           'The text in the push notification is the truth — always read it to the end.'),
        bi('Nach der ersten Freigabe kommt immer eine zweite Bitte. Sie ist der Moment zum Aussteigen.',
           'After the first approval there is always a second request. That is the moment to get out.'),
      ],
      recover: [
        bi('Konto sofort sperren lassen — über die Banking-App oder den Sperr-Notruf 116 116.',
           'Freeze the account immediately — via the banking app or the card-blocking hotline.'),
        bi('Anzeige erstatten und der Bank die Bestätigung vorlegen.',
           'File a police report and hand the confirmation to your bank.'),
        bi('Auf schriftlicher Prüfung bestehen und notfalls die Ombudsstelle der Banken einschalten.',
           'Insist on a written review and, if needed, escalate to the banking ombudsman.'),
      ],
    },

    end_scammed: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi(
          'Am Abend ist das Konto leer: 14.200 €. Das „Sicherheitskonto" existiert seit drei Tagen und wurde binnen einer Stunde geräumt.',
          'By the evening the account is empty: €14,200. The “safe account” is three days old and was emptied within the hour.') },
        { kind: 'system', text: bi(
          'Zwei Wochen später ruft eine „Kanzlei für Anlegerschutz" an und bietet an, das Geld zurückzuholen. Gegen Vorschuss.',
          'Two weeks later a “fraud recovery firm” calls, offering to get the money back. For an advance fee.') },
      ],
      flags: ['safeAccount'],
      damage: bi('14.200 € — das gesamte Guthaben', '€14,200 — the entire balance'),
      lessons: [
        bi('Diese Masche ist die teuerste von allen, weil sie ruhig, freundlich und professionell klingt.',
           'This is the most expensive con of all, precisely because it sounds calm, friendly and professional.'),
        bi('Eine einzige Regel schützt vor fast allem davon: bei Bankanrufen immer selbst zurückrufen.',
           'One rule protects against nearly all of it: on any banking call, always call back yourself.'),
        bi('Der Anruf der „Rückhol-Kanzlei" ist die zweite Masche, oft von denselben Leuten.',
           'The “recovery firm” call is the second con, often run by the same people.'),
      ],
      recover: [
        bi('Sofort das Konto sperren und alle Überweisungen zurückrufen lassen.',
           'Freeze the account immediately and have every transfer recalled.'),
        bi('Anzeige erstatten — auch die gefälschte Rufnummer und die Uhrzeit angeben.',
           'File a police report — including the forged caller ID and the time of the call.'),
        bi('Schriftlich Erstattung fordern und notfalls die Ombudsstelle einschalten.',
           'Demand reimbursement in writing and escalate to the ombudsman if needed.'),
        bi('Auf keine Rückhol-Angebote eingehen. Niemals Vorkasse für eine angebliche Rückholung.',
           'Engage with no recovery offers. Never pay up front for a supposed recovery.'),
      ],
    },
  },
};
