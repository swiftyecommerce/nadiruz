"use client";

import { format } from "date-fns";
import { Play } from "lucide-react";

// Platform Icons (Simple SVGs)
const Icons = {
    Spotify: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.2-1.32 9.6-0.66 13.319 1.62.42.18.6.78.422 1.201zm.12-3.36C15.54 8.7 9.06 8.461 5.28 9.601c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.439-1.321 11.519-1.021 15.119 1.141.54.3.72.96.42 1.5-.3.54-1.02.72-1.559.42z" />
        </svg>
    ),
    AppleMusic: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.17 14.38c-.35.14-.74.22-1.17.22-1.66 0-3-1.34-3-3 0-1.26.79-2.34 1.91-2.78V6.5h3.09v2h-1.09v6.86c0 .36-.26.83-.74 1.02z" />
        </svg>
    ),
    YoutubeMusic: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <circle cx="12" cy="12" r="10" />
            <polygon points="10 8 16 12 10 16 10 8" fill="#000" />
        </svg>
    ),
    Deezer: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M2 10.5h3v7H2zm4-3h3v10H6zm4-3h3v13h-3zm4 4h3v9h-3z" />
        </svg>
    ),
};

interface Release {
    id: string;
    title: string;
    releaseType: string;
    coverImageUrl: string;
    releaseDate: Date;
    spotifyUrl: string | null;
    appleMusicUrl: string | null;
    youtubeMusicUrl: string | null;
    deezerUrl?: string | null;
}

interface DiscographyProps {
    releases: Release[];
}

export function Discography({ releases }: DiscographyProps) {
    if (!releases || releases.length === 0) return null;

    return (
        <section className="py-24 bg-black border-t border-white/5">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-oswald font-bold mb-12 text-center">
                    DİSKOGRAFİ
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {releases.map((release) => (
                        <div key={release.id} className="group relative bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/5 hover:border-[#39ff14]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#39ff14]/10 hover:-translate-y-2">
                            <div className="aspect-square relative overflow-hidden">
                                <img
                                    src={release.coverImageUrl}
                                    alt={release.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />

                                {/* Overlay with primary action */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                                    {release.spotifyUrl && (
                                        <a
                                            href={release.spotifyUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-[#39ff14] text-black p-3 rounded-full hover:scale-110 transition-transform"
                                            title="Spotify'da Dinle"
                                        >
                                            <Play className="h-6 w-6 fill-current" />
                                        </a>
                                    )}
                                </div>

                                {/* Release Type Badge */}
                                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur text-white text-[10px] font-oswald uppercase tracking-wider px-2 py-1 rounded border border-white/10">
                                    {release.releaseType}
                                </div>
                            </div>

                            <div className="p-5 space-y-2">
                                <div>
                                    <h3 className="text-white font-oswald font-bold text-lg leading-tight group-hover:text-[#39ff14] transition-colors truncate">
                                        {release.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm font-medium mt-1">
                                        {format(new Date(release.releaseDate), "yyyy")}
                                    </p>
                                </div>

                                {/* Platforms Mini Links */}
                                <div className="flex items-center gap-4 pt-3 border-t border-white/5 opacity-60 group-hover:opacity-100 transition-opacity">
                                    {release.appleMusicUrl && (
                                        <a href={release.appleMusicUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#fa243c] transition-colors" title="Apple Music">
                                            <Icons.AppleMusic className="h-5 w-5" />
                                        </a>
                                    )}
                                    {release.youtubeMusicUrl && (
                                        <a href={release.youtubeMusicUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ff0000] transition-colors" title="YouTube Music">
                                            <Icons.YoutubeMusic className="h-5 w-5" />
                                        </a>
                                    )}
                                    {release.deezerUrl && (
                                        <a href={release.deezerUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#a238ff] transition-colors" title="Deezer">
                                            <Icons.Deezer className="h-5 w-5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
