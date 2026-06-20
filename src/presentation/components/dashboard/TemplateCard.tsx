import React from "react";
import { Link } from "react-router-dom";
import { FileText, Edit, Download, Trash2, MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import type { Template } from "@/core/types/domain";

interface TemplateCardProps {
  template: Template;
  onExport: (template: Template) => void;
  onDelete: (id: string) => void;
  untitledText: string;
  editText: string;
  fillText: string;
  exportText: string;
  deleteText: string;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onExport,
  onDelete,
  untitledText,
  editText,
  fillText,
  exportText,
  deleteText,
}) => {
  return (
    <div className="group rounded-box border border-base-300 bg-base-100 shadow-md transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col overflow-hidden">
      {/* Image Preview */}
      <div className="aspect-[16/10] w-full overflow-hidden bg-base-300 relative">
        {template.imageData ? (
          <img
            src={template.imageData}
            alt={template.name}
            className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-base-content/20">
            <FileText className="h-10 w-10 md:h-12 md:w-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent opacity-60" />
      </div>

      {/* Card Content */}
      <div className="p-4 md:p-6 flex flex-col gap-3 md:gap-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-base-content truncate group-hover:text-primary transition-colors text-sm md:text-base">
              {template.name || untitledText}
            </h3>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-tighter text-base-content/30 mt-1">
              {new Date(template.updatedAt).toLocaleDateString("fa-IR")}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 md:h-8 md:w-8 text-base-content/40 hover:bg-base-200 flex-shrink-0"
              >
                <MoreVertical className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-base-100 border-base-300 text-base-content shadow-xl rounded-btn"
            >
              <DropdownMenuItem
                onClick={() => onExport(template)}
                className="cursor-pointer gap-2 focus:bg-primary/10 focus:text-primary text-sm"
              >
                <Download className="h-4 w-4 text-primary" />
                {exportText}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(template.id)}
                className="text-error focus:bg-error/10 focus:text-error cursor-pointer gap-2 text-sm"
              >
                <Trash2 className="h-4 w-4" />
                {deleteText}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link to={`/editor/${template.id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-base-300 bg-base-200 hover:bg-base-300 text-base-content rounded-btn font-bold text-xs"
            >
              <Edit className="mr-1.5 md:mr-2 h-3 w-3 md:h-3.5 md:w-3.5" />
              <span className="hidden sm:inline">{editText}</span>
              <span className="sm:hidden">ویرایش</span>
            </Button>
          </Link>
          <Link to={`/fill/${template.id}`} className="flex-1">
            <Button
              size="sm"
              className="w-full bg-primary text-primary-content hover:bg-primary/90 rounded-btn font-bold text-xs shadow-md shadow-primary/10"
            >
              <FileText className="mr-1.5 md:mr-2 h-3 w-3 md:h-3.5 md:w-3.5" />
              <span className="hidden sm:inline">{fillText}</span>
              <span className="sm:hidden">پر کردن</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
