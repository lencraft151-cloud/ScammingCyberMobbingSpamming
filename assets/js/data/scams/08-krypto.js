import { bi } from '../bi.js';

/** Story 8 — Krypto-Anlagebetrug über eine gefälschte Trading-Plattform. */
export default {
  id: 'krypto',
  icon: '📈',
  channel: 'instagram',
  difficulty: 3,
  title: bi('Aus 250 € werden 2.400 €', '€250 Becomes €2,400'),
  teaser: bi(
    'Eine Anzeige verspricht Rendite. Ein Berater ruft an. Die Kurve steigt.',
    'An ad promises returns. An advisor calls. The chart goes up.'),
  contact: {
    name: bi('Daniel — CryptoGrowth', 'Daniel — CryptoGrowth'),
    sub: bi('Persönlicher Anlageberater', 'Personal investment advisor'),
  },

  redFlags: {
    guaranteedReturn: {
      label: bi('Garantierte Rendite',
                'Guaranteed returns'),
      why: bi('Eine Garantie auf Gewinn gibt es an keinem Markt der Welt. Wer sie ausspricht, lügt bereits.',
              'No market on earth guarantees a profit. Anyone promising one is already lying.'),
    },
    celebrity: {
      label: bi('Prominente, die nie zugestimmt haben',
                'Celebrities who never agreed to this'),
      why: bi('Fotos und Zitate bekannter Personen werden ungefragt verwendet — oft samt gefälschtem Zeitungsartikel.',
              'Photos and quotes of well-known people get used without permission — often inside a fake news article.'),
    },
    noLicence: {
      label: bi('Keine Zulassung, kein Sitz, kein Impressum',
                'No licence, no registered office, no legal notice'),
      why: bi('Wer in Deutschland Anlagen anbietet, braucht eine BaFin-Zulassung. Die lässt sich in einer Minute prüfen.',
              'Offering investments in Germany requires a licence from the regulator. That takes a minute to check.'),
    },
    remoteAccess: {
      label: bi('Fernwartungssoftware auf deinem Gerät',
                'Remote access software on your device'),
      why: bi('„Ich helfe Ihnen beim Einrichten" heißt: er sieht dein Online-Banking und kann selbst klicken.',
              '“Let me help you set it up” means: he sees your online banking and can click things himself.'),
    },
    fakeDashboard: {
      label: bi('Ein Kontostand, den nur du siehst',
                'A balance only you can see'),
      why: bi('Die schöne Kurve ist eine Webseite, keine Investition. Die Zahlen werden von Hand eingetragen.',
              'The pretty chart is a web page, not an investment. The numbers are typed in by hand.'),
    },
    payToWithdraw: {
      label: bi('Erst zahlen, um auszahlen zu können',
                'Paying in order to be paid out'),
      why: bi('Steuer, Gebühr, Freischaltung: Sobald du auszahlen willst, kommen neue Forderungen. Es kommt nie etwas zurück.',
              'Tax, fee, unlocking charge: the moment you ask to withdraw, new demands appear. Nothing ever comes back.'),
    },
  },

  start: 'n1',
  nodes: {

    n1: {
      messages: [
        { from: 'them', time: '21:38', image: bi('[Anzeige: bekanntes Gesicht aus dem Fernsehen, Schlagzeile über schnellen Reichtum]',
                                                 '[Ad: a familiar face from television, headline about getting rich fast]'),
          text: bi('„Ich habe mit 250 € angefangen und nach zwei Wochen 2.400 € abgehoben." — Jetzt kostenlos testen.',
                   '“I started with €250 and withdrew €2,400 two weeks later.” — Try it free now.') },
      ],
      flags: ['guaranteedReturn', 'celebrity'],
      prompt: bi('Die Anzeige läuft dir seit Tagen hinterher.',
                 'The ad has been following you around for days.'),
      choices: [
        { text: bi('Den Namen der Plattform zusammen mit „Betrug" suchen',
                   'Search the platform’s name together with “scam”'),
          next: 'n2_search', risk: -1, verdict: 'good', catches: ['guaranteedReturn'],
          why: bi('Die einfachste Prüfung überhaupt — und meistens die schnellste Antwort.',
                  'The simplest check there is — and usually the fastest answer.') },
        { text: bi('Formular ausfüllen, kostet ja nichts',
                   'Fill in the form, it costs nothing'),
          next: 'n2_call', risk: 2, verdict: 'bad',
          why: bi('Es kostet die Telefonnummer. Und die ist der Anfang.',
                  'It costs you your phone number. And that is the beginning.') },
        { text: bi('Weiterscrollen und die Anzeige melden',
                   'Scroll past and report the ad'),
          next: 'end_ignored', risk: -2, verdict: 'good', catches: ['celebrity', 'guaranteedReturn'],
          why: bi('Prominente werben nicht für Krypto-Plattformen. Ihre Bilder werden gestohlen.',
                  'Celebrities do not advertise crypto platforms. Their pictures get stolen.') },
      ],
    },

    n2_search: {
      messages: [
        { kind: 'system', text: bi(
          'Die ersten Treffer: eine Warnung der Finanzaufsicht, zwei Foren voller Betroffener, keine gültige Zulassung.',
          'The first hits: a regulator warning, two forums full of victims, no valid licence.') },
      ],
      flags: ['noLicence'],
      prompt: bi('Behördliche Warnung auf Seite eins.',
                 'A regulator warning on page one.'),
      choices: [
        { text: bi('Erledigt. Anzeige melden und weitergehen',
                   'Done. Report the ad and move on'),
          next: 'end_ignored', risk: -2, verdict: 'good', catches: ['noLicence', 'guaranteedReturn', 'celebrity'],
          why: bi('Eine Warnung der Aufsicht ist keine Meinung, sondern ein Ergebnis.',
                  'A regulator warning is not an opinion, it is a finding.') },
        { text: bi('„Vielleicht ist das ja bei mir anders"',
                   '“Maybe it will be different for me”'),
          next: 'n2_call', risk: 3, verdict: 'bad',
          why: bi('Es ist bei niemandem anders. Das ist der Sinn einer Warnung.',
                  'It is not different for anyone. That is what a warning is for.') },
      ],
    },

    n2_call: {
      messages: [
        { kind: 'system', text: bi('Zwölf Minuten später klingelt das Telefon.',
                                   'Twelve minutes later the phone rings.') },
        { from: 'them', time: '21:52', text: bi(
          'Daniel von CryptoGrowth, guten Abend! Ich betreue Sie persönlich. Wir starten ganz klein, mit 250 €. Risiko praktisch null — unser Algorithmus hatte in 14 Monaten keinen Verlustmonat.',
          'Daniel from CryptoGrowth, good evening! I will be looking after you personally. We start small, with €250. Risk is practically zero — our algorithm has not had a losing month in 14 months.') },
      ],
      flags: ['guaranteedReturn'],
      prompt: bi('Freundlich, geduldig, nimmt sich viel Zeit für dich.',
                 'Friendly, patient, taking a lot of time for you.'),
      choices: [
        { text: bi('„Zeigen Sie mir Ihre BaFin-Zulassung."',
                   '“Show me your regulatory licence.”'),
          next: 'n3_licence', risk: -1, verdict: 'good', catches: ['noLicence'],
          why: bi('Eine Frage, auf die es entweder eine Registernummer gibt oder Ausflüchte.',
                  'A question that produces either a registration number or evasion.') },
        { text: bi('250 € einzahlen, ist ja überschaubar',
                   'Deposit €250, that is manageable'),
          next: 'n3_dashboard', risk: 2, verdict: 'bad',
          why: bi('Die erste Einzahlung ist klein — damit die zweite groß sein kann.',
                  'The first deposit is small so that the second one can be large.') },
        { text: bi('Auflegen', 'Hang up'),
          next: 'end_ignored', risk: -2, verdict: 'good', catches: ['guaranteedReturn', 'noLicence'],
          why: bi('„Risiko praktisch null" bei zweistelliger Rendite gibt es nicht.',
                  '“Practically zero risk” alongside double-digit returns does not exist.') },
      ],
    },

    n3_licence: {
      messages: [
        { from: 'them', time: '21:58', text: bi(
          'Wir arbeiten über einen Partner in Zypern, deshalb greift die deutsche Regulierung bei uns gar nicht. Das ist völlig legal und für Sie sogar steuerlich günstiger.',
          'We operate through a partner in Cyprus, so German regulation does not apply to us at all. It is entirely legal and actually better for you tax-wise.') },
      ],
      flags: ['noLicence'],
      prompt: bi('Keine Registernummer. Dafür ein Vorteil, der keiner ist.',
                 'No registration number. Instead, an advantage that is not one.'),
      choices: [
        { text: bi('Auflegen und die Nummer sperren',
                   'Hang up and block the number'),
          next: 'end_ignored', risk: -2, verdict: 'good', catches: ['noLicence', 'guaranteedReturn'],
          why: bi('Keine Aufsicht heißt: kein Schutz, keine Einlagensicherung, keine Ansprechperson.',
                  'No supervision means no protection, no deposit guarantee, nobody to complain to.') },
        { text: bi('Klingt plausibel — 250 € einzahlen',
                   'Sounds plausible — deposit €250'),
          next: 'n3_dashboard', risk: 3, verdict: 'bad',
          why: bi('„Bei uns gilt die Regulierung nicht" ist ein Geständnis, kein Verkaufsargument.',
                  '“Regulation does not apply to us” is a confession, not a selling point.') },
      ],
    },

    n3_dashboard: {
      messages: [
        { kind: 'system', text: bi('Das Dashboard zeigt nach vier Tagen: 250 € → 611 €. Eine schöne, stetig steigende Kurve.',
                                   'After four days the dashboard shows: €250 → €611. A pretty, steadily rising curve.') },
        { from: 'them', time: '18:20', text: bi(
          'Sehen Sie? Und jetzt der eigentliche Schritt: Ab 5.000 € kommen Sie in unseren Premium-Algorithmus. Ich helfe Ihnen beim Einrichten, laden Sie kurz AnyDesk herunter.',
          'You see? And now the real step: from €5,000 you get into our premium algorithm. I will help you set it up, just download AnyDesk for a moment.') },
      ],
      flags: ['fakeDashboard', 'remoteAccess'],
      prompt: bi('Er will Fernzugriff auf deinen Rechner.',
                 'He wants remote access to your computer.'),
      choices: [
        { text: bi('Auf keinen Fall Fernwartung — und Auszahlung verlangen',
                   'Absolutely no remote access — and request a withdrawal'),
          next: 'n4_withdraw', risk: -1, verdict: 'good', catches: ['remoteAccess'],
          why: bi('Fernzugriff ist die rote Linie. Und der Auszahlungswunsch ist der Lackmustest.',
                  'Remote access is the hard line. And asking to withdraw is the litmus test.') },
        { text: bi('AnyDesk installieren, er hilft ja nur',
                   'Install AnyDesk, he is only helping'),
          next: 'end_drained', risk: 3, verdict: 'bad',
          why: bi('Damit sitzt er an deinem Online-Banking. Ab hier bestimmt er die Beträge.',
                  'Now he is sitting inside your online banking. From here he decides the amounts.') },
      ],
    },

    n4_withdraw: {
      messages: [
        { from: 'them', time: '18:44', text: bi(
          'Natürlich können Sie auszahlen! Vor der Auszahlung fällt allerdings die Quellensteuer von 22 % auf den Gewinn an — 611 € mal 22 %, also 134 €. Bitte vorab überweisen, dann geht es raus.',
          'Of course you can withdraw! Before payout there is a 22 % withholding tax on the gain though — €611 times 22 %, so €134. Please transfer that first and it will go out.') },
      ],
      flags: ['payToWithdraw'],
      prompt: bi('Du sollst zahlen, um an dein eigenes Geld zu kommen.',
                 'You are being asked to pay in order to reach your own money.'),
      choices: [
        { text: bi('Nein. Steuern werden nie vorab an den Anbieter gezahlt',
                   'No. Tax is never paid up front to the provider'),
          next: 'end_lost250', risk: -2, verdict: 'good', catches: ['payToWithdraw', 'fakeDashboard'],
          why: bi('Genau hier bricht die Masche auf. Die 611 € gab es nie.',
                  'This is exactly where the con breaks open. The €611 never existed.') },
        { text: bi('134 € überweisen, dann kommen ja 611 € zurück',
                   'Transfer the €134, then €611 comes back'),
          next: 'end_chain', risk: 3, verdict: 'bad',
          why: bi('Nach der Steuer kommt die Bearbeitungsgebühr, dann die Freischaltung. Es endet nie.',
                  'After the tax comes the processing fee, then the unlocking charge. It never ends.') },
      ],
    },

    /* ---------- Enden ---------- */

    end_ignored: {
      outcome: 'safe',
      messages: [
        { kind: 'system', text: bi('Anzeige gemeldet, Nummer gesperrt. Nichts eingezahlt, nichts verloren.',
                                   'Ad reported, number blocked. Nothing deposited, nothing lost.') },
      ],
      damage: bi('0 € — gar nicht erst eingestiegen', '€0 — never got in at all'),
      lessons: [
        bi('Garantierte Rendite gibt es nicht. Wer sie verspricht, betrügt — ohne Ausnahme.',
           'Guaranteed returns do not exist. Anyone promising them is defrauding you, without exception.'),
        bi('Vor jeder Anlage die Zulassung der Anbieter bei der Finanzaufsicht prüfen.',
           'Before any investment, check the provider’s licence with the financial regulator.'),
        bi('Prominente in Krypto-Anzeigen sind praktisch immer ungefragt hineinmontiert.',
           'Celebrities in crypto ads are almost always inserted without their consent.'),
      ],
    },

    end_lost250: {
      outcome: 'close',
      messages: [
        { kind: 'system', text: bi('Du zahlst nichts nach. Die 250 € sind weg, das Dashboard verschwindet nach einer Woche.',
                                   'You pay nothing further. The €250 is gone and the dashboard vanishes within a week.') },
        { kind: 'system', text: bi('Vier Monate später meldet sich eine „Kanzlei", die dein Geld zurückholen will — gegen Vorkasse.',
                                   'Four months later a “law firm” gets in touch offering to recover your money — for a fee up front.') },
      ],
      damage: bi('250 € verloren — der große Schaden verhindert', '€250 lost — the big damage avoided'),
      lessons: [
        bi('Wer zum Auszahlen erst zahlen soll, wird nie auszahlen.',
           'Anyone who asks you to pay before withdrawing will never pay out.'),
        bi('Die „Rückhol-Kanzlei" ist die zweite Masche, oft von denselben Leuten.',
           'The “recovery law firm” is the second con, often run by the same people.'),
      ],
      recover: [
        bi('Anzeige erstatten und den Vorfall der Finanzaufsicht melden.',
           'File a police report and notify the financial regulator.'),
        bi('Auf keinen Fall auf Rückhol-Angebote eingehen — nie Vorkasse.',
           'Never engage with recovery offers — never pay anything up front.'),
      ],
    },

    end_chain: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi('Nach der Steuer die Bearbeitungsgebühr. Danach eine „Verifizierungskaution". Dann Funkstille.',
                                   'After the tax, a processing fee. Then a “verification deposit”. Then silence.') },
      ],
      damage: bi('250 € + 134 € + 890 € = 1.274 €', '€250 + €134 + €890 = €1,274'),
      lessons: [
        bi('Jede gezahlte Gebühr erzeugt die nächste. Der einzige Ausstieg ist, sofort aufzuhören.',
           'Every fee you pay creates the next one. The only way out is to stop at once.'),
        bi('Der Kontostand auf dem Dashboard war eine Zahl auf einer Webseite, sonst nichts.',
           'The balance on the dashboard was a number on a web page, nothing more.'),
      ],
      recover: [
        bi('Sofort aufhören zu zahlen, egal was noch versprochen wird.',
           'Stop paying immediately, whatever else gets promised.'),
        bi('Anzeige erstatten, Kontodaten und Chatverlauf sichern.',
           'File a police report and preserve the account details and chat history.'),
        bi('Der Finanzaufsicht melden, damit die Plattform auf die Warnliste kommt.',
           'Report it to the financial regulator so the platform lands on the warning list.'),
      ],
    },

    end_drained: {
      outcome: 'scammed',
      messages: [
        { kind: 'system', text: bi('Über die Fernwartung sieht er dein Online-Banking. Er richtet einen Kredit über 12.000 € ein und überweist alles weiter.',
                                   'Through the remote session he can see your online banking. He takes out a €12,000 loan and transfers everything onward.') },
      ],
      damage: bi('19.400 € — inklusive eines Kredits auf deinen Namen', '€19,400 — including a loan in your name'),
      lessons: [
        bi('Fernwartungssoftware für Fremde ist die gefährlichste einzelne Handlung im ganzen Spiel.',
           'Installing remote access software for a stranger is the single most dangerous act in this entire game.'),
        bi('Wer deinen Bildschirm sieht, sieht auch dein Konto, deine Mails und deine TANs.',
           'Anyone who can see your screen can see your account, your mail and your one-time codes.'),
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
