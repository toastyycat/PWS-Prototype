export type Pair = 1 | 2 | 3 | 4 | 5;
export type Version = 'A' | 'B';
export type ContentVersion = 'X' | 'Y';
export type Service = 'Intake' | 'Behandeling' | 'Oefentherapie' | 'Manuele therapie' | 'Sportfysiotherapie' | 'Ergotherapie';
export type Time = '09.00' | '10.30' | '13.00' | '14.30';

export interface Scenario {
  pair: Pair;
  content: ContentVersion;
  dates: readonly string[];
  target: { service: Service; date: string; time: Time };
}

export interface VariantConfig {
  pair: Pair;
  version: Version;
  largeText: boolean;
  visibleNavigation: boolean;
  highContrast: boolean;
  animatedConfirmation: boolean;
  emphasizedAction: boolean;
}

export const SERVICES: readonly Service[] = ['Intake', 'Behandeling', 'Oefentherapie', 'Manuele therapie', 'Sportfysiotherapie', 'Ergotherapie'];
export const TIMES: readonly Time[] = ['09.00', '10.30', '13.00', '14.30'];
export const PAIR_NAMES: Record<Pair, string> = {
  1: 'Tekstgrootte', 2: 'Navigatie', 3: 'Contrast', 4: 'Animatie', 5: 'Volledig ontwerp',
};

const dates = {
  1: [5, 6, 7, 8],
  2: [12, 13, 14, 15],
  3: [19, 20, 21, 22],
  4: [26, 27, 28, 29],
  5: [2, 9, 16, 23],
} satisfies Record<Pair, number[]>;

const targets: Record<Pair, Record<ContentVersion, [Service, number, Time]>> = {
  1: { X: ['Intake', 6, '10.30'], Y: ['Behandeling', 8, '13.00'] },
  2: { X: ['Behandeling', 12, '14.30'], Y: ['Oefentherapie', 14, '09.00'] },
  3: { X: ['Oefentherapie', 22, '13.00'], Y: ['Intake', 20, '10.30'] },
  4: { X: ['Intake', 28, '09.00'], Y: ['Behandeling', 26, '14.30'] },
  5: { X: ['Behandeling', 9, '10.30'], Y: ['Oefentherapie', 23, '13.00'] },
};

const isoDate = (day: number) => `2026-10-${String(day).padStart(2, '0')}`;

export function getScenario(pair: Pair, content: ContentVersion): Scenario {
  const [service, day, time] = targets[pair][content];
  return { pair, content, dates: dates[pair].map(isoDate), target: { service, date: isoDate(day), time } };
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
  };
}

export function formatDate(iso: string): string {
  const day = Number(iso.slice(-2));
  const weekday = new Intl.DateTimeFormat('nl-NL', { weekday: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2026, 9, day)));
  return `${weekday} ${day} oktober 2026`;
}

export function assignment(scenario: Scenario): string {
  const { service, date, time } = scenario.target;
  return `Maak een afspraak voor ${service.toLowerCase()} op ${formatDate(date)} om ${time} uur.`;
}

export function parseDemoQuery(search: string): { pair: Pair; version: Version; content: ContentVersion; scale: number } {
  const query = new URLSearchParams(search);
  const pairNumber = Number(query.get('paar'));
  const pair = ([1, 2, 3, 4, 5].includes(pairNumber) ? pairNumber : 1) as Pair;
  const version = query.get('variant') === 'B' ? 'B' : 'A';
  const content = query.get('inhoud') === 'Y' ? 'Y' : 'X';
  const scaleNumber = Number(query.get('vergroting'));
  const scale = [100, 125, 150, 200].includes(scaleNumber) ? scaleNumber : 100;
  return { pair, version, content, scale };
}
