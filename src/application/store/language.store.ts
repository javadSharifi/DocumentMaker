import { create } from "zustand";
import i18n from "../../i18n";

interface LanguageState {
  language: string;
  setLanguage: (lang: string) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: i18n.language || "fa",
  setLanguage: (lang: string) => {
    i18n.changeLanguage(lang);
    set({ language: lang });
  },
}));
