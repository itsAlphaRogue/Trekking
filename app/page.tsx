import TopNavBar from "@/components/TopNavBar";
import HeroSection from "@/components/home/HeroSection";
import FeaturedTreks from "@/components/home/FeaturedTreks";
import WhyTrekWithUs from "@/components/home/WhyTrekWithUs";
import Footer from "@/components/Footer";
import Statistics from "@/components/home/Statistics";
import { getSettings } from "@/lib/supabase/queries/settings";

export default function Home() {
  return (
    <HomeContent />
  );
}

async function HomeContent() {
  const settings = await getSettings();

  return (
    <>
      <TopNavBar activePage="home" companyName={settings.company_name} />
      <main>
        <HeroSection />
        <Statistics />
        <FeaturedTreks />
        <WhyTrekWithUs companyName={settings.company_name} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
