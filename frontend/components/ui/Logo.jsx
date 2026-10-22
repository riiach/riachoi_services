export default function Logo({ className = "text-2xl" }) {
  return (
    <span className={`font-logo inline-flex items-baseline whitespace-nowrap font-normal tracking-tight text-foreground ${className}`}>
      Ria Choi
    </span>
  );
}
