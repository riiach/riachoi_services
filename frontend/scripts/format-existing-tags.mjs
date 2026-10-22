// Run with your existing Studio login:
// npx sanity exec scripts/format-existing-tags.mjs --with-user-token
// Add -- --apply after reviewing the preview to save the changes.
import { getCliClient } from 'sanity/cli';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const names = {
  SpringBoot: 'Spring Boot',
  PersistentMemory: 'Persistent Memory',
  SemanticSearch: 'Semantic Search',
  TanStackQuery: 'TanStack Query',
  RTKQuery: 'RTK Query',
  FramerMotion: 'Framer Motion',
  UnitTest: 'Unit Test',
  ReactEmail: 'React Email',
  DataIntegrity: 'Data Integrity',
  DefensiveCopy: 'Defensive Copy',
  ContextCaching: 'Context Caching',
};

const client = getCliClient({ apiVersion: '2025-01-01' }).withConfig({
  projectId: 'lvpvhyay', dataset: 'blog', useCdn: false, perspective: 'raw',
});
const posts = await client.fetch('*[_type == "post" && defined(keyword) && !(_id in path("versions.**"))]{_id,_rev,title,keyword}');
const changes = posts.flatMap((post) => {
  // Already comma-separated values retain their multi-word tag boundaries.
  const parts = post.keyword.includes(',') ? post.keyword.split(',') : post.keyword.split(/\s+/);
  const keyword = parts.map((part) => part.trim()).filter(Boolean).map((part) => names[part] || part).join(', ');
  return keyword === post.keyword ? [] : [{ ...post, nextKeyword: keyword }];
});
for (const post of changes) console.log(`${post.title}\n  ${post.keyword}\n→ ${post.nextKeyword}\n`);
if (!process.argv.includes('--apply')) {
  console.log(`${changes.length} changes previewed; no documents were modified.`);
} else if (changes.length) {
  const backup = join(tmpdir(), `riachoi-tags-${Date.now()}.json`);
  await writeFile(backup, JSON.stringify(changes, null, 2), { mode: 0o600, flag: 'wx' });
  let transaction = client.transaction();
  for (const post of changes) {
    transaction = transaction.patch(post._id, (patch) => patch.ifRevisionId(post._rev).set({ keyword: post.nextKeyword }));
  }
  // Revision guards prevent overwriting concurrent Studio edits.
  await transaction.commit();
  console.log(`Saved ${changes.length} documents. Original values: ${backup}`);
} else console.log('All tags are already formatted.');
