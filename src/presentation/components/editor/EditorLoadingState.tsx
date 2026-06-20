import React from "react";
import { Loader2 } from "lucide-react";

export const EditorLoadingState: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-base-100">
      <Loader2 className="w-10 h-10 md:w-12 md:h-12 animate-spin text-primary" />
    </div>
  );
};
