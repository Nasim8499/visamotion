import { useEffect } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { AppHeader } from "@/components/AppHeader";
import { Footer } from "@/components/Footer";
import { CountryDetail } from "@/components/CountryDetail";
import { BottomNav } from "@/components/BottomNav";
import { getCountryBySlug } from "@/data/countries";

type Cat = "work" | "visit" | "business" | "trc";
const VALID: Cat[] = ["work", "visit", "business", "trc"];

export default function CountryPage() {
  const { slug = "", category } = useParams();
  const navigate = useNavigate();
  const country = getCountryBySlug(slug);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [slug, category]);

  if (!country) return <Navigate to="/" replace />;

  const cat: Cat = (VALID.includes(category as Cat) ? category : "work") as Cat;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader onHome={() => navigate("/")} />
      <CountryDetail
        country={country}
        category={cat}
        onBack={() => navigate("/")}
        onCategoryChange={(c) => navigate(`/country/${country.slug}/${c}`, { replace: false })}
      />
      <Footer />
      <BottomNav />
    </div>
  );
}
