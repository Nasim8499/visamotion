import { Plane, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

interface AppHeaderProps {
  onHome?: () => void;
}

export function AppHeader({ onHome }: AppHeaderProps) {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-white/85 backdrop-blur-xl no-print">
      <div className="container flex h-16 items-center justify-between">
        <button onClick={onHome} className="flex items-center gap-2 transition-smooth hover:opacity-80">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-teal-gradient shadow-soft">
            <Plane className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight text-primary">Visa Motion</span>
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          <a href="#countries" className="text-sm font-medium text-muted-foreground transition-smooth hover:text-primary">{t("countries")}</a>
          <a href="#categories" className="text-sm font-medium text-muted-foreground transition-smooth hover:text-primary">{t("categories")}</a>
          <a href="#consult" className="text-sm font-medium text-muted-foreground transition-smooth hover:text-primary">{t("contact")}</a>
        </nav>

        <div className="flex items-center gap-2 rounded-full border border-border/70 bg-secondary/60 p-1">
          <Globe className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
          <button
            onClick={() => setLang("bn")}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-smooth font-bn ${lang === "bn" ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:text-primary"}`}
          >বাংলা</button>
          <button
            onClick={() => setLang("en")}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-smooth ${lang === "en" ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:text-primary"}`}
          >EN</button>
        </div>
      </div>
    </header>
  );
}
