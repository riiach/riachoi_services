export function getHeadingId(block, index) {
  return `section-${block?._key || index}`;
}

export function getArticleHeadings(content) {
  return (Array.isArray(content) ? content : []).flatMap((block, index) => {
    if (block?._type !== "block" || !/^h[123]$/.test(block.style)) return [];
    const title = (block.children || []).filter((child) => child._type === "span").map((child) => child.text || "").join("").trim();
    return title ? [{ id: getHeadingId(block, index), title, level: block.style }] : [];
  });
}
