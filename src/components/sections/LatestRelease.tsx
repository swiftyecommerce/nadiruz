"use client";

import { format } from "date-fns";
import { Music, ExternalLink } from "lucide-react";
import { Button } from "@/components/Button";

interface ReleaseProps {
    release: {
        title: string;
        releaseType: string;
        coverImageUrl: string;
        description: string | null;
        releaseDate: Date;
        spotifyUrl: string | null;
        appleMusicUrl: string | null;
        youtubeMusicUrl: string | null;
        deezerUrl?: string | null;
    } | null;
}

export function LatestRelease({ release }: ReleaseProps) {
    if (!release) return null;

    const isNew = (date: Date) => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return date > thirtyDaysAgo;
    };

    return (
        <section className="py-24 bg-[#0d0d0d]">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-oswald font-bold mb-16 text-center lg:text-left">
                    Son <span className="text-[#39ff14]">Yayın</span>
                </h2>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative group overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                        <img
                            src={release.coverImageUrl}
                            alt={release.title}
                            className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {isNew(release.releaseDate) && (
                            <div className="absolute top-6 left-6 bg-[#39ff14] text-black font-oswald font-bold px-4 py-1 rounded-full text-sm animate-pulse">
                                YENİ YAYIN
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="space-y-8 text-center lg:text-left">
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                                <span className="text-[#39ff14] font-oswald text-lg uppercase tracking-wider border border-[#39ff14]/30 px-3 py-1 rounded">
                                    {release.releaseType}
                                </span>
                                <span className="text-gray-400 font-oswald">
                                    YAYIN TARİHİ {format(release.releaseDate, "dd MMM, yyyy")}
                                </span>
                            </div>
                            <h3 className="text-6xl md:text-8xl font-oswald font-bold tracking-tight">
                                {release.title}
                            </h3>
                            <p className="text-xl text-gray-400 max-w-xl">
                                {release.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            {release.spotifyUrl && (
                                <Button variant="outline" className="min-w-[160px]" onClick={() => window.open(release.spotifyUrl!, "_blank")}>
                                    Spotify
                                </Button>
                            )}
                            {release.appleMusicUrl && (
                                <Button variant="outline" className="min-w-[160px]" onClick={() => window.open(release.appleMusicUrl!, "_blank")}>
                                    Apple Music
                                </Button>
                            )}
                            {release.youtubeMusicUrl && (
                                <Button variant="outline" className="min-w-[160px]" onClick={() => window.open(release.youtubeMusicUrl!, "_blank")}>
                                    YouTube Music
                                </Button>
                            )}
                        </div>

                        <p className="text-sm text-gray-500 flex items-center justify-center lg:justify-start gap-2 italic">
                            <Music className="h-4 w-4" /> Tüm dijital platformlarda yayında
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
