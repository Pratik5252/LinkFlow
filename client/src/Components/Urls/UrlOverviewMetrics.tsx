import { Card, CardContent } from '@/Components/ui/card';
import {
    Link,
    MousePointerClick,
    BarChart3,
    Target,
    ArrowUp,
    ArrowDown,
} from 'lucide-react';
import type { Url } from '@/types/url';
import { calculateUrlMetrics } from '@/utils/metricsCalculations';

interface UrlOverviewMetricsProps {
    urls: (Url & { _count: { visits: number } })[];
}


export function UrlOverviewMetrics({ urls }: UrlOverviewMetricsProps) {
    // Calculate all metrics using the utility function
    const metrics = calculateUrlMetrics(urls);
    const hasData = metrics.totalUrls > 0;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            {/* Total URLs Card */}
            <Card className="rounded-md h-fit py-2">
                <CardContent className="p-2 text-start ">
                    <div className="flex justify-start items-center gap-2">
                        <Link
                            size={20}
                            className={`${
                                hasData ? 'text-blue-500' : 'text-gray-400'
                            }`}
                        />
                        <p className="text-sm text-muted-foreground">
                            Total URLs
                        </p>
                    </div>
                    <p className="text-3xl font-bold mt-2">
                        {metrics.totalUrls}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {hasData ? 'Created' : 'Get started'}
                    </p>
                </CardContent>
            </Card>

            {/* Total Clicks Card */}
            <Card className="rounded-md h-fit py-2">
                <CardContent className="p-2 text-start relative">
                    <div className="flex justify-start items-center gap-2">
                        <MousePointerClick
                            size={20}
                            className={`${
                                hasData ? 'text-green-500' : 'text-gray-400'
                            }`}
                        />
                        <p className="text-sm text-muted-foreground">
                            Total Clicks
                        </p>
                    </div>
                    <p className="text-3xl font-bold mt-2">
                        {metrics.totalClicks.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">All time</p>

                    {/* Percentage change in bottom right corner */}
                    {hasData && (
                        <div className="absolute bottom-2 right-2 flex items-center gap-1">
                            {metrics.clicksPercentageChange >= 0 ? (
                                <ArrowUp size={12} className="text-green-600" />
                            ) : (
                                <ArrowDown size={12} className="text-red-600" />
                            )}
                            <span
                                className={`text-xs font-medium ${
                                    metrics.clicksPercentageChange >= 0
                                        ? 'text-green-600'
                                        : 'text-red-600'
                                }`}
                            >
                                {metrics.clicksPercentageChange >= 0 ? '+' : ''}
                                {metrics.clicksPercentageChange}%
                            </span>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Average Clicks per URL Card */}
            <Card className="rounded-md h-fit py-2">
                <CardContent className="p-2 text-start relative">
                    <div className="flex justify-start items-center gap-2">
                        <BarChart3
                            size={20}
                            className={`${
                                hasData ? 'text-purple-500' : 'text-gray-400'
                            }`}
                        />
                        <p className="text-sm text-muted-foreground">
                            Avg. Clicks
                        </p>
                    </div>
                    <p className="text-3xl font-bold mt-2">
                        {hasData ? metrics.avgClicksPerUrl : '-'}
                    </p>
                    <p className="text-xs text-muted-foreground">Per URL</p>

                    {/* Percentage change in bottom right corner */}
                    {hasData && (
                        <div className="absolute bottom-2 right-2 flex items-center gap-1">
                            {metrics.avgClicksPercentageChange >= 0 ? (
                                <ArrowUp size={12} className="text-green-600" />
                            ) : (
                                <ArrowDown size={12} className="text-red-600" />
                            )}
                            <span
                                className={`text-xs font-medium ${
                                    metrics.avgClicksPercentageChange >= 0
                                        ? 'text-green-600'
                                        : 'text-red-600'
                                }`}
                            >
                                {metrics.avgClicksPercentageChange >= 0
                                    ? '+'
                                    : ''}
                                {metrics.avgClicksPercentageChange}%
                            </span>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Click-through Rate Card */}
            <Card className="rounded-md h-fit py-2">
                <CardContent className="p-2 text-start relative">
                    <div className="flex justify-start items-center gap-2">
                        <Target
                            size={20}
                            className={`${
                                hasData ? 'text-orange-500' : 'text-gray-400'
                            }`}
                        />
                        <p className="text-sm text-muted-foreground">
                            Click Rate
                        </p>
                    </div>
                    <p className="text-3xl font-bold mt-2 flex items-baseline">
                        {metrics.clickThroughRate}
                        <p className="text-xs">%</p>
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {hasData ? 'URLs with clicks' : 'Start sharing URLs'}
                    </p>

                    {/* Percentage change in bottom right corner */}
                    {hasData && (
                        <div className="absolute bottom-2 right-2 flex items-center gap-1">
                            {metrics.clickRatePercentageChange >= 0 ? (
                                <ArrowUp size={12} className="text-green-600" />
                            ) : (
                                <ArrowDown size={12} className="text-red-600" />
                            )}
                            <span
                                className={`text-xs font-medium ${
                                    metrics.clickRatePercentageChange >= 0
                                        ? 'text-green-600'
                                        : 'text-red-600'
                                }`}
                            >
                                {metrics.clickRatePercentageChange >= 0
                                    ? '+'
                                    : ''}
                                {metrics.clickRatePercentageChange}%
                            </span>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
