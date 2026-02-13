import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    const dbUrl = process.env.DATABASE_URL;

    const options: ConstructorParameters<typeof PrismaClient>[0] = {
        log: ["error", "warn"],
    };

    // Append connection_limit only if DATABASE_URL exists
    if (dbUrl) {
        const separator = dbUrl.includes("?") ? "&" : "?";
        options.datasources = {
            db: { url: `${dbUrl}${separator}connection_limit=1` },
        };
    }

    return new PrismaClient(options);
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

globalForPrisma.prisma = prisma;
