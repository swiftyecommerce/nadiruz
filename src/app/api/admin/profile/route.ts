import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

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
