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

// Helper to aggregate browser data from visits
function getBrowserPieData(visits: Visit[]) {
  const browserMap: Record<
    string,
    { browser: string; visitors: number; fill: string }
  > = {
    chrome: { browser: "chrome", visitors: 0, fill: "var(--chart-chrome)" },
    safari: { browser: "safari", visitors: 0, fill: "var(--chart-safari)" },
    firefox: { browser: "firefox", visitors: 0, fill: "var(--chart-firefox)" },
    edge: { browser: "edge", visitors: 0, fill: "var(--chart-edge)" },
    other: { browser: "other", visitors: 0, fill: "var(--chart-other)" },
  };

  visits.forEach((visit) => {
    const b = visit.browser.toLowerCase();
    if (b.includes("chrome")) browserMap.chrome.visitors += 1;
    else if (b.includes("safari")) browserMap.safari.visitors += 1;
    else if (b.includes("firefox")) browserMap.firefox.visitors += 1;
    else if (b.includes("edge")) browserMap.edge.visitors += 1;
    else browserMap.other.visitors += 1;
  });

  return Object.values(browserMap);
}

export function ChartPie({ visits }: { visits: Visit[] }) {
  // Use dummyVisitData for now, can switch to real data later
  const chartData = React.useMemo(
    () => getBrowserPieData(dummyVisitData.visits),
    []
  );

  return (
    <Card className="flex flex-col rounded-2xl">
      <CardHeader className="items-center pb-0">
        <CardTitle>Browsers</CardTitle>
        {/* <CardDescription>January - June 2025</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0 ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square min-h-[250px]"
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
