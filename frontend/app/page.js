import Image from "next/image";
import Footer from "../components/layout/Footer";
import Hero from "../sections/main/Hero";

export const metadata = {
  title: "Ria Choi Digital Solution Studio",
  description: "Online web development studio that provides high-quality web solutions. Customized websites for your business.",
};

export default function Home() {
  return (
    <main aria-label="Ria Choi Digital Solution Studio" className="relative isolate flex h-auto w-full flex-col justify-between p-3 md:min-h-dvh md:flex-row md:gap-6 md:p-5 lg:py-16 2xl:px-32">
      <Image
        src="/Serene%20Green%20Hills.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div className="min-w-0 pt-12 md:w-[min(21.333333rem,calc((100vw-4rem)/3))] md:shrink-0" />
      <div className="flex w-full min-w-0 flex-col justify-between gap-4 pt-12 md:w-[calc((100%-1.5rem)*2/3)] md:shrink-0">
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <Hero />
        </div>
        <div className="h-fit w-full shrink-0">
          <Footer />
        </div>
      </div>
    </main>
  );
}
