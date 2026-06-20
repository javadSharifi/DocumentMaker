import React from "react";
import { FabricCanvas } from "../../components/canvas/FabricCanvas";
import { useEditorStore } from "../../../application/store/editor.store";

export const EditorCanvas: React.FC = () => {
  const currentTemplate = useEditorStore((s) => s.currentTemplate);
  const selectedZoneId = useEditorStore((s) => s.selectedZoneId);
  const addZone = useEditorStore((s) => s.addZone);
  const updateZone = useEditorStore((s) => s.updateZone);
  const selectZone = useEditorStore((s) => s.selectZone);

  return (
    <div className="flex-1 bg-base-200/30 rounded-2xl md:rounded-box border border-base-300 overflow-hidden relative flex items-center justify-center shadow-inner group">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/5 blur-[120px] pointer-events-none" />

      {currentTemplate?.imageData ? (
        <FabricCanvas
          imageUrl={currentTemplate.imageData}
          width={currentTemplate.width}
          height={currentTemplate.height}
          zones={currentTemplate.zones}
          mode="edit"
          selectedZoneId={selectedZoneId}
          onZoneAdd={addZone}
          onZoneUpdate={updateZone}
          onZoneSelect={selectZone}
        />
      ) : (
        <p className="text-base-content/40 animate-pulse font-bold text-sm md:text-base text-center px-4">
          Upload an image to start
        </p>
      )}
    </div>
  );
};
