import React, { useEffect, useRef } from "react";
import { LayoutGrid } from "lucide-react";
import { cn } from "../../lib/utils";
import type { Zone, ZoneStyle } from "../../../core/types/domain";
import type { UseFormRegister } from "react-hook-form";

interface FormFieldsSidebarProps {
  zones: Zone[];
  register: UseFormRegister<Record<string, string>>;
  selectedZoneId: string | null;
  styles?: Record<string, ZoneStyle>;
  onZoneSelect: (id: string) => void;
  title: string;
  isMobile?: boolean;
}

export const FormFieldsSidebar: React.FC<FormFieldsSidebarProps> = ({
  zones,
  register,
  selectedZoneId,
  styles,
  onZoneSelect,
  title,
  isMobile = false,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current || !selectedZoneId) return;
    const el = scrollRef.current.querySelector(`[data-zone-id="${selectedZoneId}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedZoneId]);

  return (
    <div
      className={cn(
        "border border-base-300 bg-base-200 flex flex-col rounded-box shadow-inner",
        isMobile
          ? "w-full h-full" // موبایل: parent controls height
          : "w-full md:w-80 lg:w-85 h-full", // دسکتاپ: full height
      )}
    >
      {/* Header - Compact در موبایل */}
      <div
        className={cn(
          "flex items-center gap-2 text-base-content font-black uppercase tracking-tighter border-b border-base-300 flex-shrink-0",
          isMobile ? "p-3 pb-2" : "p-4 md:p-6 pb-3 md:pb-4",
        )}
      >
        <LayoutGrid
          className={cn(
            "text-primary",
            isMobile ? "w-4 h-4" : "w-4 h-4 md:w-5 md:h-5",
          )}
        />
        <h3 className={cn(isMobile ? "text-xs" : "text-sm md:text-base")}>
          {title}
        </h3>
      </div>

      {/* Scrollable Content */}
      <div
        className={cn(
          "flex-1 overflow-y-auto",
          isMobile ? "p-3 pt-2" : "p-4 md:p-6 pt-3 md:pt-4",
        )}
      >
        <div ref={scrollRef} className={cn(isMobile ? "space-y-2" : "space-y-3 md:space-y-4")}>
          {zones.map((zone) => {
            const style = styles?.[zone.id];
            const isActive = selectedZoneId === zone.id;

            return (
              <div
                key={zone.id}
                data-zone-id={zone.id}
                className={cn(
                  "space-y-1.5 rounded-btn transition-all duration-300 cursor-pointer border",
                  isMobile ? "p-2.5" : "p-3 md:p-4",
                  isActive
                    ? "bg-base-100 border-primary shadow-md"
                    : "bg-base-100/50 border-base-300 hover:border-base-content/20",
                )}
                onClick={() => onZoneSelect(zone.id)}
              >
                <label
                  className={cn(
                    "text-[10px] font-black uppercase tracking-widest block transition-colors",
                    isActive ? "text-primary" : "text-base-content/40",
                  )}
                >
                  {zone.label}
                </label>
                <input
                  {...register(zone.id)}
                  className={cn(
                    "w-full bg-base-200 border border-base-300 text-base-content rounded-md focus:border-primary outline-none transition-all font-medium",
                    isMobile ? "text-xs p-2" : "text-xs md:text-sm p-2 md:p-3",
                  )}
                  dir={style?.direction || "ltr"}
                  placeholder="..."
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
