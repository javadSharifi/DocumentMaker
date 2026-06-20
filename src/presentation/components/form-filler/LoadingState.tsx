import React from "react";
import { Loader2, AlertCircle } from "lucide-react";

interface LoadingStateProps {
  isLoading?: boolean;
  error?: string | null;
  loadingText?: string;
  errorPrefix?: string;
  notFoundText?: string;
  showNotFound?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  isLoading,
  error,
  loadingText = "Loading...",
  errorPrefix = "Error: ",
  notFoundText = "Not found",
  showNotFound = false,
}) => {
  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-base-100 gap-3 md:gap-4">
        <Loader2 className="w-10 h-10 md:w-12 md:h-12 animate-spin text-primary" />
        <p className="text-base-content/40 font-bold text-sm md:text-base">
          {loadingText}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-base-100 gap-3 md:gap-4 px-4">
        <AlertCircle className="w-10 h-10 md:w-12 md:h-12 text-error" />
        <p className="text-error font-black text-sm md:text-base text-center">
          {errorPrefix}
          {error}
        </p>
      </div>
    );
  }

  if (showNotFound) {
    return (
      <div className="h-screen flex items-center justify-center bg-base-100 text-base-content/60 font-bold text-sm md:text-base px-4 text-center">
        {notFoundText}
      </div>
    );
  }

  return null;
};
