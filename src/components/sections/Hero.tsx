"use client";


import { useState } from "react";
import { Play, Music } from "lucide-react";
import { Button } from "@/components/Button";

interface HeroProps {
    profile: {
        stageName: string;
        heroTagline: string;
        shortBio: string;
        heroHighlight: string;
    };
    featuredVideo: {
        youtubeUrl: string;
        thumbnailUrl: string;
    } | null;
}

export function Hero({ profile, featuredVideo }: HeroProps) {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const getEmbedUrl = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#39ff14]/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#9d00ff]/10 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side: Content */}
                <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                    <div className="space-y-2">
                        <h2 className="text-[#39ff14] font-oswald text-xl tracking-widest glow-neon">
                            {profile.heroHighlight}
                        </h2>
                        <h1 className="text-7xl md:text-9xl font-oswald font-bold leading-none tracking-tighter">
                            {profile.stageName}
                        </h1>
                        <p className="text-2xl md:text-3xl font-oswald text-gray-400">
                            {profile.heroTagline}
                        </p>
                    </div>

                    <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
                        {profile.shortBio}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button size="lg" className="group">
                            <Music className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                            Spotify'da Dinle
                        </Button>
                        <Button variant="outline" size="lg" onClick={() => setIsVideoOpen(true)}>
                            Son Videoyu İzle
                        </Button>
                    </div>
                </div>

                {/* Right Side: Video Thumbnail */}
                {featuredVideo && (
                    <div className="relative group cursor-pointer animate-in fade-in slide-in-from-right duration-1000" onClick={() => setIsVideoOpen(true)}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 rounded-2xl transition-all duration-500 group-hover:from-black/60" />
                        <img
                            src={featuredVideo.thumbnailUrl}
                            alt="Latest Video"
                            className="w-full aspect-video object-cover rounded-2xl border border-white/10 group-hover:border-[#39ff14]/50 transition-all duration-500 scale-95 group-hover:scale-100"
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="w-20 h-20 bg-[#39ff14] rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-[0_0_30px_rgba(57,255,20,0.5)]">
                                <Play className="h-8 w-8 text-black fill-current ml-1" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Video Modal */}
            {isVideoOpen && featuredVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setIsVideoOpen(false)}>
                    <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="absolute top-4 right-4 text-white hover:text-[#39ff14] z-10 transition-colors"
                            onClick={() => setIsVideoOpen(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                        <iframe
                            src={`${getEmbedUrl(featuredVideo.youtubeUrl)}?autoplay=1`}
                            className="w-full h-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
