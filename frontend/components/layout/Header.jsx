"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
        <header className={`fixed left-3 top-3 z-40 sm:left-5 sm:top-5 ${isStudio ? "hidden" : ""}`}>
            <div className="flex h-14 w-fit max-w-[calc(100vw-1.5rem)] items-center gap-6 rounded-full border border-black/10 bg-background px-4 shadow-sm">
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
                        aria-label="Open navigation menu"
                        aria-expanded={isOpen}
                        aria-controls="site-navigation"
                        onClick={() => setIsOpen(true)}
                        className="rounded-full bg-muted p-3 transition-colors hover:bg-muted/70"
                    >
                        <Menu className="h-5 w-5 text-foreground" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div id="site-navigation"
                    role="dialog"
                    aria-modal="true"
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
                    className="fixed inset-0 z-50 overflow-y-auto bg-background px-6 py-6">
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
                                    <span className="ml-2 text-lg text-accent font-plex">
                    {item.koreanLabel}
                  </span>
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Bottom Button */}
                    <div className="mt-12">
                        <AnimatedButton text="Cart" w="w-full" h="py-4"/>
                    </div>
                </div>
            )}
        </header>
    );
}
