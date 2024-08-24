import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { Category, DashboardData, Widget } from "./types";

interface DashboardStore {
  dashboardData: DashboardData;
  addWidget: (categoryId: string, widget: Omit<Widget, "id">) => void;
  removeWidget: (categoryId: string, widgetId: string) => void;
  addCategory: (category: Omit<Category, "id" | "widgets">) => void;
  searchWidgets: (query: string) => Widget[];
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  dashboardData: {
    categories: [
      {
        id: "1",
        name: "CSPM Executive Dashboard",
        widgets: [
          {
            id: "1",
            name: "Cloud Accounts",
            type: "donut",
            data: {
              total: 2,
              connected: 2,
              notConnected: 2,
              category: "widget1",
            },
          },
          {
            id: "2",
            name: "Cloud Account Risk Assessment",
            type: "donut",
            data: {
              total: 9659,
              failed: 1889,
              warning: 681,
              notAvailable: 36,
              passed: 7253,
              category: "widget2",
            },
          },
        ],
      },
      {
        id: "2",
        name: "CWPP Dashboard",
        widgets: [
          {
            id: "3",
            name: "Top 5 Namespace Specific Alerts",
            type: "text",
            data: "No Graph data available!",
          },
          {
            id: "4",
            name: "Workload Alerts",
            type: "text",
            data: "No Graph data available!",
          },
        ],
      },
      {
        id: "3",
        name: "Registry Scan",
        widgets: [
          {
            id: "5",
            name: "Image Risk Assessment",
            type: "bar",
            data: {
              total: 1470,
              high: 700,
              low: 470,
              critical: 300,
              category: "widget1",
            },
          },
          {
            id: "6",
            name: "Image Security Issues",
            type: "bar",
            data: {
              total: 200,
              low: 80,
              high: 20,
              critical: 100,
              category: "widget2",
            },
          },
        ],
      },
    ],
  },
  addWidget: (categoryId, widget) =>
    set((state) => {
      const newWidget = { ...widget, id: uuidv4() };
      const updatedCategories = state.dashboardData.categories.map(
        (category) =>
          category.id === categoryId
            ? { ...category, widgets: [...category.widgets, newWidget] }
            : category,
      );
      return {
        dashboardData: {
          ...state.dashboardData,
          categories: updatedCategories,
        },
      };
    }),
  removeWidget: (categoryId, widgetId) =>
    set((state) => {
      const updatedCategories = state.dashboardData.categories.map(
        (category) =>
          category.id === categoryId
            ? {
                ...category,
                widgets: category.widgets.filter((w) => w.id !== widgetId),
              }
            : category,
      );
      return {
        dashboardData: {
          ...state.dashboardData,
          categories: updatedCategories,
        },
      };
    }),
  addCategory: (category) =>
    set((state) => ({
      dashboardData: {
        ...state.dashboardData,
        categories: [
          ...state.dashboardData.categories,
          { ...category, id: uuidv4(), widgets: [] },
        ],
      },
    })),
  searchWidgets: (query) => {
    const { categories } = get().dashboardData;
    return categories
      .flatMap((category) => category.widgets)
      .filter((widget) =>
        widget.name.toLowerCase().includes(query.toLowerCase()),
      );
  },
}));
