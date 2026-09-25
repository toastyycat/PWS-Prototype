# PWS-prototype

## Lokaal starten

Voer in deze map `npm ci` en daarna `npm run dev` uit. Open het adres dat Vite toont. Voor een productievoorbeeld: `npm run build` en `npm run preview`. Gebruik voor directe links naar `/demo`, `/onderzoek` en `/informatie/...` de Vite-server; een eenvoudige statische bestandsserver geeft bij verversen van die routes een 404.

## Onderzoek en demo

Op `/` kiest de onderzoeker eerst een van de vijf tests, variant A of B en boekingsopdracht X, Y, Z of W. Als alternatief zijn er vier verkennende siteopdrachten I1 tot en met I4. Pas na **Start deelnemersscherm** verschijnt de praktijksite. De selectie blijft actief terwijl de deelnemer tussen pagina’s navigeert.

Het onderzoekspaneel staat op `/onderzoek` en toont een voorbeeldrooster van tien boekingen en twee siteopdrachten per deelnemer. Apparaatkoppeling, automatische registratie en export zijn in dit frontendprototype nog niet aangesloten. Gebruik de demo daarom nog niet voor de officiële dataverzameling.

De kalender is boekbaar op iedere werkdag van oktober 2026 tot en met maart 2027. Weekenden zijn uitgeschakeld. `npm test` controleert de datumregels, opdrachtvarianten en variantisolatie. Meer details staan in [INHOUD_EN_TESTROUTES.md](INHOUD_EN_TESTROUTES.md).

De bijgewerkte methode staat in [docs](docs/), in de versie met en zonder voorbeelden.
