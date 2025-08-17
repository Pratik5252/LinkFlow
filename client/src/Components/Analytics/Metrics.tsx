import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
    TrendingUp,
    TrendingDown,
    Users,
    MousePointer,
    Clock,
    Eye,
} from 'lucide-react';
import type { Tier1Metrics } from '@/utils/visitMetrics';

interface MetricsProps {
    metrics: Tier1Metrics;
    loading?: boolean;
}

interface MetricCardProps {
    title: string;
    value: string | number;
    change: number;
    icon: React.ReactNode;
    description: string;
}

const MetricCard = ({
    title,
    value,
    change,
    icon,
    description,
}: MetricCardProps) => {
    const isPositive = change > 0;
    const isNeutral = change === 0;

    return (
        <Card className="relative overflow-hidden h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <div className="text-muted-foreground">{icon}</div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
                <div className="text-2xl font-bold">{value}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <div
                        className={`flex items-center ${
                            isNeutral
                                ? 'text-muted-foreground'
                                : isPositive
                                ? 'text-green-600'
                                : 'text-red-600'
                        }`}
                    >
                        {!isNeutral && (
                            <>
                                {isPositive ? (
                                    <TrendingUp className="mr-1 h-3 w-3" />
                                ) : (
                                    <TrendingDown className="mr-1 h-3 w-3" />
                                )}
                                <span>{Math.abs(change)}%</span>
                            </>
                        )}
                        {isNeutral && <span>No change</span>}
                    </div>
                    <span>vs last 30 days</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
};

const Metrics = ({ metrics, loading = false }: MetricsProps) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 items-stretch">
                {[1, 2, 3, 4].map((i) => (
                    <Card
                        key={i}
                        className="animate-pulse h-full flex flex-col"
                    >
                        <CardHeader className="space-y-0 pb-2">
                            <div className="h-4 bg-muted rounded w-3/4"></div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
                            <div className="h-3 bg-muted rounded w-full"></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 items-stretch">
            <MetricCard
                title="Total Visits"
                value={metrics.totalVisits.toLocaleString()}
                change={metrics.trend.totalVisitsChange}
                icon={<Eye className="h-4 w-4" />}
                description="Total number of visits"
            />
            <MetricCard
                title="Unique Visitors"
                value={metrics.uniqueVisitors.toLocaleString()}
                change={metrics.trend.uniqueVisitorsChange}
                icon={<Users className="h-4 w-4" />}
                description="Unique IP addresses"
            />
            <MetricCard
                title="Return Rate"
                value={`${metrics.clickThroughRate}%`}
                change={metrics.trend.ctrChange}
                icon={<MousePointer className="h-4 w-4" />}
                description="Visitors who returned"
            />
            <MetricCard
                title="Avg. Session"
                value={metrics.averageSessionDuration}
                change={metrics.trend.sessionDurationChange}
                icon={<Clock className="h-4 w-4" />}
                description="Average time spent"
            />
        </div>
    );
};

export default Metrics;
