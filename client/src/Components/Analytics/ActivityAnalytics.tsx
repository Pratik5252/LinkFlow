import RecentActivity from '../Charts/RecentActivity';
import EngagementMetrics from '../Charts/EngagementMetrics';
import { Skeleton } from '@/Components/ui/skeleton';
import type { Visit } from '@/types/visits';

interface ActivityAnalyticsProps {
    visits: Visit[];
    loading?: boolean;
}

const ActivityAnalytics = ({
    visits,
    loading = false,
}: ActivityAnalyticsProps) => {
    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">
                        Engagement & Activity
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Monitor visitor behavior and real-time activity
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Skeleton className="h-80 w-full" />
                    <Skeleton className="h-80 w-full" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <div>
                <h3 className="text-lg font-semibold mb-2">
                    Engagement & Activity
                </h3>
                <p className="text-sm text-muted-foreground">
                    Monitor visitor behavior and real-time activity
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                {/* Recent Activity Feed */}
                <div className="lg:col-span-1 h-full">
                    <RecentActivity visits={visits} limit={8} />
                </div>

                {/* Engagement Metrics */}
                <div className="lg:col-span-1 h-full">
                    <EngagementMetrics visits={visits} />
                </div>
            </div>
        </div>
    );
};

export default ActivityAnalytics;
