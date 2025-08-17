import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import type { Visit } from '@/types/visits';
import { useMemo } from 'react';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { getBrowserPieData } from '@/utils/getBrowserData';
import { getOSChartData } from '@/utils/getOSData';
import { getDeviceChartData } from '@/utils/getDeviceData';

interface DeviceInsightsProps {
    visits: Visit[];
}

const DeviceInsights = ({ visits }: DeviceInsightsProps) => {
    const deviceData = useMemo(() => {
        // Use existing utility functions
        const deviceChartData = getDeviceChartData(visits);
        const browserChartData = getBrowserPieData(visits);
        const osChartData = getOSChartData(visits);

        // Transform device data for our component
        const sortedDevices = deviceChartData
            .filter((item) => item.visitors > 0)
            .sort((a, b) => b.visitors - a.visitors)
            .map((item) => ({
                name:
                    item.device.charAt(0).toUpperCase() + item.device.slice(1),
                count: item.visitors,
                percentage: Math.round((item.visitors / visits.length) * 100),
            }));

        // Transform browser data - get top browsers with visitors > 0
        const topBrowsers = browserChartData
            .filter((item) => item.visitors > 0)
            .sort((a, b) => b.visitors - a.visitors)
            .slice(0, 3)
            .map(
                (item) =>
                    [
                        item.browser.charAt(0).toUpperCase() +
                            item.browser.slice(1),
                        item.visitors,
                    ] as [string, number]
            );

        // Transform OS data - get top OS with visitors > 0
        const topOS = osChartData
            .filter((item) => item.visitors > 0)
            .sort((a, b) => b.visitors - a.visitors)
            .slice(0, 3)
            .map(
                (item) =>
                    [
                        item.os === 'macos'
                            ? 'macOS'
                            : item.os === 'ios'
                            ? 'iOS'
                            : item.os.charAt(0).toUpperCase() +
                              item.os.slice(1),
                        item.visitors,
                    ] as [string, number]
            );

        return { sortedDevices, topBrowsers, topOS };
    }, [visits]);

    const getDeviceIcon = (deviceName: string) => {
        const name = deviceName.toLowerCase();
        if (name.includes('desktop') || name.includes('computer')) {
            return <Monitor className="h-4 w-4" />;
        }
        if (name.includes('tablet') || name.includes('ipad')) {
            return <Tablet className="h-4 w-4" />;
        }
        return <Smartphone className="h-4 w-4" />;
    };

    if (visits.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                        Device Breakdown
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-8">
                    <p className="text-sm text-muted-foreground">
                        No device data available
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    Device & Browser Insights
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    How visitors access your URL
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Device Types */}
                <div>
                    <h4 className="text-sm font-medium mb-3 text-muted-foreground">
                        Devices
                    </h4>
                    <div className="space-y-3">
                        {deviceData.sortedDevices.map((device) => (
                            <div key={device.name} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {getDeviceIcon(device.name)}
                                        <span className="text-sm font-medium">
                                            {device.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">
                                            {device.percentage}%
                                        </span>
                                        <span className="text-sm font-medium">
                                            {device.count}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div
                                        className="bg-primary h-2 rounded-full transition-all duration-300"
                                        style={{
                                            width: `${device.percentage}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Browser & OS Stats */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                    <div>
                        <h4 className="text-xs font-medium mb-2 text-muted-foreground">
                            Top Browsers
                        </h4>
                        <div className="space-y-1">
                            {deviceData.topBrowsers
                                .slice(0, 2)
                                .map(([browser, count]) => (
                                    <div
                                        key={browser}
                                        className="flex justify-between text-xs"
                                    >
                                        <span className="truncate">
                                            {browser}
                                        </span>
                                        <span className="text-muted-foreground">
                                            {count}
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xs font-medium mb-2 text-muted-foreground">
                            Top OS
                        </h4>
                        <div className="space-y-1">
                            {deviceData.topOS.slice(0, 2).map(([os, count]) => (
                                <div
                                    key={os}
                                    className="flex justify-between text-xs"
                                >
                                    <span className="truncate">{os}</span>
                                    <span className="text-muted-foreground">
                                        {count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default DeviceInsights;
