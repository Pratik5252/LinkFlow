'use client';

import * as React from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from '@/Components/ui/chart';
import type { Visit } from '@/types/visits';

export const description = 'An interactive line chart';

const chartConfig = {
    views: {
        label: 'Page Views',
    },
    desktop: {
        label: 'Desktop',
        color: 'var(--chart-6)',
    },
    mobile: {
        label: 'Mobile',
        color: 'var(--chart-7)',
    },
} satisfies ChartConfig;

export function ChartLine({ visits }: { visits: Visit[] }) {
    const chartData = React.useMemo(() => {
        // Process visits data and ensure we have consistent data structure
        const processedData = Object.values(
            visits.reduce((acc, visit) => {
                const date = visit.timestamp.split('T')[0];
                if (!acc[date]) {
                    acc[date] = { date, desktop: 0, mobile: 0, tablet: 0 };
                }

                // Handle different device types more comprehensively
                const device = visit.device.toLowerCase();
                if (device.includes('desktop') || device.includes('laptop')) {
                    acc[date].desktop += 1;
                } else if (
                    device.includes('mobile') ||
                    device.includes('phone')
                ) {
                    acc[date].mobile += 1;
                } else if (device.includes('tablet')) {
                    acc[date].tablet += 1;
                } else {
                    // Default unknown devices to mobile
                    acc[date].mobile += 1;
                }
                return acc;
            }, {} as Record<string, { date: string; desktop: number; mobile: number; tablet: number }>)
        ).sort((a, b) => a.date.localeCompare(b.date));

        // Ensure we have at least some data points for a better chart
        if (processedData.length === 0) {
            const today = new Date().toISOString().split('T')[0];
            return [{ date: today, desktop: 0, mobile: 0, tablet: 0 }];
        }

        return processedData;
    }, [visits]);

    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>('desktop');

    const total = React.useMemo(
        () => ({
            desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
            mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
        }),
        [chartData]
    );

    // Check if we have any actual data
    const hasData = total.desktop > 0 || total.mobile > 0;

    return (
        <Card className="py-4 sm:py-0 h-full flex flex-col">
            <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
                    <CardTitle>Visitors</CardTitle>
                    <CardDescription>
                        Showing total visitors by device
                    </CardDescription>
                </div>
                <div className="flex">
                    {['desktop', 'mobile'].map((key) => {
                        const chart = key as keyof typeof chartConfig;
                        return (
                            <div
                                key={chart}
                                data-active={activeChart === chart}
                                className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center items-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-2"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-muted-foreground text-xs">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-lg leading-none font-bold sm:text-2xl">
                                    {total[
                                        key as keyof typeof total
                                    ].toLocaleString()}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-4 flex-1 flex flex-col">
                {!hasData ? (
                    <div className="flex-1 flex items-center justify-center min-h-[300px]">
                        <div className="text-center text-muted-foreground">
                            <div className="text-2xl mb-2">📊</div>
                            <p className="text-sm">
                                No visitor data available yet
                            </p>
                            <p className="text-xs mt-1">
                                Data will appear once you start receiving visits
                            </p>
                        </div>
                    </div>
                ) : (
                    <ChartContainer
                        config={chartConfig}
                        className="flex-1 w-full min-h-[300px] max-h-[400px]"
                    >
                        <LineChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 20,
                                right: 20,
                                top: 20,
                                bottom: 20,
                            }}
                        >
                            <CartesianGrid
                                vertical={false}
                                strokeDasharray="3 3"
                                stroke="var(--color-border)"
                                opacity={0.3}
                            />
                            <YAxis
                                type="number"
                                domain={[0, 'dataMax']}
                                hide
                                allowDataOverflow={false}
                            />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                minTickGap={20}
                                stroke="var(--color-border)"
                                tick={{
                                    fill: 'var(--color-muted-foreground)',
                                    fontSize: 12,
                                }}
                                tickFormatter={(value) => {
                                    const date = new Date(value);
                                    return date.toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                    });
                                }}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        className="w-[150px]"
                                        labelFormatter={(value) => {
                                            return new Date(
                                                value
                                            ).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            });
                                        }}
                                    />
                                }
                            />
                            <Line
                                dataKey="desktop"
                                type="monotone"
                                stroke={`var(--color-desktop)`}
                                strokeWidth={3}
                                dot={false}
                            />
                            <Line
                                dataKey="mobile"
                                type="monotone"
                                stroke={`var(--color-mobile)`}
                                strokeWidth={3}
                                connectNulls={false}
                                dot={false}
                            />
                            <ChartLegend
                                content={<ChartLegendContent />}
                                wrapperStyle={{
                                    paddingTop: '20px',
                                }}
                            />
                        </LineChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}
