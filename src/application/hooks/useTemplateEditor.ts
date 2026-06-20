import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useEditorStore } from "../store/editor.store";
import { useTemplateQuery } from "./useTemplateMutations";
import { useTemplateForm } from "./useTemplateForm";

export const useTemplateEditor = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const setTemplate = useEditorStore((s) => s.setTemplate);
  const initializeTemplate = useEditorStore((s) => s.initializeTemplate);
  const currentTemplate = useEditorStore((s) => s.currentTemplate);

  const { data: template, isLoading: queryLoading, error: loadError } = useTemplateQuery(id);
  const { isModalOpen, setIsModalOpen, isProcessing, handleUploadAction } = useTemplateForm(id);

  // Sync React Query result into Zustand when loading an existing template
  useEffect(() => {
    if (template) {
      setTemplate(template);
    }
  }, [template, setTemplate]);

  // Wipe store and create fresh template when entering creation route
  useEffect(() => {
    if (!id) {
      initializeTemplate();
    }
  }, [id, initializeTemplate]);

  useEffect(() => {
    if (loadError) {
      console.error("Failed to load template:", loadError);
      toast.error(t("editor.load_error") || "Failed to load template");
    }
  }, [loadError, t]);

  return {
    isModalOpen,
    setIsModalOpen,
    isLoading: queryLoading || (!currentTemplate && !!id),
    isProcessing,
    handleUploadAction,
  };
};
