import test from 'node:test';
import assert from 'node:assert/strict';
import { RequestBodyTooLargeError, readJsonBody } from './http.mjs';

test('readJsonBody parses valid JSON', async () => {
  const request = new Request('https://example.test/api', {
    method: 'POST',
    body: JSON.stringify({ ok: true }),
  });

  assert.deepEqual(await readJsonBody(request), { ok: true });
});

test('readJsonBody returns null for invalid JSON', async () => {
  const request = new Request('https://example.test/api', {
    method: 'POST',
    body: '{invalid',
  });

  assert.equal(await readJsonBody(request), null);
});

test('readJsonBody rejects content-length above the byte limit', async () => {
  const request = new Request('https://example.test/api', {
    method: 'POST',
    headers: { 'content-length': '20' },
    body: JSON.stringify({ ok: true }),
  });

  await assert.rejects(
    () => readJsonBody(request, { maxBytes: 10 }),
    RequestBodyTooLargeError,
  );
});

test('readJsonBody rejects actual body size above the byte limit', async () => {
  const request = new Request('https://example.test/api', {
    method: 'POST',
    body: JSON.stringify({ message: 'too long' }),
  });

  await assert.rejects(
    () => readJsonBody(request, { maxBytes: 10 }),
    RequestBodyTooLargeError,
  );
});
