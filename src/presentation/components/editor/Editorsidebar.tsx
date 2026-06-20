import React, { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { PropertiesPanel } from "./PropertiesPanel";
import { Button } from "../ui/button";
import { Settings2 } from "lucide-react";
import { useEditorStore } from "../../../application/store/editor.store";
import { useMediaQuery } from "@/application/hooks/useMediaQuery";
export const EditorSidebar: React.FC = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const selectedZoneId = useEditorStore((s) => s.selectedZoneId);

  // Local UI state for mobile overlay
  const [isMobileManualClose, setIsMobileManualClose] = useState(false);

  // Derive visibility: Open if a zone is selected, unless the user manually closed it.
  // This removes the need for the problematic useEffect.
  const shouldShowMobilePanel =
    !isDesktop && !!selectedZoneId && !isMobileManualClose;

  const handleClose = useCallback(() => {
    setIsMobileManualClose(true);
  }, []);

  // Desktop Rendering: Static placement
  if (isDesktop) {
    return (
      <aside className="hidden md:block w-80 border-l bg-background">
        <PropertiesPanel key={selectedZoneId} />
      </aside>
    );
  }

  // Mobile Rendering: Portal-based Overlay
  return (
    <>
      {selectedZoneId && !shouldShowMobilePanel && (
        <Button
          onClick={() => setIsMobileManualClose(false)}
          className="fixed bottom-4 right-4 z-40 h-12 w-12 rounded-full shadow-xl md:hidden"
          aria-label="Open Properties"
        >
          <Settings2 className="h-5 w-5" />
        </Button>
      )}

      {shouldShowMobilePanel &&
        createPortal(
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
              onClick={handleClose}
            />
            <div className="absolute bottom-0 left-0 right-0 animate-in slide-in-from-bottom duration-300">
              <PropertiesPanel isMobile onClose={handleClose} />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
