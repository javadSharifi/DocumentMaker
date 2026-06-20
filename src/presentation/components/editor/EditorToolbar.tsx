import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ArrowLeft, Save, Upload, Loader2, Edit3, Github } from "lucide-react";
import { useEditorStore } from "../../../application/store/editor.store";
import { useSaveTemplateMutation } from "../../../application/hooks/useTemplateMutations";

interface EditorToolbarProps {
  onUploadClick: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({ onUploadClick }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentTemplate = useEditorStore((s) => s.currentTemplate);
  const updateTemplateName = useEditorStore((s) => s.updateTemplateName);
  const saveMutation = useSaveTemplateMutation();

  const hasImage = !!currentTemplate?.imageData;

  const handleSave = async () => {
    if (!currentTemplate?.zones || currentTemplate.zones.length === 0) {
      toast.error(t("editor.properties.dont_save_empty"));
      return;
    }
    try {
      await saveMutation.mutateAsync(currentTemplate);
      toast.success(t("editor.save_success"));
      navigate("/");
    } catch (err) {
      console.error("Save failed:", err);
      toast.error(t("editor.save_error"));
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-base-300 bg-base-100/80 backdrop-blur-md px-3 md:px-4 py-2.5 md:py-3 rounded-box shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="h-8 w-8 md:h-9 md:w-9 rounded-xl hover:bg-base-300 text-base-content/70 transition-all active:scale-90 flex-shrink-0"
          >
            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
          </Button>

          <div className="h-5 md:h-6 w-px bg-base-300 mx-0.5 md:mx-1 hidden sm:block" />

          <div className="relative group flex-1 min-w-0">
            <Input
              value={currentTemplate?.name || ""}
              onChange={(e) => updateTemplateName(e.target.value)}
              className="w-full font-black text-sm md:text-lg border-transparent bg-transparent focus-visible:bg-base-200/50 hover:bg-base-200/30 transition-all px-2 md:px-3 py-1 rounded-lg text-base-content"
              placeholder={t("templateName")}
            />
            <Edit3 className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 md:w-3 md:h-3 text-primary/40 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/javadSharifi/DocumentMaker" target="_blank" rel="noopener noreferrer" className="text-base-content/60 hover:text-base-content h-8 w-8 md:h-9 md:w-9">
              <Github className="h-4 w-4 md:h-5 md:w-5" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onUploadClick}
            className="hidden sm:flex border-base-300 bg-base-100 text-base-content hover:bg-base-300 rounded-btn font-bold transition-all h-8 md:h-9 px-3 md:px-4 text-xs md:text-sm"
          >
            <Upload className="mr-1.5 md:mr-2 h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
            <span className="hidden md:inline">{t("uploadImage")}</span>
            <span className="md:hidden">Upload</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={onUploadClick}
            className="sm:hidden border-base-300 bg-base-100 text-base-content hover:bg-base-300 rounded-btn h-8 w-8"
          >
            <Upload className="h-4 w-4 text-primary" />
          </Button>

          <Button
            onClick={handleSave}
            disabled={saveMutation.isPending || !hasImage}
            className="bg-primary text-primary-content hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 rounded-btn px-3 md:px-6 font-black transition-all active:scale-95 disabled:opacity-30 h-8 md:h-9 text-xs md:text-sm"
          >
            {saveMutation.isPending ? (
              <Loader2 className="mr-1.5 md:mr-2 h-3.5 w-3.5 md:h-4 md:w-4 animate-spin" />
            ) : (
              <Save className="mr-1.5 md:mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
            )}
            <span className="hidden sm:inline">
              {saveMutation.isPending ? t("saving") : t("saveTemplate")}
            </span>
            <span className="sm:hidden">{saveMutation.isPending ? "..." : "Save"}</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
