import { bi } from '../bi.js';

/** Story 2 — „Hallo Mama, neue Nummer" (Schockanruf per WhatsApp). */
export default {
  id: 'hallo-mama',
  icon: '📱',
  channel: 'whatsapp',
  difficulty: 2,
  title: bi('Hallo Mama, neue Nummer', 'Hi Mum, New Number'),
  teaser: bi(
    'Dein Kind hat angeblich das Handy verloren. Und braucht dringend Geld.',
    'Your child has supposedly lost their phone. And urgently needs money.'),
  contact: {
    name: bi('+49 1522 7719004', '+49 1522 7719004'),
    sub: bi('Neue Nummer · zuletzt online gerade eben', 'New number · last seen just now'),
  },

  redFlags: {
    newNumber: {
      label: bi('Fremde Nummer behauptet, jemand Vertrautes zu sein',
                'An unknown number claims to be someone close to you'),
      why: bi('Die Masche beginnt immer gleich: altes Handy kaputt, das hier ist die neue Nummer, bitte speichern.',
              'The con always opens the same way: old phone broken, this is the new number, please save it.'),
    },
    noVoice: {
      label: bi('Anrufen ist angeblich unmöglich',
                'Calling is supposedly impossible'),
      why: bi('Die Stimme würde alles auffliegen lassen. Deshalb ist das Mikro immer kaputt, der Akku leer, die Verbindung schlecht.',
              'A voice would blow the whole thing. So the mic is always broken, the battery flat, the signal bad.'),
    },
    urgency: {
      label: bi('Extremer Zeitdruck: „muss heute noch raus"',
                'Extreme time pressure: “it has to go out today”'),
      why: bi('Eile verhindert genau den einen Anruf, der alles klären würde.',
              'Hurry prevents the one phone call that would settle everything.'),
    },
    strangeName: {
      label: bi('Das Geld soll an einen fremden Namen gehen',
                'The money is supposed to go to a stranger’s name'),
      why: bi('„Das ist das Konto meines Kollegen" ist keine Erklärung, sondern ein Geständnis.',
              '“That is my colleague’s account” is not an explanation, it is a confession.'),
    },
    emotion: {
      label: bi('Gefühlsdruck statt Fakten',
                'Emotional pressure instead of facts'),
      why: bi('„Bitte Mama, ich bin echt verzweifelt" ersetzt jede Prüfung. Genau dafür ist es da.',
              '“Please Mum, I am desperate” replaces every check. That is exactly its job.'),
    },
    instant: {
      label: bi('Sofortüberweisung statt normaler Überweisung',
                'Instant transfer rather than a normal one'),
      why: bi('Eine Sofortüberweisung ist in Sekunden weg und praktisch nicht zurückholbar.',
              'An instant transfer is gone in seconds and is virtually impossible to claw back.'),
    },
  },

  start: 'n1',
  nodes: {

    n1: {
      messages: [
        { from: 'them', time: '18:42', text: bi(
          'Hallo Mama, mein altes Handy ist runtergefallen und geht nicht mehr 😭 Das hier ist meine neue Nummer, speicher sie bitte ein.',
          'Hi Mum, I dropped my old phone and it is dead 😭 This is my new number, please save it.') },
      ],
      flags: ['newNumber'],
      prompt: bi('Du hast tatsächlich ein Kind in dem Alter. Was antwortest du?',
                 'You do have a child that age. What do you reply?'),
      choices: [
        { text: bi('„Oh nein! Klar, ist gespeichert. Alles okay bei dir?"',
                   '“Oh no! Sure, saved. Are you all right?”'),
          next: 'n2_hook', risk: 2, verdict: 'bad',
          why: bi('Du hast bestätigt, dass die Masche sitzt — und ganz nebenbei, dass du ein Kind hast.',
                  'You confirmed the con is working — and, incidentally, that you have a child.') },
        { text: bi('Auf der alten Nummer anrufen',
                   'Ring the old number'),
          next: 'n2_call', risk: -1, verdict: 'good', catches: ['newNumber', 'noVoice'],
          why: bi('Der eine Griff, der die ganze Masche zerlegt. Kostet dreißig Sekunden.',
                  'The single move that dismantles the whole con. Takes thirty seconds.') },
        { text: bi('„Wer ist da? Wie heißt du?"',
                   '“Who is this? What is your name?”'),
          next: 'n2_probe', risk: 0, verdict: 'good', catches: ['newNumber'],
          why: bi('Betrüger kennen den Namen nicht. Sie weichen aus oder raten.',
                  'Scammers do not know the name. They dodge the question or guess.') },
      ],
    },

    n2_probe: {
      messages: [
        { from: 'them', time: '18:44', text: bi(
          'Mama bitte, ich bins doch 🙈 Dein Großer. Ich kann gerade nicht telefonieren, das Mikro ist hin.',
          'Mum come on, it is me 🙈 Your eldest. I cannot talk right now, the mic is broken.') },
      ],
      flags: ['noVoice'],
      prompt: bi('Kein Name. Und telefonieren geht angeblich nicht.',
                 'No name given. And apparently calling is impossible.'),
      choices: [
        { text: bi('Eine Frage stellen, die nur dein Kind beantworten kann',
                   'Ask something only your child could answer'),
          next: 'end_unmasked', risk: -2, verdict: 'good', catches: ['newNumber', 'noVoice'],
          why: bi('Ein vereinbartes Codewort oder eine Erinnerung aus dem Alltag — daran scheitert jeder Betrüger.',
                  'An agreed code word or an everyday memory — every scammer fails on that.') },
        { text: bi('„Ach so, na klar." Weiterschreiben',
                   '“Oh right, of course.” Keep chatting'),
          next: 'n2_hook', risk: 2, verdict: 'bad',
          why: bi('Du hast die Ausrede akzeptiert, obwohl sie der eigentliche Beweis war.',
                  'You accepted the excuse even though the excuse was the actual evidence.') },
      ],
    },

    n2_hook: {
      messages: [
        { from: 'them', time: '18:51', text: bi(
          'Du, ich hab ein Problem. Ich hab die Handyrechnung offen und komm mit dem neuen Gerät nicht ins Online-Banking. Kannst du kurz was für mich überweisen? Ich geb dir das morgen wieder.',
          'Listen, I have a problem. There is a phone bill due and I cannot get into online banking on the new device. Could you transfer something for me? I will pay you back tomorrow.') },
        { from: 'them', time: '18:51', text: bi('1.480 €. Es muss heute noch raus, sonst kommt das Inkasso 😰',
                                                '€1,480. It has to go out today or it goes to debt collection 😰') },
      ],
      flags: ['urgency', 'emotion'],
      prompt: bi('1.480 €, heute noch.', '€1,480, today.'),
      choices: [
        { text: bi('„Ich ruf dich kurz an, dann klären wir das."',
                   '“Let me just call you and we will sort it out.”'),
          next: 'n3_refuse', risk: -1, verdict: 'good', catches: ['noVoice', 'urgency'],
          why: bi('Beim Anruf bricht die Geschichte zusammen. Deshalb wird er verweigert.',
                  'The story collapses on a phone call. That is why the call gets refused.') },
        { text: bi('„Okay, schick mir die Daten."',
                   '“Okay, send me the details.”'),
          next: 'n3_iban', risk: 3, verdict: 'bad',
          why: bi('Ab hier geht es nur noch darum, wie schnell das Geld weg ist.',
                  'From here it is only a question of how fast the money disappears.') },
        { text: bi('Das eigene Kind auf der alten Nummer anrufen',
                   'Call your actual child on the old number'),
          next: 'n2_call', risk: -2, verdict: 'good', catches: ['newNumber', 'noVoice', 'urgency'],
          why: bi('Auch spät im Gespräch rettet dieser Anruf noch alles.',
                  'Even this late in the conversation that call still saves everything.') },
      ],
    },

    n3_refuse: {
      messages: [
        { from: 'them', time: '18:53', text: bi(
          'Nein bitte nicht anrufen, das Mikro ist doch kaputt!! Kannst du nicht einfach überweisen? Ich brauch dich gerade wirklich 😭',
          'No please do not call, the mic is broken!! Can you not just transfer it? I really need you right now 😭') },
      ],
      flags: ['noVoice', 'emotion'],
      prompt: bi('Ein zerbrochenes Mikro verhindert kein Zuhören. Nur Sprechen.',
                 'A broken microphone stops you speaking. Not listening.'),
      choices: [
        { text: bi('Trotzdem anrufen — auf der alten Nummer',
                   'Call anyway — on the old number'),
          next: 'n2_call', risk: -2, verdict: 'good', catches: ['noVoice', 'emotion', 'urgency'],
          why: bi('Konsequent geblieben. Genau das bricht die Masche.',
                  'You stayed consistent. That is what breaks the con.') },
        { text: bi('Nachgeben, das Weinen macht dich fertig',
                   'Give in, the crying is getting to you'),
          next: 'n3_iban', risk: 3, verdict: 'bad',
          why: bi('Der Gefühlsdruck ist kein Versehen, er ist das Werkzeug.',
                  'The emotional pressure is not accidental. It is the tool.') },
      ],
    },

    n3_iban: {
      messages: [
        { from: 'them', time: '18:57', text: bi(
          'Danke ❤️ IBAN: DE21 3007 0024 0918 3320 11 — Empfänger: A. Kowalczyk. Das ist das Konto von meinem Kollegen, meins geht ja gerade nicht.',
          'Thank you ❤️ IBAN: DE21 3007 0024 0918 3320 11 — recipient: A. Kowalczyk. It is my colleague’s account, mine is not working right now.') },
        { from: 'them', time: '18:57', text: bi('Bitte als Echtzeitüberweisung, sonst kommt es zu spät.',
                                                'Please send it as an instant transfer, otherwise it arrives too late.') },
      ],
      flags: ['strangeName', 'instant'],
      prompt: bi('Ein fremder Name. Und es soll sofort raus.',
                 'A stranger’s name. And it has to go out instantly.'),
      choices: [
        { text: bi('Stopp. Ein fremder Name ist der Beweis',
                   'Stop. A stranger’s name is the proof'),
          next: 'end_caught_late', risk: -2, verdict: 'good', catches: ['strangeName', 'instant'],
          why: bi('Im letzten Moment gemerkt. Kein Kind überweist die eigene Rechnung an einen Fremden.',
                  'Caught at the last moment. No child pays their own bill into a stranger’s account.') },
        { text: bi('1.480 € als Echtzeitüberweisung senden',
                   'Send €1,480 as an instant transfer'),
          next: 'n4_sent', risk: 3, verdict: 'bad',
          why: bi('Echtzeit heißt: in Sekunden auf einem fremden Konto und meist sofort weiter ins Ausland.',
                  'Instant means: in a stranger’s account within seconds and usually straight abroad.') },
      ],
    },

    n4_sent: {
      messages: [
        { kind: 'system', text: bi('Überweisung ausgeführt. 18:59 Uhr.', 'Transfer completed. 18:59.') },
        { from: 'them', time: '19:02', text: bi(
          'Danke!! 🥰 Du, es kam noch eine zweite Rechnung rein, 890 €. Geht das auch noch?',
          'Thank you!! 🥰 Listen, a second bill just came in, €890. Could you do that one too?') },
      ],
      flags: ['emotion'],
      prompt: bi('Eine zweite Forderung, direkt hinterher.',
                 'A second demand, straight after the first.'),
      choices: [
        { text: bi('Jetzt reicht es — Bank anrufen und Rückruf beantragen',
                   'Enough — call the bank and request a recall'),
          next: 'end_partial', risk: 0, verdict: 'good', catches: ['strangeName'],
          why: bi('Die Nachforderung ist das klassische Erkennungszeichen. Sofort die Bank anrufen.',
                  'The follow-up demand is the classic tell. Call the bank at once.') },
        { text: bi('Auch die 890 € überweisen',
                   'Transfer the €890 as well'),
          next: 'end_scammed', risk: 3, verdict: 'bad',
          why: bi('Nach dem ersten Erfolg wird immer nachgelegt, bis das Konto leer ist.',
                  'After the first success they always come back, until the account is empty.') },
      ],
    },

    /* ---------- Enden ---------- */

    n2_call: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi('Dein Kind geht nach zweimal Klingeln ran. Handy heil, alles gut, keine Rechnung.',
                                   'Your child picks up after two rings. Phone fine, all good, no bill.') },
      ],
      damage: bi('0 € — ein Anruf hat gereicht', '€0 — one phone call was enough'),
      lessons: [
        bi('Immer auf der alten, gespeicherten Nummer zurückrufen — nie auf der neuen.',
           'Always ring back on the old, saved number — never the new one.'),
        bi('„Ich kann nicht telefonieren" ist bei dieser Masche das häufigste Erkennungszeichen.',
           '“I cannot talk right now” is the single most common tell in this con.'),
        bi('Ein Codewort in der Familie vereinbaren. Kostet nichts, wirkt sofort.',
           'Agree a family code word. Costs nothing, works instantly.'),
      ],
    },

    end_unmasked: {
      outcome: 'safe',
      messages: [
        { from: 'them', time: '18:46', text: bi('?? Mama was soll die Frage jetzt', '?? Mum what kind of question is that') },
        { kind: 'system', text: bi('Keine Antwort auf die Frage. Fünf Minuten später ist der Chat gelöscht.',
                                   'No answer to the question. Five minutes later the chat is deleted.') },
      ],
      damage: bi('0 € — Betrüger enttarnt', '€0 — scammer unmasked'),
      lessons: [
        bi('Eine Frage aus dem echten Leben knackt jede dieser Nachrichten.',
           'One question from real life cracks every message of this kind.'),
        bi('Betrüger kennen deine Familie nicht — nur den Trick.',
           'Scammers do not know your family. They only know the script.'),
      ],
    },

    end_caught_late: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi('Du überweist nichts. Der Kontakt meldet sich noch dreimal, dann nie wieder.',
                                   'You transfer nothing. The contact writes three more times, then never again.') },
      ],
      damage: bi('0 € — kurz vor Schluss gestoppt', '€0 — stopped just in time'),
      lessons: [
        bi('Ein fremder Empfängername ist ein Abbruchgrund, keine Randnotiz.',
           'A stranger’s name on the recipient line is a reason to stop, not a footnote.'),
        bi('Echtzeitüberweisungen sind praktisch endgültig. Bei Zweifeln: normale Überweisung oder gar keine.',
           'Instant transfers are effectively final. In doubt, use a normal transfer — or none.'),
      ],
    },

    end_partial: {
      outcome: 'close',
      messages: [
        { kind: 'system', text: bi('Die Bank erreicht die Empfängerbank rechtzeitig. 1.480 € werden eingefroren und nach vier Wochen erstattet.',
                                   'Your bank reaches the receiving bank in time. €1,480 is frozen and refunded four weeks later.') },
      ],
      damage: bi('1.480 € überwiesen — zurückgeholt', '€1,480 sent — recovered'),
      lessons: [
        bi('Sofort die Bank anrufen. In den ersten Stunden ist ein Rückruf noch möglich.',
           'Call the bank immediately. In the first few hours a recall is still possible.'),
        bi('Die zweite Forderung ist immer der Moment, an dem es auffällt. Besser wäre die erste gewesen.',
           'The second demand is always the moment it clicks. The first would have been better.'),
      ],
      recover: [
        bi('Bank anrufen und ausdrücklich einen Überweisungsrückruf beantragen.',
           'Call the bank and explicitly request a payment recall.'),
        bi('Anzeige bei der Polizei erstatten, Chatverlauf als Screenshot sichern.',
           'File a police report and keep screenshots of the chat.'),
        bi('Die Nummer bei WhatsApp melden und blockieren.',
           'Report the number to WhatsApp and block it.'),
      ],
    },

    end_scammed: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi('2.370 € sind weg. Am nächsten Morgen ruft dein Kind an — vom eigenen, völlig intakten Handy.',
                                   '€2,370 gone. The next morning your child calls — from their own, perfectly working phone.') },
      ],
      damage: bi('2.370 € überwiesen', '€2,370 transferred'),
      lessons: [
        bi('Diese Masche lebt davon, dass niemand anruft. Ein Anruf hätte 2.370 € gespart.',
           'This con survives on nobody making a phone call. One call would have saved €2,370.'),
        bi('Nach der ersten Zahlung kommt immer eine zweite Forderung.',
           'After the first payment there is always a second demand.'),
      ],
      recover: [
        bi('Sofort die Bank anrufen und einen Rückruf der Überweisung beantragen.',
           'Call the bank immediately and request a recall of the transfer.'),
        bi('Anzeige erstatten — mit Screenshots, IBAN und Empfängernamen.',
           'File a police report — with screenshots, the IBAN and the recipient name.'),
        bi('Sich nicht schämen. Diese Masche trifft täglich Hunderte, quer durch alle Altersgruppen.',
           'Do not feel ashamed. This con catches hundreds of people a day, across every age group.'),
      ],
    },
  },
};
