import React from "react";
import { Languages, Sun, Moon } from "lucide-react";
import { Button } from "../components/ui/button";
import { useAppStore } from "../../application/store/app.store";
import { useLanguageStore } from "../../application/store/language.store";
import { useTranslation } from "react-i18next";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, setTheme } = useAppStore();
  const { language, setLanguage } = useLanguageStore();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col font-sans relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <header className="border-b border-base-300 bg-base-100/60 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t("layout.title")}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-base-content/60 hover:text-primary hover:bg-primary/10 transition-all"
            onClick={() => setLanguage(language === "en" ? "fa" : "en")}
            title={language === "en" ? "فارسی" : "English"}
          >
            <Languages className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-base-content/60 hover:text-primary hover:bg-primary/10 transition-all"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 animate-in zoom-in duration-300" />
            ) : (
              <Moon className="h-5 w-5 animate-in zoom-in duration-300" />
            )}
          </Button>

          {/* <a
            href="https://github.com/javadSharifi/FormOverlay"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block"
          >
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-base-300 bg-base-200 hover:bg-primary hover:text-primary-content hover:border-primary transition-all shadow-sm"
            >
              <Github className="h-4 w-4" />
              {t("layout.github")}
            </Button>
          </a> */}
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-8 relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
        {children}
      </main>

      <footer className="border-t border-base-300 py-8 text-center text-sm text-base-content/40 bg-base-200/30">
        <p className="font-medium">
          &copy; {new Date().getFullYear()} {t("layout.title")}.{" "}
          {t("layout.footer")}
        </p>
      </footer>
    </div>
  );
};
