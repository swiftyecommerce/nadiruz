import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Connecting to database...');
        await prisma.$connect();
        console.log('Connected successfully.');

        const count = await prisma.socialLink.count();
        console.log('SocialLink count:', count);

        const newLink = await prisma.socialLink.create({
            data: {
                platform: 'TestPlatform',
                url: 'https://test.com',
                order: 999,
                isPrimary: false
            }
        });
        console.log('Created link:', newLink);

        await prisma.socialLink.delete({ where: { id: newLink.id } });
        console.log('Deleted test link.');

    } catch (e) {
        console.error('Prisma Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
