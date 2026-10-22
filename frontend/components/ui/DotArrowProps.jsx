export default function DotArrow({
  color = "currentColor",
  size = 100,
  dotRadius = 3.5,
  className = "",
}) {
  const shaft = Array.from({ length: 3 }, (_, i) => ({
    x: 44 + i * 12,
    y: 56 - i * 12,
  }));

  const head = Array.from({ length: 4 }, (_, i) => [
    { x: 44 + i * 12, y: 20 },
    { x: 80, y: 20 + i * 12 },
  ]).flat();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {[...shaft, ...head].map((dot, index) => (
        <circle key={index} cx={dot.x} cy={dot.y} r={dotRadius} />
      ))}
    </svg>
  );
}
