# PWS-prototype

## Lokaal starten

Voer in deze map `npm ci` en daarna `npm run dev` uit. Open het adres dat Vite toont. Voor een productievoorbeeld: `npm run build` en `npm run preview`. Gebruik voor directe links naar `/demo`, `/onderzoek` en `/informatie/...` de Vite-server; een eenvoudige statische bestandsserver geeft bij verversen van die routes een 404.

## Onderzoek en demo

Op `/` zet de onderzoeker met losse aan/uit-schakelaars tekstgrootte, navigatie, contrast, animatie en het laadscherm aan. Meerdere ontwerpkenmerken werken tegelijk. De aparte schakelaar **Alles** zet het volledige ontwerp aan of uit. Opdrachten zijn ook afzonderlijk te schakelen: boekingen X/Y/Z/W, informatieopdrachten I1-I4 en inloggen I5. Pas na **Start deelnemersscherm** verschijnt de praktijksite. In het onderzoekspaneel krijgt elke aangevinkte demo-opdracht een eigen link met de gekozen ontwerpkenmerken.

Het onderzoekspaneel staat op `/onderzoek` en toont een voorbeeldrooster van twaalf boekingen, twee informatieopdrachten en een inlogopdracht per deelnemer. Schermovergangen duren 1,4 seconde. Zonder laadschermschakelaar blijft de huidige pagina zichtbaar onder een witte waas; met de schakelaar verschijnt een skeleton in de vorm van de volgende pagina. De inlogopdracht gebruikt uitsluitend het fictieve adres `alex.voorbeeld@example.invalid`; er is geen echte account of e-mailverzending. Apparaatkoppeling, automatische registratie en export zijn in dit frontendprototype nog niet aangesloten. Gebruik de demo daarom nog niet voor de officiële dataverzameling.

De kalender is boekbaar op iedere werkdag van oktober 2026 tot en met maart 2027. Weekenden zijn uitgeschakeld. De zoekbalk in de header doorzoekt de informatiepagina’s. `npm test` controleert de datumregels, opdrachtvarianten en variantisolatie. Meer details staan in [INHOUD_EN_TESTROUTES.md](INHOUD_EN_TESTROUTES.md).

De bijgewerkte methode staat in [docs](docs/), in de versie met en zonder voorbeelden.
