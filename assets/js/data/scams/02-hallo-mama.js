import { bi } from '../bi.js';

/** Story 2 — „Hallo Mama, neue Nummer" (Schockmasche per WhatsApp). */
export default {
  id: 'hallo-mama',
  icon: '📱',
  channel: 'whatsapp',
  difficulty: 2,
  title: bi('Hallo Mama, neue Nummer', 'Hi Mum, New Number'),
  teaser: bi(
    'Dein Sohn studiert seit September in Leipzig. Heute Abend schreibt er von einer fremden Nummer.',
    'Your son has been studying in Leipzig since September. Tonight he writes from a number you do not know.'),
  contact: {
    name: bi('+49 1522 7719004', '+49 1522 7719004'),
    sub: bi('Neue Nummer · zuletzt online gerade eben', 'New number · last seen just now'),
  },

  redFlags: {
    newNumber: {
      label: bi('Fremde Nummer behauptet, jemand Vertrautes zu sein',
                'An unknown number claims to be someone close to you'),
      why: bi('Die Masche beginnt immer gleich: Handy kaputt oder verloren, das hier ist die neue Nummer, bitte gleich einspeichern. Das Einspeichern ist Teil des Tricks — danach steht bei jeder weiteren Nachricht der vertraute Name im Display.',
              'The con always opens the same way: phone broken or lost, this is the new number, please save it right away. Saving it is part of the trick — from then on every further message shows a familiar name.'),
    },
    noVoice: {
      label: bi('Anrufen ist angeblich unmöglich',
                'Calling is supposedly impossible'),
      why: bi('Die Stimme würde alles in drei Sekunden beenden. Deshalb ist immer das Mikro kaputt, der Akku leer, die Verbindung schlecht oder „ich bin gerade in der Vorlesung".',
              'A voice would end the whole thing in three seconds. So the mic is always broken, the battery flat, the signal bad, or “I am in a lecture right now”.'),
    },
    urgency: {
      label: bi('Extremer Zeitdruck: „muss heute noch raus"',
                'Extreme time pressure: “it has to go out today”'),
      why: bi('Die Frist ist erfunden und dient nur dazu, den einen Anruf zu verhindern, der alles klären würde. Keine echte Rechnung geht am selben Abend ins Inkasso.',
              'The deadline is invented and exists purely to prevent the one phone call that would settle everything. No real bill goes to debt collection the same evening.'),
    },
    strangeName: {
      label: bi('Das Geld soll an einen fremden Namen gehen',
                'The money is supposed to go to a stranger’s name'),
      why: bi('„Das ist das Konto eines Kollegen" ist keine Erklärung, sondern ein Geständnis. Das Konto gehört meist einem Finanzagenten, der seine Kontodaten für ein paar hundert Euro vermietet hat.',
              '“That is a colleague’s account” is not an explanation, it is a confession. The account usually belongs to a money mule who rented out their details for a few hundred euros.'),
    },
    emotion: {
      label: bi('Gefühlsdruck statt Fakten',
                'Emotional pressure instead of facts'),
      why: bi('„Bitte Mama, ich bin echt verzweifelt" ersetzt jede Prüfung. Sobald du dich schlecht fühlst, hörst du auf, Fragen zu stellen — genau dafür sind die Sätze da.',
              '“Please Mum, I am desperate” replaces every check. The moment you feel bad you stop asking questions — which is exactly what those sentences are for.'),
    },
    instant: {
      label: bi('Sofortüberweisung statt normaler Überweisung',
                'Instant transfer rather than a normal one'),
      why: bi('Eine Echtzeitüberweisung ist in Sekunden auf dem Zielkonto und praktisch nicht zurückholbar. Eine normale Überweisung hätte eine Nacht Vorlauf — genau die will die andere Seite nicht.',
              'An instant transfer reaches the target account in seconds and is virtually impossible to recall. A normal transfer would take a night — which is exactly what the other side does not want.'),
    },
    followUp: {
      label: bi('Nach der ersten Zahlung kommt sofort die zweite',
                'A second demand follows the first immediately'),
      why: bi('Wer einmal überwiesen hat, gilt als zahlungsbereit. Die Nachforderung kommt oft schon Minuten später und wird so lange wiederholt, bis jemand misstrauisch wird.',
              'Anyone who has transferred once is marked as willing. The follow-up demand often arrives within minutes and keeps repeating until somebody gets suspicious.'),
    },
  },

  start: 'n1',
  nodes: {

    /* ============ Kapitel 1: Die neue Nummer ============ */

    n1: {
      chapter: bi('Kapitel 1 — Die neue Nummer', 'Chapter 1 — The new number'),
      messages: [
        { kind: 'system', text: bi(
          'Dienstag, 18:42. Dein Sohn Jonas studiert seit September in Leipzig. Ihr schreibt euch fast täglich.',
          'Tuesday, 18:42. Your son Jonas has been studying in Leipzig since September. You message each other almost daily.') },
        { from: 'them', time: '18:42', text: bi(
          'Hallo Mama, mein altes Handy ist runtergefallen und geht nicht mehr an 😭 Das hier ist meine neue Nummer, speicher sie bitte gleich ein.',
          'Hi Mum, I dropped my old phone and it will not switch on 😭 This is my new number, please save it right away.') },
      ],
      flags: ['newNumber'],
      tactic: 'familiarity',
      info: {
        icon: '🎭',
        title: bi('Warum ausgerechnet „Mama"?', 'Why “Mum” specifically?'),
        body: [
          bi('Die Nachricht nennt bewusst keinen Namen. „Mama" passt auf Millionen Empfängerinnen — und wer antwortet, bestätigt damit gleich zwei Dinge: dass die Nummer aktiv ist und dass es ein Kind gibt.',
             'The message deliberately names nobody. “Mum” fits millions of recipients — and anyone who replies confirms two things at once: that the number is live and that there is a child.'),
          bi('Oft nennst du den Namen dann selbst („Jonas, bist du das?"). Ab da kann die Gegenseite ihn benutzen, als hätte sie ihn immer gewusst.',
             'Often you supply the name yourself (“Jonas, is that you?”). From then on the other side can use it as though they had always known it.'),
        ],
      },
      prompt: bi('Die Nachricht klingt nach ihm. Was antwortest du?',
                 'The message sounds like him. What do you reply?'),
      choices: [
        { text: bi('„Oh nein, Jonas! Klar, ist gespeichert."',
                   '“Oh no, Jonas! Sure, saved.”'),
          next: 'n2_hook', risk: 2, verdict: 'bad',
          why: bi('Du hast den Namen selbst geliefert. Ab jetzt heißt der Kontakt in deinem Telefon „Jonas" — und jede weitere Nachricht sieht aus, als käme sie von ihm.',
                  'You supplied the name yourself. From now on the contact is called “Jonas” in your phone — and every further message looks as though it comes from him.') },
        { text: bi('Auf der alten, gespeicherten Nummer anrufen',
                   'Ring the old, saved number'),
          next: 'end_call', risk: -2, verdict: 'good', catches: ['newNumber', 'noVoice'],
          why: bi('Der eine Griff, der die ganze Masche zerlegt. Er kostet dreißig Sekunden und funktioniert in jeder Variante dieser Geschichte.',
                  'The single move that dismantles the entire con. It costs thirty seconds and works in every variant of this story.') },
        { text: bi('„Wer ist da? Wie heißt du?"',
                   '“Who is this? What is your name?”'),
          next: 'n1_probe', risk: 0, verdict: 'good', catches: ['newNumber'],
          why: bi('Nachfragen kostet nichts und bringt das Skript durcheinander. Die Antwort darauf ist meistens schon verräterisch.',
                  'Asking costs nothing and throws the script off. The answer is usually a giveaway in itself.') },
      ],
    },

    n1_probe: {
      messages: [
        { from: 'them', time: '18:44', text: bi(
          'Mama bitte, ich bins doch 🙈 Dein Großer. Ich kann gerade nicht telefonieren, das Mikro ist hin.',
          'Mum come on, it is me 🙈 Your eldest. I cannot talk right now, the mic is broken.') },
      ],
      flags: ['noVoice'],
      tactic: 'distraction',
      prompt: bi('Kein Name. Und telefonieren geht angeblich nicht.',
                 'No name given. And apparently calling is impossible.'),
      choices: [
        { text: bi('Eine Frage stellen, die nur Jonas beantworten kann',
                   'Ask something only Jonas could answer'),
          next: 'end_unmasked', risk: -2, verdict: 'good', catches: ['newNumber', 'noVoice'],
          why: bi('Ein Detail aus dem Alltag — wie der Hund heißt, was es an Weihnachten gab. Daran scheitert jeder Betrüger, weil er nur das Skript hat, nicht die Familie.',
                  'A detail from everyday life — the dog’s name, what you had at Christmas. Every scammer fails on that, because they have the script, not the family.') },
        { text: bi('Eine Sprachnachricht verlangen',
                   'Ask for a voice message'),
          next: 'n1_voice', risk: -1, verdict: 'good', catches: ['noVoice'],
          why: bi('Clever: Eine Sprachnachricht braucht kein funktionierendes Mikro für ein Telefonat, sondern nur das Handy, mit dem gerade getippt wird.',
                  'Clever: a voice message does not need a working call, only the phone that is currently typing.') },
        { text: bi('„Ach so, na klar." Weiterschreiben',
                   '“Oh right, of course.” Keep chatting'),
          next: 'n2_hook', risk: 2, verdict: 'bad',
          why: bi('Du hast die Ausrede akzeptiert, obwohl die Ausrede der eigentliche Beweis war. Ein kaputtes Mikro ist kein Zufall, sondern ein notwendiger Bestandteil.',
                  'You accepted the excuse even though the excuse was the actual evidence. A broken mic is not a coincidence, it is a structural necessity.') },
      ],
    },

    n1_voice: {
      messages: [
        { from: 'them', time: '18:47', text: bi(
          'Mensch Mama, ich hab doch gesagt das Mikro geht nicht 🙄 Warum glaubst du mir nicht?',
          'Mum, I told you the mic is broken 🙄 Why do you not believe me?') },
      ],
      flags: ['noVoice', 'emotion'],
      tactic: 'fear',
      info: {
        icon: '🔄',
        title: bi('Umkehr: aus deiner Frage wird dein Fehler',
                  'Reversal: your question becomes your fault'),
        body: [
          bi('Sobald du prüfst, wird nicht die Behauptung verteidigt, sondern dein Misstrauen zum Thema gemacht. Das ist kein Zufall, sondern eine Standardantwort im Skript.',
             'The moment you check, the claim is not defended — your suspicion becomes the topic instead. That is not coincidence, it is a standard line in the script.'),
          bi('Ein echtes Kind wäre genervt und würde trotzdem eine Sprachnachricht schicken. Wer stattdessen nur Vorwürfe schickt, hat keine Stimme, die passt.',
             'A real child would be annoyed and send the voice message anyway. Anyone who sends only reproaches has no matching voice to send.'),
        ],
      },
      prompt: bi('Kein Ton, dafür Vorwürfe.', 'No audio, just reproach.'),
      choices: [
        { text: bi('Dabei bleiben und auf der alten Nummer anrufen',
                   'Hold the line and ring the old number'),
          next: 'end_call', risk: -2, verdict: 'good', catches: ['noVoice', 'newNumber', 'emotion'],
          why: bi('Konsequent geblieben. Wer aus deiner berechtigten Frage deinen Fehler macht, hat etwas zu verbergen.',
                  'You stayed consistent. Anyone who turns your fair question into your failing has something to hide.') },
        { text: bi('Nachgeben, du willst nicht misstrauisch wirken',
                   'Give in, you do not want to seem suspicious'),
          next: 'n2_hook', risk: 2, verdict: 'bad',
          why: bi('Genau darauf zielt die Umkehr: dass dir dein eigenes Misstrauen unangenehmer ist als das Risiko.',
                  'That is exactly what the reversal aims at: making you more uncomfortable with your own suspicion than with the risk.') },
      ],
    },

    /* ============ Kapitel 2: Die Bitte ============ */

    n2_hook: {
      chapter: bi('Kapitel 2 — Die Bitte', 'Chapter 2 — The request'),
      messages: [
        { from: 'them', time: '18:51', text: bi(
          'Du, ich hab ein Problem. Beim Einrichten vom neuen Handy komm ich nicht ins Online-Banking, die App will eine Freischaltung und das dauert drei Tage.',
          'Listen, I have a problem. Setting up the new phone I cannot get into online banking, the app wants a re-activation and that takes three days.') },
        { from: 'them', time: '18:52', text: bi(
          'Und heute läuft die Rechnung für die Studienbeiträge ab. 1.480 €. Kannst du das kurz für mich überweisen? Ich geb dir das Freitag zurück, versprochen.',
          'And the invoice for my student fees is due today. €1,480. Could you transfer it for me just this once? I will pay you back on Friday, promise.') },
        { from: 'them', time: '18:52', text: bi('Es muss heute noch raus, sonst kommt das Inkasso 😰',
                                                'It has to go out today, otherwise it goes to debt collection 😰') },
      ],
      flags: ['urgency', 'emotion'],
      tactic: 'urgency',
      info: {
        icon: '🧩',
        title: bi('Die Geschichte ist so gebaut, dass sie jede Prüfung blockiert',
                  'The story is built to block every check'),
        body: [
          bi('Kein Telefon (also kein Anruf), kein Online-Banking (also kann er nicht selbst zahlen), heute fällig (also keine Zeit zum Nachdenken). Jedes Element schließt genau einen Ausweg.',
             'No phone (so no call), no online banking (so he cannot pay himself), due today (so no time to think). Each element closes off exactly one escape route.'),
          bi('Wenn eine Geschichte zufällig alle Prüfmöglichkeiten gleichzeitig ausschließt, ist das kein Pech. Das ist die Konstruktion.',
             'When a story happens to rule out every means of checking at once, that is not bad luck. That is the design.'),
        ],
      },
      prompt: bi('1.480 €, heute noch.', '€1,480, today.'),
      choices: [
        { text: bi('„Ich ruf dich kurz an, dann klären wir das."',
                   '“Let me just call you and we will sort it out.”'),
          next: 'n2_refuse', risk: -1, verdict: 'good', catches: ['noVoice', 'urgency'],
          why: bi('Beim Anruf bricht die Geschichte zusammen. Deshalb wird er gleich abgelehnt werden — und genau diese Ablehnung ist die Bestätigung.',
                  'The story collapses on a call. Which is why the call is about to be refused — and that refusal is the confirmation.') },
        { text: bi('Jonas anrufen — auf der alten Nummer',
                   'Call Jonas — on the old number'),
          next: 'end_call', risk: -2, verdict: 'good', catches: ['newNumber', 'noVoice', 'urgency'],
          why: bi('Auch spät im Gespräch rettet dieser Anruf noch alles. Es ist nie zu spät, ihn zu machen.',
                  'Even this late in the conversation that call still saves everything. It is never too late to make it.') },
        { text: bi('„Okay, schick mir die Daten."',
                   '“Okay, send me the details.”'),
          next: 'n3_iban', risk: 3, verdict: 'bad',
          why: bi('Ab hier geht es nur noch darum, wie schnell das Geld weg ist. Die Frage nach dem „Wie" hat die Frage nach dem „Ob" übersprungen.',
                  'From here it is only a question of how fast the money goes. Asking “how” skipped straight past asking “whether”.') },
      ],
    },

    n2_refuse: {
      messages: [
        { from: 'them', time: '18:53', text: bi(
          'Nein bitte nicht anrufen, das Mikro ist doch kaputt!! Kannst du nicht einfach überweisen? Ich brauch dich gerade wirklich 😭',
          'No please do not call, the mic is broken!! Can you not just transfer it? I really need you right now 😭') },
        { from: 'them', time: '18:54', text: bi('Bitte erzähl Papa nichts davon, das ist mir so peinlich.',
                                                'Please do not tell Dad about this, I feel awful about it.') },
      ],
      flags: ['noVoice', 'emotion'],
      tactic: 'isolation',
      info: {
        icon: '🤫',
        title: bi('Die Bitte um Geheimhaltung ist das deutlichste Signal',
                  'The request for secrecy is the clearest signal of all'),
        body: [
          bi('Sobald jemand darum bittet, eine Geldsache für sich zu behalten, ist die Sache entschieden. Eine zweite Person im Raum erkennt diese Masche in zwei Minuten — deshalb soll es keine zweite Person geben.',
             'The moment somebody asks you to keep a money matter to yourself, the case is settled. A second person in the room spots this con in two minutes — which is why there must be no second person.'),
          bi('Das gilt genauso am Telefon („bitte nicht auflegen") und im Anlagebetrug („Ihre Bank wird versuchen, Sie davon abzubringen").',
             'The same applies on the phone (“please do not hang up”) and in investment fraud (“your bank will try to talk you out of this”).'),
        ],
      },
      prompt: bi('Ein kaputtes Mikro verhindert kein Zuhören. Und niemand soll davon erfahren.',
                 'A broken microphone does not stop you listening. And nobody is supposed to find out.'),
      choices: [
        { text: bi('Trotzdem anrufen — auf der alten Nummer',
                   'Call anyway — on the old number'),
          next: 'end_call', risk: -2, verdict: 'good', catches: ['noVoice', 'emotion', 'urgency'],
          why: bi('Konsequent geblieben. Genau das bricht die Masche — und zwar jede Variante davon.',
                  'You stayed consistent. That is what breaks the con — every variant of it.') },
        { text: bi('Deinen Mann fragen, was er davon hält',
                   'Ask your husband what he makes of it'),
          next: 'end_second_pair', risk: -2, verdict: 'good', catches: ['emotion', 'newNumber'],
          why: bi('Die Bitte um Geheimhaltung zu ignorieren ist der wirksamste Gegenzug überhaupt. Von außen ist die Masche sofort sichtbar.',
                  'Ignoring the request for secrecy is the single most effective counter-move. From the outside the con is instantly visible.') },
        { text: bi('Nachgeben, das Weinen macht dich fertig',
                   'Give in, the crying is getting to you'),
          next: 'n3_iban', risk: 3, verdict: 'bad',
          why: bi('Der Gefühlsdruck ist kein Versehen, er ist das Werkzeug. Er wird genau so lange erhöht, bis jemand zahlt.',
                  'The emotional pressure is not accidental, it is the tool. It gets turned up until somebody pays.') },
      ],
    },

    /* ============ Kapitel 3: Die Überweisung ============ */

    n3_iban: {
      chapter: bi('Kapitel 3 — Die Überweisung', 'Chapter 3 — The transfer'),
      messages: [
        { from: 'them', time: '18:57', text: bi(
          'Danke ❤️ IBAN: DE21 3007 0024 0918 3320 11 — Empfänger: A. Kowalczyk. Das ist das Konto von meinem Mitbewohner, meins geht ja gerade nicht.',
          'Thank you ❤️ IBAN: DE21 3007 0024 0918 3320 11 — recipient: A. Kowalczyk. It is my flatmate’s account, mine is not working right now.') },
        { from: 'them', time: '18:57', text: bi('Bitte als Echtzeitüberweisung, sonst kommt es zu spät an.',
                                                'Please send it as an instant transfer, otherwise it arrives too late.') },
      ],
      flags: ['strangeName', 'instant'],
      tactic: 'distraction',
      info: {
        icon: '🏦',
        title: bi('Wem gehört so ein Konto eigentlich?',
                  'Who actually owns an account like that?'),
        body: [
          bi('Meist einem sogenannten Finanzagenten: einer echten Person, die ihr Konto für ein paar hundert Euro zur Verfügung stellt, oft angeworben über ein angebliches Job-Angebot von zu Hause.',
             'Usually a money mule: a real person who rents out their account for a few hundred euros, often recruited through a supposed work-from-home job offer.'),
          bi('Das Geld wird binnen Minuten weiter ins Ausland geschoben. Der Finanzagent macht sich strafbar, hat aber selbst kaum etwas davon — und dein Geld ist trotzdem weg.',
             'The money is pushed abroad within minutes. The mule is committing a crime but sees almost none of it — and your money is gone all the same.'),
          bi('Deshalb gilt: Der Empfängername muss zu der Person passen, für die du zahlst. Passt er nicht, zahlst du nicht.',
             'So the rule is: the recipient name has to match the person you are paying for. If it does not match, you do not pay.'),
        ],
      },
      prompt: bi('Ein fremder Name. Und es soll sofort raus.',
                 'A stranger’s name. And it has to go out instantly.'),
      choices: [
        { text: bi('Stopp. Ein fremder Name ist der Beweis',
                   'Stop. A stranger’s name is the proof'),
          next: 'end_caught_late', risk: -2, verdict: 'good', catches: ['strangeName', 'instant'],
          why: bi('Im letzten Moment gemerkt. Kein Student überweist seine eigene Studienrechnung auf das Konto eines Dritten.',
                  'Caught at the last moment. No student pays their own tuition invoice into a third party’s account.') },
        { text: bi('Normal überweisen statt in Echtzeit',
                   'Send a normal transfer instead of an instant one'),
          next: 'n3_normal', risk: 1, verdict: 'meh',
          why: bi('Klüger als Echtzeit: Eine normale Überweisung lässt sich am nächsten Morgen oft noch stoppen. Aber die eigentliche Frage bleibt unbeantwortet.',
                  'Smarter than instant: a normal transfer can often still be stopped the next morning. But the actual question is still unanswered.') },
        { text: bi('1.480 € als Echtzeitüberweisung senden',
                   'Send €1,480 as an instant transfer'),
          next: 'n4_sent', risk: 3, verdict: 'bad',
          why: bi('Echtzeit heißt: in Sekunden auf einem fremden Konto und meist sofort weiter ins Ausland. Danach gibt es fast nichts mehr zu holen.',
                  'Instant means: in a stranger’s account within seconds and usually straight abroad. After that there is almost nothing left to recover.') },
      ],
    },

    n3_normal: {
      messages: [
        { from: 'them', time: '19:04', text: bi(
          'Das dauert doch zu lange!! Kannst du es nicht nochmal als Echtzeit schicken? Bitte!!',
          'That takes far too long!! Can you not send it again as an instant transfer? Please!!') },
      ],
      flags: ['instant', 'urgency'],
      tactic: 'urgency',
      prompt: bi('Die Panik über die Zahlart ist auffällig groß.',
                 'The panic about the payment method is remarkably intense.'),
      choices: [
        { text: bi('Genau das ist verdächtig — Bank anrufen und stoppen',
                   'That is exactly what is suspicious — call the bank and stop it'),
          next: 'end_stopped', risk: -2, verdict: 'good', catches: ['instant', 'urgency', 'strangeName'],
          why: bi('Wer sich über die Zahlart aufregt statt über die Sache, sorgt sich um die Rückholbarkeit. Das ist ein Geständnis.',
                  'Anyone who gets agitated about the payment method rather than the matter itself is worried about reversibility. That is a confession.') },
        { text: bi('Nochmal senden, diesmal in Echtzeit',
                   'Send it again, instant this time'),
          next: 'n4_sent', risk: 3, verdict: 'bad',
          why: bi('Jetzt sind 2.960 € unterwegs. Die erste Überweisung wäre noch zu stoppen gewesen.',
                  'Now €2,960 is on its way. The first transfer could still have been stopped.') },
      ],
    },

    n4_sent: {
      messages: [
        { kind: 'system', text: bi('Überweisung ausgeführt. 18:59 Uhr.', 'Transfer completed. 18:59.') },
        { from: 'them', time: '19:02', text: bi(
          'Danke!! 🥰 Du, es kam gerade noch eine zweite Rechnung rein, die Rückstände vom letzten Semester. 890 €. Geht das auch noch?',
          'Thank you!! 🥰 Listen, a second invoice just came in, arrears from last semester. €890. Could you do that one too?') },
      ],
      flags: ['followUp'],
      tactic: 'commitment',
      info: {
        icon: '🪜',
        title: bi('Warum immer eine zweite Forderung kommt',
                  'Why there is always a second demand'),
        body: [
          bi('Die erste Zahlung ist der Test. Wer sie leistet, wird als zahlungsbereit eingestuft — und bekommt sofort die nächste Rechnung, oft noch am selben Abend.',
             'The first payment is the test. Anyone who makes it is classified as willing — and gets the next invoice immediately, often the same evening.'),
          bi('Die Nachforderung ist deshalb paradoxerweise eine gute Nachricht: Sie ist der Moment, in dem die meisten Menschen misstrauisch werden — und noch etwas retten können.',
             'Paradoxically that follow-up is good news: it is the moment most people get suspicious — and can still save something.'),
        ],
      },
      prompt: bi('Eine zweite Forderung, drei Minuten nach der ersten.',
                 'A second demand, three minutes after the first.'),
      choices: [
        { text: bi('Jetzt reicht es — Bank anrufen und Rückruf beantragen',
                   'Enough — call the bank and request a recall'),
          next: 'end_partial', risk: 0, verdict: 'good', catches: ['followUp', 'strangeName'],
          why: bi('Die Nachforderung ist das klassische Erkennungszeichen. Sofort die Bank anrufen — in den ersten Stunden ist ein Rückruf noch möglich.',
                  'The follow-up demand is the classic tell. Call the bank at once — in the first few hours a recall is still possible.') },
        { text: bi('Auch die 890 € überweisen',
                   'Transfer the €890 as well'),
          next: 'end_scammed', risk: 3, verdict: 'bad',
          why: bi('Nach dem ersten Erfolg wird immer nachgelegt, bis das Konto leer ist oder jemand Nein sagt.',
                  'After the first success they always come back, until the account is empty or somebody says no.') },
      ],
    },

    /* ============ Ausgänge ============ */

    end_call: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'Jonas geht nach zweimal Klingeln ran. Handy heil, alles gut, keine Rechnung. Er lacht und sagt, das hätten drei Leute aus seinem Kurs auch schon bekommen.',
          'Jonas picks up after two rings. Phone fine, all good, no invoice. He laughs and says three people on his course got the same thing.') },
      ],
      damage: bi('0 € — ein Anruf hat gereicht', '€0 — one phone call was enough'),
      lessons: [
        bi('Immer auf der alten, gespeicherten Nummer zurückrufen — nie auf der neuen.',
           'Always call back on the old, saved number — never the new one.'),
        bi('„Ich kann gerade nicht telefonieren" ist bei dieser Masche das häufigste Erkennungszeichen.',
           '“I cannot talk right now” is the most common tell in this con.'),
        bi('Ein Codewort in der Familie vereinbaren. Kostet nichts, wirkt sofort, funktioniert auch bei gefälschten Stimmen.',
           'Agree a family code word. Costs nothing, works instantly, and holds up even against faked voices.'),
      ],
    },

    end_unmasked: {
      outcome: 'safe',
      messages: [
        { from: 'them', time: '18:46', text: bi('?? Mama was soll die Frage jetzt', '?? Mum what kind of question is that') },
        { kind: 'system', text: bi(
          'Keine Antwort auf die Frage. Fünf Minuten später ist der Chat gelöscht und die Nummer nicht mehr erreichbar.',
          'No answer to the question. Five minutes later the chat is deleted and the number unreachable.') },
      ],
      damage: bi('0 € — Betrüger enttarnt', '€0 — scammer unmasked'),
      lessons: [
        bi('Eine Frage aus dem echten Leben knackt jede dieser Nachrichten in Sekunden.',
           'One question from real life cracks every message of this kind within seconds.'),
        bi('Betrüger kennen das Skript, nicht deine Familie.',
           'Scammers know the script, not your family.'),
        bi('Sofortiges Verschwinden nach einer Rückfrage ist die Bestätigung, dass es richtig war.',
           'Vanishing the moment you ask a question is confirmation that you were right to ask.'),
      ],
    },

    end_second_pair: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'Dein Mann liest zwei Nachrichten und sagt: „Ruf ihn doch einfach an." Jonas geht sofort ran. Alles in Ordnung.',
          'Your husband reads two messages and says: “Why not just call him?” Jonas picks up straight away. Everything is fine.') },
      ],
      damage: bi('0 € — die zweite Meinung hat es sofort gesehen', '€0 — the second opinion saw it immediately'),
      lessons: [
        bi('Die Bitte um Geheimhaltung ist selbst das Erkennungszeichen.',
           'The request for secrecy is itself the tell.'),
        bi('Von außen ist diese Masche in zwei Minuten sichtbar. Deshalb soll niemand von außen dazukommen.',
           'From the outside this con is visible in two minutes. Which is why nobody from outside is meant to join in.'),
        bi('Bei Geldforderungen per Nachricht immer eine zweite Person fragen — auch wenn es peinlich wirkt.',
           'With any money request by message, always ask a second person — even when it feels embarrassing.'),
      ],
    },

    end_caught_late: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi('Du überweist nichts. Der Kontakt schreibt noch dreimal, dann nie wieder.',
                                   'You transfer nothing. The contact writes three more times, then never again.') },
      ],
      damage: bi('0 € — kurz vor Schluss gestoppt', '€0 — stopped just in time'),
      lessons: [
        bi('Ein fremder Empfängername ist ein Abbruchgrund, keine Randnotiz.',
           'A stranger’s name on the recipient line is a reason to stop, not a footnote.'),
        bi('Echtzeitüberweisungen sind praktisch endgültig. Im Zweifel normal überweisen — oder gar nicht.',
           'Instant transfers are effectively final. In doubt use a normal transfer — or none at all.'),
        bi('Der Name auf dem Konto muss zu der Person passen, für die du zahlst.',
           'The name on the account has to match the person you are paying for.'),
      ],
    },

    end_stopped: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'Die Bank stoppt die Überweisung am nächsten Morgen, bevor sie ausgeführt wird. Jonas meldet sich mittags — von seiner alten Nummer.',
          'The bank stops the transfer the next morning before it goes out. Jonas gets in touch at lunchtime — from his old number.') },
      ],
      damage: bi('0 € — Überweisung rechtzeitig gestoppt', '€0 — transfer stopped in time'),
      lessons: [
        bi('Wer sich über die Zahlart aufregt statt über die Sache, sorgt sich um die Rückholbarkeit.',
           'Anyone agitated about the payment method rather than the matter is worried about reversibility.'),
        bi('Normale Überweisungen lassen sich oft noch am nächsten Werktag stoppen. Echtzeitüberweisungen nicht.',
           'Normal transfers can often still be stopped the next working day. Instant transfers cannot.'),
      ],
    },

    end_partial: {
      outcome: 'close',
      messages: [
        { kind: 'system', text: bi(
          'Die Bank erreicht die Empfängerbank rechtzeitig. 1.480 € werden eingefroren und nach vier Wochen erstattet.',
          'Your bank reaches the receiving bank in time. €1,480 is frozen and refunded four weeks later.') },
        { kind: 'system', text: bi(
          'Jonas ruft am selben Abend an. Er hat nie eine Rechnung gehabt.',
          'Jonas calls the same evening. He never had an invoice at all.') },
      ],
      damage: bi('1.480 € überwiesen — zurückgeholt', '€1,480 sent — recovered'),
      lessons: [
        bi('Sofort die Bank anrufen. In den ersten Stunden ist ein Rückruf noch möglich.',
           'Call the bank immediately. In the first few hours a recall is still possible.'),
        bi('Die zweite Forderung ist der Moment, in dem es fast allen auffällt. Die erste wäre besser gewesen.',
           'The second demand is where almost everybody notices. The first would have been better.'),
      ],
      recover: [
        bi('Bank anrufen und ausdrücklich einen Überweisungsrückruf beantragen.',
           'Call the bank and explicitly request a payment recall.'),
        bi('Anzeige erstatten, Chatverlauf und IBAN als Screenshot sichern.',
           'File a police report and keep screenshots of the chat and the IBAN.'),
        bi('Die Nummer bei WhatsApp melden und blockieren.',
           'Report the number to WhatsApp and block it.'),
      ],
    },

    end_scammed: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi(
          '2.370 € sind weg. Am nächsten Morgen ruft Jonas an — von seinem eigenen, völlig intakten Handy.',
          '€2,370 gone. The next morning Jonas calls — from his own, perfectly working phone.') },
        { kind: 'system', text: bi(
          'Die Bank kann nichts mehr zurückholen. Das Empfängerkonto wurde am Vorabend leergeräumt.',
          'The bank cannot recover anything. The receiving account was emptied the previous evening.') },
      ],
      flags: ['followUp'],
      damage: bi('2.370 € überwiesen', '€2,370 transferred'),
      lessons: [
        bi('Diese Masche lebt davon, dass niemand anruft. Ein Anruf hätte 2.370 € gespart.',
           'This con survives on nobody making a phone call. One call would have saved €2,370.'),
        bi('Nach der ersten Zahlung kommt immer eine zweite Forderung.',
           'After the first payment there is always a second demand.'),
        bi('Sich nicht schämen: Diese Masche trifft täglich Hunderte, quer durch alle Altersgruppen und Bildungsgrade.',
           'Do not feel ashamed: this con catches hundreds of people a day, across every age group and level of education.'),
      ],
      recover: [
        bi('Sofort die Bank anrufen und einen Rückruf der Überweisung beantragen.',
           'Call the bank immediately and request a recall of the transfer.'),
        bi('Anzeige erstatten — mit Screenshots, IBAN und Empfängernamen.',
           'File a police report — with screenshots, the IBAN and the recipient name.'),
        bi('Darüber reden. Wer schweigt, wird in einigen Monaten erneut kontaktiert.',
           'Talk about it. People who stay silent get contacted again a few months later.'),
      ],
    },
  },
};
