import React from "react";
import { Link } from "react-router-dom";
import { Upload, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface DashboardActionsProps {
  onImportClick: () => void;
  importLabel: string;
  createLabel: string;
}

export const DashboardActions: React.FC<DashboardActionsProps> = ({
  onImportClick,
  importLabel,
  createLabel,
}) => {
  return (
    <div className="flex gap-2 md:gap-3 w-full md:w-auto">
      <Button
        variant="outline"
        onClick={onImportClick}
        className="flex-1 md:flex-none h-10 md:h-12 px-4 md:px-6 border-base-300 bg-base-100 hover:bg-base-300 text-base-content rounded-btn text-sm md:text-base"
      >
        <Upload className="h-3.5 w-3.5 md:h-4 md:w-4 md:mr-2" />
        <span className="hidden md:inline">{importLabel}</span>
      </Button>

      <Link to="/editor/new" className="flex-1 md:flex-none">
        <Button className="w-full h-10 md:h-12 px-4 md:px-8 gap-1.5 md:gap-2 bg-primary text-primary-content hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-btn font-bold text-sm md:text-base">
          <Plus className="h-4 w-4 md:h-5 md:w-5" />
          {createLabel}
        </Button>
      </Link>
    </div>
  );
};
