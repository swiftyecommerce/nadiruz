"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Müzik", href: "#music" },
    { label: "Videolar", href: "#videos" },
    { label: "Konserler", href: "#shows" },
    { label: "Hakkında", href: "#about" },
    { label: "İletişim", href: "#contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            const offset = 80; // Navbar height
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setIsOpen(false);
        }
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                scrolled ? "bg-black/80 backdrop-blur-md border-white/10 py-4" : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-2xl font-oswald font-bold tracking-tighter text-white z-50 relative"
                    onClick={(e) => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setIsOpen(false);
                    }}
                >
                    Nadir<span className="text-[#39ff14]">UZ</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className="text-sm font-oswald uppercase tracking-widest text-gray-300 hover:text-[#39ff14] transition-colors"
                        >
                            {item.label}
                        </a>
                    ))}
                    <Link
                        href="/admin"
                        className="px-4 py-2 text-xs font-oswald uppercase tracking-widest border border-white/20 rounded-lg hover:bg-white hover:text-black transition-all"
                    >
                        Giriş
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white z-50 relative"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Mobile Menu Overlay */}
                <div className={cn(
                    "fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}>
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className="text-2xl font-oswald uppercase tracking-widest text-white hover:text-[#39ff14] transition-colors"
                        >
                            {item.label}
                        </a>
                    ))}
                    <Link
                        href="/admin"
                        className="mt-4 px-8 py-3 text-sm font-oswald uppercase tracking-widest border border-white/20 rounded-lg hover:bg-white hover:text-black transition-all"
                    >
                        Sanatçı Girişi
                    </Link>
                </div>
            </div>
        </nav>
    );
}
