"use client";

import Link from "next/link";
import useTouchPress from "../../hooks/useTouchPress";
import styles from "./ActionMotion.module.css";

export default function AnimatedButton({ type = "button", text, href, w = "w-fit", h = "py-4" }) {
  const touchProps = useTouchPress();
  const className = `${styles.animated} ${w} ${h} button-3d relative flex h-fit cursor-pointer items-center justify-center overflow-hidden rounded-full px-4 whitespace-nowrap md:px-6`;
  const content = <>
    <span className={`${styles.label} block text-center`}>{text}</span>
    <span aria-hidden="true" className={`${styles.replacement} absolute inset-0 flex items-center justify-center whitespace-nowrap`}>{text}</span>
  </>;
  return href
    ? <Link href={href} className={className} {...touchProps}>{content}</Link>
    : <button type={type} className={className} {...touchProps}>{content}</button>;
}
