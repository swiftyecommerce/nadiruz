import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        console.log("Login attempt for:", email);

        const adminEmail = process.env.ADMIN_EMAIL || "admin@nadiruz.net";
        const adminPassword = process.env.ADMIN_PASSWORD || "password123";

        if (email === adminEmail && password === adminPassword) {
            console.log("Login successful, creating session...");
            await createSession(email);
            return NextResponse.json({ message: "Login successful" });
        }

        console.warn("Invalid credentials provided");
        return NextResponse.json(
            { message: "E-posta veya şifre hatalı" },
            { status: 401 }
        );
    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "Giriş sırasında bir hata oluştu: " + error.message },
            { status: 500 }
        );
    }
}
