import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import type { Visit } from '@/types/visits';
import { useMemo } from 'react';
import { Activity, Clock, MapPin } from 'lucide-react';
import { processRecentVisits } from '@/utils/activityUtils';

interface RecentActivityProps {
    visits: Visit[];
    limit?: number;
}

const RecentActivity = ({ visits, limit = 10 }: RecentActivityProps) => {
    const recentVisits = useMemo(() => {
        return processRecentVisits(visits, limit);
    }, [visits, limit]);

    if (visits.length === 0) {
        return (
            <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        Recent Activity
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                        No recent activity
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Latest {recentVisits.length} visits
                </p>
            </CardHeader>
            <CardContent className="space-y-3 flex-1 overflow-hidden">
                <div className="max-h-64 overflow-y-auto space-y-3 flex-1">
                    {recentVisits.map((visit, index) => (
                        <div
                            key={visit.id || index}
                            className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                                {/* Device & Location */}
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    {visit.deviceIcon}
                                    <MapPin className="h-3 w-3" />
                                </div>

                                {/* Location & Browser Info */}
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium truncate">
                                            {visit.location?.city
                                                ? `${visit.location.city}, ${visit.location.country}`
                                                : visit.location?.country ||
                                                  'Unknown Location'}
                                        </span>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {visit.browser} • {visit.os} •{' '}
                                        {visit.device}
                                    </div>
                                </div>

                                {/* Time */}
                                <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                                    <Clock className="h-3 w-3" />
                                    {visit.timeAgo}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
                    <span>Total visits: {visits.length}</span>
                    <span>
                        Last visit: {recentVisits[0]?.timeAgo || 'Never'}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};

export default RecentActivity;
