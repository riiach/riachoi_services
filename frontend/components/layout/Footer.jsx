"use client"

import React from "react";
import Logo from "../ui/Logo";
import Link from "next/link";
import Social from "../ui/Social";

const Footer = () => {


  return (
    <footer
      id="footer"
      style={{ "--foreground": "#111111" }}
      className="text-foreground w-full rounded-[2rem] border border-white/45 bg-white/35 p-6 shadow-[0_12px_48px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-xl sm:p-8 dark:text-white"
    >
      <div className="flex h-auto w-full flex-col items-start justify-between gap-6 xl:flex-row">
        <div className="flex w-full min-w-0 flex-col items-start gap-4 xl:flex-1">
          <Link
            href="/"
            className="text-foreground flex flex-row text-3xl font-bold tracking-tight"
          >
            <Logo className="text-4xl sm:text-5xl" h={42} w={42} />
          </Link>
          <p>
            <span className="font-bold font-doto">
              RIA CHOI DIGITAL SOLUTION STUDIO
            </span>
            <br />
            Provides high-quality web solutions.
            <br />
            Building meaningful experiences.
          </p>
          <div className="max-w-full [&>div]:flex-wrap">
            <Social />
          </div>
        </div>
        <div className="flex w-full flex-wrap items-start justify-between gap-x-6 gap-y-5 text-sm xl:w-2/5 xl:shrink-0">
          <div className="flex flex-col gap-2">
            <h2 className="mb-1 text-base font-semibold">About</h2>
            <Link href="/about">About us</Link>
            <Link href="/about/#specialty">
              <p>Specialty</p>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="mb-1 text-base font-semibold">Pricing</h2>
            <Link href="/pricing/#package-deal">Package deal</Link>
            <Link href="/pricing/#pricing-table">Pricing</Link>
            <Link href="/pricing/#estimated-price">Estimated price</Link>
            <Link href="/pricing/#faq">FAQ</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="mb-1 text-base font-semibold">Blog</h2>
            <Link href="/blog">All posts</Link>
          </div>
        </div>
      </div>
      <p className="mt-5 text-xs leading-relaxed text-black/65 dark:text-white">
        Ria Choi Digital Solution Studio | 29, Dongtan Osanro, Hwaseong-si,
        South Korea
      </p>
      <p className="mt-1 text-xs leading-relaxed text-black/65 dark:text-white">
        +82-10-6764-5238 | riiachoii@gmail.com
      </p>
      <p className="mt-2 text-xs text-black/65 dark:text-white">
        © {new Date().getFullYear()} Ria Choi. All rights reserved.
      </p>
    </footer>
  );
};
export default Footer;
