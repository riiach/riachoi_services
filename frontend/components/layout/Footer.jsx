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
      <div className="flex h-auto w-full flex-col items-start justify-between gap-6 md:flex-row">
        <div className="flex w-full min-w-0 flex-col items-start gap-4 md:flex-1">
          <Link
            href="/"
            className="text-foreground flex flex-row text-3xl font-bold tracking-tight"
          >
            <Logo
              className="text-4xl sm:text-5xl md:text-2xl lg:text-4xl"
              h={42}
              w={42}
            />
          </Link>
          <p>
            <span className="font-doto font-bold">
              RIA CHOI DIGITAL SOLUTION STUDIO
            </span>
            <br />
            Provides high-quality web solutions.
            <br />
            Building meaningful experiences.
          </p>
        </div>
        <nav aria-label="Footer site map" className="w-full min-w-0 text-sm md:w-2/5 md:shrink-0">
          <h2 className="mb-4 text-base font-semibold">Site map</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About me" },
              { href: "/portfolio", label: "Portfolio" },
              { href: "/blog", label: "Blog" },
              { href: "/#contact", label: "Contact" },
            ].map(({ href, label }) => <li key={href}><Link href={href} className="inline-block rounded-sm transition-opacity duration-200 hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none">{label}</Link></li>)}
          </ul>
        </nav>
      </div>
      <div aria-label="Social links" className="mt-6 w-full max-w-full [&>div]:flex-wrap [&>div]:justify-start">
        <Social />
      </div>
      <p className="mt-5 text-xs leading-relaxed text-black/65 dark:text-white">
        Ria Choi Digital Solution Studio | 29, Dongtan Osanro, Hwaseong-si,
        South Korea
      </p>
      <p className="mt-1 text-xs leading-relaxed text-black/65 dark:text-white">
        <Link href="tel:+821067645238">+82-10-6764-5238</Link> |
        <Link href="mailto:riiachoii@gmail.com">riiachoii@gmail.com</Link>
      </p>
      <p className="mt-2 text-xs text-black/65 dark:text-white">
        © {new Date().getFullYear()} Ria Choi. All rights reserved.
      </p>
    </footer>
  );
};
export default Footer;
