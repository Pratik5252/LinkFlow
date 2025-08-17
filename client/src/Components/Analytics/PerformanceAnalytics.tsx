import GeographicInsights from '../Charts/GeographicInsights';
import DeviceInsights from '../Charts/DeviceInsights';
import PerformanceInsights from '../Charts/TrafficSources';
import AudienceQuality from '../Charts/AudienceQuality';
import { Skeleton } from '@/Components/ui/skeleton';
import type { Visit } from '@/types/visits';

interface PerformanceAnalyticsProps {
    visits: Visit[];
    loading?: boolean;
}

const PerformanceAnalytics = ({
    visits,
    loading = false,
}: PerformanceAnalyticsProps) => {
    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">
                        Performance & Geographic Insights
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Key performance metrics and audience demographics
                    </p>
                </div>
                {/* Minimal Skeleton Grid using shadcn/ui Skeleton */}
                <div className="grid grid-cols-1 gap-6">
                    {/* Top Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-64 w-full" />
                    </div>
                    {/* Bottom Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-48 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <div>
                <h3 className="text-lg font-semibold mb-2">
                    Performance & Geographic Insights
                </h3>
                <p className="text-sm text-muted-foreground">
                    Key performance metrics and audience demographics
                </p>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 gap-6">
                {/* Top Row: Performance Insights and Audience Quality */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-fit">
                        <PerformanceInsights visits={visits} />
                    </div>
                    <div className="h-fit">
                        <AudienceQuality visits={visits} />
                    </div>
                </div>

                {/* Bottom Row: Geographic and Device Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <GeographicInsights visits={visits} />
                    </div>
                    <div>
                        <DeviceInsights visits={visits} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceAnalytics;
