import { ProfileForm } from "./ProfileForm";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
    const rawProfile = await prisma.artistProfile.findFirst();

    // Fallback if empty in DB
    const profile = rawProfile || {
        id: "default_profile",
        stageName: "",
        realName: "",
        heroTagline: "",
        heroHighlight: "",
        shortBio: "",
        longBio: "",
        location: "",
        genre: "",
        activeSince: "",
        profileImageUrl: "",
        heroButtonText: "",
        heroButtonUrl: "",
        aboutTitle: "",
        aboutHighlight: "",
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h2 className="text-4xl font-oswald font-bold tracking-tight">SANATÇI <span className="text-[#39ff14]">PROFİLİ</span></h2>
                <p className="text-gray-500 font-medium">Genel kimliğinizi ve biyografinizi buradan güncelleyin.</p>
            </div>

            <div className="bg-[#111111] border border-white/5 p-10 rounded-3xl shadow-2xl">
                <ProfileForm initialData={profile} />
            </div>
        </div>
    );
}
