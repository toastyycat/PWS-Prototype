import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { BookingApp } from './BookingApp';
import type { ContentVersion, InfoTaskId, Pair, Version } from '../shared/protocol';
import { getScenario, getVariant } from '../shared/protocol';
import type { Trial } from '../shared/roster';

type ScheduledTrial = Trial & { task: string };
type Session = { code: string; trials: ScheduledTrial[]; index: number };

function normalizeCode(input: string): string {
  const number = Number(input.trim().toUpperCase().replace(/^D/, ''));
  return Number.isInteger(number) && number >= 1 && number <= 25 ? `D${String(number).padStart(2, '0')}` : '';
}

function readTrials(csv: string, code: string): ScheduledTrial[] {
  const lines = csv.replace(/^\uFEFF/, '').trim().split(/\r?\n/).slice(1);
  const rows = lines.map(line => line.split(';')).filter(row => row[0] === code);
  if (rows.length !== 15) throw new Error('Geen volledig rooster voor deze deelnemerscode.');
  return rows.map((row, index) => {
    const [, , order, task, kind, pair, version, content] = row;
    if (Number(order) !== index + 1 || task !== `T${String(index + 1).padStart(2, '0')}`) throw new Error('Het rooster is ongeldig.');
    if (kind === 'boeking' && /^[1-6]$/.test(pair) && ['A', 'B'].includes(version) && ['X', 'Y', 'Z', 'W'].includes(content)) {
      return { kind: 'booking', task, pair: Number(pair) as Pair, version: version as Version, content: content as ContentVersion };
    }
    if (kind === 'informatie' && ['I1', 'I2', 'I3', 'I4', 'I5'].includes(content)) return { kind: 'information', task, id: content as InfoTaskId };
    throw new Error('Het rooster bevat een ongeldige opdracht.');
  });
}

export function ParticipantSession() {
  const [input, setInput] = useState('');
  const [session, setSession] = useState<Session | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [pendingMs, setPendingMs] = useState<number | null>(null);
  const startedAt = useRef<number | null>(null);
  const saving = useRef(false);

  const enter = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const code = normalizeCode(input);
    if (!code) { setError('Vul een deelnemerscode van 1 tot en met 25 in.'); return; }
    setBusy(true); setError('');
    try {
      const [rosterResponse, progressResponse] = await Promise.all([
        fetch('/deelnemers.csv', { cache: 'no-store' }),
        fetch(`/api/voortgang/${code}`, { cache: 'no-store' }),
      ]);
      if (!rosterResponse.ok || !progressResponse.ok) throw new Error('Het rooster of de voortgang kon niet worden geladen.');
      const trials = readTrials(await rosterResponse.text(), code);
      const progress = await progressResponse.json() as { completed?: string[] };
      const completed = progress.completed;
      if (!Array.isArray(completed) || completed.some((task, index) => task !== trials[index]?.task)) throw new Error('De opgeslagen voortgang komt niet overeen met het rooster.');
      setSession({ code, trials, index: completed.length });
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Deelnemer kon niet worden gestart.'); }
    finally { setBusy(false); }
  };

  const save = async (durationMs: number) => {
    if (!session || saving.current) return;
    const trial = session.trials[session.index];
    if (!trial) return;
    saving.current = true; setBusy(true); setError(''); setPendingMs(durationMs);
    try {
      const response = await fetch('/api/taakduren', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: session.code, task: trial.task, durationMs }),
      });
      if (!response.ok) throw new Error('De taakduur kon niet worden opgeslagen. Probeer opnieuw.');
      setPendingMs(null);
      startedAt.current = null;
      setSession(previous => previous ? { ...previous, index: previous.index + 1 } : previous);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Opslaan mislukt.'); }
    finally { saving.current = false; setBusy(false); }
  };

  if (!session) return <main className="research-setup"><form className="research-setup-card participant-entry" onSubmit={enter}>
    <p className="research-setup-kicker">PWS · deelnemerssessie</p><h1>Deelnemerscode invoeren</h1>
    <p>Vul de code in die u van de onderzoeker heeft gekregen.</p>
    <label htmlFor="participant-code">Deelnemerscode (1–25)</label>
    <input id="participant-code" inputMode="numeric" autoComplete="off" value={input} onChange={event => setInput(event.target.value)} placeholder="Bijvoorbeeld 1 of D01" />
    {error && <p className="validation" role="alert">{error}</p>}
    <button type="submit" className="research-setup-start" disabled={busy}>Start sessie →</button>
  </form></main>;

  if (session.index >= session.trials.length) return <main className="research-setup"><div className="research-setup-card"><h1>Alle opdrachten zijn afgerond</h1><p>De sessie voor {session.code} is klaar. De taakduren staan in de resultaten-CSV.</p></div></main>;

  const trial = session.trials[session.index];
  const pair = trial.kind === 'booking' ? trial.pair : 1;
  const version = trial.kind === 'booking' ? trial.version : 'A';
  const task = trial.kind === 'booking' ? trial.content : trial.id;
  return <>
    <BookingApp key={`${session.code}-${trial.task}`} scenario={getScenario(pair, trial.kind === 'booking' ? trial.content : 'X')}
      selectedTasks={[task]} activeTask={task} variant={getVariant(pair, version)} selectedDesigns={[]} scale={100}
      onDesignToggle={() => {}} onAllDesignsToggle={() => {}} onTaskToggle={() => {}} onActiveTaskChange={() => {}}
      automatic onStarted={() => { startedAt.current = performance.now(); }}
      onCompleted={() => { const elapsed = Math.max(0, performance.now() - (startedAt.current ?? performance.now())); void save(elapsed); }} />
    {(busy || pendingMs !== null || error) && <div className="session-save-overlay" role="status"><div>
      <strong>{error || 'Taakduur opslaan…'}</strong>
      {error && pendingMs !== null && <button type="button" className="research-setup-start" onClick={() => void save(pendingMs)}>Opnieuw proberen</button>}
    </div></div>}
  </>;
}
