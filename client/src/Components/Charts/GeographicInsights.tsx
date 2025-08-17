import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import type { Visit } from '@/types/visits';
import { useMemo } from 'react';
import { MapPin, TrendingUp } from 'lucide-react';
import {
    getGeographicData,
    getGeographicStats,
} from '@/utils/getGeographicData';

interface GeographicInsightsProps {
    visits: Visit[];
}

const GeographicInsights = ({ visits }: GeographicInsightsProps) => {
    const geographicData = useMemo(() => {
        return getGeographicData(visits);
    }, [visits]);

    const geographicStats = useMemo(() => {
        return getGeographicStats(visits);
    }, [visits]);

    if (visits.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Geographic Insights
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        No geographic data available
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Top Locations
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    {geographicData.totalCountries} countries,{' '}
                    {geographicData.totalCities} cities
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Top Countries */}
                <div>
                    <h4 className="text-sm font-medium mb-3 text-muted-foreground">
                        Countries
                    </h4>
                    <div className="space-y-2">
                        {geographicData.topCountries.map((country, index) => (
                            <div
                                key={country.name}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-6 text-xs text-muted-foreground">
                                        #{index + 1}
                                    </div>
                                    <span className="text-sm font-medium">
                                        {country.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">
                                        {country.percentage}%
                                    </span>
                                    <span className="text-sm font-medium">
                                        {country.count}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Cities */}
                <div>
                    <h4 className="text-sm font-medium mb-3 text-muted-foreground">
                        Cities
                    </h4>
                    <div className="space-y-2">
                        {geographicData.topCities.map((city, index) => (
                            <div
                                key={city.name}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-6 text-xs text-muted-foreground">
                                        #{index + 1}
                                    </div>
                                    <span className="text-sm font-medium truncate">
                                        {city.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">
                                        {city.percentage}%
                                    </span>
                                    <span className="text-sm font-medium">
                                        {city.count}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Enhanced Quick Stats */}
                <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
                    <span>
                        Coverage: {geographicStats.coveragePercentage}% of
                        visits
                    </span>
                    <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>Top: {geographicStats.mostPopularCountry}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default GeographicInsights;
