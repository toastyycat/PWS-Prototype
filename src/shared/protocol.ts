export type Pair = 1 | 2 | 3 | 4 | 5 | 6;
export type Version = 'A' | 'B';
export type ContentVersion = 'X' | 'Y' | 'Z' | 'W';
export type InfoTaskId = 'I1' | 'I2' | 'I3' | 'I4' | 'I5';
export type TaskChoice = ContentVersion | InfoTaskId;
export type Service = 'Intake' | 'Behandeling' | 'Oefentherapie' | 'Manuele therapie' | 'Sportfysiotherapie' | 'Ergotherapie';
export type Time = '09.00' | '10.30' | '13.00' | '14.30';

export interface Scenario {
  pair: Pair;
  content: ContentVersion;
  initialMonth: string;
  target: { service: Service; date: string; time: Time };
}

export interface InfoTask {
  id: InfoTaskId;
  prompt: string;
  targetPageId: string;
  expectedAnswer: string;
}

export interface VariantConfig {
  pair: Pair;
  version: Version;
  largeText: boolean;
  visibleNavigation: boolean;
  highContrast: boolean;
  animatedConfirmation: boolean;
  emphasizedAction: boolean;
  skeletonLoading: boolean;
}

export const SERVICES: readonly Service[] = ['Intake', 'Behandeling', 'Oefentherapie', 'Manuele therapie', 'Sportfysiotherapie', 'Ergotherapie'];
export const TIMES: readonly Time[] = ['09.00', '10.30', '13.00', '14.30'];
export const PAIR_NAMES: Record<Pair, string> = {
  1: 'Tekstgrootte', 2: 'Navigatie', 3: 'Contrast', 4: 'Animatie', 5: 'Volledig ontwerp', 6: 'Geduld bij laden',
};

// Elke variant gebruikt hetzelfde boekbare bereik. A en B van één paar
// krijgen opdrachten in dezelfde doelmaand.
export const BOOKING_MONTHS = ['2026-10', '2026-11', '2026-12', '2027-01', '2027-02', '2027-03'] as const;

const scenarios: Record<Pair, Record<ContentVersion, [Service, string, Time]>> = {
  1: {
    X: ['Intake', '2026-10-06', '10.30'], Y: ['Behandeling', '2026-10-08', '13.00'],
    Z: ['Oefentherapie', '2026-10-19', '09.00'], W: ['Manuele therapie', '2026-10-28', '14.30'],
  },
  2: {
    X: ['Behandeling', '2026-11-12', '14.30'], Y: ['Oefentherapie', '2026-11-16', '09.00'],
    Z: ['Ergotherapie', '2026-11-24', '13.00'], W: ['Sportfysiotherapie', '2026-11-27', '10.30'],
  },
  3: {
    X: ['Oefentherapie', '2026-12-22', '13.00'], Y: ['Intake', '2026-12-24', '10.30'],
    Z: ['Manuele therapie', '2026-12-07', '09.00'], W: ['Behandeling', '2026-12-16', '14.30'],
  },
  4: {
    X: ['Intake', '2027-01-28', '09.00'], Y: ['Behandeling', '2027-01-26', '14.30'],
    Z: ['Ergotherapie', '2027-01-08', '10.30'], W: ['Sportfysiotherapie', '2027-01-20', '13.00'],
  },
  5: {
    X: ['Behandeling', '2027-02-09', '10.30'], Y: ['Oefentherapie', '2027-02-23', '13.00'],
    Z: ['Intake', '2027-02-05', '14.30'], W: ['Manuele therapie', '2027-02-18', '09.00'],
  },
  6: {
    X: ['Ergotherapie', '2027-03-03', '09.00'], Y: ['Sportfysiotherapie', '2027-03-11', '13.00'],
    Z: ['Oefentherapie', '2027-03-19', '10.30'], W: ['Intake', '2027-03-29', '14.30'],
  },
};

export const FAKE_LOGIN_EMAIL = 'alex.voorbeeld@example.invalid';

export const INFO_TASKS: Record<InfoTaskId, InfoTask> = {
  I1: { id: 'I1', prompt: 'Zoek de pagina over energiemanagement. Vertel welke twee soorten momenten samen bekeken worden.', targetPageId: 'energiemanagement', expectedAnswer: 'Momenten die energie vragen en momenten van rust.' },
  I2: { id: 'I2', prompt: 'Zoek op de site welke voorbeeldlocatie van de praktijk wordt genoemd.', targetPageId: 'locaties', expectedAnswer: 'Valkenswaard centrum.' },
  I3: { id: 'I3', prompt: 'Zoek op de site of een afspraak in deze oefenomgeving echt is.', targetPageId: 'veelgestelde-vragen', expectedAnswer: 'Nee, de afspraak is fictief.' },
  I4: { id: 'I4', prompt: 'Zoek de pagina Bewegen in een groep en vertel voor wie de activiteit bedoeld is.', targetPageId: 'groepstraining', expectedAnswer: 'Voor mensen die samen met anderen willen oefenen of bewegen.' },
  I5: { id: 'I5', prompt: 'Log in op de oefensite met het fictieve e-mailadres dat de onderzoeker u geeft.', targetPageId: 'login', expectedAnswer: FAKE_LOGIN_EMAIL },
};

export const INFO_TASK_IDS: InfoTaskId[] = ['I1', 'I2', 'I3', 'I4'];
export const EXTRA_TASK_IDS: InfoTaskId[] = [...INFO_TASK_IDS, 'I5'];

export function getScenario(pair: Pair, content: ContentVersion): Scenario {
  const [service, date, time] = scenarios[pair][content];
  return { pair, content, initialMonth: date.slice(0, 7), target: { service, date, time } };
}

export function isBookableDate(iso: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso) || !BOOKING_MONTHS.includes(iso.slice(0, 7) as typeof BOOKING_MONTHS[number])) return false;
  const date = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== iso) return false;
  const day = date.getUTCDay();
  return day !== 0 && day !== 6;
}

export function getVariant(pair: Pair, version: Version): VariantConfig {
  const isB = version === 'B';
  return {
    pair, version,
    largeText: isB && (pair === 1 || pair === 5),
    visibleNavigation: isB && (pair === 2 || pair === 5),
    highContrast: isB && (pair === 3 || pair === 5),
    animatedConfirmation: isB && (pair === 4 || pair === 5),
    emphasizedAction: isB && pair === 5,
    skeletonLoading: isB && pair === 6,
  };
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T12:00:00Z`));
}

export function formatMonth(month: string): string {
  const [year, value] = month.split('-').map(Number);
  return new Intl.DateTimeFormat('nl-NL', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(year, value - 1, 1)));
}

export function assignment(scenario: Scenario): string {
  const { service, date, time } = scenario.target;
  return `Maak een afspraak voor ${service.toLowerCase()} op ${formatDate(date)} om ${time} uur.`;
}

export function parseDemoQuery(search: string): { pair: Pair; version: Version; content: ContentVersion; infoTask: InfoTaskId | null; scale: number } {
  const query = new URLSearchParams(search);
  const pairNumber = Number(query.get('paar'));
  const pair = ([1, 2, 3, 4, 5, 6].includes(pairNumber) ? pairNumber : 1) as Pair;
  const version = query.get('variant') === 'B' ? 'B' : 'A';
  const content = (['X', 'Y', 'Z', 'W'].includes(query.get('inhoud') || '') ? query.get('inhoud') : 'X') as ContentVersion;
  const candidate = query.get('info') as InfoTaskId | null;
  const infoTask = candidate && candidate in INFO_TASKS ? candidate : null;
  const scaleNumber = Number(query.get('vergroting'));
  const scale = [100, 125, 150, 200].includes(scaleNumber) ? scaleNumber : 100;
  return { pair, version, content, infoTask, scale };
}
