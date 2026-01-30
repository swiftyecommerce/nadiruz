// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

async function main() {
    console.log("Seed skipped due to local environment setup. The application uses fallback mock data.");
    /*
    // Artist Profile
    await prisma.artistProfile.upsert({
      where: { id: "default_profile" },
      update: {},
      create: {
        id: "default_profile",
        stageName: "Nadir UZ",
        realName: "Nadir Uzun",
        shortBio: "Independent Turkish rapper known for cinematic storytelling and hard-hitting lines.",
        longBio: "Nadir UZ is a Turkish rapper who has been making waves in the independent scene. With a focus on authentic storytelling and unique soundscapes, he continues to push the boundaries of Turkish Hip-Hop. From the streets to the stage, Nadir UZ brings a raw energy that resonates with his growing audience.",
        heroTagline: "RAP ARTIST / STORYTELLER",
        heroHighlight: "New single 'GÖLGE' out now",
        location: "Istanbul, Turkey",
      },
    });
  
    // Social Links
    const socialLinks = [
      { platform: "Spotify", url: "https://spotify.com", isPrimary: true, order: 1 },
      { platform: "YouTube", url: "https://youtube.com", isPrimary: true, order: 2 },
      { platform: "Instagram", url: "https://instagram.com", isPrimary: true, order: 3 },
      { platform: "TikTok", url: "https://tiktok.com", isPrimary: false, order: 4 },
      { platform: "Apple Music", url: "https://apple.com", isPrimary: false, order: 5 },
    ];
  
    for (const link of socialLinks) {
      await prisma.socialLink.create({ data: link });
    }
  
    // ... rest of the seed code
    */
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
/*
.finally(async () => {
  await prisma.$disconnect();
});
*/
