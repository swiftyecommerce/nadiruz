"use client";

import { format } from "date-fns";
import { Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/Button";

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
                                <div className="flex items-center gap-3 pt-3 border-t border-white/5 opacity-60 group-hover:opacity-100 transition-opacity">
                                    {release.appleMusicUrl && (
                                        <a href={release.appleMusicUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="Apple Music">
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    )}
                                    {release.youtubeMusicUrl && (
                                        <a href={release.youtubeMusicUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="YouTube Music">
                                            <ExternalLink className="h-4 w-4" />
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
