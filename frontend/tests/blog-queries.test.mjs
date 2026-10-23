import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { parse, evaluate } from 'groq-js';

const source = await readFile(new URL('../sanity/queries.js', import.meta.url), 'utf8');
const { POSTS_QUERY, POST_BY_SLUG_QUERY, CATEGORY_QUERY, ABOUT_POSTS_QUERY } = await import(
  `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`
);
const dataset = [
  { _id: 'category', _type: 'category', title: 'Development', slug: { current: 'dev' } },
  { _id: 'author', _type: 'author', name: 'Ria' },
  {
    _id: 'post', _type: 'post', title: 'A post', slug: { current: 'a-post' },
    summary: 'Summary', keyword: 'nextjs', publishedAt: '2026-05-11T00:00:00Z',
    content: [{ _type: 'block', children: [{ _type: 'span', text: 'Full article '.repeat(1000) }] }],
    categories: [{ _ref: 'category' }], author: { _ref: 'author' },
  },
];
async function query(groq, params = {}) {
  return (await evaluate(parse(groq), { dataset, params })).get();
}

test('list payload excludes bodies while preserving cards and search data', async () => {
  const posts = await query(POSTS_QUERY);
  assert.equal(posts.length, 1);
  assert.equal(posts[0].slug, 'a-post');
  assert.equal(posts[0].summary, 'Summary');
  assert.equal(posts[0].keyword, 'nextjs');
  assert.equal(posts[0].author.name, 'Ria');
  assert.equal(posts[0].categories[0].title, 'Development');
  assert.equal(Object.hasOwn(posts[0], 'content'), false);
  assert.ok(JSON.stringify(posts).length < JSON.stringify(dataset[2]).length / 10);
});

test('detail still includes the full article body', async () => {
  const post = await query(POST_BY_SLUG_QUERY, { slug: 'a-post' });
  assert.deepEqual(post.content, dataset[2].content);
  assert.equal(post.author.name, 'Ria');
});

test('unknown slugs return null for the page notFound handler', async () => {
  assert.equal(await query(POST_BY_SLUG_QUERY, { slug: 'missing' }), null);
});


test('subcategory queries resolve parent links in categories and post payloads', async () => {
  const category = { _id: 'dev', _type: 'category', title: 'Development', order: 0 };
  const child = { _id: 'react', _type: 'subCategory', title: 'React', order: 1, parent: { _ref: 'dev' } };
  const post = { _id: 'p', _type: 'post', slug: { current: 'react-post' }, categories: [{ _ref: 'react' }] };
  const data = [category, child, post];
  const categories = await (await evaluate(parse(CATEGORY_QUERY), { dataset: data })).get();
  assert.equal(categories.length, 2);
  assert.equal(categories[1].parent._id, 'dev');
  assert.equal(categories[1]._type, 'subCategory');
  for (const query of [POSTS_QUERY, POST_BY_SLUG_QUERY]) {
    const result = await (await evaluate(parse(query), { dataset: data, params: { slug: 'react-post' } })).get();
    const document = Array.isArray(result) ? result[0] : result;
    assert.equal(document.categories[0].parent.title, 'Development');
  }
});


test('About loads only About me category articles with full content, newest first', async () => {
  const category = { _id: 'about', _type: 'category', title: 'About me', slug: { current: 'about-me' } };
  const posts = [2025, 2026].map(year => ({ ...dataset[2], _id: 'about-' + year, categories: [{ _ref: 'about' }], publishedAt: `${year}-01-01T00:00:00Z` }));
  const result = await (await evaluate(parse(ABOUT_POSTS_QUERY), { dataset: [...dataset, category, ...posts] })).get();
  assert.deepEqual(result.map(post => post._id), ['about-2026', 'about-2025']);
  assert.deepEqual(result[0].content, dataset[2].content);
});
