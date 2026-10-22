"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import Logo from "../ui/Logo";
import { usePathname } from "next/navigation";

import AnimatedButton from "../ui/AnimatedButton";
import ThemeToggle from "../ui/ThemeToggle";
import SearchOverlay from "./SearchOverlay";

const navigationItems = [
    /*
    {
        label: "Home",
        href: "/",
    },*/
    {
        label: "About",
        href: "/about",
    },/*
    {
        label: "Pricing",
        koreanLabel: "견적",
        href: "/pricing",
    },*/
    {
        label: "Blog",
        href: "/blog",
    },
];

export default function Header( { posts }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const isStudio = pathname.startsWith("/studio") || pathname.startsWith("/structure");


    return (
        <header className={`fixed left-3 top-3 z-40 w-[calc(100vw-1.5rem)] sm:w-[calc(100vw-2.5rem)] md:w-[min(21.333333rem,calc((100vw-4rem)/3))] max-w-[calc(100vw-1.5rem)] sm:left-5 sm:top-5 lg:top-16 2xl:left-32 ${isStudio ? "hidden" : ""}`}>
            <div className="flex h-12 w-full items-center justify-between gap-3 rounded-full border border-black/10 bg-background px-4 shadow-sm">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-3xl font-bold tracking-tight text-foreground flex flex-row"
                >
                    <Logo />
                </Link>

                {/* 25-26: Desktop navigation and actions (archived)

                <nav className="hidden items-center gap-10 md:flex">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group relative text-base font-medium text-foreground transition-colors hover:text-accent"
                        >
                            {item.label}


                            {item.koreanLabel && (
                                <span className="ml-1 text-sm text-accent">
                                  {item.koreanLabel}
                                </span>
                            )}


                            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </nav>


                <div className="hidden items-center gap-5 md:flex">

                    <SearchOverlay posts={posts} />


                    <ThemeToggle />


                    <AnimatedButton text="Cart" h="py-2"/>
                </div>
                */}

                {/* Mobile Header Actions */}
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <SearchOverlay posts={posts} />

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isOpen}
                        aria-controls="site-navigation"
                        onClick={() => setIsOpen((open) => !open)}
                        className="rounded-full bg-muted p-3 transition-colors hover:bg-muted/70"
                    >
                        <span aria-hidden="true" className="relative block h-5 w-5 text-foreground">
                            <span className={`absolute left-0 top-[9px] h-0.5 w-5 rounded-full bg-current transition-transform duration-300 motion-reduce:transition-none ${isOpen ? "rotate-45" : "-translate-y-1.5"}`} />
                            <span className={`absolute left-0 top-[9px] h-0.5 w-5 rounded-full bg-current transition-opacity duration-300 motion-reduce:transition-none ${isOpen ? "opacity-0" : "opacity-100"}`} />
                            <span className={`absolute left-0 top-[9px] h-0.5 w-5 rounded-full bg-current transition-transform duration-300 motion-reduce:transition-none ${isOpen ? "-rotate-45" : "translate-y-1.5"}`} />
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div id="site-navigation"
                    role="dialog"
                    aria-label="Navigation menu"
                    onKeyDown={(event) => {
                        if (event.key === "Escape") setIsOpen(false);
                        if (event.key !== "Tab") return;
                        const items = event.currentTarget.querySelectorAll('a[href], button:not([disabled]), input:not([disabled])');
                        const first = items[0];
                        const last = items[items.length - 1];
                        if (event.shiftKey && document.activeElement === first) {
                            event.preventDefault();
                            last?.focus();
                        } else if (!event.shiftKey && document.activeElement === last) {
                            event.preventDefault();
                            first?.focus();
                        }
                    }}
                    className="absolute left-0 top-full z-50 mt-2 max-h-[calc(100dvh-5rem)] w-full overflow-y-auto rounded-3xl border border-black/10 bg-background p-4 shadow-lg">
                    {/* Top Area */}
                    <div className="flex items-center justify-between">
                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Close Button */}
                        <button
                            type="button"
                            aria-label="Close navigation menu"
                            autoFocus
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="h-5 w-5 text-foreground" />
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="mt-5 flex flex-col gap-2">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="rounded-xl px-2 py-2 text-lg font-medium tracking-tight text-foreground transition-colors hover:text-accent"
                            >
                                {item.label}

                                {/* Korean label for Pricing */}
                                {item.koreanLabel && (
                                    <span className="ml-2 text-lg text-accent font-plex">
                    {item.koreanLabel}
                  </span>
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Bottom Button */}
                    <div className="mt-5">
                        <AnimatedButton text="Cart" w="w-full" h="py-2"/>
                    </div>
                </div>
            )}
        </header>
    );
}
