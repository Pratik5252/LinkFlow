import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

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

    // Delete existing URLs for this user (optional - remove if you want to keep existing data)
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

    // Insert URLs in batches
    console.log(`📊 Creating ${urlsToCreate.length} URLs...`);

    for (const urlData of urlsToCreate) {
        try {
            await prisma.url.create({
                data: urlData,
            });
            console.log(
                `✅ Created: ${
                    urlData.shortUrl
                } -> ${urlData.originalUrl.substring(0, 50)}...`
            );
        } catch (error) {
            console.log(`❌ Failed to create URL: ${urlData.originalUrl}`);
            console.log(`   Error: ${error}`);
        }
    }

    console.log('🎉 Seeding completed!');

    // Display summary
    const totalUrls = await prisma.url.count({ where: { userId: user.id } });
    console.log(`📈 Total URLs for user: ${totalUrls}`);
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
