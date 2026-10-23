import assert from 'node:assert/strict';
import test from 'node:test';
import { matchesCategory } from '../lib/util/category-filter.js';

const legacy = { categories: [{ _id: 'dev', title: 'Development' }] };
const react = { categories: [{ _id: 'react', title: 'React', parent: { _id: 'dev', title: 'Development' } }] };
const sql = { categories: [{ _id: 'sql', title: 'SQL', parent: { _id: 'data', title: 'Data' } }] };

test('parent filters include legacy parent assignments and child-only assignments', () => {
  assert.equal(matchesCategory(legacy, 'Development'), true);
  assert.equal(matchesCategory(react, 'Development'), true);
  assert.equal(matchesCategory(sql, 'Development'), false);
});

test('child filter selects the exact subcategory and handles missing references', () => {
  assert.equal(matchesCategory(react, 'Development', 'react'), true);
  assert.equal(matchesCategory(legacy, 'Development', 'react'), false);
  assert.equal(matchesCategory(sql, 'Development', 'react'), false);
  assert.equal(matchesCategory({ categories: [null] }, 'Development', 'react'), false);
  assert.equal(matchesCategory({}, 'all'), true);
  assert.equal(matchesCategory({}, 'Development'), false);
});
