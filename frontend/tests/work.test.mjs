import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parse, evaluate } from "groq-js";
import { workFolderImages, workFolderColor, WORK_COLORS } from "../lib/work.js";
import { WORK_PROJECTS_QUERY, WORK_PROJECT_QUERY } from "../sanity/queries.js";

test("Work pages render published Sanity documents without a hardcoded Plante fallback", async () => {
  const data = await readFile(new URL("../sanity/data.js", import.meta.url), "utf8");
  const routes = [
    await readFile(new URL("../app/work/page.js", import.meta.url), "utf8"),
    await readFile(new URL("../app/work/[slug]/page.js", import.meta.url), "utf8"),
  ];
  assert.doesNotMatch(data, /PLANTE_PREVIEW|withPlante|preview-plante/);
  assert.match(data, /client\.fetch\(WORK_PROJECTS_QUERY/);
  assert.match(data, /client\.fetch\(WORK_PROJECT_QUERY/);
  assert.match(data, /cache: "no-store"/);
  for (const route of routes) assert.match(route, /dynamic = "force-dynamic"/);
});

test("Sanity Studio calls the existing workEntry document type Project Detail", async () => {
  const studio = await readFile(new URL("../sanity/studioStructure.js", import.meta.url), "utf8");
  const detail = await readFile(new URL("../sanity/schemaTypes/workEntry.js", import.meta.url), "utf8");
  assert.match(studio, /documentTypeListItem\("workEntry"\)\.title\("Project Detail"\)/);
  assert.match(detail, /name: "workEntry"/);
  assert.match(detail, /title: "Project Detail"/);
});

test("folders only fan out up to three actual photos, and support five fog colors", () => {
  const photos = Array.from({ length: 5 }, (_, i) => ({ url: "https://example.com/" + i + ".png" }));
  assert.equal(workFolderImages({ thumbnails: photos }).length, 3);
  assert.equal(workFolderImages({ thumbnails: [] }).length, 0);
  assert.equal(workFolderImages({ entries: [{ image: photos[0] }, { image: photos[1] }] }).length, 2);
  assert.equal(WORK_COLORS.length, 5);
  assert.deepEqual(WORK_COLORS.map((_, i) => workFolderColor({}, i)), WORK_COLORS.map(() => "amber"));
  assert.equal(workFolderColor({ folderColor: "rose" }, 0), "rose");
  for (const color of WORK_COLORS) assert.equal(workFolderColor({ folderColor: color }, 0), color);
});

test("GROQ Work project query resolves work pieces and keeps optional metadata", async () => {
  const dataset = [
    {
      _id: "plante-id", _type: "workProject", title: "Plante",
      slug: { current: "plante" }, folderColor: "sage",
      workTypes: ["Email", "Website", "Brand System"], order: 0,
      thumbnails: [],
    },
    {
      _id: "email-id", _type: "workEntry", project: { _ref: "plante-id" },
      title: "Welcome email", workType: "Email", description: "Email automation", order: 0,
      price: 150, currency: "USD", duration: "1 week", client: "Plante",
    },
    {
      _id: "website-id", _type: "workEntry", project: { _ref: "plante-id" },
      title: "Shopify website", workType: "Website", order: 1,
    },
  ];
  const projects = await (await evaluate(parse(WORK_PROJECTS_QUERY), { dataset })).get();
  assert.equal(projects.length, 1);
  assert.equal(projects[0].entries.length, 2);
  assert.deepEqual(projects[0].entries.map((entry) => entry.workType), ["Email", "Website"]);
  assert.equal(projects[0].entries[0].price, 150);
  assert.equal(projects[0].entries[1].description, null);
  const detail = await (await evaluate(parse(WORK_PROJECT_QUERY), { dataset, params: { slug: "plante" } })).get();
  assert.equal(detail.title, "Plante");
  assert.equal(detail.entries.length, 2);
});
