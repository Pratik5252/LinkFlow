import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Sample data for realistic visits
const browsers = [
    'Chrome',
    'Safari',
    'Firefox',
    'Edge',
    'Opera',
    'Samsung Internet',
    'UC Browser',
];

const operatingSystems = [
    'Windows',
    'macOS',
    'Linux',
    'iOS',
    'Android',
    'Ubuntu',
    'Chrome OS',
];

const devices = ['Desktop', 'Mobile', 'Tablet', 'Laptop'];

const locations = [
    {
        country: 'United States',
        countryCode: 'US',
        city: 'New York',
        region: 'NY',
        latitude: 40.7128,
        longitude: -74.006,
        timezone: 'America/New_York',
    },
    {
        country: 'United Kingdom',
        countryCode: 'GB',
        city: 'London',
        region: 'England',
        latitude: 51.5074,
        longitude: -0.1278,
        timezone: 'Europe/London',
    },
    {
        country: 'Germany',
        countryCode: 'DE',
        city: 'Berlin',
        region: 'Berlin',
        latitude: 52.52,
        longitude: 13.405,
        timezone: 'Europe/Berlin',
    },
    {
        country: 'France',
        countryCode: 'FR',
        city: 'Paris',
        region: 'Île-de-France',
        latitude: 48.8566,
        longitude: 2.3522,
        timezone: 'Europe/Paris',
    },
    {
        country: 'Japan',
        countryCode: 'JP',
        city: 'Tokyo',
        region: 'Tokyo',
        latitude: 35.6762,
        longitude: 139.6503,
        timezone: 'Asia/Tokyo',
    },
    {
        country: 'Canada',
        countryCode: 'CA',
        city: 'Toronto',
        region: 'ON',
        latitude: 43.651,
        longitude: -79.347,
        timezone: 'America/Toronto',
    },
    {
        country: 'Australia',
        countryCode: 'AU',
        city: 'Sydney',
        region: 'NSW',
        latitude: -33.8688,
        longitude: 151.2093,
        timezone: 'Australia/Sydney',
    },
    {
        country: 'India',
        countryCode: 'IN',
        city: 'Mumbai',
        region: 'MH',
        latitude: 19.076,
        longitude: 72.8777,
        timezone: 'Asia/Kolkata',
    },
    {
        country: 'Brazil',
        countryCode: 'BR',
        city: 'São Paulo',
        region: 'SP',
        latitude: -23.5558,
        longitude: -46.6396,
        timezone: 'America/Sao_Paulo',
    },
    {
        country: 'Singapore',
        countryCode: 'SG',
        city: 'Singapore',
        region: 'Singapore',
        latitude: 1.3521,
        longitude: 103.8198,
        timezone: 'Asia/Singapore',
    },
];

// Generate random IP addresses
const generateRandomIP = () => {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(
        Math.random() * 255
    )}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
};

// Sample URLs for different categories
const sampleUrls = [
    // Social Media
    'https://twitter.com/elonmusk/status/1234567890',
    'https://linkedin.com/in/johndoe',
    'https://instagram.com/travel_photographer',
    'https://youtube.com/watch?v=dQw4w9WgXcQ',
    'https://facebook.com/events/summer-music-festival-2024',

    // E-commerce
    'https://amazon.com/product/wireless-headphones-xyz',
    'https://shopify.com/store/handmade-jewelry',
    'https://etsy.com/listing/vintage-leather-jacket',
    'https://ebay.com/auction/rare-pokemon-cards',

    // News & Blogs
    'https://techcrunch.com/2024/01/15/ai-breakthrough-announcement',
    'https://medium.com/@writer/10-tips-for-productivity',
    'https://dev.to/programmer/react-best-practices-2024',
    'https://hackernews.com/item?id=39123456',

    // Business & Portfolio
    'https://myportfolio.com/projects/web-development',
    'https://startup.com/pitch-deck-presentation',
    'https://company.com/annual-report-2024',
    'https://freelancer.com/profile/designer',

    // Entertainment
    'https://netflix.com/watch/stranger-things-season-5',
    'https://spotify.com/playlist/summer-hits-2024',
    'https://twitch.tv/streamername/highlights',
    'https://reddit.com/r/programming/hot',

    // Education
    'https://coursera.org/course/machine-learning-basics',
    'https://udemy.com/course/fullstack-web-development',
    'https://youtube.com/playlist?list=web-dev-tutorials',
    'https://github.com/username/awesome-project',

    // Personal
    'https://myblog.com/travel-diary-japan-2024',
    'https://wedding-invitation.com/john-and-jane',
    'https://drive.google.com/shared-photo-album',
    'https://calendly.com/consultant/30min-call',
];

// Generate short URL codes
const generateShortCode = () => {
    return crypto.randomBytes(4).toString('base64url');
};

// Get random date within last 3 months
const getRandomDate = () => {
    const start = new Date();
    start.setMonth(start.getMonth() - 3);
    const end = new Date();
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
};

// Get random visit date (can be after URL creation)
const getRandomVisitDate = (urlCreatedAt: Date) => {
    const start = new Date(urlCreatedAt);
    const end = new Date();
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
};

// Generate random visits for a URL
const generateVisitsForUrl = (
    urlId: string,
    urlCreatedAt: Date,
    count: number
) => {
    const visits = [];

    for (let i = 0; i < count; i++) {
        const location =
            locations[Math.floor(Math.random() * locations.length)];
        const browser = browsers[Math.floor(Math.random() * browsers.length)];
        const os =
            operatingSystems[
                Math.floor(Math.random() * operatingSystems.length)
            ];
        const device = devices[Math.floor(Math.random() * devices.length)];

        visits.push({
            urlId,
            ip: generateRandomIP(),
            location,
            browser,
            os,
            device,
            timestamp: getRandomVisitDate(urlCreatedAt),
        });
    }

    return visits.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};

// Get random title for URL
const getTitleForUrl = (url: string) => {
    if (url.includes('twitter.com')) return 'Twitter Post - Latest Update';
    if (url.includes('linkedin.com'))
        return 'LinkedIn Profile - Professional Network';
    if (url.includes('instagram.com')) return 'Instagram - Amazing Photos';
    if (url.includes('youtube.com')) return 'YouTube Video - Must Watch!';
    if (url.includes('amazon.com')) return 'Amazon Product - Great Deal';
    if (url.includes('techcrunch.com'))
        return 'TechCrunch Article - Breaking News';
    if (url.includes('github.com'))
        return 'GitHub Repository - Open Source Project';
    if (url.includes('medium.com')) return 'Medium Article - Insightful Read';
    if (url.includes('portfolio.com'))
        return 'Portfolio Website - Creative Work';
    if (url.includes('netflix.com')) return 'Netflix Show - Binge Worthy';
    if (url.includes('spotify.com')) return 'Spotify Playlist - Great Music';
    if (url.includes('coursera.org')) return 'Online Course - Learn New Skills';
    if (url.includes('blog.com')) return 'Personal Blog - Life Stories';
    return 'Interesting Link - Check it out!';
};

async function main() {
    console.log('🌱 Starting to seed database...');

    // First, let's check if we have any users
    const userCount = await prisma.user.count();

    if (userCount === 0) {
        console.log('❌ No users found. Please create a user account first.');
        return;
    }

    // Get the first user (you can modify this to use your specific user)
    const user = await prisma.user.findUnique({
        where: { email: 'pratiky2000@gmail.com' },
    });

    if (!user) {
        console.log('❌ No user found to seed URLs for.');
        return;
    }

    console.log(`📝 Seeding URLs for user: ${user.email}`);

    // Delete existing URLs and visits for this user (optional - remove if you want to keep existing data)
    await prisma.url.deleteMany({
        where: { userId: user.id },
    });

    // Create URLs
    const urlsToCreate = sampleUrls.map((originalUrl) => ({
        userId: user.id,
        originalUrl,
        shortUrl: generateShortCode(),
        title: getTitleForUrl(originalUrl),
        createdAt: getRandomDate(),
        analyticsEnabled: Math.random() > 0.2, // 80% chance of analytics enabled
    }));

    // Insert URLs and visits
    console.log(`📊 Creating ${urlsToCreate.length} URLs with visit data...`);

    const createdUrls = [];

    for (const urlData of urlsToCreate) {
        try {
            const createdUrl = await prisma.url.create({
                data: urlData,
            });

            createdUrls.push(createdUrl);

            console.log(
                `✅ Created URL: ${
                    urlData.shortUrl
                } -> ${urlData.originalUrl.substring(0, 50)}...`
            );

            // Generate random number of visits for this URL (0-50 visits)
            const visitCount = Math.floor(Math.random() * 51);

            if (visitCount > 0) {
                const visits = generateVisitsForUrl(
                    createdUrl.id,
                    createdUrl.createdAt,
                    visitCount
                );

                // Create visits in batches to avoid overwhelming the database
                for (const visit of visits) {
                    try {
                        await prisma.visit.create({
                            data: visit,
                        });
                    } catch (error) {
                        console.log(
                            `❌ Failed to create visit for URL: ${createdUrl.shortUrl}`
                        );
                    }
                }

                // Update lastAccessedAt to the most recent visit
                const lastVisit = visits[visits.length - 1];
                await prisma.url.update({
                    where: { id: createdUrl.id },
                    data: { lastAccessedAt: lastVisit.timestamp },
                });

                console.log(`   📈 Added ${visitCount} visits`);
            } else {
                console.log(`   📊 No visits generated`);
            }
        } catch (error) {
            console.log(`❌ Failed to create URL: ${urlData.originalUrl}`);
            console.log(`   Error: ${error}`);
        }
    }

    console.log('🎉 Seeding completed!');

    // Display summary
    const totalUrls = await prisma.url.count({ where: { userId: user.id } });
    const totalVisits = await prisma.visit.count({
        where: {
            url: { userId: user.id },
        },
    });

    console.log(`📈 Summary:`);
    console.log(`   • Total URLs: ${totalUrls}`);
    console.log(`   • Total Visits: ${totalVisits}`);
    console.log(
        `   • Average Visits per URL: ${
            totalUrls > 0 ? (totalVisits / totalUrls).toFixed(2) : 0
        }`
    );

    // Show some analytics
    const popularUrls = await prisma.url.findMany({
        where: { userId: user.id },
        include: {
            _count: {
                select: { visits: true },
            },
        },
        orderBy: {
            visits: {
                _count: 'desc',
            },
        },
        take: 5,
    });
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
