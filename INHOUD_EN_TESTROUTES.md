# Inhoud en testroutes

Voordat de praktijksite verschijnt, kiest de onderzoeker op het startscherm een test, A/B-variant en boekingsopdracht X/Y/Z/W of siteopdracht I1/I2/I3/I4. De opdrachttekst en, bij siteopdrachten, het verwachte antwoord staan uitsluitend op dat startscherm. Na **Start deelnemersscherm** verschijnt Home zonder onderzoeksinstellingen. De keuze blijft actief op alle deelnemerspagina’s. Voor een volgende oefenopdracht kan de onderzoeker de pagina opnieuw laden en een nieuwe combinatie kiezen. De URL bewaart de keuze als queryparameters.

Per deelnemer zijn tien boekingen en twee verkennende siteopdrachten gepland. De siteopdrachten staan na het tweede en vierde boekingspaar en tellen niet mee in de gepaarde A/B-uitkomsten. Het onderzoekspaneel toont een voorbeeldrooster en een demostarter; registratie en koppeling met een deelnemersapparaat zijn nog niet aangesloten.

De vier afzonderlijke tests zijn tekstgrootte, navigatie, contrast en bevestigingsanimatie. Daarnaast is er een vijfde totaalvergelijking van het basisontwerp met de gecombineerde aanpassingen. Iedere test heeft variant A en B; de boekingsroute blijft gedeeld. Er zijn vier verschillende doelafspraken per paar. Binnen één paar vallen de doeldata in dezelfde maand.

De kalender toont oktober 2026 tot en met maart 2027. Alle geldige maandagen tot en met vrijdagen zijn boekbaar; zaterdagen en zondagen zijn uitgeschakeld. Met de pijlen kan de deelnemer tussen maanden bladeren. De zes diensten en vier tijdstippen zijn op iedere boekbare dag beschikbaar.

De vier siteopdrachten zijn: informatie zoeken over energiemanagement, de voorbeeldlocatie vinden, vaststellen of een oefenafspraak echt is en achterhalen voor wie Bewegen in een groep bedoeld is. Hun doelpagina’s en verwachte antwoorden staan in `src/shared/protocol.ts`.

Deze fictieve praktijksite gebruikt een informatiehiërarchie met drie lagen:

1. **Home** met een directe knop *Afspraak maken*, vijf zorggebieden en praktische ingangen.
2. **Zorggebied** zoals Fysiotherapie, Ergotherapie, Psychologie, Logopedie of Bewegen & leefstijl.
3. **Specialisatie of onderwerp** zoals Manuele therapie, Energiemanagement, Stem of Oefentherapie.

Daarnaast zijn er dwarsverbindingen naar Expertisecentra, Vergoedingen, Tarieven en Over ons. Via het hoofdmenu, kruimelpad, verwante links en de footer kan een deelnemer op verschillende manieren door de inhoud bewegen. De boekingsflow blijft vanaf elke informatiepagina bereikbaar via *Afspraak maken*.

Elke informatiepagina heeft ook een direct adres in de vorm `/informatie/paginanaam`. De browserterugknop werkt tussen deze pagina’s.

## Voorbeelden van omwegen

- Home → Over ons → Werken bij → Ons team → Home.
- Home → Fysiotherapie → Manuele therapie → Nekcentrum → Expertisecentra.
- Home → Tarieven → Vergoeding fysiotherapie → Fysiotherapie.
- Home → Contact → Veelgestelde vragen → Privacy.
- Home → Nieuws → Ons team → Afspraak maken.
- Home → Bewegen & leefstijl → Bewegen in een groep → Veelgestelde vragen.

Deze routes zijn bewust geloofwaardig maar niet nodig om een oefenafspraak te boeken. De gewone boekingsstappen tonen geen informatiemenu, zodat de bestaande A/B-navigatie binnen de afspraakflow herkenbaar blijft.

## Opmerking voor de proefmeting

Het oudere onderzoeksplan beschreef een sobere homepage met alleen *Afspraak maken* en *Uw gegevens*. De uitgebreidere homepage en informatiestructuur zijn toegevoegd op verzoek van 24 september 2026. Daardoor zijn tijden en omwegen vanaf de homepage niet rechtstreeks vergelijkbaar met metingen uit de eerdere, sobere versie. Leg bij een gebruikstest vast welke versie en welke opdracht zijn gebruikt.

Alle inhoud, personen en locaties in de publieksinterface zijn fictief. De pagina’s over vergoedingen en tarieven geven bewust geen actuele bedragen of polisvoorwaarden.

## Beeldmateriaal

De negen afbeeldingen in `public/images/` zijn voor dit prototype gegenereerd met de ingebouwde imagegen-tool en worden lokaal geserveerd:

| Bestand | Opdracht |
| --- | --- |
| `therapie-hero.png` | Brede, realistische foto van een oudere patiënt en fysiotherapeut in een lichte behandelruimte, met ruimte links voor een tekstpaneel. |
| `bewegen.png` | Realistische foto van een oudere vrouw die onder begeleiding een balansoefening doet in een oefenruimte. |
| `praktijk.png` | Realistische foto van de receptie van een kleine fysiotherapiepraktijk met bezoeker en receptionist. |
| `ergotherapie.png` | Begeleiding bij dagelijkse handelingen in een thuissituatie. |
| `manuele-therapie.png` | Behandeling aan een schouder in een praktijkruimte. |
| `sportfysiotherapie.png` | Oefenen en bewegen in een sportieve behandelomgeving. |
| `gesprek-therapie.webp` | Gesprek tussen een behandelaar en een cliënt in een rustige behandelruimte, als beeld voor informatieve zorgpagina’s. |
| `dagelijks-bewegen.webp` | Een oudere persoon die een dagelijkse beweegoefening doet, als alternatief beeld voor beweeg- en oefentherapiepagina’s. |
| `groep-bewegen.webp` | Groep volwassenen die samen beweegt in een lichte oefenruimte, voor de groepsactiviteit. |

Voor alle negen golden de eisen: geen tekst, logo of watermerk, een warme rustige uitstraling en realistische personen.

### Vastgelegde prompts voor de eerste drie afbeeldingen

De afbeeldingen zijn gemaakt met de ingebouwde imagegen-tool. Voor de eerste drie afbeeldingen zijn dit de vastgelegde prompts. De drie latere beelden zijn gegenereerd voor een behandelgesprek, dagelijks bewegen en bewegen in een groep, telkens als realistische foto zonder tekst, logo of watermerk.

**`therapie-hero.png`**

```text
Use case: photorealistic-natural
Asset type: wide hero photograph for a fictional Dutch physiotherapy practice website
Primary request: a welcoming, realistic therapy moment with an older adult patient and a physiotherapist in a bright modern treatment room
Composition/framing: landscape wide editorial photograph; patient and therapist on the right half, calm uncluttered room on left for a cream text panel overlay; natural candid interaction, no posing at camera
Lighting/mood: soft daylight, warm neutral tones, trustworthy and calm
Constraints: adults only, no visible brand, no signage, no text, no watermark, no medical claims; realistic hands and faces
```

**`bewegen.png`**

```text
Use case: photorealistic-natural
Asset type: landscape content photograph for a fictional Dutch therapy practice website
Primary request: an older adult woman doing a supervised balance exercise with a physiotherapist in a bright exercise studio, both in modest everyday sports clothing
Composition/framing: candid mid-wide documentary photograph, people clearly visible, clean background, suitable for a website card
Lighting/mood: gentle natural daylight, calm and encouraging
Constraints: no text, no logos, no watermark, realistic anatomy and equipment
```

**`praktijk.png`**

```text
Use case: photorealistic-natural
Asset type: landscape content photograph for a fictional Dutch therapy practice website
Primary request: welcoming reception area of a small modern physiotherapy clinic in the Netherlands, with a receptionist talking with an older adult visitor; authentic, human-scale interior
Composition/framing: wide documentary photo, clear view of accessible reception and seating, no dominant signage
Lighting/mood: soft daylight, warm neutral colors, trustworthy and relaxed
Constraints: no text, no logos, no watermark, realistic faces and hands
```
