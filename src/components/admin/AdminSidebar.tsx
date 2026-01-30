"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    BarChart,
    User,
    Share2,
    Music,
    Youtube,
    Calendar,
    Mail,
    LogOut,
    LayoutDashboard,
    Menu,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const menuItems = [
    { label: "Genel Bakış", icon: LayoutDashboard, href: "/admin/dashboard" },
    { label: "Sanatçı Profili", icon: User, href: "/admin/dashboard/profile" },
    { label: "Sosyal Linkler", icon: Share2, href: "/admin/dashboard/socials" },
    { label: "Yayınlar", icon: Music, href: "/admin/dashboard/releases" },
    { label: "Videolar", icon: Youtube, href: "/admin/dashboard/videos" },
    { label: "Konserler", icon: Calendar, href: "/admin/dashboard/shows" },
    { label: "İletişim Bilgileri", icon: Mail, href: "/admin/dashboard/contact" },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin");
        router.refresh();
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#111111] border border-white/10 rounded-lg text-white"
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Backdrop for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-[#111111] border-r border-white/5 flex flex-col transition-transform duration-300 md:translate-x-0 md:static md:h-screen",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-8">
                    <h1 className="text-2xl font-oswald font-bold tracking-tighter text-white" style={{ textTransform: 'none' }}>
                        Swifty<span className="text-[#39ff14]">.</span>MP
                    </h1>
                    <p className="text-gray-500 text-[11px] font-medium tracking-[0.1em] mt-1" style={{ textTransform: 'none' }}>
                        Sanatçı Yönetim Paneli
                    </p>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-oswald uppercase text-sm tracking-wider",
                                    isActive
                                        ? "bg-[#39ff14] text-black"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-500/10 transition-all duration-300 font-oswald uppercase text-sm tracking-wider"
                    >
                        <LogOut className="h-5 w-5" />
                        Çıkış Yap
                    </button>
                </div>
            </div>
        </>
    );
}
