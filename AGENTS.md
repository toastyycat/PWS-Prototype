# Bouwplan voor het PWS prototype fysiotherapie

Dit bestand is de overdracht aan het model dat de applicatie gaat bouwen. Het beschrijft een onderzoeksprototype voor fictieve fysiotherapieafspraken met React, TypeScript en Tailwind CSS. De gebruikerskeuzes zijn op 23 september 2026 besproken en vastgelegd. Tijdens het opstellen van dit bestand is geen applicatiecode gemaakt.

## Aanvulling 24 september 2026

De gebruiker heeft de volgende latere keuzes gemaakt; deze vervangen tegenstrijdige passages hieronder. De onderzoeker kiest vóór het deelnemersscherm een van de boekingsversies X/Y/Z/W of een siteopdracht I1/I2/I3/I4. Deelnemers zien daarna een uitgebreidere praktijksite met meerdere zorggebieden, informatiepagina’s, gevarieerde foto’s en geloofwaardige omwegen. Per deelnemer zijn tien boekingen en twee verkennende informatiezoekopdrachten gepland. Alleen de boekingen worden in de vijf A/B-paren vergeleken. De kalender biedt zes maanden van oktober 2026 tot en met maart 2027 met iedere werkdag boekbaar en weekenden niet boekbaar. De actuele Word-methode is op deze keuzes aangepast. `INHOUD_EN_TESTROUTES.md` en `src/shared/protocol.ts` beschrijven de huidige routes en scenario’s. Het onderzoekspaneel is op dit moment een frontendvoorbeeld zonder gegevensopslag of apparaatkoppeling.

## 1. Opdracht en bronnen

Bouw binnen deze map een werkende Nederlandse webapp voor ouderen van 65 jaar en ouder met weinig digitale ervaring. Een deelnemer boekt fictieve afspraken op een smartphone of desktop. Een onderzoeker bedient op een aparte laptop het onderzoekspaneel. Beide apparaten gebruiken dezelfde wifi of hotspot; de laptop draait de lokale server.

De hoofdvraag betreft zelfstandig een afspraak plannen met zo min mogelijk frustratie en onzekerheid. De app moet de vijf A/B-vergelijkingen uit de methode reproduceerbaar uitvoeren en betrouwbare registratie ondersteunen. Maak een verzorgde, geloofwaardige praktijkomgeving waarin alle aangeboden boekingskeuzes werken.

### Bronvolgorde

1. Expliciete gebruikerskeuzes in dit bestand gaan voor op eerdere documenten en Figma.
2. De actuele onderzoeksmethode in `../Profielwerkstuk UI design voor uncs - met voorbeelden.docx`, hoofdstukken 3 en 4, bepaalt de overige onderzoeksregels.
3. Het theoretisch kader, vooral §2.2.4 tot en met §2.2.6, onderbouwt de vormgeving.
4. De onderstaande Figma-frames leveren visuele inspiratie en tekstschalen.
5. Oudere documenten in `../Oud` en de oorspronkelijke probleemstelling zijn achtergrondmateriaal. Hun eerdere, bredere plannen voegen geen functionaliteit toe.

Beide actuele Word-bestanden zijn gelezen en tekstueel vergeleken. De versie met voorbeelden bevat extra illustraties, bijschriften en bronverwijzingen; de onderzoeksmethode is inhoudelijk gelijk. Bij de inventarisatie was deze Prototype-map leeg en waren er geen bestaande applicatiecomponenten of AGENTS-instructies.

### Geïnspecteerde Figma-bronnen

- [PWS-pagina in Bakker Ei Redesign](https://www.figma.com/design/IUavK05hNSM7Acye0U69ad/Bakker-Ei-Redesign?node-id=261-333). De bestandsnaam gaat niet over de te bouwen toepassing; gebruik alleen de PWS-pagina.
- [Fysiotherapie Home, frame 623:406](https://www.figma.com/design/IUavK05hNSM7Acye0U69ad/Bakker-Ei-Redesign?node-id=623-406): fotoachtergrond, bruine huisstijl, afgerond centraal vlak, Afspraak maken en Uw gegevens. Ontwerpcontext en screenshot zijn bekeken.
- [Kleine en grote typescale, frame 631:333](https://www.figma.com/design/IUavK05hNSM7Acye0U69ad/Bakker-Ei-Redesign?node-id=631-333): basis 16/24 en 24/36, gewichten 400/600/700, verschillende koprollen. Ontwerpcontext en screenshot zijn bekeken.
- Op dezelfde pagina staan voorlopige frames Uw gegevens (`634:3455`) en Afspraak maken (`634:3494`). Die bevatten nog geen uitgewerkte boekingsflow. De oudere typescale `630:342` is geen tweede, concurrerende specificatie.

De homepage gebruikt Material 3-knoppen. Neem daarvan de herkenbare vorm, actiehiërarchie en consistente toestanden over. Het publiek gevonden Material 3-communitybestand was via de koppeling niet toegankelijk; presenteer dat niet als een geïnspecteerd ontwerp. De eigen Figma-frames zijn wel toegankelijk en onderzocht.

### Bewuste wijzigingen ten opzichte van de methode

De gebruiker heeft onderstaande wijzigingen gekozen. Neem ze op in een op te leveren protocolaanvulling, zodat de onderzoekers vóór de proeftest hun methode kunnen bijwerken. Bewerk de Word-documenten niet automatisch.

| Onderwerp | Vastgelegde keuze |
| --- | --- |
| Testomgeving | Werkende webapp vervangt het klikbare Figma-prototype. |
| Afspraakcontext | Fictieve fysiotherapiepraktijk. |
| Begin van de meting | Homepage hoort bij iedere getimede boeking; daarna volgt dienstkeuze. |
| Uw gegevens | Werkende omweg met uitsluitend vaste fictieve gegevens en terugmogelijkheid. |
| Lettertype | Lokaal meegeleverde Noto Sans op alle apparaten, ter vervanging van Arial. |
| Datumkeuze | Maandkalender met vier beschikbare datums per taak. |
| Losse vergelijkingen | Niet-onderzochte eigenschappen blijven telkens op dezelfde basisinstellingen. |
| Navigatie | Terug en Verder zitten in A achter Menu en zijn in B direct zichtbaar. |
| Verkeerde bevestiging | Binnen 15 seconden moet de volledige juiste boeking opnieuw bevestigd zijn; de totale limiet van 180 seconden blijft gelden. |
| Herkennen van succes | Apart handmatig tijdstip wanneer de deelnemer aangeeft dat de afspraak geboekt is. |
| Onderzoeksbediening | Apart apparaat, automatische gebeurtenissen en timer, handmatige observaties en scores. |
| Opnames | Aparte software, waarschijnlijk OBS. De webapp neemt zelf niets op. |

## 2. Vormgeving en deelnemersschermen

### Visuele basis

Gebruik een warme, rustige uitstraling. Neem de compositie en ronde vormen uit de Figma-homepage over, met de nodige aanpassingen voor meetbaar contrast en responsive gebruik. Bouw met normale documentflow, CSS Grid en Flexbox; neem de absolute Figma-coördinaten niet over als vaste pagina-indeling.

- Achtergrond onder relevante tekst: volledig dekkend `#FFF8F0`. Basistekst: `#776F67`. Hoog tekstcontrast: `#493B32`. De methode noemt daarvoor circa 4,69:1 en 10,20:1; controleer de werkelijke combinaties, ook in geselecteerde en ingedrukte toestanden.
- Gebruik de Figma-foto op de homepage rondom een dekkend crème inhoudsvlak. Geen transparante laag direct achter gemeten tekst: daardoor zou het contrast met de foto variëren. Boekingsschermen krijgen een rustige effen achtergrond.
- Download bij de implementatie de oorspronkelijke foto uit Figma en sla die lokaal met bronverwijzing op. Assetlinks uit de koppeling verlopen. Gebruik geen willekeurige vervangende stockfoto. Exporteer de gebruikte Figma-iconen of gebruik tekstlabels als een icoon niet nodig is.
- Hoofdpaneel maximaal 1120 px breed, boekingsinhoud maximaal 720 px, kalender maximaal 448 px. Buitenmarges 16 px mobiel en 32 px desktop. Vanaf 768 px geldt desktopindeling; onderzoeksgroep wordt apart opgeslagen en niet uit de breedte afgeleid.
- Gebruik een 8-px ruimteraster, 24 px tussen secties, 12 px tussen keuzeopties, 24 px paneelradius en 16 px kaartradius. Knoppen hebben minimaal 56 px hoogte; datumcellen minimaal 40 bij 48 px bij normale tekstvergroting. Reserveer dezelfde ruimte voor A en B binnen een losse vergelijking.
- Selecties krijgen een zichtbare rand en vinkje of radiomarkering. Houd tekstachtergronden in de losse contrastvergelijking crème. Gebruik geen donkere selectieachtergrond die de opgegeven tekstcontrasten vervangt.
- Alle bediening heeft duidelijke Nederlandse labels, zichtbare toetsenbordfocus en voldoende tussenruimte. Geen functies die alleen via hover beschikbaar zijn. Gebruik echte buttons, radio-inputs en semantische koppen.
- Alle assets, fonts, scripts en styles worden lokaal geserveerd. De sessie vereist geen internetverbinding.

In de vier losse vergelijkingen en volledig A hebben hoofdacties een duidelijke omranding met crème binnenvlak. Alleen volledig B krijgt extra actiehiërarchie: een donkerbruine hoofdknop met crème tekst en een sterker gegroepeerde samenvatting. Leg deze uitzondering op de tekstkleur vast in de variantconfiguratie. Gebruik voor alle B-versies niet automatisch deze knopstijl, want dat zou de losse experimenten veranderen.

### Typografie

Lever Noto Sans als lokaal WOFF2-webfont mee, met de licentietekst. Gebruik 400 voor lopende tekst, 600 voor bediening en 700 voor koppen en kerngegevens. Wacht vóór de start van een taak tot font en homepagefoto geladen zijn. Blokkeer de start bij een fontfout; een onopgemerkte fallback maakt de meting onvergelijkbaar.

| Rol | Kleine schaal | Grote schaal, uitsluitend volledig B |
| --- | --- | --- |
| Hoofdkop desktop | 32 px / 40 px | 48 px / 60 px |
| Hoofdkop mobiel | 24 px / 32 px | 36 px / 48 px |
| Sectiekop | 24 px / 32 px | 36 px / 48 px |
| Subkop | 20 px / 28 px | 30 px / 42 px |
| Instructie, opties, knoppen, afspraakgegevens | 16 px / 24 px | 24 px / 36 px |

In de losse tekstvergelijking veranderen uitsluitend de relevante instructies, optielabels, kalendergetallen en -labels, Menu, Terug, Verder, bevestigingsbediening en afspraakgegevens van 16/24 naar 24/36. Koprollen blijven daar gelijk aan A. Neem alle taakrelevante tekst op in één expliciete lijst van typografische rollen; vergeet ook de homepageacties en de pagina Uw gegevens niet.

Gebruik rem voor tekstmaten met een basis van 16 CSS-pixels. De onderzoeker kan vóór een sessie tekstvergroting van 100%, 125%, 150% of 200% instellen. Pas dezelfde factor toe op alle tekstrollen in alle tien taken; de verhouding 16:24 blijft 1:1,5. Laat containers bij noodzakelijke tekstterugloop groeien en log scrollen. Verklein tekst nooit automatisch om een vaste hoogte te halen. Browserzoom en systeeminstellingen worden apart handmatig vastgelegd en niet tijdens de sessie veranderd.

### Route en gedrag

1. Homepage: naam Fysiotherapie Valkenswaard, foto en de acties Afspraak maken en Uw gegevens. Toon consequent een bescheiden label dat dit een fictieve oefenomgeving is. De homepage heeft geen behandelingsoverzicht of marketingblokken. Beide acties zijn in alle varianten zichtbaar; de menuvariatie begint in de boekingsroute.
2. Uw gegevens: vaste fictieve identiteit, bijvoorbeeld Alex Voorbeeld, met expliciet fictieve gegevens en Terug naar start. Geen echte naam, adres, BSN, patiëntinformatie, login of invoer. Het openen is een geregistreerde omweg. Bij terugkeer zijn eventueel gemaakte keuzes bewaard.
3. Dienst kiezen: Intake, Behandeling en Oefentherapie. Eén selecteerbare kaart per dienst. Geen therapeutenkeuze, vragen over klachten, prijzen of betalingen.
4. Datum kiezen: Nederlandse maandkalender, maandag als eerste weekdag, vaste zes rijen. Vier selecteerbare datums per taak, overige dagen herkenbaar niet beschikbaar. Een geselecteerde datum verschijnt ook voluit onder de kalender. Geen verplichte invoer met het toetsenbord.
5. Tijd kiezen: vier keuzes, 09.00, 10.30, 13.00 en 14.30 uur, in een raster van twee kolommen. Elke aangeboden combinatie van dienst, beschikbare datum en tijd is uitvoerbaar.
6. Controleren: toon gekozen dienst, volledige datum en tijd met bij elk onderdeel een Wijzigen-actie. Wijzigen brengt de deelnemer naar dat onderdeel, bewaart overige keuzes en keert na Verder terug naar Controleren. Een gewone Terug-actie volgt de oorspronkelijke stappenroute.
7. Bevestiging: permanente melding Afspraak geboekt met de daadwerkelijk gekozen gegevens en Afspraak wijzigen. De bevestiging onthult niet of de onderzoeksopdracht correct is uitgevoerd. Afspraak wijzigen opent Controleren en behoudt de gegevens.

De maandkalender gebruikt één vaste fictieve boekingsmaand uit de scenario's. Toon maand en jaar, zonder niet-functionele pijlen naar maanden buiten het prototype. Geen automatische markering van vandaag en geen afhankelijkheid van de echte systeemdatum. Toetsenbordbediening ondersteunt focus op datums, pijltjestoetsen en Enter/Spatie. Selecteerbare verkeerde datums werken even goed als de juiste.

Verder controleert alleen of een vereiste keuze aanwezig is. Bij een ontbrekende keuze verschijnt een neutrale instructie zoals Kies een datum. De app vergelijkt keuzes voor de registratie met het taakdoel, maar geeft de deelnemer geen aanwijzing dat een geselecteerde optie verkeerd is. Terug en Wijzigen bewaren geldige keuzes; de opties veranderen niet afhankelijk van eerdere selecties.

### Menu en bevestigingsbediening

In de verborgen variant staat onder het keuzegebied een Menu-knop. Deze opent zonder animatie een gereserveerd navigatievak met Terug en Verder. In de zichtbare variant staan dezelfde twee knoppen direct in dat vak, met dezelfde volgorde en afmetingen. Reserveer in beide varianten dezelfde ruimte zodat het openen de keuzes erboven niet verplaatst. Sluit het verborgen menu na elke stapovergang. Verder gaat uitsluitend naar de volgende stap, Terug naar de vorige; vanaf Dienst gaat Terug naar Home.

Op Controleren staat Afspraak bevestigen in alle varianten direct zichtbaar als boekingsactie. Terug blijft daar onder de gekozen navigatieregel vallen. De eerste homepageactie, de wijziglinks en Afspraak wijzigen zijn geen alternatieve Verder-knoppen. Toon tijdens de boekingsstappen een eenvoudige niet-klikbare stapaanduiding. Herhaal daar geen headerlinks die een extra route naar volgende stappen creëren.

Laat Afspraak bevestigen op dezelfde plek aanwezig wanneer de bevestiging verschijnt. Herhaalde activaties worden geregistreerd en zijn idempotent: geen tweede boeking en geen herstart van de animatie of termijnen. Afspraak wijzigen is de expliciete weg terug naar de controlepagina. Zo kunnen herhaald bevestigen en onzekerheid worden geobserveerd zonder nepknoppen.

## 3. Experimentele varianten en taakinhoud

### Variantmatrix

Maak één gedeelde boekingsimplementatie die een onveranderlijke `VariantConfig` krijgt. Maak geen tien los gekopieerde schermreeksen. A is in ieder taakpaar hetzelfde basisontwerp; taakinhoud en volgorde zijn afzonderlijke configuratie.

| Taakpaar | Variant A | Variant B | Blijft gelijk |
| --- | --- | --- | --- |
| 1 Tekst | Relevante tekst 16/24 | Relevante tekst 24/36 | Kleine koprollen, verborgen menu, basistekstcontrast, geen animatie, afmetingen en posities voor zover tekstterugloop dat toelaat |
| 2 Navigatie | Terug en Verder achter Menu | Terug en Verder direct zichtbaar | 16/24, basistekstcontrast, geen animatie, labels, volgorde en boekingsstappen |
| 3 Contrast | Tekst #776F67 op #FFF8F0 | Tekst #493B32 op #FFF8F0 | 16/24, verborgen menu, geen animatie, achtergronden en geometrie |
| 4 Animatie | Bevestiging direct zonder beweging | Zelfde bevestiging met 250 ms verschuiving en vervaging | 16/24, verborgen menu, basistekstcontrast, tekst en eindpositie |
| 5 Volledig | Kleine schaal, verborgen menu, basiscontrast, geen animatie | Grote schaal, zichtbare navigatie, hoog contrast, bevestigingsanimatie, nadrukkelijker hoofdactie en groepering | Scenario-opbouw, functies, aangeboden aantallen en einddoel |

Voor de animatie: opacity van 0 naar 1 en translateY van 8 naar 0 px, duur 250 ms, `cubic-bezier(0, 0, 0.58, 1)`, delay 0. Alleen het bevestigingsblok animeert. Reserveer vooraf de eindruimte; geen verschuiving van omliggende bediening. Geen andere transities, hoveranimaties, page transitions, smooth scrolling, ripples, laadwachttijden of confetti in de testschermen.

Respecteer `prefers-reduced-motion` en een vooraf gekozen bewegingsbeperking. Bij beperking verschijnt ook de toegewezen animatievariant zonder beweging. Bewaar zowel toegewezen als werkelijk gebruikte instelling. Markeer dit als protocolafwijking; gebruik zo'n paar niet als geldige vergelijking van wel/geen animatie. Andere uitkomsten blijven beschikbaar met die context. Dwing beweging niet af om een meting compleet te krijgen.

### Scenario's

Elke deelnemer krijgt tien boekingen: X en Y voor elk van de vijf taakparen. Onderstaande fictieve gegevens zijn implementatiedefaults, geen empirisch bepaalde optimale taken. Ze mogen na de proeftest in één nieuwe protocolversie worden herzien en blijven vervolgens gedurende de hoofdmeting vast.

Alle scenario's tonen dezelfde drie diensten en vier tijden. X en Y van hetzelfde paar tonen dezelfde vier beschikbare datums, met een andere doelcombinatie. Zo verschilt het aantal opties niet tussen A en B. Er zijn geen voorselecties. Gebruik vaste ISO-datums en Nederlandse weergave, zonder UTC-conversie die een datum kan verschuiven.

| Paar | Vier beschikbare datums in oktober 2026 | Opdracht X | Opdracht Y |
| --- | --- | --- | --- |
| 1 Tekst | 5, 6, 7, 8 | Intake, 6 oktober, 10.30 uur | Behandeling, 8 oktober, 13.00 uur |
| 2 Navigatie | 12, 13, 14, 15 | Behandeling, 12 oktober, 14.30 uur | Oefentherapie, 14 oktober, 09.00 uur |
| 3 Contrast | 19, 20, 21, 22 | Oefentherapie, 22 oktober, 13.00 uur | Intake, 20 oktober, 10.30 uur |
| 4 Animatie | 26, 27, 28, 29 | Intake, 28 oktober, 09.00 uur | Behandeling, 26 oktober, 14.30 uur |
| 5 Volledig | 2, 9, 16, 23 | Behandeling, 9 oktober, 10.30 uur | Oefentherapie, 23 oktober, 13.00 uur |

Gebruik steeds de instructie: Maak een afspraak voor [dienst] op [weekdag en datum] om [tijd]. De onderzoeker leest dit voor. Lever vanuit het paneel een printweergave met één opdracht per kaart, in vaste grote tekst. De kaart blijft tijdens de taak naast het apparaat liggen. Zet het onderzoeksdoel niet als extra antwoordhulp in de boekingsinterface.

### Vooraf vastgelegde volgorde

Standaardrooster: D01 tot en met D13 smartphone; D14 tot en met D25 desktop. De onderzoekers mogen de apparaatindeling vóór het vastzetten aanpassen op basis van ervaring. Gebruik de inclusievragen uit §4.2 en leg afwijzingen apart vast. Demodeelnemers en de twee of drie proefpersonen komen niet in de hoofdmeting.

Genereer het rooster deterministisch per apparaatgroep. Nummer deelnemers daar vanaf `i = 0`; het taakpaar heeft index `k = 0..4`.

- Taakpaarvolgorde is de cyclische rotatie met beginindex `i mod 5`: 1-2-3-4-5, 2-3-4-5-1 enzovoort.
- De combinatie voor taakpaar k is `(i + k) mod 4`: 0 = A-X gevolgd door B-Y; 1 = B-Y gevolgd door A-X; 2 = A-Y gevolgd door B-X; 3 = B-X gevolgd door A-Y.
- De indices horen bij het vaste rooster, ook bij afzegging of uitval. Herverdeel begonnen of afgeronde sessies niet.
- Controleer per apparaatgroep de verdeling van rotaties en de vier combinaties per paar; aantallen verschillen maximaal één bij een volledig rooster van 13 of 12.
- Laat onderzoekers het volledige rooster bekijken en exporteren vóór de hoofdmeting. Sla de tien concrete trials per deelnemer op; genereer niets opnieuw bij refresh.

Na het tweede en vierde uitgevoerde paar volgt in het onderzoekspaneel een pauzevoorstel van ongeveer twee minuten. Extra pauzes kunnen tussen taken. Onderbreek een lopende officiële tijdmeting niet stilzwijgend; leg een wezenlijke onderbreking als afwijking vast.

## 4. Meting en onderzoekspaneel

### Sessieverloop

Het paneel heeft een deelnemersoverzicht, sessievoorbereiding, live taakweergave en review/export. Tijdens een boeking ziet de deelnemer alleen de praktijkinterface. Verberg A/B, hypothesen, doeljuistheid, timer, foutentellers en onderzoekersbediening.

Voorbereiding registreert deelnemercode, leeftijd, gebruiksfrequentie, ervaring met apparaat en online afspraken, bril/hulpmiddelen, tekstvergroting, browser/viewport en gerapporteerde systeeminstellingen. Leg toestemming voor deelname, schermopname en gezicht/geluid afzonderlijk vast. Geen naam of toestemmingsformulier in de app. Deelname vereist toestemming; ontbrekende opnametoestemming blokkeert deelname niet.

Een onderzoeker koppelt het testapparaat met een eenmalige code of QR-link en controleert de verbinding. Eén testsessie heeft één actief deelnemersapparaat. De app controleert dat fonts en assets geladen zijn, de juiste trial gereedstaat en de pagina zichtbaar is. De onderzoeker leest de opdracht voor en start daarna de taak. De deelnemersclient verwijdert het wachtscherm en start de monotone klok zodra het homescherm voor de taak wordt getoond. Het paneel toont de startbevestiging en een synchronisatiemarker voor vergelijking met OBS; een servercommando dat nog niet op het testapparaat is uitgevoerd start geen meting.

Na een taak stelt de onderzoeker de twee schaalvragen mondeling en voert de antwoorden in. De scores hebben geen vooraf gekozen waarde. Een geweigerd of ontbrekend antwoord blijft leeg met reden. Pas na afronden van de registratie start de onderzoeker de volgende taak; reset dan alle boekingskeuzes, het menu, scrollpositie en lokale timers.

### Taakduur en eindtoestanden

- Maximaal 180.000 ms vanaf de start op het deelnemersapparaat. Meet met `performance.now()`; gebruik geen teller van intervalticks als bron van waarheid. Registreer daarnaast UTC-tijdstippen voor koppeling met opnames.
- Een taak slaagt zelfstandig wanneer de juiste dienst, datum en tijd bevestigd zijn en de bevestiging wordt getoond, binnen de termijn en zonder inhoudelijke hulp. Zelfherstelde fouten zijn toegestaan.
- Leg zowel de bevestigingsactivatie als het eerste render-moment van de bevestiging vast. Gebruik het begin van de zichtbare feedback als einde van de boekingstijd; wacht niet op het einde van de animatie van 250 ms.
- De eerste verkeerde bevestiging start één hersteltermijn: `min(taakstart + 180000, eersteVerkeerdeBevestiging + 15000)`. De deadline wordt niet verlengd door Wijzigen, een herhaalde klik of een volgende verkeerde bevestiging.
- Binnen die hersteltermijn moet de juiste afspraak volledig opnieuw bevestigd en getoond zijn. Alleen op Wijzigen klikken is onvoldoende. Dezelfde generieke bevestiging en wijzigmogelijkheid verschijnen bij juiste en onjuiste boekingen; toon geen foutmelding over het onderzoeksdoel en geen aftelklok.
- Een correcte voltooiing exact op de deadline geldt als op tijd. Beoordeel de tijdstempel van de lokale gebeurtenis, niet de netwerkontvangst of de uitvoervolgorde van een timeout-callback.
- Na succes blijft de bevestiging staan voor observatie. De boekingstijd staat vast. Het paneel heeft Deelnemer herkent bevestiging; sla het observatietijdstip en het verschil tot de bevestiging apart op. Dit is een handmatige maat met reactietijd van de onderzoeker. Ondersteun achteraf correctie vanaf de opname met behoud van het oorspronkelijke tijdstip en reden.
- Herhaalde bevestigingen na succes blijven als gebeurtenissen beschikbaar, met een aparte telling voor deze observatiefase. Ze veranderen het al vastgelegde resultaat niet. De onderzoeker sluit de observatiefase voordat de vragen volgen; als herkenning niet is waargenomen blijft die maat ontbrekend.
- Geldige stopredenen zijn succes, opgeven, inhoudelijke hulp, algemene tijdgrens of verlopen hersteltermijn. Een technisch defect of wezenlijke externe onderbreking levert een ongeldige/ontbrekende meting op, niet een mislukking van de deelnemer.
- Bij herlezen van de opdracht loopt de tijd door. Een hulpvraag wordt gelogd, maar is pas een stopreden als inhoudelijke hulp wordt gegeven of de deelnemer niet verder kan/wil.
- Bij uitval blijven eerdere taken bewaard voor zover daarvoor toestemming blijft bestaan. Maak geen ingevulde resultaatrijen voor niet uitgevoerde taken.

Bij het verlopen van een termijn verschijnt een neutrale eindmelding dat deze opdracht is afgelopen. De onderzoeker krijgt de reden te zien en stelt ook na mislukking de twee schaalvragen. Een officiële ongeldige taak wordt niet meteen herhaald; gebruik demo's om technische problemen te onderzoeken.

### Fouten en observaties

Sla ruwe acties op en leid daar transparante foutcodes uit af. Tel één verkeerde keuze per echte activatie, niet per React-render of netwerkherhaling. Een verkeerde selectie en een daaropvolgende onterechte bevestiging zijn afzonderlijke fouten zoals in de methode. Bewaar de categorieën zodat onderzoekers dubbeltellingen inhoudelijk kunnen beoordelen.

| Code | Definitie |
| --- | --- |
| F_SERVICE | Deelnemer activeert een dienst die afwijkt van de opdracht. |
| F_DATE | Deelnemer activeert een beschikbare datum die afwijkt van de opdracht. |
| F_TIME | Deelnemer activeert een tijd die afwijkt van de opdracht. |
| F_STEP | Opening van Uw gegevens of een door de onderzoeker vastgestelde verkeerde stap; geef de concrete actie en toelichting. |
| F_CONFIRM | Bevestiging van een complete maar verkeerde combinatie. |
| F_REPEAT_CONFIRM | Opnieuw activeren van een al uitgevoerde bevestiging zonder wijziging van de boekingsgegevens. |

Het openen van Menu, scrollen, een correctie via Terug/Wijzigen en een toegestane alternatieve route tellen niet als fout. Een poging om Verder te gaan zonder selectie krijgt een aparte gebeurtenis voor validatie, zonder automatische foutcode. Noteer pogingen op niet-beschikbare kalenderdagen apart als die waarneembaar zijn, zonder ze bij beschikbare verkeerde datumkeuzes op te tellen. Zelfcorrecties, hulpvragen, scrollgedrag en opmerkingen zijn aparte velden/gebeurtenissen.

Een live actielijst toont scherm, selecties en gebeurtenissen aan de onderzoeker. Bouw geen video-stream of schermopnamefunctie. De onderzoeker kan codes en observaties achteraf corrigeren; bewaar originele automatische waarden, definitieve codes, wijzigreden en tijdstip. Ondersteun twee onafhankelijke coderingssets voor vijf geselecteerde sessies plus een gezamenlijke definitieve beoordeling, volgens §4.6.

De exacte vragen zijn:

- Hoeveel frustratie of ergernis voelde u tijdens deze opdracht?
- Hoe onzeker voelde u zich over wat u moest doen of over of het gelukt was?

Beide gebruiken 1 = helemaal niet, 2 = weinig, 3 = matig, 4 = veel, 5 = heel veel. Bewaar ze afzonderlijk. Maak geen samengestelde toegankelijkheidsscore en leid emoties niet automatisch af uit gezicht, tijd of foutentelling.

## 5. Technische uitvoering en gegevens

### Stack en indeling

Gebruik React met TypeScript strict en Vite, Tailwind CSS 4 via `@tailwindcss/vite`, en een lokale Node.js 24 LTS-server in TypeScript. Gebruik Express voor HTTP, Socket.IO voor de verbinding tussen paneel en deelnemer en SQLite via `node:sqlite` voor opslag. Gebruik npm met één lockfile. Zet concrete compatibele versies vast bij de eerste implementatie en verander die niet tijdens de hoofdmeting.

Deze keuze houdt de deelnemersflow en live onderzoeksbediening in één codebasis. Een SSR-framework, externe database, accountdienst of volledige Material-componentbibliotheek is niet nodig. Bouw de beperkte set UI-componenten zelf met semantische HTML, zodat bibliotheekdefaults geen ongewenste animaties of stijlen invoeren.

Werk met `src/participant`, `src/researcher`, `src/shared`, `server` en `tests`. Scheid boekingslogica, protocolconfiguratie, gebeurtenisregistratie en presentatie. Gebruik gedeelde TypeScript-types en runtimevalidatie met Zod voor netwerk- en importgegevens. Laat de React-flow werken via een reducer met expliciete toestanden; opgeslagen logica hoort niet in losse component-effects.

De server serveert na build de app en API op dezelfde origin, standaard poort 4310. `npm run dev` start client en server voor ontwikkeling; `npm run build`, `npm run typecheck`, `npm run test`, `npm run test:e2e` en `npm start` moeten gedocumenteerd en uitvoerbaar zijn. Hoofdmetingen gebruiken de gebouwde app met `npm start`, zonder hot reload.

### Routes en contracten

- `/onderzoek`: uitsluitend het onderzoekspaneel. Alleen bereikbaar met een onderzoekerssessie.
- `/deelnemer`: koppelen met een eenmalige code; daarna de door de onderzoeker ingestelde taak. Geen vrije variantkeuze.
- `/demo`: afzonderlijke demo zonder echte onderzoeksdata, met keuzemogelijkheid voor elk paar, A/B en X/Y. Alleen vanuit het onderzoekerspaneel beschikbaar. Hier worden controles en proeftaken uitgevoerd.
- `/print/opdrachten`: printbare opdrachtkaarten voor het vastgelegde rooster, alleen voor onderzoekers.

Gebruik REST onder `/api` voor protocolversies, deelnemers, sessies, beoordelingen en exports. Gebruik één Socket.IO-verbinding per client voor start/stopcommando's, status en gebeurtenissen. Commando's hebben een unieke `commandId`, een beoogde `trialId` en een verwachte statusversie; bevestig uitvoering door het deelnemersapparaat. Oude of dubbel ontvangen commando's mogen geen volgende trial beïnvloeden.

Leg minimaal deze gedeelde modellen vast:

| Model | Essentiële inhoud |
| --- | --- |
| ProtocolConfig | Versie, inhoudshash, variantmatrix, scenario's, volgorderegels, termijnen en status concept/bevroren. |
| VariantConfig | Paar, A/B, tekstmodus, navigatiemodus, tekstkleuren, animatieconfiguratie en volledige-ontwerphiërarchie. |
| Scenario | Paar, X/Y, beschikbare opties, correcte doelcombinatie en instructietekst. |
| Participant | Code, apparaatgroep, selectiegegevens, leeftijd, ervaring, toestemming en hulpmiddelen. |
| Session | Deelnemer, protocolversie, concrete reeks van tien trials, apparaatinstellingen, operator en sessiestatus. |
| Trial | Unieke ID, geplande positie, paar, variant, inhoud, status, feitelijke instellingen, begin/einde en resultaat. |
| TrialEvent | Unieke event-ID, trial-ID, oplopend clientvolgnummer, type, monotone tijd sinds start, UTC-correlatie, stap en gegevens. |
| TrialAssessment | Geldigheid per uitkomst, stopreden, hulp, frustratie, onzekerheid, herkenningstijd, observaties en coderingssets. |

Scheid deelnemerstatus van onderzoekersevaluatie. De deelnemersclient ontvangt uitsluitend de eigen actieve taakconfiguratie en de gegevens die nodig zijn voor de boeking. Het taakdoel en de toegewezen variant mogen daarin intern aanwezig zijn voor tijdkritische evaluatie; toon doeljuistheid, hypothesen en A/B-labels niet in de praktijkinterface. De leesbare opdracht staat op de aparte opdrachtkaart. Verzamelde deelnemersgegevens, beoordelingen en exports zijn uitsluitend voor de onderzoekersrol. De API vertrouwt niet op alleen het verbergen van knoppen: controleer rollen bij iedere mutatie en export.

### Live verbinding en herstel

De deelnemersclient voert de boekingsinteractie direct uit. Een tik hoeft niet op een netwerkrespons te wachten om feedback te krijgen. Gebruik een persistente uitgaande wachtrij in IndexedDB voor gebeurtenissen; de server bevestigt ontvangst na een SQLite-transactie. Verstuur onbevestigde gebeurtenissen opnieuw en dedupliceer op event-ID. Het clientvolgnummer maakt ontbrekende gebeurtenissen zichtbaar. Bewaar bij iedere gebeurtenis de laatste herstelbare boekingsstatus.

Een korte netwerkuitval laat de lokale timer en bediening doorlopen. Het paneel toont Verbinding onderbroken en blokkeert nieuwe startcommando's. Na herstel worden gebeurtenissen in volgorde verwerkt. Als alle gebeurtenissen en de monotone tijdlijn compleet zijn en de bediening niet is onderbroken, kan de meting geldig blijven met een verbindingsnotitie. Bij een reload van het deelnemersscherm, ontbrekende gebeurtenissen, een defect of een wezenlijke onderbreking markeert de onderzoeker de taak ongeldig. Hervat een onderbroken officiële taak niet met een nieuwe klok alsof niets is gebeurd.

Bij serverherstart blijven opgeslagen trials bestaan. Herstel verbindingen en bevestigde status zonder dubbele boekingen. Een tweede tab of tweede gekoppeld deelnemersapparaat krijgt geen schrijfrecht op dezelfde actieve trial. Een refresh van het onderzoekspaneel mag de deelnemerstaak niet stoppen. Sluit een trial pas definitief af wanneer de laatste gebeurtenissen bevestigd zijn of expliciet een ontbrekende registratie is vastgelegd.

### Lokale opslag en toegang

Onderzoeksdata horen buiten deze gesynchroniseerde PWS-map. Standaardlocatie op Windows: `%LOCALAPPDATA%\PWS-Prototype\data`, aanpasbaar via `PWS_DATA_DIR`. Bewaar de SQLite-database, back-ups en exports daar. De code, scenario's en fictieve testdata mogen in deze projectmap; echte deelnemersregistraties en opnames niet.

Genereer bij het starten een onderzoekerscode die op de laptopconsole staat. Gebruik die voor een onderzoekerssessie; log de code niet in de database. Een deelnemercode voor apparaatkoppeling verloopt na tien minuten, is eenmalig en geeft alleen toegang tot de betreffende sessie. Beperk de server tot het gekozen privénetwerk en gebruik geen publieke tunnel of cloudhosting. Wijzig de Windows-firewall niet automatisch; documenteer de benodigde lokale netwerktoegang voor de gebruiker. Verzamel geen medische gegevens, wachtwoorden of echte boekingen.

De app registreert alleen of OBS-opnames zijn toegestaan en gemaakt, met een optionele bestandsreferentie. Bewaar de opnames met de bestaande onderzoeksprocedure buiten cloudsynchronisatie. De methode noemt maximaal drie maanden na definitieve beoordeling voor herkenbare opnames en de naam-codekoppeling; maak geen automatische verwijderactie op basis van een onbekende beoordelingsdatum.

### Export en analyse

Lever een ZIP-export met UTF-8-BOM CSV-bestanden met puntkomma als scheiding en een JSON-back-up. Gebruik Excel-vriendelijke escaping en behandel vrije tekst die met een formuleteken begint veilig. Een ontbrekende waarde blijft leeg en krijgt waar nodig een reden; vul ontbrekende scores niet met nul.

- `deelnemers.csv`: achtergrondgegevens en apparaatgroep per code, zonder namen.
- `taken.csv`: één rij per daadwerkelijk gestarte taak, inclusief protocolversie/hash, paar, A/B, X/Y, geplande en feitelijke volgorde, apparaat, vergroting, werkelijke font/motion-instellingen, start/einde, duur, stopreden, succes, geldigheid, foutaantallen, scores en herkenningstijd.
- `gebeurtenissen.csv`: volledige gebeurtenissen met stabiele IDs en relatieve tijden.
- `beoordelingen.csv`: onafhankelijke beoordelingen, definitieve codes, observaties en correctieredenen.
- `rooster.csv`: alle geplande taken, inclusief nog niet uitgevoerde posities.
- `protocol.json` en `backup.json`: exacte configuratie en volledige herstelbare dataset met schemaversie. Import valideert het schema en mag bestaande metingen niet stil overschrijven.

De database bewaart ruwe tijd in milliseconden; exporteer ook duur in seconden. Maximaal 250 gestarte officiële taken bij 25 volledige deelnemers. Pilots krijgen een afzonderlijke registratiecategorie; demo's schrijven geen onderzoeksresultaten weg. Het paneel geeft voortgang, ontbrekende velden en exportstatus. De beschrijvende analyse gebeurt in Excel volgens §4.6: smartphone en desktop apart, gepaarde geldige waarnemingen per uitkomst, succes en ervaringsscores voorop, tijdvergelijking alleen bij twee zelfstandig geslaagde varianten. Bouw geen automatisch significantieoordeel of algemene rangorde van ontwerpkenmerken.

## 6. Bouwvolgorde en acceptatie

### Uitvoering door het bouwende model

1. Maak de React/TypeScript/Tailwind-app met lokale server, gedeelde types en versieerbare protocolconfiguratie. Leg dependencies vast en maak de startinstructies voor Windows.
2. Bouw de gedeelde deelnemersroute en lokale scenario's. Werk alle keuzes, terugroutes, wijzigingen en bevestigingen af voordat het onderzoeksrooster erop aangesloten wordt.
3. Implementeer en controleer de variantmatrix, inclusief typografie, contrast, menu en geïsoleerde bevestigingsanimatie. Gebruik de genoemde Figma-frames als visuele referentie.
4. Bouw het aparte onderzoekspaneel, apparaatkoppeling, rooster, tijdregistratie, gebeurtenissen, scores en exports. Verbind die met dezelfde boekingslogica; voorkom een aparte onderzoeksversie van de flow.
5. Voer onderstaande controles uit. Lever README, protocolaanvulling en een korte pilotchecklist op. Laat de hoofdmeting alleen met een expliciet bevroren protocolversie starten; een wijziging maakt een nieuwe versie.

De protocolaanvulling beschrijft alle wijzigingen uit §1, de menuwerking, scenario's, tijdgrenzen, foutcodes, herkenningsmeting en de rol van automatische registratie. Noteer dat een voordeel bij de volledige vergelijking door het pakket van aanpassingen kan ontstaan. Tijdens de hoofdmeting worden geen ontwerpwijzigingen op basis van tussentijdse resultaten doorgevoerd.

### Functionele en technische tests

Gebruik Vitest voor de protocol- en tijdlogica en Playwright voor de browserflows. Test de feitelijke risico's voor onderzoeksuitkomsten; tests die alleen dezelfde constante teruglezen zijn onvoldoende.

- Alle combinaties van vijf paren, A/B en X/Y boeken het correcte doel op mobiel en desktop. Iedere beschikbare verkeerde keuze werkt en kan via Controleren of Terug hersteld worden.
- Homepage en Uw gegevens horen bij de getimede route. Terugkeergedrag bewaart keuzes en levert geen extra start of reset op. Onvolledige invoer geeft neutrale feedback.
- Verborgen navigatie vraagt Menu per stap; zichtbare navigatie toont dezelfde acties. De losse vergelijking verandert geen labels, knopmaten of andere instellingen.
- Vergelijk screenshots en computed styles van A en B op hetzelfde scenario. In de vier losse paren verschillen uitsluitend de toegestane kenmerken en gedocumenteerde tekstterugloop. Controleer ook homepage, profiel, kalender, selectie, focus en bevestiging.
- Meet contrast op de werkelijk gerenderde achtergronden. Controleer tekstgroottes en regelhoogten, geladen Noto Sans en de uitzondering voor de donkere hoofdactie in volledig B.
- Animatie start zonder extra wachttijd, duurt 250 ms, eindigt op dezelfde positie en speelt niet opnieuw bij herhaald bevestigen. Reduce-motion wordt werkelijk toegepast en als afwijking geregistreerd.
- Test de grenzen rond 180 seconden en 15 seconden, correct boeken exact op de deadline, een verkeerde bevestiging laat in de taak, opnieuw verkeerd bevestigen en wijzigklikken die de deadline niet verlengen.
- Correcte boekingstijd stopt onafhankelijk van het einde van de animatie en het latere handmatige herkenningsmoment. Netwerkvertraging mag de lokale boekingstijd niet verlengen.
- Controleer het volledige rooster van 13 smartphone- en 12 desktopdeelnemers: tien unieke trialposities per persoon, alle paren aanwezig, beide inhoudsversies en geldige balans. Refresh, uitval en opnieuw openen veranderen de reeks niet.
- Gebruik twee browsercontexten voor onderzoeker en deelnemer. Test roltoegang, een tweede deelnemerstab, dubbel startcommando, dubbele eventlevering, offline wachtrij, reconnect en serverherstart zonder dubbele resultaten.
- Een deelnemersrefresh tijdens de meting wordt zichtbaar als onderbreking, een onderzoekersrefresh laat de taak doorlopen. Ontbrekende gebeurtenissen leiden tot een expliciete ongeldigheidsstatus.
- Controleer CSV/JSON-export met Nederlandse tekens, puntkomma's, regeleinden, formuleachtige notities, ontbrekende antwoorden en gecorrigeerde codes. Test back-upherstel in een lege testdatabase.
- Bevestig dat tijdens een taak geen externe netwerkverzoeken nodig zijn en geen onderzoeksbestand in de gesynchroniseerde projectmap wordt geschreven.

### Visuele controle en proeftest

Controleer minimaal 360×800 en 390×844 op mobiel, en 1366×768 en 1440×900 op desktop. Test daarnaast 320 px breedte voor robuuste weergave. De kalender en navigatie mogen niet over tekst of bediening vallen. Bij tekstvergroting blijft de inhoud leesbaar; noodzakelijke terugloop wordt gedocumenteerd. Voorkom horizontaal scrollen behalve wanneer een uitzonderlijke vergroting dat aantoonbaar noodzakelijk maakt; ontwerp de kalender eerst met flexibele kolommen en minimale padding.

Test op echte iPhone/Safari, Android/Chrome en Windows/Chrome of Edge. Controleer vóór een sessie of de browser de gebruikte Tailwind/CSS-functies ondersteunt. Gebruik een ondersteund testapparaat als dat niet zo is; wissel niet stilzwijgend van layout of font. Controleer aanraking, muis, toetsenbord, zichtbare focus en tekstvergroting. Een geslaagde controle is geen claim van volledige toegankelijkheid voor alle hulpmiddelen.

Voer met twee of drie ouderen buiten de hoofdsteekproef de proeftest uit. Controleer begrijpelijkheid, taakduur, kalender, hersteltermijn, opnamesynchronisatie en of tien boekingen met vragen en pauzes binnen ongeveer 45–60 minuten passen. Bekijk ook of de dienstnamen en X/Y-opdrachten vergelijkbaar zijn. Verwerk noodzakelijke aanpassingen in protocol en methode voordat het hoofdrooster wordt bevroren.

De implementatie is gereed wanneer alle scenario's werken, de twee apparaten samen een volledige sessie kunnen uitvoeren, varianten aantoonbaar geïsoleerd zijn en een export de complete sessie met geldige en ontbrekende uitkomsten correct weergeeft. Lever een werkend lokaal startcommando, documentatie en de resultaten van de relevante tests op.

## 7. Grenzen en technische naslag

De toepassing bevat geen echte zorgverlening, patiëntportaal, agenda-integratie, accounts voor deelnemers, betaling, e-mail, cloudanalyse of automatische emotieherkenning. Schermlezeronderzoek valt buiten de beschreven PWS-methode; semantische bediening en toetsenbordgebruik blijven normale bouweisen. Wijzig Figma en de Word-bronbestanden alleen bij een afzonderlijke opdracht.

De precieze spacing, scenario's, technische libraries en opslagvorm in dit document zijn gekozen implementatiedefaults. De expliciet besproken gebruikerskeuzes en experimentele instellingen zijn bindend. Een bouwend model mag niet uit esthetische voorkeur alle varianten tegelijk toegankelijker maken of de basisvariant opzettelijk slechter maken dan hier beschreven.

Geraadpleegde technische en ontwerpbronnen op 23 september 2026:

- [Tailwind met Vite](https://tailwindcss.com/docs/installation/using-vite) en [browsercompatibiliteit](https://tailwindcss.com/docs/compatibility).
- [React-apps opzetten](https://react.dev/learn/creating-a-react-app) en [Vite-handleiding](https://vite.dev/guide/).
- [Node.js-releaseoverzicht](https://nodejs.org/en/about/previous-releases) en [SQLite-API](https://nodejs.org/api/sqlite.html). Gebruik de documentatie bij de vastgezette Node 24-versie voor concrete API-details.
- [Express installeren](https://expressjs.com/en/starter/installing/) en [Socket.IO delivery guarantees](https://socket.io/docs/v4/delivery-guarantees/). Reconnect alleen garandeert geen duurzame aflevering; daarom heeft dit plan acknowledgements, opslag en deduplicatie.
- [Noto-fontbronnen en licentie](https://github.com/notofonts/latin-greek-cyrillic).
- [Figma-overzicht van ontwerpsystemen](https://www.figma.com/resource-library/design-system-examples/) en [Google over Material 3 Expressive](https://design.google/library/design-notes-material-3-expressive-liam-spradlin).
- [W3C over animatie na interactie](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html).
