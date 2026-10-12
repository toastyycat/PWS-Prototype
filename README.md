# Toegankelijke afspraakwebsite voor ouderen

Deze repository hoort bij een profielwerkstuk op de vwo over toegankelijke websites voor ouderen. De onderzoeksvraag:

> Hoe kunnen tekstgrootte, navigatie, contrast en laadfeedback bijdragen aan een website waarmee ouderen van 65 jaar en ouder met weinig digitale ervaring op hun telefoon zelfstandig en met zo min mogelijk frustratie en onzekerheid een afspraak plannen en informatie vinden?

Deelnemers boeken op een telefoon fictieve afspraken en zoeken informatie op de website van een fictieve fysiotherapiepraktijk. Bij iedere opdracht zet de onderzoeker één kenmerk uit en kijkt waar de deelnemer vastloopt of twijfelt.

We hadden zelf maar weinig deelnemers. Daarom delen we het prototype en de methode, zodat **iedereen het onderzoek kan herhalen** en de (geanonimiseerde) resultaten kan delen.

> **Wil je alleen de resultaten lezen?** Ga naar de map [`resultaten/`](resultaten/README.md). Daar staat de paper en een uitleg in gewone taal.

## Wat wordt getest?

Er zijn vier kenmerken. Iedere deelnemer kreeg vier opdrachten; bij elke opdracht stond precies één kenmerk uit en stonden de andere drie aan. De animaties stonden altijd aan. Het prototype kan ook alles tegelijk aan of uit zetten; dat hebben wij niet getest.

| Kenmerk | Uit | Aan |
|---|---|---|
| Tekstgrootte | Belangrijke tekst 16 px, kleinere koppen | Belangrijke tekst 24 px, grotere koppen |
| Navigatie | Volgende en vorige stap achter een knop Menu | Volgende en vorige stap direct zichtbaar |
| Contrast | Grijsbruine tekst `#817971` op `#FFF8F0` (4,06:1) | Donkerbruine tekst `#493B32` op `#FFF8F0` (10,2:1) |
| Laadfeedback | Huidige pagina blijft onveranderd staan | Skeletonscherm van de volgende pagina |

Elke schermovergang duurt 1,4 seconde, in alle varianten. Zo verschilt alleen de feedback tijdens het wachten.

De volledige methode staat in [`docs/METHODE.md`](docs/METHODE.md). Hoe je een sessie uitvoert, staat in [`HANDLEIDING.md`](HANDLEIDING.md).

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
| `/` | Instelscherm: kenmerken en opdracht kiezen en het deelnemersscherm starten. Dit gebruikten wij in het onderzoek. |
| `/deelnemer` | Sessie met een vast rooster per code (1 tot en met 100); slaat taakduren op. Niet gebruikt in ons onderzoek. |
| `/onderzoek` | Overzicht bij dat rooster: downloads van rooster en taakduren. |
| `/print/opdrachten` | Opdrachtkaarten voor dat rooster. |

De interface en de opdrachten zijn in het Nederlands, omdat de deelnemers Nederlands spraken.

## Een sessie uitvoeren

1. **Werf** ouderen van 65 jaar en ouder, bij voorkeur met weinig digitale ervaring. Leg uit dat de website wordt getest en niet de persoon, dat de afspraken nep zijn en dat deelname vrijwillig is.
2. **Vraag toestemming** voor deelname en, apart, voor de schermopname. Een sjabloon staat in [`templates/`](templates/).
3. **Draai de app op een laptop** en open op de testtelefoon het adres van de laptop met poort 4310.
4. **Zet per opdracht** op het instelscherm één kenmerk uit en kies de opdracht. Start de schermopname, lees de opdracht voor en geef de telefoon aan de deelnemer. Geef in principe geen hints.
5. **Na de vier opdrachten** vult de deelnemer een kort formulier met open vragen in.
6. **Meet achteraf** tijd, slagen en fouten uit de schermopnames en je notities.

Het volledige verloop staat in [`HANDLEIDING.md`](HANDLEIDING.md).

## Gegevens en privacy

- Het instelscherm slaat niets op. De rooster-route `/deelnemer` slaat alleen de code, de taak en de duur op, in `data/taakduren.csv` op de laptop. De map `data/` gaat nooit mee naar Git.
- Vul de overige gegevens in de sjablonen in met alleen een deelnemerscode, nooit een naam. Bewaar de koppeling tussen naam en code apart.
- Schermopnamen kunnen gezichten en stemmen tonen. Bewaar ze buiten cloudgesynchroniseerde mappen en wis ze na de bewaartermijn uit het toestemmingsformulier.
- Er worden geen echte zorggegevens, accounts of afspraken gebruikt. Alle personen, locaties en inhoud op de website zijn verzonnen.

**Deze repository bevat geen persoonsgegevens van deelnemers.**

## Resultaten delen

Heb je het onderzoek zelf uitgevoerd? Open dan een issue met:

- het aantal deelnemers en hun leeftijdsgroep;
- hoe je de opdrachten en kenmerken verdeelde;
- de geanonimiseerde gegevens, zonder namen of opnames;
- de commit van het prototype en eventuele wijzigingen aan de methode.

Een technische storing is een ongeldige meting, geen fout van de deelnemer.

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
| `docs/METHODE.md` | Onderzoeksvragen en methode, uit de eindversie van het verslag. |
| `HANDLEIDING.md` | Stap-voor-stap-handleiding voor een sessie. |
| `INHOUD_EN_TESTROUTES.md` | Routes, opdrachten en de inhoud van de website. |
| `AGENTS.md` | De oorspronkelijke bouwopdracht voor het prototype. |

## Bekende beperkingen

- De informatieopdrachten eindigen met de knop "Ik heb het antwoord gevonden". Die knop verschijnt alleen op de juiste pagina, en dat kan de deelnemer verraden.
- Er is geen knop om een opdracht af te breken. Stopt een deelnemer, dan noteert de onderzoeker dat en zet de volgende opdracht klaar.
- De praktijksite staat vast op 100 % zoom. Gebruik de zoom van het apparaat als iemand grotere tekst nodig heeft, en houd die gelijk voor de hele sessie.
- Het uitgebreide onderzoekspaneel op `/onderzoek` (toestemming, apparaatkoppeling, observaties) is een voorbeeld en niet aangesloten.

## Licentie

De broncode staat onder de [MIT-licentie](LICENSE). De methode, opdrachten en sjablonen mogen onder [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) worden hergebruikt. De afbeeldingen in `public/images/` zijn voor dit prototype gemaakt; de prompts staan in `INHOUD_EN_TESTROUTES.md`.
