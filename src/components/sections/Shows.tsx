"use client";

import { format } from "date-fns";
import { Calendar, MapPin, Ticket, ExternalLink, AlertCircle } from "lucide-react";
import { Button } from "@/components/Button";

interface Show {
    id: string;
    city: string;
    venue: string;
    date: Date;
    ticketUrl: string | null;
    note: string | null;
    isCancelled: boolean;
}

interface ShowsProps {
    shows: Show[];
}

export function Shows({ shows }: ShowsProps) {
    const upcomingShows = shows.filter(s => new Date(s.date) >= new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <section className="py-24 bg-[#0a0a0a]">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-oswald font-bold mb-16 text-center lg:text-left">
                    Konser <span className="text-[#39ff14]">Takvimi</span>
                </h2>

                {upcomingShows.length > 0 ? (
                    <div className="space-y-4">
                        {upcomingShows.map((show) => (
                            <div
                                key={show.id}
                                className={`group relative flex flex-wrap items-center justify-between p-8 bg-[#111111] border-l-4 ${show.isCancelled ? 'border-red-500 opacity-60' : 'border-[#39ff14]'} rounded-r-2xl transition-all duration-300 hover:bg-[#1a1a1a]`}
                            >
                                <div className="flex flex-wrap items-center gap-8 md:gap-16">
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-oswald font-bold text-[#39ff14]">
                                            {format(new Date(show.date), "dd")}
                                        </span>
                                        <span className="text-gray-400 font-oswald uppercase">
                                            {format(new Date(show.date), "MMM yyyy")}
                                        </span>
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-oswald font-bold tracking-wide">
                                            {show.venue}
                                        </h3>
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <MapPin className="h-4 w-4 text-[#39ff14]" />
                                            <span>{show.city}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 md:mt-0 flex items-center gap-6">
                                    {show.note && (
                                        <span className="text-sm text-gray-500 italic">{show.note}</span>
                                    )}
                                    {show.isCancelled ? (
                                        <span className="bg-red-500/10 text-red-500 font-oswald font-bold px-4 py-2 rounded border border-red-500/20">
                                            İPTAL EDİLDİ
                                        </span>
                                    ) : (
                                        show.ticketUrl && (
                                            <Button variant="outline" size="sm" onClick={() => window.open(show.ticketUrl!, "_blank")} className="group-hover:bg-[#39ff14] group-hover:text-black">
                                                <Ticket className="mr-2 h-4 w-4" />
                                                Biletler
                                            </Button>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-[#111111] rounded-2xl border border-dashed border-white/10">
                        <p className="text-2xl font-oswald text-gray-500">Henüz planlanmış bir konser bulunmuyor.</p>
                        <p className="text-[#39ff14] mt-2">Güncellemeler için takipte kalın!</p>
                    </div>
                )}
            </div>
        </section>
    );
}
