import React from "react";
import { Layout } from "../layouts/Layout";
import { ConfirmDialog } from "../components/ui/confirm-dialog";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { EmptyState } from "../components/dashboard/EmptyState";
import { TemplateGrid } from "../components/dashboard/TemplateGrid";
import { useTranslation } from "react-i18next";
import { useDashboard } from "@/application/hooks/useDashboard";
import { useTemplateOperations } from "@/application/hooks/useTemplateOperations";

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  const {
    templates,
    loading,
    searchQuery,
    setSearchQuery,
    filteredTemplates,
    fetchTemplates,
  } = useDashboard();

  const {
    deleteId,
    setDeleteId,
    fileInputRef,
    handleDelete,
    handleImport,
    handleExport,
    triggerImport,
  } = useTemplateOperations(fetchTemplates);

  const shouldShowEmptyState = loading || filteredTemplates.length === 0;

  return (
    <Layout>
      <div className="space-y-6 md:space-y-10 relative">
        <DashboardHeader
          title={t("dashboard.title")}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          onImportClick={triggerImport}
          searchPlaceholder={t("dashboard.search_placeholder")}
          importLabel={t("dashboard.import")}
          createLabel={t("dashboard.create")}
        />

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".json"
          onChange={handleImport}
        />

        {shouldShowEmptyState ? (
          <EmptyState
            isLoading={loading}
            hasTemplates={templates.length > 0}
            loadingText={t("dashboard.processing")}
            noTemplatesText={t("dashboard.no_templates")}
            noResultsText={t("dashboard.no_results")}
            createFirstText={t("dashboard.create_first")}
          />
        ) : (
          <TemplateGrid
            templates={filteredTemplates}
            onExport={handleExport}
            onDelete={setDeleteId}
            translations={{
              untitled: t("dashboard.untitled"),
              edit: t("dashboard.edit"),
              fill: t("dashboard.fill"),
              export: t("dashboard.export_json"),
              delete: t("dashboard.delete_title"),
            }}
          />
        )}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title={t("dashboard.delete_title")}
        description={t("dashboard.delete_confirm")}
        onConfirm={handleDelete}
        confirmText={t("dashboard.delete_button")}
        cancelText={t("dashboard.cancel")}
        variant="destructive"
      />
    </Layout>
  );
};
