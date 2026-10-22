import Image from "next/image";

export const metadata = {
  title: "Ria Choi Digital Solution Studio",
  description: "Online web development studio that provides high-quality web solutions. Customized websites for your business.",
};

export default function Home() {
  return (
    <main aria-label="Ria Choi Digital Solution Studio" className="relative h-dvh min-h-dvh w-full">
      <Image
        src="/Serene%20Green%20Hills.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
    </main>
  );
}
