import { bi } from '../bi.js';

/** Story 8 — Krypto-Anlagebetrug über eine gefälschte Trading-Plattform. */
export default {
  id: 'krypto',
  icon: '📈',
  channel: 'instagram',
  difficulty: 3,
  title: bi('Aus 250 € werden 2.400 €', '€250 Becomes €2,400'),
  teaser: bi(
    'Eine Anzeige verspricht Rendite. Ein Berater ruft an. Die Kurve steigt wirklich.',
    'An ad promises returns. An advisor calls. And the chart really does go up.'),
  contact: {
    name: bi('Daniel — CryptoGrowth', 'Daniel — CryptoGrowth'),
    sub: bi('Persönlicher Anlageberater', 'Personal investment advisor'),
  },

  redFlags: {
    guaranteedReturn: {
      label: bi('Garantierte Rendite',
                'Guaranteed returns'),
      why: bi('An keinem Markt der Welt gibt es Gewinn ohne Risiko. Wer eine Garantie ausspricht, hat damit bereits gelogen — unabhängig von allem, was danach kommt.',
              'No market on earth offers profit without risk. Anyone stating a guarantee has already lied — regardless of anything that follows.'),
    },
    celebrity: {
      label: bi('Prominente, die nie zugestimmt haben',
                'Celebrities who never agreed to this'),
      why: bi('Fotos und Zitate bekannter Personen werden ungefragt verwendet, oft eingebettet in einen gefälschten Zeitungsartikel mit echtem Zeitungslogo. Die Betroffenen klagen regelmäßig dagegen.',
              'Photos and quotes of well-known people get used without permission, often embedded in a fake news article carrying a real newspaper logo. Those affected regularly sue over it.'),
    },
    noLicence: {
      label: bi('Keine Zulassung, kein Sitz, kein Impressum',
                'No licence, no registered office, no legal notice'),
      why: bi('Wer in Deutschland Anlagen anbietet, braucht eine Erlaubnis der Finanzaufsicht. Ob eine Firma sie hat, steht in einem öffentlichen Register und ist in einer Minute geprüft.',
              'Offering investments in Germany requires authorisation from the financial regulator. Whether a firm has it is in a public register and takes a minute to check.'),
    },
    remoteAccess: {
      label: bi('Fernwartungssoftware auf deinem Gerät',
                'Remote access software on your device'),
      why: bi('„Ich helfe Ihnen beim Einrichten" heißt: Er sieht deinen Bildschirm, dein Online-Banking, deine Mails und deine TAN — und kann selbst klicken. Das ist der gefährlichste einzelne Schritt in allen acht Geschichten.',
              '“Let me help you set it up” means: they see your screen, your online banking, your email and your one-time codes — and can click things themselves. It is the single most dangerous step in all eight stories.'),
    },
    fakeDashboard: {
      label: bi('Ein Kontostand, den nur du siehst',
                'A balance only you can see'),
      why: bi('Die schöne Kurve ist eine Webseite, keine Investition. Die Zahlen werden im Hintergrund von Hand eingetragen und steigen genau so weit, wie es nötig ist, damit du nachlegst.',
              'The pretty chart is a web page, not an investment. The numbers are typed in by hand behind the scenes and rise exactly as far as needed to make you add more.'),
    },
    payToWithdraw: {
      label: bi('Erst zahlen, um auszahlen zu können',
                'Paying in order to be paid out'),
      why: bi('Steuer, Bearbeitungsgebühr, Verifizierungskaution: Sobald du auszahlen willst, entstehen neue Forderungen. Es kommt nie etwas zurück — der Auszahlungswunsch ist der Auslöser für die nächste Runde.',
              'Tax, processing fee, verification deposit: the moment you ask to withdraw, new demands appear. Nothing ever comes back — the withdrawal request is the trigger for the next round.'),
    },
    smallWin: {
      label: bi('Die erste kleine Auszahlung funktioniert wirklich',
                'The first small payout genuinely works'),
      why: bi('Wenn 50 € tatsächlich ankommen, ist das kein Beweis für Seriosität, sondern eine Investition der Gegenseite: Sie kauft damit dein Vertrauen für die große Einzahlung.',
              'If €50 really does arrive, that is not proof of legitimacy but an investment by the other side: they are buying your trust for the large deposit.'),
    },
    recoveryScam: {
      label: bi('Die „Rückhol-Kanzlei" nach dem Verlust',
                'The “recovery firm” after the loss'),
      why: bi('Wer Geld verloren hat, steht auf einer Liste, die gehandelt wird. Das Angebot, es gegen Vorkasse zurückzuholen, ist die zweite Masche — oft von denselben Leuten.',
              'Anyone who has lost money is on a list that gets traded. The offer to recover it for a fee up front is the second con — often run by the same people.'),
    },
  },

  start: 'n1',
  nodes: {

    /* ============ Kapitel 1: Die Anzeige ============ */

    n1: {
      chapter: bi('Kapitel 1 — Die Anzeige', 'Chapter 1 — The advert'),
      messages: [
        { kind: 'system', text: bi(
          'Du hast 4.000 € gespart und liest seit Wochen, dass Sparbücher nichts mehr bringen. Abends taucht die Anzeige zum vierten Mal auf.',
          'You have €4,000 saved and have spent weeks reading that savings accounts return nothing. In the evening the advert appears for the fourth time.') },
        { from: 'them', time: '21:38',
          image: bi('[Anzeige: bekanntes Gesicht aus dem Fernsehen, Layout wie ein Zeitungsartikel]',
                    '[Ad: a familiar face from television, laid out like a newspaper article]'),
          text: bi('„Ich habe mit 250 € angefangen und nach zwei Wochen 2.400 € abgehoben." — Jetzt kostenlos testen.',
                   '“I started with €250 and withdrew €2,400 two weeks later.” — Try it free now.') },
      ],
      flags: ['guaranteedReturn', 'celebrity'],
      tactic: 'greed',
      info: {
        icon: '📰',
        title: bi('Der gefälschte Zeitungsartikel',
                  'The fake news article'),
        body: [
          bi('Die Seite hinter der Anzeige sieht aus wie ein echter Artikel: Logo einer bekannten Zeitung, Datum, Autorenzeile, Kommentare darunter. Alles davon ist nachgebaut.',
             'The page behind the advert looks like a genuine article: a well-known newspaper’s logo, a date, a byline, comments underneath. All of it is fabricated.'),
          bi('Prüfen lässt es sich in zehn Sekunden: die Zeitung selbst aufrufen und dort nach dem Artikel suchen. Er existiert nicht. Prominente warnen regelmäßig öffentlich davor, dass ihr Name so benutzt wird.',
             'You can check it in ten seconds: open the newspaper’s own site and search for the article. It does not exist. The celebrities involved regularly issue public warnings that their names are used this way.'),
        ],
      },
      prompt: bi('4.000 € auf dem Sparbuch, 0,1 % Zinsen. Und hier verspricht jemand das Zehnfache.',
                 '€4,000 in a savings account at 0.1 %. And here somebody is promising ten times that.'),
      choices: [
        { text: bi('Den Namen der Plattform zusammen mit „Betrug" suchen',
                   'Search the platform’s name together with “scam”'),
          next: 'n2_search', risk: -1, verdict: 'good', catches: ['guaranteedReturn'],
          why: bi('Die einfachste Prüfung überhaupt — und meist die schnellste Antwort. Zehn Sekunden vor der ersten Einzahlung.',
                  'The simplest check there is — and usually the fastest answer. Ten seconds before the first deposit.') },
        { text: bi('Prüfen, ob es den Zeitungsartikel wirklich gibt',
                   'Check whether the newspaper article really exists'),
          next: 'n2_article', risk: -1, verdict: 'good', catches: ['celebrity'],
          why: bi('Genau richtig: Eine überprüfbare Behauptung überprüfen, statt dem Layout zu glauben.',
                  'Exactly right: check a checkable claim instead of believing a layout.') },
        { text: bi('Weiterscrollen und die Anzeige melden',
                   'Scroll past and report the advert'),
          next: 'end_ignored', risk: -2, verdict: 'good', catches: ['celebrity', 'guaranteedReturn'],
          why: bi('Prominente werben nicht für Krypto-Plattformen. Ihre Bilder werden gestohlen, ohne Ausnahme.',
                  'Celebrities do not advertise crypto platforms. Their pictures are stolen, without exception.') },
        { text: bi('Formular ausfüllen, kostet ja nichts',
                   'Fill in the form, it costs nothing'),
          next: 'n3_call', risk: 2, verdict: 'bad',
          why: bi('Es kostet deine Telefonnummer. Und die ist der eigentliche Anfang — ab jetzt wird angerufen, oft monatelang.',
                  'It costs you your phone number. And that is the real beginning — from now on they call, often for months.') },
      ],
    },

    n2_article: {
      messages: [
        { kind: 'system', text: bi(
          'Auf der echten Zeitungsseite gibt es keinen solchen Artikel. Dafür findest du eine Meldung: „Erneut Betrugsanzeigen mit unserem Logo im Umlauf."',
          'On the newspaper’s own site no such article exists. Instead you find a notice: “Fraudulent adverts using our logo are circulating again.”') },
      ],
      flags: ['celebrity'],
      tactic: 'authority',
      prompt: bi('Die Zeitung warnt selbst davor.', 'The newspaper is warning about it itself.'),
      choices: [
        { text: bi('Anzeige melden und weitergehen',
                   'Report the advert and move on'),
          next: 'end_ignored', risk: -2, verdict: 'good', catches: ['celebrity', 'guaranteedReturn', 'noLicence'],
          why: bi('Sauber abgeschlossen. Ein Logo lässt sich kopieren, eine Warnung der Redaktion nicht.',
                  'Cleanly finished. A logo can be copied, an editorial warning cannot.') },
        { text: bi('Trotzdem das Formular ausfüllen',
                   'Fill in the form anyway'),
          next: 'n3_call', risk: 3, verdict: 'bad',
          why: bi('Du hast den Beweis gelesen und machst trotzdem weiter.',
                  'You read the proof and you are continuing regardless.') },
      ],
    },

    n2_search: {
      messages: [
        { kind: 'system', text: bi(
          'Die ersten Treffer: eine Warnung der Finanzaufsicht, zwei Foren voller Betroffener, keine gültige Zulassung im öffentlichen Register.',
          'The first hits: a regulator warning, two forums full of victims, no valid authorisation in the public register.') },
      ],
      flags: ['noLicence'],
      tactic: 'authority',
      info: {
        icon: '🏛️',
        title: bi('Wie man eine Anlagefirma in einer Minute prüft',
                  'How to check an investment firm in one minute'),
        body: [
          bi('Die Finanzaufsicht führt ein öffentliches Register aller zugelassenen Anbieter und daneben eine Liste mit Warnungen vor unerlaubten Geschäften. Beides ist kostenlos durchsuchbar.',
             'The financial regulator keeps a public register of all authorised providers, alongside a list of warnings about unauthorised business. Both are free to search.'),
          bi('Steht die Firma nicht im Register, darf sie in Deutschland keine Anlagen anbieten. Steht sie auf der Warnliste, ist die Sache endgültig entschieden.',
             'If the firm is not in the register it may not offer investments in Germany. If it is on the warning list, the matter is definitively settled.'),
          bi('Ohne Zulassung gibt es außerdem keine Einlagensicherung, keine Aufsicht und keine Beschwerdestelle. Es gibt schlicht niemanden, an den man sich wenden kann.',
             'Without authorisation there is also no deposit protection, no supervision and no complaints body. There is simply nobody to turn to.'),
        ],
      },
      prompt: bi('Behördliche Warnung auf Seite eins.', 'A regulator warning on page one.'),
      choices: [
        { text: bi('Erledigt. Anzeige melden und weitergehen',
                   'Done. Report the advert and move on'),
          next: 'end_ignored', risk: -2, verdict: 'good', catches: ['noLicence', 'guaranteedReturn', 'celebrity'],
          why: bi('Eine Warnung der Aufsicht ist keine Meinung, sondern ein Ergebnis. Damit ist die Prüfung beendet.',
                  'A regulator warning is not an opinion, it is a finding. That concludes the check.') },
        { text: bi('„Vielleicht ist das bei mir ja anders"',
                   '“Maybe it will be different for me”'),
          next: 'n3_call', risk: 3, verdict: 'bad',
          why: bi('Es ist bei niemandem anders. Genau dafür gibt es die Warnung.',
                  'It is not different for anyone. That is precisely what the warning is for.') },
      ],
    },

    /* ============ Kapitel 2: Der Berater ============ */

    n3_call: {
      chapter: bi('Kapitel 2 — Der Berater', 'Chapter 2 — The advisor'),
      messages: [
        { kind: 'system', text: bi('Zwölf Minuten später klingelt das Telefon.',
                                   'Twelve minutes later the phone rings.') },
        { from: 'them', time: '21:52', text: bi(
          'Daniel von CryptoGrowth, guten Abend! Ich betreue Sie persönlich, Sie erreichen mich jederzeit unter dieser Nummer. Wir starten ganz klein, mit 250 €. Risiko praktisch null — unser Algorithmus hatte in 14 Monaten keinen Verlustmonat.',
          'Daniel from CryptoGrowth, good evening! I will look after you personally, you can reach me on this number any time. We start small, with €250. Risk practically zero — our algorithm has not had a losing month in 14 months.') },
      ],
      flags: ['guaranteedReturn'],
      tactic: 'reciprocity',
      info: {
        icon: '👔',
        title: bi('Warum ein „persönlicher Berater"?',
                  'Why a “personal advisor”?'),
        body: [
          bi('Der Anruf baut eine Beziehung auf. Über Wochen wird gefragt, wie es der Familie geht, wie der Urlaub war. Das ist dieselbe Bindung wie beim Romance-Scam, nur mit Rendite statt Romantik.',
             'The call builds a relationship. Over weeks they ask how your family is, how the holiday went. It is the same attachment as in a romance scam, only with returns instead of romance.'),
          bi('Wer eine Bindung aufgebaut hat, sagt schwerer Nein und schämt sich später, die Bank oder die Familie einzuschalten. Beides ist eingeplant.',
             'Somebody with an attachment finds it harder to say no and is later ashamed to involve their bank or family. Both are part of the plan.'),
        ],
      },
      prompt: bi('Freundlich, geduldig, nimmt sich viel Zeit für dich.',
                 'Friendly, patient, taking a lot of time for you.'),
      choices: [
        { text: bi('„Zeigen Sie mir Ihre Zulassung bei der Finanzaufsicht."',
                   '“Show me your authorisation from the financial regulator.”'),
          next: 'n4_licence', risk: -1, verdict: 'good', catches: ['noLicence'],
          why: bi('Eine Frage, auf die es entweder eine Registernummer gibt — oder Ausflüchte. Beides ist eine Antwort.',
                  'A question that produces either a registration number — or evasion. Both are answers.') },
        { text: bi('Auflegen', 'Hang up'),
          next: 'end_ignored', risk: -2, verdict: 'good', catches: ['guaranteedReturn', 'noLicence'],
          why: bi('„Risiko praktisch null" bei zweistelliger Rendite gibt es nicht. Damit ist das Gespräch beendet.',
                  '“Practically zero risk” alongside double-digit returns does not exist. That ends the conversation.') },
        { text: bi('250 € einzahlen, ist ja überschaubar',
                   'Deposit €250, that is manageable'),
          next: 'n5_dashboard', risk: 2, verdict: 'bad',
          why: bi('Die erste Einzahlung ist klein, damit die zweite groß sein kann. Das ist der Zweck der 250 €.',
                  'The first deposit is small so that the second can be large. That is what the €250 is for.') },
      ],
    },

    n4_licence: {
      messages: [
        { from: 'them', time: '21:58', text: bi(
          'Wir arbeiten über einen Partner in Zypern, deshalb greift die deutsche Regulierung bei uns gar nicht. Das ist völlig legal und für Sie sogar steuerlich günstiger.',
          'We operate through a partner in Cyprus, so German regulation does not apply to us at all. It is entirely legal and actually better for you tax-wise.') },
      ],
      flags: ['noLicence'],
      tactic: 'authority',
      info: {
        icon: '🚫',
        title: bi('„Bei uns gilt die Regulierung nicht" ist ein Geständnis',
                  '“Regulation does not apply to us” is a confession'),
        body: [
          bi('Wer sich in Deutschland an Privatanleger wendet, braucht eine Erlaubnis — unabhängig davon, wo die Firma sitzt. Ein Sitz im Ausland befreit davon nicht, er erschwert nur die Strafverfolgung.',
             'Anyone approaching private investors in Germany needs authorisation — regardless of where the firm is based. A foreign registration does not exempt them from it, it only makes prosecution harder.'),
          bi('Als Vorteil verkauft wird hier genau das, was dich schutzlos stellt: keine Aufsicht, keine Einlagensicherung, keine Beschwerdestelle, kein Gerichtsstand in deiner Nähe.',
             'What gets sold to you as an advantage is precisely what leaves you unprotected: no supervision, no deposit guarantee, no complaints body, no court within reach.'),
        ],
      },
      prompt: bi('Keine Registernummer. Dafür ein Vorteil, der keiner ist.',
                 'No registration number. Instead, an advantage that is not one.'),
      choices: [
        { text: bi('Auflegen und die Nummer sperren',
                   'Hang up and block the number'),
          next: 'end_ignored', risk: -2, verdict: 'good', catches: ['noLicence', 'guaranteedReturn'],
          why: bi('Keine Aufsicht heißt: kein Schutz, keine Einlagensicherung, keine Ansprechperson. Das ist kein Steuervorteil, das ist Schutzlosigkeit.',
                  'No supervision means no protection, no deposit guarantee, nobody to complain to. That is not a tax advantage, that is defencelessness.') },
        { text: bi('Klingt plausibel — 250 € einzahlen',
                   'Sounds plausible — deposit €250'),
          next: 'n5_dashboard', risk: 3, verdict: 'bad',
          why: bi('Der Satz war die deutlichste Warnung des ganzen Gesprächs, verpackt als Verkaufsargument.',
                  'That sentence was the clearest warning in the entire call, packaged as a selling point.') },
      ],
    },

    /* ============ Kapitel 3: Die Kurve ============ */

    n5_dashboard: {
      chapter: bi('Kapitel 3 — Die Kurve', 'Chapter 3 — The chart'),
      messages: [
        { kind: 'system', text: bi(
          'Das Dashboard zeigt nach vier Tagen: 250 € → 611 €. Eine schöne, stetig steigende Kurve, live aktualisiert.',
          'After four days the dashboard shows: €250 → €611. A pretty, steadily rising curve, updating live.') },
        { from: 'them', time: '18:20', text: bi(
          'Sehen Sie? Und jetzt der eigentliche Schritt: Ab 5.000 € kommen Sie in unseren Premium-Algorithmus. Ich helfe Ihnen beim Einrichten, laden Sie kurz AnyDesk herunter.',
          'You see? And now the real step: from €5,000 you get into our premium algorithm. I will help you set it up, just download AnyDesk for a moment.') },
      ],
      flags: ['fakeDashboard', 'remoteAccess'],
      tactic: 'commitment',
      info: {
        icon: '🖥️',
        title: bi('Was Fernwartung wirklich bedeutet',
                  'What remote access really means'),
        body: [
          bi('Programme wie AnyDesk oder TeamViewer sind völlig legitime Werkzeuge — sie übertragen deinen Bildschirm und geben der Gegenseite Maus und Tastatur.',
             'Tools like AnyDesk or TeamViewer are entirely legitimate — they share your screen and hand the other side your mouse and keyboard.'),
          bi('Genau deshalb sind sie hier so gefährlich: Er sieht dein Online-Banking, deine Mails, deine Dokumente und jede TAN, die eingeht. Er kann Überweisungen selbst ausfüllen, während du zusiehst und glaubst, es sei Hilfe.',
             'Which is exactly why they are so dangerous here: they see your online banking, your email, your documents and every one-time code that arrives. They can fill in transfers themselves while you watch and believe it is help.'),
          bi('Regel ohne Ausnahme: Fernwartung nur mit Menschen, die du kennst und selbst angerufen hast. Nie mit jemandem, der dich kontaktiert hat.',
             'Rule without exception: only allow remote access to people you know and called yourself. Never to somebody who contacted you.'),
        ],
      },
      prompt: bi('Er will Fernzugriff auf deinen Rechner.',
                 'They want remote access to your computer.'),
      choices: [
        { text: bi('Auf keinen Fall Fernwartung — und Auszahlung verlangen',
                   'Absolutely no remote access — and request a withdrawal'),
          next: 'n6_withdraw', risk: -1, verdict: 'good', catches: ['remoteAccess'],
          why: bi('Fernzugriff ist die rote Linie. Und der Auszahlungswunsch ist der Lackmustest, den keine dieser Plattformen besteht.',
                  'Remote access is the hard line. And asking to withdraw is the litmus test none of these platforms passes.') },
        { text: bi('Erst mal 50 € auszahlen lassen, zum Testen',
                   'Withdraw €50 first, as a test'),
          next: 'n6_smallwin', risk: 0, verdict: 'meh',
          why: bi('Kluger Gedanke — aber Vorsicht: Eine kleine Auszahlung wird oft bewusst durchgelassen.',
                  'Smart instinct — but careful: a small payout is often let through deliberately.') },
        { text: bi('AnyDesk installieren, er hilft ja nur',
                   'Install AnyDesk, they are only helping'),
          next: 'end_drained', risk: 3, verdict: 'bad',
          why: bi('Damit sitzt er an deinem Online-Banking. Ab hier bestimmt er die Beträge, nicht du.',
                  'Now they are sitting inside your online banking. From here they decide the amounts, not you.') },
      ],
    },

    n6_smallwin: {
      messages: [
        { kind: 'system', text: bi(
          'Zwei Tage später sind die 50 € tatsächlich auf deinem Konto. Es funktioniert also.',
          'Two days later the €50 really is in your account. So it works.') },
        { from: 'them', time: '10:12', text: bi(
          'Sehen Sie, alles ganz normal 😊 Jetzt lassen Sie uns richtig anfangen. Bei 5.000 € rechne ich mit 40.000 € bis Weihnachten.',
          'You see, perfectly normal 😊 Now let us start properly. At €5,000 I would expect €40,000 by Christmas.') },
      ],
      flags: ['smallWin', 'guaranteedReturn'],
      tactic: 'reciprocity',
      info: {
        icon: '🪝',
        title: bi('Die kleine Auszahlung ist Teil der Masche',
                  'The small payout is part of the con'),
        body: [
          bi('50 € auszuzahlen kostet die Gegenseite fast nichts und beseitigt genau den Zweifel, der dich noch gebremst hat. Es ist Werbebudget, kein Beweis.',
             'Paying out €50 costs the other side almost nothing and removes exactly the doubt that was holding you back. It is a marketing spend, not evidence.'),
          bi('Die Regel dahinter: Ein Test, den die Gegenseite bestehen will, beweist nichts. Aussagekräftig ist nur der Test, den sie zu verhindern versucht — hier die große Auszahlung.',
             'The rule behind it: a test the other side wants to pass proves nothing. What tells you something is the test they try to prevent — here, the large withdrawal.'),
        ],
      },
      prompt: bi('Der Test ist bestanden. Und genau deshalb sollst du jetzt nachlegen.',
                 'The test was passed. Which is precisely why you are now meant to add more.'),
      choices: [
        { text: bi('Die volle Summe auszahlen lassen, nicht nur 50 €',
                   'Withdraw the full balance, not just €50'),
          next: 'n6_withdraw', risk: -1, verdict: 'good', catches: ['smallWin', 'fakeDashboard'],
          why: bi('Der richtige Test: nicht der, den sie bestehen wollen, sondern der, den sie fürchten.',
                  'The right test: not the one they want to pass, but the one they are afraid of.') },
        { text: bi('5.000 € einzahlen, es funktioniert ja',
                   'Deposit €5,000, it clearly works'),
          next: 'n7_locked', risk: 3, verdict: 'bad',
          why: bi('Die 50 € waren der Köder für genau diesen Moment. Sie haben sich gerade hundertfach ausgezahlt.',
                  'The €50 was the bait for exactly this moment. It has just paid for itself a hundred times over.') },
      ],
    },

    n6_withdraw: {
      messages: [
        { from: 'them', time: '18:44', text: bi(
          'Natürlich können Sie auszahlen! Vor der Auszahlung fällt allerdings die Quellensteuer von 22 % auf den Gewinn an — 611 € mal 22 %, also 134 €. Bitte vorab überweisen, dann geht es raus.',
          'Of course you can withdraw! Before payout there is a 22 % withholding tax on the gain though — €611 times 22 %, so €134. Please transfer that first and it will go out.') },
      ],
      flags: ['payToWithdraw'],
      tactic: 'sunkCost',
      info: {
        icon: '🧾',
        title: bi('Steuern zahlt man nie an den Anbieter im Voraus',
                  'You never pay tax to a provider in advance'),
        body: [
          bi('Steuern auf Kapitalerträge werden entweder direkt vom Gewinn einbehalten oder später über die Steuererklärung abgerechnet. Sie werden nie vorab und nie an die Plattform selbst überwiesen.',
             'Tax on investment gains is either withheld directly from the gain or settled later through your tax return. It is never paid in advance and never to the platform itself.'),
          bi('Der Satz „erst zahlen, dann auszahlen" ist bei jeder Form von Anlagebetrug der Moment, an dem die Masche aufbricht. Es kommt nie etwas zurück.',
             '“Pay first, then withdraw” is the moment every form of investment fraud breaks open. Nothing ever comes back.'),
        ],
      },
      prompt: bi('Du sollst zahlen, um an dein eigenes Geld zu kommen.',
                 'You are being asked to pay in order to reach your own money.'),
      choices: [
        { text: bi('Nein. Steuern werden nie vorab an den Anbieter gezahlt',
                   'No. Tax is never paid up front to the provider'),
          next: 'end_lost250', risk: -2, verdict: 'good', catches: ['payToWithdraw', 'fakeDashboard'],
          why: bi('Genau hier bricht die Masche auf. Die 611 € auf dem Dashboard hat es nie gegeben.',
                  'This is exactly where the con breaks open. The €611 on the dashboard never existed.') },
        { text: bi('134 € überweisen, dann kommen ja 611 € zurück',
                   'Transfer the €134, then €611 comes back'),
          next: 'n7_chain', risk: 3, verdict: 'bad',
          why: bi('Nach der Steuer kommt die Bearbeitungsgebühr, dann die Verifizierungskaution. Es endet nie von selbst.',
                  'After the tax comes the processing fee, then the verification deposit. It never ends by itself.') },
      ],
    },

    /* ============ Kapitel 4: Der Ausstieg ============ */

    n7_locked: {
      chapter: bi('Kapitel 4 — Der Ausstieg', 'Chapter 4 — Getting out'),
      messages: [
        { kind: 'system', text: bi(
          'Das Dashboard zeigt nach drei Wochen 11.400 €. Du willst 3.000 € abheben.',
          'After three weeks the dashboard shows €11,400. You want to withdraw €3,000.') },
        { from: 'them', time: '14:02', text: bi(
          'Auszahlungen sind ab dem Premium-Level erst nach der Verifizierung möglich. Die Kaution beträgt 2.200 € und wird Ihnen mit der Auszahlung zusammen erstattet.',
          'At premium level withdrawals require verification first. The deposit is €2,200 and will be refunded together with your payout.') },
      ],
      flags: ['payToWithdraw', 'fakeDashboard'],
      tactic: 'sunkCost',
      prompt: bi('Um an 11.400 € zu kommen, sollst du erst 2.200 € zahlen.',
                 'To reach €11,400 you are asked to pay €2,200 first.'),
      choices: [
        { text: bi('Aufhören. Kein weiterer Cent',
                   'Stop. Not one more cent'),
          next: 'end_stopped', risk: -2, verdict: 'good', catches: ['payToWithdraw', 'fakeDashboard', 'smallWin'],
          why: bi('Die 5.250 € sind weg — das ist bitter, aber kein Grund, 2.200 € nachzuwerfen. Aufhören ist hier die einzige Entscheidung, die noch etwas rettet.',
                  'The €5,250 is gone — that is bitter, but no reason to throw €2,200 after it. Stopping is the only decision that still saves anything.') },
        { text: bi('Die Kaution zahlen, es geht ja um 11.400 €',
                   'Pay the deposit, there is €11,400 at stake'),
          next: 'n7_chain', risk: 3, verdict: 'bad',
          why: bi('Die 11.400 € sind eine Zahl auf einer Webseite. Die 2.200 € wären echtes Geld.',
                  'The €11,400 is a number on a web page. The €2,200 would be real money.') },
      ],
    },

    n7_chain: {
      messages: [
        { kind: 'system', text: bi(
          'Nach der ersten Zahlung folgt eine Bearbeitungsgebühr. Danach eine „Anti-Geldwäsche-Kaution". Danach ein „Freischaltcode" gegen Gebühr.',
          'After the first payment comes a processing fee. Then an “anti-money-laundering deposit”. Then an “unlock code”, for a fee.') },
        { kind: 'system', text: bi('Dann antwortet Daniel nicht mehr. Die Plattform ist offline.',
                                   'Then Daniel stops replying. The platform goes offline.') },
      ],
      tactic: 'sunkCost',
      prompt: bi('Alles weg. Vier Monate später ruft eine Kanzlei an.',
                 'Everything gone. Four months later a law firm calls.'),
      choices: [
        { text: bi('Auflegen und selbst Anzeige erstatten',
                   'Hang up and file a report yourself'),
          next: 'end_chain', risk: -1, verdict: 'good', catches: ['recoveryScam'],
          why: bi('Richtig. Wer Geld verlangt, um dir Geld zurückzuholen, ist die zweite Masche.',
                  'Correct. Anyone asking for money to recover your money is the second con.') },
        { text: bi('Der Kanzlei den Vorschuss zahlen',
                   'Pay the law firm’s advance fee'),
          next: 'end_recovery', risk: 3, verdict: 'bad',
          why: bi('Genau darauf zielt die Verlustangst. Diese „Kanzlei" hat deine Daten von den Tätern gekauft — oder ist es selbst.',
                  'That is exactly what loss chasing aims at. This “law firm” bought your data from the offenders — or is them.') },
      ],
    },

    /* ============ Ausgänge ============ */

    end_ignored: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi(
          'Anzeige gemeldet, Nummer gesperrt. Nichts eingezahlt, nichts verloren. Die Anzeige läuft noch drei Wochen weiter — bei anderen.',
          'Advert reported, number blocked. Nothing deposited, nothing lost. The advert keeps running for three more weeks — for other people.') },
      ],
      damage: bi('0 € — gar nicht erst eingestiegen', '€0 — never got in at all'),
      lessons: [
        bi('Garantierte Rendite gibt es nicht. Wer sie verspricht, betrügt — ohne Ausnahme.',
           'Guaranteed returns do not exist. Anyone promising them is defrauding you, without exception.'),
        bi('Vor jeder Anlage die Zulassung im Register der Finanzaufsicht prüfen. Das dauert eine Minute.',
           'Before any investment, check the authorisation in the regulator’s register. It takes one minute.'),
        bi('Prominente in Krypto-Anzeigen sind praktisch immer ungefragt hineinmontiert.',
           'Celebrities in crypto adverts are almost always inserted without their consent.'),
      ],
    },

    end_lost250: {
      outcome: 'close',
      messages: [
        { kind: 'system', text: bi(
          'Du zahlst nichts nach. Die 250 € sind weg, das Dashboard verschwindet nach einer Woche.',
          'You pay nothing further. The €250 is gone and the dashboard vanishes within a week.') },
        { kind: 'system', text: bi(
          'Vier Monate später meldet sich eine „Kanzlei für Anlegerschutz". Du legst auf.',
          'Four months later a “firm for investor protection” gets in touch. You hang up.') },
      ],
      damage: bi('250 € verloren — der große Schaden verhindert', '€250 lost — the big damage avoided'),
      lessons: [
        bi('Wer zum Auszahlen erst zahlen soll, wird nie auszahlen.',
           'Anyone who asks you to pay before withdrawing will never pay out.'),
        bi('Der Kontostand auf so einem Dashboard ist eine Zahl auf einer Webseite, sonst nichts.',
           'The balance on a dashboard like that is a number on a web page, nothing more.'),
        bi('Die „Rückhol-Kanzlei" ist die zweite Masche, oft von denselben Leuten.',
           'The “recovery firm” is the second con, often run by the same people.'),
      ],
      recover: [
        bi('Anzeige erstatten und den Vorfall der Finanzaufsicht melden.',
           'File a police report and notify the financial regulator.'),
        bi('Auf keine Rückhol-Angebote eingehen — nie Vorkasse.',
           'Engage with no recovery offers — never pay up front.'),
      ],
    },

    end_stopped: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi(
          'Du zahlst keine Kaution. Die 5.250 € bleiben weg, aber es endet hier.',
          'You pay no deposit. The €5,250 stays gone, but it ends here.') },
        { kind: 'system', text: bi(
          'Deine Anzeige führt zu nichts Konkretem, hilft aber der Aufsicht, die Plattform auf die Warnliste zu setzen.',
          'Your report leads to nothing concrete, but it helps the regulator add the platform to its warning list.') },
      ],
      damage: bi('5.250 € verloren — Kaution verweigert', '€5,250 lost — deposit refused'),
      lessons: [
        bi('Bereits verlorenes Geld ist kein Grund, mehr zu zahlen. Jede Forderung für sich bewerten.',
           'Money already lost is no reason to pay more. Judge each demand on its own.'),
        bi('Die kleine Auszahlung am Anfang war der Köder, nicht der Beweis.',
           'The small payout at the start was the bait, not the evidence.'),
        bi('Aufhören ist bei Anlagebetrug die einzige Handlung, die noch etwas rettet.',
           'With investment fraud, stopping is the only action that still saves anything.'),
      ],
      recover: [
        bi('Sofort aufhören zu zahlen, egal was noch versprochen wird.',
           'Stop paying immediately, whatever else gets promised.'),
        bi('Anzeige erstatten, Kontodaten, Chatverlauf und Überweisungsbelege sichern.',
           'File a police report and preserve account details, chat history and transfer receipts.'),
        bi('Der Finanzaufsicht melden, damit die Plattform auf die Warnliste kommt.',
           'Report it to the financial regulator so the platform lands on the warning list.'),
      ],
    },

    end_chain: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi(
          'Insgesamt 8.700 € über vier Zahlungen. Die Anzeige läuft, die Plattform ist unter neuem Namen wieder online.',
          '€8,700 in total across four payments. The report is filed; the platform is back online under a new name.') },
      ],
      flags: ['recoveryScam'],
      damage: bi('8.700 € in vier Zahlungen', '€8,700 across four payments'),
      lessons: [
        bi('Jede gezahlte Gebühr erzeugt die nächste. Der einzige Ausstieg ist, sofort aufzuhören.',
           'Every fee you pay creates the next one. The only way out is to stop at once.'),
        bi('Der Anruf der „Rückhol-Kanzlei" ist die zweite Masche. Nie Vorkasse für eine Rückholung.',
           'The “recovery firm” call is the second con. Never pay up front for a recovery.'),
      ],
      recover: [
        bi('Sofort aufhören zu zahlen und alle Belege sichern.',
           'Stop paying immediately and preserve every receipt.'),
        bi('Anzeige erstatten und der Finanzaufsicht melden.',
           'File a police report and notify the financial regulator.'),
        bi('Mit der Bank sprechen — bei sehr frischen Überweisungen ist selten noch ein Rückruf möglich.',
           'Talk to your bank — with very recent transfers a recall is occasionally still possible.'),
      ],
    },

    end_recovery: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi(
          'Die „Kanzlei" verlangt 1.800 € Vorschuss, dann eine Gerichtskostenpauschale, dann eine Übersetzungsgebühr.',
          'The “firm” asks for €1,800 up front, then a court fee, then a translation charge.') },
        { kind: 'system', text: bi(
          'Insgesamt 12.900 €. Es kommt nichts zurück. Die Kanzlei existiert nicht.',
          '€12,900 in total. Nothing comes back. The firm does not exist.') },
      ],
      flags: ['recoveryScam'],
      damage: bi('12.900 € — inklusive der zweiten Masche', '€12,900 — including the second con'),
      lessons: [
        bi('Wer Geld verlangt, um dir Geld zurückzuholen, ist immer die nächste Masche.',
           'Anyone asking for money to recover your money is always the next con.'),
        bi('Nach einem Anlagebetrug steht man auf einer Liste, die weiterverkauft wird. Weitere Anrufe sind sicher, nicht wahrscheinlich.',
           'After investment fraud you are on a list that gets resold. Further calls are certain, not merely likely.'),
        bi('Echte Anwältinnen und Anwälte arbeiten nicht auf Zuruf am Telefon gegen Vorkasse.',
           'Genuine lawyers do not take on cases by cold call against advance payment.'),
      ],
      recover: [
        bi('Alle Zahlungen sofort einstellen und keine weiteren Anrufe annehmen.',
           'Stop all payments immediately and take no further calls.'),
        bi('Anzeige über beide Vorfälle zusammen erstatten.',
           'File one police report covering both incidents together.'),
        bi('Nur selbst gesuchte, zugelassene Anwältinnen oder die Verbraucherzentrale einschalten.',
           'Only involve licensed lawyers you found yourself, or a consumer advice centre.'),
        bi('Darüber sprechen. Die Scham hält die Masche am Laufen, nicht die Raffinesse.',
           'Talk about it. Shame keeps this con running, not sophistication.'),
      ],
    },

    end_drained: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi(
          'Über die Fernwartung sieht er dein Online-Banking. Während ihr telefoniert, richtet er einen Ratenkredit über 12.000 € ein und überweist alles weiter.',
          'Through the remote session they can see your online banking. While you are on the phone they take out a €12,000 loan and transfer everything onward.') },
        { kind: 'system', text: bi(
          'Du hast jede Freigabe selbst bestätigt — er hat dir gesagt, es sei die Einrichtung des Premium-Kontos.',
          'You confirmed every approval yourself — they told you it was the premium account setup.') },
      ],
      flags: ['remoteAccess'],
      damage: bi('19.400 € — inklusive eines Kredits auf deinen Namen',
                 '€19,400 — including a loan in your name'),
      lessons: [
        bi('Fernwartungssoftware für Fremde ist die gefährlichste einzelne Handlung in allen acht Geschichten.',
           'Installing remote access software for a stranger is the single most dangerous act in all eight stories.'),
        bi('Wer deinen Bildschirm sieht, sieht dein Konto, deine Mails und jede TAN, die eingeht.',
           'Anyone who can see your screen sees your account, your email and every one-time code that arrives.'),
        bi('Selbst bestätigte Freigaben gelten als autorisiert — die Erstattung wird dadurch sehr schwer.',
           'Approvals you confirmed yourself count as authorised — which makes a refund very hard.'),
      ],
      recover: [
        bi('Gerät sofort vom Netz nehmen und die Fernwartungssoftware entfernen.',
           'Disconnect the device immediately and remove the remote access software.'),
        bi('Bank anrufen, alle Zugänge sperren und dem Kredit ausdrücklich widersprechen.',
           'Call the bank, freeze every access route and formally dispute the loan.'),
        bi('Anzeige erstatten und eine Selbstauskunft bei der Schufa einholen.',
           'File a police report and request a copy of your credit record.'),
        bi('Alle Passwörter von einem anderen, sauberen Gerät aus ändern.',
           'Change every password from a different, clean device.'),
      ],
    },
  },
};
