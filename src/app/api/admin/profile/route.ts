import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {

    try {
        const rawProfile = await prisma.artistProfile.findFirst();
        if (!rawProfile) {
            return NextResponse.json({
                id: "default_profile",
                stageName: "Nadir UZ",
                realName: "",
                heroTagline: "RAP SANATÇISI",
                heroHighlight: "YENİ ÇIKAN",
                shortBio: "",
                longBio: "",
                location: "İstanbul, Türkiye",
                genre: "Hip-Hop",
                activeSince: "2018",
                profileImageUrl: "",
            });
        }
        return NextResponse.json({
            ...rawProfile,
            realName: rawProfile.realName ?? "",
            heroTagline: rawProfile.heroTagline ?? "",
            heroHighlight: rawProfile.heroHighlight ?? "",
            aboutTitle: rawProfile.aboutTitle ?? "",
            aboutHighlight: rawProfile.aboutHighlight ?? "",
            location: rawProfile.location ?? "",
            heroButtonText: rawProfile.heroButtonText ?? "",
            heroButtonUrl: rawProfile.heroButtonUrl ?? "",
            genre: rawProfile.genre ?? "",
            activeSince: rawProfile.activeSince ?? "",
            profileImageUrl: rawProfile.profileImageUrl ?? "",
        });
    } catch (error) {
        console.error("Profile GET error:", error);
        return NextResponse.json({ message: "DB error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await request.json();
        const { id, ...updateData } = data;

        const profile = await prisma.artistProfile.upsert({
            where: { id: id || "default_profile" },
            update: updateData,
            create: {
                ...updateData,
                id: id || "default_profile",
            },
        });

        return NextResponse.json(profile);
    } catch (error) {
        console.error("Profile POST error:", error);
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ message }, { status: 500 });
    }
}
