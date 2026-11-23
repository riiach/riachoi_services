import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("Work landing renders the reference folder without the intro or stickers", async () => {
  const source = await readFile(new URL("../components/work/WorkExplorer.jsx", import.meta.url), "utf8");
  assert.match(source, /work-folder__back/);
  assert.match(source, /work-folder__front/);
  assert.match(source, /work-folder__title/);
  assert.doesNotMatch(source, /work-intro|work-folder__bottom|ArrowUpRight/);
});

test("Folder photo sheets stay behind the frosted cover and fan out on hover", async () => {
  const css = await readFile(new URL("../app/work/work.css", import.meta.url), "utf8");
  assert.match(css, /work-folder__preview--3/);
  assert.match(css, /backdrop-filter:\s*blur\(23px\)/);
  assert.match(css, /work-folder-link:is\(:hover, :focus-visible\) \.work-folder__preview--3/);
  assert.match(css, /work-folder--amber/);
});

test("Frosted front stays neutral white and project title dot follows each folder color", async () => {
  const css = await readFile(new URL("../app/work/work.css", import.meta.url), "utf8");
  const detail = await readFile(new URL("../components/work/WorkProjectDetail.jsx", import.meta.url), "utf8");
  const front = css.slice(css.indexOf(".work-folder__front {"), css.indexOf(".work-folder__glassshine {"));
  assert.match(front, /rgba\(255, 255, 255, 0\.18\)/);
  assert.doesNotMatch(front, /var\(--folder-light\)|var\(--folder-solid\)/);
  assert.match(css, /\.work-heading-dot \{ color: var\(--folder-solid/);
  for (const name of ["sage", "blue", "rose", "lavender", "amber"]) {
    assert.ok(css.includes(".work-detail--" + name), "Detail colors must include " + name);
  }
  assert.match(detail, /work-detail--" \+ workFolderColor\(project, 0\)/);
});
