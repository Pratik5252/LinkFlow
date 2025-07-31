const osColorMap: Record<string, string> = {
    android: 'var(--chart-android)',
    windows: 'var(--chart-windows)',
    macos: 'var(--chart-macos)',
    linux: 'var(--chart-linux)',
    ios: 'var(--chart-ios)',
    other: 'var(--chart-other)',
};

export function getOSChartData(visits: { os: string }[]) {
    // Initialize all OS types with 0 count
    const osCounts: Record<string, number> = {
        android: 0,
        windows: 0,
        macos: 0,
        linux: 0,
        ios: 0,
        other: 0,
    };

    // Count actual visits
    for (const visit of visits) {
        const key = visit.os?.toLowerCase() || 'other';
        if (key in osCounts) {
            osCounts[key] += 1;
        } else {
            osCounts.other += 1;
        }
    }

    return Object.entries(osCounts).map(([os, visitors]) => ({
        os,
        visitors,
        fill: osColorMap[os] || osColorMap.other,
    }));
}
