import type { ContentVersion, InfoTaskId, Pair, Version } from './protocol.ts';

export type Trial =
  | { kind: 'booking'; pair: Pair; version: Version; content: ContentVersion }
  | { kind: 'information'; id: InfoTaskId };
export interface Participant { code: string; device: 'Smartphone' | 'Desktop'; trials: Trial[] }

export const MAX_PARTICIPANTS = 100;
export function deviceForNumber(n: number): Participant['device'] {
  // Bewaar D01–D25 ongewijzigd; nieuwe codes vullen beide apparaatgroepen aan.
  return n <= 13 || (n >= 26 && n % 2 === 0) ? 'Smartphone' : 'Desktop';
}

export function participantCode(n: number): string {
  return `D${String(n).padStart(2, '0')}`;
}

export function makeRoster(): Participant[] {
  const roster: Participant[] = [];
  let smartphoneIndex = 0;
  let desktopIndex = 0;
  for (let n = 1; n <= MAX_PARTICIPANTS; n++) {
    const smartphone = deviceForNumber(n) === 'Smartphone';
    const index = smartphone ? smartphoneIndex++ : desktopIndex++;
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
      if (offset === 1 || offset === 3) trials.push({ kind: 'information', id: (['I1', 'I2', 'I3', 'I4'] as InfoTaskId[])[(index + offset) % 4] });
      if (offset === 5) trials.push({ kind: 'information', id: 'I5' });
    }
    roster.push({ code: participantCode(n), device: smartphone ? 'Smartphone' : 'Desktop', trials });
  }
  return roster;
}
