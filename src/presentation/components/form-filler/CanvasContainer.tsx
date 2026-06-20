import { forwardRef } from "react";
import {
  FabricCanvas,
  type FabricCanvasRef,
} from "../../components/canvas/FabricCanvas";
import type { Zone, ZoneStyle } from "../../../core/types/domain";

interface CanvasContainerProps {
  imageUrl: string;
  width: number;
  height: number;
  zones: Zone[];
  values: Record<string, string>;
  styles?: Record<string, ZoneStyle>;
  selectedZoneId: string | null;
  onZoneSelect: (id: string | null) => void;
  onValueChange: (id: string, value: string) => void;
}

export const CanvasContainer = forwardRef<
  FabricCanvasRef,
  CanvasContainerProps
>(
  (
    {
      imageUrl,
      width,
      height,
      zones,
      values,
      styles,
      selectedZoneId,
      onZoneSelect,
      onValueChange,
    },
    ref,
  ) => {
    return (
      <div className="w-full h-full bg-base-300/20 backdrop-blur-sm rounded-2xl md:rounded-[2.5rem] border border-base-300 overflow-hidden relative flex items-center justify-center shadow-inner">
        {/* Decorative background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/5 blur-[120px] pointer-events-none" />

        <FabricCanvas
          ref={ref}
          imageUrl={imageUrl}
          width={width}
          height={height}
          zones={zones}
          mode="fill"
          values={values}
          styles={styles}
          selectedZoneId={selectedZoneId}
          onZoneSelect={onZoneSelect}
          onValueChange={onValueChange}
        />
      </div>
    );
  },
);

CanvasContainer.displayName = "CanvasContainer";
