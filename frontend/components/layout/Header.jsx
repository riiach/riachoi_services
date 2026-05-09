"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

import AnimatedButton from "../ui/AnimatedButton";
import ThemeToggle from "../ui/ThemeToggle";
import SearchOverlay from "./SearchOverlay";

const navigationItems = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "About",
        href: "/about",
    },
    {
        label: "Pricing",
        koreanLabel: "견적",
        href: "/pricing",
    },
    {
        label: "Blog",
        href: "/blog",
    },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { resolvedTheme } = useTheme();

    const logoSrc =
      resolvedTheme === "dark"
        ? "/Ria Choi White.svg"
        : "/logo.svg";
    const isDark = resolvedTheme === "dark";

    return (
        <header className="relative top-0 z-40 w-full bg-background mb-6">
            <div className="mx-auto flex h-20 max-w-[82%] items-center justify-between px-4">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-3xl font-bold tracking-tight text-foreground flex flex-row"
                >
                    <Image
                      key={logoSrc}
                      src={logoSrc}
                      alt="RiaChoi Text Logo"
                      width={180}
                      height={35}
                      priority
                      className="mr-2 h-[35px] w-auto"
                    />
                    <span className="text-accent">.</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-10 md:flex">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group relative text-base font-medium text-foreground transition-colors hover:text-accent"
                        >
                            {item.label}

                            {/* Korean label for Pricing */}
                            {item.koreanLabel && (
                                <span className="ml-1 text-sm text-accent">
                                  {item.koreanLabel}
                                </span>
                            )}

                            {/* Hover underline animation */}
                            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-5 md:flex">
                    {/* Search Modal Trigger */}
                    <SearchOverlay />

                    {/* Theme Toggle */}
                    <ThemeToggle />

                    {/* Cart Button */}
                    <AnimatedButton text="Cart" />
                </div>

                {/* Mobile Header Actions */}
                <div className="flex items-center gap-3 md:hidden">
                    {/* Search */}
                    <SearchOverlay />

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        aria-label="Open mobile menu"
                        onClick={() => setIsOpen(true)}
                        className="rounded-full bg-muted p-3 transition-colors hover:bg-muted/70"
                    >
                        <Menu className="h-5 w-5 text-foreground" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-background px-6 py-6">
                    {/* Top Area */}
                    <div className="flex items-center justify-between">
                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Close Button */}
                        <button
                            type="button"
                            aria-label="Close mobile menu"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="h-7 w-7 text-foreground" />
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="mt-12 flex flex-col gap-6">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="text-3xl font-medium tracking-tight text-foreground transition-colors hover:text-accent"
                            >
                                {item.label}

                                {/* Korean label for Pricing */}
                                {item.koreanLabel && (
                                    <span className="ml-2 text-lg text-accent">
                    {item.koreanLabel}
                  </span>
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Bottom Button */}
                    <div className="mt-12">
                        <AnimatedButton text="Cart" w="w-full" />
                    </div>
                </div>
            )}
        </header>
    );
}