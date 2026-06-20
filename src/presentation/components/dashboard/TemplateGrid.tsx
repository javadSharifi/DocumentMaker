import React from "react";
import type { Template } from "../../../core/types/domain";
import { TemplateCard } from "./TemplateCard";

interface TemplateGridProps {
  templates: Template[];
  onExport: (template: Template) => void;
  onDelete: (id: string) => void;
  translations: {
    untitled: string;
    edit: string;
    fill: string;
    export: string;
    delete: string;
  };
}

export const TemplateGrid: React.FC<TemplateGridProps> = ({
  templates,
  onExport,
  onDelete,
  translations,
}) => {
  return (
    <div className="grid gap-4 md:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-in fade-in duration-500 px-2 sm:px-0">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          onExport={onExport}
          onDelete={onDelete}
          untitledText={translations.untitled}
          editText={translations.edit}
          fillText={translations.fill}
          exportText={translations.export}
          deleteText={translations.delete}
        />
      ))}
    </div>
  );
};
