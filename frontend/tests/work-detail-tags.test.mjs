import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("Work card uses the blog's shared tag component for its numbered work category", async () => {
  const work = await readFile(new URL("../components/work/WorkProjectDetail.jsx", import.meta.url), "utf8");
  const tag = await readFile(new URL("../components/ui/Tag.jsx", import.meta.url), "utf8");
  assert.match(work, /import Tag from "\.\.\/ui\/Tag";/);
  assert.match(work, /<Tag tag=\{\`\$\{String\(index \+ 1\)\.padStart\(2, "0"\)\} \/ \$\{type\}\`\} \/>/);
  assert.match(tag, /rounded-2xl/);
  assert.match(tag, /font-doto/);
  assert.doesNotMatch(work, /work-piece__kicker/);
});

test("Work images no longer show a duplicated white category label or darkening overlay", async () => {
  const work = await readFile(new URL("../components/work/WorkProjectDetail.jsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/work/work.css", import.meta.url), "utf8");
  assert.doesNotMatch(work, /work-piece__label/);
  assert.doesNotMatch(css, /work-piece__label|work-piece__art::after/);
  assert.match(work, /image\.url/);
});
