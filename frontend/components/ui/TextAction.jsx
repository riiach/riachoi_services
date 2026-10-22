import Link from "next/link";
import DotArrow from "./DotArrowProps";

export default function TextAction({ href, children, className = "", ...props }) {
  const classes = `inline-flex w-fit items-center self-center gap-1 font-doto font-bold leading-none transition-opacity duration-300 hover:opacity-60 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-wait disabled:opacity-50 ${className}`;
  const content = <><span className="inline-flex items-center leading-none mr-2">{children}</span><DotArrow size={12} viewBox="40.5 16.5 43 43" className="block shrink-0" /></>;
  return href ? <Link href={href} className={classes} {...props}>{content}</Link> : <button className={classes} {...props}>{content}</button>;
}
