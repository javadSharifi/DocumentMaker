import React, { useState, useMemo, useEffect } from "react";
import { useEditorStore } from "../../../application/store/editor.store";
import { useTranslation } from "react-i18next";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Trash2, Settings2, Info, Layout, X } from "lucide-react";
import debounce from "lodash-es/debounce";

interface PropertiesPanelProps {
  onClose?: () => void;
  isMobile?: boolean;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  onClose,
  isMobile = false,
}) => {
  const currentTemplate = useEditorStore((s) => s.currentTemplate);
  const selectedZoneId = useEditorStore((s) => s.selectedZoneId);
  const updateZone = useEditorStore((s) => s.updateZone);
  const removeZone = useEditorStore((s) => s.removeZone);
  const { t } = useTranslation();

  const selectedZone = useMemo(
    () => currentTemplate?.zones.find((z) => z.id === selectedZoneId),
    [currentTemplate, selectedZoneId],
  );

  // Zone-switch guard: reset local state immediately when selection changes
  const [prevZoneId, setPrevZoneId] = useState(selectedZoneId);
  const [localState, setLocalState] = useState({
    label: selectedZone?.label || "",
    defaultValue: selectedZone?.defaultValue || "",
  });

  if (prevZoneId !== selectedZoneId) {
    setPrevZoneId(selectedZoneId);
    setLocalState({
      label: selectedZone?.label || "",
      defaultValue: selectedZone?.defaultValue || "",
    });
  }

  // DEBOUNCED UPDATE: Prevents store flooding
  const debouncedUpdate = useMemo(
    () =>
      debounce((id: string, data: Partial<typeof localState>) => {
        updateZone(id, data);
      }, 300),
    [updateZone],
  );

  // Cancel pending debounce on unmount
  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);
  if (!selectedZone) {
    return (
      <aside
        className={`
          w-full md:w-80 
          border border-base-300 rounded-box 
          bg-base-200/50 backdrop-blur-xl 
          flex flex-col 
          ${isMobile ? "h-auto max-h-[40vh]" : "h-full"} 
          overflow-hidden shadow-xl
        `}
      >
        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8 text-center space-y-3 md:space-y-4">
          <Settings2 className="w-10 h-10 md:w-12 md:h-12 text-base-content/20" />
          <div className="space-y-1">
            <h4 className="text-base-content font-bold text-sm md:text-base">
              {t("editor.properties.empty_title")}
            </h4>
            <p className="text-xs md:text-sm text-base-content/60">
              {t("editor.properties.empty_desc")}
            </p>
          </div>
        </div>
      </aside>
    );
  }

  const handleChange = (field: keyof typeof localState, value: string) => {
    // 1. Immediate UI update for responsiveness
    setLocalState((prev) => ({ ...prev, [field]: value }));

    // 2. Debounced background sync with store
    if (selectedZoneId) {
      debouncedUpdate(selectedZoneId, { [field]: value });
    }
  };

  const handleDelete = () => {
    if (selectedZoneId) {
      removeZone(selectedZoneId);
      onClose?.();
    }
  };
  return (
    <aside
      className={`
        w-full md:w-80 
        rounded-box border border-base-300 
        bg-base-200 
        flex flex-col 
        ${isMobile ? "h-auto max-h-[60vh]" : "h-full"} 
        overflow-hidden shadow-2xl
        animate-in 
        ${isMobile ? "slide-in-from-bottom-10" : "slide-in-from-right-10"}
        duration-300
      `}
    >
      {/* Header */}
      <div className="p-3 md:p-4 border-b border-base-300 flex items-center justify-between bg-base-300/30">
        <div className="flex items-center gap-2">
          <Layout className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
          <h3 className="font-bold text-xs md:text-sm text-base-content uppercase">
            {t("editor.properties.title")}
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-error hover:bg-error/10 h-7 w-7 md:h-8 md:w-8"
            onClick={handleDelete}
          >
            <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Button>

          {isMobile && onClose && (
            <Button
              variant="ghost"
              size="icon"
              className="text-base-content/60 hover:bg-base-300 h-7 w-7 md:hidden"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5 space-y-4 md:space-y-6 overflow-y-auto flex-1">
        <div className="space-y-2">
          <Label className="text-[10px] md:text-xs font-semibold text-base-content/70 uppercase tracking-wider">
            {t("editor.properties.label")}
          </Label>
          <Input
            value={localState.label}
            onChange={(e) => handleChange("label", e.target.value)}
            placeholder={t("editor.properties.label_placeholder")}
            className="bg-base-100 border-base-300 focus:border-primary text-base-content rounded-btn h-9 md:h-10 text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] md:text-xs font-semibold text-base-content/70 uppercase tracking-wider">
            {t("editor.properties.default_value")}
          </Label>
          <Input
            value={localState.defaultValue}
            onChange={(e) => handleChange("defaultValue", e.target.value)}
            className="bg-base-100 border-base-300 focus:border-primary text-base-content rounded-btn h-9 md:h-10 text-sm"
          />

          <div className="p-2.5 md:p-3 rounded-btn bg-info/10 border border-info/20 flex gap-2 md:gap-3">
            <Info className="w-3.5 h-3.5 md:w-4 md:h-4 text-info shrink-0 mt-0.5" />
            <p className="text-[10px] md:text-xs text-base-content/70 leading-relaxed">
              {t("editor.properties.help")}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
