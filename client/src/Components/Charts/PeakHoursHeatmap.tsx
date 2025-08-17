import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import type { Visit } from '@/types/visits';
import { useMemo } from 'react';

interface PeakHoursHeatmapProps {
    visits: Visit[];
}

const PeakHoursHeatmap = ({ visits }: PeakHoursHeatmapProps) => {
    const heatmapData = useMemo(() => {
        // Initialize 24-hour array
        const hourData = Array(24)
            .fill(0)
            .map((_, hour) => ({
                hour,
                count: 0,
                percentage: 0,
            }));

        // Count visits per hour
        visits.forEach((visit) => {
            const date = new Date(visit.timestamp);
            const hour = date.getHours();
            hourData[hour].count++;
        });

        // Calculate percentages and find max for color scaling
        const maxCount = Math.max(...hourData.map((h) => h.count));

        return hourData.map((hour) => ({
            ...hour,
            percentage: maxCount > 0 ? (hour.count / maxCount) * 100 : 0,
        }));
    }, [visits]);

    const getIntensityClass = (percentage: number) => {
        if (percentage === 0) return 'bg-muted/30';
        if (percentage < 25) return 'bg-primary/20';
        if (percentage < 50) return 'bg-primary/40';
        if (percentage < 75) return 'bg-primary/60';
        return 'bg-primary/80';
    };

    const formatHour = (hour: number) => {
        if (hour === 0) return '12 AM';
        if (hour < 12) return `${hour} AM`;
        if (hour === 12) return '12 PM';
        return `${hour - 12} PM`;
    };

    const peakHour = heatmapData.reduce((peak, current) =>
        current.count > peak.count ? current : peak
    );

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    Peak Activity Hours
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Most active hour: {formatHour(peakHour.hour)} (
                    {peakHour.count} visits)
                </p>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
                <div className="space-y-3">
                    {/* Hour labels */}
                    <div className="grid grid-cols-12 gap-2 text-xs">
                        {Array.from({ length: 12 }, (_, i) => (
                            <div
                                key={i * 2}
                                className="text-center text-muted-foreground"
                            >
                                {i * 2 === 0
                                    ? '12AM'
                                    : i * 2 === 12
                                    ? '12PM'
                                    : `${i * 2}`}
                            </div>
                        ))}
                    </div>

                    {/* Heatmap bars */}
                    <div className="grid grid-cols-24 gap-1">
                        {heatmapData.map((hour) => (
                            <div
                                key={hour.hour}
                                className={`h-8 rounded-sm transition-all hover:scale-105 cursor-pointer ${getIntensityClass(
                                    hour.percentage
                                )}`}
                                title={`${formatHour(hour.hour)}: ${
                                    hour.count
                                } visits`}
                            />
                        ))}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-3">
                        <span>Less activity</span>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-sm bg-muted/30" />
                            <div className="w-3 h-3 rounded-sm bg-primary/20" />
                            <div className="w-3 h-3 rounded-sm bg-primary/40" />
                            <div className="w-3 h-3 rounded-sm bg-primary/60" />
                            <div className="w-3 h-3 rounded-sm bg-primary/80" />
                        </div>
                        <span>More activity</span>
                    </div>

                    {/* Quick stats */}
                    <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
                        <span>Total visits: {visits.length}</span>
                        <span>Busiest: {formatHour(peakHour.hour)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PeakHoursHeatmap;
