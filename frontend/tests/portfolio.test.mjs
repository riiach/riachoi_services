import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { getPortfolioImages } from '../lib/util/portfolio-images.js';
import test from 'node:test';
import { parse, evaluate } from 'groq-js';
import { filterPortfolioProjects, getProjectHref, getProjectTags, getPortfolioTags, groupPortfolioProjects } from '../lib/util/portfolio.js';

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
  const dataset = projects.map(item => ({ ...item, isOngoing: item._id === 'latest', _type: 'portfolio', slug: { current: item._id }, thumbnails: [{ _type: 'image', _key: 'image', asset: { _ref: 'image-test-100-100-png' } }, { _type: 'imageUrl', _key: 'remote', url: 'https://images.example.com/project.png', alt: 'Project preview' }], content: [{ _type: 'block', children: [{ _type: 'span', text: 'Project body' }] }] }));
  dataset.push({ _id: 'linked', _type: 'portfolio', title: 'Linked project', link: 'https://example.com/project', projectDate: '2026-08-01', tags: ['Figma'], isTeam: true, isBootCamp: true, isOngoing: true });
  dataset.push({ _id: 'blog', _type: 'post', slug: { current: 'blog' } });
  dataset.push({ _id: 'no-slug', _type: 'portfolio' });
  const list = await (await evaluate(parse(PORTFOLIO_QUERY), { dataset })).get();
  assert.equal(list.length, 5);
  const linked = list.find(project => project._id === "linked");
  assert.equal(linked.link, "https://example.com/project");
  assert.equal(linked.isTeam, true);
  assert.equal(linked.isBootCamp, true);
  assert.equal(linked.isOngoing, true);
  assert.equal(linked.slug, null);
  assert.equal(list[0].slug, 'latest');
  assert.equal('content' in list[0], false);
  assert.equal(list[0].thumbnails[0]._key, 'image');
  assert.equal(list[0].thumbnails[1]._type, 'imageUrl');
  assert.equal(list[0].thumbnails[1].url, 'https://images.example.com/project.png');
  const detail = await (await evaluate(parse(PORTFOLIO_BY_SLUG_QUERY), { dataset, params: { slug: 'latest' } })).get();
  assert.equal(detail.content[0].children[0].text, 'Project body');
  assert.equal(detail.isOngoing, true);
  assert.equal(await (await evaluate(parse(PORTFOLIO_BY_SLUG_QUERY), { dataset, params: { slug: 'missing' } })).get(), null);
});

test('Portfolio editor exposes tools, destination link and classification checkboxes', async () => {
  const source = (await readFile(new URL('../sanity/schemaTypes/portfolio.js', import.meta.url), 'utf8')).replace(/^import post.*$/m, 'const post = { fields: [{name:"content",type:"array"}] };');
  const { default: schema } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
  assert.equal(schema.name, 'portfolio');
  const limits = [];
  const Rule = { required() { limits.push('required'); return this; }, min(n) { limits.push(['min', n]); return this; }, max(n) { limits.push(['max', n]); return this; }, uri(options) { limits.push(['uri', options]); return this; } };
  const thumbnails = schema.fields.find(field => field.name === 'thumbnails');
  assert.equal(thumbnails.of[0].type, 'image');
  assert.equal(thumbnails.of[1].name, 'imageUrl');
  assert.equal(thumbnails.of[1].fields.find(field => field.name === 'url').type, 'url');
  thumbnails.validation(Rule);
  assert.deepEqual(limits, ['required', ['min', 1], ['max', 4]]);
  for (const name of ['link', 'projectDate']) assert.equal(schema.fields.find(field => field.name === name).validation(Rule), Rule);
  assert.equal(schema.fields.find(field => field.name === 'content').hidden, true);
  assert.equal(schema.fields.find(field => field.name === 'tags').title, '사용 툴');
  for (const name of ['isTeam', 'isBootCamp', 'isOngoing']) {
    const field = schema.fields.find(field => field.name === name);
    assert.equal(field.type, 'boolean');
    assert.equal(field.options.layout, 'checkbox');
    assert.equal(field.initialValue, false);
  }
});


test('tools and checked classifications become deduplicated card tags and filters', () => {
  const project = { tags: ['Figma', 'Team'], isTeam: true, isBootCamp: true };
  assert.deepEqual(getProjectTags(project), ['Figma', 'Team', 'Boot Camp']);
  assert.equal(filterPortfolioProjects([project], 'Boot Camp').length, 1);
  assert.deepEqual(getProjectTags({ tags: ['Figma'], isTeam: false, isBootCamp: false }), ['Figma']);
});

test('project cards use the entered link and preserve legacy routes when absent', () => {
  assert.equal(getProjectHref({ link: ' https://example.com/work ', slug: 'old' }), 'https://example.com/work');
  assert.equal(getProjectHref({ link: '/blog/my-project', slug: 'old' }), '/blog/my-project');
  assert.equal(getProjectHref({ slug: 'old' }), '/portfolio/old');
  assert.equal(getProjectHref({ link: 'javascript:alert(1)', slug: 'old' }), '/portfolio/old');
  assert.equal(getProjectHref({}), '/portfolio');
});


test('Ongoing is stored independently without changing start-date grouping or tags', () => {
  const ongoing = { ...projects[0], isOngoing: true };
  const grouped = groupPortfolioProjects([ongoing, projects[1]]);
  assert.deepEqual(grouped.map(group => group.year), ["2026", "2025"]);
  assert.equal(grouped[1].months[0].key, "2025-12");
  assert.equal(grouped[1].months[0].projects[0].isOngoing, true);
  assert.deepEqual(getProjectTags(ongoing), getProjectTags(projects[0]));
});


test('uploaded and URL thumbnails share order, alt text and a four-image limit', () => {
  const built = [];
  const project = { title: 'My project', thumbnails: [
    { _type: 'image', _key: 'upload', asset: { _ref: 'asset' } },
    { _type: 'imageUrl', _key: 'remote', url: 'https://external.example.com/a.png', alt: 'External photo' },
    { _type: 'imageUrl', url: 'javascript:alert(1)' },
    { _type: 'imageUrl', url: '' },
    { _type: 'imageUrl', url: 'https://external.example.com/b.png' },
    { _type: 'imageUrl', url: 'https://external.example.com/c.png' },
    { _type: 'imageUrl', url: 'https://external.example.com/d.png' },
  ] };
  const images = getPortfolioImages(project, image => { built.push(image._key); return 'https://cdn.sanity.io/upload.jpg'; });
  assert.equal(images.length, 4);
  assert.deepEqual(built, ['upload']);
  assert.deepEqual(images.map(image => image.src), ['https://cdn.sanity.io/upload.jpg', 'https://external.example.com/a.png', 'https://external.example.com/b.png', 'https://external.example.com/c.png']);
  assert.equal(images[0].unoptimized, false);
  assert.equal(images[1].unoptimized, true);
  assert.equal(images[1].alt, 'External photo');
  assert.equal(images[0].alt, 'My project — image 1');
  assert.deepEqual(getPortfolioImages({}, () => 'unused'), []);
});

test('Next Image accepts a URL thumbnail from an arbitrary host without server optimization', () => {
  const { getImageProps } = createRequire(import.meta.url)('next/image');
  const [image] = getPortfolioImages({ title: 'Remote', thumbnails: [{ _type: 'imageUrl', url: 'https://new-image-host.example.com/photo.png' }] }, () => { throw new Error('URL must not use Sanity builder'); });
  const { props } = getImageProps({ src: image.src, unoptimized: image.unoptimized, fill: true, alt: image.alt });
  assert.equal(props.src, image.src);
  assert.equal(props.srcSet, undefined);
});
