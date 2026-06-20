import { useState, useCallback, useRef } from "react";
import { templateRepository } from "@/infrastructure/repositories/dexie.repository";
import type { Template } from "@/core/types/domain";
import { IOService } from "@/application/services/io.service";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export const useTemplateOperations = (onTemplatesChange: () => void) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const handleDelete = useCallback(async () => {
    if (deleteId) {
      try {
        await templateRepository.delete(deleteId);
        await onTemplatesChange();
        setDeleteId(null);
        toast.error(t("dashboard.templateDeleted"));
      } catch (e) {
        console.error("Delete failed", e);
        toast.error(t("dashboard.deleteFailed"));
      }
    }
  }, [deleteId, onTemplatesChange, t]);

  const handleImport = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const template = JSON.parse(await file.text());
        if (!template.id || !template.zones) {
          throw new Error("Invalid template structure");
        }

        await templateRepository.save(template);
        await onTemplatesChange();
        toast.success(t("templateImported"));
      } catch (e) {
        console.error("Import failed", e);
        toast.error(t("importFailed"));
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [onTemplatesChange, t],
  );

  const handleExport = useCallback(
    (template: Template) => {
      try {
        IOService.exportTemplateJSON(template);
        toast.success(t("exportSuccess"));
      } catch (e) {
        console.error("Export failed", e);
        toast.error(t("exportFailed"));
      }
    },
    [t],
  );

  const triggerImport = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return {
    deleteId,
    setDeleteId,
    fileInputRef,
    handleDelete,
    handleImport,
    handleExport,
    triggerImport,
  };
};
