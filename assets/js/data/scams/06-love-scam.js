import { bi } from '../bi.js';

/** Story 6 — Romance-Scam: Wochen an Zuwendung, dann der Notfall. */
export default {
  id: 'love-scam',
  icon: '💔',
  channel: 'dating',
  difficulty: 3,
  title: bi('Jemand, der dich versteht', 'Someone Who Understands You'),
  teaser: bi(
    'Sechs Wochen lang jeden Morgen eine Nachricht. Dann kommt der Notfall.',
    'Six weeks of a message every single morning. Then comes the emergency.'),
  contact: {
    name: bi('Alex, 34', 'Alex, 34'),
    sub: bi('Match seit 6 Wochen · Online', 'Matched 6 weeks ago · Online'),
  },

  redFlags: {
    fastLove: {
      label: bi('Sehr schnell sehr große Gefühle',
                'Very big feelings, very fast'),
      why: bi('„Ich habe noch nie so empfunden" nach drei Wochen ist keine Romantik, sondern Methode. Die Bindung wird aufgebaut, bevor Zweifel entstehen können — das nennt man Love Bombing.',
              '“I have never felt like this” after three weeks is not romance, it is method. Attachment gets built before doubt can form — this is called love bombing.'),
    },
    neverMeet: {
      label: bi('Ein Treffen platzt immer im letzten Moment',
                'Meeting up always falls through at the last minute'),
      why: bi('Es gibt keine Person, die kommen könnte. Also gibt es immer einen Grund: eine Verlängerung des Einsatzes, ein Flug, ein Notfall. Beim dritten Mal ist es kein Pech mehr, sondern ein Muster.',
              'There is no person who could turn up. So there is always a reason: a contract extension, a flight, an emergency. By the third time it stops being bad luck and becomes a pattern.'),
    },
    noVideo: {
      label: bi('Videoanrufe scheitern an der Technik',
                'Video calls always fail for technical reasons'),
      why: bi('Kamera kaputt, Netz zu schlecht, gerade auf See. Das Gesicht auf den Fotos gehört jemand anderem — meist einem Model oder Soldaten, dessen Bilder geklaut wurden.',
              'Camera broken, signal too poor, currently at sea. The face in the photos belongs to somebody else — usually a model or a soldier whose pictures were stolen.'),
    },
    farAway: {
      label: bi('Beruf weit weg und schwer überprüfbar',
                'A job far away and hard to check'),
      why: bi('Ölplattform, Auslandseinsatz, Chirurg im Krisengebiet, Kapitän. Solche Berufe erklären gleichzeitig die Abwesenheit, die schlechte Verbindung und den plötzlichen Notfall.',
              'Oil rig, overseas deployment, surgeon in a crisis zone, ship’s captain. Such jobs simultaneously explain the absence, the poor connection and the sudden emergency.'),
    },
    money: {
      label: bi('Am Ende geht es immer um Geld',
                'In the end it is always about money'),
      why: bi('Egal wie die Geschichte anfängt, sie endet bei einer Zahlung. Das ist der einzige feste Punkt in allen Varianten dieser Masche.',
              'However the story begins, it ends at a payment. That is the only fixed point across every variant of this con.'),
    },
    weirdPayment: {
      label: bi('Ungewöhnlicher Zahlungsweg',
                'An unusual way to pay'),
      why: bi('Guthabenkarten, Krypto, Western Union, ein privates Konto: alles nicht rückholbar und nicht nachverfolgbar. Kein Krankenhaus und keine Behörde nimmt Guthabenkarten.',
              'Gift cards, crypto, Western Union, a private account: none reversible, none traceable. No hospital and no authority accepts gift cards.'),
    },
    secrecy: {
      label: bi('„Erzähl niemandem davon"',
                '“Do not tell anyone about this”'),
      why: bi('Isolation ist Teil der Masche. Ein Außenstehender würde es in zwei Minuten erkennen — deshalb darf es keinen Außenstehenden geben.',
              'Isolation is part of the con. An outsider would spot it in two minutes — which is why there must be no outsider.'),
    },
    mule: {
      label: bi('Die Bitte, Geld für jemanden weiterzuleiten',
                'Being asked to forward money for somebody'),
      why: bi('„Kannst du das kurz für mich empfangen und weiterschicken?" macht dich zum Finanzagenten. Das ist Geldwäsche und strafbar — auch wenn du nichts davon wusstest.',
              '“Could you receive this for me and pass it on?” turns you into a money mule. That is money laundering and a criminal offence — even if you had no idea.'),
    },
  },

  start: 'n1',
  nodes: {

    /* ============ Kapitel 1: Die sechs Wochen ============ */

    n1: {
      chapter: bi('Kapitel 1 — Die sechs Wochen', 'Chapter 1 — The six weeks'),
      messages: [
        { kind: 'system', text: bi(
          'Sechs Wochen. Jeden Morgen eine Nachricht, jeden Abend ein „Schlaf gut". Alex hört zu, fragt nach, erinnert sich an Details. Seit deiner Trennung im Frühjahr hat das niemand mehr getan.',
          'Six weeks. A message every morning, a “sleep well” every night. Alex listens, asks questions, remembers details. Nobody has done that since your break-up in the spring.') },
        { from: 'them', time: '07:12', text: bi(
          'Guten Morgen ☀️ Ich weiß, es ist früh für so einen Satz — aber ich habe in meinem Leben noch nie mit jemandem so reden können wie mit dir.',
          'Good morning ☀️ I know it is early to say something like this — but I have never in my life been able to talk to anyone the way I talk to you.') },
      ],
      flags: ['fastLove'],
      tactic: 'reciprocity',
      info: {
        icon: '💣',
        title: bi('Love Bombing: Zuwendung als Investition',
                  'Love bombing: attention as an investment'),
        body: [
          bi('Die Aufmerksamkeit ist echt in dem Sinne, dass wirklich jemand sie aufbringt — oft stundenlang täglich, oft im Schichtbetrieb aus einem Callcenter, manchmal von Menschen, die selbst zur Arbeit gezwungen werden.',
             'The attention is real in the sense that somebody genuinely puts it in — often for hours every day, often in shifts from a call centre, sometimes by people who are themselves forced to do the work.'),
          bi('Sie ist eine Investition, die sich später auszahlen soll. Je mehr Zeit du bekommen hast, desto schwerer fällt es dir später, Nein zu sagen. Das ist keine Nebenwirkung, das ist der Plan.',
             'It is an investment meant to pay off later. The more time you have received, the harder it becomes to say no. That is not a side effect, it is the plan.'),
        ],
      },
      prompt: bi('Es fühlt sich gut an. Und es geht sehr schnell.',
                 'It feels good. And it is moving very fast.'),
      choices: [
        { text: bi('Das Profilbild rückwärts im Netz suchen',
                   'Run a reverse image search on the profile photo'),
          next: 'n2_search', risk: -2, verdict: 'good', catches: ['noVideo', 'fastLove'],
          why: bi('Die Bildersuche entlarvt die Mehrheit dieser Profile in unter einer Minute. Sie kostet nichts und tut niemandem weh, der ehrlich ist.',
                  'A reverse image search exposes most of these profiles in under a minute. It costs nothing and harms nobody who is being honest.') },
        { text: bi('„Geht mir genauso. Wann sehen wir uns endlich?"',
                   '“Same here. When are we finally meeting?”'),
          next: 'n2_meet', risk: 0, verdict: 'good', catches: ['fastLove'],
          why: bi('Auf ein Treffen zu bestehen ist der beste Test, den es gibt — und bei einer echten Person völlig normal.',
                  'Insisting on meeting is the single best test available — and completely normal with a real person.') },
        { text: bi('Das Kompliment einfach genießen',
                   'Simply enjoy the compliment'),
          next: 'n2_deeper', risk: 1, verdict: 'meh',
          why: bi('Nichts falsch daran — nur wird die Bindung mit jedem Tag teurer, und die Bitte kommt trotzdem.',
                  'Nothing wrong with that — except the attachment gets more expensive every day, and the request comes anyway.') },
      ],
    },

    n2_search: {
      messages: [
        { kind: 'system', text: bi(
          'Dasselbe Gesicht taucht 40-mal auf: ein Fotomodell aus Portugal. Dazu drei Warnseiten über Romance-Scam — mit genau diesem Bild.',
          'The same face appears 40 times: a model from Portugal. Plus three scam-warning pages — featuring this exact picture.') },
      ],
      flags: ['noVideo'],
      tactic: 'familiarity',
      info: {
        icon: '🔎',
        title: bi('Wie eine Rückwärts-Bildersuche geht',
                  'How a reverse image search works'),
        body: [
          bi('Bild speichern, auf einer Bildersuche hochladen, fertig. Am Handy geht es meist über „Bild suchen" oder die Kamera-Suche im Browser. Fünfzehn Sekunden.',
             'Save the picture, upload it to an image search, done. On a phone it is usually “search image” or the camera search in the browser. Fifteen seconds.'),
          bi('Findet sich das Gesicht in Werbekatalogen, auf Model-Seiten oder in Warnlisten, ist die Sache erledigt. Findet sich nichts, heißt das noch nicht, dass es echt ist — aber ein Treffer ist ein sicherer Beweis für Betrug.',
             'If the face shows up in ad catalogues, on model sites or in warning lists, the matter is closed. Finding nothing does not prove it is genuine — but a hit is conclusive proof of fraud.'),
        ],
      },
      prompt: bi('Das Bild gehört jemand anderem.', 'The photo belongs to somebody else.'),
      choices: [
        { text: bi('Kontakt abbrechen, Profil melden',
                   'Cut contact, report the profile'),
          next: 'end_exposed', risk: -2, verdict: 'good', catches: ['noVideo', 'farAway', 'fastLove'],
          why: bi('Sauber beendet, bevor Geld oder Monate verloren gehen. Dass es trotzdem wehtut, ist normal — die Wochen waren echt, auch wenn die Person es nicht war.',
                  'Cleanly ended, before any money or months are lost. That it still hurts is normal — the weeks were real even if the person was not.') },
        { text: bi('Nachfragen und die Erklärung abwarten',
                   'Ask about it and wait for the explanation'),
          next: 'n2_excuse', risk: 1, verdict: 'meh',
          why: bi('Es kommt immer eine Erklärung. Sie ist nie wahr, aber sie klingt gut — und sie kauft weitere Wochen.',
                  'An explanation always comes. It is never true, but it sounds good — and it buys more weeks.') },
      ],
    },

    n2_excuse: {
      messages: [
        { from: 'them', time: '07:31', text: bi(
          'Oh Gott, das ist mir so unangenehm 😔 Ein Ex von mir hat meine Bilder überall hochgeladen, ich kämpfe seit Jahren dagegen. Bitte glaub mir, ich bin das wirklich.',
          'Oh God, this is so awkward 😔 An ex of mine uploaded my pictures everywhere, I have been fighting it for years. Please believe me, it really is me.') },
      ],
      flags: ['noVideo', 'fastLove'],
      tactic: 'fear',
      prompt: bi('Eine Erklärung, die alles erklärt — und nichts beweist.',
                 'An explanation that explains everything — and proves nothing.'),
      choices: [
        { text: bi('„Dann zeig es mir jetzt im Video."',
                   '“Then show me right now on video.”'),
          next: 'n3_video', risk: -1, verdict: 'good', catches: ['noVideo'],
          why: bi('Eine Erklärung, die sich in dreißig Sekunden überprüfen ließe, aber nie überprüft wird, ist keine Erklärung.',
                  'An explanation that could be verified in thirty seconds but never is, is not an explanation.') },
        { text: bi('Glauben und weitermachen', 'Believe it and carry on'),
          next: 'n2_deeper', risk: 2, verdict: 'bad',
          why: bi('Die Erklärung war vorbereitet. Sie kommt in dieser Masche fast wörtlich immer gleich.',
                  'The explanation was prepared. In this con it comes back almost word for word every time.') },
      ],
    },

    n2_meet: {
      messages: [
        { from: 'them', time: '07:20', text: bi(
          'Ich will das auch so sehr 😔 Aber ich bin noch bis Ende des Monats auf der Plattform vor Norwegen. Danach komme ich direkt zu dir, versprochen.',
          'I want that so much too 😔 But I am on the rig off Norway until the end of the month. Then I am coming straight to you, I promise.') },
        { kind: 'system', text: bi(
          'Es ist die dritte Verschiebung in sechs Wochen. Beim ersten Mal war es ein Flug, beim zweiten eine Vertragsverlängerung.',
          'It is the third postponement in six weeks. The first time it was a flight, the second a contract extension.') },
      ],
      flags: ['neverMeet', 'farAway'],
      tactic: 'familiarity',
      info: {
        icon: '🛢️',
        title: bi('Warum immer Ölplattform, Militär oder Chirurg?',
                  'Why always an oil rig, the military or a surgeon?'),
        body: [
          bi('Diese Berufe erledigen drei Aufgaben auf einmal: Sie erklären, warum man sich nicht treffen kann, warum die Verbindung für Video zu schlecht ist, und sie machen später einen teuren Notfall plausibel.',
             'These jobs do three jobs at once: they explain why you cannot meet, why the connection is too poor for video, and they later make an expensive emergency plausible.'),
          bi('Dazu wirken sie vertrauenswürdig und ein bisschen heldenhaft. Auch das ist kein Zufall bei der Auswahl.',
             'They also sound trustworthy and faintly heroic. That is not accidental in the choice either.'),
        ],
      },
      prompt: bi('Dritte Verschiebung, dritter guter Grund.',
                 'Third postponement, third good reason.'),
      choices: [
        { text: bi('„Dann wenigstens ein Videoanruf. Jetzt."',
                   '“Then at least a video call. Right now.”'),
          next: 'n3_video', risk: -1, verdict: 'good', catches: ['neverMeet'],
          why: bi('Ein Videoanruf ist die Wand, an der diese Masche zerbricht. Deshalb wird er nie zustande kommen.',
                  'A video call is the wall this con cannot get past. Which is why it will never happen.') },
        { text: bi('Verständnis zeigen und warten',
                   'Be understanding and wait'),
          next: 'n2_deeper', risk: 2, verdict: 'bad',
          why: bi('Die dritte Ausrede sollte nicht mehr durchgehen. Ein Muster ist kein Pech.',
                  'The third excuse should not be getting a pass. A pattern is not bad luck.') },
      ],
    },

    n3_video: {
      messages: [
        { from: 'them', time: '07:24', text: bi(
          'Die Verbindung hier draußen reicht dafür nicht, das weißt du doch 😞 Es tut mir so leid. Zweifelst du an mir?',
          'The connection out here will not carry that, you know that 😞 I am so sorry. Are you doubting me?') },
      ],
      flags: ['noVideo'],
      tactic: 'fear',
      info: {
        icon: '🔁',
        title: bi('Aus deiner Frage wird dein Problem',
                  'Your question becomes your problem'),
        body: [
          bi('„Zweifelst du an mir?" verschiebt das Thema: Nicht mehr die fehlende Kamera steht zur Debatte, sondern dein Vertrauen. Wer sich dann entschuldigt, hört auf zu fragen.',
             '“Are you doubting me?” shifts the subject: the missing camera is no longer the issue, your trust is. Anyone who then apologises stops asking.'),
          bi('Dieselbe Umkehr taucht in fast allen Maschen auf — beim Bankanruf, beim Anlagebetrug, beim Enkeltrick. Wenn eine berechtigte Frage plötzlich als Kränkung behandelt wird, ist das selbst die Antwort.',
             'The same reversal appears in almost every con — the bank call, investment fraud, the grandparent scam. When a fair question is suddenly treated as an insult, that is itself the answer.'),
        ],
      },
      prompt: bi('Aus deiner Frage wird dein Fehler gemacht.',
                 'Your question is being turned into your failing.'),
      choices: [
        { text: bi('Dabei bleiben: kein Video, kein Weiter',
                   'Hold the line: no video, no continuing'),
          next: 'end_exposed', risk: -2, verdict: 'good', catches: ['noVideo', 'neverMeet', 'farAway'],
          why: bi('Wer Zweifel in Schuldgefühle verwandelt, arbeitet nicht an einer Beziehung, sondern an dir.',
                  'Anyone who converts your doubt into your guilt is not working on a relationship, they are working on you.') },
        { text: bi('Sich für die Zweifel entschuldigen',
                   'Apologise for doubting'),
          next: 'n2_deeper', risk: 2, verdict: 'bad',
          why: bi('Genau diese Umkehr ist das Werkzeug: Du fühlst dich schlecht und fragst nicht mehr nach.',
                  'That reversal is the tool: you feel bad and you stop asking.') },
      ],
    },

    /* ============ Kapitel 2: Der Notfall ============ */

    n2_deeper: {
      chapter: bi('Kapitel 2 — Der Notfall', 'Chapter 2 — The emergency'),
      messages: [
        { kind: 'system', text: bi('Zwei Wochen später, kurz vor Mitternacht.', 'Two weeks later, just before midnight.') },
        { from: 'them', time: '23:41', text: bi(
          'Ich muss dir was sagen und ich schäme mich dafür. Auf der Plattform gab es einen Unfall. Ich liege in Bergen im Krankenhaus, mein Arm ist gebrochen.',
          'I have to tell you something and I am ashamed of it. There was an accident on the rig. I am in hospital in Bergen with a broken arm.') },
        { from: 'them', time: '23:42', text: bi(
          'Die Firmenversicherung zahlt erst in vier Wochen und ich komme an mein Konto nicht ran, solange ich hier bin. Ich bräuchte 1.900 €. Nur geliehen, du bekommst alles zurück.',
          'The company insurance only pays in four weeks and I cannot access my account while I am in here. I would need €1,900. Just a loan, you will get all of it back.') },
        { from: 'them', time: '23:43', text: bi('Bitte erzähl niemandem davon. Es ist mir so unangenehm 😔',
                                                'Please do not tell anyone. I feel awful about it 😔') },
      ],
      flags: ['money', 'secrecy'],
      tactic: 'isolation',
      info: {
        icon: '⏰',
        title: bi('Warum der Notfall nachts kommt',
                  'Why the emergency arrives at night'),
        body: [
          bi('Nachts ist niemand da, den man fragen könnte. Man ist müde, weniger kritisch und eher bereit, schnell zu handeln. Die Uhrzeit ist Teil der Konstruktion.',
             'At night there is nobody to ask. You are tired, less critical and more inclined to act fast. The hour is part of the design.'),
          bi('Dazu kommt die Bitte um Geheimhaltung. Sie verhindert genau das, was die Masche sofort beenden würde: dass ein Mensch von außen zwei Sätze davon hört.',
             'On top of that comes the request for secrecy. It prevents precisely what would end the con instantly: one outside person hearing two sentences of it.'),
        ],
      },
      prompt: bi('Der Notfall. Nach sechs Wochen Zuwendung, um Mitternacht.',
                 'The emergency. After six weeks of attention, at midnight.'),
      choices: [
        { text: bi('Mit einer Person deines Vertrauens darüber sprechen',
                   'Talk it over with someone you trust'),
          next: 'n3_friend', risk: -2, verdict: 'good', catches: ['secrecy', 'money'],
          why: bi('Die Bitte um Geheimhaltung ist das Erkennungszeichen. Reden zerstört diese Masche zuverlässiger als jede Prüfung.',
                  'The request for secrecy is the tell. Talking destroys this con more reliably than any check.') },
        { text: bi('Das Krankenhaus in Bergen anrufen und nachfragen',
                   'Ring the hospital in Bergen and ask'),
          next: 'end_hospital', risk: -2, verdict: 'good', catches: ['money', 'farAway'],
          why: bi('Überprüfbare Behauptungen überprüfen. Ein Unfall auf einer Plattform stünde außerdem in der Lokalpresse.',
                  'Check the checkable claims. An accident on a rig would also be in the local news.') },
        { text: bi('„Wie soll ich es dir schicken?"',
                   '“How should I send it to you?”'),
          next: 'n3_payment', risk: 3, verdict: 'bad',
          why: bi('Die Frage nach dem Wie überspringt die Frage nach dem Ob. Genau darauf ist die Geschichte gebaut.',
                  'Asking how skips straight past asking whether. That is exactly what the story is built for.') },
      ],
    },

    n3_friend: {
      messages: [
        { kind: 'system', text: bi(
          'Deine Schwester braucht neun Sekunden: „Nie getroffen, nie im Video gesehen, und jetzt nachts um zwölf Geld? Das ist ein Romance-Scam. Das war es von Anfang an."',
          'Your sister needs nine seconds: “Never met, never seen on video, and now money at midnight? That is a romance scam. It was one from the start.”') },
      ],
      flags: ['secrecy'],
      tactic: 'isolation',
      prompt: bi('Von außen war es sofort sichtbar.', 'From the outside it was obvious immediately.'),
      choices: [
        { text: bi('Kontakt beenden und Profil melden',
                   'End contact and report the profile'),
          next: 'end_exposed', risk: -2, verdict: 'good', catches: ['secrecy', 'money', 'neverMeet'],
          why: bi('Schwer, aber richtig. Der Mensch, den du vermisst, hat nie existiert — die Gefühle darüber sind trotzdem echt.',
                  'Hard, but right. The person you are missing never existed — the feelings about that are real all the same.') },
        { text: bi('Trotzdem zahlen — sie kennt Alex ja nicht',
                   'Pay anyway — she does not know Alex'),
          next: 'n3_payment', risk: 3, verdict: 'bad',
          why: bi('Genau darauf zielt die Isolation: dass du der Bindung mehr glaubst als deiner eigenen Familie.',
                  'That is what the isolation aims at: making you trust the attachment more than your own family.') },
      ],
    },

    /* ============ Kapitel 3: Die Zahlung ============ */

    n3_payment: {
      chapter: bi('Kapitel 3 — Die Zahlung', 'Chapter 3 — The payment'),
      messages: [
        { from: 'them', time: '23:50', text: bi(
          'Am einfachsten wären Google-Play-Guthabenkarten, die kann meine Betreuerin hier einlösen. Kauf sie in der Tankstelle und schick mir einfach Fotos von den Codes ❤️',
          'The easiest thing would be Google Play gift cards, my carer here can redeem those. Buy them at a petrol station and just send me photos of the codes ❤️') },
      ],
      flags: ['weirdPayment'],
      tactic: 'distraction',
      info: {
        icon: '🎟️',
        title: bi('Guthabenkarten sind das eindeutigste Betrugssignal überhaupt',
                  'Gift cards are the single clearest fraud signal there is'),
        body: [
          bi('Kein Krankenhaus, kein Finanzamt, kein Gericht, kein Stromanbieter und keine Polizei nimmt Guthabenkarten. Weltweit nicht, in keinem einzigen Fall.',
             'No hospital, no tax office, no court, no energy supplier and no police force accepts gift cards. Nowhere in the world, in not a single case.'),
          bi('Sobald der Code abfotografiert ist, ist das Guthaben in Minuten eingelöst — anonym, unwiderruflich und nicht nachverfolgbar. Genau deshalb wird danach gefragt.',
             'The moment the code is photographed the credit is redeemed within minutes — anonymously, irreversibly and untraceably. Which is exactly why it gets requested.'),
          bi('Wenn irgendjemand jemals Guthabenkarten als Zahlungsmittel vorschlägt, ist die Sache damit entschieden. Es braucht keine weitere Prüfung.',
             'If anybody ever proposes gift cards as a payment method, the matter is settled. No further checking is required.'),
        ],
      },
      prompt: bi('Ein Krankenhaus, das mit Guthabenkarten aus der Tankstelle bezahlt wird.',
                 'A hospital that gets paid with gift cards from a petrol station.'),
      choices: [
        { text: bi('Stopp. Guthabenkarten sind immer Betrug',
                   'Stop. Gift cards always mean fraud'),
          next: 'end_late', risk: -2, verdict: 'good', catches: ['weirdPayment', 'money'],
          why: bi('Die klarste Regel dieser ganzen Seite: Guthabenkarten als Zahlungsweg bedeuten ausnahmslos Betrug.',
                  'The clearest rule on this entire site: gift cards as a payment method mean fraud, without exception.') },
        { text: bi('Nach einer normalen Überweisung fragen',
                   'Ask about a normal bank transfer instead'),
          next: 'n3_mule', risk: 0, verdict: 'meh',
          why: bi('Besser als Guthabenkarten — aber die eigentliche Frage bleibt offen. Und die Antwort führt in die nächste Falle.',
                  'Better than gift cards — but the actual question is still open. And the answer leads into the next trap.') },
        { text: bi('Karten kaufen und die Codes fotografieren',
                   'Buy the cards and photograph the codes'),
          next: 'n4_more', risk: 3, verdict: 'bad',
          why: bi('Sobald der Code abfotografiert ist, ist das Geld weg. Unwiderruflich, anonym, unauffindbar.',
                  'The moment the code is photographed the money is gone. Irreversible, anonymous, untraceable.') },
      ],
    },

    n3_mule: {
      messages: [
        { from: 'them', time: '00:14', text: bi(
          'Klar geht das! Ach übrigens — ein Geschäftspartner schuldet mir noch Geld. Kann er es auf dein Konto überweisen und du schickst es dann weiter? Wäre für mich viel einfacher.',
          'Of course! Oh, by the way — a business partner still owes me money. Could he transfer it to your account and you pass it on? That would be much easier for me.') },
      ],
      flags: ['mule'],
      tactic: 'commitment',
      info: {
        icon: '⚖️',
        title: bi('Diese Bitte macht dich strafbar',
                  'This request makes you a criminal'),
        body: [
          bi('Wer fremdes Geld über sein Konto weiterleitet, ist rechtlich ein Finanzagent und begeht Geldwäsche — auch ohne Vorsatz und auch ohne eigenen Gewinn.',
             'Anyone who forwards other people’s money through their account is legally a money mule and commits money laundering — with no intent and no personal profit required.'),
          bi('Das Geld stammt meist von anderen Betrugsopfern. Die Bank kündigt das Konto, die Rückforderung trifft dich, und die Anzeige läuft gegen dich.',
             'The money usually comes from other fraud victims. Your bank closes the account, the claim for repayment lands on you, and the criminal case runs against you.'),
        ],
      },
      prompt: bi('Du sollst Geld empfangen und weiterleiten.',
                 'You are being asked to receive money and pass it on.'),
      choices: [
        { text: bi('Auf keinen Fall. Kontakt sofort beenden',
                   'Absolutely not. End contact immediately'),
          next: 'end_mule_avoided', risk: -2, verdict: 'good', catches: ['mule', 'money', 'weirdPayment'],
          why: bi('Genau richtig. Diese Bitte hätte aus einem Opfer eine Beschuldigte gemacht.',
                  'Exactly right. That request would have turned a victim into a defendant.') },
        { text: bi('Zustimmen, das kostet dich ja nichts',
                   'Agree, it costs you nothing'),
          next: 'end_mule', risk: 3, verdict: 'bad',
          why: bi('Es kostet dich das Konto und möglicherweise ein Strafverfahren. „Kostet nichts" ist hier komplett falsch.',
                  'It costs you your bank account and possibly a criminal case. “Costs nothing” is entirely wrong here.') },
      ],
    },

    n4_more: {
      messages: [
        { kind: 'system', text: bi('Die Codes sind acht Minuten später eingelöst.',
                                   'The codes are redeemed eight minutes later.') },
        { from: 'them', time: '11:20', text: bi(
          'Danke ❤️❤️ Du, es gibt ein Problem: Die Klinik verlangt eine Kaution, bevor sie mich entlassen. 2.400 €. Ich weiß, das ist viel, aber danach bin ich frei und komme direkt zu dir.',
          'Thank you ❤️❤️ Listen, there is a problem: the clinic wants a deposit before they discharge me. €2,400. I know it is a lot, but after that I am free and coming straight to you.') },
      ],
      flags: ['money'],
      tactic: 'sunkCost',
      prompt: bi('Die zweite Forderung, keine zwölf Stunden später.',
                 'The second demand, less than twelve hours later.'),
      choices: [
        { text: bi('Jetzt reicht es. Aufhören und melden',
                   'Enough. Stop and report it'),
          next: 'end_partial', risk: -1, verdict: 'good', catches: ['money', 'weirdPayment'],
          why: bi('Bereits gezahltes Geld ist weg — das ist kein Grund, mehr zu zahlen. Aufhören ist die einzige Entscheidung, die noch etwas rettet.',
                  'Money already paid is gone — that is not a reason to pay more. Stopping is the only decision that still saves anything.') },
        { text: bi('Auch die 2.400 € schicken',
                   'Send the €2,400 as well'),
          next: 'end_scammed', risk: 3, verdict: 'bad',
          why: bi('Die Geschichte hört nie von selbst auf. Nach der Kaution kommt die Ausreisegebühr, danach der Anwalt.',
                  'The story never stops by itself. After the deposit comes the exit fee, and after that the lawyer.') },
      ],
    },

    /* ============ Ausgänge ============ */

    end_exposed: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'Du beendest den Kontakt. Es tut trotzdem weh — die sechs Wochen waren echt, auch wenn die Person es nicht war.',
          'You end the contact. It still hurts — the six weeks were real even if the person was not.') },
      ],
      damage: bi('0 € — aber sechs Wochen und echte Gefühle', '€0 — but six weeks and real feelings'),
      lessons: [
        bi('Profilbilder rückwärts suchen. Das entlarvt die meisten dieser Profile in unter einer Minute.',
           'Reverse-search profile photos. It exposes most of these profiles in under a minute.'),
        bi('Kein Video, kein Treffen, immer eine Ausrede — das ist ein Muster, kein Pech.',
           'No video, no meeting, always an excuse — that is a pattern, not bad luck.'),
        bi('Der Schaden ist nie nur finanziell. Sich Hilfe zu holen ist völlig normal und kein Zeichen von Schwäche.',
           'The harm is never only financial. Getting support is entirely normal and no sign of weakness.'),
      ],
    },

    end_hospital: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'Das Krankenhaus in Bergen hat keinen Patienten dieses Namens. Auch von einem Unfall auf einer Plattform weiß dort niemand.',
          'The hospital in Bergen has no patient by that name. Nobody there knows of any accident on a rig either.') },
      ],
      damage: bi('0 € — Behauptung überprüft', '€0 — the claim was checked'),
      lessons: [
        bi('Überprüfbare Behauptungen überprüfen. Krankenhäuser, Firmen und Unfälle lassen sich anrufen und nachlesen.',
           'Check the checkable claims. Hospitals, companies and accidents can be phoned and looked up.'),
        bi('Ein echter Notfall hält einen Anruf beim Krankenhaus aus. Ein erfundener nicht.',
           'A genuine emergency survives a phone call to the hospital. An invented one does not.'),
      ],
    },

    end_late: {
      outcome: 'close',
      messages: [
        { kind: 'system', text: bi(
          'Du kaufst nichts. Alex wird erst vorwurfsvoll, dann wütend, dann ist der Account gelöscht.',
          'You buy nothing. Alex turns reproachful, then angry, then the account is gone.') },
      ],
      damage: bi('0 € — im letzten Moment gestoppt', '€0 — stopped at the last moment'),
      lessons: [
        bi('Guthabenkarten als Zahlungsweg sind immer Betrug. Ohne jede Ausnahme.',
           'Gift cards as a payment method always mean fraud. Without any exception.'),
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

    end_mule_avoided: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'Du sagst ab und beendest den Kontakt. Zwei Wochen später erfährst du aus den Nachrichten, dass mehrere Menschen wegen genau dieser Bitte angezeigt wurden.',
          'You refuse and end the contact. Two weeks later the news reports that several people have been charged over exactly this request.') },
      ],
      damage: bi('0 € — und kein Strafverfahren', '€0 — and no criminal case'),
      lessons: [
        bi('Niemals fremdes Geld über das eigene Konto weiterleiten. Das ist Geldwäsche, auch ohne Absicht.',
           'Never forward other people’s money through your own account. That is money laundering, even without intent.'),
        bi('Diese Bitte kommt oft erst spät — wenn die Bindung schon stark genug ist.',
           'This request usually comes late — once the attachment is strong enough.'),
      ],
    },

    end_partial: {
      outcome: 'close',
      messages: [
        { kind: 'system', text: bi(
          'Du zahlst nicht weiter. Die 1.900 € bleiben weg, aber es endet hier.',
          'You pay no more. The €1,900 stays gone, but it ends here.') },
        { kind: 'system', text: bi(
          'Vier Monate später meldet sich eine „Kanzlei", die dein Geld zurückholen will — gegen Vorkasse. Du antwortest nicht.',
          'Four months later a “law firm” gets in touch offering to recover your money — for a fee up front. You do not reply.') },
      ],
      damage: bi('1.900 € in Guthabenkarten — Rest verhindert', '€1,900 in gift cards — the rest prevented'),
      lessons: [
        bi('Bereits gezahltes Geld ist kein Grund, mehr zu zahlen. Jede Forderung für sich bewerten.',
           'Money already paid is no reason to pay more. Judge each demand on its own.'),
        bi('Die „Rückhol-Kanzlei" ist die zweite Masche, oft von denselben Leuten.',
           'The “recovery law firm” is the second con, often run by the same people.'),
      ],
      recover: [
        bi('Anzeige erstatten, mit Chatverlauf und Kartennummern.',
           'File a police report, with the chat history and the card numbers.'),
        bi('Beim Anbieter der Guthabenkarten melden — ganz selten ist ein Code noch nicht eingelöst.',
           'Report it to the gift card issuer — very occasionally a code has not been redeemed yet.'),
        bi('Mit jemandem darüber sprechen. Scham ist hier der eigentliche Schaden.',
           'Talk to somebody about it. Shame is the real damage here.'),
      ],
    },

    end_mule: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi(
          'Drei Tage später gehen 7.400 € auf deinem Konto ein. Du leitest sie weiter, wie besprochen.',
          'Three days later €7,400 arrives in your account. You forward it as agreed.') },
        { kind: 'system', text: bi(
          'Zwei Wochen später kündigt die Bank dein Konto. Das Geld stammte von einer 71-jährigen Frau aus Kassel. Die Staatsanwaltschaft ermittelt gegen dich.',
          'Two weeks later the bank closes your account. The money came from a 71-year-old woman in Kassel. The prosecutor opens a case against you.') },
      ],
      flags: ['mule'],
      damage: bi('Konto gekündigt + Ermittlungsverfahren', 'Account closed + criminal investigation'),
      lessons: [
        bi('Geld für andere weiterzuleiten ist Geldwäsche — auch ohne Vorsatz und ohne eigenen Gewinn.',
           'Forwarding money for others is money laundering — with no intent and no profit of your own.'),
        bi('Aus einem Betrugsopfer wird so eine Beschuldigte. Das ist der schlimmstmögliche Ausgang dieser Masche.',
           'That turns a fraud victim into a defendant. It is the worst possible outcome of this con.'),
      ],
      recover: [
        bi('Sofort anwaltliche Beratung suchen und selbst Anzeige erstatten.',
           'Seek legal advice immediately and file your own report.'),
        bi('Den kompletten Chatverlauf sichern — er belegt, wie es dazu kam.',
           'Preserve the entire chat history — it documents how this happened.'),
        bi('Der Bank alles offenlegen. Verschweigen macht die Lage deutlich schlimmer.',
           'Disclose everything to the bank. Concealment makes the situation considerably worse.'),
      ],
    },

    end_scammed: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi(
          'Nach der Kaution kommt eine Ausreisegebühr, danach ein Anwalt, danach ein Ticket. Insgesamt 6.700 €.',
          'After the deposit comes an exit fee, then a lawyer, then a plane ticket. €6,700 in total.') },
        { kind: 'system', text: bi(
          'Dann ist der Account gelöscht. Alex hat nie existiert.',
          'Then the account is deleted. Alex never existed.') },
      ],
      damage: bi('6.700 € in Guthabenkarten und Überweisungen', '€6,700 in gift cards and transfers'),
      lessons: [
        bi('Nach der ersten Zahlung kommt immer eine zweite. Die Geschichte hört nie von selbst auf.',
           'After the first payment there is always a second. The story never stops by itself.'),
        bi('Guthabenkarten-Codes sind wie Bargeld: einmal weitergegeben, für immer weg.',
           'Gift card codes are like cash: once handed over, gone forever.'),
        bi('Die Bitte um Geheimhaltung war das deutlichste Signal von allen — und kam ganz am Anfang.',
           'The request for secrecy was the clearest signal of the lot — and it came right at the start.'),
      ],
      recover: [
        bi('Sofort mit einer Vertrauensperson sprechen. Scham ist der beste Verbündete der Täter.',
           'Talk to somebody you trust straight away. Shame is the offender’s best ally.'),
        bi('Anzeige erstatten — mit Chatverlauf, Profilbildern und allen Kartennummern.',
           'File a police report — with the chat history, profile pictures and every card number.'),
        bi('Keine weiteren Zahlungen. Auch nicht an angebliche Rückhol-Dienste — das ist die nächste Masche.',
           'Make no further payments. Especially not to supposed recovery services — that is the next con.'),
        bi('Beratungsstellen für Betroffene von Romance-Scam bieten Hilfe an. Das ist keine Kleinigkeit und du bist nicht die Einzige.',
           'Support services for romance scam victims exist. This is not a small thing and you are not the only one.'),
      ],
    },
  },
};
