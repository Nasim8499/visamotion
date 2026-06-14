import { useEffect, useState } from "react";
import { LanguageProvider, HAS_LANG_KEY } from "@/lib/i18n";
import { SplashScreen } from "@/components/SplashScreen";
import { AppHeader } from "@/components/AppHeader";
import { Hero } from "@/components/Hero";
import { StatCards } from "@/components/StatCards";
import { CountryGrid } from "@/components/CountryGrid";
import { ConsultationCTA } from "@/components/ConsultationCTA";
import { Footer } from "@/components/Footer";
import { CountryDetail } from "@/components/CountryDetail";
import type { Country } from "@/data/countries";

function VisaMotionApp() {
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === "undefined") return true;
    return !localStorage.getItem(HAS_LANG_KEY);
  });
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Country | null>(null);

  useEffect(() => {
    if (selected) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selected]);

  if (showSplash) return <SplashScreen onContinue={() => setShowSplash(false)} />;

  if (selected) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader onHome={() => setSelected(null)} />
        <CountryDetail country={selected} onBack={() => setSelected(null)} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader onHome={() => setSelected(null)} />
      <Hero query={query} setQuery={setQuery} onCta={() => {
        document.getElementById("countries")?.scrollIntoView({ behavior: "smooth" });
      }} />
      <StatCards />
      <CountryGrid query={query} setQuery={setQuery} onSelect={setSelected} />
      <ConsultationCTA />
      <Footer />
    </div>
  );
}

export default function Index() {
  return (
    <LanguageProvider>
      <VisaMotionApp />
    </LanguageProvider>
  );
}
