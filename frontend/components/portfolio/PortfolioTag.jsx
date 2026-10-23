export default function PortfolioTag({ children, active = false }) {
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs leading-relaxed ${active ? "border-foreground bg-foreground text-background" : "border-foreground/25 text-foreground"}`}>{children}</span>;
}
