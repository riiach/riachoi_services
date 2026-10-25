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

test('Studio offers Java, memo and HTML table after Code Snippet', async () => {
  const source = (await readFile(new URL('../sanity/schemaTypes/post.js', import.meta.url), 'utf8')).replace(/^import ContentEditorInput.*$/m, 'const ContentEditorInput = () => null; const HighlightDecorator = () => null; const TextColorAnnotation = () => null; const HighlightAnnotation = () => null;');
  const { default: post } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
  const blocks = post.fields.find(field => field.name === 'content').of;
  const index = blocks.findIndex(block => block.type === 'code');
  assert.ok(blocks[index].options.languageAlternatives.some(language => language.value === 'java'));
  assert.equal(blocks[index + 1].name, 'htmlTable');
  assert.equal(blocks.find(block => block.name === 'memo').fields[0].type, 'text');
});

test('Studio provides matching ten-color text and highlight palettes', async () => {
  const source = (await readFile(new URL('../sanity/schemaTypes/post.js', import.meta.url), 'utf8')).replace(/^import ContentEditorInput.*$/m, 'const ContentEditorInput = () => null; const HighlightDecorator = () => null; const TextColorAnnotation = () => null; const HighlightAnnotation = () => null;');
  const { default: schema } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
  const annotations = schema.fields.find(field => field.name === 'content').of[0].marks.annotations;
  for (const name of ['textColor', 'backgroundColor']) {
    const annotation = annotations.find(item => item.name === name);
    assert.deepEqual(annotation.fields[0].options.list.map(item => item.title), ['Red', 'Orange', 'Yellow', 'Green', 'Teal', 'Sky', 'Blue', 'Purple', 'Pink', 'Gray']);
    assert.equal(typeof annotation.components.annotation, 'function');
  }
});


test('code captions show authored languages, aliases, auto detection and plain text', () => {
  for (const [language, label, code] of [
    ['javascript', 'JavaScript', 'const value = true;'],
    ['js', 'JavaScript', 'const value = true;'],
    ['tsx', 'TSX', 'const value: string = "hello";'],
    ['jsx', 'JSX', '<div>Hello</div>'],
    ['html', 'HTML', '<div>Hello</div>'],
    ['java', 'Java', 'public class Hello {}'],
    ['plaintext', 'Plain text', '<script>literal</script>'],
    [undefined, 'SQL', 'SELECT id FROM users;'],
  ]) {
    const html = renderCode(language, code);
    assert.match(html, new RegExp(`<figcaption[^>]*><span>${label}</span>`));
    assert.match(html, new RegExp(`aria-label="${label} code"`));
  }
});

test('GIF and standard images share all size controls and a full-width default', async () => {
  const source = (await readFile(new URL('../sanity/schemaTypes/post.js', import.meta.url), 'utf8')).replace(/^import ContentEditorInput.*$/m, 'const ContentEditorInput = () => null; const HighlightDecorator = () => null; const TextColorAnnotation = () => null; const HighlightAnnotation = () => null;');
  const { default: post } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
  const blocks = post.fields.find(field => field.name === 'content').of;
  const normal = blocks.find(block => block.type === 'image' && !block.name).fields.find(field => field.name === 'size');
  const gif = blocks.find(block => block.name === 'gif').fields.find(field => field.name === 'size');
  assert.deepEqual(gif, normal);
  assert.equal(gif.initialValue, 'full');
  assert.deepEqual(gif.options.list.map(option => option.value), ['small', 'medium', 'large', 'full']);
});
