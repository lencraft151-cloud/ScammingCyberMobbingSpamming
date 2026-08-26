import { bi } from './bi.js';

/**
 * Modus 2 — Cybermobbing im Klassenchat.
 *
 * Der Chat läuft weiter, egal was du tust: eine Gruppe hört nicht auf,
 * weil eine Person einmal widerspricht. Deine Entscheidungen verschieben,
 * wie weit es geht und wie Mia da herauskommt.
 *
 * Der Ausgang wird nicht von der letzten Wahl bestimmt, sondern aus dem
 * gesammelten Zivilcourage-Wert berechnet (siehe `endings` und `pickEnding`).
 */

const P = {
  jonas: bi('Jonas', 'Jonas'),
  leo: bi('Leo', 'Leo'),
  emily: bi('Emily', 'Emily'),
  tarek: bi('Tarek', 'Tarek'),
  mia: bi('Mia', 'Mia'),
  lena: bi('Lena', 'Lena'),
};

export default {
  id: 'klassenchat',
  icon: '💬',
  channel: 'group',
  difficulty: 2,
  title: bi('Klasse 8B 🚀', 'Class 8B 🚀'),
  teaser: bi('27 Mitglieder. Einer davon bist du.', '27 members. One of them is you.'),
  contact: {
    name: bi('Klasse 8B 🚀', 'Class 8B 🚀'),
    sub: bi('27 Mitglieder', '27 members'),
  },

  redFlags: {
    joke: {
      label: bi('„War doch nur Spaß"',
                '“It was only a joke”'),
      why: bi('Der Satz verschiebt die Verantwortung auf die Person, die sich wehrt. Ob etwas Spaß war, entscheidet nicht der Absender.',
              'The phrase shifts responsibility onto the person objecting. Whether something was a joke is not the sender’s call.'),
    },
    pileOn: {
      label: bi('Aus einem Beitrag werden zwanzig',
                'One post becomes twenty'),
      why: bi('Die einzelne Nachricht ist selten das Schlimme. Die Masse ist es. Jedes 😂 ist ein Baustein.',
              'The single message is rarely the harm. The pile is. Every 😂 is a building block.'),
    },
    silence: {
      label: bi('Schweigen wirkt wie Zustimmung',
                'Silence reads as agreement'),
      why: bi('Für die Person in der Mitte ist Schweigen nicht neutral. Es fühlt sich an, als wären alle dagegen.',
              'For the person in the middle, silence is not neutral. It feels like everyone is against them.'),
    },
    fakeAccount: {
      label: bi('Ein Fake-Account im Namen einer anderen Person',
                'A fake account in somebody else’s name'),
      why: bi('Das ist keine Grauzone mehr. Identitätsmissbrauch und Verleumdung sind Straftaten.',
              'This is no longer a grey area. Impersonation and defamation are criminal offences.'),
    },
    poll: {
      label: bi('Eine Abstimmung über einen Menschen',
                'A poll about a human being'),
      why: bi('Eine Umfrage macht aus einzelnen Gemeinheiten ein gemeinsames Projekt. Jede Stimme zählt sichtbar mit.',
              'A poll turns scattered nastiness into a shared project. Every vote visibly counts towards it.'),
    },
    photo: {
      label: bi('Ein Bild ohne Erlaubnis weiterverbreitet',
                'A photo shared without permission'),
      why: bi('Am eigenen Bild hat jeder Mensch ein Recht. Weiterschicken ist schon die Verletzung.',
              'Everyone has a right to their own image. Forwarding it is already the violation.'),
    },
  },

  start: 'p1',
  nodes: {

    /* ---------- Phase 1: Der „Witz" ---------- */
    p1: {
      messages: [
        { kind: 'system', text: bi('Dienstag, 15:38 · 27 Mitglieder',
                                   'Tuesday, 15:38 · 27 members') },
        { from: 'them', sender: P.lena, time: '15:38', text: bi(
          'leute nicht vergessen, morgen sind die referate 📚',
          'guys do not forget, presentations are tomorrow 📚') },
        { from: 'them', sender: P.jonas, time: '15:40',
          image: bi('[Foto: Mia beim Referat, Mund halb offen]',
                    '[Photo: Mia mid-presentation, mouth half open]'),
          text: bi('hab noch ein andenken vom letzten mal gefunden 💀',
                   'found a little souvenir from last time 💀') },
        { from: 'them', sender: P.leo, time: '15:41', text: bi('AHAHAHA nice', 'AHAHAHA nice') },
        { from: 'them', sender: P.jonas, time: '15:41', text: bi(
          'sorry mia aber du siehst da echt aus wie ein fisch 🐟',
          'sorry mia but you honestly look like a fish there 🐟') },
      ],
      flags: ['photo', 'joke'],
      timer: 15,
      prompt: bi('Das Foto ist ohne Mias Erlaubnis im Chat. 27 Leute sehen es.',
                 'The photo is in the chat without Mia’s permission. 27 people can see it.'),
      choices: [
        { text: bi('„Nimm das Bild wieder raus."',
                   '“Take the picture down.”'),
          next: 'p2', effects: { courage: 3, mia: 6 }, verdict: 'good', catches: ['photo'],
          echo: { from: 'me', text: bi('nimm das bild wieder raus, das ist nicht witzig',
                                       'take the picture down, that is not funny') },
          why: bi('Früher Widerspruch ist der wirksamste Moment. Danach wird es für alle schwerer.',
                  'Early objection is the most effective moment there is. After this it gets harder for everyone.') },
        { text: bi('Mit 😂 reagieren',
                   'React with 😂'),
          next: 'p2', effects: { courage: -3, mia: -10 }, verdict: 'bad',
          echo: { kind: 'system', text: bi('Du reagierst mit 😂. Jetzt sind es vier Lacher.',
                                           'You react with 😂. That makes four laughs.') },
          why: bi('Ein Emoji ist kein Nichts. Es ist die Stimme, die den Nächsten ermutigt.',
                  'An emoji is not nothing. It is the vote that emboldens the next person.') },
        { text: bi('Mia privat schreiben, im Chat nichts sagen',
                   'Message Mia privately, say nothing in the chat'),
          next: 'p2', effects: { courage: 1, mia: 8 }, verdict: 'meh',
          echo: { kind: 'system', text: bi('Privat an Mia: „Das war nicht okay von Jonas."',
                                           'Privately to Mia: “That was not okay of Jonas.”') },
          why: bi('Hilft Mia sehr — aber die Gruppe sieht weiter nur Zustimmung.',
                  'It helps Mia a lot — but the group still sees nothing except agreement.') },
        { text: bi('Nichts tun', 'Do nothing'),
          next: 'p2', effects: { courage: 0, mia: -4 }, verdict: 'meh', timeout: true,
          echo: { kind: 'system', text: bi('Du liest mit und schreibst nichts.',
                                           'You read along and write nothing.') },
          why: bi('Für Mia sieht Schweigen aus wie Zustimmung. Sie kann es nicht unterscheiden.',
                  'To Mia, silence looks like agreement. She cannot tell the difference.') },
      ],
    },

    /* ---------- Phase 2: Die Masse ---------- */
    p2: {
      messages: [
        { from: 'them', sender: P.emily, time: '15:44', text: bi('😂😂😂', '😂😂😂') },
        { from: 'them', sender: P.leo, time: '15:44',
          text: bi('speichert das mal alle ab, das wird ein meme',
                   'everyone save this, it is going to be a meme'),
          reactions: ['😂 9', '💀 6'] },
        { from: 'them', sender: P.mia, time: '15:47', text: bi(
          'könnt ihr das bitte lassen 😐 ich hab euch nichts getan',
          'can you please stop 😐 I have not done anything to you') },
        { from: 'them', sender: P.jonas, time: '15:47', text: bi(
          'jetzt sei nicht so empfindlich, war doch nur spaß',
          'do not be so sensitive, it was only a joke') },
      ],
      flags: ['pileOn', 'joke'],
      timer: 13,
      prompt: bi('Mia hat sich gewehrt. Jonas nennt es Spaß.',
                 'Mia pushed back. Jonas calls it a joke.'),
      choices: [
        { text: bi('„Sie hat gesagt, sie will das nicht. Das reicht."',
                   '“She said she does not want this. That is enough.”'),
          next: 'p3', effects: { courage: 3, mia: 8 }, verdict: 'good', catches: ['joke', 'pileOn'],
          echo: { from: 'me', text: bi('sie hat gesagt sie will das nicht. das reicht.',
                                       'she said she does not want this. that is enough.') },
          why: bi('Du benennst die Grenze, statt über den Witz zu diskutieren. Genau richtig.',
                  'You name the boundary instead of arguing about the joke. Exactly right.') },
        { text: bi('„War doch wirklich nur Spaß, Mia."',
                   '“It really was just a joke, Mia.”'),
          next: 'p3', effects: { courage: -2, mia: -8 }, verdict: 'bad',
          echo: { from: 'me', text: bi('war doch wirklich nur spaß mia', 'it really was just a joke mia') },
          why: bi('Damit erklärst du der betroffenen Person, dass ihr Gefühl falsch ist.',
                  'You are telling the person affected that their own feeling is wrong.') },
        { text: bi('Das Foto bei der App melden',
                   'Report the photo in the app'),
          next: 'p3', effects: { courage: 2, mia: 4 }, verdict: 'good', catches: ['photo'],
          echo: { kind: 'system', text: bi('Du meldest das Bild. Eine Bestätigung erscheint.',
                                           'You report the image. A confirmation appears.') },
          why: bi('Melden ist leise und wirksam. Niemand im Chat sieht, dass du es warst.',
                  'Reporting is quiet and effective. Nobody in the chat sees that it was you.') },
        { text: bi('Nichts tun', 'Do nothing'),
          next: 'p3', effects: { courage: 0, mia: -6 }, verdict: 'meh', timeout: true,
          echo: { kind: 'system', text: bi('Niemand widerspricht. Der Chat läuft weiter.',
                                           'Nobody objects. The chat rolls on.') },
          why: bi('Nach Mias Bitte um Ruhe wiegt Schweigen schwerer als vorher.',
                  'After Mia asked them to stop, silence weighs more than it did before.') },
      ],
    },

    /* ---------- Phase 3: Der Fake-Account ---------- */
    p3: {
      messages: [
        { kind: 'system', text: bi('Mittwoch, 07:12', 'Wednesday, 07:12') },
        { from: 'them', sender: P.leo, time: '07:12', text: bi(
          'leute schaut mal 😭 @mia.offiziell_8b',
          'guys look at this 😭 @mia.offiziell_8b') },
        { from: 'them', sender: P.leo, time: '07:12',
          image: bi('[Profil mit Mias Foto, Beschreibung: „Fischgesicht der 8B"]',
                    '[Profile using Mia’s photo, bio: “8B’s fish face”]'),
          text: bi('hab ihr mal einen eigenen account gemacht 💀',
                   'made her a little account of her own 💀') },
        { from: 'them', sender: P.emily, time: '07:14', text: bi('leo das ist echt fies 😬',
                                                                 'leo that is actually mean 😬') },
        { from: 'them', sender: P.jonas, time: '07:15', text: bi('lol geil', 'lol amazing') },
      ],
      flags: ['fakeAccount'],
      timer: 13,
      prompt: bi('Ein gefälschtes Profil mit Mias Bild. Emily wird unsicher.',
                 'A fake profile using Mia’s picture. Emily is wavering.'),
      choices: [
        { text: bi('„Das ist strafbar. Lösch das sofort."',
                   '“That is a criminal offence. Delete it now.”'),
          next: 'p4_ally', effects: { courage: 4, mia: 10 }, verdict: 'good', catches: ['fakeAccount'],
          echo: { from: 'me', text: bi('das ist strafbar leo. lösch das sofort.',
                                       'that is a criminal offence leo. delete it now.') },
          why: bi('Klar und faktisch. Und Emily zweifelte schon — jetzt ist sie nicht mehr allein.',
                  'Clear and factual. And Emily was already wavering — now she is not alone.') },
        { text: bi('Screenshots machen und einer erwachsenen Person zeigen',
                   'Take screenshots and show an adult'),
          next: 'p4_ally', effects: { courage: 4, mia: 9 }, verdict: 'good', catches: ['fakeAccount'],
          echo: { kind: 'system', text: bi('Du sicherst Screenshots mit Datum und Uhrzeit.',
                                           'You save screenshots with date and time.') },
          why: bi('Beweise sichern ist der Schritt, den hinterher alle vermissen.',
                  'Preserving evidence is the step everybody wishes they had taken afterwards.') },
        { text: bi('Dem Fake-Account folgen, um zu sehen was passiert',
                   'Follow the fake account to see what happens'),
          next: 'p4_alone', effects: { courage: -3, mia: -10 }, verdict: 'bad',
          echo: { kind: 'system', text: bi('Der Account hat jetzt 14 Follower. Einer davon bist du.',
                                           'The account now has 14 followers. One of them is you.') },
          why: bi('Follower sind das Publikum. Ohne Publikum lohnt sich der Account nicht.',
                  'Followers are the audience. Without an audience the account has no point.') },
        { text: bi('Nichts tun', 'Do nothing'),
          next: 'p4_alone', effects: { courage: -1, mia: -8 }, verdict: 'bad', timeout: true,
          echo: { kind: 'system', text: bi('Emilys Zweifel bleiben unbeantwortet. Sie schreibt nichts mehr.',
                                           'Emily’s doubt goes unanswered. She writes nothing further.') },
          why: bi('Emily war kurz davor einzugreifen. Ein einziges „stimmt" hätte gereicht.',
                  'Emily was on the verge of stepping in. A single “agreed” would have been enough.') },
      ],
    },

    /* ---------- Phase 4a: mit Verbündeten ---------- */
    p4_ally: {
      messages: [
        { from: 'them', sender: P.emily, time: '07:18', text: bi('ja ehrlich, das geht zu weit',
                                                                 'yeah honestly, this is going too far') },
        { from: 'them', sender: P.tarek, time: '07:19', text: bi(
          'seh ich auch so. leo mach den account weg.',
          'agreed. leo take the account down.') },
        { from: 'them', sender: P.jonas, time: '07:22', text: bi(
          'boah ihr seid alle so sensibel. umfrage: wer findet mia auch cringe? 👇',
          'god you are all so sensitive. poll: who else thinks mia is cringe? 👇'),
          reactions: ['👍 3', '👎 4'] },
      ],
      flags: ['poll'],
      timer: 12,
      prompt: bi('Zwei Leute stehen jetzt neben dir. Jonas startet trotzdem die Umfrage.',
                 'Two people are standing with you now. Jonas starts the poll anyway.'),
      choices: [
        { text: bi('„Wir stimmen nicht über Menschen ab."',
                   '“We do not hold votes about people.”'),
          next: 'p5', effects: { courage: 4, mia: 10 }, verdict: 'good', catches: ['poll'],
          echo: { from: 'me', text: bi('wir stimmen hier nicht über menschen ab.',
                                       'we do not hold votes about people here.') },
          why: bi('Mit Rückendeckung wirkt ein Satz doppelt. Die Gruppe kippt.',
                  'With backing, one sentence lands twice as hard. The group turns.') },
        { text: bi('👎 stimmen und Mia in den Chat zurückholen',
                   'Vote 👎 and pull Mia back into the chat'),
          next: 'p5', effects: { courage: 3, mia: 9 }, verdict: 'good', catches: ['poll'],
          echo: { kind: 'system', text: bi('Du stimmst 👎. Es sind jetzt 3 zu 7 gegen Jonas.',
                                           'You vote 👎. It is now 3 to 7 against Jonas.') },
          why: bi('Die Umfrage gegen ihren Zweck zu nutzen, ist elegant und wirksam.',
                  'Turning the poll against its own purpose is elegant and effective.') },
        { text: bi('Nichts tun', 'Do nothing'),
          next: 'p5', effects: { courage: 0, mia: -4 }, verdict: 'meh', timeout: true,
          echo: { kind: 'system', text: bi('Emily und Tarek warten auf dich. Du schreibst nichts.',
                                           'Emily and Tarek are waiting for you. You write nothing.') },
          why: bi('Jetzt wäre es leicht gewesen. Zwei standen schon bereit.',
                  'This was the easy moment. Two people were already standing there.') },
      ],
    },

    /* ---------- Phase 4b: allein ---------- */
    p4_alone: {
      messages: [
        { from: 'them', sender: P.jonas, time: '07:22', text: bi(
          'umfrage: wer findet mia auch cringe? 👇',
          'poll: who else thinks mia is cringe? 👇'),
          reactions: ['👍 11', '👎 0'] },
        { from: 'them', sender: P.leo, time: '07:24', text: bi('11 zu 0 😭😭', '11 to 0 😭😭') },
        { from: 'them', sender: P.mia, time: '07:31', text: bi('...', '...') },
      ],
      flags: ['poll', 'silence'],
      timer: 12,
      prompt: bi('Elf zu null. Mia liest mit.', 'Eleven to nil. Mia is reading this.'),
      choices: [
        { text: bi('„Stopp. Das ist Mobbing, nichts anderes."',
                   '“Stop. This is bullying, nothing else.”'),
          next: 'p5', effects: { courage: 4, mia: 8 }, verdict: 'good', catches: ['poll', 'pileOn'],
          echo: { from: 'me', text: bi('stopp. das ist mobbing, nichts anderes.',
                                       'stop. this is bullying, nothing else.') },
          why: bi('Gegen elf anzuschreiben ist schwer. Für Mia ist es der wichtigste Satz des Tages.',
                  'Speaking against eleven people is hard. For Mia it is the most important sentence of the day.') },
        { text: bi('👍 stimmen, alle machen es',
                   'Vote 👍, everyone else is'),
          next: 'p5', effects: { courage: -4, mia: -14 }, verdict: 'bad',
          echo: { kind: 'system', text: bi('12 zu 0. Deine Stimme ist die zwölfte.',
                                           '12 to 0. Yours is the twelfth vote.') },
          why: bi('„Alle machen es" ist der Satz, mit dem jede Gruppe sich selbst freispricht.',
                  '“Everyone else is” is the sentence with which every group absolves itself.') },
        { text: bi('Nichts tun', 'Do nothing'),
          next: 'p5', effects: { courage: -1, mia: -10 }, verdict: 'bad', timeout: true,
          echo: { kind: 'system', text: bi('Die Umfrage steht bei 11 zu 0. Niemand widerspricht.',
                                           'The poll stands at 11 to 0. Nobody objects.') },
          why: bi('Bei elf zu null ist Schweigen für Mia nicht von Zustimmung zu unterscheiden.',
                  'At eleven to nil, Mia cannot tell your silence apart from agreement.') },
      ],
    },

    /* ---------- Phase 5: Mia geht ---------- */
    p5: {
      messages: [
        { kind: 'system', text: bi('Mia hat die Gruppe verlassen.', 'Mia has left the group.') },
        { from: 'them', sender: P.jonas, time: '07:36', text: bi('lol beleidigt', 'lol she is offended') },
        { kind: 'system', text: bi('Donnerstag. Mias Platz bleibt leer.',
                                   'Thursday. Mia’s seat stays empty.') },
      ],
      flags: ['silence'],
      timer: 16,
      prompt: bi('Mia ist weg — aus dem Chat und aus der Schule. Letzte Gelegenheit.',
                 'Mia is gone — from the chat and from school. Last chance.'),
      choices: [
        { text: bi('Mia schreiben: „Ich hätte früher was sagen sollen. Tut mir leid."',
                   'Message Mia: “I should have said something sooner. I am sorry.”'),
          next: 'end', effects: { courage: 3, mia: 12 }, verdict: 'good', catches: ['silence'],
          echo: { kind: 'system', text: bi('Privat an Mia. Nach zwanzig Minuten: „danke. echt."',
                                           'Privately to Mia. Twenty minutes later: “thanks. really.”') },
          why: bi('Zu spät ist besser als gar nicht. Für Mia zählt, dass überhaupt jemand kommt.',
                  'Too late beats never. What matters to Mia is that somebody came at all.') },
        { text: bi('Mit der Klassenlehrerin sprechen und die Screenshots zeigen',
                   'Talk to the form tutor and show the screenshots'),
          next: 'end', effects: { courage: 4, mia: 14 }, verdict: 'good', catches: ['silence', 'fakeAccount'],
          echo: { kind: 'system', text: bi('Am Freitag gibt es eine Klassenstunde. Der Fake-Account ist gelöscht.',
                                           'On Friday there is a class meeting. The fake account is gone.') },
          why: bi('Erwachsene einzuschalten ist kein Petzen. Es ist der Punkt, an dem es aufhört.',
                  'Getting adults involved is not telling tales. It is the point where it stops.') },
        { text: bi('Nichts tun', 'Do nothing'),
          next: 'end', effects: { courage: -2, mia: -10 }, verdict: 'bad', timeout: true,
          echo: { kind: 'system', text: bi('Der Chat redet über das Wochenende. Über Mia redet niemand mehr.',
                                           'The chat moves on to the weekend. Nobody mentions Mia again.') },
          why: bi('Das Ende der Geschichte hängt nicht davon ab, dass Mia stärker wird.',
                  'How this ends does not depend on Mia becoming tougher.') },
      ],
    },

    end: {
      outcome: 'done',
      messages: [],
    },
  },

  /**
   * Der Ausgang folgt aus dem gesammelten Verhalten, nicht aus der letzten Wahl.
   * Reihenfolge: erster Treffer von oben gewinnt.
   */
  endings: [
    {
      id: 'stopped',
      min: 11,
      tone: 'safe',
      role: bi('Ersthelfer:in', 'First responder'),
      roleWhy: bi('Du hast früh widersprochen und bist dabei geblieben. Andere haben sich angeschlossen.',
                  'You objected early and stuck with it. Others joined you.'),
      outcome: bi('Der Fake-Account ist gelöscht, Jonas hat sich entschuldigt — halbherzig, aber öffentlich. Mia kommt am Montag wieder in die Schule und schreibt wieder im Chat.',
                  'The fake account is gone and Jonas has apologised — half-heartedly, but publicly. Mia is back at school on Monday and posting in the chat again.'),
    },
    {
      id: 'softened',
      min: 5,
      tone: 'close',
      role: bi('Zwischenrufer:in', 'Occasional objector'),
      roleWhy: bi('Du hast etwas gesagt, aber nicht durchgehalten. Das hat gebremst, nicht gestoppt.',
                  'You said something, but did not keep it up. That slowed things down without stopping them.'),
      outcome: bi('Der Fake-Account bleibt eine Woche online. Mia fehlt vier Tage und wechselt danach in die Parallelklasse. Sie schreibt dir, dass deine eine Nachricht geholfen hat.',
                  'The fake account stays online for a week. Mia is absent for four days and then moves to the parallel class. She writes to tell you that your one message helped.'),
    },
    {
      id: 'watched',
      min: -2,
      tone: 'close',
      role: bi('Zuschauer:in', 'Bystander'),
      roleWhy: bi('Du hast nichts Böses getan. Du hast auch nichts getan.',
                  'You did nothing bad. You also did nothing.'),
      outcome: bi('Niemand hat widersprochen, also ging es weiter. Mia wechselt die Schule. In der Klasse redet man später darüber, dass „eigentlich alle" es doof fanden — gesagt hat es keiner.',
                  'Nobody objected, so it continued. Mia changes schools. Later the class agrees that “everyone really” thought it was awful — but nobody said so at the time.'),
    },
    {
      id: 'joined',
      min: -99,
      tone: 'scammed',
      role: bi('Mitläufer:in', 'Follower'),
      roleWhy: bi('Du hast mitgelacht, mitgestimmt oder mitgeteilt. Das war Teil davon.',
                  'You laughed along, voted along, or shared along. That was part of it.'),
      outcome: bi('Mia verlässt die Schule und ist mehrere Wochen krankgeschrieben. Die Schule schaltet die Polizei ein. Deine 😂 und deine Stimme stehen in den Screenshots.',
                  'Mia leaves the school and is signed off sick for several weeks. The school involves the police. Your 😂 and your vote are in the screenshots.'),
    },
  ],

  /** Was in den kritischen Momenten möglich gewesen wäre. */
  moments: [
    bi('Direkt nach dem ersten Foto — da war es noch ein einzelner Beitrag, kein Selbstläufer.',
       'Right after the first photo — it was still one post, not yet a snowball.'),
    bi('Als Mia selbst „lasst das" geschrieben hat. Da wartete sie darauf, dass jemand zustimmt.',
       'When Mia wrote “please stop”. That was her waiting for somebody to agree.'),
    bi('Als Emily gezweifelt hat. Zweifelnde brauchen genau eine zweite Stimme, dann kippt die Gruppe.',
       'When Emily wavered. A waverer needs exactly one second voice, and then the group turns.'),
    bi('Bei der Umfrage. Eine Gegenstimme macht aus „alle finden das" wieder „einer findet das".',
       'At the poll. One dissenting vote turns “everyone thinks so” back into “one person thinks so”.'),
  ],

  help: [
    bi('Nummer gegen Kummer: 116 111 — kostenlos und anonym, Mo–Sa 14–20 Uhr.',
       'Germany — Nummer gegen Kummer: 116 111, free and anonymous. UK — Childline: 0800 1111.'),
    bi('juuuport.de — Beratung von geschulten Jugendlichen, per Nachricht.',
       'juuuport.de — advice from trained young people, by message.'),
    bi('klicksafe.de — Material für Betroffene, Eltern und Lehrkräfte.',
       'klicksafe.de — material for those affected, parents and teachers.'),
    bi('Screenshots mit Datum sichern, nichts löschen — das sind Beweise.',
       'Save screenshots with the date and delete nothing — that is your evidence.'),
    bi('Mit einer erwachsenen Person sprechen. Das ist kein Petzen, das ist der Ausweg.',
       'Talk to an adult. That is not telling tales, that is the way out.'),
  ],
};

/** Wählt den Ausgang anhand des gesammelten Zivilcourage-Werts. */
export function pickEnding(story, courage) {
  return story.endings.find((e) => courage >= e.min) || story.endings[story.endings.length - 1];
}
