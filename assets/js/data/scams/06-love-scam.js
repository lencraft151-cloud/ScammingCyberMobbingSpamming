import { bi } from '../bi.js';

/** Story 6 — Romance-Scam: Wochen an Zuwendung, dann ein Notfall. */
export default {
  id: 'love-scam',
  icon: '💔',
  channel: 'dating',
  difficulty: 3,
  title: bi('Jemand, der dich versteht', 'Someone Who Understands You'),
  teaser: bi(
    'Sechs Wochen täglicher Nachrichten. Dann kommt der Notfall.',
    'Six weeks of daily messages. Then comes the emergency.'),
  contact: {
    name: bi('Alex, 34', 'Alex, 34'),
    sub: bi('Match seit 6 Wochen · Online', 'Matched 6 weeks ago · Online'),
  },

  redFlags: {
    fastLove: {
      label: bi('Sehr schnell sehr große Gefühle',
                'Very big feelings, very fast'),
      why: bi('„Ich habe noch nie so empfunden" nach drei Wochen ist keine Romantik, sondern Methode. Es baut Bindung auf, bevor Zweifel entstehen.',
              '“I have never felt like this” after three weeks is not romance, it is method. It builds attachment before doubt can form.'),
    },
    neverMeet: {
      label: bi('Ein Treffen platzt immer im letzten Moment',
                'Meeting up always falls through at the last minute'),
      why: bi('Es gibt keine Person, die kommen könnte. Also gibt es immer einen Grund, warum es gerade nicht geht.',
              'There is no person who could turn up. So there is always a reason why it cannot happen right now.'),
    },
    noVideo: {
      label: bi('Videoanrufe scheitern an der Technik',
                'Video calls always fail for technical reasons'),
      why: bi('Kamera kaputt, Netz zu schlecht, gerade auf See. Das Gesicht auf den Fotos gehört jemand anderem.',
              'Camera broken, signal too poor, currently at sea. The face in the photos belongs to somebody else.'),
    },
    farAway: {
      label: bi('Beruf weit weg und schwer überprüfbar',
                'A job far away and hard to check'),
      why: bi('Ölplattform, Auslandseinsatz, Chirurg im Krisengebiet — Berufe, die Abwesenheit und Notfälle plausibel machen.',
              'Oil rig, overseas posting, surgeon in a crisis zone — jobs that make both absence and emergencies plausible.'),
    },
    money: {
      label: bi('Am Ende geht es immer um Geld',
                'In the end it is always about money'),
      why: bi('Egal wie die Geschichte anfängt, sie endet bei einer Zahlung. Das ist der einzige feste Punkt.',
              'However the story begins, it ends at a payment. That is the only fixed point.'),
    },
    weirdPayment: {
      label: bi('Ungewöhnlicher Zahlungsweg',
                'An unusual way to pay'),
      why: bi('Gutscheinkarten, Krypto, Western Union, ein privates Konto: alles nicht rückholbar. Genau deshalb.',
              'Gift cards, crypto, Western Union, a private account: none of them reversible. Precisely why.'),
    },
    secrecy: {
      label: bi('„Erzähl niemandem davon"',
                '“Do not tell anyone about this”'),
      why: bi('Isolation ist Teil der Masche. Ein Außenstehender würde es in zwei Minuten erkennen.',
              'Isolation is part of the con. An outsider would spot it in two minutes.'),
    },
  },

  start: 'n1',
  nodes: {

    n1: {
      messages: [
        { kind: 'system', text: bi('Sechs Wochen. Jeden Morgen eine Nachricht, jeden Abend ein „Schlaf gut".',
                                   'Six weeks. A message every morning, a “sleep well” every night.') },
        { from: 'them', time: '07:12', text: bi(
          'Guten Morgen ☀️ Ich weiß, es ist früh für so einen Satz — aber ich habe in meinem Leben noch nie mit jemandem so reden können wie mit dir.',
          'Good morning ☀️ I know it is early to say something like this — but I have never in my life been able to talk to anyone the way I talk to you.') },
      ],
      flags: ['fastLove'],
      prompt: bi('Es fühlt sich gut an. Und es geht sehr schnell.',
                 'It feels good. And it is moving very fast.'),
      choices: [
        { text: bi('„Geht mir genauso. Wann sehen wir uns endlich?"',
                   '“Same here. When are we finally meeting?”'),
          next: 'n2_meet', risk: 0, verdict: 'good', catches: ['fastLove'],
          why: bi('Auf ein Treffen zu bestehen ist der beste Test, den es gibt.',
                  'Insisting on meeting is the single best test available.') },
        { text: bi('Das Kompliment einfach genießen',
                   'Simply enjoy the compliment'),
          next: 'n2_deeper', risk: 1, verdict: 'meh',
          why: bi('Nichts falsch daran — nur wird die Bindung mit jedem Tag teurer.',
                  'Nothing wrong with that — except the attachment gets more expensive every day.') },
        { text: bi('Das Profilbild rückwärts im Netz suchen',
                   'Run a reverse image search on the profile photo'),
          next: 'n2_search', risk: -2, verdict: 'good', catches: ['noVideo', 'fastLove'],
          why: bi('Die Bildersuche entlarvt die Mehrheit dieser Profile in unter einer Minute.',
                  'A reverse image search exposes most of these profiles in under a minute.') },
      ],
    },

    n2_search: {
      messages: [
        { kind: 'system', text: bi(
          'Dasselbe Gesicht taucht 40-mal auf: ein Fotomodell aus Portugal, dazu drei Warnseiten über Romance-Scam mit genau diesem Bild.',
          'The same face appears 40 times: a model from Portugal, plus three scam-warning pages featuring this exact picture.') },
      ],
      prompt: bi('Das Bild gehört jemand anderem.', 'The photo belongs to somebody else.'),
      choices: [
        { text: bi('Kontakt abbrechen, Profil melden',
                   'Cut contact, report the profile'),
          next: 'end_exposed', risk: -2, verdict: 'good', catches: ['noVideo', 'farAway', 'fastLove'],
          why: bi('Sauber beendet, bevor Geld oder Monate verloren gehen.',
                  'Cleanly ended, before any money or months are lost.') },
        { text: bi('Nachfragen und die Erklärung abwarten',
                   'Ask about it and wait for the explanation'),
          next: 'n2_deeper', risk: 1, verdict: 'meh',
          why: bi('Es kommt immer eine Erklärung. Sie ist nie wahr, aber sie klingt gut.',
                  'An explanation always comes. It is never true, but it sounds good.') },
      ],
    },

    n2_meet: {
      messages: [
        { from: 'them', time: '07:20', text: bi(
          'Ich will das auch so sehr 😔 Aber ich bin noch bis Ende des Monats auf der Plattform vor Norwegen. Danach komme ich direkt zu dir, versprochen.',
          'I want that so much too 😔 But I am on the rig off Norway until the end of the month. Then I am coming straight to you, I promise.') },
      ],
      flags: ['neverMeet', 'farAway'],
      prompt: bi('Das ist die dritte Verschiebung in sechs Wochen.',
                 'That is the third postponement in six weeks.'),
      choices: [
        { text: bi('„Dann wenigstens ein Videoanruf. Jetzt."',
                   '“Then at least a video call. Right now.”'),
          next: 'n3_video', risk: -1, verdict: 'good', catches: ['neverMeet'],
          why: bi('Ein Videoanruf ist die Grenze, an der die Masche zerbricht.',
                  'A video call is the wall the con cannot get past.') },
        { text: bi('Verständnis zeigen und warten',
                   'Be understanding and wait'),
          next: 'n2_deeper', risk: 2, verdict: 'bad',
          why: bi('Die dritte Ausrede sollte nicht mehr durchgehen.',
                  'The third excuse should not be getting a pass.') },
      ],
    },

    n3_video: {
      messages: [
        { from: 'them', time: '07:24', text: bi(
          'Die Verbindung hier draußen reicht dafür nicht, das weißt du doch 😞 Es tut mir so leid. Zweifelst du an mir?',
          'The connection out here will not carry that, you know that 😞 I am so sorry. Are you doubting me?') },
      ],
      flags: ['noVideo'],
      prompt: bi('Aus deiner Frage wird dein Problem gemacht.',
                 'Your question is being turned into your problem.'),
      choices: [
        { text: bi('Dabei bleiben: kein Video, kein Weiter',
                   'Hold the line: no video, no continuing'),
          next: 'end_exposed', risk: -2, verdict: 'good', catches: ['noVideo', 'neverMeet', 'farAway'],
          why: bi('Wer Zweifel in Schuldgefühle verwandelt, arbeitet nicht an einer Beziehung.',
                  'Anyone who converts your doubt into your guilt is not working on a relationship.') },
        { text: bi('Sich entschuldigen für die Zweifel',
                   'Apologise for doubting'),
          next: 'n2_deeper', risk: 2, verdict: 'bad',
          why: bi('Genau diese Umkehr ist das Werkzeug: Du fühlst dich schlecht und fragst nicht mehr.',
                  'That reversal is the tool: you feel bad and you stop asking.') },
      ],
    },

    n2_deeper: {
      messages: [
        { kind: 'system', text: bi('Zwei Wochen später.', 'Two weeks later.') },
        { from: 'them', time: '23:41', text: bi(
          'Ich muss dir was sagen und ich schäme mich dafür. Auf der Plattform gab es einen Unfall, ich liege in Bergen im Krankenhaus. Die Versicherung zahlt erst in vier Wochen und ich komme an mein Konto nicht ran.',
          'I have to tell you something and I am ashamed of it. There was an accident on the rig, I am in hospital in Bergen. The insurance only pays in four weeks and I cannot get to my account.') },
        { from: 'them', time: '23:42', text: bi('Ich bräuchte 1.900 €. Nur geliehen. Bitte erzähl niemandem davon, das ist mir so unangenehm.',
                                                'I would need €1,900. Just a loan. Please do not tell anyone, I feel awful about this.') },
      ],
      flags: ['money', 'secrecy'],
      prompt: bi('Der Notfall. Nach sechs Wochen Zuwendung.',
                 'The emergency. After six weeks of attention.'),
      choices: [
        { text: bi('Mit einer Person deines Vertrauens darüber sprechen',
                   'Talk it over with someone you trust'),
          next: 'n3_friend', risk: -2, verdict: 'good', catches: ['secrecy', 'money'],
          why: bi('Die Bitte um Geheimhaltung ist das Erkennungszeichen. Reden zerstört die Masche.',
                  'The request for secrecy is the tell. Talking destroys the con.') },
        { text: bi('„Wie soll ich es dir schicken?"',
                   '“How should I send it to you?”'),
          next: 'n3_payment', risk: 3, verdict: 'bad',
          why: bi('Die Frage nach dem Wie überspringt die Frage nach dem Ob.',
                  'Asking how skips straight past asking whether.') },
        { text: bi('Das Krankenhaus in Bergen anrufen und nachfragen',
                   'Ring the hospital in Bergen and ask'),
          next: 'end_exposed', risk: -2, verdict: 'good', catches: ['money', 'farAway'],
          why: bi('Überprüfbare Behauptungen überprüfen. Es gibt keinen Patienten dieses Namens.',
                  'Check the checkable claims. There is no patient by that name.') },
      ],
    },

    n3_friend: {
      messages: [
        { kind: 'system', text: bi(
          'Deine Schwester braucht neun Sekunden: „Nie getroffen, nie im Video gesehen, und jetzt Geld? Das ist ein Romance-Scam."',
          'Your sister needs nine seconds: “Never met, never seen on video, and now money? That is a romance scam.”') },
      ],
      prompt: bi('Von außen war es sofort sichtbar.', 'From the outside it was obvious immediately.'),
      choices: [
        { text: bi('Kontakt beenden und Profil melden',
                   'End contact and report the profile'),
          next: 'end_exposed', risk: -2, verdict: 'good', catches: ['secrecy', 'money', 'neverMeet'],
          why: bi('Schwer, aber richtig. Der Mensch, den du vermisst, hat nie existiert.',
                  'Hard, but right. The person you are missing never existed.') },
        { text: bi('Trotzdem zahlen — sie kennt Alex ja nicht',
                   'Pay anyway — she does not know Alex'),
          next: 'n3_payment', risk: 3, verdict: 'bad',
          why: bi('Genau darauf setzt die Isolation: dass du der Bindung mehr glaubst als deiner Familie.',
                  'That is what the isolation is for: that you trust the attachment more than your own family.') },
      ],
    },

    n3_payment: {
      messages: [
        { from: 'them', time: '23:50', text: bi(
          'Am einfachsten wären Google-Play-Guthabenkarten, die kann meine Betreuerin hier einlösen. Schick mir einfach die Codes ab. ❤️',
          'The easiest thing would be Google Play gift cards, my carer here can redeem those. Just send me photos of the codes. ❤️') },
      ],
      flags: ['weirdPayment'],
      prompt: bi('Ein Krankenhaus, das mit Guthabenkarten bezahlt wird.',
                 'A hospital that gets paid in gift cards.'),
      choices: [
        { text: bi('Stopp. Guthabenkarten sind kein Zahlungsmittel für Krankenhäuser',
                   'Stop. Gift cards are not how hospitals get paid'),
          next: 'end_late', risk: -2, verdict: 'good', catches: ['weirdPayment', 'money'],
          why: bi('Guthabenkarten sind das eindeutigste Betrugssignal überhaupt. Keine Institution der Welt nimmt sie.',
                  'Gift cards are the single clearest fraud signal there is. No institution on earth accepts them.') },
        { text: bi('Karten kaufen und die Codes fotografieren',
                   'Buy the cards and photograph the codes'),
          next: 'end_scammed', risk: 3, verdict: 'bad',
          why: bi('Sobald der Code abfotografiert ist, ist das Geld weg. Unwiderruflich, anonym, unauffindbar.',
                  'The moment the code is photographed the money is gone. Irreversible, anonymous, untraceable.') },
      ],
    },

    /* ---------- Enden ---------- */

    end_exposed: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi('Du beendest den Kontakt. Es tut trotzdem weh — die Wochen waren echt, auch wenn die Person es nicht war.',
                                   'You end the contact. It still hurts — the weeks were real even if the person was not.') },
      ],
      damage: bi('0 € — aber sechs Wochen und echte Gefühle', '€0 — but six weeks and real feelings'),
      lessons: [
        bi('Profilbilder rückwärts suchen. Das entlarvt die meisten Fake-Profile sofort.',
           'Reverse-search profile photos. It exposes most fake profiles instantly.'),
        bi('Kein Video, kein Treffen, immer eine Ausrede — das ist das Muster, nicht das Pech.',
           'No video, no meeting, always an excuse — that is the pattern, not bad luck.'),
        bi('Der Schaden bei Romance-Scam ist nie nur finanziell. Sich Hilfe zu holen ist völlig normal.',
           'The harm in a romance scam is never only financial. Getting support is entirely normal.'),
      ],
    },

    end_late: {
      outcome: 'close',
      messages: [
        { kind: 'system', text: bi('Du kaufst nichts. Alex wird erst vorwurfsvoll, dann wütend, dann ist der Account gelöscht.',
                                   'You buy nothing. Alex turns reproachful, then angry, then the account is gone.') },
      ],
      damage: bi('0 € — im letzten Moment gestoppt', '€0 — stopped at the last moment'),
      lessons: [
        bi('Guthabenkarten als Zahlungsweg sind immer Betrug. Ohne Ausnahme.',
           'Gift cards as a payment method always mean fraud. Without exception.'),
        bi('Wer nach einer Absage sofort wütend wird, wollte nie eine Beziehung.',
           'Anyone who turns angry the moment you say no was never after a relationship.'),
      ],
      recover: [
        bi('Profil melden, damit es andere nicht trifft.',
           'Report the profile so it does not reach somebody else.'),
        bi('Chatverlauf sichern, falls doch noch etwas nachkommt.',
           'Save the chat history in case anything else follows.'),
      ],
    },

    end_scammed: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi('Die Codes sind Minuten später eingelöst. Zwei Tage danach: eine neue Komplikation, weitere 2.400 €.',
                                   'The codes are redeemed within minutes. Two days later: a new complication, another €2,400.') },
        { kind: 'system', text: bi('Insgesamt 4.300 €. Dann ist der Account gelöscht.',
                                   '€4,300 in total. Then the account is deleted.') },
      ],
      damage: bi('4.300 € in Guthabenkarten', '€4,300 in gift cards'),
      lessons: [
        bi('Nach der ersten Zahlung kommt immer eine zweite. Die Geschichte hört nie von selbst auf.',
           'After the first payment there is always a second. The story never stops by itself.'),
        bi('Guthabenkarten-Codes sind wie Bargeld: einmal weitergegeben, für immer weg.',
           'Gift card codes are like cash: once handed over, gone forever.'),
        bi('Die Isolationsbitte war das deutlichste Signal von allen.',
           'The request to keep it secret was the clearest signal of the lot.'),
      ],
      recover: [
        bi('Sofort mit einer Vertrauensperson sprechen. Scham ist der beste Verbündete der Täter.',
           'Talk to somebody you trust straight away. Shame is the offender’s best ally.'),
        bi('Anzeige erstatten — mit Chatverlauf, Profilbildern und Kartennummern.',
           'File a police report — with the chat history, profile pictures and card numbers.'),
        bi('Beim Anbieter der Guthabenkarten melden. Ganz selten ist ein Code noch nicht eingelöst.',
           'Report it to the gift card issuer. Very occasionally a code has not been redeemed yet.'),
        bi('Keine weiteren Zahlungen. Auch nicht an angebliche „Rückhol-Dienste" — das ist die nächste Masche.',
           'Make no further payments. Especially not to supposed “recovery services” — that is the next con.'),
      ],
    },
  },
};
