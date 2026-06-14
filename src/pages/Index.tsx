import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HAS_LANG_KEY } from "@/lib/i18n";
import { SplashScreen } from "@/components/SplashScreen";
import { AppHeader } from "@/components/AppHeader";
import { Hero } from "@/components/Hero";
import { CountryGrid } from "@/components/CountryGrid";
import { ConsultationCTA } from "@/components/ConsultationCTA";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";

export default function Index() {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === "undefined") return true;
    return !localStorage.getItem(HAS_LANG_KEY);
  });
  const [query, setQuery] = useState("");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (showSplash) return <SplashScreen onContinue={() => setShowSplash(false)} />;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader onHome={() => navigate("/")} />
      <Hero query={query} setQuery={setQuery} onCta={() => {
        document.getElementById("countries")?.scrollIntoView({ behavior: "smooth" });
      }} />
      <CountryGrid query={query} setQuery={setQuery} onSelect={(c) => navigate(`/country/${c.slug}/work`)} />
      <ConsultationCTA />
      <Footer />
      <BottomNav />
    </div>
  );
}
