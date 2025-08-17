import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import type { Visit } from '@/types/visits';
import { useMemo } from 'react';
import {
    TrendingDown,
    TrendingUp,
    Users,
    UserCheck,
    RotateCcw,
} from 'lucide-react';
import { calculateEngagementMetrics } from '@/utils/activityUtils';

interface EngagementMetricsProps {
    visits: Visit[];
}

const EngagementMetrics = ({ visits }: EngagementMetricsProps) => {
    const engagementData = useMemo(() => {
        return calculateEngagementMetrics(visits);
    }, [visits]);

    const getQualityColor = (quality: string) => {
        switch (quality) {
            case 'Excellent':
                return 'text-green-600';
            case 'Good':
                return 'text-blue-600';
            case 'Fair':
                return 'text-yellow-600';
            default:
                return 'text-red-600';
        }
    };

    const getBounceRateIcon = (bounceRate: number) => {
        return bounceRate > 70 ? (
            <TrendingDown className="h-4 w-4 text-red-500" />
        ) : (
            <TrendingUp className="h-4 w-4 text-green-500" />
        );
    };

    if (visits.length === 0) {
        return (
            <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                        Engagement Metrics
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                        No engagement data available
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    Engagement Metrics
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Visitor behavior and session quality
                </p>
            </CardHeader>
            <CardContent className="space-y-4 flex-1 overflow-auto">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            {getBounceRateIcon(engagementData.bounceRate)}
                            <span className="text-sm font-medium text-muted-foreground">
                                Bounce Rate
                            </span>
                        </div>
                        <div className="text-2xl font-bold">
                            {engagementData.bounceRate}%
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Single-visit users
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <RotateCcw className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-medium text-muted-foreground">
                                Return Rate
                            </span>
                        </div>
                        <div className="text-2xl font-bold">
                            {engagementData.returnVisitorRate}%
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Returning visitors
                        </p>
                    </div>
                </div>

                {/* Additional Insights */}
                <div className="space-y-3 pt-2 border-t">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                                Avg. Visits per User
                            </span>
                        </div>
                        <span className="text-sm font-bold">
                            {engagementData.averageVisitsPerUser}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                                Session Quality
                            </span>
                        </div>
                        <span
                            className={`text-sm font-bold ${getQualityColor(
                                engagementData.sessionQuality
                            )}`}
                        >
                            {engagementData.sessionQuality}
                        </span>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
                    <span>
                        Unique visitors: {engagementData.totalUniqueVisitors}
                    </span>
                    <span>Returning: {engagementData.returningVisitors}</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default EngagementMetrics;
