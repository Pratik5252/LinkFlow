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

type MetricsData = ReturnType<typeof calculateUrlMetrics>;

interface MetricConfig {
    label: string;
    icon: React.ElementType;
    valueKey: keyof MetricsData;
    color: string;
    subText: (hasData: boolean) => React.ReactNode;
    showChange: boolean;
    changeKey?: keyof MetricsData;
    format: (val: number) => React.ReactNode;
    empty?: React.ReactNode;
}

const metricsConfig: MetricConfig[] = [
    {
        label: 'Total URLs',
        icon: Link,
        valueKey: 'totalUrls',
        color: 'text-blue-500',
        subText: (hasData: boolean) => (hasData ? 'Created' : 'Get started'),
        showChange: false,
        format: (val: number) => val,
    },
    {
        label: 'Total Clicks',
        icon: MousePointerClick,
        valueKey: 'totalClicks',
        color: 'text-green-500',
        subText: () => 'All time',
        showChange: true,
        changeKey: 'clicksPercentageChange',
        format: (val: number) => val.toLocaleString(),
    },
    {
        label: 'Avg. Clicks',
        icon: BarChart3,
        valueKey: 'avgClicksPerUrl',
        color: 'text-purple-500',
        subText: () => 'Per URL',
        showChange: true,
        changeKey: 'avgClicksPercentageChange',
        format: (val: number) => val,
        empty: '-',
    },
    {
        label: 'Click Rate',
        icon: Target,
        valueKey: 'clickThroughRate',
        color: 'text-orange-500',
        subText: (hasData: boolean) =>
            hasData ? 'URLs with clicks' : 'Start sharing URLs',
        showChange: true,
        changeKey: 'clickRatePercentageChange',
        format: (val: number) => (
            <span className="flex items-baseline">
                {val}
                <span className="text-xs">%</span>
            </span>
        ),
    },
];

export function UrlOverviewMetrics({ urls }: UrlOverviewMetricsProps) {
    const metrics = calculateUrlMetrics(urls);
    const hasData = metrics.totalUrls > 0;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            {metricsConfig.map((cfg) => {
                const Icon = cfg.icon;
                const value = metrics[cfg.valueKey];
                const change =
                    cfg.showChange && cfg.changeKey
                        ? metrics[cfg.changeKey]
                        : null;
                return (
                    <Card
                        key={cfg.label}
                        className="rounded-md h-fit py-2 hover:bg-gradient-to-b from-muted/50 to-muted/20 transition-colors duration-150 z-10"
                    >
                        <CardContent className="p-2 text-start relative">
                            <div className="flex justify-start items-center gap-2">
                                <Icon
                                    size={16}
                                    className={
                                        hasData ? cfg.color : 'text-gray-400'
                                    }
                                />
                                <p className="text-xs md:text-sm text-muted-foreground">
                                    {cfg.label}
                                </p>
                            </div>
                            <p className="text-xl font-medium mt-2">
                                {hasData
                                    ? typeof cfg.format === 'function'
                                        ? cfg.format(value)
                                        : value
                                    : cfg.empty ?? value}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {typeof cfg.subText === 'function'
                                    ? cfg.subText(hasData)
                                    : cfg.subText}
                            </p>
                            {hasData && cfg.showChange && change !== null && (
                                <div className="absolute bottom-2 right-2 flex items-center gap-1">
                                    {change >= 0 ? (
                                        <ArrowUp
                                            size={12}
                                            className="text-green-600"
                                        />
                                    ) : (
                                        <ArrowDown
                                            size={12}
                                            className="text-red-600"
                                        />
                                    )}
                                    <span
                                        className={`text-xs ${
                                            change >= 0
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                        }`}
                                    >
                                        {change >= 0 ? '+' : ''}
                                        {change}%
                                    </span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
