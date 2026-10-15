// Experiment labels describe exported data. They do not alter traffic demand yet.
const DEFAULT_SEED = 42;
const ID_PATTERN = /^[a-zA-Z0-9_-]{1,64}$/;

export function createRunContext(search = '') {
  const params = new URLSearchParams(search);
  const scenarioId = params.get('scenario') ?? 'baseline';
  if (!ID_PATTERN.test(scenarioId) || scenarioId.length > 48) {
    throw new Error('scenario must be 1–48 letters, digits, underscores, or hyphens.');
  }

  const rawSeed = params.get('seed');
  if (rawSeed !== null && !/^\d{1,10}$/.test(rawSeed)) {
    throw new Error('seed must be an unsigned 32-bit integer.');
  }
  const seed = rawSeed === null ? DEFAULT_SEED : Number(rawSeed);
  if (!Number.isInteger(seed) || seed < 0 || seed > 0xffffffff) {
    throw new Error('seed must be an unsigned 32-bit integer.');
  }

  const runId = params.get('run') ?? `${scenarioId}-seed-${seed}`;
  if (!ID_PATTERN.test(runId)) {
    throw new Error('run must be 1–64 letters, digits, underscores, or hyphens.');
  }
  return Object.freeze({ scenarioId, runId, seed, dataOrigin: 'simulated' });
}
