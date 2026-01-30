import prisma from "@/lib/prisma";
import { VideosManager } from "./VideosManager";

export default async function VideosPage() {
    const videos = await prisma.video.findMany({
        orderBy: { id: "desc" },
    });

    return (
        <div className="space-y-8 max-w-6xl">
            <div>
                <h2 className="text-4xl font-oswald font-bold tracking-tight">VİDEO <span className="text-[#39ff14]">GALERİSİ</span></h2>
                <p className="text-gray-500 font-medium">Müzik videolarınızı ve görsel içeriklerinizi yönetin.</p>
            </div>

            <div className="bg-[#111111] border border-white/5 p-10 rounded-3xl shadow-2xl">
                <VideosManager initialData={videos} />
            </div>
        </div>
    );
}
