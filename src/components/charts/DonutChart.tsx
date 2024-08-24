import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUpIcon } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

type WidgetChartData = {
  nameKey: string;
  dataKey: number;
  fill: string;
};

type WidgetChartDataRecord = Record<string, WidgetChartData[]>;

const widget1ChartData = [
  { nameKey: "connected", dataKey: 2, fill: "var(--color-connected)" },
  { nameKey: "notConnected", dataKey: 2, fill: "var(--color-notConnected)" },
];

const widget2ChartData = [
  { nameKey: "failed", dataKey: 1889, fill: "var(--color-failed)" },
  { nameKey: "warning", dataKey: 681, fill: "var(--color-warning)" },
  { nameKey: "NA", dataKey: 249, fill: "var(--color-na)" },
  { nameKey: "passed", dataKey: 7253, fill: "var(--color-passed)" },
];

const widgetChartRecord: WidgetChartDataRecord = {
  widget1: widget1ChartData,
  widget2: widget2ChartData,
};

const chartConfig = {
  visitors: {
    label: "Total",
  },
  failed: {
    label: "Failed",
    color: "hsl(var(--chart-4))",
  },
  warning: {
    label: "Warning",
    color: "hsl(var(--chart-2))",
  },
  na: {
    label: "Not Available",
    color: "hsl(var(--chart-3))",
  },
  passed: {
    label: "Passed",
    color: "hsl(var(--chart-1))",
  },
  connected: {
    label: "Connected",
    color: "hsl(var(--chart-1))",
  },
  notConnected: {
    label: "Not Connected",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export const DonutChart = ({ data }: { data: any }) => {
  return (
    <Card className="flex flex-col border-none">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={widgetChartRecord[data.category]}
              dataKey="dataKey"
              nameKey="nameKey"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {data.total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-center">
        <div className="hidden items-center gap-2 font-medium leading-none md:flex lg:flex">
          {data.category === "widget1" ? (
            <>
              Cloud Accounts: All accounts connected{" "}
              <TrendingUpIcon className="h-4 w-4" />
            </>
          ) : (
            <>
              {" "}
              Cloud Account Risk Assessment: 7,253 passed{" "}
              <TrendingUpIcon className="h-4 w-4" />
            </>
          )}
        </div>
        <div className="md:text-md lg:text-md text-sm leading-none text-muted-foreground">
          {data.category === "widget1"
            ? "Showing data for 2 total cloud accounts"
            : "Showing results for 9,659 total assessments"}
        </div>
      </CardFooter>
    </Card>
  );
};
