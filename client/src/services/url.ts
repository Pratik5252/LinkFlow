import type {
    shortUrlPayload,
    shortUrlResponse,
    Url,
    PaginatedUrlsResponse,
} from '@/types/url';
import type { VisitResponse } from '@/types/visits';

const API_URL = import.meta.env.VITE_API_URL;

export const getUrls = async (
    page: number = 1,
    limit: number = 10,
    search: string = ''
): Promise<PaginatedUrlsResponse> => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Unauthorized');
    }
    try {
        const res = await fetch(
            `${API_URL}/url/?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        return res.json();
    } catch (error) {
        throw new Error('Something went wrong');
    }
};

export const getUrlsWithMetrics = async (): Promise<Url[]> => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Unauthorized');
    }
    try {
        const res = await fetch(`${API_URL}/url/metrics`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        return res.json() as Promise<Url[]>;
    } catch (error) {
        throw new Error('Something went wrong');
    }
};

export const getUrlVisits = async (urlId: string): Promise<VisitResponse> => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Unauthorized');
    }
    try {
        const res = await fetch(`${API_URL}/url/${urlId}/visits`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            throw new Error('Failed to fetch visit data');
        }

        return res.json() as Promise<VisitResponse>;
    } catch (error) {
        throw new Error('Something went wrong');
    }
};

export const createShortUrl = async (
    payload: shortUrlPayload
): Promise<shortUrlResponse> => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Unauthorized');
    }
    try {
        const res = await fetch(`${API_URL}/url/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.message || data.error || 'Failed to create short URL'
            );
        }

        return data as shortUrlResponse;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
};

export const deleteUrl = async (urlId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Unauthorized');
    }
    try {
        const res = await fetch(`${API_URL}/url/${urlId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.message || data.error || 'Failed to delete teh Url'
            );
        }
        return data;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong');
    }
};
