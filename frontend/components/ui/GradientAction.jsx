import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function GradientAction({ href, children, className = "", ...props }) {
  const classes = `inline-flex h-12 w-32 shrink-0 items-center justify-center gap-3 rounded-full border border-white/60 bg-gradient-to-br from-white via-white/90 to-neutral-300 px-4 text-sm font-medium text-neutral-800 shadow-[0_3px_10px_#00000026,inset_0_1px_1px_#ffffff] transition-[transform,box-shadow,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_5px_14px_#00000026,inset_0_1px_1px_#ffffff] active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 disabled:cursor-wait disabled:opacity-60 motion-reduce:transition-none md:h-10 ${className}`;
  const content = <>{children}<ArrowUpRight aria-hidden="true" className="size-4" /></>;
  return href ? <Link href={href} className={classes} {...props}>{content}</Link> : <button className={classes} {...props}>{content}</button>;
}
