import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import DotArrow from "../../components/ui/DotArrowProps"

export default function TextAction({ href, children, className = "", ...props }) {
  const classes = `inline-flex w-fit items-center gap-2 text-sm font-medium transition-opacity duration-300 hover:opacity-60 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-wait disabled:opacity-50 ${className}`;
  const content = <>{children}<DotArrow size={30} color="currentColor"/></>;
  return href ? <Link href={href} className={classes} {...props}>{content}</Link> : <button className={classes} {...props}>{content}</button>;
}
