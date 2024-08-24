import { AddWidgetModal, ManageWidgets } from "@/components/dashboard";
import { Input } from "@/components/ui/input";

import { LayoutDashboardIcon } from "lucide-react";
import { SetStateAction } from "react";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (searchQuery: SetStateAction<string>) => void;
}

export const Navbar = ({ searchQuery, setSearchQuery }: NavbarProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-md border bg-neutral-100/20 px-2 py-4 md:flex-row md:justify-between lg:flex-row lg:justify-between">
      <div className="flex items-center gap-1">
        <LayoutDashboardIcon className="h-4 w-4 md:h-8 md:w-8 lg:h-8 lg:w-8" />
        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
          CNAPP Dashboard
        </h1>
      </div>
      <div className="flex flex-col gap-4 md:flex-row lg:flex-row">
        <Input
          placeholder="Search widgets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-64 lg:w-64"
        />
        <div className="flex justify-end gap-2">
          <AddWidgetModal />
          <ManageWidgets />
        </div>
      </div>
    </div>
  );
};
