import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {

    try {
        const releases = await prisma.release.findMany({ orderBy: { releaseDate: "desc" } });
        return NextResponse.json(releases);
    } catch (error) {
        console.error("Releases GET error:", error);
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
            await prisma.release.updateMany({
                where: { isFeatured: true },
                data: { isFeatured: false },
            });
        }

        const release = await prisma.release.create({
            data: {
                ...rest,
                isFeatured,
                releaseDate: new Date(rest.releaseDate),
            },
        });
        return NextResponse.json(release);
    } catch (error) {
        console.error("Release POST error:", error);
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
            await prisma.release.updateMany({
                where: { isFeatured: true },
                data: { isFeatured: false },
            });
        }

        const release = await prisma.release.update({
            where: { id },
            data: {
                ...rest,
                isFeatured,
                releaseDate: new Date(rest.releaseDate),
            },
        });
        return NextResponse.json(release);
    } catch (error) {
        console.error("Release PUT error:", error);
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
        await prisma.release.delete({ where: { id } });
        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        console.error("Release DELETE error:", error);
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ message }, { status: 500 });
    }
}
