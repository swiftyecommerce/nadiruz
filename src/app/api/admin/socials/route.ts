import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const links = await prisma.socialLink.findMany({ orderBy: { order: "asc" } });
        return NextResponse.json(links);
    } catch (error) {
        console.error("Socials GET error:", error);
        return NextResponse.json({ message: "DB error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const data = await request.json();
        const link = await prisma.socialLink.create({ data });
        return NextResponse.json(link);
    } catch (error) {
        console.error("Socials POST error:", error);
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const data = await request.json();
        const { id, ...updateData } = data;
        const link = await prisma.socialLink.update({
            where: { id },
            data: updateData,
        });
        return NextResponse.json(link);
    } catch (error) {
        console.error("Socials PUT error:", error);
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
        await prisma.socialLink.delete({ where: { id } });
        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        console.error("Socials DELETE error:", error);
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ message }, { status: 500 });
    }
}
