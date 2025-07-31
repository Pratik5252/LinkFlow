export interface Url {
    id: string;
    userId: string;
    originalUrl: string;
    shortUrl: string;
    title: string | null;
    createdAt: string;
    _count: {
        visits: number;
    };
    visits: {
        timestamp: string;
    }[];
    shortLink: string;
}

export interface shortUrlPayload {
    originalUrl: string;
    customUrl?: string;
    title?: string;
}

export interface shortUrlResponse {
    id: string;
    userId: string;
    originalUrl: string;
    shortUrl: string;
    title?: string;
    createdAt: string;
    shortLink: string;
}
