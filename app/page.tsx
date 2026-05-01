import TopNavBar from "@/components/TopNavBar";
import HeroSection from "@/components/HeroSection";
import FeaturedTreks from "@/components/FeaturedTreks";
import WhyTrekWithUs from "@/components/WhyTrekWithUs";
import WeatherAndSocialProof from "@/components/WeatherAndSocialProof";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <TopNavBar activePage="home" />
      <main>
        <HeroSection />
        <FeaturedTreks />
        <WhyTrekWithUs />
        <WeatherAndSocialProof />
      </main>
      <Footer />
    </>
  );
}
