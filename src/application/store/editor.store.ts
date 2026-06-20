import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { nanoid } from "nanoid";
import type { Template, Zone } from "../../core/types/domain";

interface EditorState {
  currentTemplate: Template | null;
  selectedZoneId: string | null;

  initializeTemplate: () => void;
  loadImage: (file: File, base64: string, width: number, height: number) => void;
  setTemplate: (template: Template) => void;
  addZone: (zone: Omit<Zone, "id">) => void;
  updateZone: (id: string, updates: Partial<Zone>) => void;
  updateZoneFromCanvas: (id: string, percentData: { x: number; y: number; width: number; height: number }) => void;
  removeZone: (id: string) => void;
  selectZone: (id: string | null) => void;
  reset: () => void;
  updateTemplateName: (name: string) => void;
}

export const useEditorStore = create<EditorState>()(
  immer((set) => ({
    currentTemplate: null,
    selectedZoneId: null,

    initializeTemplate: () => {
      set((state) => {
        state.currentTemplate = {
          id: nanoid(),
          name: "Untitled Template",
          imageData: "",
          width: 0,
          height: 0,
          zones: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
      });
    },

    loadImage: (_file, base64, width, height) => {
      set((state) => {
        if (!state.currentTemplate) return;
        state.currentTemplate.imageData = base64;
        state.currentTemplate.width = width;
        state.currentTemplate.height = height;
        state.currentTemplate.zones = [];
      });
    },

    setTemplate: (template) => {
      set((state) => {
        state.currentTemplate = template;
        state.selectedZoneId = null;
      });
    },

    addZone: (zoneData) => {
      set((state) => {
        if (!state.currentTemplate) return;
        const newZone: Zone = { ...zoneData, id: nanoid() };
        state.currentTemplate.zones.push(newZone);
        state.selectedZoneId = newZone.id;
      });
    },

    updateZone: (id, updates) => {
      set((state) => {
        if (!state.currentTemplate) return;
        const index = state.currentTemplate.zones.findIndex((z) => z.id === id);
        if (index !== -1) {
          state.currentTemplate.zones[index] = {
            ...state.currentTemplate.zones[index],
            ...updates,
          };
        }
      });
    },

    updateZoneFromCanvas: (id, percentData) => {
      set((state) => {
        if (!state.currentTemplate) return;
        const index = state.currentTemplate.zones.findIndex((z) => z.id === id);
        if (index !== -1) {
          const zone = state.currentTemplate.zones[index];
          zone.x = percentData.x;
          zone.y = percentData.y;
          zone.width = percentData.width;
          zone.height = percentData.height;
        }
      });
    },

    removeZone: (id) => {
      set((state) => {
        if (!state.currentTemplate) return;
        state.currentTemplate.zones = state.currentTemplate.zones.filter(
          (z) => z.id !== id,
        );
        if (state.selectedZoneId === id) {
          state.selectedZoneId = null;
        }
      });
    },

    selectZone: (id) => {
      set((state) => {
        state.selectedZoneId = id;
      });
    },

    reset: () => {
      set((state) => {
        state.currentTemplate = null;
        state.selectedZoneId = null;
      });
    },

    updateTemplateName: (name) => {
      set((state) => {
        if (state.currentTemplate) {
          state.currentTemplate.name = name;
        }
      });
    },
  })),
);
