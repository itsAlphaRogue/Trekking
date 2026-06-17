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
      <TopNavBar 
        activePage="home" 
        companyName={settings.company_name} 
        contact={{ email: settings.email, phone: settings.phone }}
      />
      <main>
        <HeroSection heroImage={settings.home_hero_image} />
        <Statistics />
        <FeaturedTreks />
        <WhyTrekWithUs 
          companyName={settings.company_name} 
          imageUrl={settings.why_trek_image}
        />
      </main>
      <Footer settings={settings} />
    </>
  );
}
