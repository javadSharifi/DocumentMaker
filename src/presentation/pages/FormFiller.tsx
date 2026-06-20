import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import { Layout } from "../layouts/Layout";
import { FormStylePanel } from "../components/form/FormStylePanel";
import { useFormFiller } from "../../application/hooks/useFormFiller";
import { LoadingState } from "../components/form-filler/LoadingState";
import { FormToolbar } from "../components/form-filler/FormToolbar";
import { FormFieldsSidebar } from "../components/form-filler/FormFieldsSidebar";
import { CanvasContainer } from "../components/form-filler/CanvasContainer";
import { Button } from "../components/ui/button";
import { LayoutGrid, Palette } from "lucide-react";
import { cn } from "../lib/utils";
import { useExportOperations } from "@/application/hooks/ useExportOperations";

export const FormFiller: React.FC = () => {
  const { t } = useTranslation();
  const [mobileTab, setMobileTab] = useState<"fields" | "style">("fields");

  const {
    currentTemplate,
    currentDocument,
    selectedZoneId,
    isLoading,
    error,
    register,
    control,
    formValues,
    selectZone,
    handleCanvasValueChange,
  } = useFormFiller();

  const { canvasRef, handlePrint, handleExportPdf, handleExportImage } =
    useExportOperations(currentTemplate);

  if (isLoading || error || !currentTemplate) {
    return (
      <LoadingState
        isLoading={isLoading}
        error={error?.message || null}
        showNotFound={!currentTemplate && !isLoading && !error}
        loadingText={t("form_filler.loading")}
        errorPrefix={t("form_filler.error", { message: "" }).replace(
          "{message}",
          "",
        )}
        notFoundText={t("form_filler.not_found")}
      />
    );
  }

  return (
    <Layout>
      <div className="h-[calc(100vh-100px)] md:h-[calc(100vh-140px)] flex flex-col gap-4 md:gap-6">
        {/* Toolbar */}
        <FormToolbar
          templateName={currentTemplate.name}
          onExportImage={handleExportImage}
          onExportPdf={handleExportPdf}
          onPrint={handlePrint}
          exportImageLabel={t("form_filler.export_image")}
          exportPdfLabel={t("form_filler.export_pdf")}
          printLabel={t("form_filler.print")}
        />

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden gap-4 md:gap-6">
          {/* Fields Sidebar - Desktop Only */}
          <div className="hidden md:flex md:w-80 lg:w-96 md:flex-shrink-0">
            <FormFieldsSidebar
              zones={currentTemplate.zones}
              register={register}
              selectedZoneId={selectedZoneId}
              styles={currentDocument?.styles}
              onZoneSelect={selectZone}
              title={t("form_filler.fields_title")}
            />
          </div>

          {/* Canvas + Mobile Bottom Panel Container */}
          <div className="flex-1 min-w-0 min-h-0 flex flex-col gap-4">
            {/* Canvas Container */}
            <div className="flex-1 min-h-0">
              <CanvasContainer
                ref={canvasRef}
                imageUrl={currentTemplate.imageData}
                width={currentTemplate.width}
                height={currentTemplate.height}
                zones={currentTemplate.zones}
                values={(formValues as Record<string, string>) || {}}
                styles={currentDocument?.styles}
                selectedZoneId={selectedZoneId}
                onZoneSelect={selectZone}
                onValueChange={handleCanvasValueChange}
              />
            </div>

            {/* Mobile Bottom Panel - Only rendered on mobile */}
            <div className="md:hidden flex-shrink-0 min-h-[250px] max-h-[40vh] flex flex-col bg-base-100 rounded-t-2xl border border-base-300 shadow-xl overflow-hidden">
              {/* Tab Buttons */}
              <div className="flex-shrink-0 flex gap-2 p-3 border-b border-base-300 bg-base-200">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileTab("fields")}
                  className={cn(
                    "flex-1 gap-2 rounded-btn font-bold transition-all text-xs h-9",
                    mobileTab === "fields"
                      ? "bg-primary text-primary-content shadow-md"
                      : "text-base-content/60 hover:bg-base-300",
                  )}
                >
                  <LayoutGrid className="w-4 h-4" />
                  {t("form_filler.fields")}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileTab("style")}
                  className={cn(
                    "flex-1 gap-2 rounded-btn font-bold transition-all text-xs h-9",
                    mobileTab === "style"
                      ? "bg-primary text-primary-content shadow-md"
                      : "text-base-content/60 hover:bg-base-300",
                  )}
                >
                  <Palette className="w-4 h-4" />
                  {t("form_filler.style")}
                </Button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 min-h-0 overflow-y-auto">
                {mobileTab === "fields" ? (
                  <div className="p-3">
                    <div className="space-y-2">
                      {currentTemplate.zones.map((zone) => {
                        const style = currentDocument?.styles?.[zone.id];
                        const isActive = selectedZoneId === zone.id;

                        return (
                          <div
                            key={zone.id}
                            className={cn(
                              "space-y-1.5 p-2.5 rounded-lg transition-all duration-200 cursor-pointer border",
                              isActive
                                ? "bg-base-200 border-primary shadow-sm"
                                : "bg-base-100 border-base-300 hover:border-primary/30",
                            )}
                            onClick={() => selectZone(zone.id)}
                          >
                            <label
                              className={cn(
                                "text-[10px] font-bold uppercase tracking-wider block transition-colors",
                                isActive
                                  ? "text-primary"
                                  : "text-base-content/50",
                              )}
                            >
                              {zone.label}
                            </label>
                            <Controller
                              name={zone.id}
                              control={control}
                              defaultValue=""
                              render={({ field }) => (
                                <input
                                  {...field}
                                  className="w-full bg-base-200 border border-base-300 text-base-content text-sm p-2 rounded-md focus:border-primary outline-none font-medium"
                                  dir={style?.direction || "ltr"}
                                  placeholder="..."
                                />
                              )}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-3">
                    <FormStylePanel />
                  </div>
                )}
              </div>
            </div>
          </div>

          {selectedZoneId && (
            <div className="hidden lg:flex lg:w-80 lg:flex-shrink-0">
              <FormStylePanel />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
