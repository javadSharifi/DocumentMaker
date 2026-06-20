import React from "react";
import { Button } from "../ui/button";
import { LayoutGrid, Palette } from "lucide-react";
import { cn } from "../../lib/utils";

interface MobileToggleProps {
  activeTab: "fields" | "style";
  onTabChange: (tab: "fields" | "style") => void;
  fieldsLabel: string;
  styleLabel: string;
}

export const MobileToggle: React.FC<MobileToggleProps> = ({
  activeTab,
  onTabChange,
  fieldsLabel,
  styleLabel,
}) => {
  return (
    <div className="flex gap-2 p-1.5 rounded-btn bg-base-200 border border-base-300">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onTabChange("fields")}
        className={cn(
          "flex-1 gap-2 rounded-btn font-bold transition-all text-xs h-9",
          activeTab === "fields"
            ? "bg-primary text-primary-content shadow-lg"
            : "text-base-content/50 hover:bg-base-300",
        )}
      >
        <LayoutGrid className="w-4 h-4" />
        {fieldsLabel}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onTabChange("style")}
        className={cn(
          "flex-1 gap-2 rounded-btn font-bold transition-all text-xs h-9",
          activeTab === "style"
            ? "bg-primary text-primary-content shadow-lg"
            : "text-base-content/50 hover:bg-base-300",
        )}
      >
        <Palette className="w-4 h-4" />
        {styleLabel}
      </Button>
    </div>
  );
};
