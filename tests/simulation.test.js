import test from 'node:test';
import assert from 'node:assert/strict';
import { createSeededRandom } from '../src/simulation/random.js';
import { createRunContext } from '../src/simulation/runConfig.js';

test('same seed produces an identical sequence', () => {
  const a = createSeededRandom(123);
  const b = createSeededRandom(123);
  assert.deepEqual(Array.from({ length: 100 }, a), Array.from({ length: 100 }, b));
});

test('different seeds produce different sequences', () => {
  assert.notDeepEqual(createSeededRandom(1)(), createSeededRandom(2)());
});

test('PRNG values are between zero and one', () => {
  const random = createSeededRandom(0);
  for (let i = 0; i < 1000; i++) {
    const value = random();
    assert.ok(value >= 0 && value < 1);
  }
});

test('run metadata defaults and accepts URL parameters', () => {
  assert.deepEqual(createRunContext(), {
    scenarioId: 'baseline', runId: 'baseline-seed-42', seed: 42, dataOrigin: 'simulated',
  });
  assert.deepEqual(createRunContext('?scenario=gros_weekend&seed=7&run=trial_1'), {
    scenarioId: 'gros_weekend', runId: 'trial_1', seed: 7, dataOrigin: 'simulated',
  });
});

test('invalid seed and scenario identifiers are rejected', () => {
  for (const query of ['?seed=-1', '?seed=4294967296', '?seed=abc', '?seed=', '?scenario=bad%20name', '?run=bad%20name']) {
    assert.throws(() => createRunContext(query));
  }
});
