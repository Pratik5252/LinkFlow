import type { Url } from '@/types/url';
import type { Visit } from '@/types/visits';
import Metrics from '../Analytics/Metrics';
import TimeAnalytics from '../Analytics/TimeAnalytics';
import PerformanceAnalytics from '../Analytics/PerformanceAnalytics';
import ActivityAnalytics from '../Analytics/ActivityAnalytics';
import { calculateTier1Metrics } from '@/utils/visitMetrics';

interface UrlVisitsProps {
    url: Url | null;
    visits: Visit[];
    visitCount: number;
    loading: boolean;
}

const UrlVisits = ({ visits, loading }: UrlVisitsProps) => {
    const tier1Metrics = calculateTier1Metrics(visits);

    return (
        <div className="w-full sm:max-w-6xl h-full flex justify-center items-center">
            <div className="h-full w-[70vw] space-y-6">
                <div className="self-start mb-4">
                    <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
                    <p className="text-muted-foreground">
                        Comprehensive insights for your URL performance
                    </p>
                </div>

                {/* Tier 1: Critical Overview Metrics */}
                <Metrics metrics={tier1Metrics} loading={loading} />

                {/* Tier 2: Time-based Analytics */}
                <TimeAnalytics visits={visits} loading={loading} />

                {/* Tier 3: Geographic & Device Insights */}
                <PerformanceAnalytics visits={visits} loading={loading} />

                {/* Tier 4: Engagement & Activity */}
                <ActivityAnalytics visits={visits} loading={loading} />
            </div>
        </div>
    );
};

export default UrlVisits;
