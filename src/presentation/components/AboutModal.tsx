import React, { useEffect } from "react";
import { useAppStore } from "../../application/store/app.store";
import { useLanguageStore } from "../../application/store/language.store";
import { useTranslation } from "react-i18next"; // استفاده از هوک استاندارد
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Sun, Moon, CheckCircle2 } from "lucide-react";

export const AboutModal: React.FC = () => {
  const { isAboutOpen, setAboutOpen, theme, setTheme } = useAppStore();
  const { language, setLanguage } = useLanguageStore();
  const { t } = useTranslation();

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setAboutOpen(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, [setAboutOpen]);

  return (
    <Dialog open={isAboutOpen} onOpenChange={setAboutOpen}>
      <DialogContent className="sm:max-w-md border border-base-300 bg-base-100 text-base-content rounded-box shadow-2xl backdrop-blur-xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            {t("about.welcome")}
          </DialogTitle>
          <DialogDescription className="text-base-content/60 leading-relaxed">
            {t("about.privacy")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-6">
          <div className="space-y-5">
            <h3 className="font-bold text-xs uppercase tracking-widest text-base-content/40 border-b border-base-300 pb-2">
              {t("about.setup")}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-sm font-semibold">
                  {t("about.language")}
                </Label>
                <div className="flex p-1 bg-base-200 rounded-btn border border-base-300">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex-1 rounded-btn transition-all ${language === "en" ? "bg-base-100 shadow-sm text-primary font-bold" : "text-base-content/50"}`}
                    onClick={() => setLanguage("en")}
                  >
                    English
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex-1 rounded-btn transition-all ${language === "fa" ? "bg-base-100 shadow-sm text-primary font-bold" : "text-base-content/50"}`}
                    onClick={() => setLanguage("fa")}
                  >
                    فارسی
                  </Button>
                </div>
              </div>

              {/* بخش انتخاب تم */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">
                  {t("about.theme")}
                </Label>
                <div className="flex p-1 bg-base-200 rounded-btn border border-base-300">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex-1 rounded-btn transition-all ${theme === "light" ? "bg-base-100 shadow-sm text-primary font-bold" : "text-base-content/50"}`}
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-4 w-4 mr-2" />
                    {t("about.light")}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex-1 rounded-btn transition-all ${theme === "dark" ? "bg-base-100 shadow-sm text-primary font-bold" : "text-base-content/50"}`}
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-4 w-4 mr-2" />
                    {t("about.dark")}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-base-200/50 p-4 rounded-btn border border-base-300 text-[11px] text-base-content/50 leading-relaxed italic">
            {t("about.footer")}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => setAboutOpen(false)}
            className="bg-primary text-primary-content hover:bg-primary/90 px-8 py-2 font-bold rounded-btn shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            {t("about.done")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
