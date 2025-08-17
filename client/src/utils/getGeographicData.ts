import type { Visit } from '@/types/visits';

export interface GeographicData {
    topCountries: Array<{
        name: string;
        count: number;
        percentage: number;
    }>;
    topCities: Array<{
        name: string;
        count: number;
        percentage: number;
    }>;
    totalCountries: number;
    totalCities: number;
    validLocationVisits: number;
}

export interface MapPoint {
    lat: number;
    lng: number;
    label: string;
}

/**
 * Process visits data to extract geographic insights
 */
export function getGeographicData(visits: Visit[]): GeographicData {
    if (!visits || visits.length === 0) {
        return {
            topCountries: [],
            topCities: [],
            totalCountries: 0,
            totalCities: 0,
            validLocationVisits: 0,
        };
    }

    // Count visits by country
    const countryCount = visits.reduce((acc, visit) => {
        const country = visit.location?.country || 'Unknown';
        acc[country] = (acc[country] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Count visits by city
    const cityCount = visits.reduce((acc, visit) => {
        const city = visit.location?.city || 'Unknown';
        const country = visit.location?.country || 'Unknown';
        const cityKey = `${city}, ${country}`;
        acc[cityKey] = (acc[cityKey] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Filter out 'Unknown' for unique counts
    const validCountries = new Set(
        visits
            .map((v) => v.location?.country)
            .filter((country) => country && country !== 'Unknown')
    );

    const validCities = new Set(
        visits
            .map((v) => v.location?.city)
            .filter((city) => city && city !== 'Unknown')
    );

    // Count visits with valid location data
    const validLocationVisits = visits.filter(
        (visit) =>
            visit.location?.country && visit.location.country !== 'Unknown'
    ).length;

    // Sort and get top 5 countries and cities
    const topCountries = Object.entries(countryCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({
            name,
            count,
            percentage: Math.round((count / visits.length) * 100),
        }));

    const topCities = Object.entries(cityCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({
            name,
            count,
            percentage: Math.round((count / visits.length) * 100),
        }));

    return {
        topCountries,
        topCities,
        totalCountries: validCountries.size,
        totalCities: validCities.size,
        validLocationVisits,
    };
}

/**
 * Extract map points for world map visualization
 * (Extracted from WorldMapVisits component logic)
 */
export function getMapPoints(visits: Visit[]): MapPoint[] {
    return Array.from(
        new Map(
            visits
                .filter(
                    (visit) =>
                        visit.location &&
                        Array.isArray(visit.location.ll) &&
                        visit.location.ll.length === 2 &&
                        typeof visit.location.ll[0] === 'number' &&
                        typeof visit.location.ll[1] === 'number'
                )
                .map((visit) => [
                    `${visit.location.ll[0]},${visit.location.ll[1]}`,
                    {
                        lat: visit.location.ll[0],
                        lng: visit.location.ll[1],
                        label:
                            visit.location?.city ||
                            visit.location?.country ||
                            'Unknown',
                    },
                ])
        ).values()
    );
}

/**
 * Get geographic summary stats
 */
export function getGeographicStats(visits: Visit[]) {
    const data = getGeographicData(visits);

    return {
        mostPopularCountry: data.topCountries[0]?.name || 'Unknown',
        mostPopularCity: data.topCities[0]?.name || 'Unknown',
        coveragePercentage:
            visits.length > 0
                ? Math.round((data.validLocationVisits / visits.length) * 100)
                : 0,
        uniqueLocations: data.totalCountries + data.totalCities,
    };
}
