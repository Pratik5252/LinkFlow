import type { Url } from '@/types/url';

interface MetricsData {
    totalUrls: number;
    totalClicks: number;
    avgClicksPerUrl: number;
    clickThroughRate: number;
    clicksPercentageChange: number;
    avgClicksPercentageChange: number;
    clickRatePercentageChange: number;
}

export function calculateUrlMetrics(
    urls: (Url & { _count: { visits: number } })[]
): MetricsData {
    // Basic metrics
    const totalUrls = urls.length;
    const totalClicks = urls.reduce((sum, url) => sum + url._count.visits, 0);
    const avgClicksPerUrl =
        totalUrls > 0 ? Math.round(totalClicks / totalUrls) : 0;

    // Click-through rate (percentage of URLs that have been clicked)
    const clickedUrls = urls.filter((url) => url._count.visits > 0).length;
    const clickThroughRate =
        totalUrls > 0 ? Math.round((clickedUrls / totalUrls) * 100) : 0;

    // Date calculations
    const currentDate = new Date();
    const currentMonthStart = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    );
    const previousMonthStart = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
    );
    const previousMonthEnd = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
    );

    // Current month clicks
    const currentMonthClicks = urls.reduce((sum, url) => {
        return (
            sum +
            (url.visits?.filter((visit) => {
                const visitDate = new Date(visit.timestamp);
                return visitDate >= currentMonthStart;
            }).length || 0)
        );
    }, 0);

    // Previous month clicks
    const previousMonthClicks = urls.reduce((sum, url) => {
        return (
            sum +
            (url.visits?.filter((visit) => {
                const visitDate = new Date(visit.timestamp);
                return (
                    visitDate >= previousMonthStart &&
                    visitDate <= previousMonthEnd
                );
            }).length || 0)
        );
    }, 0);

    // Percentage changes
    const clicksPercentageChange = calculatePercentageChange(
        currentMonthClicks,
        previousMonthClicks
    );

    const previousMonthAvgClicks =
        urls.length > 0 && previousMonthClicks > 0
            ? Math.round(previousMonthClicks / urls.length)
            : 0;
    const avgClicksPercentageChange = calculatePercentageChange(
        avgClicksPerUrl,
        previousMonthAvgClicks
    );

    // Click-through rate calculations for this month vs previous month
    const urlsThisMonth = urls.filter((url) => {
        const urlDate = new Date(url.createdAt);
        return (
            urlDate.getMonth() === currentDate.getMonth() &&
            urlDate.getFullYear() === currentDate.getFullYear()
        );
    }).length;

    const urlsClickedThisMonth = urls.filter((url) => {
        return url.visits?.some((visit) => {
            const visitDate = new Date(visit.timestamp);
            return visitDate >= currentMonthStart;
        });
    }).length;

    const clickThroughRateThisMonth =
        urlsThisMonth > 0
            ? Math.round((urlsClickedThisMonth / urlsThisMonth) * 100)
            : 0;

    const urlsCreatedPreviousMonth = urls.filter((url) => {
        const urlDate = new Date(url.createdAt);
        return urlDate >= previousMonthStart && urlDate <= previousMonthEnd;
    }).length;

    const urlsClickedPreviousMonth = urls.filter((url) => {
        const urlDate = new Date(url.createdAt);
        const wasCreatedPrevMonth =
            urlDate >= previousMonthStart && urlDate <= previousMonthEnd;
        const wasClickedPrevMonth = url.visits?.some((visit) => {
            const visitDate = new Date(visit.timestamp);
            return (
                visitDate >= previousMonthStart && visitDate <= previousMonthEnd
            );
        });
        return wasCreatedPrevMonth && wasClickedPrevMonth;
    }).length;

    const clickThroughRatePreviousMonth =
        urlsCreatedPreviousMonth > 0
            ? Math.round(
                  (urlsClickedPreviousMonth / urlsCreatedPreviousMonth) * 100
              )
            : 0;

    const clickRatePercentageChange = calculatePercentageChange(
        clickThroughRateThisMonth,
        clickThroughRatePreviousMonth
    );

    return {
        totalUrls,
        totalClicks,
        avgClicksPerUrl,
        clickThroughRate,
        clicksPercentageChange,
        avgClicksPercentageChange,
        clickRatePercentageChange,
    };
}

function calculatePercentageChange(current: number, previous: number): number {
    if (previous > 0) {
        return Math.round(((current - previous) / previous) * 100);
    }
    return current > 0 ? 100 : 0;
}
