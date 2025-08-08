import { Response } from 'express';
import { CustomRequest } from '../../middleware/auth.js';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../prisma/prismaClient.js';

const baseUrl = process.env.BASE_URL;

export const getAllUrls = async (req: CustomRequest, res: Response) => {
    const userId = (req.user as JwtPayload & { userId: string }).userId;

    const search = req.query.search as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    try {
        const whereClause = {
            userId,
            ...(search && {
                OR: [
                    {
                        originalUrl: {
                            contains: search,
                            mode: 'insensitive' as const,
                        },
                    },
                    {
                        title: {
                            contains: search,
                            mode: 'insensitive' as const,
                        },
                    },
                    {
                        shortUrl: {
                            contains: search,
                            mode: 'insensitive' as const,
                        },
                    },
                ],
            }),
        };
        const totalUrls = await prisma.url.count({
            where: whereClause,
        });

        const urls = await prisma.url.findMany({
            where: whereClause,
            include: {
                _count: { select: { visits: true } },
                visits: { select: { timestamp: true } },
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
        });

        if (!urls) {
            res.status(404).json({ message: 'No URLs found' });
            return;
        }

        const urlsWithShortLink = urls.map((url: any) => ({
            ...url,
            shortLink: `${baseUrl}/${url.shortUrl}`,
        }));

        res.json({
            urls: urlsWithShortLink,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalUrls / limit),
                totalCount: totalUrls,
                hasNext: page < Math.ceil(totalUrls / limit),
                hasPrev: page > 1,
            },
        });
    } catch (error) {
        console.error('Error fetching URLs:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Separate endpoint for getting all URLs with metrics (used for overview calculations)
export const getAllUrlsWithMetrics = async (
    req: CustomRequest,
    res: Response
) => {
    const userId = (req.user as JwtPayload & { userId: string }).userId;

    try {
        const urls = await prisma.url.findMany({
            where: { userId },
            include: {
                _count: { select: { visits: true } },
                visits: { select: { timestamp: true } },
            },
            orderBy: { createdAt: 'desc' },
        });

        const urlsWithShortLink = urls.map((url: any) => ({
            ...url,
            shortLink: `${baseUrl}/${url.shortUrl}`,
        }));

        res.json(urlsWithShortLink);
    } catch (error) {
        console.error('Error fetching URLs with metrics:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
