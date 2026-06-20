import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "../../lib/utils";
import { useTranslation } from "react-i18next";

interface UploadModalProps {
  isOpen: boolean;
  onUpload: (file: File, name: string) => void;
  isProcessing: boolean;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onUpload,
  isProcessing,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [templateName, setTemplateName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => navigate("/");

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleSubmit = () => {
    if (selectedFile && templateName.trim()) {
      onUpload(selectedFile, templateName.trim());
    }
  };

  const isSubmitDisabled =
    !selectedFile || !templateName.trim() || isProcessing;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        className="sm:max-w-[550px] p-0 overflow-hidden border border-base-300 bg-base-100 backdrop-blur-2xl shadow-2xl rounded-box"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="p-8 pb-4">
          <DialogTitle className="text-2xl font-bold text-base-content">
            {t("upload_modal.title")}
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 pt-0 space-y-8">
          <div className="space-y-3">
            <Label
              htmlFor="templateName"
              className="text-sm font-medium text-base-content/70"
            >
              {t("upload_modal.name_label")}{" "}
              <span className="text-error">*</span>
            </Label>
            <Input
              id="templateName"
              placeholder={t("upload_modal.name_placeholder")}
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="h-12 bg-base-200 border-base-300 focus:border-primary text-base-content rounded-btn transition-all"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-base-content/70">
              {t("upload_modal.upload_label")}{" "}
              <span className="text-error">*</span>
            </Label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "relative border-2 border-dashed rounded-box p-10 transition-all duration-500 cursor-pointer flex flex-col items-center justify-center gap-4 overflow-hidden group",
                isDragging
                  ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                  : "border-base-300 bg-base-200/50 hover:border-primary/40 hover:bg-base-200",
                selectedFile && "border-success/50 bg-success/5",
              )}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/30 transition-all" />

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />

              <div
                className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 z-10",
                  selectedFile
                    ? "bg-success/20 text-success shadow-lg shadow-success/20"
                    : "bg-primary/20 text-primary shadow-lg shadow-primary/20",
                )}
              >
                <Upload className="w-8 h-8" />
              </div>

              <div className="text-center z-10">
                <p className="font-semibold text-base-content">
                  {selectedFile
                    ? selectedFile.name
                    : t("upload_modal.drop_here")}
                </p>
                {!selectedFile && (
                  <p className="text-xs text-base-content/50 mt-2">
                    {t("upload_modal.click_to_select")}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className="w-full h-14 text-lg font-bold bg-primary text-primary-content hover:bg-primary/90 shadow-xl rounded-btn transition-all active:scale-[0.98] disabled:opacity-30"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" />
                {t("upload_modal.processing")}
              </div>
            ) : (
              t("upload_modal.submit")
            )}
          </Button>
        </div>

        {/* لودینگ شیشه‌ای */}
        {isProcessing && (
          <div className="absolute inset-0 bg-base-100/60 backdrop-blur-md flex flex-col items-center justify-center z-50 transition-all">
            <Loader2 className="w-14 h-14 text-primary animate-spin" />
            <p className="mt-6 font-bold text-base-content text-lg animate-pulse">
              {t("upload_modal.analyzing")}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
