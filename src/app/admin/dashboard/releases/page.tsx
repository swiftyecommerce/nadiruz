import prisma from "@/lib/prisma";
import { ReleasesManager } from "./ReleasesManager";

export default async function ReleasesPage() {
    const releases = await prisma.release.findMany({
        orderBy: { releaseDate: "desc" },
    });

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-4xl font-oswald font-bold tracking-tight">MÜZİK <span className="text-[#39ff14]">YAYINLARI</span></h2>
                <p className="text-gray-500 font-medium">Single, EP ve albümlerinizi buradan yönetin.</p>
            </div>

            <div className="bg-[#111111] border border-white/5 p-10 rounded-3xl shadow-2xl">
                <ReleasesManager initialData={releases} />
            </div>
        </div>
    );
}
