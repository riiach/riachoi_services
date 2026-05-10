"use client"

import React from "react";
import SubscribeBar from "../../components/ui/SubscribeBar"

const Hero = () => {
  return (
    <section className="w-full h-[65vh] bg-background flex flex-col items-center pt-8 md:pt-12 xl:pt-24 gap-12 mb-6">
      <h1 className="text-4xl md:text-5xl xl:text-7xl font-semibold text-foreground text-center leading-12 md:leading-14 xl:leading-20">
        Modern technology,
        fast performance,
        <br/>
        and great user experiences.
      </h1>
      <p className="text-center font-semibold font-mono text-gray-500 md:text-lg xl:text-3xl tracking-wide">
          Me and my team make websites that are fast, secure, and visually appealing.
          <br/>
          Always staying up-to-date with the <span className="text-accent">latest trends</span> and technologies.
      </p>
      <SubscribeBar />
    </section>
  );
};
export default Hero;
