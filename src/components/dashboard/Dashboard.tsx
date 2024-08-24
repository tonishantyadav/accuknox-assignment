import { BarChart, DonutChart } from "@/components/charts";
import { AddWidgetButton } from "@/components/dashboard";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStore } from "@/store";
import {
  ChartColumnIcon,
  ChartLineIcon,
  ChartNoAxesCombinedIcon,
  GhostIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";

type ChartComponent = (data: any) => JSX.Element;

const chartRecord: Record<string, ChartComponent> = {
  donut: (data) => <DonutChart data={data} />,
  bar: (data) => <BarChart data={data} />,
};

export const Dashboard = () => {
  const { dashboardData, removeWidget, searchWidgets } = useDashboardStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWidgets = searchQuery ? searchWidgets(searchQuery) : [];

  return (
    <div className="min-h-screen bg-neutral-100/50 p-2 md:p-4 lg:p-4">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {/* Filtered Widgets */}
      {searchQuery && (
        <>
          {!filteredWidgets.length ? (
            <div className="mt-16 flex flex-col items-center justify-center text-slate-500">
              <GhostIcon className="h-4 w-4 md:h-8 md:w-8 lg:h-8 lg:w-8" />
              <span className="text-lg md:text-xl lg:text-xl">
                No widgets found
              </span>
            </div>
          ) : (
            <div className="my-4">
              <h2 className="my-4 text-xl font-semibold text-slate-700">
                Search Results
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredWidgets.map((widget) => (
                  <Card key={widget.id}>
                    <CardHeader>
                      <CardTitle className="text-md md:text-lg lg:text-lg">
                        {widget.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="h-full">
                      {widget.type === "text" ? (
                        <div className="flex flex-col items-center justify-center">
                          <ChartLineIcon className="h-10 w-10 text-slate-400" />
                          <span className="font-medium text-slate-400">
                            No graph data available
                          </span>
                        </div>
                      ) : (
                        chartRecord[widget.type](widget.data)
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      {/* All Widgets */}
      {!searchQuery && (
        <div>
          {dashboardData.categories.map((category) => (
            <div
              key={category.id}
              className="my-8 flex w-full flex-col rounded-md border bg-neutral-100/20 p-4"
            >
              <div className="flex w-full flex-col gap-2.5">
                <div className="flex justify-between">
                  {" "}
                  <div className="flex items-center gap-1">
                    <ChartNoAxesCombinedIcon className="h-4 w-4" />
                    <h2 className="text-lg font-semibold md:text-xl lg:text-xl">
                      {category.name}
                    </h2>
                  </div>
                  <AddWidgetButton categoryId={category.id} />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {category.widgets.map((widget) => (
                    <Card
                      key={widget.id}
                      className="group h-full w-full shadow-sm"
                    >
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-md flex items-center gap-1 text-slate-700 md:text-lg lg:text-xl">
                          <ChartColumnIcon className="h-4 w-4" />
                          {widget.name}
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full group-hover:bg-rose-100"
                          onClick={() => removeWidget(category.id, widget.id)}
                        >
                          <XIcon className="hidden h-4 w-4 text-rose-500 group-hover:flex" />
                        </Button>
                      </CardHeader>
                      <CardContent>
                        {widget.type === "text" ? (
                          <div className="my-20 flex flex-col items-center justify-center">
                            <ChartLineIcon className="h-10 w-10 text-slate-400" />
                            <span className="font-medium text-slate-400">
                              No graph data available.
                            </span>
                          </div>
                        ) : (
                          chartRecord[widget.type](widget.data)
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
