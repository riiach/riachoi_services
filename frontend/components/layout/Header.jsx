"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Logo from "../ui/Logo";
import { usePathname } from "next/navigation";

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
    },/*
    {
        label: "Pricing",
        koreanLabel: "견적",
        href: "/pricing",
    },*/
    {
        label: "Portfolio",
        href: "/portfolio",
    },
    {
        label: "Blog",
        href: "/blog",
    },
];

export default function Header( { posts }) {
    const [isOpen, setIsOpen] = useState(false);
    const headerRef = useRef(null);
    const pathname = usePathname();
    const isHome = pathname === "/";
    const isArticle = /^\/blog\/[^/]+\/?$/.test(pathname);
    const isStudio = pathname.startsWith("/studio") || pathname.startsWith("/structure");

    useEffect(() => {
        if (!isOpen) return;
        function closeOutside(event) {
            if (!headerRef.current?.contains(event.target)) setIsOpen(false);
        }
        function closeOnEscape(event) {
            if (event.key === "Escape") setIsOpen(false);
        }
        document.addEventListener("pointerdown", closeOutside);
        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.removeEventListener("pointerdown", closeOutside);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [isOpen]);


    return (
        <header ref={headerRef} className={`fixed z-40 ${isHome ? "left-4 top-6 w-[calc(100%-2rem)] md:left-[var(--home-gutter)] md:top-5 md:w-[var(--page-nav-width)]" : "left-[var(--page-gutter)] top-4 w-[calc(100%-var(--page-gutter)-var(--page-gutter))] md:w-[var(--page-nav-width)]"} ${isStudio ? "hidden" : ""}`}>
            {isArticle && <Link href="/blog" aria-label="Back to blog" className="absolute left-0 top-0 flex size-12 items-center justify-center rounded-full border border-white/45 bg-white/35 text-foreground shadow-sm backdrop-blur-xl transition-opacity hover:opacity-60 dark:bg-black/35 md:hidden"><ArrowLeft aria-hidden="true" className="size-5" /></Link>}
            <div className={`flex h-12 items-center justify-between gap-3 rounded-full border border-black/10 bg-background px-4 shadow-sm ${isArticle ? "ml-14 w-[calc(100%-3.5rem)] md:ml-0 md:w-full" : "w-full"}`}>
                <div className="flex min-w-0 items-center gap-1">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-3xl font-bold tracking-tight text-foreground flex flex-row"
                >
                    <Logo className={isArticle ? "text-xl md:text-2xl" : "text-2xl"} />
                </Link>

                </div>

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


                    <AnimatedButton text="Contact" href="/#contact" h="py-2"/>
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
            <div
                className={`absolute top-full z-50 mt-2 grid ${isArticle ? "left-14 w-[calc(100%-3.5rem)] md:left-0 md:w-full" : "left-0 w-full"} transition-[grid-template-rows,opacity,transform,visibility] duration-300 ease-out motion-reduce:transition-none ${isOpen ? "visible grid-rows-[1fr] translate-y-0 opacity-100" : "invisible grid-rows-[0fr] -translate-y-2 opacity-0"}`}
                inert={!isOpen}
                aria-hidden={!isOpen}
            >
              <div className={`min-h-0 overflow-hidden rounded-3xl ${isOpen ? "shadow-lg" : ""}`}>
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
                    className="max-h-[calc(100dvh-5rem)] w-full overflow-y-auto rounded-3xl border border-black/10 bg-background p-4">
                    {/* Top Area */}
                    <div className="flex w-full justify-end">
                        {/* Theme Toggle */}
                        <ThemeToggle />
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
                        <AnimatedButton text="Contact" href="/#contact" onClick={() => setIsOpen(false)} w="w-full" h="py-2"/>
                    </div>
                </div>
              </div>
            </div>
        </header>
    );
}
