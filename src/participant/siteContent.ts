export interface SitePage {
  id: string;
  title: string;
  parent?: string;
  category: string;
  intro: string;
  image?: string;
  sections: { title: string; text: string }[];
  links?: string[];
}

export const sitePages: SitePage[] = [
  {
    id: 'fysiotherapie', title: 'Fysiotherapie', category: 'Zorgaanbod',
    intro: 'Bewegen gaat niet altijd vanzelf. In onze fictieve praktijk bekijken we samen welke begeleiding bij uw vraag past.',
    image: '/images/gesprek-therapie.webp',
    sections: [
      { title: 'Eerst kennismaken', text: 'Tijdens een intake bespreekt u wat u in het dagelijks leven wilt kunnen doen. Daarna kiest u samen een passende vervolgstap.' },
      { title: 'Behandeling en oefenen', text: 'Een afspraak kan bestaan uit uitleg, behandeling of oefeningen. De inhoud hangt af van uw situatie en uw doelen.' },
    ],
    links: ['manuele-therapie', 'sportfysiotherapie', 'geriatrie', 'oedeemtherapie', 'fysio-vergoeding'],
  },
  {
    id: 'manuele-therapie', title: 'Manuele therapie', parent: 'fysiotherapie', category: 'Specialisatie',
    intro: 'Een pagina over bewegen van gewrichten en de beperkingen die mensen daarbij kunnen ervaren.',
    image: '/images/gesprek-therapie.webp',
    sections: [
      { title: 'Waar gaat het over?', text: 'Soms voelt een beweging stijf of pijnlijk. Een therapeut luistert naar uw verhaal en onderzoekt welke bewegingen lastig zijn.' },
      { title: 'Een afspraak plannen', text: 'In dit prototype kunt u een fictieve afspraak voor manuele therapie kiezen. Er vindt geen echte behandeling plaats.' },
    ], links: ['fysiotherapie', 'nekcentrum', 'fysio-vergoeding'],
  },
  {
    id: 'sportfysiotherapie', title: 'Sportfysiotherapie', parent: 'fysiotherapie', category: 'Specialisatie',
    intro: 'Begeleiding bij het hervatten van sporten en bewegen na een blessure of een periode van rust.',
    image: '/images/groep-bewegen.webp',
    sections: [
      { title: 'Van dagelijks bewegen naar sport', text: 'De begeleiding kan beginnen bij gewone bewegingen en geleidelijk aansluiten op wat u graag weer wilt doen.' },
      { title: 'Wat neemt u mee?', text: 'Voor een kennismaking is het handig om te bedenken welke activiteit u mist en welke vragen u wilt stellen.' },
    ], links: ['fysiotherapie', 'sportcentrum', 'oefentherapie'],
  },
  {
    id: 'geriatrie', title: 'Fysiotherapie voor ouderen', parent: 'fysiotherapie', category: 'Specialisatie',
    intro: 'Aandacht voor veilig en prettig bewegen als dagelijkse activiteiten meer moeite kosten.',
    image: '/images/groep-bewegen.webp',
    sections: [
      { title: 'Uw eigen doelen', text: 'Het kan gaan om wandelen, opstaan, traplopen of een hobby. Uw persoonlijke doel is het vertrekpunt van het gesprek.' },
      { title: 'Rustig opbouwen', text: 'Een therapeut bespreekt met u welk tempo en welke oefeningen haalbaar voelen.' },
    ], links: ['fysiotherapie', 'ergotherapie', 'oefentherapie'],
  },
  {
    id: 'oedeemtherapie', title: 'Oedeemtherapie', parent: 'fysiotherapie', category: 'Specialisatie',
    intro: 'Meer informatie over begeleiding bij zwelling en de gevolgen daarvan voor bewegen.',
    sections: [
      { title: 'Een persoonlijk gesprek', text: 'Bij een eerste afspraak bespreekt u uw klachten en vragen. De therapeut legt uit welke mogelijkheden er zijn.' },
      { title: 'Praktisch', text: 'De details van een behandeling worden in dit onderzoeksprototype niet vastgelegd.' },
    ], links: ['fysiotherapie', 'oncologiecentrum', 'fysio-vergoeding'],
  },
  {
    id: 'ergotherapie', title: 'Ergotherapie', category: 'Zorgaanbod',
    intro: 'Ergotherapie kijkt naar dagelijkse handelingen: thuis, op het werk en onderweg.',
    image: '/images/dagelijks-bewegen.webp',
    sections: [
      { title: 'Dagelijks leven', text: 'Samen onderzoekt u welke activiteiten moeilijk gaan en wat daarin voor u het belangrijkst is.' },
      { title: 'Mogelijke begeleiding', text: 'Dat kan gaan over een andere werkwijze, verdeling van energie of het gebruik van hulpmiddelen.' },
    ], links: ['ouder-worden', 'energiemanagement', 'parkinson', 'ergo-vergoeding'],
  },
  {
    id: 'ouder-worden', title: 'Ouder worden', parent: 'ergotherapie', category: 'Specialisatie',
    intro: 'Blijven doen wat voor u belangrijk is, ook wanneer gewone handelingen veranderen.',
    sections: [
      { title: 'Zelfstandig blijven', text: 'In deze fictieve praktijk is er ruimte om te bespreken welke dagelijkse taken u zelf wilt blijven uitvoeren.' },
      { title: 'Kleine aanpassingen', text: 'Soms helpen een andere volgorde, meer rustmomenten of een eenvoudiger inrichting van een ruimte.' },
    ], links: ['ergotherapie', 'energiemanagement', 'geriatrie'],
  },
  {
    id: 'energiemanagement', title: 'Energiemanagement', parent: 'ergotherapie', category: 'Specialisatie',
    intro: 'Omgaan met de verdeling van activiteiten en rust gedurende de dag.',
    sections: [
      { title: 'Inzicht in uw dag', text: 'U kijkt samen met een therapeut naar momenten die veel energie vragen en naar wat u graag wilt behouden.' },
      { title: 'Een haalbaar ritme', text: 'Het doel is een indeling die aansluit bij uw eigen situatie en wensen.' },
    ], links: ['ergotherapie', 'ouder-worden', 'leefstijl'],
  },
  {
    id: 'parkinson', title: 'Parkinson en dagelijks handelen', parent: 'ergotherapie', category: 'Specialisatie',
    intro: 'Een overzicht van vragen over dagelijkse activiteiten bij de ziekte van Parkinson.',
    sections: [
      { title: 'Activiteiten bespreken', text: 'Denk aan aankleden, koken of zich verplaatsen. In een gesprek staat centraal wat voor u lastig is.' },
      { title: 'Samenhang van zorg', text: 'Verschillende disciplines kunnen bij één hulpvraag betrokken zijn. Dit prototype geeft alleen een voorbeeld van die structuur.' },
    ], links: ['ergotherapie', 'geriatrie', 'logopedie'],
  },
  {
    id: 'psychologie', title: 'Psychologie', category: 'Zorgaanbod',
    intro: 'Een rustige plek voor vragen over gedachten, gevoelens en gedrag.',
    sections: [
      { title: 'Kennismaking', text: 'Een eerste gesprek is bedoeld om uw vraag te verhelderen en de mogelijkheden te bespreken.' },
      { title: 'Vervolg', text: 'De informatie op deze oefensite is algemeen. Een echt behandeltraject vraagt altijd om persoonlijk overleg.' },
    ], links: ['angst', 'somberheid', 'stress', 'psychologie-vergoeding'],
  },
  {
    id: 'angst', title: 'Angst en spanning', parent: 'psychologie', category: 'Onderwerp',
    intro: 'Informatie over vragen rond angst en spanning in het dagelijks leven.',
    sections: [{ title: 'Wat kunt u bespreken?', text: 'U kunt vertellen wanneer spanning optreedt en wat dit voor uw dagelijkse activiteiten betekent.' }],
    links: ['psychologie', 'stress'],
  },
  {
    id: 'somberheid', title: 'Somberheid', parent: 'psychologie', category: 'Onderwerp',
    intro: 'Een pagina over stemming en de invloed daarvan op uw dag.',
    sections: [{ title: 'Eerste stap', text: 'Een kennismakingsgesprek kan helpen om uw vragen op een rij te zetten.' }],
    links: ['psychologie', 'angst'],
  },
  {
    id: 'stress', title: 'Stress en herstel', parent: 'psychologie', category: 'Onderwerp',
    intro: 'Vragen over spanning, drukte en het vinden van voldoende herstelmomenten.',
    sections: [{ title: 'Uw situatie', text: 'In een gesprek kunt u onderzoeken welke momenten spanning geven en welke steun u nodig heeft.' }],
    links: ['psychologie', 'energiemanagement'],
  },
  {
    id: 'logopedie', title: 'Logopedie', category: 'Zorgaanbod',
    intro: 'Informatie over communicatie, stem en slikken.',
    sections: [
      { title: 'Persoonlijke vragen', text: 'Een gesprek begint bij de situaties waarin spreken, verstaan, stemgebruik of slikken lastig is.' },
      { title: 'Verschillende onderwerpen', text: 'Via de pagina’s hieronder kunt u zien hoe een breed zorgaanbod in lagen is ingedeeld.' },
    ], links: ['spraak', 'stem', 'slikken', 'logopedie-vergoeding'],
  },
  {
    id: 'spraak', title: 'Spraak', parent: 'logopedie', category: 'Onderwerp',
    intro: 'Meer over verstaanbaar spreken en communicatie in alledaagse gesprekken.',
    sections: [{ title: 'In gesprek', text: 'U bespreekt in welke situaties spreken moeite kost en wat u graag wilt verbeteren.' }],
    links: ['logopedie', 'stem'],
  },
  {
    id: 'stem', title: 'Stem', parent: 'logopedie', category: 'Onderwerp',
    intro: 'Meer over stemgebruik op het werk, thuis en in gezelschap.',
    sections: [{ title: 'Uw stem in het dagelijks leven', text: 'Een logopedist kan met u bespreken wanneer uw stem minder goed meewerkt.' }],
    links: ['logopedie', 'spraak'],
  },
  {
    id: 'slikken', title: 'Slikken', parent: 'logopedie', category: 'Onderwerp',
    intro: 'Een informatiepagina over vragen rondom eten, drinken en slikken.',
    sections: [{ title: 'Bespreek uw vragen', text: 'De informatie hier is algemeen en vervangt geen persoonlijk advies van een zorgverlener.' }],
    links: ['logopedie', 'parkinson'],
  },
  {
    id: 'leefstijl', title: 'Gezondheid, bewegen en leefstijl', category: 'Zorgaanbod',
    intro: 'Een overzicht van laagdrempelige manieren om in beweging te blijven.',
    image: '/images/bewegen.png',
    sections: [
      { title: 'Bewegen op uw manier', text: 'De ene persoon wil sterker worden, de ander zoekt een vast beweegmoment. Hier vindt u verschillende onderwerpen.' },
      { title: 'Een passend begin', text: 'De pagina’s zijn bedoeld om het aanbod te verkennen. Boekingen in dit prototype gebruiken zes fictieve afspraaksoorten.' },
    ], links: ['oefentherapie', 'groepstraining', 'leefstijlcoaching'],
  },
  {
    id: 'oefentherapie', title: 'Oefentherapie', parent: 'leefstijl', category: 'Bewegen',
    intro: 'Onder begeleiding werken aan bewegen in het dagelijks leven.',
    image: '/images/bewegen.png',
    sections: [{ title: 'Oefenen met een doel', text: 'Welke beweging wilt u makkelijker kunnen doen? Vanuit dat doel kunnen oefeningen worden gekozen.' }],
    links: ['leefstijl', 'fysiotherapie', 'groepstraining'],
  },
  {
    id: 'groepstraining', title: 'Bewegen in een groep', parent: 'leefstijl', category: 'Bewegen',
    intro: 'Samen bewegen in een kleine groep kan een prettige stok achter de deur zijn.',
    image: '/images/groep-bewegen.webp',
    sections: [{ title: 'Voorbeeldprogramma', text: 'Deze voorbeeldactiviteit is bedoeld voor mensen die samen met anderen willen oefenen of bewegen. De oefenboeking bevat geen groepslessen.' }],
    links: ['leefstijl', 'oefentherapie'],
  },
  {
    id: 'leefstijlcoaching', title: 'Leefstijlcoaching', parent: 'leefstijl', category: 'Leefstijl',
    intro: 'Een gesprek over gewoontes, bewegen en haalbare stappen.',
    sections: [{ title: 'Kleine stappen', text: 'Een coach kan samen met u kijken wat past bij uw dagelijkse leven en welke verandering u wilt proberen.' }],
    links: ['leefstijl', 'energiemanagement'],
  },
  {
    id: 'expertisecentra', title: 'Expertisecentra', category: 'Extra zorg',
    intro: 'Sommige vragen krijgen op een praktijksite een aparte ingang naast de reguliere zorggebieden.',
    sections: [{ title: 'Waar vindt u wat?', text: 'Deze themapagina’s vormen een extra laag in de navigatie. Ze leiden terug naar het zorgaanbod of naar de oefenafspraak.' }],
    links: ['nekcentrum', 'sportcentrum', 'oncologiecentrum'],
  },
  {
    id: 'nekcentrum', title: 'Nekcentrum', parent: 'expertisecentra', category: 'Expertisecentrum',
    intro: 'Een themapagina voor vragen over nekklachten en bewegen.',
    sections: [{ title: 'Meerdere invalshoeken', text: 'Op een echte praktijksite kan een gespecialiseerd team uit verschillende disciplines bestaan. Hier is dit alleen voorbeeldinhoud.' }],
    links: ['expertisecentra', 'manuele-therapie'],
  },
  {
    id: 'sportcentrum', title: 'Sport en revalidatie', parent: 'expertisecentra', category: 'Expertisecentrum',
    intro: 'Een extra route voor bezoekers die informatie zoeken over terugkeer naar sport.',
    image: '/images/bewegen.png',
    sections: [{ title: 'Verkennen', text: 'Van hieruit kunt u door naar sportfysiotherapie of naar het algemene afspraakproces.' }],
    links: ['expertisecentra', 'sportfysiotherapie'],
  },
  {
    id: 'oncologiecentrum', title: 'Ondersteuning bij oncologie', parent: 'expertisecentra', category: 'Expertisecentrum',
    intro: 'Voorbeeld van een gespecialiseerde themapagina binnen een grotere praktijksite.',
    sections: [{ title: 'Samenhang', text: 'Bij een complexe hulpvraag kunnen meerdere disciplines betrokken zijn. De oefensite geeft geen persoonlijk zorgadvies.' }],
    links: ['expertisecentra', 'fysiotherapie', 'ergotherapie'],
  },
  {
    id: 'tarieven', title: 'Tarieven', category: 'Praktische informatie',
    intro: 'Op deze pagina zouden bezoekers tarieven en betaalinformatie verwachten.',
    sections: [
      { title: 'Geen echte kosten', text: 'Dit is een fictieve oefenomgeving. Een boeking in dit prototype is gratis en wordt nergens ingediend.' },
      { title: 'Vergoeding', text: 'Of zorg in werkelijkheid wordt vergoed, hangt af van uw situatie en polis. De voorbeeldpagina’s hieronder bevatten geen actuele verzekeringsinformatie.' },
    ], links: ['fysio-vergoeding', 'ergo-vergoeding', 'psychologie-vergoeding', 'logopedie-vergoeding'],
  },
  {
    id: 'fysio-vergoeding', title: 'Vergoeding fysiotherapie', parent: 'fysiotherapie', category: 'Praktische informatie',
    intro: 'Een voorbeeldpagina over de vergoeding van fysiotherapie.',
    sections: [{ title: 'Controleer uw eigen polis', text: 'Deze oefensite geeft geen actuele dekking of tarieven. Neem voor echte zorg contact op met uw verzekeraar en behandelaar.' }],
    links: ['tarieven', 'fysiotherapie'],
  },
  {
    id: 'ergo-vergoeding', title: 'Vergoeding ergotherapie', parent: 'ergotherapie', category: 'Praktische informatie',
    intro: 'Een voorbeeldpagina over vergoeding van ergotherapie.',
    sections: [{ title: 'Controleer uw eigen polis', text: 'Deze oefensite geeft geen actuele dekking of tarieven. Vraag bij echte zorg naar de voorwaarden die voor u gelden.' }],
    links: ['tarieven', 'ergotherapie'],
  },
  {
    id: 'psychologie-vergoeding', title: 'Vergoeding psychologie', parent: 'psychologie', category: 'Praktische informatie',
    intro: 'Een voorbeeldpagina over vergoeding van psychologische zorg.',
    sections: [{ title: 'Controleer uw eigen polis', text: 'Vergoeding kan van meerdere voorwaarden afhangen. Deze fictieve site toont geen actuele polisgegevens.' }],
    links: ['tarieven', 'psychologie'],
  },
  {
    id: 'logopedie-vergoeding', title: 'Vergoeding logopedie', parent: 'logopedie', category: 'Praktische informatie',
    intro: 'Een voorbeeldpagina over vergoeding van logopedie.',
    sections: [{ title: 'Controleer uw eigen polis', text: 'Deze oefensite geeft geen actuele dekking of tarieven. Vraag bij echte zorg naar de voorwaarden die voor u gelden.' }],
    links: ['tarieven', 'logopedie'],
  },
  {
    id: 'over-ons', title: 'Over de praktijk', category: 'Over ons',
    intro: 'Maak kennis met de fictieve praktijk achter dit onderzoeksprototype.',
    image: '/images/gesprek-therapie.webp',
    sections: [
      { title: 'Persoonlijke aandacht', text: 'De voorbeeldpraktijk brengt meerdere zorggebieden onder één dak. De teksten zijn geschreven voor het testen van navigatie en leesbaarheid.' },
      { title: 'Een oefenomgeving', text: 'Namen, locaties en afspraken op deze site zijn fictief. Er worden geen echte persoonsgegevens gevraagd.' },
    ], links: ['team', 'locaties', 'nieuws', 'werken-bij'],
  },
  {
    id: 'team', title: 'Ons team', parent: 'over-ons', category: 'Over ons',
    intro: 'Een teamoverzicht zoals bezoekers dat op een grotere praktijksite kunnen tegenkomen.',
    sections: [
      { title: 'Verschillende disciplines', text: 'Fysiotherapie, ergotherapie, psychologie en logopedie hebben elk een eigen plek in het zorgaanbod.' },
      { title: 'Fictieve profielen', text: 'Voor dit prototype zijn bewust geen echte medewerkers of portretgegevens gebruikt.' },
    ], links: ['over-ons', 'fysiotherapie', 'ergotherapie', 'logopedie'],
  },
  {
    id: 'locaties', title: 'Locaties', parent: 'over-ons', category: 'Over ons',
    intro: 'Bekijk waar een fictieve afspraak op deze oefensite zou plaatsvinden.',
    image: '/images/praktijk.png',
    sections: [
      { title: 'Valkenswaard centrum', text: 'Voorbeeldlocatie in Valkenswaard. Het adres is bewust weggelaten omdat hier geen echte behandelingen plaatsvinden.' },
      { title: 'Toegankelijkheid', text: 'Op een echte locatiepagina horen informatie over bereikbaarheid, parkeren en toegang bij de voorbereiding van een bezoek.' },
    ], links: ['over-ons', 'contact'],
  },
  {
    id: 'contact', title: 'Contact', category: 'Praktische informatie',
    intro: 'Heeft u een vraag over deze oefenpraktijk of zoekt u de weg naar het afspraakproces?',
    sections: [
      { title: 'Oefenafspraak', text: 'Gebruik de knop Afspraak maken om een fictieve afspraak te plannen. Het prototype verstuurt geen bericht of aanvraag.' },
      { title: 'Geen echte contactgegevens', text: 'Dit onderzoek toont bewust geen telefoonnummer of e-mailadres van een bestaande praktijk.' },
    ], links: ['locaties', 'veelgestelde-vragen', 'tarieven'],
  },
  {
    id: 'veelgestelde-vragen', title: 'Veelgestelde vragen', category: 'Praktische informatie',
    intro: 'Antwoorden op praktische vragen over het gebruik van deze oefensite.',
    sections: [
      { title: 'Is mijn afspraak echt?', text: 'Nee. De afspraak bestaat alleen binnen het onderzoeksprototype.' },
      { title: 'Moet ik gegevens invoeren?', text: 'Nee. De pagina Uw gegevens toont uitsluitend een fictieve voorbeeldpersoon.' },
      { title: 'Kan ik mijn keuze wijzigen?', text: 'Ja. Op de controlepagina kunt u afspraak, datum en tijd aanpassen.' },
    ], links: ['contact', 'tarieven', 'privacy'],
  },
  {
    id: 'nieuws', title: 'Nieuws en bijeenkomsten', parent: 'over-ons', category: 'Over ons',
    intro: 'Een voorbeeld van redactionele inhoud die naast het afspraakproces kan staan.',
    sections: [
      { title: 'Bewegen in het dagelijks leven', text: 'Voorbeeldbericht: in een bijeenkomst zou een therapeut vertellen over kleine beweegmomenten op een gewone dag.' },
      { title: 'Kennismaken met de praktijk', text: 'Voorbeeldbericht: bezoekers zouden het team en de behandelruimtes kunnen leren kennen.' },
    ], links: ['over-ons', 'team', 'leefstijl'],
  },
  {
    id: 'werken-bij', title: 'Werken bij', parent: 'over-ons', category: 'Over ons',
    intro: 'Een gebruikelijke zijroute op een praktijksite, bedoeld voor toekomstige collega’s.',
    sections: [
      { title: 'Voorbeeldvacatures', text: 'Er staan geen echte vacatures open. Deze pagina is toegevoegd om de informatiehiërarchie te kunnen testen.' },
      { title: 'Team en werkwijze', text: 'Bekijk het teamoverzicht voor een indruk van de verschillende disciplines in deze fictieve praktijk.' },
    ], links: ['team', 'over-ons'],
  },
  {
    id: 'privacy', title: 'Privacy', category: 'Juridische informatie',
    intro: 'Uitleg over deze fictieve oefenomgeving.',
    sections: [{ title: 'Onderzoeksprototype', text: 'Vul op deze site geen echte medische gegevens in. De pagina’s bevatten voorbeeldinhoud voor een gebruikstest.' }],
    links: ['voorwaarden', 'veelgestelde-vragen'],
  },
  {
    id: 'voorwaarden', title: 'Algemene voorwaarden', category: 'Juridische informatie',
    intro: 'Voorbeeldpagina voor een gebruikelijke link onderaan een praktijksite.',
    sections: [{ title: 'Geen echte zorgovereenkomst', text: 'De oefenboeking is fictief en schept geen behandel- of betalingsverplichting.' }],
    links: ['privacy', 'tarieven'],
  },
];

export const pageById: Record<string, SitePage> = Object.fromEntries(sitePages.map(page => [page.id, page]));

export const mainNavigation = [
  { label: 'Fysiotherapie', id: 'fysiotherapie', children: ['manuele-therapie', 'sportfysiotherapie', 'geriatrie', 'oedeemtherapie', 'fysio-vergoeding'] },
  { label: 'Ergotherapie', id: 'ergotherapie', children: ['ouder-worden', 'energiemanagement', 'parkinson', 'ergo-vergoeding'] },
  { label: 'Psychologie', id: 'psychologie', children: ['angst', 'somberheid', 'stress', 'psychologie-vergoeding'] },
  { label: 'Logopedie', id: 'logopedie', children: ['spraak', 'stem', 'slikken', 'logopedie-vergoeding'] },
  { label: 'Bewegen & leefstijl', id: 'leefstijl', children: ['oefentherapie', 'groepstraining', 'leefstijlcoaching'] },
  { label: 'Over ons', id: 'over-ons', children: ['team', 'locaties', 'nieuws', 'werken-bij'] },
];
