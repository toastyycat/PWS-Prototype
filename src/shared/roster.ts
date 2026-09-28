import type { ContentVersion, InfoTaskId, Pair, Version } from './protocol.ts';

export type Trial =
  | { kind: 'booking'; pair: Pair; version: Version; content: ContentVersion }
  | { kind: 'information'; id: InfoTaskId };
export interface Participant { code: string; device: 'Smartphone' | 'Desktop'; trials: Trial[] }

export function makeRoster(): Participant[] {
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
      if (offset === 1 || offset === 3) trials.push({ kind: 'information', id: (['I1', 'I2', 'I3', 'I4'] as InfoTaskId[])[(index + offset) % 4] });
      if (offset === 5) trials.push({ kind: 'information', id: 'I5' });
    }
    roster.push({ code: `D${String(n).padStart(2, '0')}`, device: smartphone ? 'Smartphone' : 'Desktop', trials });
  }
  return roster;
}
