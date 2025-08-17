import { ChartLine } from '../Charts/ChartLine';
import PeakHoursHeatmap from '../Charts/PeakHoursHeatmap';
import { Skeleton } from '@/Components/ui/skeleton';
import type { Visit } from '@/types/visits';

interface TimeAnalyticsProps {
    visits: Visit[];
    loading?: boolean;
}

const TimeAnalytics = ({ visits, loading = false }: TimeAnalyticsProps) => {
    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">
                        Time-based Analytics
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Discover when your audience is most active
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
                    Time-based Analytics
                </h3>
                <p className="text-sm text-muted-foreground">
                    Discover when your audience is most active
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                {/* Enhanced Timeline Chart */}
                <div className="lg:col-span-1 h-full">
                    <ChartLine visits={visits} />
                </div>

                {/* Peak Hours Heatmap */}
                <div className="lg:col-span-1 h-full">
                    <PeakHoursHeatmap visits={visits} />
                </div>
            </div>
        </div>
    );
};

export default TimeAnalytics;
