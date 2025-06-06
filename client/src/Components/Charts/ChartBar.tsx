import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart";
import { dummyVisitData } from "@/__mocks__/dummyVisitData";
import { getOSChartData } from "@/utils/getOSData";

const chartConfig = {
  visitors: { label: "Visitors" },
  android: { label: "Android", color: "var(--chart-android)" },
  windows: { label: "Windows", color: "var(--chart-windows)" },
  macos: { label: "MacOS", color: "var(--chart-macos)" },
  linux: { label: "Linux", color: "var(--chart-linux)" },
  ios: { label: "iOS", color: "var(--chart-ios)" },
  other: { label: "Other", color: "var(--chart-other)" },
} satisfies ChartConfig;

export function ChartBar({ visits }: { visits: { os: string }[] }) {
  const chartData = getOSChartData(dummyVisitData.visits);

  return (
    <Card className="rounded-2xl gap-0 pb-2">
      <CardHeader>
        <CardTitle>OS</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square min-h-[150px] h-[150px] min-w-[200px]"
        >
          <BarChart
            className=""
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="os"
              type="category"
              tickLine={false}
              tickMargin={10}
              minTickGap={4}
              height={10}
              axisLine={false}
              tickFormatter={(value) => value}
              className="flex text-left"
              
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="visitors"
              layout="vertical"
              radius={4}
              barSize={20}
              height={10}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
