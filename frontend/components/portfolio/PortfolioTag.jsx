export default function PortfolioTag({ children, active = false, large = false }) {
  return <span className={`inline-flex rounded-full border leading-relaxed ${large ? "px-4 py-2 text-sm md:px-6 md:py-2.5 md:text-base" : "px-3 py-1 text-xs"} ${active ? "border-foreground bg-foreground text-background" : "border-foreground/25 text-foreground"}`}>{children}</span>;
}
