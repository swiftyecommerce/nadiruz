const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function main() {
    const url = process.env.DATABASE_URL;
    console.log('Connecting to database...');
    // Log masked URL for debugging 
    // console.log(url.replace(/:[^:@]*@/, ':****@'));

    const connection = await mysql.createConnection(url);
    console.log('Connected.');

    try {
        // 1. Create Tables
        console.log('Creating tables...');

        console.log('Creating ArtistProfile...');
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS ArtistProfile (
                id VARCHAR(191) PRIMARY KEY,
                stageName VARCHAR(191) NOT NULL DEFAULT 'Nadir UZ',
                realName VARCHAR(191),
                shortBio TEXT,
                longBio TEXT,
                heroTagline VARCHAR(191),
                heroHighlight VARCHAR(191),
                aboutTitle VARCHAR(191) DEFAULT 'Sesteki Vizyon',
                aboutHighlight VARCHAR(191) DEFAULT 'Vizyon',
                location VARCHAR(191),
                heroButtonText VARCHAR(191) DEFAULT 'Spotify''da Dinle',
                heroButtonUrl VARCHAR(191) DEFAULT '#',
                genre VARCHAR(191),
                activeSince VARCHAR(191),
                profileImageUrl VARCHAR(191)
            ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        `);

        console.log('Creating SocialLink...');
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS SocialLink (
                id VARCHAR(191) PRIMARY KEY,
                platform VARCHAR(191) NOT NULL,
                url VARCHAR(191) NOT NULL,
                iconType VARCHAR(191),
                isPrimary TINYINT(1) NOT NULL DEFAULT 0,
                \`order\` INT NOT NULL
            ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        `);

        console.log('Creating Release...');
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS \`Release\` (
                id VARCHAR(191) PRIMARY KEY,
                title VARCHAR(191) NOT NULL,
                releaseType VARCHAR(191) NOT NULL,
                coverImageUrl VARCHAR(191) NOT NULL,
                description TEXT,
                releaseDate DATETIME(3) NOT NULL,
                spotifyUrl VARCHAR(191),
                appleMusicUrl VARCHAR(191),
                youtubeMusicUrl VARCHAR(191),
                deezerUrl VARCHAR(191),
                isFeatured TINYINT(1) NOT NULL DEFAULT 0
            ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        `);

        console.log('Creating Video...');
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS Video (
                id VARCHAR(191) PRIMARY KEY,
                title VARCHAR(191) NOT NULL,
                youtubeUrl VARCHAR(191) NOT NULL,
                thumbnailUrl VARCHAR(191) NOT NULL,
                isFeatured TINYINT(1) NOT NULL DEFAULT 0
            ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        `);

        console.log('Creating Show...');
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS \`Show\` (
                id VARCHAR(191) PRIMARY KEY,
                city VARCHAR(191) NOT NULL,
                venue VARCHAR(191) NOT NULL,
                date DATETIME(3) NOT NULL,
                ticketUrl VARCHAR(191),
                note TEXT,
                isCancelled TINYINT(1) NOT NULL DEFAULT 0
            ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        `);

        console.log('Creating ContactInfo...');
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS ContactInfo (
                id VARCHAR(191) PRIMARY KEY,
                managementEmail VARCHAR(191) NOT NULL,
                bookingEmail VARCHAR(191) NOT NULL,
                pressEmail VARCHAR(191),
                whatsappNumber VARCHAR(191),
                instagramDmLink VARCHAR(191)
            ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        `);

        console.log('Tables created.');

        // 2. Read Data
        const dbPath = path.join(process.cwd(), 'database.json');
        if (!fs.existsSync(dbPath)) {
            console.error('database.json not found!');
            return;
        }
        const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

        // 3. Insert Data
        console.log('Inserting data...');

        // Helper to sanitize values
        const sanitize = (val) => val === undefined ? null : val;

        // ArtistProfile
        if (data.ArtistProfile) {
            for (const item of data.ArtistProfile) {
                const values = [
                    item.id, item.stageName, item.realName, item.shortBio, item.longBio,
                    item.heroTagline, item.heroHighlight, item.aboutTitle, item.aboutHighlight,
                    item.location, item.heroButtonText, item.heroButtonUrl, item.genre,
                    item.activeSince, item.profileImageUrl
                ].map(sanitize);

                await connection.execute(`
                    INSERT INTO ArtistProfile (id, stageName, realName, shortBio, longBio, heroTagline, heroHighlight, aboutTitle, aboutHighlight, location, heroButtonText, heroButtonUrl, genre, activeSince, profileImageUrl)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                    stageName=VALUES(stageName), realName=VALUES(realName), shortBio=VALUES(shortBio), longBio=VALUES(longBio), heroTagline=VALUES(heroTagline), heroHighlight=VALUES(heroHighlight), aboutTitle=VALUES(aboutTitle), aboutHighlight=VALUES(aboutHighlight), location=VALUES(location), heroButtonText=VALUES(heroButtonText), heroButtonUrl=VALUES(heroButtonUrl), genre=VALUES(genre), activeSince=VALUES(activeSince), profileImageUrl=VALUES(profileImageUrl)
                `, values);
            }
        }

        // SocialLink
        if (data.SocialLink) {
            for (const item of data.SocialLink) {
                const values = [
                    item.id, item.platform, item.url, item.iconType,
                    item.isPrimary ? 1 : 0, item.order
                ].map(sanitize);

                await connection.execute(`
                    INSERT INTO SocialLink (id, platform, url, iconType, isPrimary, \`order\`)
                    VALUES (?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                    platform=VALUES(platform), url=VALUES(url), iconType=VALUES(iconType), isPrimary=VALUES(isPrimary), \`order\`=VALUES(\`order\`)
                `, values);
            }
        }

        // Release
        if (data.Release) {
            for (const item of data.Release) {
                const date = new Date(item.releaseDate);
                const values = [
                    item.id, item.title, item.releaseType, item.coverImageUrl, item.description,
                    date, item.spotifyUrl, item.appleMusicUrl, item.youtubeMusicUrl, item.deezerUrl,
                    item.isFeatured ? 1 : 0
                ].map(sanitize);

                await connection.execute(`
                    INSERT INTO \`Release\` (id, title, releaseType, coverImageUrl, description, releaseDate, spotifyUrl, appleMusicUrl, youtubeMusicUrl, deezerUrl, isFeatured)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                    title=VALUES(title), releaseType=VALUES(releaseType), coverImageUrl=VALUES(coverImageUrl), description=VALUES(description), releaseDate=VALUES(releaseDate), spotifyUrl=VALUES(spotifyUrl), appleMusicUrl=VALUES(appleMusicUrl), youtubeMusicUrl=VALUES(youtubeMusicUrl), deezerUrl=VALUES(deezerUrl), isFeatured=VALUES(isFeatured)
                `, values);
            }
        }

        // Video
        if (data.Video) {
            for (const item of data.Video) {
                const values = [
                    item.id, item.title, item.youtubeUrl, item.thumbnailUrl, item.isFeatured ? 1 : 0
                ].map(sanitize);

                await connection.execute(`
                    INSERT INTO Video (id, title, youtubeUrl, thumbnailUrl, isFeatured)
                    VALUES (?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                    title=VALUES(title), youtubeUrl=VALUES(youtubeUrl), thumbnailUrl=VALUES(thumbnailUrl), isFeatured=VALUES(isFeatured)
                `, values);
            }
        }

        // Show
        if (data.Show) {
            for (const item of data.Show) {
                const date = new Date(item.date);
                const values = [
                    item.id, item.city, item.venue, date, item.ticketUrl, item.note, item.isCancelled ? 1 : 0
                ].map(sanitize);

                await connection.execute(`
                    INSERT INTO \`Show\` (id, city, venue, date, ticketUrl, note, isCancelled)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                    city=VALUES(city), venue=VALUES(venue), date=VALUES(date), ticketUrl=VALUES(ticketUrl), note=VALUES(note), isCancelled=VALUES(isCancelled)
                `, values);
            }
        }

        // ContactInfo
        if (data.ContactInfo) {
            for (const item of data.ContactInfo) {
                const values = [
                    item.id, item.managementEmail, item.bookingEmail, item.pressEmail,
                    item.whatsappNumber, item.instagramDmLink
                ].map(sanitize);

                await connection.execute(`
                    INSERT INTO ContactInfo (id, managementEmail, bookingEmail, pressEmail, whatsappNumber, instagramDmLink)
                    VALUES (?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                    managementEmail=VALUES(managementEmail), bookingEmail=VALUES(bookingEmail), pressEmail=VALUES(pressEmail), whatsappNumber=VALUES(whatsappNumber), instagramDmLink=VALUES(instagramDmLink)
                `, values);
            }
        }

        console.log('Migration completed successfully!');

    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await connection.end();
    }
}

main();
