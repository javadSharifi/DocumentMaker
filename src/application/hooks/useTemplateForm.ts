import { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useEditorStore } from "../store/editor.store";
import { useImageProcessor } from "./useImageProcessor";

export function useTemplateForm(id: string | undefined) {
  const { t } = useTranslation();
  const loadImage = useEditorStore((s) => s.loadImage);
  const updateTemplateName = useEditorStore((s) => s.updateTemplateName);
  const { processImage, isProcessing } = useImageProcessor();

  const [prevId, setPrevId] = useState(id);
  const [isModalOpen, setIsModalOpen] = useState(!id);

  if (prevId !== id) {
    setPrevId(id);
    setIsModalOpen(!id);
  }

  const handleUploadAction = async (file: File, name: string) => {
    try {
      updateTemplateName(name);
      const base64 = await processImage(file);

      await new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadImage(file, base64, img.width, img.height);
          setIsModalOpen(false);
          resolve();
        };
        img.onerror = () => reject(new Error("Image failed to load"));
        img.src = base64;
      });
    } catch (err) {
      console.error(err);
      toast.error(t("editor.properties.load_error"));
    }
  };

  return { isModalOpen, setIsModalOpen, isProcessing, handleUploadAction };
}
