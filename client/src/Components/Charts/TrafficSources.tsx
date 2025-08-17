import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import type { Visit } from '@/types/visits';
import { useMemo } from 'react';
import { Target, TrendingUp, Users, Clock, Globe, Zap } from 'lucide-react';

interface PerformanceInsightsProps {
    visits: Visit[];
}

interface Insight {
    title: string;
    value: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    trend?: 'up' | 'down' | 'neutral';
}

const PerformanceInsights = ({ visits }: PerformanceInsightsProps) => {
    const insights = useMemo(() => {
        if (visits.length === 0) return [];

        // Calculate insights based on available data
        const totalVisits = visits.length;
        const uniqueCountries = new Set(visits.map((v) => v.location.country))
            .size;
        const uniqueCities = new Set(visits.map((v) => v.location.city)).size;

        // Device distribution
        const deviceCounts = visits.reduce((acc, visit) => {
            acc[visit.device] = (acc[visit.device] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const mobileVisits =
            (deviceCounts.mobile || 0) + (deviceCounts.tablet || 0);
        const mobilePercentage = Math.round((mobileVisits / totalVisits) * 100);

        // Browser diversity
        const uniqueBrowsers = new Set(visits.map((v) => v.browser)).size;

        // Recent activity (last 24 hours)
        const now = new Date();
        const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const recentVisits = visits.filter(
            (v) => new Date(v.timestamp) > last24h
        ).length;

        // Top country
        const countryCounts = visits.reduce((acc, visit) => {
            acc[visit.location.country] =
                (acc[visit.location.country] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const topCountry = Object.entries(countryCounts).sort(
            ([, a], [, b]) => b - a
        )[0];

        const topCountryPercentage = topCountry
            ? Math.round((topCountry[1] / totalVisits) * 100)
            : 0;

        const performanceInsights: Insight[] = [
            {
                title: 'Geographic Reach',
                value: `${uniqueCountries} countries`,
                description: `Visitors from ${uniqueCities} cities worldwide`,
                icon: <Globe className="h-5 w-5" />,
                color: 'text-blue-600 bg-blue-50',
                trend: uniqueCountries > 3 ? 'up' : 'neutral',
            },
            {
                title: 'Mobile Adoption',
                value: `${mobilePercentage}%`,
                description: `${mobileVisits} mobile/tablet visits`,
                icon: <Users className="h-5 w-5" />,
                color: 'text-green-600 bg-green-50',
                trend:
                    mobilePercentage > 60
                        ? 'up'
                        : mobilePercentage > 30
                        ? 'neutral'
                        : 'down',
            },
            {
                title: 'Browser Diversity',
                value: `${uniqueBrowsers} browsers`,
                description: 'Cross-browser compatibility indicator',
                icon: <Target className="h-5 w-5" />,
                color: 'text-purple-600 bg-purple-50',
                trend: uniqueBrowsers > 3 ? 'up' : 'neutral',
            },
            {
                title: 'Recent Activity',
                value: `${recentVisits} visits`,
                description: 'Last 24 hours engagement',
                icon: <Clock className="h-5 w-5" />,
                color: 'text-orange-600 bg-orange-50',
                trend: recentVisits > 0 ? 'up' : 'down',
            },
        ];

        // Add top country insight if available
        if (topCountry) {
            performanceInsights.push({
                title: 'Top Market',
                value: topCountry[0],
                description: `${topCountryPercentage}% of all traffic`,
                icon: <Zap className="h-5 w-5" />,
                color: 'text-red-600 bg-red-50',
                trend: topCountryPercentage > 50 ? 'up' : 'neutral',
            });
        }

        return performanceInsights.slice(0, 4); // Show top 4 insights
    }, [visits]);

    const getTrendIcon = (trend?: string) => {
        if (trend === 'up')
            return <TrendingUp className="h-3 w-3 text-green-600" />;
        if (trend === 'down')
            return <TrendingUp className="h-3 w-3 text-red-600 rotate-180" />;
        return null;
    };

    if (visits.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Performance Insights
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-8">
                    <p className="text-sm text-muted-foreground">
                        No performance data available
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Performance Insights
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Key metrics and audience insights
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-4">
                    {insights.map((insight, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                        >
                            <div className={`p-2 rounded-lg ${insight.color}`}>
                                {insight.icon}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-medium text-sm">
                                        {insight.title}
                                    </h4>
                                    {getTrendIcon(insight.trend)}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {insight.description}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="font-bold text-lg">
                                    {insight.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Box */}
                <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/20">
                            <Zap className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <h5 className="font-medium text-sm mb-2">
                                Performance Summary
                            </h5>
                            <ul className="text-xs text-muted-foreground space-y-1">
                                <li>
                                    • Total engagement across {insights.length}{' '}
                                    key metrics
                                </li>
                                <li>
                                    • Multi-platform audience with diverse
                                    preferences
                                </li>
                                <li>• {visits.length} total visits analyzed</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PerformanceInsights;
