"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function SiteFooter() {
  const pathname = usePathname();
  // The home page renders the footer inside its hero layout.
  if (pathname === "/" || pathname.startsWith("/studio") || pathname.startsWith("/structure")) return null;
  return (
    <div className="mt-16 mb-6 sm:mx-5 sm:mb-5 xl:px-4 2xl:px-42">
      <Footer />
    </div>
  );
}
