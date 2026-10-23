const dots = [
  { x: 0, y: 0 },
  { x: 0, y: -9 },
  { x: 9, y: 0 },
  { x: 0, y: 9 },
  { x: -9, y: 0 },
];

export default function DotNavigation({ open = false, className = "" }) {
  return (
    <svg viewBox="0 0 36 36" fill="currentColor" aria-hidden="true" className={className}>
      {dots.map(({ x, y }, index) => <circle key={index} cx="18" cy="18" r="2.8" style={{ transform: `translate(${open ? x : 0}px, ${open ? y : 0}px)`, opacity: index === 0 || open ? 1 : 0 }} className="transition-[transform,opacity] duration-400 ease-out motion-reduce:transition-none" />)}
    </svg>
  );
}
