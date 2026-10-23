import assert from 'node:assert/strict';
import test from 'node:test';
import { getArticleHeadings, getHeadingId } from '../lib/util/article-headings.js';

test('navigation includes only nonempty H1–H3 with distinct stable anchors', () => {
  const block = (key, style, text) => ({ _type: 'block', _key: key, style, children: [{ _type: 'span', text }] });
  const content = [block('one', 'h1', 'Same title'), block('two', 'h2', 'Same title'), block('three', 'h3', 'Details'), block('four', 'h4', 'Hidden'), block('blank', 'h1', '  '), { _type: 'image' }];
  const headings = getArticleHeadings(content);
  assert.deepEqual(headings.map(({ level }) => level), ['h1', 'h2', 'h3']);
  assert.notEqual(headings[0].id, headings[1].id);
  assert.equal(headings[2].id, getHeadingId(content[2], 2));
  assert.deepEqual(getArticleHeadings(null), []);
});
