import { bi } from '../bi.js';

/** Story 5 — Falscher Bankmitarbeiter am Telefon (Vishing + Push-TAN). */
export default {
  id: 'bank-support',
  icon: '🏦',
  channel: 'call',
  difficulty: 3,
  title: bi('Ihr Konto wurde gesperrt', 'Your Account Has Been Frozen'),
  teaser: bi(
    'Die Bank ruft an, um dich vor Betrug zu schützen. Sagt sie.',
    'The bank calls to protect you from fraud. So it says.'),
  contact: {
    name: bi('Sicherheitsabteilung', 'Security department'),
    sub: bi('+49 30 12345-0 · zeigt die Nummer deiner Bank', '+49 30 12345-0 · shows your bank’s number'),
  },

  redFlags: {
    spoofedNumber: {
      label: bi('Die angezeigte Rufnummer beweist gar nichts',
                'The number on your display proves nothing'),
      why: bi('Rufnummern lassen sich beliebig fälschen. Auf dem Display kann jede Nummer der Welt stehen.',
              'Caller IDs can be forged at will. Any number in the world can appear on your screen.'),
    },
    theyCalled: {
      label: bi('Der Anruf kam von außen zu dir',
                'They called you, not the other way round'),
      why: bi('Bei einem eingehenden Anruf weißt du nie, wer dran ist. Deshalb gilt: auflegen, selbst zurückrufen.',
              'On an incoming call you never know who is speaking. So: hang up and call back yourself.'),
    },
    pressure: {
      label: bi('Angst und Eile: „Es läuft gerade eine Abbuchung"',
                'Fear and hurry: “a payment is going through right now”'),
      why: bi('Panik schaltet das Nachdenken ab. Genau dafür wird sie erzeugt.',
              'Panic switches off thinking. That is exactly why it gets manufactured.'),
    },
    pushApprove: {
      label: bi('Du sollst eine Push-Benachrichtigung freigeben',
                'You are asked to approve a push notification'),
      why: bi('Eine Freigabe in der Banking-App bestätigt immer eine echte Zahlung — nie eine „Stornierung".',
              'An approval in your banking app always confirms a real payment — never a “cancellation”.'),
    },
    safeAccount: {
      label: bi('Das Märchen vom „Sicherheitskonto"',
                'The myth of the “safe account”'),
      why: bi('So etwas gibt es nicht. Keine Bank überweist dein Geld zum Schutz irgendwohin.',
              'No such thing exists. No bank moves your money somewhere else to protect it.'),
    },
    noStaffAsk: {
      label: bi('Bankmitarbeiter fragen nie nach TAN oder Passwort',
                'Bank staff never ask for a TAN or a password'),
      why: bi('Echte Mitarbeitende sehen, was sie brauchen. Wer danach fragt, sitzt nicht in der Bank.',
              'Real staff can already see what they need. Anyone who asks is not sitting in the bank.'),
    },
  },

  start: 'n1',
  nodes: {

    n1: {
      messages: [
        { kind: 'system', text: bi('Dein Handy klingelt. Auf dem Display: die Servicenummer deiner Bank.',
                                   'Your phone rings. On the display: your bank’s service number.') },
        { from: 'them', time: '11:04', sender: bi('„Herr Neumann, Sicherheit"', '“Mr Neumann, Security”'),
          text: bi('Guten Tag, Sicherheitsabteilung. Wir sehen gerade einen Abbuchungsversuch über 2.890 € aus Litauen. Haben Sie den veranlasst?',
                   'Good morning, security department. We are seeing an attempted debit of €2,890 from Lithuania. Did you authorise that?') },
      ],
      flags: ['spoofedNumber', 'theyCalled', 'pressure'],
      prompt: bi('Die Nummer stimmt. Der Ton ist ruhig und professionell.',
                 'The number matches. The tone is calm and professional.'),
      choices: [
        { text: bi('„Nein! Was muss ich tun?"', '“No! What do I need to do?”'),
          next: 'n2_hook', risk: 2, verdict: 'bad',
          why: bi('Der Schreck war das Ziel. Ab jetzt führt der Anrufer.',
                  'The shock was the objective. From here the caller is in charge.') },
        { text: bi('Auflegen und selbst die Nummer von der Bankkarte wählen',
                   'Hang up and dial the number on your bank card yourself'),
          next: 'end_callback', risk: -2, verdict: 'good', catches: ['spoofedNumber', 'theyCalled'],
          why: bi('Der einzig sichere Weg. Eine echte Bank hat kein Problem damit.',
                  'The only safe route. A genuine bank has no problem with it.') },
        { text: bi('„Woher weiß ich, dass Sie wirklich von der Bank sind?"',
                   '“How do I know you are really from the bank?”'),
          next: 'n2_doubt', risk: 0, verdict: 'good', catches: ['theyCalled'],
          why: bi('Berechtigte Frage. Die Antwort darauf ist verräterisch.',
                  'A fair question. The answer to it gives the game away.') },
      ],
    },

    n2_doubt: {
      messages: [
        { from: 'them', time: '11:05', sender: bi('„Herr Neumann"', '“Mr Neumann”'), text: bi(
          'Verständlich. Sehen Sie doch auf Ihr Display — Sie sehen unsere offizielle Nummer. Aber bitte beeilen Sie sich, die Buchung läuft in vier Minuten durch.',
          'Understandable. Just look at your display — you can see our official number. But please hurry, the payment clears in four minutes.') },
      ],
      flags: ['spoofedNumber', 'pressure'],
      prompt: bi('Er beruft sich auf die angezeigte Nummer. Und drückt auf die Zeit.',
                 'He points to the number on screen. And leans on the clock.'),
      choices: [
        { text: bi('Auflegen und selbst zurückrufen',
                   'Hang up and call back yourself'),
          next: 'end_callback', risk: -2, verdict: 'good', catches: ['spoofedNumber', 'theyCalled', 'pressure'],
          why: bi('Die angezeigte Nummer als Beweis anzuführen, ist das Erkennungszeichen schlechthin.',
                  'Citing the displayed number as proof is the tell of tells.') },
        { text: bi('Die Nummer stimmt ja wirklich — weitermachen',
                   'The number really does match — carry on'),
          next: 'n2_hook', risk: 3, verdict: 'bad',
          why: bi('Rufnummern zu fälschen kostet nichts. Das Display ist kein Ausweis.',
                  'Forging a caller ID costs nothing. Your display is not an identity document.') },
      ],
    },

    n2_hook: {
      messages: [
        { from: 'them', time: '11:07', sender: bi('„Herr Neumann"', '“Mr Neumann”'), text: bi(
          'Kein Problem, wir stornieren das. Sie bekommen gleich eine Push-Nachricht in Ihrer Banking-App. Bitte bestätigen Sie die — damit wird die Abbuchung zurückgenommen.',
          'No problem, we will cancel it. You are about to get a push notification in your banking app. Please approve it — that reverses the debit.') },
        { kind: 'system', text: bi('Push: „Überweisung 2.890 € an M. Petrauskas freigeben?"',
                                   'Push: “Approve transfer of €2,890 to M. Petrauskas?”') },
      ],
      flags: ['pushApprove', 'noStaffAsk'],
      prompt: bi('Die Push spricht von einer Überweisung. Nicht von einer Stornierung.',
                 'The push says transfer. It does not say cancellation.'),
      choices: [
        { text: bi('Den Text der Push genau lesen und ablehnen',
                   'Read the push text carefully and decline'),
          next: 'n3_refuse', risk: -2, verdict: 'good', catches: ['pushApprove'],
          why: bi('In der Push steht immer die Wahrheit. Sie lässt sich nicht fälschen, nur überlesen.',
                  'The push always tells the truth. It cannot be forged, only skim-read.') },
        { text: bi('Freigeben, er hat es ja erklärt',
                   'Approve it, he explained what it is'),
          next: 'n3_approved', risk: 3, verdict: 'bad',
          why: bi('Du hast die Überweisung selbst autorisiert. Damit ist sie rechtlich deine.',
                  'You authorised the transfer yourself. Legally that makes it yours.') },
      ],
    },

    n3_refuse: {
      messages: [
        { from: 'them', time: '11:09', sender: bi('„Herr Neumann"', '“Mr Neumann”'), text: bi(
          'Da haben Sie recht, das ist ein Anzeigefehler in unserem System. Dann machen wir es anders: Wir richten Ihnen ein Sicherheitskonto ein. Überweisen Sie Ihr Guthaben bitte dorthin, dann ist es geschützt.',
          'You are quite right, that is a display error in our system. Let us do it differently: we will set up a safe account for you. Please move your balance there and it will be protected.') },
      ],
      flags: ['safeAccount'],
      prompt: bi('Ein „Sicherheitskonto", auf das du dein Geld überweisen sollst.',
                 'A “safe account” you are supposed to move your money into.'),
      choices: [
        { text: bi('Auflegen. So etwas gibt es nicht',
                   'Hang up. No such thing exists'),
          next: 'end_survived', risk: -2, verdict: 'good', catches: ['safeAccount', 'noStaffAsk', 'theyCalled'],
          why: bi('Spätestens hier ist alles klar. Keine Bank lässt dich dein Geld „in Sicherheit" überweisen.',
                  'At this point it is beyond doubt. No bank asks you to transfer your money “to safety”.') },
        { text: bi('Klingt vernünftig — Guthaben überweisen',
                   'Sounds sensible — move the balance'),
          next: 'end_scammed', risk: 3, verdict: 'bad',
          why: bi('Das Sicherheitskonto ist das Konto des Betrügers. Der Klassiker unter den Maschen.',
                  'The safe account is the scammer’s account. The oldest move in the book.') },
      ],
    },

    n3_approved: {
      messages: [
        { kind: 'system', text: bi('Freigabe erteilt. 2.890 € verlassen dein Konto.',
                                   'Approval granted. €2,890 leaves your account.') },
        { from: 'them', time: '11:11', sender: bi('„Herr Neumann"', '“Mr Neumann”'), text: bi(
          'Sehr gut. Es kommt gleich noch eine zweite Bestätigung, das ist die Gegenbuchung. Bitte auch freigeben.',
          'Very good. A second confirmation is coming, that is the counter-entry. Please approve that one too.') },
      ],
      flags: ['pushApprove'],
      prompt: bi('Eine zweite Freigabe. Angeblich die Gegenbuchung.',
                 'A second approval. Supposedly the counter-entry.'),
      choices: [
        { text: bi('Auflegen und sofort die echte Bank anrufen',
                   'Hang up and call the real bank at once'),
          next: 'end_partial', risk: -1, verdict: 'good', catches: ['pushApprove', 'theyCalled'],
          why: bi('Sofort auflegen und sperren lassen. Jede Minute zählt.',
                  'Hang up immediately and get the account frozen. Every minute counts.') },
        { text: bi('Auch die zweite Freigabe erteilen',
                   'Approve the second one as well'),
          next: 'end_scammed', risk: 3, verdict: 'bad',
          why: bi('Es gibt keine Gegenbuchung. Es gibt nur eine zweite Überweisung.',
                  'There is no counter-entry. There is only a second transfer.') },
      ],
    },

    /* ---------- Enden ---------- */

    end_callback: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi('Die echte Bank: kein Abbuchungsversuch, kein Anruf von ihnen. Dein Konto ist völlig unauffällig.',
                                   'The real bank: no attempted debit, no call from them. Your account is entirely unremarkable.') },
      ],
      damage: bi('0 € — richtig zurückgerufen', '€0 — you called back correctly'),
      lessons: [
        bi('Bei Anrufen zur Bank immer auflegen und die Nummer von der Rückseite deiner Karte wählen.',
           'On any banking call: hang up and dial the number on the back of your card.'),
        bi('Angezeigte Rufnummern sind frei fälschbar und beweisen nichts.',
           'Displayed caller IDs can be forged freely and prove nothing.'),
        bi('Warte nach dem Auflegen kurz oder nutze ein anderes Telefon — die Leitung kann offen bleiben.',
           'After hanging up, wait a moment or use another phone — the line can be held open.'),
      ],
    },

    end_survived: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi('Du legst auf und rufst die Bank selbst an. Dort war nie ein Anruf geplant. Die Nummer wird gesperrt.',
                                   'You hang up and ring the bank yourself. No call was ever planned. The number gets blocked.') },
      ],
      damage: bi('0 € — Masche durchschaut', '€0 — you saw through it'),
      lessons: [
        bi('Ein „Sicherheitskonto" existiert nicht. Keine Bank verlangt je eine Überweisung zum Schutz.',
           'A “safe account” does not exist. No bank ever asks for a transfer to protect your money.'),
        bi('Bankmitarbeitende fragen nie nach TAN, Passwort oder Freigaben.',
           'Bank staff never ask for a TAN, a password, or an approval.'),
      ],
    },

    end_partial: {
      outcome: 'close',
      messages: [
        { kind: 'system', text: bi('Die Bank sperrt das Konto innerhalb von Minuten. Die 2.890 € werden nach langem Streit zur Hälfte erstattet.',
                                   'The bank freezes the account within minutes. After a long dispute half of the €2,890 is refunded.') },
      ],
      damage: bi('2.890 € freigegeben — 1.445 € endgültig weg', '€2,890 approved — €1,445 gone for good'),
      lessons: [
        bi('Selbst freigegebene Überweisungen gelten als autorisiert. Die Erstattung ist ein Kulanzfall, kein Recht.',
           'A transfer you approved counts as authorised. A refund is goodwill, not an entitlement.'),
        bi('Der Text in der Push-Benachrichtigung ist die Wahrheit — immer zu Ende lesen.',
           'The text in the push notification is the truth — always read it to the end.'),
      ],
      recover: [
        bi('Konto sofort sperren lassen, über die Banking-App oder den Sperr-Notruf 116 116.',
           'Freeze the account immediately, via the banking app or your bank’s emergency line.'),
        bi('Anzeige erstatten und der Bank die Bestätigung vorlegen.',
           'File a police report and hand the confirmation to your bank.'),
        bi('Auf schriftlicher Prüfung des Falls bestehen und nicht beim ersten Nein aufgeben.',
           'Insist on a written review of the case and do not give up at the first refusal.'),
      ],
    },

    end_scammed: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi('Am Abend ist das Konto leer: 14.200 €. Das „Sicherheitskonto" existiert seit drei Tagen und ist längst geräumt.',
                                   'By the evening the account is empty: €14,200. The “safe account” is three days old and already drained.') },
      ],
      damage: bi('14.200 € — das gesamte Guthaben', '€14,200 — the entire balance'),
      lessons: [
        bi('Diese Masche ist die teuerste von allen, weil sie ruhig und professionell klingt.',
           'This is the most expensive con of all, precisely because it sounds calm and professional.'),
        bi('Eine Regel schützt vor allem davon: bei Bankanrufen immer selbst zurückrufen.',
           'One rule protects against all of it: on any banking call, always call back yourself.'),
      ],
      recover: [
        bi('Sofort das Konto sperren und alle Überweisungen zurückrufen lassen.',
           'Freeze the account immediately and have every transfer recalled.'),
        bi('Anzeige bei der Polizei erstatten — auch die gefälschte Rufnummer angeben.',
           'File a police report — including the forged caller ID.'),
        bi('Schriftlich Erstattung fordern und notfalls die Ombudsstelle der Banken einschalten.',
           'Demand reimbursement in writing and, if needed, escalate to the banking ombudsman.'),
        bi('Darüber sprechen. Diese Masche trifft besonders oft Menschen, die sich hinterher schämen.',
           'Talk about it. This con disproportionately hits people who then feel too ashamed to speak.'),
      ],
    },
  },
};
