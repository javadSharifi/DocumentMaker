import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

interface AppState {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
  isAboutOpen: boolean;
  setAboutOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    immer((set) => ({
      theme: "light",
      setTheme: (theme) =>
        set((state) => {
          state.theme = theme;
          const root = window.document.documentElement;
          root.classList.remove("light", "dark");
          root.classList.add(theme);
        }),
      isAboutOpen: false,
      setAboutOpen: (open) =>
        set((state) => {
          state.isAboutOpen = open;
        }),
    })),
    {
      name: "app-storage",
      partialize: (state) => ({ theme: state.theme }), // Only persist theme
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setTheme(state.theme);
        }
      },
    },
  ),
);
