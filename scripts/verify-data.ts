
import prisma from '../src/lib/json-db';

async function verifyDataStructure() {
    const profile = await prisma.artistProfile.findFirst();
    const video = await prisma.video.findFirst({ where: { isFeatured: true } });

    console.log("Profile:", profile);
    console.log("Featured Video:", video);

    // Check if profile has required fields for Hero
    if (profile) {
        if (!profile.stageName) console.warn("Missing stageName");
        if (!profile.heroTagline) console.warn("Missing heroTagline");
    } else {
        console.log("No profile found, defaults will be used.");
    }
}

verifyDataStructure();
