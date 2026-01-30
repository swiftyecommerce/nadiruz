"use client";

import {
    Music,
    ExternalLink,
    Instagram,
    Youtube,
    Twitter,
    MessageSquare,
    Disc,
    Globe,
    Mic2,
    Music2,
    Cloud,
    Facebook,
    Play,
    Radio,
    Share2
} from "lucide-react";

interface SocialLink {
    id: string;
    platform: string;
    url: string;
    iconType?: string | null;
}

interface MusicPlatformsProps {
    links: SocialLink[];
}

const platformIcons: Record<string, any> = {
    Spotify: Music,
    YouTube: Youtube,
    Instagram: Instagram,
    TikTok: Music2,
    "Apple Music": Disc,
    Deezer: Mic2,
    SoundCloud: Cloud,
    Twitter: Twitter,
    Facebook: Facebook,
    X: Twitter,
    // Icon Picker fallbacks
    Globe: Globe,
    Music: Music,
    YoutubeIcon: Youtube,
    InstagramIcon: Instagram,
    Radio: Radio,
    Play: Play,
    Mic: Mic2,
    Disc: Disc,
    Share: Share2,
    Default: Globe,
};

export function MusicPlatforms({ links }: MusicPlatformsProps) {
    return (
        <section className="py-24 bg-[#0a0a0a]">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-oswald font-bold mb-16 text-center">
                    Dinle & <span className="text-[#39ff14]">Takip Et</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {links.map((link) => {
                        const Icon = platformIcons[link.iconType || ""] || platformIcons[link.platform] || platformIcons.Default;
                        return (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block p-8 bg-[#111111] border border-white/5 rounded-2xl transition-all duration-300 hover:border-[#39ff14]/50 hover:bg-[#1a1a1a] hover:-translate-y-2 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                                    <Icon className="h-24 w-24" />
                                </div>

                                <div className="relative z-10 flex items-center gap-6">
                                    <div className="p-4 bg-white/5 rounded-xl group-hover:bg-[#39ff14]/10 transition-colors duration-300">
                                        <Icon className="h-8 w-8 text-[#39ff14]" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-oswald font-bold group-hover:text-[#39ff14] transition-colors duration-300">
                                            {link.platform}
                                        </h3>
                                        <p className="text-gray-400 font-medium">Nadir UZ'u Takip Et</p>
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#39ff14] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
