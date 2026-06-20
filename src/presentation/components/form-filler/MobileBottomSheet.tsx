import React from "react";
import { FormFieldsSidebar } from "./FormFieldsSidebar";
import { FormStylePanel } from "../../components/form/FormStylePanel";
import { MobileToggle } from "./MobileToggle";
import type { Zone, ZoneStyle } from "../../../core/types/domain";
import type { UseFormRegister } from "react-hook-form";

interface MobileBottomSheetProps {
  activeTab: "fields" | "style";
  onTabChange: (tab: "fields" | "style") => void;
  zones: Zone[];
  register: UseFormRegister<Record<string, string>>;
  selectedZoneId: string | null;
  styles?: Record<string, ZoneStyle>;
  onZoneSelect: (id: string) => void;
  fieldsTitle: string;
  fieldsLabel: string;
  styleLabel: string;
}

export const MobileBottomSheet: React.FC<MobileBottomSheetProps> = ({
  activeTab,
  onTabChange,
  zones,
  register,
  selectedZoneId,
  styles,
  onZoneSelect,
  fieldsTitle,
  fieldsLabel,
  styleLabel,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Toggle Buttons - Compact */}
      <MobileToggle
        activeTab={activeTab}
        onTabChange={onTabChange}
        fieldsLabel={fieldsLabel}
        styleLabel={styleLabel}
      />

      {/* Content - Smaller max height for more canvas space */}
      <div className="max-h-[35vh] overflow-hidden">
        {activeTab === "fields" ? (
          <FormFieldsSidebar
            zones={zones}
            register={register}
            selectedZoneId={selectedZoneId}
            styles={styles}
            onZoneSelect={onZoneSelect}
            title={fieldsTitle}
            isMobile={true}
          />
        ) : (
          <FormStylePanel />
        )}
      </div>
    </div>
  );
};
