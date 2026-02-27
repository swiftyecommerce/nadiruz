import { ContactManager } from "./ContactManager";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ContactInfoPage() {
    const contactInfo = await prisma.contactInfo.findFirst();

    // Default structure if empty in DB
    const initialData = contactInfo || {
        id: "default_contact",
        managementEmail: "",
        bookingEmail: "",
        pressEmail: "",
        whatsappNumber: "",
        instagramDmLink: "",
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h2 className="text-4xl font-oswald font-bold tracking-tight">İLETİŞİM <span className="text-[#39ff14]">BİLGİLERİ</span></h2>
                <p className="text-gray-500 font-medium">Sitede görünen profesyonel iletişim detaylarını güncelleyin.</p>
            </div>

            <div className="bg-[#111111] border border-white/5 p-10 rounded-3xl shadow-2xl">
                <ContactManager initialData={initialData} />
            </div>
        </div>
    );
}
