import type { Visit } from '@/types/visits';

export interface Tier1Metrics {
    totalVisits: number;
    uniqueVisitors: number;
    clickThroughRate: number;
    averageSessionDuration: string;
    trend: {
        totalVisitsChange: number;
        uniqueVisitorsChange: number;
        ctrChange: number;
        sessionDurationChange: number;
    };
}

export function calculateTier1Metrics(visits: Visit[]): Tier1Metrics {
    if (!visits || visits.length === 0) {
        return {
            totalVisits: 0,
            uniqueVisitors: 0,
            clickThroughRate: 0,
            averageSessionDuration: '0m 0s',
            trend: {
                totalVisitsChange: 0,
                uniqueVisitorsChange: 0,
                ctrChange: 0,
                sessionDurationChange: 0,
            },
        };
    }

    // Basic metrics
    const totalVisits = visits.length;

    // Unique visitors based on IP
    const uniqueVisitors = new Set(visits.map((visit) => visit.ip)).size;

    // Calculate time periods for comparison
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    // Current period (last 30 days)
    const currentPeriodVisits = visits.filter(
        (visit) => new Date(visit.timestamp) >= thirtyDaysAgo
    );

    // Previous period (30-60 days ago)
    const previousPeriodVisits = visits.filter((visit) => {
        const visitDate = new Date(visit.timestamp);
        return visitDate >= sixtyDaysAgo && visitDate < thirtyDaysAgo;
    });

    // Calculate metrics for both periods
    const currentTotalVisits = currentPeriodVisits.length;
    const previousTotalVisits = previousPeriodVisits.length;

    const currentUniqueVisitors = new Set(currentPeriodVisits.map((v) => v.ip))
        .size;
    const previousUniqueVisitors = new Set(
        previousPeriodVisits.map((v) => v.ip)
    ).size;

    // Click-through rate (percentage of unique visitors who return)
    const returningVisitors = calculateReturningVisitors(visits);
    const clickThroughRate =
        uniqueVisitors > 0
            ? Math.round((returningVisitors / uniqueVisitors) * 100)
            : 0;

    // Previous period CTR
    const previousReturningVisitors =
        calculateReturningVisitors(previousPeriodVisits);
    const previousCTR =
        previousUniqueVisitors > 0
            ? Math.round(
                  (previousReturningVisitors / previousUniqueVisitors) * 100
              )
            : 0;

    // Average session duration (estimated based on visit patterns)
    const averageSessionDuration = calculateAverageSessionDuration(visits);
    const previousAverageSessionDuration =
        calculateAverageSessionDuration(previousPeriodVisits);

    // Calculate percentage changes
    const totalVisitsChange = calculatePercentageChange(
        previousTotalVisits,
        currentTotalVisits
    );
    const uniqueVisitorsChange = calculatePercentageChange(
        previousUniqueVisitors,
        currentUniqueVisitors
    );
    const ctrChange = calculatePercentageChange(previousCTR, clickThroughRate);
    const sessionDurationChange = calculateSessionDurationChange(
        previousAverageSessionDuration,
        averageSessionDuration
    );

    return {
        totalVisits,
        uniqueVisitors,
        clickThroughRate,
        averageSessionDuration,
        trend: {
            totalVisitsChange,
            uniqueVisitorsChange,
            ctrChange,
            sessionDurationChange,
        },
    };
}

function calculateReturningVisitors(visits: Visit[]): number {
    const ipVisitCounts = visits.reduce((acc, visit) => {
        acc[visit.ip] = (acc[visit.ip] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return Object.values(ipVisitCounts).filter((count) => count > 1).length;
}

function calculateAverageSessionDuration(visits: Visit[]): string {
    if (visits.length === 0) return '0m 0s';

    // Group visits by IP to estimate session durations
    const visitsByIp = visits.reduce((acc, visit) => {
        if (!acc[visit.ip]) acc[visit.ip] = [];
        acc[visit.ip].push(new Date(visit.timestamp));
        return acc;
    }, {} as Record<string, Date[]>);

    let totalDuration = 0;
    let sessionCount = 0;

    Object.values(visitsByIp).forEach((timestamps) => {
        if (timestamps.length > 1) {
            timestamps.sort((a, b) => a.getTime() - b.getTime());

            // Group visits into sessions (visits within 30 minutes are same session)
            const sessions: Date[][] = [];
            let currentSession = [timestamps[0]];

            for (let i = 1; i < timestamps.length; i++) {
                const timeDiff =
                    timestamps[i].getTime() - timestamps[i - 1].getTime();
                if (timeDiff <= 30 * 60 * 1000) {
                    // 30 minutes
                    currentSession.push(timestamps[i]);
                } else {
                    sessions.push(currentSession);
                    currentSession = [timestamps[i]];
                }
            }
            sessions.push(currentSession);

            // Calculate duration for each session
            sessions.forEach((session) => {
                if (session.length > 1) {
                    const duration =
                        session[session.length - 1].getTime() -
                        session[0].getTime();
                    totalDuration += duration;
                    sessionCount++;
                } else {
                    // Single visit session, estimate 1 minute
                    totalDuration += 60 * 1000;
                    sessionCount++;
                }
            });
        } else {
            // Single visit, estimate 1 minute
            totalDuration += 60 * 1000;
            sessionCount++;
        }
    });

    if (sessionCount === 0) return '0m 0s';

    const avgDurationMs = totalDuration / sessionCount;
    const minutes = Math.floor(avgDurationMs / (60 * 1000));
    const seconds = Math.floor((avgDurationMs % (60 * 1000)) / 1000);

    return `${minutes}m ${seconds}s`;
}

function calculatePercentageChange(oldValue: number, newValue: number): number {
    if (oldValue === 0) return newValue > 0 ? 100 : 0;
    return Math.round(((newValue - oldValue) / oldValue) * 100);
}

function calculateSessionDurationChange(
    oldDuration: string,
    newDuration: string
): number {
    const parseTime = (timeStr: string): number => {
        const match = timeStr.match(/(\d+)m\s*(\d+)s/);
        if (!match) return 0;
        return parseInt(match[1]) * 60 + parseInt(match[2]);
    };

    const oldSeconds = parseTime(oldDuration);
    const newSeconds = parseTime(newDuration);

    return calculatePercentageChange(oldSeconds, newSeconds);
}
