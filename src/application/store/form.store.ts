import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { nanoid } from "nanoid";
import type { Document, Template, ZoneStyle, Direction } from "../../core/types/domain";

interface FormState {
  currentTemplate: Template | null;
  currentDocument: Document | null;
  selectedZoneId: string | null;

  setTemplate: (template: Template) => void;
  createDocument: (templateId: string, initialValues: Record<string, string>, defaultDirection: Direction) => void;
  updateDocumentValues: (values: Record<string, string>) => void;
  updateDocumentStyle: (zoneId: string, style: Partial<ZoneStyle>) => void;
  selectZone: (id: string | null) => void;
  setDocument: (doc: Document) => void;
  reset: () => void;
}

export const useFormStore = create<FormState>()(
  immer((set) => ({
    currentTemplate: null,
    currentDocument: null,
    selectedZoneId: null,

    setTemplate: (template) => {
      set((state) => {
        state.currentTemplate = template;
      });
    },

    createDocument: (templateId, initialValues, defaultDirection) => {
      set((state) => {
        const initialStyles: Record<string, ZoneStyle> = {};
        if (state.currentTemplate) {
          state.currentTemplate.zones.forEach((zone) => {
            initialStyles[zone.id] = {
              fontSize: 3.5,
              color: "#000000",
              direction: defaultDirection,
            };
          });
        }

        state.currentDocument = {
          id: nanoid(),
          templateId,
          values: initialValues,
          styles: initialStyles,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
      });
    },

    updateDocumentValues: (values) => {
      set((state) => {
        if (state.currentDocument) {
          state.currentDocument.values = values;
          state.currentDocument.updatedAt = Date.now();
        }
      });
    },

    updateDocumentStyle: (zoneId, style) => {
      set((state) => {
        if (state.currentDocument && state.currentDocument.styles[zoneId]) {
          state.currentDocument.styles[zoneId] = {
            ...state.currentDocument.styles[zoneId],
            ...style,
          };
          state.currentDocument.updatedAt = Date.now();
        }
      });
    },

    selectZone: (id) => {
      set((state) => {
        state.selectedZoneId = id;
      });
    },

    setDocument: (doc) => {
      set((state) => {
        state.currentDocument = doc;
      });
    },

    reset: () => {
      set((state) => {
        state.currentTemplate = null;
        state.currentDocument = null;
        state.selectedZoneId = null;
      });
    },
  })),
);
