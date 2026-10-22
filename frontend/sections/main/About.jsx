import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function About() {
  return (
    <section aria-label="About Ria Choi" className="relative isolate min-h-0 w-full flex-1 overflow-hidden rounded-2xl">
      <Image src="/profile.jpg" alt="Ria Choi" fill sizes="(min-width: 768px) 30vw, 100vw" className="-z-10 object-cover object-center" />
      <Link href="/about" className="absolute bottom-3 left-3 inline-flex items-center gap-3 rounded-full border border-white/60 bg-gradient-to-br from-white via-white/90 to-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 shadow-[0_3px_10px_#00000026,inset_0_1px_1px_#ffffff] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
        About me <ArrowUpRight aria-hidden="true" className="size-4" />
      </Link>
    </section>
  );
}
