"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function SiteFooter() {
  const pathname = usePathname();
  // The home page renders the footer inside its hero layout.
  if (pathname === "/" || pathname.startsWith("/studio") || pathname.startsWith("/structure")) return null;
  return <div className="mx-3 mb-3 mt-16 sm:mx-5 sm:mb-5"><Footer /></div>;
}
