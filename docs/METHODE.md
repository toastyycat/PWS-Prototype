# Onderzoeksvragen en methode

*Hoofdstuk 3 en 4 uit de eindversie van het profielwerkstuk (12 oktober 2026). De nummering volgt het verslag; bijlagen en figuren staan alleen in het verslag.*

## 3. Onderzoeksvragen

### 3.1 Hoofd- en deelvragen

Uit de literatuurstudie volgt dat ouderen meer moeite hebben met kleine tekst, weinig contrast, verborgen navigatie en onduidelijke systeemstatus, en dat zulke drempels kunnen leiden tot frustratie, onzekerheid en uiteindelijk vermijdingsgedrag. In ons prototype van een fictieve zorgpraktijk zijn vier van deze ontwerpkenmerken los aan en uit te zetten: tekstgrootte, navigatie, contrast en laadfeedback. De animaties uit 2.2.6 maken deel uit van het basisontwerp; die hebben we niet apart getest. Onze hoofdvraag luidt:

> *“Hoe kunnen tekstgrootte, navigatie, contrast en laadfeedback bijdragen aan een website waarmee ouderen van 65 jaar en ouder met weinig digitale ervaring op hun telefoon zelfstandig en met zo min mogelijk frustratie en onzekerheid een afspraak plannen en informatie vinden?”*

Met toegankelijkheid bedoelen we hier dat deelnemers een taak zelfstandig afronden en daarbij weinig frustratie en onzekerheid ervaren. Frustratie gaat over ergernis tijdens het uitvoeren van een taak; onzekerheid over twijfel aan de juiste vervolgstap of aan het slagen van een handeling. Taakduur en fouten helpen om de uitkomsten te begrijpen. We onderzoeken daarmee een afgebakend deel van digitale toegankelijkheid: de bruikbaarheid van één website op een telefoon voor onze deelnemers.

Om de hoofdvraag te beantwoorden, kijken we per kenmerk wat er gebeurt als juist dat kenmerk ontbreekt terwijl de andere drie aanstaan. De eerste deelvraag is in hoeverre kleinere tekst het zelfstandig plannen van een afspraak en het vinden van informatie moeilijker maakt. De tweede deelvraag gaat over navigatie: in hoeverre leidt het verbergen van de vervolgstappen achter een menuknop tot meer zoekwerk, fouten en twijfel? De derde deelvraag is in hoeverre een lager contrast tussen tekst en achtergrond het lezen en kiezen bemoeilijkt. De vierde deelvraag gaat over laadfeedback: in hoeverre maakt het ontbreken van een skeletonscherm tijdens een even lange wachttijd deelnemers onzekerder of ongeduldiger? Samen laten de deelvragen zien welke aanpassing voor onze deelnemers het meest bijdraagt en welke ze het minst missen.

### 3.2 Hypothese

Wij verwachten dat het weglaten van contrast de meeste problemen oplevert. De contrastgevoeligheid neemt met de leeftijd af (zie 2.2.2), en W3C (2023b) stelt daarom minimumeisen aan tekstcontrast. Zhou et al. (2022) vonden bovendien aanwijzingen dat kleurgebruik en indeling samenhangen met de taakprestaties van ouderen. Deze bronnen ondersteunen het belang van contrast, maar bewijzen niet dat contrast bij onze deelnemers het grootste effect heeft; dat blijft een verwachting.

Ook van tekstgrootte en navigatie verwachten we een duidelijk effect. Yeh (2020) vond dat grotere letters de bediening van een touchscreen door ouderen versnelden, dus kleinere tekst zal vaker tot verkeerd lezen en twijfel leiden. Bij navigatie verwachten we dat deelnemers zonder direct zichtbare vervolgstap meer zoeken en vaker vastlopen, omdat een verborgen menu extra kennis en geheugen vraagt (zie Mentale belasting en Affordance). Van laadfeedback verwachten we het kleinste effect. De wachttijd in het prototype is kort (1,4 seconde) en Yin et al. (2025) zagen dat gebruikers het wachten soms minder opmerken als er niets te zien is.

## 4. Onderzoeksmethode

### 4.1 Onderzoeksopzet

We voerden een kleinschalig gebruikersonderzoek uit met een werkend webprototype van een fictieve fysiotherapiepraktijk. Het onderzoek is vooral kwalitatief: we keken naar wat deelnemers deden en zeiden, en vulden dat aan met eenvoudige kwantitatieve gegevens zoals taakduur, slagen en het aantal fouten.

Iedere deelnemer kreeg vier opdrachten op een telefoon, in principe twee afspraken boeken en twee keer informatie op de website zoeken. Bij elke opdracht stond precies één van de vier onderzochte kenmerken uit (tekstgrootte, navigatie, contrast of laadfeedback); de andere drie stonden aan. Zo kreeg iedere deelnemer elke conditie één keer. Er waren twee uitzonderingen: D02 deed drie boekingen en één informatieopdracht, en D03 deed drie opdrachten, zonder de contrastconditie (zie bijlage B). De animaties stonden tijdens alle opdrachten aan. Er was geen versie waarin alle kenmerken aanstonden en ook geen versie waarin alles uitstond. We vergelijken dus de vier condities met elkaar: welk kenmerk deelnemers het meest missen als het ontbreekt.

Dit wijkt af van ons oorspronkelijke plan. Daarin zouden 25 deelnemers op een smartphone of computer zes A/B-paren van boekingen uitvoeren, inclusief een aparte animatietest, een vergelijking van het volledige basisontwerp met het volledig aangepaste ontwerp en schaalvragen na iedere taak. In de uitvoering hebben we de opzet verkleind tot vier opdrachten per persoon, alleen op de telefoon en zonder de animatietest. Dat kwam vooral doordat we veel minder deelnemers konden vinden dan gepland, maar ook omdat mensen snel de website leerden, dus extra opdrachten makkelijker zouden zijn (zie 4.2).

### 4.2 Deelnemers

We zochten deelnemers van 65 jaar en ouder, bij voorkeur met weinig ervaring met websites en apps. Eerst vroegen we ouderen op de markt in Valkenswaard om mee te doen. Dat leverde niemand op: veel ouderen durfden niet mee te doen, omdat ze dachten dat ze niets konden op websites. Daarna vroegen we grootouders van kennissen, maar ook daar waren er maar weinig beschikbaar. De groep is klein en niet willekeurig gekozen, dus de deelnemers vertegenwoordigen niet alle ouderen. Vijf personen deden mee (D01 tot en met D05), allemaal 70 jaar of ouder. Hun ervaring met de smartphone liep uiteen van weinig tot geen ervaring tot veel gebruik. Eén deelnemer gebruikte een stylus en één deelnemer had klachten aan de ogen en de handen. We noteerden per deelnemer de code, het apparaat, de datum en opvallende achtergrondinformatie uit het gesprek; namen staan niet in de onderzoeksgegevens.

### 4.3 Prototype en condities

Het prototype is een webapp (React en TypeScript) die in de browser van de telefoon werd geopend. Om de website snel te kunnen bouwen, hebben we bij het prototypen GPT-6 Sol — een AI-model van OpenAi — gebruikt om de code te schrijven. Het ontwerp hebben we wel zelf gedaan. Drie deelnemers gebruikten een Android-telefoon met Chrome en twee een iPhone met Safari. De website lijkt op die van een echte zorgpraktijk: een homepagina met een knop Afspraak maken, vijf zorggebieden, een zoekbalk, een menu en een footer, en tientallen informatiepagina’s. Alle inhoud, personen en de locatie zijn fictief; er worden geen echte afspraken of gegevens opgeslagen. Een afspraak boeken gaat in vier stappen: dienst kiezen, datum kiezen, tijd kiezen en controleren, gevolgd door een bevestigingsscherm. De kalender toont alle werkdagen van oktober 2026 tot en met maart 2027.

Voor iedere opdracht zette de onderzoeker op de telefoon in een bedieningspaneel de juiste conditie en opdracht klaar, startte het deelnemersscherm en gaf de telefoon daarna aan de deelnemer. De vier kenmerken werkten als volgt; in elke conditie stond alleen het genoemde kenmerk op de uit-stand.

#### Tekstgrootte

Aan gebruikt de site voor de belangrijke tekst 24 pixels met grotere koppen; uit gebruikt 16 pixels met kleinere koppen. Beide varianten gebruiken het lettertype Noto Sans met een regelhoogte van 1,5. Knoppen en keuzelijsten staan in beide varianten op dezelfde plek.

#### Navigatie

Aan staan de knoppen voor de volgende en vorige stap van de afspraakroute direct zichtbaar in beeld. Uit staan dezelfde opties achter een knop Menu, die de deelnemer eerst moet openen. Labels, volgorde en stappen zijn gelijk.

#### Contrast

Beide varianten gebruiken een lichte achtergrond (#FFF8F0). Aan is de tekst donkerbruin (#493B32), wat ruim boven de WCAG-norm van 4,5:1 ligt met een contrast van 10,2:1. Uit is de tekst grijsbruin (#817971) en zijn randen en knoppen lichter, zodat alle inhoud buiten afbeeldingen onder 4,5:1 blijft met een contrast van 4,06:1. Deze lage instelling bestaat alleen als onderzoeksconditie.

#### Laadfeedback

Iedere schermovergang duurt in beide varianten 1,4 seconde. Aan verschijnt tijdens die wachttijd een skeletonscherm met de globale opbouw van de volgende pagina en een bewegende glans. Uit blijft de huidige pagina onveranderd staan, zonder enig laadsignaal, tot de nieuwe pagina verschijnt.

#### Animaties

In alle condities stonden de micro-interacties aan: schermen en onderdelen verschijnen kort met een rustige beweging, en knoppen reageren zichtbaar op aanraken. Omdat de animaties nooit uitstonden, kunnen we over hun effect geen uitspraak doen.

### 4.4 Opdrachten

Per sessie waren er vier opdrachten: twee boekingen en twee informatieopdrachten (voor de uitzonderingen, zie 4.1). Voor de boekingen waren vier versies met een andere dienst, datum en tijd in oktober 2026, bijvoorbeeld “Maak een afspraak voor intake op dinsdag 6 oktober 2026 om 10.30 uur”. Een deelnemer kreeg er in principe twee van. De informatieopdrachten waren: zoek op de site welke voorbeeldlocatie van de praktijk wordt genoemd (antwoord: Valkenswaard centrum), en zoek de pagina Bewegen in een groep op en vertel voor wie de activiteit bedoeld is. Bij die opdrachten hoefde de deelnemer geen afspraak te maken.

De combinatie van opdracht en conditie en de volgorde van de opdrachten verschilden per deelnemer. Zo viel bijvoorbeeld de conditie zonder contrast niet bij iedereen samen met dezelfde opdracht. We hebben dit niet volgens een vast schema verdeeld, maar per sessie gekozen; de gebruikte combinaties staan in de bijlage.

### 4.5 Onderzoeksverloop

De sessies vonden plaats tussen 8 en 11 oktober 2026. Een sessie begon met uitleg: we testen de website, niet de deelnemer, en vastlopen zegt iets over het ontwerp. Daarna lazen we per opdracht de taak voor en startten we het deelnemersscherm. Tijdens de opdracht gaven we in principe geen hints. Als een deelnemer echt vastliep, hielp de onderzoeker, begon de opdracht opnieuw of werd de opdracht gestopt; dat noteerden we. Er gold geen harde tijdgrens. Om de deelnemers niet herkenbaar te maken, noemen we de locaties van de sessies niet.

Na de vier opdrachten vulde de deelnemer een kort online formulier in met zeven open vragen: de deelnemercode, welke onderdelen makkelijk waren, welke moeilijk of verwarrend, of er twee versies van een opdracht duidelijk verschillend voelden, wat het meest hielp bij het maken van de afspraken, welke aanpassing de deelnemer zou willen behouden, en overige opmerkingen.

### 4.6 Dataverzameling

We legden iedere opdracht vast met de ingebouwde schermopname van de telefoon. Tijdens de sessie maakte de onderzoeker notities over wat opviel en wat de deelnemer zei. Bij twee opdrachten mislukte de schermopname; daar gebruiken we alleen de notities en, waar die er was, een stopwatchtijd.

Na de sessies zetten we per opdracht de gegevens in één tabel: deelnemercode, apparaat, datum, volgorde, opdracht, welk kenmerk uitstond, resultaat, tijd, geslaagd of niet, de reden van stoppen, fouten, hulpvragen, observaties en citaten. De tijd loopt van het moment dat de website in beeld komt tot de bevestiging “Uw afspraak is geboekt” of tot het moment dat het antwoord in beeld is. Een boeking telt alleen als geslaagd als dienst, datum en tijd alle drie kloppen. Een informatieopdracht is geslaagd als de deelnemer het juiste antwoord vindt. Als fout tellen we een verkeerde dienst, datum of tijd en een verkeerde stap in de route; een zelf herstelde vergissing rekenen we wel als fout, maar niet als mislukte taak.

We hebben deelnemers niet na iedere opdracht een cijfer laten geven voor frustratie en onzekerheid. Deze ervaringen halen we uit wat deelnemers zelf zeiden tijdens en na de opdrachten, uit zichtbaar gedrag in de opnames (zoals lang zoeken, herhaald tikken of opnieuw beginnen) en uit de antwoorden op het formulier. Een uitspraak of zichtbare twijfel bewijst op zichzelf geen frustratie; we beschrijven daarom wat we zagen en hoorden en geven aan waar het een interpretatie is.

Bij sommige opdrachten was achteraf niet helemaal zeker welke conditie aanstond, omdat het bedieningspaneel niet in de opname stond. Dan hebben we de conditie afgeleid uit wat in beeld te zien is (bijvoorbeeld kleine tekst of de knop Menu) of, als dat niet kon, uit de condities die die deelnemer al had gehad. Bij elke opdracht staat in de dataset hoe de conditie is vastgesteld.

### 4.7 Data-analyse

Gezien het kleine aantal deelnemers analyseren we beschrijvend en doen we geen statistische toetsen. Per conditie tellen we hoeveel opdrachten zelfstandig slaagden, hoeveel fouten er waren en van welke soort, en geven we de mediane taakduur. Omdat boekingen en informatieopdrachten verschillend van aard zijn, bespreken we die apart. Tijden van mislukte of herstarte opdrachten zijn geen gewone voltooiingstijden; die vermelden we apart.

De notities, observaties en antwoorden op het formulier ordenen we in categorieën, zoals leesproblemen, zoeken naar de volgende stap, onduidelijke feedback, onbedoeld een afspraak maken en problemen met de zoekbalk. We koppelen iedere observatie en ieder citaat aan de juiste deelnemer en conditie. Zo kunnen we per kenmerk beschrijven waar deelnemers vastliepen of twijfelden, en welke aanpassing ze zelf het meest waardeerden.

We maken geen algemene rangorde van de vier kenmerken. Iedere conditie viel per deelnemer samen met een andere opdracht, en de opdrachten verschillen in moeilijkheid. Een verschil tussen condities kan dus ook door de opdracht of door de volgorde komen.

### 4.8 Validiteit en betrouwbaarheid

Doordat iedere deelnemer alle vier de condities deed, wegen persoonlijke verschillen minder zwaar dan bij vier aparte groepen. Om de metingen controleerbaar te maken, hebben we iedere opdracht opgenomen waar dat lukte, en bij iedere opdracht vastgelegd hoe de conditie is vastgesteld en of er geholpen of herstart is. Het prototype, de opdrachten en het formulier hebben we openbaar gemaakt, zodat anderen de test kunnen herhalen. De beperkingen van deze opzet, zoals het kleine aantal deelnemers, het ontbreken van een versie met alle kenmerken aan en het afleiden van frustratie en onzekerheid zonder schaal, bespreken we in hoofdstuk 7.

### 4.9 Toestemming en privacy

Vooraf legden we het doel en het verloop van het onderzoek uit en vroegen we toestemming voor deelname en de schermopname. Deelname was vrijwillig en deelnemers mochten altijd stoppen. Het prototype gebruikt alleen fictieve gegevens, dus er zijn geen echte afspraken of persoonsgegevens ingevoerd. In de analyse gebruiken we codes (D01 tot en met D05). Persoonlijke gezondheidsinformatie die een deelnemer in het nagesprek noemde, nemen we alleen samengevat op. Opnames en namen publiceren we niet. Na afronding van het profielwerkstuk verwijderen we de opnames, op één na, die we bewaren om te laten zien hoe een sessie eruitzag.

