import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import { Canvas, StaticCanvas } from "fabric";
import type { Template } from "../../core/types/domain";

export const IOService = {
  exportTemplateJSON: (template: Template) => {
    const json = JSON.stringify(template, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(blob, `${template.name.replace(/\s+/g, "_")}_template.json`);
  },

  importTemplateJSON: (file: File): Promise<Template> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = e.target?.result as string;
          const template = JSON.parse(json) as Template;
          if (!template.id || !template.zones) {
            reject(new Error("Invalid template format"));
            return;
          }
          resolve(template);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  },

  exportCanvasToPDF: (
    canvas: Canvas | StaticCanvas,
    filename: string,
  ) => {
    const multiplier = 2;
    const dataUrl = canvas.toDataURL({
      format: "jpeg",
      quality: 0.9,
      multiplier: multiplier,
    });

    const pdf = new jsPDF({
      orientation:
        canvas.width > canvas.height ? "landscape" : "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${filename}.pdf`);
  },

  exportCanvasToImage: (
    canvas: Canvas | StaticCanvas,
    filename: string,
  ) => {
    const dataUrl = canvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 2,
    });
    saveAs(dataUrl, `${filename}.png`);
  },
};
