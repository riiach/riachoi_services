import Image from "next/image";
import Footer from "../components/layout/Footer";
import Hero from "../sections/main/Hero";

export const metadata = {
  title: "Ria Choi Digital Solution Studio",
  description: "Online web development studio that provides high-quality web solutions. Customized websites for your business.",
};

export default function Home() {
  return (
    <main aria-label="Ria Choi Digital Solution Studio" className="relative isolate flex min-h-dvh w-full flex-col p-3 pt-20 md:flex-row md:gap-6 md:p-5 md:pt-20">
      <Image
        src="/Serene%20Green%20Hills.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div className="min-h-[15dvh] min-w-0 flex-1 md:min-h-0" />
      <div className="flex min-w-0 flex-1 flex-col gap-4 md:max-w-3xl">
        <div className="min-h-0 flex-1" />
        <div className="flex min-h-0 flex-1 items-center justify-center">
          <Hero />
        </div>
        <div className="mt-auto w-full">
          <Footer />
        </div>
      </div>
    </main>
  );
}
