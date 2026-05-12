"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Social from "../ui/Social";
import { useTheme } from "next-themes";

const Footer = () => {
    const { resolvedTheme } = useTheme();

    const logoSrc =
        resolvedTheme === "dark"
            ? "/Ria Choi White.svg"
            : "/logo.svg";
    const isDark = resolvedTheme === "dark";

  return (
    <section id="footer" className="w-full h-auto pb-10 pt-16 md:py-24 p-4 xl:px-10 2xl:px-48 bg-background border-t border-gray-200 mt-24">
      <div className="w-full h-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="w-full md:w-1/2 h-auto flex flex-col items-start justify-start gap-6">
          <Link
            href="/"
            className="text-3xl font-bold tracking-tight text-foreground flex flex-row"
          >
            <Image
              src={logoSrc}
              alt="RiaChoi Text Logo"
              width={180}
              height={35}
              priority
              className="mr-2 h-[35px] w-auto"
            />
            <span className="text-accent">.</span>
          </Link>
          <p>
            <span className="text-accent">Ria Choi Digital Solution Studio</span>
            <br/>
            Online web development studio that provides high-quality web solutions.
            <br/>
            Customized websites for your business.
          </p>
          <Social />
        </div>
        <div className="w-full md:w-1/2 h-auto flex flex-row items-start justify-start md:justify-between text-foreground mt-4 md:mt-0 gap-4 md:gap-0">
          <div className="flex flex-col gap-2">
            <h2
              className="mb-2 text-xl font-semibold"
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
              className="mb-2 text-xl font-semibold"
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
              className="mb-2 text-xl font-semibold"
            >Blog</h2>
            <Link href="/blog">
              All posts
            </Link>
          </div>
        </div>
      </div>
      <p className="text-gray-500 mt-8 text-sm">
        Ria Choi Digital Solution Studio
        | 123, Digital-ro, Gangnam-gu, Seoul, Republic of Korea
      </p>
      <p className="text-gray-500 mt-1 text-sm">
        +82-10-6764-5238 | 123-456-7890
      </p>
      <p className="text-gray-500 mt-2 text-sm">
        © {new Date().getFullYear()} Ria Choi. All rights reserved.
      </p>
    </section>
  );
};
export default Footer;
