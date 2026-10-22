"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import useTouchPress from "../../hooks/useTouchPress";
import styles from "./ActionMotion.module.css";

export default function GradientAction({ href, children, className = "", ...props }) {
  const touchProps = useTouchPress();
  const classes = `${styles.action} inline-flex h-12 w-32 shrink-0 items-center justify-center gap-3 rounded-full border border-white/60 bg-gradient-to-br from-white via-white/90 to-neutral-300 px-4 text-sm font-medium text-neutral-800 shadow-[0_3px_10px_#00000026,inset_0_1px_1px_#ffffff] hover:shadow-[0_5px_14px_#00000026,inset_0_1px_1px_#ffffff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 disabled:cursor-wait disabled:opacity-60 md:h-10 ${className}`;
  const content = <>{children}<ArrowUpRight aria-hidden="true" className="size-4" /></>;
  return href ? <Link href={href} className={classes} {...touchProps} {...props}>{content}</Link> : <button className={classes} {...touchProps} {...props}>{content}</button>;
}
