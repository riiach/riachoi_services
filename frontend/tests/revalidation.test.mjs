import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import test from 'node:test';
import { encodeSignatureHeader, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

const require = createRequire(import.meta.url);
const invalidations = [];
globalThis.__testInvalidations = invalidations;
const cacheMock = `data:text/javascript,${encodeURIComponent('export function revalidatePath() {} export function revalidateTag(...args) { globalThis.__testInvalidations.push(args); }')}`;
const source = (await readFile(new URL('../app/api/revalidate/route.js', import.meta.url), 'utf8'))
  .replace('"next/cache"', JSON.stringify(cacheMock))
  .replace('"next-sanity/webhook"', JSON.stringify(pathToFileURL(require.resolve('next-sanity/webhook')).href));
const { POST } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const secret = 'test-only-webhook-secret';
async function request(body, signingSecret = secret) {
  const text = JSON.stringify(body);
  const signature = await encodeSignatureHeader(text, Date.now(), signingSecret);
  return new Request('http://localhost/api/revalidate', {
    method: 'POST', body: text, headers: { [SIGNATURE_HEADER_NAME]: signature },
  });
}

test('webhook only expires caches for signed published content changes', async () => {
  const original = process.env.SANITY_REVALIDATE_SECRET;
  try {
    delete process.env.SANITY_REVALIDATE_SECRET;
    assert.equal((await POST(await request({ _id: 'p', _type: 'post' }))).status, 503);
    process.env.SANITY_REVALIDATE_SECRET = secret;
    assert.equal((await POST(await request({ _id: 'p', _type: 'post' }, 'wrong'))).status, 401);
    assert.equal((await POST(new Request('http://localhost', { method: 'POST', body: '{}' }))).status, 401);
    assert.equal((await POST(await request({ _id: 'p', _type: 'unrelated' }))).status, 400);
    assert.deepEqual(await (await POST(await request({ _id: 'drafts.p', _type: 'post' }))).json(), { revalidated: false });
    assert.equal(invalidations.length, 0);
    for (const type of ['post', 'category', 'subCategory', 'author', 'portfolio']) {
      const response = await POST(await request({ _id: type, _type: type }));
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { revalidated: true });
    }
    assert.deepEqual(invalidations, Array.from({ length: 5 }, () => ['sanity-content', { expire: 0 }]));
  } finally {
    if (original === undefined) delete process.env.SANITY_REVALIDATE_SECRET;
    else process.env.SANITY_REVALIDATE_SECRET = original;
    delete globalThis.__testInvalidations;
  }
});
