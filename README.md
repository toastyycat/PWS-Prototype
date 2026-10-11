# PWS-prototype

## Lokaal starten

Voer in deze map `npm ci`, `npm run build` en `npm run preview` uit. Open het adres dat Vite toont. Voor ontwikkeling met hot reload is er `npm run dev`. Gebruik voor directe links naar `/deelnemer`, `/demo`, `/onderzoek` en `/informatie/...` de Vite-server; een eenvoudige statische bestandsserver geeft bij verversen van die routes een 404 en kan de taakduren niet opslaan.

## Onderzoek en demo

Op `/` begint de onderzoeker met alle ontwerpkenmerken aan en zet voor een afzonderlijke test alleen het onderzochte kenmerk uit. De onderzoeker zet met losse aan/uit-schakelaars tekstgrootte, navigatie, contrast, animatie en het laadscherm aan. Meerdere ontwerpkenmerken werken tegelijk. **Animatie** bestuurt ook hoverfeedback, ingedrukte knopfeedback, kleurtransities en de bewegende glans van skeletonschermen. Uitgeschakeld verdwijnen deze tijdelijke buttonstates; gekozen opties, niet-beschikbare knoppen en toetsenbordfocus blijven zichtbaar. De aparte schakelaar **Alles** zet het volledige ontwerp aan of uit. Opdrachten zijn ook afzonderlijk te schakelen: boekingen X/Y/Z/W, informatieopdrachten I1-I4 en inloggen I5. Pas na **Start deelnemersscherm** verschijnt de praktijksite. In het onderzoekspaneel krijgt elke aangevinkte demo-opdracht een eigen link met de gekozen ontwerpkenmerken.

## Deelnemerscodes en taakduren

Open `/deelnemer` en voer een code van 1 tot en met 100 in (`1` en `D01` werken allebei). De app leest de taakvolgorde uit [deelnemers.csv](public/deelnemers.csv): 15 taken per deelnemer, met het testpaar, design A/B en de opdracht X/Y/Z/W of I1–I5. Na het opslaan van een voltooide taak verschijnt een startmenu met **Verder naar TXX**. Bij een informatieopdracht drukt de deelnemer op **Ik heb het antwoord gevonden** op de doelpagina, zodat er tijd is om de pagina te lezen en het antwoord te geven. Een verkeerde boekingsbevestiging laat de deelnemer de afspraak wijzigen.

De duur loopt vanaf het verschijnen van het homescherm tot de voltooide taak. Na elke taak schrijft de lokale Vite-server één regel naar `data/taakduren.csv` met `deelnemerscode`, `taak` en `duur_seconden`. Bij een opslagfout blijft de taak staan met **Opnieuw proberen**. Bij opnieuw invoeren van dezelfde code hervat de app de eerste niet-opgeslagen taak. Download beide CSV-bestanden via `/onderzoek`; de taakduren zijn ook bereikbaar op `/api/taakduren.csv`. De map `data/` wordt niet aan Git toegevoegd. Gebruik `npm run roster` alleen als het roosteralgoritme verandert, en controleer de nieuwe CSV vóór gebruik.

In de afzonderlijke A/B-paren (1, 2, 3, 4 en 6) staat in A alleen het onderzochte kenmerk uit; in B staan alle kenmerken aan. Paar 5 blijft alles uit tegenover alles aan. De hoofdactie behoudt bij de afzonderlijke tests dezelfde nadruk.

Het onderzoekspaneel staat op `/onderzoek` en toont twaalf boekingen, twee informatieopdrachten en een inlogopdracht per deelnemer. Schermovergangen duren 1,4 seconde. Zonder laadschermschakelaar blijft de huidige pagina onveranderd zichtbaar, zonder waas, blur of andere laadfeedback; met de schakelaar verschijnt een skeleton in de vorm van de volgende pagina. De inlogopdracht gebruikt uitsluitend het fictieve adres `alex.voorbeeld@example.invalid`; er is geen echte account of e-mailverzending. De deelnemersroute registreert de taakduur; de uitgebreidere onderzoeksregistratie, toestemming en apparaatkoppeling in het paneel zijn nog voorbeeldschermen. Gebruik de demo daarom nog niet voor de officiële dataverzameling.

De kalender is boekbaar op iedere werkdag van oktober 2026 tot en met maart 2027. Weekenden zijn uitgeschakeld. De zoekbalk in de header doorzoekt de informatiepagina’s. `npm test` controleert de datumregels, opdrachtvarianten en variantisolatie. Meer details staan in [INHOUD_EN_TESTROUTES.md](INHOUD_EN_TESTROUTES.md).

De bijgewerkte methode staat in [docs](docs/), in de versie met en zonder voorbeelden.
