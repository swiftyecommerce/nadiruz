import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const dbPath = path.join(process.cwd(), "database.json");
  if (!fs.existsSync(dbPath)) {
    console.error("database.json not found at", dbPath);
    return;
  }

  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

  // 1. ArtistProfile
  if (data.ArtistProfile) {
    for (const item of data.ArtistProfile) {
      await prisma.artistProfile.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      });
    }
    console.log(`Seeded ${data.ArtistProfile.length} ArtistProfiles`);
  }

  // 2. SocialLink
  if (data.SocialLink) {
    for (const item of data.SocialLink) {
      // id might be missing or generated in json-db. reliable match is difficult.
      // We will try to upsert by ID if it exists, otherwise create.
      // Ideally we should truncate or deleteMany to avoid duplicates if ID logic is fuzzy.
      // For safety in this migration, let's delete all and recreate, OR upsert by unique ID if available.
      // Since sqlite/json-db IDs are random strings, we can use them.
      await prisma.socialLink.upsert({
        where: { id: item.id },
        update: item,
        create: item
      });
    }
    console.log(`Seeded ${data.SocialLink.length} SocialLinks`);
  }

  // 3. Release
  if (data.Release) {
    for (const item of data.Release) {
      await prisma.release.upsert({
        where: { id: item.id },
        update: {
          ...item,
          releaseDate: new Date(item.releaseDate) // ensure Date conversion
        },
        create: {
          ...item,
          releaseDate: new Date(item.releaseDate)
        }
      });
    }
    console.log(`Seeded ${data.Release.length} Releases`);
  }

  // 4. Video
  if (data.Video) {
    for (const item of data.Video) {
      await prisma.video.upsert({
        where: { id: item.id },
        update: item,
        create: item
      });
    }
    console.log(`Seeded ${data.Video.length} Videos`);
  }

  // 5. Show
  if (data.Show) {
    for (const item of data.Show) {
      await prisma.show.upsert({
        where: { id: item.id },
        update: {
          ...item,
          date: new Date(item.date)
        },
        create: {
          ...item,
          date: new Date(item.date)
        }
      });
    }
    console.log(`Seeded ${data.Show.length} Shows`);
  }

  // 6. ContactInfo
  if (data.ContactInfo) {
    for (const item of data.ContactInfo) {
      await prisma.contactInfo.upsert({
        where: { id: item.id },
        update: item,
        create: item
      });
    }
    console.log(`Seeded ${data.ContactInfo.length} ContactInfo`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
