import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import type { Template } from "@/core/types/domain";
import { templateRepository } from "@/infrastructure/repositories/dexie.repository";

export const useDashboard = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    try {
      const data = await templateRepository.getAll();
      setTemplates(data);
    } catch (e) {
      console.error("Fetch failed", e);
      toast.error(t("dashboard.fetchFailed"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const filteredTemplates = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return templates;
    return templates.filter((tpl) => tpl.name.toLowerCase().includes(query));
  }, [searchQuery, templates]);

  return {
    templates,
    loading,
    searchQuery,
    setSearchQuery,
    filteredTemplates,
    fetchTemplates,
  };
};
