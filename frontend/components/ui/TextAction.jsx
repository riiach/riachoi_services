import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function TextAction({ href, children, className = "", ...props }) {
  const classes = `inline-flex w-fit items-center gap-2 text-sm font-medium transition-opacity duration-300 hover:opacity-60 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-wait disabled:opacity-50 ${className}`;
  const content = <>{children}<ArrowUpRight aria-hidden="true" className="size-4" /></>;
  return href ? <Link href={href} className={classes} {...props}>{content}</Link> : <button className={classes} {...props}>{content}</button>;
}
