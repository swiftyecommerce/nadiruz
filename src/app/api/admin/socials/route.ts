import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const data = await request.json();
        const link = await prisma.socialLink.create({ data });
        revalidatePath("/");
        return NextResponse.json(link);
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
        const link = await prisma.socialLink.update({
            where: { id },
            data: updateData,
        });
        revalidatePath("/");
        return NextResponse.json(link);
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
        await prisma.socialLink.delete({ where: { id } });
        revalidatePath("/");
        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
