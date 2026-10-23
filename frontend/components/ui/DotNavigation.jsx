const dots = Array.from({ length: 7 }, (_, row) =>
  Array.from({ length: 7 }, (_, column) => ({ row, column }))
    .filter(({ row, column }) => Math.abs(row - 3) + Math.abs(column - 3) <= 3)
).flat();

export default function DotNavigation({ open = false, className = "" }) {
  return (
    <svg viewBox="0 0 84 84" fill="currentColor" aria-hidden="true" className={className}>
      {dots.map(({ row, column }) => {
        const center = column === 3 && row >= 2 && row <= 4;
        // Spread the diamond while the three center dots join the outer ring.
        const moveX = open ? (center ? (row === 2 ? -11 : row === 4 ? 11 : 22) : column - 3) : 0;
        const moveY = open ? row - 3 : 0;
        return <circle key={`${row}-${column}`} cx={42 + (column - 3) * 10} cy={42 + (row - 3) * 10} r="4.3" style={{ transform: `translate(${moveX}px, ${moveY}px)`, opacity: open && center ? 0 : 1 }} className="transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none" />;
      })}
    </svg>
  );
}
