import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'database.json');

// Helper to read DB
function readDb() {
    if (!fs.existsSync(DB_PATH)) {
        return {
            ArtistProfile: [],
            SocialLink: [],
            Release: [],
            Video: [],
            Show: [],
            ContactInfo: []
        };
    }
    try {
        return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    } catch (e) {
        return {
            ArtistProfile: [],
            SocialLink: [],
            Release: [],
            Video: [],
            Show: [],
            ContactInfo: []
        };
    }
}

// Helper to write DB
function writeDb(data: any) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Helper for filtering
const applyFilters = (data: any[], where: any) => {
    if (!where) return data;
    return data.filter((item: any) => {
        return Object.keys(where).every(key => {
            const filter = where[key];
            const val = item[key];

            // Handle date objects or date strings
            const compareVal = (v: any) => (v instanceof Date ? v.getTime() : new Date(v).getTime());

            if (typeof filter === 'object' && filter !== null) {
                if ('gte' in filter) return compareVal(val) >= compareVal(filter.gte);
                if ('lte' in filter) return compareVal(val) <= compareVal(filter.lte);
                if ('gt' in filter) return compareVal(val) > compareVal(filter.gt);
                if ('lt' in filter) return compareVal(val) < compareVal(filter.lt);
            }
            return val === filter;
        });
    });
};

// Generic CRUD Factory
const createModel = (modelName: string) => {
    return {
        findMany: async (args?: any) => {
            const db = readDb();
            let data = db[modelName] || [];

            if (args?.where) {
                data = applyFilters(data, args.where);
            }

            if (args?.orderBy) {
                const key = Object.keys(args.orderBy)[0];
                const direction = args.orderBy[key];
                data.sort((a: any, b: any) => {
                    if (direction === 'asc') return a[key] > b[key] ? 1 : -1;
                    return a[key] < b[key] ? 1 : -1;
                });
            }

            return data;
        },
        findFirst: async (args?: any) => {
            const db = readDb();
            let data = db[modelName] || [];
            if (args?.where) {
                data = applyFilters(data, args.where);
                return data[0] || null;
            }
            return data[0] || null;
        },
        create: async ({ data }: any) => {
            const db = readDb();
            const newItem = { id: Math.random().toString(36).substring(7), ...data };
            if (!db[modelName]) db[modelName] = [];
            db[modelName].push(newItem);
            writeDb(db);
            return newItem;
        },
        update: async ({ where, data }: any) => {
            const db = readDb();
            const list = db[modelName] || [];
            const index = list.findIndex((item: any) => item.id === where.id);
            if (index === -1) throw new Error("Not found");
            const updated = { ...list[index], ...data };
            list[index] = updated;
            writeDb(db);
            return updated;
        },
        updateMany: async ({ where, data }: any) => {
            const db = readDb();
            db[modelName] = (db[modelName] || []).map((item: any) => {
                const isMatch = Object.keys(where).every(key => item[key] === where[key]);
                if (isMatch) {
                    return { ...item, ...data };
                }
                return item;
            });
            writeDb(db);
            return { count: 0 }; // Return dummy count
        },
        delete: async ({ where }: any) => {
            const db = readDb();
            const list = db[modelName] || [];
            const filtered = list.filter((item: any) => item.id !== where.id);
            db[modelName] = filtered;
            writeDb(db);
            return { id: where.id }; // Return deleted dummy
        },
        count: async (args?: any) => {
            const db = readDb();
            let data = db[modelName] || [];
            if (args?.where) {
                data = applyFilters(data, args.where);
            }
            return data.length;
        },
        upsert: async ({ where, update, create }: any) => {
            const db = readDb();
            const list = db[modelName] || [];
            const existing = list.find((item: any) => item.id === where.id); // Upsert usually uses unique constraint
            // For simplify, assuming where checking id or we just try findFirst logic.
            // Actually, usually where is unique. Let's try to find it.
            // If we can't fully emulate proper where, we fallback to create if empty? 
            // Logic: Check if exists.
            if (existing) {
                // Update
                const index = list.indexOf(existing);
                list[index] = { ...existing, ...update };
                writeDb(db);
                return list[index];
            } else {
                // Create
                const newItem = { id: Math.random().toString(36).substring(7), ...create };
                if (!db[modelName]) db[modelName] = [];
                db[modelName].push(newItem);
                writeDb(db);
                return newItem;
            }
        }
    };
};

const prisma = {
    artistProfile: createModel('ArtistProfile'),
    socialLink: createModel('SocialLink'),
    release: createModel('Release'),
    video: createModel('Video'),
    show: createModel('Show'),
    contactInfo: createModel('ContactInfo'),
    $connect: async () => { },
    $disconnect: async () => { }
};

export default prisma;
