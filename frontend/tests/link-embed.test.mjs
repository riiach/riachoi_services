import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { getLinkEmbed } from "../lib/util/link-embed.mjs";

test("supported media URLs are converted to fixed, trusted embed hosts", () => {
  assert.equal(getLinkEmbed("https://youtu.be/dQw4w9WgXcQ?t=2").src, "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ");
  assert.equal(getLinkEmbed("https://www.youtube.com/watch?v=dQw4w9WgXcQ").provider, "YouTube");
  assert.equal(getLinkEmbed("https://vimeo.com/123456").src, "https://player.vimeo.com/video/123456");
  assert.equal(getLinkEmbed("https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT").provider, "Spotify");
  assert.equal(getLinkEmbed("https://www.figma.com/design/example/demo").provider, "Figma");
  assert.equal(getLinkEmbed("https://codepen.io/user/pen/abc123").src, "https://codepen.io/user/embed/abc123?default-tab=result");
  assert.equal(getLinkEmbed("https://www.loom.com/share/12345678abcd").provider, "Loom");
});

test("regular HTTPS links get cards rather than arbitrary iframes", () => {
  const result = getLinkEmbed("https://example.com/posts/hello?x=1");
  assert.equal(result.src, null);
  assert.equal(result.site, "example.com");
  assert.equal(result.href, "https://example.com/posts/hello?x=1");
});

test("unsafe URLs are rejected and malformed player links are not embedded", () => {
  for (const raw of ["javascript:alert(1)", "data:text/html,<h1>x</h1>", "file:///etc/passwd", "not a link", "", null]) {
    assert.equal(getLinkEmbed(raw), null);
  }
  assert.equal(getLinkEmbed("https://youtube.com/watch?v=bad").src, null);
  assert.equal(getLinkEmbed("https://other-youtube.com/watch?v=dQw4w9WgXcQ").src, null);
  assert.equal(getLinkEmbed("https://open.spotify.com/redirect/anything").src, null);
});

test("Sanity article editor exposes the link embed block", async () => {
  const source = (await readFile(new URL("../sanity/schemaTypes/post.js", import.meta.url), "utf8"))
    .replace(/^import ContentEditorInput.*$/m, "const ContentEditorInput = () => null; const HighlightDecorator = () => null; const TextColorAnnotation = () => null; const HighlightAnnotation = () => null;");
  const { default: schema } = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
  const linkEmbed = schema.fields.find((field) => field.name === "content").of.find((block) => block.name === "linkEmbed");
  assert.equal(linkEmbed.fields.find((field) => field.name === "url").type, "url");
});
