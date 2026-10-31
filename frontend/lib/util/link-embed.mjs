// Embeds only approved media hosts. All other URLs become ordinary link previews;
// never hand an arbitrary site address to an iframe.
const youtubeId = (value) => /^[A-Za-z0-9_-]{11}$/.test(value || "");
const spotifyId = (value) => /^[A-Za-z0-9]{12,32}$/.test(value || "");

export function getLinkEmbed(input) {
  if (typeof input !== "string") return null;
  let url;
  try {
    url = new URL(input.trim());
  } catch {
    return null;
  }
  if (!["https:", "http:"].includes(url.protocol) || !url.hostname) return null;
  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  const parts = url.pathname.split("/").filter(Boolean);
  const href = url.href;
  const site = host.replace(/^www\./, "");

  let src;
  let provider;
  let tall = false;

  if (["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be", "www.youtu.be", "youtube-nocookie.com", "www.youtube-nocookie.com"].includes(host)) {
    const id = host.endsWith("youtu.be") ? parts[0] :
      parts[0] === "watch" ? url.searchParams.get("v") :
      ["shorts", "embed", "live"].includes(parts[0]) ? parts[1] : null;
    if (youtubeId(id)) {
      src = `https://www.youtube-nocookie.com/embed/${id}`;
      provider = "YouTube";
    }
  } else if (["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(host)) {
    const id = parts[0] === "video" ? parts[1] : parts[0];
    if (/^\d{1,15}$/.test(id || "")) {
      src = `https://player.vimeo.com/video/${id}`;
      provider = "Vimeo";
    }
  } else if (host === "open.spotify.com") {
    const [kind, id] = parts;
    if (["track", "album", "playlist", "episode", "show"].includes(kind) && spotifyId(id)) {
      src = `https://open.spotify.com/embed/${kind}/${id}`;
      provider = "Spotify";
      tall = true;
    }
  } else if (["figma.com", "www.figma.com"].includes(host)) {
    if (["design", "file", "proto", "board"].includes(parts[0]) && parts[1]) {
      src = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(href)}`;
      provider = "Figma";
    }
  } else if (host === "codepen.io") {
    if (parts.length >= 3 && parts[1] === "pen" && /^[\w-]+$/.test(parts[0]) && /^[\w-]+$/.test(parts[2])) {
      src = `https://codepen.io/${parts[0]}/embed/${parts[2]}?default-tab=result`;
      provider = "CodePen";
    }
  } else if (["loom.com", "www.loom.com"].includes(host)) {
    if (parts[0] === "share" && /^[\w-]{8,64}$/.test(parts[1] || "")) {
      src = `https://www.loom.com/embed/${parts[1]}`;
      provider = "Loom";
    }
  }

  return { href, site, src: src || null, provider: provider || null, tall };
}
