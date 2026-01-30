import prisma from "@/lib/prisma";
import { ShowsManager } from "./ShowsManager";

export default async function ShowsPage() {
    const shows = await prisma.show.findMany({
        orderBy: { date: "asc" },
    });

    return (
        <div className="space-y-8 max-w-6xl">
            <div>
                <h2 className="text-4xl font-oswald font-bold tracking-tight">TOUR <span className="text-[#39ff14]">SCHEDULE</span></h2>
                <p className="text-gray-500 font-medium">Manage your upcoming concerts and events.</p>
            </div>

            <div className="bg-[#111111] border border-white/5 p-10 rounded-3xl shadow-2xl">
                <ShowsManager initialData={shows} />
            </div>
        </div>
    );
}
