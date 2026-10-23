"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import plasticDaisy from "../../public/Plastic Daisy BG.png";
import Footer from "./Footer";

export default function SiteFooter() {
  const pathname = usePathname();
  // Home has its own hero footer; Studio uses the CMS layout.
  if (pathname === "/" || pathname.startsWith("/studio") || pathname.startsWith("/structure")) return null;
  return (
    <section aria-label="Site footer" className="relative isolate mt-16 grid w-full overflow-hidden">
      <Image
        src={plasticDaisy}
        alt="Plastic daisies"
        sizes="100vw"
        className="col-start-1 row-start-1 h-[600px] w-full self-end object-cover [mask-image:linear-gradient(to_bottom,transparent,black_30%)] md:h-auto"
      />
      <div className="z-10 col-start-1 row-start-1 w-full self-end p-4 pb-6 md:p-0 md:pb-50">
        <div className="mt-16 mb-6 sm:mx-5 sm:mb-5 xl:px-4 2xl:px-42">
          <Footer />
        </div>
      </div>
    </section>
  );
}
