"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

interface Video {
    id: string;
    title: string;
    youtubeUrl: string;
    thumbnailUrl: string;
}

interface VideoGalleryProps {
    videos: Video[];
}

export function VideoGallery({ videos }: VideoGalleryProps) {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    const getEmbedUrl = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
    };

    return (
        <section className="py-24 bg-[#0d0d0d]">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-oswald font-bold mb-16 text-center">
                    Son <span className="text-[#39ff14]">Videolar</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video) => (
                        <div
                            key={video.id}
                            className="group cursor-pointer space-y-4"
                            onClick={() => setSelectedVideo(video)}
                        >
                            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/5 transition-all duration-500 group-hover:border-[#39ff14]/30">
                                <img
                                    src={video.thumbnailUrl}
                                    alt={video.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-16 h-16 bg-[#39ff14] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.5)]">
                                        <Play className="h-6 w-6 text-black fill-current ml-1" />
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-oswald font-bold tracking-wide group-hover:text-[#39ff14] transition-colors duration-300 line-clamp-1">
                                {video.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                    onClick={() => setSelectedVideo(null)}
                >
                    <div
                        className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-white hover:text-[#39ff14] z-10 transition-colors"
                            onClick={() => setSelectedVideo(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                        <iframe
                            src={`${getEmbedUrl(selectedVideo.youtubeUrl)}?autoplay=1`}
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
