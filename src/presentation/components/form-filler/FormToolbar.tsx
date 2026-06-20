import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Printer, Image as ImageIcon } from "lucide-react";
import { Button } from "../ui/button";

interface FormToolbarProps {
  templateName: string;
  onExportImage: () => void;
  onExportPdf: () => void;
  onPrint: () => void;
  exportImageLabel: string;
  exportPdfLabel: string;
  printLabel: string;
}

export const FormToolbar: React.FC<FormToolbarProps> = ({
  templateName,
  onExportImage,
  onExportPdf,
  onPrint,
  exportImageLabel,
  exportPdfLabel,
  printLabel,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between border border-base-300 bg-base-100/80 backdrop-blur-xl p-3 md:p-4 rounded-box shadow-xl">
      <div className="flex items-center gap-2 md:gap-4 min-w-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="hover:bg-base-200 text-base-content/60 flex-shrink-0 h-8 w-8 md:h-10 md:w-10"
        >
          <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
        <div className="h-6 md:h-8 w-[1px] bg-base-300 mx-1" />
        <h2 className="text-base md:text-xl font-black text-base-content tracking-tight truncate">
          {templateName}
        </h2>
      </div>

      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
        <Button
          variant="outline"
          onClick={onExportImage}
          className="border-base-300 bg-base-100 text-base-content hover:bg-base-200 rounded-btn h-8 md:h-10 px-2 md:px-4"
        >
          <ImageIcon className="h-3.5 w-3.5 md:h-4 md:w-4 md:mr-2 text-primary" />
          <span className="hidden md:inline text-sm">{exportImageLabel}</span>
        </Button>
        <Button
          variant="outline"
          onClick={onExportPdf}
          className="border-base-300 bg-base-100 text-base-content hover:bg-base-200 rounded-btn h-8 md:h-10 px-2 md:px-4"
        >
          <Download className="h-3.5 w-3.5 md:h-4 md:w-4 md:mr-2 text-secondary" />
          <span className="hidden md:inline text-sm">{exportPdfLabel}</span>
        </Button>
        <Button
          onClick={onPrint}
          className="bg-primary text-primary-content hover:bg-primary/90 rounded-btn shadow-lg shadow-primary/20 font-bold h-8 md:h-10 px-3 md:px-4 text-sm"
        >
          <Printer className="h-3.5 w-3.5 md:h-4 md:w-4 md:mr-2" />
          <span className="hidden sm:inline">{printLabel}</span>
        </Button>
      </div>
    </div>
  );
};
