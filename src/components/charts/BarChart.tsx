import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart as BaseBarChart, CartesianGrid, XAxis } from "recharts";

type WidgetChartData = {
  label: string;
  issues: number;
};

type WidgetChartDataRecord = Record<string, WidgetChartData[]>;

const widget1ChartData = [
  { label: "tot", issues: 1470 },
  { label: "min", issues: 700 },
  { label: "mid", issues: 470 },
  { label: "max", issues: 300 },
];

const widget2ChartData = [
  { label: "tot", issues: 200 },
  { label: "min", issues: 80 },
  { label: "mid", issues: 100 },
  { label: "max", issues: 20 },
];

const widgetChartRecord: WidgetChartDataRecord = {
  widget1: widget1ChartData,
  widget2: widget2ChartData,
};

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export const BarChart = ({ data }: { data: any }) => {
  console.log(data.category);
  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BaseBarChart
            accessibilityLayer
            data={widgetChartRecord[data.category]}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="issues" fill="var(--color-desktop)" radius={8} />{" "}
          </BaseBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="hidden gap-1 text-center font-medium leading-none md:flex lg:flex">
          Total issues found this {data.total} month
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-center leading-none text-muted-foreground">
          Tracking all issues for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};
