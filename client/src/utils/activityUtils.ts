import type { Visit } from '@/types/visits';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import React from 'react';

// Time formatting utilities
export function getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
        return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800)
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
}

// Device icon utilities (consistent with device classification)
export function getDeviceIcon(device: string): React.ReactElement {
    const deviceLower = device?.toLowerCase() || '';
    if (deviceLower.includes('desktop') || deviceLower.includes('computer')) {
        return React.createElement(Monitor, { className: 'h-3 w-3' });
    }
    if (deviceLower.includes('tablet') || deviceLower.includes('ipad')) {
        return React.createElement(Tablet, { className: 'h-3 w-3' });
    }
    return React.createElement(Smartphone, { className: 'h-3 w-3' });
}

// Visitor session analysis (extracted from engagement logic)
export interface VisitorSession {
    ip: string;
    visits: Visit[];
    totalVisits: number;
    firstVisit: Date;
    lastVisit: Date;
    isReturning: boolean;
}

export function analyzeVisitorSessions(visits: Visit[]): VisitorSession[] {
    const visitorSessions = visits.reduce((acc, visit) => {
        const ip = visit.ip;
        if (!acc[ip]) {
            acc[ip] = {
                ip,
                visits: [],
                totalVisits: 0,
                firstVisit: new Date(visit.timestamp),
                lastVisit: new Date(visit.timestamp),
                isReturning: false,
            };
        }

        acc[ip].visits.push(visit);
        acc[ip].totalVisits++;

        const visitDate = new Date(visit.timestamp);
        if (visitDate < acc[ip].firstVisit) acc[ip].firstVisit = visitDate;
        if (visitDate > acc[ip].lastVisit) acc[ip].lastVisit = visitDate;

        // Mark as returning if more than one visit
        acc[ip].isReturning = acc[ip].totalVisits > 1;

        return acc;
    }, {} as Record<string, VisitorSession>);

    return Object.values(visitorSessions);
}

// Engagement metrics calculation
export interface EngagementData {
    bounceRate: number;
    returnVisitorRate: number;
    averageVisitsPerUser: number;
    sessionQuality: 'Poor' | 'Fair' | 'Good' | 'Excellent';
    totalUniqueVisitors: number;
    returningVisitors: number;
    singleVisitUsers: number;
}

export function calculateEngagementMetrics(visits: Visit[]): EngagementData {
    if (visits.length === 0) {
        return {
            bounceRate: 0,
            returnVisitorRate: 0,
            averageVisitsPerUser: 0,
            sessionQuality: 'Poor',
            totalUniqueVisitors: 0,
            returningVisitors: 0,
            singleVisitUsers: 0,
        };
    }

    const visitorSessions = analyzeVisitorSessions(visits);
    const totalUniqueVisitors = visitorSessions.length;

    // Bounce rate: percentage of visitors who only visited once
    const singleVisitUsers = visitorSessions.filter(
        (visitor) => visitor.totalVisits === 1
    ).length;
    const bounceRate = Math.round(
        (singleVisitUsers / totalUniqueVisitors) * 100
    );

    // Return visitor rate: percentage of visitors who came back
    const returningVisitors = visitorSessions.filter(
        (visitor) => visitor.isReturning
    ).length;
    const returnVisitorRate = Math.round(
        (returningVisitors / totalUniqueVisitors) * 100
    );

    // Average visits per user
    const averageVisitsPerUser =
        Math.round((visits.length / totalUniqueVisitors) * 10) / 10;

    // Session quality assessment
    let sessionQuality: 'Poor' | 'Fair' | 'Good' | 'Excellent' = 'Poor';
    if (averageVisitsPerUser >= 3) sessionQuality = 'Excellent';
    else if (averageVisitsPerUser >= 2) sessionQuality = 'Good';
    else if (averageVisitsPerUser >= 1.5) sessionQuality = 'Fair';

    return {
        bounceRate,
        returnVisitorRate,
        averageVisitsPerUser,
        sessionQuality,
        totalUniqueVisitors,
        returningVisitors,
        singleVisitUsers,
    };
}

// Recent activity processing
export interface RecentVisitData extends Visit {
    timeAgo: string;
    deviceIcon: React.ReactElement;
}

export function processRecentVisits(
    visits: Visit[],
    limit: number = 10
): RecentVisitData[] {
    return visits
        .sort(
            (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
        )
        .slice(0, limit)
        .map((visit) => ({
            ...visit,
            timeAgo: getTimeAgo(new Date(visit.timestamp)),
            deviceIcon: getDeviceIcon(visit.device),
        }));
}
