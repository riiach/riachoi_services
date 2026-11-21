// A horizontal swipe must be deliberate; diagonal and vertical scrolling stay with the page.
export function getSwipeDirection(dx, dy, width = 320) {
  if (!Number.isFinite(dx) || !Number.isFinite(dy)) return 0;
  const threshold = Math.max(36, Math.min(72, width * 0.14));
  if (Math.abs(dx) < threshold || Math.abs(dx) <= Math.abs(dy) * 1.15) return 0;
  return dx < 0 ? 1 : -1;
}

// Position is one-based because the rendered track has duplicated edge slides.
export function getWrappedImageIndex(position, count) {
  if (count <= 0) return 0;
  return ((position - 1) % count + count) % count;
}
