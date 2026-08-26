import { bi } from '../bi.js';

/** Story 4 — Gratis-Skins, in Wahrheit Account-Phishing über Discord. */
export default {
  id: 'gaming-skins',
  icon: '🎮',
  channel: 'discord',
  difficulty: 2,
  title: bi('Gratis-Skins, nur für dich', 'Free Skins, Just for You'),
  teaser: bi(
    'Ein Fremder auf Discord verschenkt Skins. Du musst dich nur kurz einloggen.',
    'A stranger on Discord is giving away skins. You only need to log in quickly.'),
  contact: {
    name: bi('xSkinDrop_Official', 'xSkinDrop_Official'),
    sub: bi('Discord · Direktnachricht', 'Discord · direct message'),
  },

  redFlags: {
    unsolicited: {
      label: bi('Fremde schreiben dich unaufgefordert an',
                'A stranger messages you out of nowhere'),
      why: bi('Niemand verschenkt an Unbekannte. Wenn du nicht der Kunde bist, bist du die Ware.',
              'Nobody gives things to strangers. If you are not the customer, you are the product.'),
    },
    loginElsewhere: {
      label: bi('Login auf einer fremden Seite',
                'Logging in on somebody else’s site'),
      why: bi('Kein Spiel und keine Plattform verlangt jemals, dass du dich auf einer dritten Seite einloggst.',
              'No game and no platform ever asks you to log in on a third-party site.'),
    },
    qrLogin: {
      label: bi('QR-Code, den du mit deiner App scannen sollst',
                'A QR code you are told to scan with your own app'),
      why: bi('Der Code gehört zur Sitzung des Betrügers. Scannst du ihn, loggst du ihn in deinen Account ein.',
              'The code belongs to the scammer’s session. Scanning it logs them into your account.'),
    },
    twoFactor: {
      label: bi('Der Bestätigungscode soll weitergegeben werden',
                'They ask you to pass on the confirmation code'),
      why: bi('Ein 2FA-Code ist ein Schlüssel. Wer danach fragt, will die Tür — niemand sonst braucht ihn je.',
              'A 2FA code is a key. Anyone who asks for it wants the door. Nobody legitimate ever needs it.'),
    },
    friendVouch: {
      label: bi('Ein „Freund" bürgt — aus einem gekaperten Account',
                'A “friend” vouches for it — from a hijacked account'),
      why: bi('Nach jeder Übernahme schreibt der Account seine Freundesliste an. Der Name stimmt, der Mensch nicht.',
              'After every takeover the account messages its whole friend list. The name is right, the person is not.'),
    },
    hurry: {
      label: bi('„Nur die ersten 20" — Zeitdruck',
                '“Only the first 20” — time pressure'),
      why: bi('Zeitdruck verhindert Nachfragen. Ein echtes Geschenk läuft nicht ab.',
              'Time pressure prevents questions. A real gift does not expire.'),
    },
  },

  start: 'n1',
  nodes: {

    n1: {
      messages: [
        { from: 'them', time: '17:29', text: bi(
          'yo! wir machen grad einen skin-drop für unseren neuen server 🎁 die ersten 20 kriegen ein legendary skin gratis. du bist dabei?',
          'yo! we are running a skin drop for our new server 🎁 first 20 people get a legendary skin free. you in?') },
      ],
      flags: ['unsolicited', 'hurry'],
      prompt: bi('Du kennst den Account nicht.', 'You do not know this account.'),
      choices: [
        { text: bi('„Klar, was muss ich tun?"', '“Sure, what do I have to do?”'),
          next: 'n2_link', risk: 2, verdict: 'bad',
          why: bi('Damit bist du im Skript. Der Rest ist nur noch Ablauf.',
                  'You are in the script now. Everything after this is just procedure.') },
        { text: bi('Blockieren und melden', 'Block and report'),
          next: 'end_blocked', risk: -2, verdict: 'good', catches: ['unsolicited', 'hurry'],
          why: bi('Unaufgeforderte Geschenke von Fremden gibt es nicht. Punkt.',
                  'Unsolicited gifts from strangers do not exist. Full stop.') },
        { text: bi('„Wer bist du und woher hast du meinen Namen?"',
                   '“Who are you and how did you get my name?”'),
          next: 'n2_vouch', risk: 0, verdict: 'good', catches: ['unsolicited'],
          why: bi('Nachfragen kostet nichts und bringt den Ablauf durcheinander.',
                  'Asking costs nothing and throws the script off.') },
      ],
    },

    n2_vouch: {
      messages: [
        { from: 'them', time: '17:31', text: bi('über den server von Lukas! frag ihn, der hat auch schon einen 😄',
                                                'through Lukas’s server! ask him, he already got one 😄') },
        { from: 'them', time: '17:33', sender: bi('Lukas', 'Lukas'), text: bi(
          'ja stimmt alles, hab meinen gestern bekommen, mach ruhig 👍',
          'yeah it is legit, got mine yesterday, go for it 👍') },
      ],
      flags: ['friendVouch'],
      prompt: bi('Lukas ist wirklich dein Freund. Oder war es zumindest sein Account.',
                 'Lukas really is your friend. Or at least it was his account.'),
      choices: [
        { text: bi('Lukas außerhalb von Discord fragen — per SMS',
                   'Ask Lukas outside Discord — by text message'),
          next: 'end_verified', risk: -2, verdict: 'good', catches: ['friendVouch', 'unsolicited'],
          why: bi('Prüfen über einen anderen Kanal. Genau so entlarvt man einen gekaperten Account.',
                  'Verify through a different channel. That is exactly how you expose a hijacked account.') },
        { text: bi('Wenn Lukas das sagt, passt das schon',
                   'If Lukas says so, it must be fine'),
          next: 'n2_link', risk: 3, verdict: 'bad',
          why: bi('Der Account ist echt, der Mensch dahinter nicht. Das ist der ganze Trick.',
                  'The account is real, the person behind it is not. That is the entire trick.') },
      ],
    },

    n2_link: {
      messages: [
        { from: 'them', time: '17:35', text: bi(
          'easy: geh auf steamcommunity-rewards.net, loggst dich mit deinem steam account ein, skin ist sofort im inventar ✅',
          'easy: go to steamcommunity-rewards.net, log in with your steam account, skin lands in your inventory right away ✅') },
      ],
      flags: ['loginElsewhere'],
      page: {
        url: bi('steamcommunity-rewards.net', 'steamcommunity-rewards.net'),
        badPart: bi('-rewards.net', '-rewards.net'),
        heading: bi('Bei Steam anmelden', 'Sign in to Steam'),
        fields: [
          bi('Benutzername', 'Username'),
          bi('Passwort', 'Password'),
        ],
      },
      prompt: bi('Die Seite sieht exakt aus wie der echte Steam-Login.',
                 'The page looks exactly like the genuine Steam login.'),
      choices: [
        { text: bi('Einloggen', 'Log in'),
          next: 'n3_code', risk: 3, verdict: 'bad', form: true,
          why: bi('Passwort abgegeben. Die Seite reicht es in Echtzeit an den echten Steam-Login weiter.',
                  'Password handed over. The page passes it straight to the real Steam login in real time.') },
        { text: bi('Adresse prüfen: heißt die Domain wirklich steam?',
                   'Check the address: is the domain really steam?'),
          next: 'n3_url', risk: 0, verdict: 'good', catches: ['loginElsewhere'],
          why: bi('steamcommunity-rewards.net gehört nicht zu Steam. Der Bindestrich ist der Betrug.',
                  'steamcommunity-rewards.net does not belong to Steam. The hyphen is the con.') },
        { text: bi('Abbrechen — ich logge mich nirgendwo sonst ein',
                   'Stop — I do not log in anywhere else'),
          next: 'end_blocked', risk: -2, verdict: 'good', catches: ['loginElsewhere', 'unsolicited'],
          why: bi('Die stärkste Regel im Netz: Login nur auf der Seite, die du selbst getippt hast.',
                  'The strongest rule online: only ever log in on a page you typed yourself.') },
      ],
    },

    n3_url: {
      messages: [
        { kind: 'system', text: bi(
          'Der echte Login läuft auf steamcommunity.com. Hier steht steamcommunity-rewards.net — ein völlig anderer Eigentümer.',
          'The genuine login lives on steamcommunity.com. This says steamcommunity-rewards.net — an entirely different owner.') },
      ],
      prompt: bi('Eindeutig gefälscht.', 'Unambiguously fake.'),
      choices: [
        { text: bi('Schließen, blockieren, Lukas warnen',
                   'Close it, block them, warn Lukas'),
          next: 'end_warned', risk: -2, verdict: 'good', catches: ['loginElsewhere', 'friendVouch', 'unsolicited'],
          why: bi('Lukas zu warnen stoppt die Kette. Sein Account schreibt gerade alle seine Freunde an.',
                  'Warning Lukas stops the chain. His account is messaging all of his friends right now.') },
        { text: bi('Egal, ich probier es kurz', 'Whatever, I will just try it'),
          next: 'n3_code', risk: 3, verdict: 'bad',
          why: bi('Du hast den Betrug erkannt und bist trotzdem hineingegangen.',
                  'You identified the fraud and walked in anyway.') },
      ],
    },

    n3_code: {
      messages: [
        { kind: 'system', text: bi('Auf deinem Handy erscheint: „Neuer Login aus Rotterdam. Bestätigungscode: 4471".',
                                   'Your phone lights up: “New login from Rotterdam. Confirmation code: 4471”.') },
        { from: 'them', time: '17:38', text: bi('perfekt! schick mir noch kurz den code aus deiner steam-app, dann schalte ich den skin frei',
                                                'perfect! just send me the code from your steam app and I will unlock the skin') },
      ],
      flags: ['twoFactor'],
      prompt: bi('Er will den Bestätigungscode. Und du bist gar nicht in Rotterdam.',
                 'They want the confirmation code. And you are nowhere near Rotterdam.'),
      choices: [
        { text: bi('Code niemals weitergeben — Passwort sofort ändern',
                   'Never share the code — change the password immediately'),
          next: 'end_close', risk: -1, verdict: 'good', catches: ['twoFactor'],
          why: bi('Die Zwei-Faktor-Abfrage war die letzte Tür. Du hast sie zugelassen.',
                  'Two-factor was the last remaining door. You kept it shut.') },
        { text: bi('Code schicken, der Skin wartet ja',
                   'Send the code, the skin is waiting'),
          next: 'end_taken', risk: 3, verdict: 'bad',
          why: bi('Damit ist der Account weg. Der Code war der letzte Schutz.',
                  'And the account is gone. That code was the last line of defence.') },
      ],
    },

    /* ---------- Enden ---------- */

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
        bi('Login-Daten gehören nur auf die offizielle Seite oder in die offizielle App.',
           'Login details belong only on the official site or in the official app.'),
      ],
    },

    end_verified: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi('Lukas per SMS: „Was für ein Skin? Mein Discord ist seit gestern gehackt, ich komm nicht mehr rein."',
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
        { kind: 'system', text: bi('Du warnst Lukas und den Klassenchat. Vier andere hätten den Link fast angeklickt.',
                                   'You warn Lukas and the class chat. Four other people had nearly clicked the link.') },
      ],
      damage: bi('Nichts verloren — Kette gestoppt', 'Nothing lost — chain broken'),
      lessons: [
        bi('Nach einer Übernahme schreibt der Account die ganze Freundesliste an. Warnen hilft sofort.',
           'After a takeover the account messages the entire friend list. Warning people helps immediately.'),
        bi('Der Bindestrich in einer Domain ist das häufigste Erkennungszeichen für Phishing.',
           'A hyphen inside a domain is the most common phishing tell there is.'),
      ],
    },

    end_close: {
      outcome: 'close',
      messages: [
        { kind: 'system', text: bi('Du änderst das Passwort, bevor er es benutzen kann. Der Login aus Rotterdam scheitert.',
                                   'You change the password before they can use it. The Rotterdam login fails.') },
      ],
      damage: bi('Passwort war weg — Account gerettet', 'Password was exposed — account saved'),
      lessons: [
        bi('Zwei-Faktor-Codes gibt man niemals weiter. An niemanden, aus keinem Grund.',
           'Never share a two-factor code. With nobody, for no reason.'),
        bi('Nach einem Phishing-Login sofort das Passwort ändern — überall, wo es gleich lautet.',
           'After a phishing login, change the password at once — everywhere you used the same one.'),
      ],
      recover: [
        bi('Passwort ändern und alle aktiven Sitzungen abmelden.',
           'Change the password and sign out of all active sessions.'),
        bi('Zwei-Faktor-Authentifizierung neu einrichten.',
           'Set up two-factor authentication again from scratch.'),
        bi('Dasselbe Passwort auf anderen Diensten ebenfalls austauschen.',
           'Replace the same password on every other service that used it.'),
      ],
    },

    end_taken: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi('Der Account ist weg. Mailadresse geändert, Inventar leergeräumt, Handelssperre umgangen.',
                                   'The account is gone. Email changed, inventory stripped, trade lock bypassed.') },
        { kind: 'system', text: bi('Am Abend schreibt dein Account deine ganze Freundesliste an: „yo! skin-drop 🎁"',
                                   'That evening your account messages your entire friend list: “yo! skin drop 🎁”') },
      ],
      damage: bi('Steam-Account + Inventar (ca. 340 €)', 'Steam account + inventory (about €340)'),
      lessons: [
        bi('Der Zwei-Faktor-Code ist der Schlüssel zum Account. Wer danach fragt, ist der Angreifer.',
           'The two-factor code is the key to your account. Whoever asks for it is the attacker.'),
        bi('Dein Account wird danach zur Waffe gegen deine Freunde. Deshalb sofort warnen.',
           'Your account then becomes a weapon against your friends. Warn them straight away.'),
      ],
      recover: [
        bi('Sofort den Support kontaktieren — mit Kaufbelegen lässt sich der Account oft zurückholen.',
           'Contact support immediately — with purchase receipts accounts can often be recovered.'),
        bi('Alle Freunde warnen, bevor der gekaperte Account sie anschreibt.',
           'Warn every friend before the hijacked account gets to them.'),
        bi('Passwort überall ändern, wo es gleich war, und 2FA neu einrichten.',
           'Change the password everywhere you reused it and set up 2FA again.'),
      ],
    },
  },
};
