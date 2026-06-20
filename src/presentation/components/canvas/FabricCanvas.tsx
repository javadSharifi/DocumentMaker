import {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import {
  Canvas,
  Rect,
  Textbox,
  FabricObject,
  FabricImage,
  type TPointerEventInfo,
  type TPointerEvent,
} from "fabric";
import type { IText } from "fabric";
import type { Zone, ZoneStyle } from "../../../core/types/domain";
import { CoordinateTransformer } from "../../../core/utils/CoordinateTransformer";
import IRANSansRegular from "@/assets/fonts/IRANSansWeb.woff2?url";
import IRANSansBold from "@/assets/fonts/IRANSansWeb_Bold.woff2?url";
import IRANSansMedium from "@/assets/fonts/IRANSansWeb_Medium.woff2?url";
import IRANSansLight from "@/assets/fonts/IRANSansWeb_Light.woff2?url";
import IRANSansUltraLight from "@/assets/fonts/IRANSansWeb_UltraLight.woff2?url";
import IRANSansBlack from "@/assets/fonts/IRANSansWeb_Black.woff2?url";

// ─── IRANSans Font Config ─────────────────────────────────────────────────────
const DEFAULT_FONT_FAMILY = "IRANSans";

const IRAN_SANS_FONTS = [
  { weight: "100", file: IRANSansUltraLight },
  { weight: "200", file: IRANSansLight },
  { weight: "400", file: IRANSansRegular },
  { weight: "500", file: IRANSansMedium },
  { weight: "700", file: IRANSansBold },
  { weight: "900", file: IRANSansBlack },
];
let fontLoadPromise: Promise<void> | null = null;

const loadIRANSansFont = (): Promise<void> => {
  if (fontLoadPromise) return fontLoadPromise;

  fontLoadPromise = Promise.all(
    IRAN_SANS_FONTS.map(async ({ weight, file }) => {
      const font = new FontFace(DEFAULT_FONT_FAMILY, `url(${file})`, {
        weight,
        style: "normal",
      });
      const loaded = await font.load();
      document.fonts.add(loaded);
    }),
  ).then(() => undefined);

  return fontLoadPromise;
};

interface FabricZoneObject extends FabricObject {
  data?: { id: string };
}

export interface FabricCanvasRef {
  getCanvas: () => Canvas | null;
}

interface FabricCanvasProps {
  imageUrl: string;
  width: number;
  height: number;
  zones: Zone[];
  mode: "edit" | "fill" | "preview";
  values?: Record<string, string>;
  styles?: Record<string, ZoneStyle>;
  selectedZoneId?: string | null;
  onZoneAdd?: (zone: Omit<Zone, "id">) => void;
  onZoneUpdate?: (id: string, updates: Partial<Zone>) => void;
  onZoneSelect?: (id: string | null) => void;
  onValueChange?: (id: string, value: string) => void;
  className?: string;
}

export const FabricCanvas = forwardRef<FabricCanvasRef, FabricCanvasProps>(
  (props, ref) => {
    const {
      imageUrl,
      width: originalWidth,
      height: originalHeight,
      zones,
      mode,
      values,
      styles,
      selectedZoneId,
      onZoneAdd,
      onZoneUpdate,
      onZoneSelect,
      onValueChange,
      className,
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricRef = useRef<Canvas | null>(null);

    const isUserEditingRef = useRef(false);

    const propsRef = useRef(props);
    useEffect(() => {
      propsRef.current = props;
    });

    useImperativeHandle(ref, () => ({
      getCanvas: () => fabricRef.current,
    }));

    const renderObjects = useCallback(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      const { zones, values, styles, mode, selectedZoneId } = propsRef.current;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const existingObjects = canvas.getObjects();
      const objectMap = new Map<string, FabricObject>();
      for (const obj of existingObjects) {
        const id = (obj as FabricZoneObject).data?.id;
        if (id) objectMap.set(id, obj);
      }

      zones.forEach((zone) => {
        const pixelX = CoordinateTransformer.toPixel(zone.x, canvasWidth);
        const pixelY = CoordinateTransformer.toPixel(zone.y, canvasHeight);
        const pixelW = CoordinateTransformer.toPixel(zone.width, canvasWidth);
        const pixelH = CoordinateTransformer.toPixel(zone.height, canvasHeight);

        const existing = objectMap.get(zone.id);
        if (existing) {
          if (mode === "edit") {
            existing.set({
              left: pixelX,
              top: pixelY,
              width: pixelW,
              height: pixelH,
              stroke: zone.id === selectedZoneId ? "#ef4444" : "#3b82f6",
            });
          } else {
            const textValue = values?.[zone.id] ?? zone.defaultValue ?? "";
            const style = styles?.[zone.id] || {
              fontSize: 3.5,
              color: "#000000",
              direction: "ltr" as const,
            };
            const pixelFontSize = CoordinateTransformer.fontSizeToPixel(
              style.fontSize,
              canvasHeight,
            );
            existing.set({
              left: style.direction === "rtl" ? pixelX + pixelW : pixelX,
              top: pixelY,
              width: pixelW,
              fontSize: pixelFontSize,
              fill: style.color,
              text: textValue,
              editable: mode === "fill",
              textAlign: style.direction === "rtl" ? "right" : "left",
              originX: style.direction === "rtl" ? "right" : "left" as const,
            });
          }
          existing.setCoords();
          objectMap.delete(zone.id);
        } else {
          if (mode === "edit") {
            const rect = new Rect({
              left: pixelX,
              top: pixelY,
              width: pixelW,
              height: pixelH,
              fill: "rgba(0, 123, 255, 0.2)",
              stroke: zone.id === selectedZoneId ? "#ef4444" : "#3b82f6",
              strokeWidth: 2,
              selectable: true,
              data: { id: zone.id },
            });
            canvas.add(rect);
          } else {
            const textValue = values?.[zone.id] ?? zone.defaultValue ?? "";
            const style = styles?.[zone.id] || {
              fontSize: 3.5,
              color: "#000000",
              direction: "ltr" as const,
            };
            const pixelFontSize = CoordinateTransformer.fontSizeToPixel(
              style.fontSize,
              canvasHeight,
            );
            const textbox = new Textbox(textValue, {
              left: style.direction === "rtl" ? pixelX + pixelW : pixelX,
              top: pixelY,
              width: pixelW,
              fontSize: pixelFontSize,
              fill: style.color,
              editable: mode === "fill",
              data: { id: zone.id },
              textAlign: style.direction === "rtl" ? "right" : "left",
              originX: style.direction === "rtl" ? "right" : "left" as const,
              fontFamily: DEFAULT_FONT_FAMILY,
            });
            canvas.add(textbox);
          }
        }
      });

      for (const [, obj] of objectMap) {
        canvas.remove(obj);
      }

      canvas.requestRenderAll();
    }, []);

    const syncValuesToCanvas = useCallback((values: Record<string, string>) => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      if (isUserEditingRef.current) return;

      canvas.getObjects().forEach((obj) => {
        const zoneObj = obj as FabricZoneObject & Textbox;
        if (!zoneObj.data?.id || !("text" in zoneObj)) return;

        const newValue = values[zoneObj.data.id] ?? "";

        if (zoneObj.text !== newValue) {
          zoneObj.set("text", newValue);
        }
      });

      canvas.requestRenderAll();
    }, []);

    // Initialize Canvas Instance
    useEffect(() => {
      if (!canvasRef.current) return;
      const canvas = new Canvas(canvasRef.current, {
        selection: mode === "edit",
        defaultCursor: mode === "edit" ? "crosshair" : "default",
      });
      fabricRef.current = canvas;

      return () => {
        canvas.dispose();
        fabricRef.current = null;
      };
    }, []);

    // Load IRANSans font once, then re-render objects
    useEffect(() => {
      loadIRANSansFont()
        .then(() => {
          renderObjects();
        })
        .catch((err) => console.error("Font load failed:", err));
    }, [renderObjects]);

    // Handle Resize & Image Loading → full rebuild needed
    useEffect(() => {
      const canvas = fabricRef.current;
      if (!canvas || !containerRef.current) return;

      const updateDimensions = () => {
        const containerWidth = containerRef.current?.clientWidth || 0;
        const containerHeight = containerRef.current?.clientHeight || 0;

        if (containerWidth === 0 || containerHeight === 0) return;

        const scale = Math.min(
          containerWidth / originalWidth,
          containerHeight / originalHeight,
        );

        const canvasWidth = originalWidth * scale;
        const canvasHeight = originalHeight * scale;

        canvas.setDimensions({ width: canvasWidth, height: canvasHeight });

        const loadAndRender = async () => {
          if (imageUrl) {
            try {
              const img = await FabricImage.fromURL(imageUrl, {
                crossOrigin: "anonymous",
              });
              img.set({
                scaleX: canvasWidth / (img.width || 1),
                scaleY: canvasHeight / (img.height || 1),
              });
              canvas.backgroundImage = img;
            } catch (err) {
              console.error("Failed to load background image:", err);
            }
          }
          renderObjects();
        };

        loadAndRender();
      };

      const resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(containerRef.current);
      updateDimensions();

      return () => resizeObserver.disconnect();
    }, [imageUrl, originalWidth, originalHeight, renderObjects]);

    useEffect(() => {
      renderObjects();
    }, [renderObjects, zones, styles, mode]);

    useEffect(() => {
      if (mode === "edit") {
        renderObjects();
      }
    }, [selectedZoneId, mode, renderObjects]);

    useEffect(() => {
      if (mode !== "fill" || !values) return;
      syncValuesToCanvas(values);
    }, [values, mode, syncValuesToCanvas]);

    // Event Listeners: Edit Mode Interaction
    useEffect(() => {
      const canvas = fabricRef.current;
      if (!canvas || mode !== "edit") return;

      let isDrawing = false;
      let rect: Rect | null = null;
      let startPoint: { x: number; y: number };

      const onMouseDown = (opt: TPointerEventInfo) => {
        if (opt.target) {
          const id = (opt.target as FabricZoneObject).data?.id;
          if (id && onZoneSelect) onZoneSelect(id);
          return;
        }

        isDrawing = true;
        startPoint = canvas.getPointer(opt.e as TPointerEvent);

        rect = new Rect({
          left: startPoint.x,
          top: startPoint.y,
          width: 0,
          height: 0,
          fill: "rgba(59, 130, 246, 0.2)",
          stroke: "#2563eb",
          strokeWidth: 2,
          selectable: false,
        });
        canvas.add(rect);
      };

      const onMouseMove = (opt: TPointerEventInfo) => {
        if (!isDrawing || !rect) return;
        const currentPoint = canvas.getPointer(opt.e as TPointerEvent);

        rect.set({
          left: Math.min(startPoint.x, currentPoint.x),
          top: Math.min(startPoint.y, currentPoint.y),
          width: Math.abs(startPoint.x - currentPoint.x),
          height: Math.abs(startPoint.y - currentPoint.y),
        });

        canvas.requestRenderAll();
      };

      const onMouseUp = () => {
        if (!isDrawing || !rect) return;
        isDrawing = false;
        const width = rect.width;
        const height = rect.height;

        if (width > 5 && height > 5 && onZoneAdd) {
          onZoneAdd({
            x: CoordinateTransformer.toPercent(rect.left, canvas.width),
            y: CoordinateTransformer.toPercent(rect.top, canvas.height),
            width: CoordinateTransformer.toPercent(width, canvas.width),
            height: CoordinateTransformer.toPercent(height, canvas.height),
            label: "New Zone",
            defaultValue: "",
          });
        }
        canvas.remove(rect);
        rect = null;
      };

      const onObjectModified = (
        opt: TPointerEventInfo & { target?: FabricObject },
      ) => {
        const target = opt.target as FabricZoneObject | undefined;
        if (!target?.data?.id || !onZoneUpdate) return;

        onZoneUpdate(target.data.id, {
          x: CoordinateTransformer.toPercent(target.left, canvas.width),
          y: CoordinateTransformer.toPercent(target.top, canvas.height),
          width: CoordinateTransformer.toPercent(
            target.getScaledWidth(),
            canvas.width,
          ),
          height: CoordinateTransformer.toPercent(
            target.getScaledHeight(),
            canvas.height,
          ),
        });
      };

      canvas.on("mouse:down", onMouseDown);
      canvas.on("mouse:move", onMouseMove);
      canvas.on("mouse:up", onMouseUp);
      canvas.on("object:modified", onObjectModified);

      return () => {
        canvas.off("mouse:down", onMouseDown);
        canvas.off("mouse:move", onMouseMove);
        canvas.off("mouse:up", onMouseUp);
        canvas.off("object:modified", onObjectModified);
      };
    }, [mode, onZoneAdd, onZoneSelect, onZoneUpdate]);

    useEffect(() => {
      const canvas = fabricRef.current;
      if (!canvas || mode !== "fill") return;

      const onEditingEntered = () => {
        isUserEditingRef.current = true;
      };

      const onEditingExited = () => {
        isUserEditingRef.current = false;
      };

      const onTextChanged = (opt: { target: IText }) => {
        const target = opt.target as FabricZoneObject & IText;
        if (target?.data?.id && onValueChange) {
          onValueChange(target.data.id, target.text || "");
        }
      };

      canvas.on("text:editing:entered", onEditingEntered);
      canvas.on("text:editing:exited", onEditingExited);
      canvas.on("text:changed", onTextChanged);

      return () => {
        canvas.off("text:editing:entered", onEditingEntered);
        canvas.off("text:editing:exited", onEditingExited);
        canvas.off("text:changed", onTextChanged);
      };
    }, [mode, onValueChange]);

    return (
      <div
        ref={containerRef}
        className={`w-full h-full relative overflow-hidden ${className}`}
      >
        <canvas ref={canvasRef} />
      </div>
    );
  },
);

FabricCanvas.displayName = "FabricCanvas";
