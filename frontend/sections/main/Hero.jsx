import AnimatedButton from "../../components/ui/AnimatedButton";

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="flex w-full flex-col items-center justify-center gap-6 py-8 text-center md:py-10">
      <h1 id="hero-heading" className="font-logo text-[clamp(2.75rem,5.5vw,5.5rem)] leading-[0.95] font-normal tracking-tight text-black">
        High Quality
        <br />
        Web Experience
      </h1>
      <AnimatedButton text="View my portfolio" href="/search?category=Project" h="py-3" />
    </section>
  );
}
