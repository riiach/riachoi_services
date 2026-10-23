export function getPortfolioImages(project, uploadedImageUrl) {
  return (project?.thumbnails || []).flatMap((image, position) => {
    let src;
    let unoptimized = false;
    if (image?._type === "imageUrl") {
      try {
        const url = new URL(image.url);
        if (!["http:", "https:"].includes(url.protocol)) return [];
        src = url.href;
        // User-provided hosts load directly, without changing the global optimizer allowlist.
        unoptimized = true;
      } catch { return []; }
    } else if (image?.asset) {
      src = uploadedImageUrl(image);
    } else {
      return [];
    }
    return [{ key: image._key || String(position), src, alt: image.alt || `${project.title} — image ${position + 1}`, unoptimized }];
  }).slice(0, 4);
}
