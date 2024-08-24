export interface Widget {
  id: string;
  name: string;
  data: any;
  type: "pie" | "donut" | "bar" | "text";
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}

export interface DashboardData {
  categories: Category[];
}
