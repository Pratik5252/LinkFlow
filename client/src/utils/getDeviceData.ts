import type { Visit } from '@/types/visits';

const deviceColorMap: Record<string, string> = {
    mobile: 'var(--chart-7)',
    desktop: 'var(--chart-6)',
    tablet: 'var(--chart-4)',
    other: 'var(--chart-other)',
};

export function getDeviceChartData(visits: Visit[]) {
    // Initialize all device types with 0 count
    const deviceCounts: Record<string, number> = {
        mobile: 0,
        desktop: 0,
        tablet: 0,
        other: 0,
    };

    // Count actual visits
    for (const visit of visits) {
        const device = visit.device?.toLowerCase() || 'other';
        if (device in deviceCounts) {
            deviceCounts[device] += 1;
        } else {
            deviceCounts.other += 1;
        }
    }

    return Object.entries(deviceCounts).map(([device, visitors]) => ({
        device,
        visitors,
        fill: deviceColorMap[device] || deviceColorMap.other,
    }));
}
