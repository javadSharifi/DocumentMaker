import React from "react";
import { useFormStore } from "../../../application/store/form.store";
import { useTranslation } from "react-i18next";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import * as Slider from "@radix-ui/react-slider";
import { Settings2, Type, Palette, AlignRight, AlignLeft } from "lucide-react";
import { cn } from "../../lib/utils";

export const FormStylePanel: React.FC = () => {
  const currentDocument = useFormStore((s) => s.currentDocument);
  const selectedZoneId = useFormStore((s) => s.selectedZoneId);
  const updateDocumentStyle = useFormStore((s) => s.updateDocumentStyle);
  const { t } = useTranslation();

  if (!currentDocument || !selectedZoneId) {
    return (
      <div className="w-full md:w-80 border md:border-l border-base-300 bg-base-200/50 backdrop-blur-xl text-base-content/40 text-xs md:text-sm flex flex-col items-center justify-center gap-3 md:gap-4 p-6 md:p-8 text-center rounded-box md:rounded-none">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-base-300 flex items-center justify-center border border-base-300">
          <Settings2 className="w-6 h-6 md:w-7 md:h-7 opacity-30" />
        </div>
        <p className="leading-relaxed">{t("form_style.select_zone")}</p>
      </div>
    );
  }

  const style = currentDocument.styles[selectedZoneId];
  if (!style) return null;

  return (
    <div className="w-full md:w-80 border border-base-300 rounded-box bg-base-100 backdrop-blur-2xl p-4 md:p-6 flex flex-col gap-6 md:gap-8 overflow-y-auto max-h-[50vh] md:max-h-full shadow-2xl animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center gap-2 md:gap-3 border-b border-base-300 pb-3 md:pb-4">
        <div className="p-1.5 md:p-2 rounded-lg bg-primary/20 text-primary">
          <Settings2 className="w-4 h-4 md:w-5 md:h-5" />
        </div>
        <h3 className="font-bold text-base md:text-lg text-base-content uppercase tracking-tight">
          {t("form_style.title")}
        </h3>
      </div>

      <div className="space-y-6 md:space-y-8">
        {/* Font Size */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <Label className="text-base-content/60 text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 md:gap-2">
              <Type className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
              {t("form_style.font_size")}
            </Label>
            <span className="text-[10px] md:text-xs font-mono font-bold text-base-content bg-base-300 px-1.5 md:px-2 py-0.5 md:py-1 rounded-md">
              {style.fontSize.toFixed(1)}x
            </span>
          </div>

          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5 group"
            value={[style.fontSize]}
            max={12}
            min={0.5}
            step={0.1}
            onValueChange={(value) =>
              updateDocumentStyle(selectedZoneId, { fontSize: value[0] })
            }
          >
            <Slider.Track className="bg-base-300 relative grow rounded-full h-[5px] md:h-[6px] overflow-hidden">
              <Slider.Range className="absolute bg-primary h-full group-hover:bg-primary/80 transition-colors" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-4 h-4 md:w-5 md:h-5 bg-white border-2 border-primary rounded-full shadow-lg shadow-primary/30 hover:scale-110 transition-transform cursor-grab active:cursor-grabbing focus:outline-none"
              aria-label="Font Size"
            />
          </Slider.Root>
        </div>

        {/* Color Picker */}
        <div className="space-y-3 md:space-y-4">
          <Label className="text-base-content/60 text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 md:gap-2">
            <Palette className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
            {t("form_style.color")}
          </Label>
          <div className="flex gap-2 p-2 rounded-btn bg-base-200 border border-base-300 group focus-within:border-primary/50 transition-all">
            <div className="relative w-10 h-8 md:w-12 md:h-10 shrink-0 overflow-hidden rounded-md border border-base-300 shadow-inner">
              <input
                type="color"
                className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] cursor-pointer bg-transparent"
                value={style.color}
                onChange={(e) =>
                  updateDocumentStyle(selectedZoneId, { color: e.target.value })
                }
              />
            </div>
            <Input
              type="text"
              value={style.color}
              className="bg-transparent border-none focus-visible:ring-0 text-base-content font-mono font-bold uppercase text-xs md:text-sm"
              onChange={(e) =>
                updateDocumentStyle(selectedZoneId, { color: e.target.value })
              }
            />
          </div>
        </div>

        {/* Text Direction */}
        <div className="space-y-3 md:space-y-4">
          <Label className="text-base-content/60 text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 md:gap-2">
            <AlignLeft className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
            {t("form_style.direction")}
          </Label>
          <div className="flex gap-2 p-1 rounded-btn bg-base-200 border border-base-300">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "flex-1 gap-1.5 md:gap-2 rounded-btn font-bold transition-all text-xs md:text-sm h-8 md:h-9",
                style.direction === "ltr"
                  ? "bg-primary text-primary-content shadow-lg"
                  : "text-base-content/50 hover:bg-base-300",
              )}
              onClick={() =>
                updateDocumentStyle(selectedZoneId, { direction: "ltr" })
              }
            >
              <AlignLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden sm:inline">{t("form_style.ltr")}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "flex-1 gap-1.5 md:gap-2 rounded-btn font-bold transition-all text-xs md:text-sm h-8 md:h-9",
                style.direction === "rtl"
                  ? "bg-primary text-primary-content shadow-lg"
                  : "text-base-content/50 hover:bg-base-300",
              )}
              onClick={() =>
                updateDocumentStyle(selectedZoneId, { direction: "rtl" })
              }
            >
              <span className="hidden sm:inline">{t("form_style.rtl")}</span>
              <AlignRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
