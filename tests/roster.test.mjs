import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { makeRoster } from '../src/shared/roster.ts';

test('CSV contains the exact 15 assignments for every participant in order', () => {
  const rows = readFileSync(new URL('../public/deelnemers.csv', import.meta.url), 'utf8')
    .replace(/^\uFEFF/, '').trim().split(/\r?\n/).slice(1).map(line => line.split(';'));
  assert.equal(rows.length, 375);
  for (const person of makeRoster()) {
    const assigned = rows.filter(row => row[0] === person.code);
    assert.equal(assigned.length, 15, person.code);
    person.trials.forEach((trial, index) => {
      const [, device, order, task, kind, pair, version, content] = assigned[index];
      assert.equal(device, person.device);
      assert.equal(Number(order), index + 1);
      assert.equal(task, `T${String(index + 1).padStart(2, '0')}`);
      assert.equal(kind, trial.kind === 'booking' ? 'boeking' : 'informatie');
      assert.equal(pair, trial.kind === 'booking' ? String(trial.pair) : '');
      assert.equal(version, trial.kind === 'booking' ? trial.version : '');
      assert.equal(content, trial.kind === 'booking' ? trial.content : trial.id);
    });
  }
});
