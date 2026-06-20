import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { format } from "date-fns-jalali";
import { useFormStore } from "@/application/store/form.store";
import { useLanguageStore } from "@/application/store/language.store";
import { useTemplateQuery } from "./useTemplateMutations";
import type { Zone } from "../../core/types/domain";

export const useFormFiller = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguageStore();
  const { data: template, isLoading, error } = useTemplateQuery(id);

  const currentTemplate = useFormStore((s) => s.currentTemplate);
  const currentDocument = useFormStore((s) => s.currentDocument);
  const selectedZoneId = useFormStore((s) => s.selectedZoneId);
  const setTemplate = useFormStore((s) => s.setTemplate);
  const createDocument = useFormStore((s) => s.createDocument);
  const updateDocumentValues = useFormStore((s) => s.updateDocumentValues);
  const updateZoneCoordinates = useFormStore((s) => s.updateZoneCoordinates);
  const selectZone = useFormStore((s) => s.selectZone);
  const resetStore = useFormStore((s) => s.reset);

  const { register, control, setValue, reset: resetForm } = useForm();
  const formValues = useWatch({ control });

  useEffect(() => {
    if (template) {
      setTemplate(template);
    }
    return () => resetStore();
  }, [template, setTemplate, resetStore]);

  useEffect(() => {
    if (currentTemplate && !currentDocument) {
      const initialValues: Record<string, string> = {};
      currentTemplate.zones.forEach((zone) => {
        let val = zone.defaultValue || "";
        if (val.includes("{today}")) {
          val = val.replace("{today}", format(new Date(), "yyyy/MM/dd"));
        }
        initialValues[zone.id] = val;
      });
      const defaultDir: "rtl" | "ltr" = language === "fa" ? "rtl" : "ltr";
      createDocument(currentTemplate.id, initialValues, defaultDir);
      resetForm(initialValues);
    }
  }, [currentTemplate, currentDocument, createDocument, resetForm, language]);

  useEffect(() => {
    if (
      currentTemplate?.zones &&
      currentTemplate.zones.length > 0 &&
      !selectedZoneId
    ) {
      selectZone(currentTemplate.zones[0].id);
    }
  }, [currentTemplate, selectedZoneId, selectZone]);

  useEffect(() => {
    if (formValues) {
      updateDocumentValues(formValues as Record<string, string>);
    }
  }, [formValues, updateDocumentValues]);

  const handleCanvasValueChange = useCallback(
    (id: string, value: string) => {
      setValue(id, value, { shouldDirty: true, shouldTouch: true });
    },
    [setValue],
  );

  const handleZoneUpdate = useCallback(
    (id: string, updates: Partial<Zone>) => {
      updateZoneCoordinates(id, updates as { x: number; y: number; width: number; height: number });
    },
    [updateZoneCoordinates],
  );

  return {
    id,
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
    handleZoneUpdate,
  };
};
