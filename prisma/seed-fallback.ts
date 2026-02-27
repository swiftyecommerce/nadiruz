import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.artistProfile.create({
        data: {
            stageName: "Nadir UZ",
            shortBio: "Profesyonel Müzisyen & Prodüktör",
            longBio: "Nadir UZ, müzik prodüksiyonu ve performansı üzerine yoğunlaşan profesyonel bir sanatçıdır.",
            heroTagline: "YENİ ÇIKAN",
            heroButtonText: "SPOTIFY'DA DİNLE",
            heroButtonUrl: "#"
        }
    });

    await prisma.contactInfo.create({
        data: {
            managementEmail: "iletisim@nadiruz.com",
            bookingEmail: "booking@nadiruz.com",
            whatsappNumber: "+905555555555"
        }
    });

    console.log("Database seeded successfully with basic Profile and Contact info!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
