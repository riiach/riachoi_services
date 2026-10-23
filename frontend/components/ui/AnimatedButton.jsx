"use client";

import Link from "next/link";
import useTouchPress from "../../hooks/useTouchPress";

export default function AnimatedButton({ type = "button", text, href, onClick, w = "w-fit", h = "py-4" }) {
  const touchProps = useTouchPress();
  const className = `animated-button ${w} ${h} button-3d relative flex h-fit cursor-pointer items-center justify-center overflow-hidden rounded-full px-4 whitespace-nowrap md:px-6`;
  const content = <>
    <span className={`animated-label block text-center`}>{text}</span>
    <span aria-hidden="true" className={`animated-replacement absolute inset-0 flex items-center justify-center whitespace-nowrap`}>{text}</span>
  </>;
  return href
    ? <Link href={href} onClick={onClick} className={className} {...touchProps}>{content}</Link>
    : <button type={type} onClick={onClick} className={className} {...touchProps}>{content}</button>;
}
