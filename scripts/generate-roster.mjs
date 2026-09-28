import { writeFileSync } from 'node:fs';
import { makeRoster } from '../src/shared/roster.ts';

const rows = ['deelnemerscode;apparaat;volgorde;taak;soort;paar;design;opdracht'];
for (const participant of makeRoster()) {
  participant.trials.forEach((trial, index) => {
    rows.push([
      participant.code, participant.device, index + 1, `T${String(index + 1).padStart(2, '0')}`,
      trial.kind === 'booking' ? 'boeking' : 'informatie',
      trial.kind === 'booking' ? trial.pair : '',
      trial.kind === 'booking' ? trial.version : '',
      trial.kind === 'booking' ? trial.content : trial.id,
    ].join(';'));
  });
}
writeFileSync(new URL('../public/deelnemers.csv', import.meta.url), `\uFEFF${rows.join('\r\n')}\r\n`, 'utf8');
