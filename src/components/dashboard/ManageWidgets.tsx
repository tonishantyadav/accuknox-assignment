import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useDashboardStore } from "@/store";
import { PencilRulerIcon, SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";

type CategoryRecord = Record<string, string>;

const categoryRecord: CategoryRecord = {
  All: "All",
  "CSPM Executive Dashboard": "CSPM",
  "CWPP Dashboard": "CWPP",
  "Registry Scan": "Image",
};

export const ManageWidgets = () => {
  const { dashboardData, removeWidget } = useDashboardStore();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [checkedWidgets, setCheckedWidgets] = useState<string[]>([]);

  const widgets =
    selectedCategory === "All"
      ? dashboardData.categories.flatMap((category) => category.widgets)
      : dashboardData.categories
          .filter((category) => category.name === selectedCategory)
          .flatMap((category) => category.widgets);

  const handleCheckboxChange = (widgetId: string) => {
    setCheckedWidgets((prev) =>
      prev.includes(widgetId)
        ? prev.filter((id) => id !== widgetId)
        : [...prev, widgetId],
    );
  };

  const removeCheckedWidgets = () => {
    checkedWidgets.forEach((widgetId) => {
      const category = dashboardData.categories.find((cat) =>
        cat.widgets.some((widget) => widget.id === widgetId),
      );
      if (category) {
        removeWidget(category.id, widgetId);
      }
    });
    setCheckedWidgets([]);
  };

  const selectAllWidgets = () =>
    widgets.map((widget) => handleCheckboxChange(widget.id));

  useEffect(() => {
    if (!open) setCheckedWidgets([]);
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" className="rounded-full">
          <SettingsIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col">
        <SheetHeader>
          <div className="flex items-center gap-1">
            <PencilRulerIcon className="h-4 w-4" />
            <SheetTitle>Manage your widgets</SheetTitle>
          </div>
          <SheetDescription>
            Select the widget that you want in your dashboard.
          </SheetDescription>
        </SheetHeader>
        <div className="my-4 flex flex-grow flex-col gap-4">
          {/* Category menu */}
          <div className="flex gap-2 rounded-lg border p-1">
            {Object.keys(categoryRecord).map((categoryKey) => (
              <Button
                key={categoryKey}
                variant={selectedCategory === categoryKey ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(categoryKey)}
              >
                {categoryRecord[categoryKey]}
              </Button>
            ))}
          </div>
          {/* Filtered widgets based on the selected category */}
          <div className="flex flex-grow flex-col gap-2 overflow-y-auto">
            {widgets.map((widget) => (
              <div
                key={widget.id}
                className="flex items-center gap-2 rounded-md border p-2 text-sm"
              >
                <Checkbox
                  checked={checkedWidgets.includes(widget.id)}
                  onCheckedChange={() => {
                    handleCheckboxChange(widget.id);
                  }}
                />
                <p>{widget.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Button onClick={selectAllWidgets}>Select All</Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setCheckedWidgets([]);
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="mt-auto"
              variant="destructive"
              onClick={() => {
                removeCheckedWidgets();
                setOpen(false);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
