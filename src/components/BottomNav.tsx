import { Home, Globe2, Languages, MessageCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";

export function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t, lang, setLang } = useLanguage();

  const isHome = pathname === "/";
  const isCountry = pathname.startsWith("/country");

  const Item = ({
    icon: Icon, label, active, onClick,
  }: { icon: any; label: string; active?: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`relative flex flex-1 flex-col items-center gap-1 py-2 text-[10.5px] font-semibold transition ${
        active ? "text-[#0D3B66]" : "text-muted-foreground"
      }`}
    >
      <div className={`grid h-9 w-9 place-items-center rounded-xl transition ${
        active ? "bg-gradient-to-br from-[#0F766E] to-[#14B8A6] text-white shadow-soft" : "bg-transparent"
      }`}>
        <Icon className="h-[18px] w-[18px]" strokeWidth={2.3} />
      </div>
      <span className={lang === "bn" ? "font-bn" : ""}>{label}</span>
    </button>
  );

  return (
    <>
      {/* Spacer so content isn't hidden under the fixed bar */}
      <div className="h-20 md:hidden no-print" aria-hidden />

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-white/95 backdrop-blur-xl md:hidden no-print"
           style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div className="container flex items-stretch">
          <Item icon={Home} label={t("appName")} active={isHome} onClick={() => navigate("/")} />
          <Item icon={Globe2} label={t("countries")} active={isCountry} onClick={() => navigate("/")} />
          <Item
            icon={Languages}
            label={lang === "bn" ? "EN" : "বাংলা"}
            onClick={() => setLang(lang === "bn" ? "en" : "bn")}
          />
          <Item icon={MessageCircle} label={t("contact")} onClick={() => {
            const el = document.getElementById("consult");
            if (el) el.scrollIntoView({ behavior: "smooth" });
            else navigate("/#consult");
          }} />
        </div>
      </nav>
    </>
  );
}
