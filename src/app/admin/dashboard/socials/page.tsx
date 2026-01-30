import prisma from "@/lib/prisma";
import { SocialLinksManager } from "./SocialLinksManager";

export default async function SocialsPage() {
    const socialLinks = await prisma.socialLink.findMany({
        orderBy: { order: "asc" },
    });

    return (
        <div className="space-y-8 max-w-5xl">
            <div>
                <h2 className="text-4xl font-oswald font-bold tracking-tight">SOCIAL <span className="text-[#39ff14]">LINKS</span></h2>
                <p className="text-gray-500 font-medium">Manage your streaming platforms and social media profiles.</p>
            </div>

            <div className="bg-[#111111] border border-white/5 p-10 rounded-3xl shadow-2xl">
                <SocialLinksManager initialData={socialLinks} />
            </div>
        </div>
    );
}
