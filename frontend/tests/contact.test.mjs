import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import test from 'node:test';
import { contactSchema } from '../lib/validations/contact.js';

const asModule = (source) => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const resendStub = asModule('export const resend = { emails: { send: (payload) => globalThis.__contactSend(payload) } };');
const service = asModule((await readFile(new URL('../lib/service/contact-email.js', import.meta.url), 'utf8'))
  .replace('"@/lib/resend"', JSON.stringify(resendStub)));
const route = (await readFile(new URL('../app/api/contact/route.js', import.meta.url), 'utf8'))
  .replace('"@/lib/validations/contact"', JSON.stringify(pathToFileURL(new URL('../lib/validations/contact.js', import.meta.url).pathname).href))
  .replace('"@/lib/service/contact-email"', JSON.stringify(service));
const { POST } = await import(asModule(route));
const request = (body) => new Request('http://localhost/api/contact', { method: 'POST', body: JSON.stringify(body) });

test('contact validates email and allows an empty message', () => {
  assert.deepEqual(contactSchema.parse({ email: '  sender@example.com  ' }), { email: 'sender@example.com', message: '' });
  for (const email of ['', 'invalid', 'person@', 'person@example.com\r\nBcc: victim@example.com']) {
    assert.equal(contactSchema.safeParse({ email }).success, false);
  }
});

test('contact endpoint uses existing Resend settings and reports actual delivery outcomes', async (t) => {
  const names = ['RESEND_API_KEY', 'RESEND_FROM_EMAIL', 'ADMIN_EMAIL'];
  const saved = names.map((name) => process.env[name]);
  process.env.RESEND_API_KEY = 'test-only-key';
  process.env.RESEND_FROM_EMAIL = 'Studio <studio@example.com>';
  process.env.ADMIN_EMAIL = 'admin@example.com';
  const calls = [];
  globalThis.__contactSend = async (payload) => { calls.push(payload); return { data: { id: 'test-message' }, error: null }; };
  try {
    await t.test('invalid email and malformed JSON return 400 without sending', async () => {
      assert.equal((await POST(request({ email: 'invalid' }))).status, 400);
      assert.equal((await POST(new Request('http://localhost/api/contact', { method: 'POST', body: '{' }))).status, 400);
      assert.equal(calls.length, 0);
    });
    await t.test('sends to configured admin from verified sender with user reply-to and literal message', async () => {
      const response = await POST(request({ email: ' user@example.com ', message: '<script>example</script>' }));
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { success: true });
      assert.deepEqual(calls[0], { from: 'Studio <studio@example.com>', to: ['admin@example.com'], replyTo: 'user@example.com', subject: 'New website enquiry', text: 'From: user@example.com\n\n<script>example</script>' });
    });
    await t.test('email-only contact can be sent', async () => {
      assert.equal((await POST(request({ email: 'user@example.com' }))).status, 200);
    });
    await t.test('missing config returns 503 without reporting success', async () => {
      delete process.env.RESEND_API_KEY;
      assert.equal((await POST(request({ email: 'user@example.com' }))).status, 503);
      process.env.RESEND_API_KEY = 'test-only-key';
    });
    await t.test('provider errors, empty results and exceptions return 502', async () => {
      for (const result of [{ data: null, error: { message: 'provider detail' } }, { data: null, error: null }]) {
        globalThis.__contactSend = async () => result;
        const response = await POST(request({ email: 'user@example.com' }));
        assert.equal(response.status, 502);
        assert(!JSON.stringify(await response.json()).includes('provider detail'));
      }
      globalThis.__contactSend = async () => { throw new Error('private provider error'); };
      assert.equal((await POST(request({ email: 'user@example.com' }))).status, 502);
    });
  } finally {
    names.forEach((name, i) => { if (saved[i] === undefined) delete process.env[name]; else process.env[name] = saved[i]; });
    delete globalThis.__contactSend;
  }
});
