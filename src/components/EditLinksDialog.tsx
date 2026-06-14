import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/lib/i18n";
import { getOverrides, setOverrides } from "@/lib/links-store";
import { toast } from "sonner";
import type { Country } from "@/data/countries";
import { Save, RotateCcw } from "lucide-react";

interface Props {
  country: Country;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

function isValidUrl(u: string) {
  if (!u) return true;
  try { new URL(u); return true; } catch { return false; }
}

export function EditLinksDialog({ country, open, onOpenChange }: Props) {
  const { t } = useLanguage();
  const [officialVisa, setOfficialVisa] = useState("");
  const [appointment, setAppointment] = useState("");

  useEffect(() => {
    if (!open) return;
    const ov = getOverrides(country.id);
    setOfficialVisa(ov.officialVisa ?? country.links.officialVisa ?? "");
    setAppointment(ov.appointment ?? country.links.appointment ?? "");
  }, [open, country]);

  const handleSave = () => {
    if (!isValidUrl(officialVisa) || !isValidUrl(appointment)) {
      toast.error(t("invalidUrl"));
      return;
    }
    setOverrides(country.id, { officialVisa, appointment });
    toast.success(t("linksSaved"));
    onOpenChange(false);
  };

  const handleReset = () => {
    setOverrides(country.id, { officialVisa: "", appointment: "" });
    setOfficialVisa(country.links.officialVisa ?? "");
    setAppointment(country.links.appointment ?? "");
    toast.success(t("linksReset"));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{t("editLinks")} — {country.flag} {country.name.en}</DialogTitle>
          <DialogDescription>{t("editLinksDesc")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="ov">{t("officialVisaInfo")}</Label>
            <Input id="ov" type="url" placeholder="https://..." value={officialVisa} onChange={(e) => setOfficialVisa(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ap">{t("appointmentPortal")}</Label>
            <Input id="ap" type="url" placeholder="https://..." value={appointment} onChange={(e) => setAppointment(e.target.value)} />
            <p className="text-xs text-muted-foreground">{t("linksLocalNote")}</p>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="ghost" onClick={handleReset} className="sm:mr-auto">
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> {t("reset")}
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{t("cancel")}</Button>
          <Button onClick={handleSave} className="bg-teal-gradient hover:opacity-95">
            <Save className="mr-1.5 h-3.5 w-3.5" /> {t("save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
