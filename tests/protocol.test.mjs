import test from 'node:test';
import assert from 'node:assert/strict';
import { BOOKING_MONTHS, getScenario, getVariant, INFO_TASKS, isBookableDate, parseDemoQuery } from '../src/shared/protocol.ts';

test('every weekday in all six months is bookable and weekends are closed', () => {
  for (const month of BOOKING_MONTHS) {
    const [year, value] = month.split('-').map(Number);
    const days = new Date(Date.UTC(year, value, 0)).getUTCDate();
    for (let day = 1; day <= days; day++) {
      const iso = `${month}-${String(day).padStart(2, '0')}`;
      const weekday = new Date(`${iso}T12:00:00Z`).getUTCDay();
      assert.equal(isBookableDate(iso), weekday !== 0 && weekday !== 6, iso);
    }
  }
  assert.equal(isBookableDate('2026-09-30'), false);
  assert.equal(isBookableDate('2027-04-01'), false);
  assert.equal(isBookableDate('2026-11-31'), false);
});

test('all booking variants have valid targets in the same month per pair', () => {
  for (const pair of [1, 2, 3, 4, 5, 6]) {
    const scenarios = ['X', 'Y', 'Z', 'W'].map(content => getScenario(pair, content));
    assert.equal(new Set(scenarios.map(item => item.initialMonth)).size, 1);
    assert.equal(new Set(scenarios.map(item => `${item.target.service}/${item.target.date}/${item.target.time}`)).size, 4);
    for (const scenario of scenarios) assert.equal(isBookableDate(scenario.target.date), true);
  }
});

test('four isolated comparisons change only their measured setting', () => {
  for (const pair of [1, 2, 3, 4]) {
    const a = getVariant(pair, 'A');
    const b = getVariant(pair, 'B');
    const changed = Object.keys(a).filter(key => a[key] !== b[key] && key !== 'version');
    assert.deepEqual(changed, [['largeText'], ['visibleNavigation'], ['highContrast'], ['animatedConfirmation']][pair - 1]);
  }
});

test('loading comparison keeps the same booking design and changes only the loading image', () => {
  const a = getVariant(6, 'A');
  const b = getVariant(6, 'B');
  const changed = Object.keys(a).filter(key => a[key] !== b[key] && key !== 'version');
  assert.deepEqual(changed, ['skeletonLoading']);
  assert.equal(a.skeletonLoading, false);
  assert.equal(b.skeletonLoading, true);
});

test('researcher links retain every booking and information task', () => {
  for (const content of ['X', 'Y', 'Z', 'W']) {
    assert.equal(parseDemoQuery(`?paar=5&variant=B&inhoud=${content}`).content, content);
    assert.equal(parseDemoQuery(`?paar=6&variant=B&inhoud=${content}`).pair, 6);
  }
  for (const id of Object.keys(INFO_TASKS)) {
    assert.equal(parseDemoQuery(`?info=${id}`).infoTask, id);
  }
  assert.equal(parseDemoQuery('?info=unknown').infoTask, null);
});

test('researcher links preserve several selected assignments', () => {
  const parsed = parseDemoQuery('?paar=6&variant=B&inhoud=Y&opdrachten=X,I2,Y,I5,X,unknown');
  assert.deepEqual(parsed.selectedTasks, ['X', 'I2', 'Y', 'I5']);
  assert.equal(parsed.content, 'Y');
  assert.deepEqual(parseDemoQuery('?opdrachten=').selectedTasks, []);
  assert.deepEqual(parseDemoQuery('?info=I5').selectedTasks, ['I5']);
});
