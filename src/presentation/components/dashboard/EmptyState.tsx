import React from "react";
import { Link } from "react-router-dom";
import { Inbox, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface EmptyStateProps {
  isLoading: boolean;
  hasTemplates: boolean;
  loadingText: string;
  noTemplatesText: string;
  noResultsText: string;
  createFirstText: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  isLoading,
  hasTemplates,
  loadingText,
  noTemplatesText,
  noResultsText,
  createFirstText,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 md:py-32 gap-3 md:gap-4">
        <Loader2 className="w-8 h-8 md:w-10 md:h-10 animate-spin text-primary" />
        <p className="text-base-content/40 font-medium text-sm md:text-base">
          {loadingText}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 md:py-32 border-2 border-dashed border-base-300 rounded-box bg-base-200/30 gap-4 md:gap-6 px-4">
      <Inbox className="w-12 h-12 md:w-16 md:h-16 text-base-content/10" />
      <p className="text-base-content/50 font-medium text-sm md:text-base text-center">
        {hasTemplates ? noResultsText : noTemplatesText}
      </p>
      {!hasTemplates && (
        <Link to="/editor/new">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/5 bg-color-primary-content rounded-btn px-6 md:px-10 text-sm md:text-base"
          >
            {createFirstText}
          </Button>
        </Link>
      )}
    </div>
  );
};
