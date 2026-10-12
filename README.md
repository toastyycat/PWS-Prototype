# Toegankelijke afspraakwebsite voor ouderen

Deze repository hoort bij een profielwerkstuk op de vwo over toegankelijke websites voor ouderen. De onderzoeksvraag:

> Hoe kunnen tekstgrootte, duidelijke navigatie, contrast en een goed laadscherm helpen dat volwassenen van 65 jaar en ouder met weinig digitale ervaring zelfstandig een afspraak kunnen maken, met zo min mogelijk frustratie en onzekerheid?

Deelnemers maken op een smartphone een fictieve afspraak bij een fictieve fysiotherapiepraktijk. De onderzoeker zet per test één kenmerk uit en vergelijkt hoe snel, hoe zelfstandig en hoe prettig de deelnemer de afspraak maakt.

We hadden zelf maar weinig deelnemers. Daarom delen we het prototype en de methode, zodat **iedereen het onderzoek kan herhalen** en de (geanonimiseerde) resultaten kan delen.

> **Wil je alleen de resultaten lezen?** Ga naar de map [`resultaten/`](resultaten/README.md). Daar staat de paper en een uitleg in gewone taal.

## Wat wordt getest?

Er zijn vier kenmerken. Variant B is het volledige ontwerp met alle vier kenmerken aan. In variant A is precies één kenmerk weggelaten: het kenmerk dat getest wordt.

| Test | Kenmerk | Variant A (één kenmerk weggelaten) | Variant B (alles aan) |
|---|---|---|---|
| 1 | Tekstgrootte | 16 px basistekst | 24 px tekst en grotere koppen |
| 2 | Duidelijke navigatie | Terug en Verder achter een Menu-knop | Terug en Verder altijd zichtbaar |
| 3 | Contrast | Tekst onder de 4,5:1-norm | Contrast van minstens 4,5:1 |
| 6 | Laadscherm | Huidige pagina blijft staan tijdens het wachten | Skeleton van de volgende pagina tijdens het wachten |

Elke schermovergang duurt 1,4 seconde, in alle varianten. Zo verschilt alleen de feedback tijdens het wachten.

Het prototype kan meer dan wij gebruikten: een animatietest, een test met alles uit tegenover alles aan, een desktopgroep en extra informatieopdrachten. Zie [`HANDLEIDING.md`](HANDLEIDING.md) voor wat we precies deden en hoe je dat zelf herhaalt.

## Zelf starten

Je hebt [Node.js](https://nodejs.org/) 22.6 of nieuwer nodig.

```bash
git clone https://github.com/toastyycat/PWS-Prototype.git
cd PWS-Prototype
npm ci
npm test          # controleert de datums, opdrachten en varianten
npm run build
npm run preview   # http://localhost:4310, ook bereikbaar op je lokale netwerk
```

Gebruik `npm run dev` tijdens het ontwikkelen. Draai de app altijd via Vite (`preview` of `dev`): een gewone bestandsserver kan de taakduren niet opslaan.

| Adres | Gebruik |
|---|---|
| `/deelnemer` | Deelnemerssessie: voer een code in (1 tot en met 100). |
| `/onderzoek` | Overzicht voor de onderzoeker: rooster en downloads. |
| `/print/opdrachten` | Opdrachtkaarten om te printen. |
| `/` | Demo om het prototype uit te proberen. Niet voor metingen. |

De interface en de opdrachten zijn in het Nederlands, omdat de deelnemers Nederlands spraken.

## Een sessie uitvoeren

1. **Werf** volwassenen van 65 jaar en ouder, bij voorkeur met weinig digitale ervaring. Leg uit dat de website wordt getest en niet de persoon, dat de afspraak nep is en dat deelname vrijwillig is.
2. **Vraag schriftelijke toestemming** voor deelname, en apart voor schermopname en gezicht- of stemopname. Een sjabloon staat in [`templates/`](templates/).
3. **Bereid de apparaten voor.** Draai de app op een laptop. Verbind de testtelefoon met hetzelfde wifi-netwerk en open het netwerkadres dat Vite toont, gevolgd door `/deelnemer`.
4. **Print** de opdrachtkaarten en het registratieformulier.
5. **Tijdens de sessie** leest één persoon de opdracht voor en stelt de vragen, en een tweede persoon noteert wat er gebeurt. Lees de opdracht voor je op "Start sessie" of "Verder naar TXX" drukt: de tijd begint zodra het startscherm verschijnt. Geef geen hints.
6. **Stel na elke taak** de twee vragen over frustratie en onzekerheid (1 tot 5).
7. **Sluit af** met een kort nagesprek en download daarna `taakduren.csv` via `/onderzoek`.

Het volledige script, met de exacte formuleringen, staat in [`HANDLEIDING.md`](HANDLEIDING.md).

## Gegevens en privacy

- De app slaat alleen de code, de taak en de duur in seconden op, in `data/taakduren.csv` op de laptop. De map `data/` gaat nooit mee naar Git.
- Vul de overige gegevens in de sjablonen in met alleen een deelnemerscode, nooit een naam. Bewaar de koppeling tussen naam en code apart.
- Schermopnamen kunnen gezichten en stemmen tonen. Bewaar ze buiten cloudgesynchroniseerde mappen en wis ze na de bewaartermijn uit het toestemmingsformulier.
- Er worden geen echte zorggegevens, accounts of afspraken gebruikt. Alle personen, locaties en inhoud op de website zijn verzonnen.

**Deze repository bevat geen persoonsgegevens van deelnemers.**

## Resultaten delen

Heb je het onderzoek zelf uitgevoerd? Open dan een issue met:

- het aantal deelnemers en hun leeftijdsgroep;
- de geanonimiseerde gegevens, zonder namen of opnames;
- de commit van het prototype en eventuele wijzigingen aan de methode.

Rapporteer per apparaatgroep en gebruik alleen geldige, gepaarde waarnemingen. Een technische storing is een ongeldige meting, geen fout van de deelnemer.

## Mappen

| Map of bestand | Inhoud |
|---|---|
| `src/participant/` | De fictieve praktijkwebsite en de afspraakflow. |
| `src/researcher/` | Het overzicht voor de onderzoeker en het printen van kaarten. |
| `src/shared/protocol.ts` | Varianten, doelafspraken, informatieopdrachten en verwachte antwoorden. |
| `src/shared/roster.ts`, `scripts/generate-roster.mjs` | Het rooster; `npm run roster` maakt `public/deelnemers.csv` opnieuw. |
| `server/taskCsv.ts` | De Vite-plugin die de taakduren opslaat. |
| `scripts/illustrator/` | Illustrator-script dat het rooster omzet naar A4-opdrachtkaarten. |
| `templates/` | Toestemmingsformulier en registratiesjablonen. |
| `resultaten/` | Paper, tabellen en figuren van de resultaten van D01 tot D05. |
| `docs/` | De oorspronkelijke methode (Word, Nederlands). |
| `HANDLEIDING.md` | Stap-voor-stap-handleiding voor een sessie. |
| `INHOUD_EN_TESTROUTES.md` | Routes, opdrachten en de inhoud van de website. |
| `AGENTS.md` | De oorspronkelijke bouwopdracht voor het prototype. |

## Bekende beperkingen

- De informatieopdrachten eindigen met de knop "Ik heb het antwoord gevonden". Die knop verschijnt alleen op de juiste pagina, en dat kan de deelnemer verraden.
- Er is geen knop om een taak af te breken. Bij opgeven of de tijdgrens van 3 minuten maakt de onderzoeker de taak af, en de tijd is dan ongeldig.
- De deelnemersroute staat vast op 100 % zoom. Gebruik de zoom van het apparaat als iemand grotere tekst nodig heeft, en houd die gelijk voor de hele sessie.
- Het uitgebreide onderzoekspaneel op `/onderzoek` (toestemming, apparaatkoppeling, observaties) is een voorbeeld en niet aangesloten.

## Licentie

De broncode staat onder de [MIT-licentie](LICENSE). De methodedocumenten, opdrachten en sjablonen mogen onder [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) worden hergebruikt. De afbeeldingen in `public/images/` zijn voor dit prototype gemaakt; de prompts staan in `INHOUD_EN_TESTROUTES.md`.
