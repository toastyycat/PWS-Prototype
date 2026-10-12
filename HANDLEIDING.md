# Handleiding: het onderzoek zelf uitvoeren

Deze handleiding beschrijft stap voor stap hoe wij een sessie uitvoerden, zodat je het onderzoek kunt herhalen. De volledige methode staat in [`docs/METHODE.md`](docs/METHODE.md).

## Kort samengevat

- Iedere deelnemer krijgt **vier opdrachten op een telefoon**: in principe twee afspraken boeken en twee keer informatie op de website zoeken.
- Bij elke opdracht staat **precies één kenmerk uit**: tekstgrootte, navigatie, contrast of laadfeedback. De andere drie staan aan. Zo krijgt iedere deelnemer elke conditie één keer.
- De **animaties staan altijd aan**. Er is geen versie met alles aan en geen versie met alles uit.
- Na de vier opdrachten vult de deelnemer een **kort formulier met open vragen** in. Er zijn geen cijfervragen na iedere opdracht.

## Wat je nodig hebt

- Een laptop met [Node.js](https://nodejs.org/) 22.6 of nieuwer die de app draait.
- Een testtelefoon op hetzelfde wifi-netwerk, of een hotspot van een telefoon die níet de testtelefoon is.
- Schermopname op de testtelefoon (de ingebouwde opname werkt). De app neemt zelf niets op.
- Het [toestemmingsformulier](templates/toestemmingsformulier.md), het registratiesjabloon en papier voor notities.
- Een kort online formulier voor na de sessie (zie hieronder).
- Bij voorkeur twee onderzoekers: één begeleidt, één noteert.

## Prototype starten

```bash
npm ci
npm test
npm run build
npm run preview
```

De server luistert op poort 4310 op alle netwerkverbindingen. Zoek het lokale IP-adres van de laptop op (bijvoorbeeld `192.168.1.20`) en open op de testtelefoon `http://<dat adres>:4310/`. Laat de laptop niet in slaapstand gaan.

## Een opdracht klaarzetten

Wij gebruikten het instelscherm op `/`. Dat zet je op de telefoon klaar voordat je die aan de deelnemer geeft.

1. Zet bij **Testformat** de schakelaar **Alles** aan.
2. Zet daarna precies **één kenmerk uit**: **Tekstgrootte**, **Navigatie**, **Contrast** of **Geduld bij laden** (de laadfeedback). Laat **Animatie** aan.
3. Kies bij **Opdrachten** één opdracht:
   - **Boeking X, Y, Z of W**: een afspraak met een vaste dienst, datum en tijd, bijvoorbeeld "Maak een afspraak voor intake op dinsdag 6 oktober 2026 om 10.30 uur". De exacte zin staat onder de opdracht.
   - **Siteopdracht I2**: "Zoek op de site welke voorbeeldlocatie van de praktijk wordt genoemd." (antwoord: Valkenswaard centrum)
   - **Siteopdracht I4**: "Zoek de pagina Bewegen in een groep en vertel voor wie de activiteit bedoeld is."
4. Druk op **Start deelnemersscherm** en geef de telefoon aan de deelnemer. De deelnemer ziet de instellingen en de opdracht niet.
5. Laad na de opdracht `/` opnieuw om de volgende opdracht klaar te zetten.

Varieer per deelnemer welke opdracht bij welk kenmerk hoort en in welke volgorde, zodat een kenmerk niet steeds met dezelfde opdracht samenvalt. Noteer per opdracht welk kenmerk uitstond. Zet het bedieningspaneel zo mogelijk in beeld van de opname; dan kun je de conditie achteraf controleren.

## Verloop van een sessie

1. **Welkom.** Leg uit dat je de website test en niet de deelnemer. Vastlopen zegt iets over het ontwerp. De deelnemer mag altijd pauzeren of stoppen.
2. **Toestemming.** Vraag toestemming voor deelname en, apart, voor de schermopname.
3. **Achtergrond.** Noteer met alleen een deelnemerscode (bijvoorbeeld D06): apparaat, leeftijd en ervaring met de smartphone, en eventuele hulpmiddelen zoals een leesbril of stylus.
4. **Per opdracht:** zet de opdracht klaar, start de schermopname, lees de opdracht voor en geef de telefoon aan de deelnemer. Geef in principe geen hints. Noteer wat opvalt en wat de deelnemer zegt.
5. **Na de vier opdrachten** vult de deelnemer het formulier in (zie hieronder).
6. **Afsluiten.** Bedank de deelnemer en zet de opnames in een lokale map buiten iCloud, OneDrive of Google Drive.

### Regels tijdens een opdracht

- **Geen hints.** Herhaal de opdracht als daarom gevraagd wordt. Noteer iedere hulpvraag.
- **Vastlopen.** Er is geen harde tijdgrens. Loopt een deelnemer echt vast, dan helpt de onderzoeker, begint de opdracht opnieuw of wordt de opdracht gestopt. Noteer wat er gebeurde.
- **Tijd.** De tijd loopt van het moment dat de website in beeld komt tot "Uw afspraak is geboekt" of tot het antwoord in beeld is. Meet die achteraf uit de schermopname, of met een stopwatch als de opname mislukt.
- **Geslaagd.** Een boeking is alleen geslaagd als dienst, datum en tijd alle drie kloppen. Een informatieopdracht is geslaagd als de deelnemer het juiste antwoord vindt.
- **Fouten.** Een verkeerde dienst, datum of tijd en een verkeerde stap in de route tellen als fout. Een zelf herstelde vergissing is wel een fout, maar geen mislukte opdracht.
- **Verkeerde boeking.** De bevestiging ziet er hetzelfde uit als bij een juiste boeking. Zeg niet dat het fout is.
- **Informatieopdrachten** eindigen met de knop **Ik heb het antwoord gevonden**. Die knop verschijnt alleen op de juiste pagina. Noteer het antwoord dat de deelnemer hardop geeft.

### Formulier na de sessie

Wij gebruikten een kort [online formulier](https://docs.google.com/forms/d/e/1FAIpQLSfVgJnUne8z5FG6zDNFzchugg2IhoVV1Stpc04yeh-yjA8JZw/viewform) met zeven open vragen. Je kunt het bekijken, of een kopie maken voor je eigen onderzoek:

1. Wat is uw deelnemercode?
2. Welke onderdelen vond u makkelijk?
3. Welke onderdelen vond u moeilijk of verwarrend?
4. Voelden twee versies van een opdracht duidelijk verschillend?
5. Wat hielp het meest bij het maken van de afspraken?
6. Welke aanpassing zou u willen behouden?
7. Heeft u nog andere opmerkingen?

Frustratie en onzekerheid haalden wij uit wat deelnemers zeiden, uit zichtbaar gedrag in de opnames (zoals lang zoeken, herhaald tikken of opnieuw beginnen) en uit dit formulier.

## Gegevens vastleggen

Zet de gegevens per opdracht in [`templates/sessieregistratie.csv`](templates/sessieregistratie.csv) en de achtergrond per deelnemer in [`templates/deelnemers-achtergrond.csv`](templates/deelnemers-achtergrond.csv). De kolommen worden uitgelegd in [`templates/README.md`](templates/README.md). De kolommen `frustratie` en `onzekerheid` mag je leeg laten als je, net als wij, geen cijfervragen stelt.

- Gebruik alleen deelnemerscodes, nooit namen. Bewaar de koppeling tussen naam en code apart.
- Bewaar opnames en formulieren niet langer dan je in het toestemmingsformulier hebt afgesproken.
- Er worden geen echte zorggegevens, accounts of afspraken gebruikt. Alle personen, locaties en inhoud op de praktijksite zijn fictief.

## Andere mogelijkheden van het prototype

Het prototype kan meer dan wij gebruikten. Op `/deelnemer` staat een sessie met een vast rooster van vijftien taken per code (A/B-paren, extra opdrachten en een inlogopdracht). Die route slaat de taakduren automatisch op in `data/taakduren.csv`. Ook zijn er een animatietest, een vergelijking van alles uit tegenover alles aan en een desktopgroep. Die hebben wij niet gebruikt. Zie [`INHOUD_EN_TESTROUTES.md`](INHOUD_EN_TESTROUTES.md) voor de routes en de inhoud van de site.

## Resultaten delen

Heb je het onderzoek uitgevoerd? Open een issue in deze repository met het aantal deelnemers, hun leeftijdsgroep, hoe je de opdrachten en kenmerken verdeelde, de geanonimiseerde gegevens en de commit van het prototype die je gebruikte. Zie ook [`resultaten/README.md`](resultaten/README.md).
