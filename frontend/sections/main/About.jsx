import Image from "next/image";
import GradientAction from "../../components/ui/GradientAction";

export default function About() {
  return (
    <section aria-label="About Ria Choi" className="relative isolate min-h-0 w-full flex-1 overflow-hidden rounded-2xl bg-white [.dark_&]:bg-neutral-900">
      <Image src="/profile_main_card.png" alt="Ria Choi" fill sizes="(min-width: 768px) 30vw, 100vw" className="-z-10 object-cover object-top" />
      <GradientAction href="/about" className="absolute bottom-3 left-3">About me</GradientAction>
    </section>
  );
}
