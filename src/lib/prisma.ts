import prismaJson from './json-db';

/**
 * Prisma Client Adapter using JSON File Fallback
 * 
 * Since the native Prisma Client cannot be generated in this environment,
 * we are using a custom JSON-file based adapter that mimics the Prisma API.
 */

const prisma = prismaJson;

export default prisma;
