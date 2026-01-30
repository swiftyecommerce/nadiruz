import prisma from "@/lib/prisma";
import { ProfileForm } from "./ProfileForm";

export default async function ProfilePage() {
    const defaultProfile = {
        id: "default",
        stageName: "Nadir UZ",
        realName: "",
        heroTagline: "RAP SANATÇISI",
        heroHighlight: "YENİ ÇIKAN",
        shortBio: "",
        longBio: "",
        location: "İstanbul, Türkiye",
        genre: "Hip-Hop",
        activeSince: "2018",
        profileImageUrl: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb1?auto=format&fit=crop&q=80&w=1000",
    };
    const profile = await prisma.artistProfile.findFirst() || defaultProfile;

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
