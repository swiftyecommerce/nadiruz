import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const contact = await prisma.contactInfo.findFirst();
        return NextResponse.json(contact || {
            id: "default_contact",
            managementEmail: "mgmt@nadiruz.net",
            bookingEmail: "booking@nadiruz.net",
            pressEmail: "",
            whatsappNumber: "",
            instagramDmLink: "",
        });
    } catch (error) {
        console.error("Contact GET error:", error);
        return NextResponse.json({ message: "DB error" }, { status: 500 });
    }
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

        return NextResponse.json(contact);
    } catch (error) {
        console.error("Contact POST error:", error);
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ message }, { status: 500 });
    }
}
