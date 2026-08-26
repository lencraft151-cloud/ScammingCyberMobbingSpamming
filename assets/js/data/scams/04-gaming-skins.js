import { bi } from '../bi.js';

/** Story 4 — Gratis-Skins, in Wahrheit Account-Übernahme über Discord. */
export default {
  id: 'gaming-skins',
  icon: '🎮',
  channel: 'discord',
  difficulty: 2,
  title: bi('Gratis-Skins, nur für dich', 'Free Skins, Just for You'),
  teaser: bi(
    'Zwei Jahre Sammeln stecken in deinem Inventar. Ein Fremder will dir noch etwas schenken.',
    'Two years of collecting sit in your inventory. A stranger wants to give you even more.'),
  contact: {
    name: bi('xSkinDrop_Official', 'xSkinDrop_Official'),
    sub: bi('Discord · Direktnachricht · Mitglied seit 4 Tagen',
            'Discord · direct message · member for 4 days'),
  },

  redFlags: {
    unsolicited: {
      label: bi('Fremde schreiben dich unaufgefordert an',
                'A stranger messages you out of nowhere'),
      why: bi('Niemand verschenkt Wertsachen an Unbekannte. Die Frage ist nie „warum so großzügig", sondern „was will die andere Seite wirklich" — und die Antwort ist immer dein Account.',
              'Nobody gives valuables to strangers. The question is never “why so generous” but “what does the other side actually want” — and the answer is always your account.'),
    },
    loginElsewhere: {
      label: bi('Login auf einer fremden Seite',
                'Logging in on somebody else’s site'),
      why: bi('Kein Spiel und keine Plattform verlangt jemals, dass du dich auf einer dritten Seite einloggst, um etwas zu erhalten. Der Login ist kein Schritt zum Geschenk — er ist das Geschenk, für die andere Seite.',
              'No game and no platform ever requires you to log in on a third-party site to receive something. The login is not a step towards the gift — it is the gift, for the other side.'),
    },
    lookalikeDomain: {
      label: bi('Eine Adresse, die fast richtig aussieht',
                'An address that looks almost right'),
      why: bi('steamcommunity-rewards.net, steamcornmunity.com, steampowered.gift: ein Bindestrich, ein vertauschter Buchstabe, eine andere Endung. Der Blick springt über solche Unterschiede hinweg — genau darauf ist es angelegt.',
              'steamcommunity-rewards.net, steamcornmunity.com, steampowered.gift: a hyphen, a swapped letter, a different ending. The eye skips over differences like these — which is precisely the design.'),
    },
    twoFactor: {
      label: bi('Der Bestätigungscode soll weitergegeben werden',
                'They ask you to pass on the confirmation code'),
      why: bi('Ein Zwei-Faktor-Code ist ein Schlüssel, kein Beleg. Wer danach fragt, steht vor der Tür und hat schon das Passwort. Kein echter Support fragt jemals danach.',
              'A two-factor code is a key, not a receipt. Anyone asking for it is standing at the door and already has the password. No genuine support ever asks for one.'),
    },
    friendVouch: {
      label: bi('Ein „Freund" bürgt — aus einem gekaperten Account',
                'A “friend” vouches for it — from a hijacked account'),
      why: bi('Nach jeder Übernahme schreibt der Account automatisch seine ganze Freundesliste an. Der Name stimmt, das Profilbild stimmt, die Chatgeschichte stimmt — nur der Mensch dahinter ist ein anderer.',
              'After every takeover the account automatically messages its whole friend list. The name matches, the avatar matches, the chat history matches — only the person behind it is different.'),
    },
    hurry: {
      label: bi('„Nur die ersten 20" — Zeitdruck',
                '“Only the first 20” — time pressure'),
      why: bi('Zeitdruck verhindert Nachfragen und Beratung. Ein echtes Geschenk läuft nicht in vier Minuten ab.',
              'Time pressure prevents questions and second opinions. A real gift does not expire in four minutes.'),
    },
    tradeUrl: {
      label: bi('Deine Handels-URL ist keine harmlose Angabe',
                'Your trade link is not a harmless detail'),
      why: bi('Mit der Handels-URL kann jeder dir Handelsangebote schicken. Zusammen mit einem übernommenen Account genügt das, um dein Inventar in Minuten zu leeren.',
              'With your trade link anyone can send you trade offers. Combined with a hijacked account that is enough to empty your inventory in minutes.'),
    },
    afterTakeover: {
      label: bi('Der eigene Account wird zur Waffe',
                'Your own account becomes the weapon'),
      why: bi('Nach der Übernahme schreibt dein Account deine Freunde an — mit demselben Angebot. Deshalb ist Warnen wichtiger als Schämen.',
              'After the takeover your account messages your friends — with the same offer. Which is why warning people matters more than feeling embarrassed.'),
    },
  },

  start: 'n1',
  nodes: {

    /* ============ Kapitel 1: Die Nachricht ============ */

    n1: {
      chapter: bi('Kapitel 1 — Die Nachricht', 'Chapter 1 — The message'),
      messages: [
        { kind: 'system', text: bi(
          'In deinem Inventar liegen zwei Jahre Sammeln: getauscht, gespart, ein paar Sachen zum Geburtstag bekommen. Zusammen etwa 340 €.',
          'Your inventory holds two years of collecting: traded, saved for, a few pieces given as birthday presents. Worth around €340 in total.') },
        { from: 'them', time: '17:29', text: bi(
          'yo! wir machen grad einen skin-drop für unseren neuen server 🎁 die ersten 20 kriegen ein legendary skin gratis. bist du dabei?',
          'yo! we are running a skin drop for our new server 🎁 first 20 people get a legendary skin free. you in?') },
      ],
      flags: ['unsolicited', 'hurry'],
      tactic: 'greed',
      info: {
        icon: '🎣',
        title: bi('Warum gerade Gaming-Accounts?',
                  'Why gaming accounts specifically?'),
        body: [
          bi('Inventare lassen sich sofort weiterverkaufen, die Besitzer sind oft jung, und viele haben dasselbe Passwort noch bei drei anderen Diensten. Ein übernommener Account ist damit mehr wert als sein Inhalt.',
             'Inventories resell instantly, the owners are often young, and many reuse the same password on three other services. So a hijacked account is worth more than its contents.'),
          bi('Dazu kommt: Der Account ist ein Werkzeug. Nach der Übernahme schreibt er deine Freundesliste an, und die Masche läuft von allein weiter.',
             'On top of that, the account is a tool. After the takeover it messages your friend list and the con keeps running by itself.'),
        ],
      },
      prompt: bi('Du kennst den Account nicht. Er ist vier Tage alt.',
                 'You do not know this account. It is four days old.'),
      choices: [
        { text: bi('„Wer bist du und woher hast du meinen Namen?"',
                   '“Who are you and how did you get my name?”'),
          next: 'n2_vouch', risk: 0, verdict: 'good', catches: ['unsolicited'],
          why: bi('Nachfragen kostet nichts und bringt das Skript durcheinander. Die Antwort verrät fast immer mehr, als sie soll.',
                  'Asking costs nothing and throws the script off. The answer almost always gives away more than intended.') },
        { text: bi('Blockieren und melden', 'Block and report'),
          next: 'end_blocked', risk: -2, verdict: 'good', catches: ['unsolicited', 'hurry'],
          why: bi('Unaufgeforderte Geschenke von Fremden gibt es nicht. Das ist keine Faustregel, sondern ausnahmslos so.',
                  'Unsolicited gifts from strangers do not exist. That is not a rule of thumb, it holds without exception.') },
        { text: bi('„Klar, was muss ich tun?"', '“Sure, what do I have to do?”'),
          next: 'n3_link', risk: 2, verdict: 'bad',
          why: bi('Damit bist du im Skript. Ab hier ist alles vorbereitet — die Seite, die Ausreden, die Reihenfolge der Fragen.',
                  'You are in the script now. From here everything is prepared — the page, the excuses, the order of the questions.') },
      ],
    },

    n2_vouch: {
      messages: [
        { from: 'them', time: '17:31', text: bi('über den server von Lukas! frag ihn ruhig, der hat auch schon einen 😄',
                                                'through Lukas’s server! ask him if you like, he already got one 😄') },
        { from: 'them', time: '17:33', sender: bi('Lukas', 'Lukas'), text: bi(
          'ja stimmt alles, hab meinen gestern bekommen. mach ruhig, ist safe 👍',
          'yeah it is all legit, got mine yesterday. go for it, it is safe 👍') },
      ],
      flags: ['friendVouch'],
      tactic: 'socialProof',
      info: {
        icon: '🪪',
        title: bi('Der Account ist echt. Der Mensch nicht.',
                  'The account is real. The person is not.'),
        body: [
          bi('Das ist wirklich Lukas’ Account: sein Name, sein Bild, euer alter Chatverlauf darüber. Deshalb wirkt die Bestätigung so überzeugend — sie kommt aus einer Quelle, der du zu Recht vertraust.',
             'That really is Lukas’s account: his name, his picture, your old chat history above it. Which is why the confirmation is so convincing — it comes from a source you are right to trust.'),
          bi('Genau deshalb ist die Prüfung über einen zweiten Kanal so wirksam. Ein übernommener Account kann alles nachahmen, aber nicht ans Telefon gehen.',
             'And that is exactly why checking through a second channel works so well. A hijacked account can imitate anything, but it cannot pick up the phone.'),
        ],
      },
      prompt: bi('Lukas ist wirklich dein Freund. Zumindest war es sein Account.',
                 'Lukas really is your friend. Or at least it was his account.'),
      choices: [
        { text: bi('Lukas außerhalb von Discord fragen — per SMS',
                   'Ask Lukas outside Discord — by text message'),
          next: 'end_verified', risk: -2, verdict: 'good', catches: ['friendVouch', 'unsolicited'],
          why: bi('Prüfen über einen anderen Kanal. Genau so entlarvt man einen gekaperten Account — und nur so.',
                  'Verifying through another channel. That is exactly how you expose a hijacked account — and the only way.') },
        { text: bi('Im Klassenchat fragen, ob noch jemand die Nachricht bekam',
                   'Ask in the class chat whether anyone else got the message'),
          next: 'n2_group', risk: -1, verdict: 'good', catches: ['friendVouch'],
          why: bi('Auch gut: Wenn dieselbe Nachricht bei fünf Leuten liegt, ist die Sache klar.',
                  'Also good: if the same message is sitting in five people’s inboxes, the matter is settled.') },
        { text: bi('Wenn Lukas das sagt, passt das schon',
                   'If Lukas says so, it must be fine'),
          next: 'n3_link', risk: 3, verdict: 'bad',
          why: bi('Der Account ist echt, der Mensch dahinter nicht. Das ist der ganze Trick, und er funktioniert fast immer.',
                  'The account is real, the person behind it is not. That is the entire trick, and it works almost every time.') },
      ],
    },

    n2_group: {
      messages: [
        { kind: 'system', text: bi(
          'Drei Leute antworten innerhalb einer Minute: „hab ich auch bekommen", „ich auch", „Lukas ist gehackt, der schreibt allen".',
          'Three people reply within a minute: “got that too”, “same here”, “Lukas is hacked, he is messaging everyone”.') },
      ],
      flags: ['friendVouch', 'unsolicited'],
      tactic: 'socialProof',
      prompt: bi('Dieselbe Nachricht liegt bei der halben Klasse.',
                 'The same message is sitting with half the class.'),
      choices: [
        { text: bi('Lukas warnen und den Account melden',
                   'Warn Lukas and report the account'),
          next: 'end_warned', risk: -2, verdict: 'good', catches: ['friendVouch', 'unsolicited', 'afterTakeover'],
          why: bi('Lukas weiß es vielleicht noch nicht. Je schneller er sein Passwort ändert, desto weniger Freunde trifft es.',
                  'Lukas may not know yet. The faster he changes his password, the fewer friends get hit.') },
        { text: bi('Trotzdem mal gucken, was auf der Seite steht',
                   'Have a look at the page anyway'),
          next: 'n3_link', risk: 2, verdict: 'bad',
          why: bi('Drei Leute haben dir gerade gesagt, dass es Betrug ist. Neugier ist hier der teuerste Ratgeber.',
                  'Three people just told you it is fraud. Curiosity is the most expensive adviser here.') },
      ],
    },

    /* ============ Kapitel 2: Die Seite ============ */

    n3_link: {
      chapter: bi('Kapitel 2 — Die Seite', 'Chapter 2 — The page'),
      messages: [
        { from: 'them', time: '17:35', text: bi(
          'easy: geh auf steamcommunity-rewards.net, log dich mit deinem steam account ein, skin ist sofort im inventar ✅ dauert 30 sekunden',
          'easy: go to steamcommunity-rewards.net, log in with your steam account, skin lands in your inventory right away ✅ takes 30 seconds') },
      ],
      flags: ['loginElsewhere', 'lookalikeDomain'],
      tactic: 'authority',
      page: {
        url: bi('steamcommunity-rewards.net/login', 'steamcommunity-rewards.net/login'),
        badPart: bi('-rewards.net', '-rewards.net'),
        heading: bi('Bei Steam anmelden', 'Sign in to Steam'),
        fields: [
          bi('Benutzername', 'Username'),
          bi('Passwort', 'Password'),
        ],
      },
      info: {
        icon: '🪞',
        title: bi('Die Seite ist kein Nachbau — sie ist ein Fenster',
                  'The page is not a copy — it is a window'),
        body: [
          bi('Was du eingibst, wird in Echtzeit an den echten Steam-Login weitergereicht. Deshalb funktioniert alles genau so, wie du es kennst: falsches Passwort wird abgelehnt, richtiges akzeptiert, danach kommt die echte Zwei-Faktor-Abfrage auf dein Handy.',
             'Whatever you type is passed straight to the genuine Steam login in real time. Which is why everything behaves exactly as you expect: a wrong password is rejected, a correct one accepted, and then the genuine two-factor prompt arrives on your phone.'),
          bi('Dass es „richtig funktioniert", ist deshalb kein Beweis für Echtheit. Im Gegenteil: Es ist der Grund, warum die Masche so selten auffällt.',
             'So the fact that it “works properly” proves nothing. On the contrary: it is the reason the con so rarely gets noticed.'),
        ],
      },
      prompt: bi('Die Seite sieht exakt aus wie der echte Steam-Login.',
                 'The page looks exactly like the genuine Steam login.'),
      choices: [
        { text: bi('Adresse prüfen: heißt die Domain wirklich steam?',
                   'Check the address: is the domain really steam?'),
          next: 'n4_url', risk: 0, verdict: 'good', catches: ['lookalikeDomain'],
          why: bi('steamcommunity.com wäre echt. steamcommunity-rewards.net gehört „rewards.net". Der Bindestrich ist der ganze Betrug.',
                  'steamcommunity.com would be genuine. steamcommunity-rewards.net belongs to “rewards.net”. The hyphen is the entire fraud.') },
        { text: bi('Abbrechen — ich logge mich nirgendwo sonst ein',
                   'Stop — I do not log in anywhere else'),
          next: 'end_blocked', risk: -2, verdict: 'good', catches: ['loginElsewhere', 'unsolicited'],
          why: bi('Die stärkste Regel im Netz: Login nur in der App oder auf der Seite, die du selbst getippt hast.',
                  'The strongest rule online: only log in in the app, or on a page you typed yourself.') },
        { text: bi('Einloggen', 'Log in'),
          next: 'n5_code', risk: 3, verdict: 'bad', form: true,
          why: bi('Passwort abgegeben. Die Seite hat es in derselben Sekunde beim echten Steam eingetippt.',
                  'Password handed over. The page typed it into the real Steam in the same second.') },
      ],
    },

    n4_url: {
      messages: [
        { kind: 'system', text: bi(
          'Der echte Login läuft auf steamcommunity.com. Hier steht steamcommunity-rewards.net — der Eigentümer ist „rewards.net", nicht Steam.',
          'The genuine login lives on steamcommunity.com. This says steamcommunity-rewards.net — the owner is “rewards.net”, not Steam.') },
      ],
      flags: ['lookalikeDomain'],
      tactic: 'authority',
      info: {
        icon: '🔤',
        title: bi('Drei Tricks mit Adressen, die man kennen sollte',
                  'Three address tricks worth knowing'),
        body: [
          bi('Bindestrich: steamcommunity-rewards.net sieht aus wie Steam, gehört aber rewards.net. Alles vor dem letzten Punkt-Teil ist frei erfunden.',
             'Hyphen: steamcommunity-rewards.net looks like Steam but belongs to rewards.net. Everything before the final part is free invention.'),
          bi('Vertauschte Buchstaben: steamcornmunity.com — „rn" statt „m". Bei kleiner Schrift praktisch unsichtbar.',
             'Swapped letters: steamcornmunity.com — “rn” instead of “m”. At small text sizes practically invisible.'),
          bi('Andere Endung: steampowered.gift statt steampowered.com. Die Endung gehört zur Adresse und ändert den Eigentümer komplett.',
             'Different ending: steampowered.gift instead of steampowered.com. The ending is part of the address and changes the owner entirely.'),
        ],
      },
      prompt: bi('Eindeutig gefälscht. Was jetzt?', 'Unambiguously fake. Now what?'),
      choices: [
        { text: bi('Schließen, blockieren, Lukas warnen',
                   'Close it, block them, warn Lukas'),
          next: 'end_warned', risk: -2, verdict: 'good', catches: ['lookalikeDomain', 'friendVouch', 'unsolicited'],
          why: bi('Lukas warnen stoppt die Kette. Sein Account schreibt gerade seine ganze Freundesliste an.',
                  'Warning Lukas breaks the chain. His account is messaging his entire friend list right now.') },
        { text: bi('Egal, ich probier es kurz', 'Whatever, I will just try it'),
          next: 'n5_code', risk: 3, verdict: 'bad',
          why: bi('Du hast den Betrug bewiesen und gehst trotzdem hinein. Das ist der teuerste Klick der Geschichte.',
                  'You proved the fraud and walked in regardless. That is the most expensive click in this story.') },
      ],
    },

    /* ============ Kapitel 3: Der Code ============ */

    n5_code: {
      chapter: bi('Kapitel 3 — Der Code', 'Chapter 3 — The code'),
      messages: [
        { kind: 'system', text: bi(
          'Auf deinem Handy erscheint die echte Steam-Meldung: „Neuer Login aus Rotterdam. Bestätigungscode: 4471".',
          'The genuine Steam alert appears on your phone: “New login from Rotterdam. Confirmation code: 4471”.') },
        { from: 'them', time: '17:38', text: bi(
          'perfekt! schick mir noch kurz den code aus deiner steam-app, dann schalte ich den skin frei',
          'perfect! just send me the code from your steam app and I will unlock the skin') },
      ],
      flags: ['twoFactor'],
      tactic: 'authority',
      info: {
        icon: '🔑',
        title: bi('Was ein Zwei-Faktor-Code eigentlich ist',
                  'What a two-factor code actually is'),
        body: [
          bi('Der Code beweist nicht, dass du etwas bekommst. Er beweist, dass jemand gerade versucht, sich einzuloggen — und dass dieser Jemand deine Erlaubnis braucht.',
             'The code does not prove you are receiving something. It proves somebody is trying to log in right now — and that this somebody needs your permission.'),
          bi('Die Meldung sagt dir sogar, von wo: Rotterdam. Du sitzt zu Hause. Das ist keine Bestätigung deines Geschenks, das ist eine Einbruchsmeldung.',
             'The alert even tells you where from: Rotterdam. You are sitting at home. That is not a confirmation of your gift, that is a break-in alarm.'),
          bi('Merksatz: Einen 2FA-Code gibt man niemals weiter. An niemanden, aus keinem Grund — auch nicht an „den Support".',
             'Rule to keep: never share a 2FA code. With nobody, for no reason — not even with “support”.'),
        ],
      },
      prompt: bi('Er will den Bestätigungscode. Und du bist nicht in Rotterdam.',
                 'They want the confirmation code. And you are not in Rotterdam.'),
      choices: [
        { text: bi('Code niemals weitergeben — Passwort sofort ändern',
                   'Never share the code — change the password immediately'),
          next: 'n6_secure', risk: -1, verdict: 'good', catches: ['twoFactor'],
          why: bi('Die Zwei-Faktor-Abfrage war die letzte Tür, und du hast sie zugehalten. Jetzt zählt Geschwindigkeit.',
                  'Two-factor was the last remaining door and you held it shut. Now speed is what counts.') },
        { text: bi('Code schicken, der Skin wartet ja',
                   'Send the code, the skin is waiting'),
          next: 'n6_taken', risk: 3, verdict: 'bad',
          why: bi('Damit ist der Account weg. Der Code war der letzte Schutz, und er wurde freiwillig abgegeben.',
                  'And the account is gone. The code was the last line of defence, and it was handed over voluntarily.') },
      ],
    },

    n6_secure: {
      messages: [
        { kind: 'system', text: bi(
          'Du änderst das Passwort und meldest alle Geräte ab. Der Login aus Rotterdam scheitert.',
          'You change the password and sign out of all devices. The Rotterdam login fails.') },
        { from: 'them', time: '17:44', text: bi(
          'komm schon, der code ist nur zur bestätigung dass du es wirklich bist 🙄 sonst kann ich den skin nicht schicken',
          'come on, the code is just to confirm it is really you 🙄 otherwise I cannot send the skin') },
      ],
      flags: ['twoFactor'],
      tactic: 'urgency',
      prompt: bi('Er versucht es weiter. Das Passwort ist schon geändert.',
                 'They keep trying. The password is already changed.'),
      choices: [
        { text: bi('Blockieren, melden und dasselbe Passwort überall austauschen',
                   'Block, report, and replace that password everywhere else'),
          next: 'end_close', risk: -2, verdict: 'good', catches: ['twoFactor', 'loginElsewhere'],
          why: bi('Der wichtigste Schritt zum Schluss: Wenn dasselbe Passwort noch woanders liegt, ist dort dieselbe Tür offen.',
                  'The most important final step: if the same password is used elsewhere, the same door is open there too.') },
        { text: bi('Doch noch den Code schicken, er wirkt so überzeugend',
                   'Send the code after all, they sound so convincing'),
          next: 'n6_taken', risk: 3, verdict: 'bad',
          why: bi('Beharrlichkeit ist kein Beweis für Ehrlichkeit. Sie ist Teil des Jobs.',
                  'Persistence is not evidence of honesty. It is part of the job.') },
      ],
    },

    n6_taken: {
      messages: [
        { kind: 'system', text: bi(
          'Innerhalb von zwei Minuten: Mailadresse geändert, Handynummer entfernt, Inventar leergeräumt.',
          'Within two minutes: email address changed, phone number removed, inventory emptied.') },
        { kind: 'system', text: bi(
          'Um 19:10 schreibt dein eigener Account deine ganze Freundesliste an: „yo! skin-drop 🎁"',
          'At 19:10 your own account messages your entire friend list: “yo! skin drop 🎁”') },
      ],
      flags: ['afterTakeover'],
      tactic: 'shame',
      prompt: bi('Deine Freunde bekommen gerade dieselbe Nachricht — von dir.',
                 'Your friends are getting the same message right now — from you.'),
      choices: [
        { text: bi('Sofort alle warnen und den Support kontaktieren',
                   'Warn everyone at once and contact support'),
          next: 'end_taken_warned', risk: -1, verdict: 'good', catches: ['afterTakeover'],
          why: bi('Unangenehm, aber es stoppt die Kette. Mit Kaufbelegen holt der Support Accounts oft zurück.',
                  'Uncomfortable, but it breaks the chain. With purchase receipts, support often recovers accounts.') },
        { text: bi('Erst mal gar nichts sagen, das ist zu peinlich',
                   'Say nothing for now, it is too embarrassing'),
          next: 'end_taken_silent', risk: 3, verdict: 'bad',
          why: bi('Jede Stunde Schweigen kostet einen weiteren Freund seinen Account. Scham ist hier wörtlich ansteckend.',
                  'Every hour of silence costs another friend their account. Here, shame is literally contagious.') },
      ],
    },

    /* ============ Ausgänge ============ */

    end_blocked: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi('Blockiert und gemeldet. Zwei Tage später ist der Account bei Discord gesperrt.',
                                   'Blocked and reported. Two days later Discord bans the account.') },
      ],
      damage: bi('Nichts verloren', 'Nothing lost'),
      lessons: [
        bi('Gratis-Skins von Fremden gibt es nicht. Nie.',
           'Free skins from strangers do not exist. Ever.'),
        bi('Login-Daten gehören nur in die offizielle App oder auf die selbst getippte Adresse.',
           'Login details belong only in the official app or on an address you typed yourself.'),
        bi('Zwei-Faktor-Authentifizierung einschalten — sie ist die Tür, an der diese Masche scheitert.',
           'Turn on two-factor authentication — it is the door this con fails at.'),
      ],
    },

    end_verified: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'Lukas per SMS: „Was für ein Skin? Mein Discord ist seit gestern gehackt, ich komm nicht mehr rein."',
          'Lukas by text: “What skin? My Discord got hacked yesterday, I cannot get back in.”') },
      ],
      damage: bi('Nichts verloren — und Lukas gewarnt', 'Nothing lost — and Lukas warned'),
      lessons: [
        bi('Empfehlungen immer über einen anderen Kanal prüfen: anrufen, SMS, persönlich fragen.',
           'Always verify a recommendation through another channel: call, text, ask in person.'),
        bi('Ein gekaperter Account ist die überzeugendste Empfehlung, die es gibt — deshalb wird er benutzt.',
           'A hijacked account is the most convincing recommendation there is. That is why it gets used.'),
      ],
    },

    end_warned: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'Du warnst Lukas und den Klassenchat. Vier andere hätten den Link fast angeklickt. Lukas hat seinen Account am Abend zurück.',
          'You warn Lukas and the class chat. Four other people had nearly clicked the link. Lukas has his account back by the evening.') },
      ],
      damage: bi('Nichts verloren — Kette gestoppt', 'Nothing lost — chain broken'),
      lessons: [
        bi('Nach einer Übernahme schreibt der Account die ganze Freundesliste an. Warnen wirkt sofort.',
           'After a takeover the account messages the entire friend list. Warning people works immediately.'),
        bi('Ein Bindestrich oder ein vertauschter Buchstabe in der Adresse ist das häufigste Phishing-Merkmal.',
           'A hyphen or a swapped letter in the address is the most common phishing tell.'),
      ],
    },

    end_close: {
      outcome: 'close',
      messages: [
        { kind: 'system', text: bi(
          'Der Account bleibt deiner. Du änderst dasselbe Passwort auch bei deiner Mailadresse und in zwei Spielen — dort war es identisch.',
          'The account stays yours. You also change that password on your email and in two games — it was identical there.') },
      ],
      damage: bi('Passwort war weg — Account gerettet', 'Password was exposed — account saved'),
      lessons: [
        bi('Zwei-Faktor-Codes gibt man niemals weiter. An niemanden, aus keinem Grund.',
           'Never share a two-factor code. With nobody, for no reason.'),
        bi('Nach einem Phishing-Login sofort das Passwort ändern — überall, wo es gleich lautet.',
           'After a phishing login change the password at once — everywhere you reused it.'),
        bi('Ein Passwortmanager verhindert genau dieses Problem: Jeder Dienst bekommt ein eigenes Passwort.',
           'A password manager prevents exactly this problem: every service gets its own password.'),
      ],
      recover: [
        bi('Passwort ändern und alle aktiven Sitzungen abmelden.',
           'Change the password and sign out of all active sessions.'),
        bi('Zwei-Faktor-Authentifizierung neu einrichten.',
           'Set up two-factor authentication again from scratch.'),
        bi('Dasselbe Passwort auf allen anderen Diensten austauschen.',
           'Replace the same password on every other service.'),
      ],
    },

    end_taken_warned: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi(
          'Das Inventar ist weg. Aber deine Warnung erreicht die Freundesliste vor der Betrugsnachricht — niemand sonst klickt.',
          'The inventory is gone. But your warning reaches the friend list before the scam message — nobody else clicks.') },
        { kind: 'system', text: bi(
          'Nach elf Tagen gibt der Support dir den Account zurück. Die Skins bleiben verschwunden.',
          'After eleven days support returns the account to you. The skins stay gone.') },
      ],
      damage: bi('Inventar (ca. 340 €) — Account zurück', 'Inventory (about €340) — account recovered'),
      lessons: [
        bi('Der Zwei-Faktor-Code ist der Schlüssel zum Account. Wer danach fragt, ist der Angreifer.',
           'The two-factor code is the key to your account. Whoever asks for it is the attacker.'),
        bi('Schnelles Warnen begrenzt den Schaden auf dich allein.',
           'Warning people quickly limits the damage to you alone.'),
        bi('Kaufbelege aufheben — mit ihnen holt der Support Accounts oft zurück.',
           'Keep your purchase receipts — support often recovers accounts with them.'),
      ],
      recover: [
        bi('Sofort den Support kontaktieren, mit Kaufbelegen und alter Mailadresse.',
           'Contact support immediately, with purchase receipts and your old email address.'),
        bi('Alle Freunde warnen, bevor der gekaperte Account sie erreicht.',
           'Warn every friend before the hijacked account reaches them.'),
        bi('Passwort überall ändern, wo es gleich war, und 2FA neu einrichten.',
           'Change the password everywhere you reused it and set up 2FA again.'),
      ],
    },

    end_taken_silent: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi(
          'Bis zum nächsten Morgen haben drei deiner Freunde geklickt. Einer davon hat den Code geschickt.',
          'By the next morning three of your friends have clicked. One of them sent the code.') },
        { kind: 'system', text: bi(
          'Der Support braucht drei Wochen. Die Skins sind längst weiterverkauft.',
          'Support takes three weeks. The skins were resold long ago.') },
      ],
      flags: ['afterTakeover'],
      damage: bi('Inventar (ca. 340 €) + drei Accounts im Freundeskreis',
                 'Inventory (about €340) + three accounts among your friends'),
      lessons: [
        bi('Dein Account wird nach der Übernahme zur Waffe gegen deine Freunde.',
           'After a takeover your account becomes a weapon against your friends.'),
        bi('Schweigen aus Scham ist hier der eigentliche Schaden — er trifft andere, nicht dich.',
           'Staying silent out of shame is the real damage here — and it hits other people, not you.'),
      ],
      recover: [
        bi('Sofort alle warnen, auch verspätet. Jede Stunde zählt.',
           'Warn everyone immediately, even late. Every hour counts.'),
        bi('Support kontaktieren und den Account zurückfordern.',
           'Contact support and reclaim the account.'),
        bi('Überall dasselbe Passwort austauschen und 2FA einschalten.',
           'Replace the reused password everywhere and switch on 2FA.'),
      ],
    },
  },
};
