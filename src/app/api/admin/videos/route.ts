import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const videos = await prisma.video.findMany({ orderBy: { id: "desc" } });
        return NextResponse.json(videos);
    } catch (error) {
        console.error("Videos GET error:", error);
        return NextResponse.json({ message: "DB error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const data = await request.json();
        const { id, isFeatured, ...rest } = data;

        if (isFeatured) {
            await prisma.video.updateMany({
                where: { isFeatured: true },
                data: { isFeatured: false },
            });
        }

        const video = await prisma.video.create({
            data: { ...rest, isFeatured },
        });
        return NextResponse.json(video);
    } catch (error) {
        console.error("Videos POST error:", error);
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const data = await request.json();
        const { id, isFeatured, ...rest } = data;

        if (isFeatured) {
            await prisma.video.updateMany({
                where: { isFeatured: true },
                data: { isFeatured: false },
            });
        }

        const video = await prisma.video.update({
            where: { id },
            data: { ...rest, isFeatured },
        });
        return NextResponse.json(video);
    } catch (error) {
        console.error("Videos PUT error:", error);
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ message: "ID required" }, { status: 400 });

    try {
        await prisma.video.delete({ where: { id } });
        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        console.error("Videos DELETE error:", error);
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ message }, { status: 500 });
    }
}
