import React from "react";
import { Github } from "lucide-react";
import { Button } from "../ui/button";
import { SearchBar } from "./SearchBar";
import { DashboardActions } from "./DashboardActions";

interface DashboardHeaderProps {
  title: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onImportClick: () => void;
  searchPlaceholder: string;
  importLabel: string;
  createLabel: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  searchValue,
  onSearchChange,
  onImportClick,
  searchPlaceholder,
  importLabel,
  createLabel,
}) => {
  return (
    <div className="flex flex-col gap-6 md:gap-8 px-2 sm:px-0">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-base-content uppercase">
          {title}
        </h1>
        <Button variant="ghost" size="icon" asChild>
          <a href="https://github.com/javadSharifi/DocumentMaker" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5 md:h-6 md:w-6" />
          </a>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:gap-4 p-3 md:p-4 rounded-box bg-base-200 border border-base-300 shadow-sm">
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
        />
        <DashboardActions
          onImportClick={onImportClick}
          importLabel={importLabel}
          createLabel={createLabel}
        />
      </div>
    </div>
  );
};
