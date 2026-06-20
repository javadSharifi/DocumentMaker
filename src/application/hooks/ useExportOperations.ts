import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IOService } from "@/application/services/io.service";
import type { Template } from "@/core/types/domain";
import toast from "react-hot-toast";
import type { FabricCanvasRef } from "@/presentation/components/canvas/FabricCanvas";

export const useExportOperations = (currentTemplate: Template | null) => {
  const { t } = useTranslation();
  const canvasRef = useRef<FabricCanvasRef>(null);

  const prepareCanvas = useCallback(() => {
    const canvas = canvasRef.current?.getCanvas();
    if (!canvas) return null;

    canvas.discardActiveObject();
    canvas.requestRenderAll();
    return canvas;
  }, []);

  const handlePrint = useCallback(() => {
    const canvas = prepareCanvas();
    if (!canvas || !currentTemplate) return;

    const dataUrl = canvas.toDataURL({ format: "png", multiplier: 2 });
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      toast.error(t("form_filler.print_blocked"));
      return;
    }

    printWindow.document.write(
      `<html>
        <head>
          <title>${currentTemplate.name}</title>
          <style>
            @page { size: auto; margin: 0; }
            body { 
              margin: 0; 
              display: flex; 
              justify-content: center; 
              background: #000; 
            }
            img { 
              max-width: 100vw; 
              max-height: 100vh; 
              object-fit: contain; 
            }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          <img src="${dataUrl}" />
        </body>
      </html>`,
    );
    printWindow.document.close();
  }, [prepareCanvas, currentTemplate, t]);

  const handleExportPdf = useCallback(() => {
    const canvas = prepareCanvas();
    if (!canvas || !currentTemplate) return;

    try {
      IOService.exportCanvasToPDF(canvas, `${currentTemplate.name}_filled`);
      toast.success(t("exportSuccess"));
    } catch (error) {
      console.error("PDF export failed:", error);
      toast.error(t("form_filler.export_failed"));
    }
  }, [prepareCanvas, currentTemplate, t]);

  const handleExportImage = useCallback(() => {
    const canvas = prepareCanvas();
    if (!canvas || !currentTemplate) return;

    try {
      IOService.exportCanvasToImage(canvas, `${currentTemplate.name}_filled`);
      toast.success(t("form_filler.image_success"));
    } catch (error) {
      console.error("Image export failed:", error);
      toast.error(t("form_filler.export_failed"));
    }
  }, [prepareCanvas, currentTemplate, t]);

  return {
    canvasRef,
    handlePrint,
    handleExportPdf,
    handleExportImage,
  };
};
