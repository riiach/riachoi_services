import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { parse, evaluate } from 'groq-js';
import { filterPortfolioProjects, getProjectTags, getPortfolioTags, groupPortfolioProjects } from '../lib/util/portfolio.js';

const projects = [
  { _id: 'old', title: 'Old', projectDate: '2025-12-02', tags: ['UI', 'Semantic Search'] },
  { _id: 'latest', title: 'Latest', projectDate: '2026-10-21', tags: [' React ', 'UI', 'react', ''] },
  { _id: 'earlier', title: 'Earlier', projectDate: '2026-09-12', tags: ['UI'] },
  { _id: 'same-month', title: 'Same month', projectDate: '2026-10-01', tags: ['API'] },
];

test('portfolio groups dates newest first by year and month without mutating source', () => {
  const years = groupPortfolioProjects(projects);
  assert.deepEqual(years.map(item => item.year), ['2026', '2025']);
  assert.deepEqual(years[0].months.map(item => item.label), ['October', 'September']);
  assert.deepEqual(years[0].months[0].projects.map(item => item._id), ['latest', 'same-month']);
  assert.equal(projects[0]._id, 'old');
  assert.deepEqual(groupPortfolioProjects([]), []);
  assert.equal(groupPortfolioProjects([{ title: 'Undated' }])[0].year, 'Undated');
});

test('portfolio filter derives normalized tags and matches complete tags across months', () => {
  assert.deepEqual(getProjectTags(projects[1]), ['React', 'UI']);
  assert.deepEqual(getPortfolioTags(projects), ['UI', 'Semantic Search', 'React', 'API']);
  assert.equal(filterPortfolioProjects(projects, 'ui').length, 3);
  assert.equal(filterPortfolioProjects(projects, 'Semantic').length, 0);
  assert.equal(filterPortfolioProjects(projects, 'semantic search')[0]._id, 'old');
  assert.equal(filterPortfolioProjects(projects, null).length, 4);
});

test('portfolio list queries keep article bodies in detail only and resolve project slugs', async () => {
  const source = await readFile(new URL('../sanity/queries.js', import.meta.url), 'utf8');
  const { PORTFOLIO_QUERY, PORTFOLIO_BY_SLUG_QUERY } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
  const dataset = projects.map(item => ({ ...item, _type: 'portfolio', slug: { current: item._id }, thumbnails: [{ _key: 'image', asset: { _ref: 'image-test-100-100-png' } }], content: [{ _type: 'block', children: [{ _type: 'span', text: 'Project body' }] }] }));
  dataset.push({ _id: 'blog', _type: 'post', slug: { current: 'blog' } });
  dataset.push({ _id: 'no-slug', _type: 'portfolio' });
  const list = await (await evaluate(parse(PORTFOLIO_QUERY), { dataset })).get();
  assert.equal(list.length, 4);
  assert.equal(list[0].slug, 'latest');
  assert.equal('content' in list[0], false);
  assert.equal(list[0].thumbnails[0]._key, 'image');
  const detail = await (await evaluate(parse(PORTFOLIO_BY_SLUG_QUERY), { dataset, params: { slug: 'latest' } })).get();
  assert.equal(detail.content[0].children[0].text, 'Project body');
  assert.equal(await (await evaluate(parse(PORTFOLIO_BY_SLUG_QUERY), { dataset, params: { slug: 'missing' } })).get(), null);
});

test('Portfolio Studio schema requires a date, slug and one to four images', async () => {
  const source = (await readFile(new URL('../sanity/schemaTypes/portfolio.js', import.meta.url), 'utf8')).replace(/^import post.*$/m, 'const post = { fields: [{name:"content",type:"array"}] };');
  const { default: schema } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
  assert.equal(schema.name, 'portfolio');
  const limits = [];
  const Rule = { required() { limits.push('required'); return this; }, min(n) { limits.push(['min', n]); return this; }, max(n) { limits.push(['max', n]); return this; } };
  schema.fields.find(field => field.name === 'thumbnails').validation(Rule);
  assert.deepEqual(limits, ['required', ['min', 1], ['max', 4]]);
  for (const name of ['slug', 'projectDate']) assert.equal(schema.fields.find(field => field.name === name).validation(Rule), Rule);
  assert.equal(schema.fields.find(field => field.name === 'content').type, 'array');
});
