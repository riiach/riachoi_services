"use client"

import React from "react";
import SubscribeBar from "../../components/ui/SubscribeBar"
import "../../app/shootingStars.css";
import ShootingStars from "../../components/ui/ShootingStars"

const Hero = () => {
  return (
    <section className="w-full h-auto bg-background flex flex-col items-center md:py-12 xl:py-24 gap-12 mb-24 xl:mb-12">
      <ShootingStars />
      <h1 className="text-4xl md:text-5xl xl:text-7xl font-semibold text-foreground text-center leading-12 md:leading-14 xl:leading-20 z-10">
        Our goal is to make your business thrive,
        <br/>
        see what we can build for you.
      </h1>
      <p className="text-center font-semibold font-mono text-gray-500 md:text-lg xl:text-2xl tracking-wide z-10">
        Our team make websites that are fast, secure, and visually <span className="text-accent">aligning with your brand</span>.
          <br/>
          Provides <span className="text-accent">optimization</span> in every aspect, making your website fit for your customers.
          <br/>
          Always staying up-to-date with the <span className="text-accent">latest trends</span> and technologies.
      </p>
      <SubscribeBar />
    </section>
  );
};
export default Hero;
