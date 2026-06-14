import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HAS_LANG_KEY } from "@/lib/i18n";
import { SplashScreen } from "@/components/SplashScreen";
import { Onboarding, ONB_KEY } from "@/components/Onboarding";
import { AppHeader } from "@/components/AppHeader";
import { Hero } from "@/components/Hero";
import { HeroSlider } from "@/components/HeroSlider";
import { ContinueProgress } from "@/components/ContinueProgress";
import { CountryGrid } from "@/components/CountryGrid";
import { ConsultationCTA } from "@/components/ConsultationCTA";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { InstallAppPrompt } from "@/components/InstallAppPrompt";

export default function Index() {
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(() => {
    if (typeof window === "undefined") return false;
    return !localStorage.getItem(ONB_KEY);
  });
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === "undefined") return true;
    return !localStorage.getItem(HAS_LANG_KEY);
  });
  const [query, setQuery] = useState("");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (showOnboarding) return <Onboarding onDone={() => setShowOnboarding(false)} />;
  if (showSplash) return <SplashScreen onContinue={() => setShowSplash(false)} />;

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <AppHeader onHome={() => navigate("/")} />
      <main id="main">
        <Hero query={query} setQuery={setQuery} onCta={() => {
          document.getElementById("countries")?.scrollIntoView({ behavior: "smooth" });
        }} />
        <ContinueProgress />
        <HeroSlider />
        <CountryGrid query={query} setQuery={setQuery} onSelect={(c) => navigate(`/country/${c.slug}/work`)} />
        <ConsultationCTA />
      </main>
      <Footer />
      <BottomNav />
      <InstallAppPrompt />
    </div>
  );
}
