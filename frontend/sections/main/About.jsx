import Image from "next/image";
import Link from "next/link";
import DotArrow from "../../components/ui/DotArrowProps";

export default function About() {
  return (
    <Link href="/about" aria-label="About Ria Choi" className="group relative isolate min-h-0 w-full flex-1 overflow-hidden rounded-2xl bg-white focus-visible:outline-2 focus-visible:outline-offset-4 [.dark_&]:bg-neutral-900">
      <Image src="/profile.jpg" alt="Ria Choi" fill sizes="(min-width: 768px) 30vw, 100vw" className="-z-10 object-cover object-center" />
      <span className="absolute bottom-4 left-4 inline-flex items-center gap-1 font-doto font-bold leading-none text-white transition-opacity duration-300 group-hover:opacity-60 motion-reduce:transition-none [text-shadow:0_1px_4px_rgb(0_0_0/0.8)]"><span className="mr-2">About me</span><DotArrow size={12} viewBox="40.5 16.5 43 43" className="block shrink-0" /></span>
    </Link>
  );
}
