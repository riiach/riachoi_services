"use client"

import React from "react";
import Logo from "../ui/Logo";
import Link from "next/link";
import Social from "../ui/Social";

const Footer = () => {


  return (
    <footer id="footer" style={{ "--foreground": "#111111" }} className="w-full rounded-[2rem] border border-white/45 bg-white/35 p-6 text-[#111111] shadow-[0_12px_48px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-xl sm:p-8">
      <div className="w-full h-auto flex flex-col xl:flex-row items-start justify-between gap-6">
        <div className="w-full min-w-0 xl:flex-1 flex flex-col items-start gap-4">
          <Link
            href="/"
            className="text-3xl font-bold tracking-tight text-foreground flex flex-row"
          >
            <Logo className="text-4xl sm:text-5xl" h={42} w={42} />
          </Link>
          <p>
            <span className="font-medium">Ria Choi Digital Solution Studio</span>
            <br/>
            Provides high-quality web solutions.
            <br/>
            Building meaningful experiences.
          </p>
          <div className="max-w-full [&>div]:flex-wrap [&_svg]:h-8 [&_svg]:w-8"><Social /></div>
        </div>
        <div className="w-full xl:w-auto flex flex-wrap items-start justify-between gap-x-6 gap-y-5 text-sm">
          <div className="flex flex-col gap-2">
            <h2
              className="mb-1 text-base font-semibold"
            >About</h2>
            <Link href="/about">
              About us
            </Link>
            <Link href="/about/#specialty">
              <p>Specialty</p>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h2
              className="mb-1 text-base font-semibold"
            >Pricing</h2>
            <Link href="/pricing/#package-deal">
              Package deal
            </Link>
            <Link href="/pricing/#pricing-table">
              Pricing
            </Link>
            <Link href="/pricing/#estimated-price">
              Estimated price
            </Link>
            <Link href="/pricing/#faq">
              FAQ
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h2
              className="mb-1 text-base font-semibold"
            >Blog</h2>
            <Link href="/blog">
              All posts
            </Link>
          </div>
        </div>
      </div>
      <p className="text-black/65 mt-5 text-xs leading-relaxed">
        Ria Choi Digital Solution Studio
        | 29, Dongtan Osanro, Hwaseong-si, South Korea
      </p>
      <p className="text-black/65 mt-1 text-xs leading-relaxed">
        +82-10-6764-5238 | riiachoii@gmail.com
      </p>
      <p className="text-black/65 mt-2 text-xs">
        © {new Date().getFullYear()} Ria Choi. All rights reserved.
      </p>
    </footer>
  );
};
export default Footer;
