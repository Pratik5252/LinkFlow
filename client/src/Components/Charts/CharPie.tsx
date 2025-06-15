"use client";

import * as React from "react";
import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/Components/ui/chart";
import { dummyVisitData } from "@/__mocks__/dummyVisitData";
import type { Visit } from "@/types/visits";
import { getBrowserPieData } from "@/utils/getBrowserData";

export const description = "A pie chart showing browser distribution";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-chrome)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-safari)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-firefox)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-edge)",
  },
  other: {
    label: "Other",
    color: "var(--chart-other)",
  },
} satisfies ChartConfig;

export function ChartPie({ visits }: { visits: Visit[] }) {
  // You can replace the current dummyVisitData with real data by dummyVisitData.visits -> visits
  const chartData = React.useMemo(
    () => getBrowserPieData(dummyVisitData.visits),
    []
  );

  return (
    <Card className="flex flex-col rounded-2xl gap-0 pb-0">
      <CardHeader className="items-center pb-0">
        <CardTitle>Browsers</CardTitle>
        {/* <CardDescription>January - June 2025</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0 ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square min-h-[150px] min-w-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              stroke="0"
              isAnimationActive={false}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
