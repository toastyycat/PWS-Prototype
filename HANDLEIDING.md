# Handleiding: het onderzoek zelf uitvoeren

Dit prototype hoort bij een profielwerkstuk (vwo) over toegankelijke interfaces voor ouderen. De onderzoeksvraag is hoe tekstgrootte, duidelijke navigatie, contrast en een goed laadscherm eraan kunnen bijdragen dat 65-plussers met weinig digitale ervaring zelfstandig en met zo min mogelijk frustratie en onzekerheid een afspraak plannen.

Wij hadden zelf weinig deelnemers. Daarom delen we het prototype en het protocol, zodat anderen het onderzoek kunnen herhalen. Deze handleiding beschrijft een sessie stap voor stap. Een Engelstalig overzicht staat in de [README](README.md).

## Wat je nodig hebt

- Een laptop met [Node.js](https://nodejs.org/) 22.6 of nieuwer. Deze laptop draait de app en slaat de taakduren op.
- Een testtelefoon of tweede computer voor de deelnemer, op hetzelfde wifi-netwerk of een hotspot.
- Twee onderzoekers: een begeleider die voorleest en de vragen stelt, en een registrator die observeert en noteert.
- Geprinte opdrachtkaarten, het toestemmingsformulier en het registratieformulier.
- Eventueel schermopname op het testapparaat en een camera of microfoon voor gezicht en stem. De app neemt zelf niets op.

## Prototype starten

```bash
npm ci
npm test
npm run build
npm run preview
```

Vite toont een **Network**-adres, bijvoorbeeld `http://192.168.1.20:4310`. Open op het testapparaat dat adres met `/deelnemer` erachter. Gebruik `npm run dev` voor ontwikkeling met hot reload. Draai de app altijd via Vite: een eenvoudige statische server geeft bij verversen van `/deelnemer`, `/onderzoek` en `/informatie/...` een 404 en kan de taakduren niet opslaan.

Op school- of openbaar wifi kan de telefoon de laptop vaak niet bereiken. Gebruik dan een hotspot van een telefoon die níet de testtelefoon is. Laat de laptop niet in slaapstand gaan.

| Route | Gebruik |
|---|---|
| `/deelnemer` | Deelnemerssessie. Voer een code van 1 tot en met 100 in (`1` en `D01` werken allebei). |
| `/onderzoek` | Onderzoeksoverzicht met rooster, downloads van de rooster-CSV en de taakduren-CSV. |
| `/print/opdrachten` | Opdrachtkaarten voor alle deelnemers, om te printen. |
| `/` | Demo: zet ontwerpkenmerken en opdrachten vrij aan of uit. Niet voor metingen. |

## Het rooster

Elke deelnemerscode heeft vijftien taken in een vaste volgorde ([`public/deelnemers.csv`](public/deelnemers.csv)):

- twaalf boekingen, verdeeld over zes A/B-paren (één paar per vergelijking);
- twee informatieopdrachten (I1–I4), na het tweede en vierde boekingspaar;
- één inlogopdracht (I5) met het fictieve adres `alex.voorbeeld@example.invalid`, na het zesde paar.

Alleen de boekingen tellen mee in de A/B-vergelijking. Codes D01–D100 zijn vooraf ingedeeld: 51 voor smartphone en 49 voor desktop. Kies de code die bij het apparaat van de deelnemer past. Gebruik voor een proefsessie een code die je daarna niet meer gebruikt, en verwijder de testregels uit `data/taakduren.csv`. Anders denkt de app dat die code al bezig is.

In ons onderzoek vergeleken we vier kenmerken. Variant B is steeds het volledige ontwerp met alle vier kenmerken aan. In variant A is precies één kenmerk weggelaten: het kenmerk dat getest wordt.

| Paar | Kenmerk | A | B |
|---|---|---|---|
| 1 | Tekstgrootte | alles aan behalve grote tekst | alles aan |
| 2 | Duidelijke navigatie | alles aan behalve zichtbare Terug/Verder | alles aan |
| 3 | Contrast | alles aan behalve hoog contrast | alles aan |
| 6 | Laadscherm | alles aan behalve skeletonscherm | alles aan |

### Zo deden wij het

- We testten alleen op een smartphone.
- De vergelijking met animatie (micro-interacties) is weggevallen.
- Schermopnames van de telefoon en onze notities waren de bron voor fouten, twijfels en uitspraken.

Het prototype kan meer dan we gebruikten: paar 4 (micro-interacties), paar 5 (alles uit tegenover alles aan), een desktopgroep en de extra opdrachten I1–I5. Het ingebouwde rooster plant die nog steeds in, en een code doorloopt altijd alle vijftien taken. Wil je alleen onze vier vergelijkingen herhalen, pas dan `src/shared/roster.ts` aan en draai `npm run roster`. Vermeld bij je resultaten welke vergelijkingen je gebruikte.

Iedere schermovergang wacht 1,4 seconde, in alle varianten.

## Verloop van een sessie

1. **Welkom.** Leg uit dat je de website test en niet de persoon. Vastlopen zegt iets over het ontwerp. De deelnemer mag altijd pauzeren of stoppen.
2. **Toestemming.** Laat het [toestemmingsformulier](templates/toestemmingsformulier.md) tekenen, met aparte vinkjes voor deelname, schermopname en gezicht- of stemopname.
3. **Achtergrond.** Vul een regel in [`deelnemers-achtergrond.csv`](templates/deelnemers-achtergrond.csv) in.
4. **Uitleg.** Laat kort zien hoe tikken en scrollen werkt, zonder een boeking, zoek- of inlogopdracht voor te doen. Vraag de deelnemer hardop te vertellen wat hij of zij zoekt of onduidelijk vindt.
5. **Opnames starten.** Geef een duidelijk startsignaal als je meerdere opnames later wilt synchroniseren.
6. **Code invoeren** op het testapparaat en op **Start sessie** drukken. De tijd loopt vanaf het moment dat het homescherm verschijnt. Lees de opdracht daarom vóór **Start sessie** of **Verder naar TXX** voor en leg de kaart naast het apparaat.
7. **Na elke taak** de twee schaalvragen stellen, ook als de taak niet lukte, en een regel invullen in [`sessieregistratie.csv`](templates/sessieregistratie.csv).
8. **Pauze** aanbieden na T04 en na T09, of eerder als iemand dat nodig heeft.
9. **Na T15** een kort nagesprek houden, opnames stoppen en bedanken.
10. **Data veiligstellen.** Download `taakduren.csv` via `/onderzoek` of `/api/taakduren.csv`. Bewaar opnames in een lokale map buiten iCloud, OneDrive of Google Drive.

### Vaste regels tijdens een taak

- **Geen hints.** Bij een hulpvraag zeg je: "Probeer het maar zoals u denkt dat het moet." Herhaal de opdracht als daarom gevraagd wordt; de tijd loopt door. Noteer de hulpvraag.
- **Tijdgrens: 3 minuten.** Wil of kan de deelnemer niet verder, dan eindigt de taak als niet zelfstandig geslaagd. Er is geen afbreekknop: de begeleider maakt de taak af en de opgeslagen tijd is dan ongeldig. Noteer de echte stoptijd.
- **Fout** is een verkeerde dienst, datum of tijd, een verkeerde boekingsstap of een onterechte of herhaalde bevestiging. Het menu openen, scrollen of een andere toegestane route nemen is geen fout.
- **Verkeerde boeking.** De app toont wel "Afspraak geboekt", maar gaat niet door naar de volgende taak. De deelnemer moet zelf via **Afspraak wijzigen** herstellen. Zeg niet dat het fout is.
- **Technische storing** is een ongeldige meting. Tel die niet als fout van de deelnemer.
- **Informatieopdrachten** eindigen met **Ik heb het antwoord gevonden**. Die knop verschijnt alleen op de juiste pagina. Noteer het antwoord dat de deelnemer hardop geeft.
- **Zoom.** De deelnemersroute staat vast op 100 %. Heeft iemand grotere tekst nodig, gebruik dan de zoom van het apparaat en houd die de hele sessie gelijk. Noteer dit.

### Schaalvragen na elke taak

1 = helemaal niet, 2 = weinig, 3 = matig, 4 = veel, 5 = heel veel.

- **Frustratie:** "Hoeveel frustratie of ergernis voelde u tijdens deze opdracht?"
- **Onzekerheid:** "Hoe onzeker voelde u zich over wat u moest doen of over of het gelukt was?"

## Gegevens en privacy

- De app slaat alleen `deelnemerscode;taak;duur_seconden` op in `data/taakduren.csv` op de laptop. Met de omgevingsvariabele `PWS_RESULTS_DIR` kies je een andere map. De map `data/` gaat nooit mee in Git.
- Gebruik in alle bestanden alleen deelnemerscodes, geen namen of e-mailadressen. Bewaar de koppeling tussen naam en code apart.
- Bewaar opnames en formulieren niet langer dan in het toestemmingsformulier staat.
- Er worden geen echte zorggegevens, accounts, wachtwoorden of afspraken gebruikt. Alle personen, locaties en inhoud op de praktijksite zijn fictief.

## Resultaten delen

Open een issue in deze repository met het aantal deelnemers per apparaatgroep, hun leeftijdsbereik, de geanonimiseerde CSV-bestanden en de commit van het prototype die je gebruikte. Beschrijf resultaten per apparaatgroep en alleen met geldige gepaarde waarnemingen.

## Aanpassen

- Opdrachten, doelafspraken en verwachte antwoorden staan in `src/shared/protocol.ts`.
- De inhoud van de praktijksite staat in `src/participant/siteContent.ts`.
- `npm run roster` maakt `public/deelnemers.csv` opnieuw aan uit `src/shared/roster.ts`. Doe dit alleen als het roosteralgoritme verandert, en controleer de nieuwe CSV vóór gebruik.
- `scripts/illustrator/` maakt A4-opdrachtkaarten in Illustrator; zie de README in die map.
- `npm test` controleert de datumregels, de opdrachtvarianten, de variantisolatie en het rooster.

Meer over routes, informatiestructuur en beeldmateriaal staat in [INHOUD_EN_TESTROUTES.md](INHOUD_EN_TESTROUTES.md).
