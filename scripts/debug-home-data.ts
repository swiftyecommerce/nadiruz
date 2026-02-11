
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Starting debug script...");
    try {
        await prisma.$connect();
        console.log("DB Connection SUCCESS");

        const featuredVideo = await prisma.video.findFirst({ where: { isFeatured: true } });

        if (featuredVideo) {
            console.log("Featured Video FOUND");
            console.log("ID:", featuredVideo.id);
            console.log("Title:", featuredVideo.title);
            console.log("URL:", featuredVideo.youtubeUrl);
        } else {
            console.log("Featured Video is NULL");
        }

    } catch (error) {
        console.error("ERROR:");
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
