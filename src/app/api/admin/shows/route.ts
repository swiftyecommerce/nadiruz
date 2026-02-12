import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

function tryRevalidate() {
    try { revalidatePath("/"); } catch { /* ignore */ }
}

export async function POST(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const data = await request.json();
        const show = await prisma.show.create({
            data: {
                ...data,
                date: new Date(data.date),
            },
        });
        tryRevalidate();
        return NextResponse.json(show);
    } catch (error) {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const data = await request.json();
        const { id, ...updateData } = data;
        const show = await prisma.show.update({
            where: { id },
            data: {
                ...updateData,
                date: new Date(updateData.date),
            },
        });
        tryRevalidate();
        return NextResponse.json(show);
    } catch (error) {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ message: "ID required" }, { status: 400 });

    try {
        await prisma.show.delete({ where: { id } });
        tryRevalidate();
        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
