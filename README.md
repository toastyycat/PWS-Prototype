# PWS-prototype

## Lokaal starten

Voer in deze map `npm ci` en daarna `npm run dev` uit. Open het adres dat Vite toont. Voor een productievoorbeeld: `npm run build` en `npm run preview`. Gebruik voor directe links naar `/demo`, `/onderzoek` en `/informatie/...` de Vite-server; een eenvoudige statische bestandsserver geeft bij verversen van die routes een 404.

## Onderzoek en demo

Op `/` kiest de onderzoeker met schakelknoppen een van de zes tests, variant A of B en boekingsopdracht X, Y, Z of W. Daarnaast zijn er vier informatieopdrachten I1 tot en met I4 en een inlogopdracht I5. Pas na **Start deelnemersscherm** verschijnt de praktijksite. De selectie blijft actief terwijl de deelnemer tussen pagina’s navigeert.

Het onderzoekspaneel staat op `/onderzoek` en toont een voorbeeldrooster van twaalf boekingen, twee informatieopdrachten en een inlogopdracht per deelnemer. Test 6 vergelijkt bij dezelfde wachttijd (1,4 seconde per schermovergang) een leeg laadscherm met een skeletonscherm. De inlogopdracht gebruikt uitsluitend het fictieve adres `alex.voorbeeld@example.invalid`; er is geen echte account of e-mailverzending. Apparaatkoppeling, automatische registratie en export zijn in dit frontendprototype nog niet aangesloten. Gebruik de demo daarom nog niet voor de officiële dataverzameling.

De kalender is boekbaar op iedere werkdag van oktober 2026 tot en met maart 2027. Weekenden zijn uitgeschakeld. De zoekbalk in de header doorzoekt de informatiepagina’s. `npm test` controleert de datumregels, opdrachtvarianten en variantisolatie. Meer details staan in [INHOUD_EN_TESTROUTES.md](INHOUD_EN_TESTROUTES.md).

De bijgewerkte methode staat in [docs](docs/), in de versie met en zonder voorbeelden.
