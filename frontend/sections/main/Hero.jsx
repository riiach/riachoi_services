import AnimatedButton from "../../components/ui/AnimatedButton";

export default function Hero({ compact = false }) {
  return (
    <section
      aria-labelledby="hero-heading"
      className={`flex w-full flex-col items-center justify-center text-center ${compact ? "gap-2 py-1 md:gap-6 md:py-4" : "gap-6 py-8 md:py-10"}`}
    >
      <h1
        id="hero-heading"
        className={`font-logo mb-4 w-full leading-[0.95] font-normal tracking-tight text-black ${compact ? "text-6xl max-[400px]:text-6xl md:text-[clamp(1.5rem,5.5vw,5.5rem)]" : "text-[clamp(2.75rem,5.5vw,5.5rem)]"}`}
      >
        High Quality
        <br />
        Web Experience
      </h1>
      <AnimatedButton
        text="View my portfolio"
        href="/search?category=Project"
        h="py-3"
      />
    </section>
  );
}
