# Durchschaut! / Seen Through It

Ein zweisprachiges Lernspiel (DE/EN) zu **Scamming**, **Cybermobbing** und **Spam** —
drei Spielmodi, die man selbst durchspielt statt sie erklärt zu bekommen.

A bilingual (German/English) learning game about **scams**, **cyberbullying** and
**spam** — three modes you play through rather than read about.

**→ https://lencraft151-cloud.github.io/ScammingCyberMobbingSpamming/**

---

## Die drei Modi

| Modus | Was passiert |
|-------|--------------|
| 🎣 **Scam-Storys** | Acht verzweigte Geschichten aus SMS, WhatsApp, Instagram, Discord, E-Mail und am Telefon — 118 Szenen, jede mit einer echten Ausgangslage und mehreren Enden. Am Ende steht klar da, ob du gescammt wurdest: mit Schadenshöhe, allen Warnsignalen, die in den Nachrichten steckten, einem Rückblick auf jede Entscheidung und den Hebeln, die gegen dich eingesetzt wurden. |
| 💬 **Cybermobbing im Klassenchat** | Ein Gruppenchat kippt gegen eine Mitschülerin. Nachrichten laufen in Echtzeit ein, Entscheidungen stehen unter Zeitdruck. Läuft die Zeit ab, zählt das als Schweigen — und Schweigen wird am Ende auch so benannt. |
| 🧠 **Maschen & Begriffe** | Die zwölf psychologischen Hebel hinter allen Maschen, fünfzehn Begriffe von Smishing bis Money Mule und sechs Regeln, die fast alles abdecken. |
| 🌊 **Spam-Flut** | 90 Sekunden Popup-Dauerbeschuss mit echten Dark Patterns: falsche Schließkreuze, flüchtende X, Hydra-Fenster, winzige Ablehnen-Knöpfe. Danach wird jeder Trick erklärt, der gezogen hat. |

Dazu: acht Scam-Szenarien decken bewusst beide Zielgruppen ab — Jugendliche
(Gaming-Skins, Fake-Shop, Klassenchat) und Erwachsene (Bank-Support, Enkeltrick,
Krypto-Anlagebetrug).

## Der Lernmodus

Der wichtigste Teil steckt nicht in den Storys selbst, sondern darin, **warum** sie
funktionieren. Wer nur einzelne Maschen auswendig lernt, erkennt die nächste nicht.

Im Lernmodus — standardmäßig an, in den Einstellungen abschaltbar — passieren deshalb
drei Dinge mitten in der Geschichte:

- **Der Hebel wird benannt, während er wirkt.** „Eingesetzter Hebel: Zeitdruck" steht
  im Chatverlauf genau dann, wenn der Zeitdruck aufgebaut wird.
- **Hintergrundkästen erklären die Technik.** Wie man eine Internetadresse liest, warum
  SMS-Absendernamen registriert sein müssen und Nummern nicht, was ein Finanzagent ist,
  welche Zahlarten rückholbar sind, was ein Zwei-Faktor-Code eigentlich beweist.
- **Nach jeder Entscheidung kommt sofort die Erklärung**, warum sie geholfen hat oder
  nicht — statt erst am Ende.

Wer die Story pur erleben will, schaltet den Lernmodus aus; dann kommt alles am Ende.

## Was drin steckt

- **Zweisprachig**, umschaltbar im laufenden Betrieb, gespeichert im Browser.
- **Ton komplett synthetisiert.** Jedes Geräusch entsteht live über die Web Audio API
  aus Oszillatoren, Filtern und Rauschen. Es gibt keine einzige Audiodatei im Projekt.
- **Keine Abhängigkeiten, kein Build-Schritt.** Reines HTML, CSS und JavaScript
  mit ES-Modulen.
- **Keine externen Anfragen, kein Tracking, keine Cookies.** Der Fortschritt liegt
  im `localStorage` und verlässt das Gerät nie.
- **Barrierefreiheit:** Tastaturbedienung (Ziffern wählen Antworten, `Esc` schließt
  Popups), sichtbarer Fokus, `aria-live` für einlaufende Nachrichten, Dark- und
  Light-Theme, und ein Schalter für reduzierte Bewegung.

> Alle Namen, Nummern, Firmen und Nachrichten sind frei erfunden. Eingaben in den
> nachgebauten Log-in-Formularen werden weder gespeichert noch gesendet.

## Lokal ausprobieren

ES-Module laufen nicht über `file://` — es braucht einen kleinen Webserver:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Prüfen

```bash
./tools/syntax-check.sh          # Syntax aller JS-Dateien
node tools/validate-content.mjs  # Sackgassen, unerreichbare Knoten, fehlende Übersetzungen
node tools/smoke-test.mjs        # lädt jede Seite in Chromium, meldet Konsolenfehler
node tools/play-test.mjs         # spielt alle drei Modi durch, inklusive Lernmodus
```

Die beiden Browser-Skripte sprechen das DevTools-Protokoll direkt an und brauchen
kein npm-Paket. Beide erwarten einen laufenden Webserver auf Port 8000;
`--shots <verzeichnis>` legt zusätzlich Screenshots ab. Alle vier Prüfungen laufen
bei jedem Push über [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

## Aufbau

```
index.html  scam.html  klassenchat.html  spam.html  maschen.html  credits.html

assets/css/   base.css (Tokens, Layout)  chat.css (Chat)  spam.css (Popups)
assets/js/    engine.js   Erzählmaschine + Inhaltsprüfung
              i18n.js     Sprachumschaltung        audio.js  Klangerzeugung
              ui.js       Chat, Anzeigen, Fenster  storage.js  Fortschritt
assets/js/data/scams/     die acht Geschichten, eine Datei je Story
assets/js/data/           klassenchat.js  spam.js
                          tactics.js   die zwölf Hebel
                          glossary.js  Begriffe und Regeln
```

Scam-Storys und Klassenchat teilen sich dieselbe Erzählmaschine
(`assets/js/engine.js`) — der Klassenchat erweitert sie nur um Entscheidungen
unter Zeitdruck. Eine neue Story ist eine neue Datei in
`assets/js/data/scams/`, eingetragen in `index.js`; der Validator prüft sie
anschließend automatisch mit — auch darauf, dass jeder verwendete Hebel in
`tactics.js` existiert und jeder Text beide Sprachen hat.

## Veröffentlichung

Jeder Push auf `main` veröffentlicht die Seite über
[`.github/workflows/pages.yml`](.github/workflows/pages.yml). Der Workflow
aktiviert GitHub Pages bei Bedarf selbst. Falls das an den Einstellungen der
Organisation scheitert: **Settings → Pages → Source: GitHub Actions**.

## Lizenz

Code: [MIT](LICENSE). Texte und Szenarien: CC BY 4.0.
