import { useMemo, useState } from 'react';
import type { ContentVersion, InfoTaskId, Pair, TaskChoice, Version } from '../shared/protocol';
import { assignment, EXTRA_TASK_IDS, getScenario, INFO_TASKS, INFO_TASK_IDS, PAIR_NAMES } from '../shared/protocol';

type Tab = 'overzicht' | 'voorbereiding' | 'live' | 'beoordeling';
type Device = 'Smartphone' | 'Desktop';

type Trial = { kind: 'booking'; pair: Pair; version: Version; content: ContentVersion } | { kind: 'information'; id: InfoTaskId };
interface Participant { code: string; device: Device; trials: Trial[]; }

function makeRoster(): Participant[] {
  const roster: Participant[] = [];
  for (let n = 1; n <= 25; n++) {
    const smartphone = n <= 13;
    const index = smartphone ? n - 1 : n - 14;
    const trials: Trial[] = [];
    for (let offset = 0; offset < 6; offset++) {
      const pair = (((index + offset) % 6) + 1) as Pair;
      const k = pair - 1;
      const combinations: [Version, ContentVersion, Version, ContentVersion][] = [
        ['A', 'X', 'B', 'Y'], ['B', 'X', 'A', 'Y'], ['A', 'Y', 'B', 'Z'], ['B', 'Y', 'A', 'Z'],
        ['A', 'Z', 'B', 'W'], ['B', 'Z', 'A', 'W'], ['A', 'W', 'B', 'X'], ['B', 'W', 'A', 'X'],
      ];
      const order = combinations[(index + k) % combinations.length];
      trials.push({ kind: 'booking', pair, version: order[0], content: order[1] }, { kind: 'booking', pair, version: order[2], content: order[3] });
      if (offset === 1 || offset === 3) trials.push({ kind: 'information', id: INFO_TASK_IDS[(index + offset) % INFO_TASK_IDS.length] });
      if (offset === 5) trials.push({ kind: 'information', id: 'I5' });
    }
    roster.push({ code: `D${String(n).padStart(2, '0')}`, device: smartphone ? 'Smartphone' : 'Desktop', trials });
  }
  return roster;
}

const roster = makeRoster();
const allPairs = [1, 2, 3, 4, 5, 6] as const;

function ResearchHeader({ tab, setTab }: { tab: Tab; setTab: (tab: Tab) => void }) {
  const tabs: { key: Tab; label: string }[] = [
    { key: 'overzicht', label: 'Overzicht' },
    { key: 'voorbereiding', label: 'Voorbereiding' },
    { key: 'live', label: 'Live taak' },
    { key: 'beoordeling', label: 'Beoordeling' },
  ];
  return <header className="research-header">
    <div className="research-topline"><div><span className="research-mark">FV</span><span>Onderzoekspaneel</span></div><span className="research-badge">Frontendvoorbeeld</span></div>
    <nav className="research-nav" aria-label="Onderzoekspaneel">
      {tabs.map(item => <button type="button" key={item.key} className={tab === item.key ? 'active' : ''} onClick={() => setTab(item.key)}>{item.label}</button>)}
    </nav>
  </header>;
}

function DemoLauncher() {
  const [pair, setPair] = useState<Pair>(1);
  const [version, setVersion] = useState<Version>('A');
  const [task, setTask] = useState<TaskChoice>('X');
  const [scale, setScale] = useState(100);
  const href = `/demo?paar=${pair}&variant=${version}&${task.startsWith('I') ? `info=${task}` : `inhoud=${task}`}&vergroting=${scale}`;
  return <section className="research-card demo-launcher">
    <div className="card-heading"><div><p className="research-kicker">Schermen bekijken</p><h2>Demomodus</h2></div><span className="demo-pill">Geen onderzoeksdata</span></div>
    <p>Open een opdracht met dezelfde schermen en varianten als de geplande taken.</p>
    <div className="demo-toggle-groups">
      <fieldset className="toggle-fieldset"><legend>Test</legend><div className="toggle-grid test-toggles">{allPairs.map(value => <button type="button" className="research-toggle" aria-pressed={pair === value} key={value} onClick={() => setPair(value)}>Test {value}<span>{PAIR_NAMES[value]}</span></button>)}</div></fieldset>
      <fieldset className="toggle-fieldset"><legend>Variant</legend><div className="toggle-grid two-toggles">{(['A', 'B'] as Version[]).map(value => <button type="button" className="research-toggle" aria-pressed={version === value} key={value} onClick={() => setVersion(value)}>Variant {value}{pair === 6 && <span>{value === 'A' ? 'Zonder laadbeeld' : 'Skeletscherm'}</span>}</button>)}</div></fieldset>
      <fieldset className="toggle-fieldset"><legend>Opdracht</legend><div className="toggle-grid task-toggles">{(['X', 'Y', 'Z', 'W'] as const).map(code => <button type="button" className="research-toggle" aria-pressed={task === code} key={code} onClick={() => setTask(code)}>Boeking {code}</button>)}{EXTRA_TASK_IDS.map(code => <button type="button" className="research-toggle" aria-pressed={task === code} key={code} onClick={() => setTask(code)}>{code === 'I5' ? 'Inloggen' : `Siteopdracht ${code}`}</button>)}</div></fieldset>
      <fieldset className="toggle-fieldset"><legend>Tekstvergroting</legend><div className="toggle-grid scale-toggles">{[100, 125, 150, 200].map(value => <button type="button" className="research-toggle" aria-pressed={scale === value} key={value} onClick={() => setScale(value)}>{value}%</button>)}</div></fieldset>
    </div>
    <div className="demo-summary"><strong>Opdrachtkaart</strong><p>{task.startsWith('I') ? INFO_TASKS[task as InfoTaskId].prompt : assignment(getScenario(pair, task as ContentVersion))}</p>{task === 'I5' && <p><strong>Geef vooraf dit oefenadres:</strong> {INFO_TASKS.I5.expectedAnswer}</p>}</div>
    <a className="research-primary" href={href} target="_blank" rel="noreferrer">Open demo <span aria-hidden="true">↗</span></a>
  </section>;
}

function Overview({ selected, setSelected }: { selected: string; setSelected: (code: string) => void }) {
  const participant = roster.find(item => item.code === selected)!;
  return <>
    <div className="research-page-heading"><div><p className="research-kicker">PWS · Fysiotherapie Valkenswaard</p><h1>Onderzoeksoverzicht</h1><p>Voorbeeld van het vaste rooster en de te bouwen bediening.</p></div><a className="research-secondary" href="/print/opdrachten" target="_blank" rel="noreferrer">Opdrachtkaarten printen</a></div>
    <div className="stat-grid"><div className="stat-card"><strong>25</strong><span>geplande deelnemers</span></div><div className="stat-card"><strong>13</strong><span>smartphone</span></div><div className="stat-card"><strong>12</strong><span>desktop</span></div><div className="stat-card"><strong>15</strong><span>taken per deelnemer</span></div></div>
    <div className="research-columns">
      <section className="research-card"><div className="card-heading"><div><p className="research-kicker">Rooster</p><h2>Deelnemers</h2></div></div>
        <div className="participant-list">{roster.map(item => <button type="button" key={item.code} className={selected === item.code ? 'selected' : ''} onClick={() => setSelected(item.code)}><strong>{item.code}</strong><span>{item.device}</span><span className="roster-status">Gepland</span></button>)}</div>
      </section>
      <section className="research-card"><div className="card-heading"><div><p className="research-kicker">{participant.device}</p><h2>Taakvolgorde {selected}</h2></div><span className="demo-pill">Voorbeeldrooster</span></div>
        <ol className="trial-list">{participant.trials.map((trial, index) => <li key={index}><span className="trial-number">{String(index + 1).padStart(2, '0')}</span><div><strong>{trial.kind === 'booking' ? PAIR_NAMES[trial.pair] : trial.id === 'I5' ? 'Inlogopdracht' : 'Siteopdracht'}</strong><small>{trial.kind === 'booking' ? `Paar ${trial.pair} · Variant ${trial.version} · Inhoud ${trial.content}` : `${trial.id} · Verkennend, buiten A/B`}</small></div></li>)}</ol>
      </section>
    </div>
    <DemoLauncher />
  </>;
}

function Preparation({ selected }: { selected: string }) {
  const [participation, setParticipation] = useState(false);
  const [screenRecord, setScreenRecord] = useState(false);
  const [faceRecord, setFaceRecord] = useState(false);
  return <>
    <div className="research-page-heading"><div><p className="research-kicker">Sessie voorbereiden</p><h1>Deelnemer {selected}</h1><p>Invoer voor de latere lokale onderzoeksopslag.</p></div></div>
    <div className="research-columns">
      <section className="research-card"><p className="research-kicker">Achtergrond</p><h2>Deelnemer en apparaat</h2>
        <div className="research-form-grid"><label>Leeftijd<input type="number" min="65" placeholder="Bijvoorbeeld 72" /></label><label>Apparaatgroep<select defaultValue={roster.find(item => item.code === selected)?.device}><option>Smartphone</option><option>Desktop</option></select></label><label>Gebruik van internet<select defaultValue=""><option value="" disabled>Kies een antwoord</option><option>Dagelijks</option><option>Enkele keren per week</option><option>Minder vaak</option></select></label><label>Online afspraken maken<select defaultValue=""><option value="" disabled>Kies een antwoord</option><option>Vaak</option><option>Soms</option><option>Nooit</option></select></label><label>Tekstvergroting<select defaultValue="100"><option value="100">100%</option><option value="125">125%</option><option value="150">150%</option><option value="200">200%</option></select></label><label>Browser / apparaat<input type="text" placeholder="Bijvoorbeeld Chrome op Android" /></label></div>
        <label className="full-label">Hulpmiddelen of opmerkingen<textarea rows={3} placeholder="Bijvoorbeeld leesbril" /></label>
      </section>
      <section className="research-card"><p className="research-kicker">Toestemming</p><h2>Leg toestemming apart vast</h2><div className="check-list"><label><input type="checkbox" checked={participation} onChange={event => setParticipation(event.target.checked)} /> Deelname aan het onderzoek</label><label><input type="checkbox" checked={screenRecord} onChange={event => setScreenRecord(event.target.checked)} /> Schermopname</label><label><input type="checkbox" checked={faceRecord} onChange={event => setFaceRecord(event.target.checked)} /> Gezicht en geluid</label></div><p className="inline-note">Schermopname en gezicht/geluid zijn optioneel. De frontend bewaart deze invoer nog niet.</p><div className="connection-box"><strong>Apparaat koppelen</strong><p>Eenmalige codes en verbinding worden in de backendfase aangesloten.</p><button type="button" disabled>Koppelcode maken</button></div></section>
    </div>
  </>;
}

function LiveTask({ selected }: { selected: string }) {
  const [index, setIndex] = useState(0);
  const participant = roster.find(item => item.code === selected)!;
  const trial = participant.trials[index];
  return <><div className="research-page-heading"><div><p className="research-kicker">Live taakweergave</p><h1>{selected} · taak {index + 1} van {participant.trials.length}</h1><p>De live timer en gebeurtenissen vragen een serververbinding.</p></div></div>
    <div className="research-columns"><section className="research-card"><div className="card-heading"><div><p className="research-kicker">Opdracht voor onderzoeker</p><h2>{trial.kind === 'booking' ? `${PAIR_NAMES[trial.pair]} · ${trial.version}/${trial.content}` : trial.id === 'I5' ? 'Inlogopdracht I5' : `Siteopdracht ${trial.id}`}</h2></div></div><div className="assignment-large">{trial.kind === 'booking' ? assignment(getScenario(trial.pair, trial.content)) : INFO_TASKS[trial.id].prompt}</div>{trial.kind === 'information' && trial.id === 'I5' && <p className="inline-note"><strong>Geef vooraf dit oefenadres:</strong> {INFO_TASKS.I5.expectedAnswer}</p>}<div className="task-controls"><button type="button" onClick={() => setIndex(Math.max(0, index - 1))} disabled={index === 0}>Vorige taak</button><button type="button" onClick={() => setIndex(Math.min(participant.trials.length - 1, index + 1))} disabled={index === participant.trials.length - 1}>Volgende taak</button></div></section><section className="research-card"><p className="research-kicker">Verbinding</p><h2>Wacht op deelnemersapparaat</h2><div className="live-placeholder"><span aria-hidden="true">◌</span><strong>Nog niet gekoppeld</strong><p>Na de backendfase verschijnen hier timer, actuele stap, keuzes en gebeurtenissen.</p></div><button type="button" className="research-primary disabled-button" disabled>Taak starten</button></section></div>
  </>;
}

function Review() {
  return <><div className="research-page-heading"><div><p className="research-kicker">Na de taak</p><h1>Beoordeling en export</h1><p>Voorbeeld van de vragen en observatievelden.</p></div></div><div className="research-columns"><section className="research-card"><p className="research-kicker">Mondelinge vragen</p><h2>Ervaring van de deelnemer</h2><div className="rating-block"><fieldset><legend>Hoeveel frustratie of ergernis voelde u tijdens deze opdracht?</legend>{[1, 2, 3, 4, 5].map(score => <label key={score}><input type="radio" name="frustratie" value={score} />{score}</label>)}</fieldset><fieldset><legend>Hoe onzeker voelde u zich over wat u moest doen of over of het gelukt was?</legend>{[1, 2, 3, 4, 5].map(score => <label key={score}><input type="radio" name="onzekerheid" value={score} />{score}</label>)}</fieldset><p className="inline-note">1 = helemaal niet · 5 = heel veel</p></div><label className="full-label">Observaties<textarea rows={5} placeholder="Noteer zichtbare handelingen of opmerkingen" /></label></section><section className="research-card"><p className="research-kicker">Registratie</p><h2>Taakresultaat</h2><div className="result-placeholder"><strong>Geen taakgegevens beschikbaar</strong><p>Automatische gebeurtenissen, herkenningstijd, correcties en export worden bij de backend aangesloten.</p></div><button type="button" disabled>Resultaat opslaan</button><button type="button" disabled>Export maken</button></section></div></>;
}

function PrintCards() {
  return <div className="print-page"><div className="print-toolbar"><h1>Opdrachtkaarten</h1><button type="button" onClick={() => window.print()}>Print deze pagina</button></div><p>Fictieve opdrachten. Lees de kaart voor en laat deze tijdens de taak naast het apparaat liggen.</p><div className="print-cards">{roster.flatMap(person => person.trials.map((trial, index) => <article className="print-card" key={`${person.code}-${index}`}><small>{person.code} · Taak {index + 1} · {trial.kind === 'booking' ? `Paar ${trial.pair} · ${trial.version}/${trial.content}` : trial.id === 'I5' ? 'Inlogopdracht I5' : `Siteopdracht ${trial.id}`}</small><p>{trial.kind === 'booking' ? assignment(getScenario(trial.pair, trial.content)) : INFO_TASKS[trial.id].prompt}</p>{trial.kind === 'information' && trial.id === 'I5' && <p><strong>Oefenadres: {INFO_TASKS.I5.expectedAnswer}</strong></p>}</article>))}</div></div>;
}

export function ResearchApp({ printMode = false }: { printMode?: boolean }) {
  const [tab, setTab] = useState<Tab>('overzicht');
  const [selected, setSelected] = useState('D01');
  const active = useMemo(() => roster.find(item => item.code === selected), [selected]);
  if (printMode) return <PrintCards />;
  return <div className="research-app"><ResearchHeader tab={tab} setTab={setTab} /><main className="research-main">{tab === 'overzicht' && <Overview selected={selected} setSelected={setSelected} />}{tab === 'voorbereiding' && <Preparation key={active?.code} selected={selected} />}{tab === 'live' && <LiveTask selected={selected} />}{tab === 'beoordeling' && <Review />}</main></div>;
}
