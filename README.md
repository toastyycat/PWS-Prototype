# Toegankelijke afspraakwebsite voor ouderen (prototype)

Dit is het prototype uit een vwo-profielwerkstuk over toegankelijke websites voor ouderen: de website van een fictieve fysiotherapiepraktijk waarop je oefenafspraken boekt en informatie zoekt. Alle personen, locaties en afspraken zijn verzonnen. Er wordt niets opgeslagen of verstuurd.

Deze branch bevat alleen het prototype, zodat het als statische website online kan (bijvoorbeeld op Vercel).

## Instelscherm

Op `/` kies je welke kenmerken aan staan en welke opdracht klaarstaat. Daarna start je met **Start deelnemersscherm** de praktijksite.

| Kenmerk | Uit | Aan |
|---|---|---|
| Tekstgrootte | Belangrijke tekst 16 px, kleinere koppen | Belangrijke tekst 24 px, grotere koppen |
| Navigatie | Volgende en vorige stap achter een knop Menu | Volgende en vorige stap direct zichtbaar |
| Contrast | Grijsbruine tekst op crème (4,06:1) | Donkerbruine tekst op crème (10,2:1) |
| Animatie | Geen bewegingen | Scherm- en knopanimaties |
| Geduld bij laden | Huidige pagina blijft staan tijdens het laden | Skeletonscherm van de volgende pagina |

Elke schermovergang duurt 1,4 seconde, in alle varianten.

De instellingen kunnen ook in de link staan, zodat een opdracht met één tik klaarstaat:

| Parameter | Betekenis |
|---|---|
| `designs` | Kenmerken die aan staan: 1 tekstgrootte, 2 navigatie, 3 contrast, 4 animatie, 6 laden. Bijvoorbeeld `designs=2,3,4,6` is alles aan behalve tekstgrootte. |
| `opdrachten` | De opdracht: `X`, `Y`, `Z` of `W` (boekingen), `I1` tot en met `I4` (informatie zoeken) of `I5` (inloggen). |
| `inhoud` | Bij een boeking dezelfde letter als in `opdrachten`. |
| `info` | Bij een informatieopdracht dezelfde code als in `opdrachten`. |

Voorbeeld: `/?designs=2,3,4,6&opdrachten=X&inhoud=X`.

## Zelf starten

Je hebt [Node.js](https://nodejs.org/) 22.6 of nieuwer nodig.

```bash
npm ci
npm test
npm run build
npm run preview   # http://localhost:4310
```

## Online zetten op Vercel

Importeer de repository in Vercel en kies deze branch. `vercel.json` regelt de rest: Vercel bouwt met `npm run build` en serveert `dist/`. Alle adressen gaan naar de app, zodat ook `/informatie/...` werkt na herladen.

## Licentie

De broncode staat onder de [MIT-licentie](LICENSE). De afbeeldingen in `public/images/` zijn voor dit prototype gegenereerd.
