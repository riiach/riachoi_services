import Image from "next/image";
import TextAction from "../../components/ui/TextAction";

export default function About() {
  return (
    <section aria-label="About Ria Choi" className="relative isolate min-h-0 w-full flex-1 overflow-hidden rounded-2xl bg-white [.dark_&]:bg-neutral-900">
      <Image src="/profile.jpg" alt="Ria Choi" fill sizes="(min-width: 768px) 30vw, 100vw" className="-z-10 object-cover object-center" />
      <TextAction href="/about" className="absolute bottom-4 left-4 text-white [text-shadow:0_1px_4px_rgb(0_0_0/0.8)]">About me</TextAction>
    </section>
  );
}
