import Link from "next/link";
import { Instagram, Youtube, Music, Disc } from "lucide-react";

interface FooterProps {
    socialLinks: {
        platform: string;
        url: string;
    }[];
}

const socialIcons: Record<string, any> = {
    Instagram,
    YouTube: Youtube,
    Spotify: Music,
    "Apple Music": Disc,
};

export function Footer({ socialLinks }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 bg-[#080808] border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center gap-8">
                    <div className="flex gap-6">
                        {socialLinks.map((link, i) => {
                            const Icon = socialIcons[link.platform] || Music;
                            return (
                                <a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-[#39ff14] transition-colors p-2 hover:bg-white/5 rounded-full"
                                    title={link.platform}
                                >
                                    <Icon className="h-6 w-6" />
                                </a>
                            );
                        })}
                    </div>

                    <div className="flex flex-col items-center gap-4 text-center">
                        <h2 className="text-3xl font-oswald font-bold tracking-widest bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                            NADİR UZ
                        </h2>
                        <p className="text-gray-500 text-sm font-medium">
                            &copy; {currentYear} Nadir UZ. Tüm hakları saklıdır.
                        </p>
                    </div>

                    <Link
                        href="/admin"
                        className="text-[10px] uppercase tracking-[0.2em] text-gray-700 hover:text-[#39ff14] transition-colors"
                    >
                        Yönetim Paneli Girişi
                    </Link>
                </div>
            </div>
        </footer>
    );
}
