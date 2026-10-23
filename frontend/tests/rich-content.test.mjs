import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { CodeBlock, HtmlTable } from '../components/RichContentBlocks.js';
import { readFile } from 'node:fs/promises';

const renderCode = (language, code) => renderToStaticMarkup(CodeBlock({ value: { language, code } }));
const renderTable = (html) => renderToStaticMarkup(HtmlTable({ value: { html } }));

test('Java and all editor languages render highlighted tokens with escaped source', () => {
  const examples = {
    java: 'public class Hello { String text = "Hi"; }',
    javascript: 'const text = "Hi";', jsx: '<div title="Hi">Hello</div>',
    css: 'body { color: red; }', html: '<table><tr><td>Hello</td></tr></table>',
    bash: 'echo "Hello"', json: '{"hello": true}',
  };
  for (const [language, code] of Object.entries(examples)) {
    assert.match(renderCode(language, code), /class="hljs-/, language);
  }
  assert.match(renderCode('java', examples.java), /hljs-keyword/);
  assert.match(renderCode('java', examples.java), /hljs-string/);
  assert.doesNotMatch(renderCode('html', '<script>alert(1)</script>'), /<script>/);
  assert.doesNotMatch(renderCode('unknown', '<script>'), /<script>/);
});

test('legacy code without language is highlighted and aliases are supported', () => {
  assert.match(renderCode(undefined, 'const message = "Hello"; console.log(message);'), /hljs-(keyword|string)/);
  assert.match(renderCode(undefined, 'SELECT id, name FROM users WHERE id = 1;'), /hljs-keyword/);
  for (const [language, code] of Object.entries({
    js: 'const value = true;', ts: 'const name: string = "Hello";',
    python: 'def greet(name):\n    return "Hello"', sql: 'SELECT * FROM users;',
    php: '<?php echo "Hello";', cpp: 'int main() { return 0; }', yaml: 'name: hello',
    HTML: '<div>Hello</div>',
  })) assert.match(renderCode(language, code), /class="hljs-/, language);
  assert.doesNotMatch(renderCode('plaintext', '<script>alert(1)</script>'), /<script>|hljs-/);
  assert.match(renderCode('plaintext', '<script>'), /&lt;script&gt;/);
});

test('HTML tables preserve headings, merged cells and formatting with browser-compatible rows', () => {
  const html = renderTable('<table><caption>Prices</caption><tr><th scope="col">Plan</th></tr><tr><td colspan="2" rowspan="3"><strong>Basic &amp; Pro</strong><br>Details</td></tr></table>');
  assert.match(html, /<caption>Prices<\/caption><tbody><tr><th scope="col">Plan/);
  assert.match(html, /colSpan="2" rowSpan="3"/);
  assert.match(html, /<strong>Basic &amp; Pro<\/strong><br\/>Details/);
});

test('table HTML drops executable elements, arbitrary attributes, styles and external content', () => {
  const html = renderTable('<script>alert(1)</script><table onclick="alert(1)" style="color:red"><tr><td><img src="x" onerror="alert(1)"><iframe src="evil"></iframe><svg onload="alert(1)"></svg><a href="javascript:alert(1)">bad</a>Safe</td></tr></table>');
  assert.match(html, /<td>Safe<\/td>/);
  assert.doesNotMatch(html, /script|onclick|style=|onerror|iframe|svg|javascript:|<img|<a /);
  assert.doesNotThrow(() => renderTable(''));
});

test('Studio offers Java and HTML table immediately after Code Snippet', async () => {
  const source = (await readFile(new URL('../sanity/schemaTypes/post.js', import.meta.url), 'utf8')).replace(/^import ContentEditorInput.*$/m, 'const ContentEditorInput = () => null; const HighlightDecorator = () => null;');
  const { default: post } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
  const blocks = post.fields.find(field => field.name === 'content').of;
  const index = blocks.findIndex(block => block.type === 'code');
  assert.ok(blocks[index].options.languageAlternatives.some(language => language.value === 'java'));
  assert.equal(blocks[index + 1].name, 'htmlTable');
});
