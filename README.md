# PWS-prototype

## Lokaal starten

Voer in deze map `npm ci`, `npm run build` en `npm run preview` uit. Open het adres dat Vite toont. Voor ontwikkeling met hot reload is er `npm run dev`. Gebruik voor directe links naar `/deelnemer`, `/demo`, `/onderzoek` en `/informatie/...` de Vite-server; een eenvoudige statische bestandsserver geeft bij verversen van die routes een 404 en kan de taakduren niet opslaan.

## Onderzoek en demo

Op `/` zet de onderzoeker met losse aan/uit-schakelaars tekstgrootte, navigatie, contrast, animatie en het laadscherm aan. Meerdere ontwerpkenmerken werken tegelijk. De aparte schakelaar **Alles** zet het volledige ontwerp aan of uit. Opdrachten zijn ook afzonderlijk te schakelen: boekingen X/Y/Z/W, informatieopdrachten I1-I4 en inloggen I5. Pas na **Start deelnemersscherm** verschijnt de praktijksite. In het onderzoekspaneel krijgt elke aangevinkte demo-opdracht een eigen link met de gekozen ontwerpkenmerken.

## Deelnemerscodes en taakduren

Open `/deelnemer` en voer een code van 1 tot en met 25 in (`1` en `D01` werken allebei). De app leest de taakvolgorde uit [deelnemers.csv](public/deelnemers.csv): 15 taken per deelnemer, met het testpaar, design A/B en de opdracht X/Y/Z/W of I1–I5. Na een correcte boekingsbevestiging of geslaagde oefenlogin opent de volgende taak automatisch. Bij een informatieopdracht drukt de deelnemer op **Ik heb het antwoord gevonden** op de doelpagina, zodat er tijd is om de pagina te lezen en het antwoord te geven. Een verkeerde boekingsbevestiging laat de deelnemer de afspraak wijzigen.

De duur loopt vanaf het verschijnen van het homescherm tot de voltooide taak. Na elke taak schrijft de lokale Vite-server één regel naar `data/taakduren.csv` met `deelnemerscode`, `taak` en `duur_seconden`. Bij een opslagfout blijft de taak staan met **Opnieuw proberen**. Bij opnieuw invoeren van dezelfde code hervat de app de eerste niet-opgeslagen taak. Download beide CSV-bestanden via `/onderzoek`; de taakduren zijn ook bereikbaar op `/api/taakduren.csv`. De map `data/` wordt niet aan Git toegevoegd. Gebruik `npm run roster` alleen als het roosteralgoritme verandert, en controleer de nieuwe CSV vóór gebruik.

Het onderzoekspaneel staat op `/onderzoek` en toont twaalf boekingen, twee informatieopdrachten en een inlogopdracht per deelnemer. Schermovergangen duren 1,4 seconde. Zonder laadschermschakelaar blijft de huidige pagina zichtbaar onder een witte waas; met de schakelaar verschijnt een skeleton in de vorm van de volgende pagina. De inlogopdracht gebruikt uitsluitend het fictieve adres `alex.voorbeeld@example.invalid`; er is geen echte account of e-mailverzending. De deelnemersroute registreert de taakduur; de uitgebreidere onderzoeksregistratie, toestemming en apparaatkoppeling in het paneel zijn nog voorbeeldschermen. Gebruik de demo daarom nog niet voor de officiële dataverzameling.

De kalender is boekbaar op iedere werkdag van oktober 2026 tot en met maart 2027. Weekenden zijn uitgeschakeld. De zoekbalk in de header doorzoekt de informatiepagina’s. `npm test` controleert de datumregels, opdrachtvarianten en variantisolatie. Meer details staan in [INHOUD_EN_TESTROUTES.md](INHOUD_EN_TESTROUTES.md).

De bijgewerkte methode staat in [docs](docs/), in de versie met en zonder voorbeelden.
