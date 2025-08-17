'use client';

import * as React from 'react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

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
    const chartData = Object.values(
        visits.reduce((acc, visit) => {
            const date = visit.timestamp.split('T')[0];
            if (!acc[date]) {
                acc[date] = { date, desktop: 0, mobile: 0 };
            }
            if (visit.device === 'Desktop') {
                acc[date].desktop += 1;
            } else if (visit.device === 'Mobile') {
                acc[date].mobile += 1;
            }
            return acc;
        }, {} as Record<string, { date: string; desktop: number; mobile: number }>)
    ).sort((a, b) => a.date.localeCompare(b.date));

    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>('desktop');

    const total = React.useMemo(
        () => ({
            desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
            mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
        }),
        [chartData]
    );

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
                <ChartContainer
                    config={chartConfig}
                    className="flex-1 flex justify-center items-center min-h-[200px] w-full aspect-video"
                >
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        {/* <YAxis domain={["dataMin - 1", "dataMax + 1"]} /> */}
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
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
                            type="natural"
                            stroke={`var(--color-desktop)`}
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="mobile"
                            type="natural"
                            stroke={`var(--color-mobile)`}
                            strokeWidth={2}
                            dot={false}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
