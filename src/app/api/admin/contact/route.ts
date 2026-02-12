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
        const { id, ...updateData } = data;

        const contact = await prisma.contactInfo.upsert({
            where: { id: id || "default_contact" },
            update: updateData,
            create: {
                ...updateData,
                id: id || "default_contact",
            },
        });

        tryRevalidate();
        return NextResponse.json(contact);
    } catch (error) {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
