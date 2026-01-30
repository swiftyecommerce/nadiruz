import prisma from "@/lib/prisma";
import {
    Music,
    Youtube,
    Calendar,
    ExternalLink,
    ChevronRight
} from "lucide-react";
import Link from "next/link";

async function getStats() {
    try {
        const releasesCount = await prisma.release.count();
        const videosCount = await prisma.video.count();
        const upcomingShowsCount = await prisma.show.count({
            where: { date: { gte: new Date() } }
        });
        const featuredRelease = await prisma.release.findFirst({ where: { isFeatured: true } });
        const featuredVideo = await prisma.video.findFirst({ where: { isFeatured: true } });

        return { releasesCount, videosCount, upcomingShowsCount, featuredRelease, featuredVideo };
    } catch (error) {
        return {
            releasesCount: 0,
            videosCount: 0,
            upcomingShowsCount: 0,
            featuredRelease: null,
            featuredVideo: null
        };
    }
}

export default async function AdminDashboard() {
    const stats = await getStats();

    const cards = [
        { label: "Releases", value: stats.releasesCount, icon: Music, color: "text-[#39ff14]", href: "/admin/dashboard/releases" },
        { label: "Videos", value: stats.videosCount, icon: Youtube, color: "text-red-500", href: "/admin/dashboard/videos" },
        { label: "Upcoming Shows", value: stats.upcomingShowsCount, icon: Calendar, color: "text-blue-500", href: "/admin/dashboard/shows" },
    ];

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-4xl font-oswald font-bold tracking-tight">KONTROL <span className="text-[#39ff14]">PANELİ</span></h2>
                    <p className="text-gray-500 font-medium">Sanatçı profilinizi ve içeriğinizi buradan yönetin.</p>
                </div>
                <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-2 text-[#39ff14] hover:text-[#b0ff9d] font-oswald text-sm uppercase tracking-widest transition-colors"
                >
                    Sitede Görüntüle <ExternalLink className="h-4 w-4" />
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {cards.map((card) => (
                    <Link
                        key={card.label}
                        href={card.href}
                        className="p-8 bg-[#111111] border border-white/5 rounded-3xl hover:border-white/10 transition-all group"
                    >
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-gray-500 font-oswald text-xs uppercase tracking-widest">{card.label === "Releases" ? "Yayınlar" : card.label === "Videos" ? "Videolar" : "Konserler"}</p>
                                <p className="text-5xl font-oswald font-bold tracking-tighter">{card.value}</p>
                            </div>
                            <div className={cn("p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform", card.color)}>
                                <card.icon className="h-8 w-8" />
                            </div>
                        </div>
                        <div className="mt-6 flex items-center text-[10px] font-oswald uppercase tracking-widest text-[#39ff14] opacity-0 group-hover:opacity-100 transition-opacity">
                            Yönet <ChevronRight className="h-3 w-3" />
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="p-8 bg-[#111111] border border-white/5 rounded-3xl space-y-6">
                    <h3 className="text-xl font-oswald font-bold uppercase tracking-widest border-b border-white/5 pb-4">Öne Çıkan Yayın</h3>
                    {stats.featuredRelease ? (
                        <div className="flex items-center gap-6">
                            <img src={stats.featuredRelease.coverImageUrl} className="w-24 h-24 rounded-xl object-cover" alt="" />
                            <div>
                                <p className="text-lg font-bold">{stats.featuredRelease.title}</p>
                                <p className="text-gray-500 text-sm">{stats.featuredRelease.releaseType}</p>
                                <Link href="/admin/dashboard/releases" className="text-[#39ff14] text-xs font-oswald uppercase mt-2 block hover:underline">Düzenle</Link>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">Seçili yayın yok.</p>
                    )}
                </div>

                <div className="p-8 bg-[#111111] border border-white/5 rounded-3xl space-y-6">
                    <h3 className="text-xl font-oswald font-bold uppercase tracking-widest border-b border-white/5 pb-4">Öne Çıkan Video</h3>
                    {stats.featuredVideo ? (
                        <div className="flex items-center gap-6">
                            <img src={stats.featuredVideo.thumbnailUrl} className="w-24 h-24 rounded-xl object-cover" alt="" />
                            <div>
                                <p className="text-lg font-bold">{stats.featuredVideo.title}</p>
                                <Link href="/admin/dashboard/videos" className="text-[#39ff14] text-xs font-oswald uppercase mt-2 block hover:underline">Düzenle</Link>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">Seçili video yok.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

// Helper to support cn in server component without importing client utils if needed
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
