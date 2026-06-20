import React from "react";
import { useTranslation } from "react-i18next";
import { ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";

const STORAGE_KEY = "document_maker_privacy_seen";

function getInitialOpen(): boolean {
  if (typeof window === "undefined") return false;
  return !localStorage.getItem(STORAGE_KEY);
}

export const PrivacyWelcomeModal: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(getInitialOpen);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) dismiss(); }}>
      <DialogContent className="sm:max-w-md text-center gap-6">
        <div className="flex justify-center pt-2">
          <div className="p-4 rounded-full bg-primary/10">
            <ShieldCheck className="w-12 h-12 text-primary" />
          </div>
        </div>

        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            {t("about.privacy_modal_title")}
          </DialogTitle>
          <DialogDescription className="text-center text-sm leading-relaxed pt-2">
            {t("about.privacy_modal_desc")}
          </DialogDescription>
        </DialogHeader>

        <Button
          onClick={dismiss}
          className="w-full font-bold text-sm h-11 rounded-btn"
        >
          {t("about.privacy_modal_button")}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
