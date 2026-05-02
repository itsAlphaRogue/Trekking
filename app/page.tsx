import TopNavBar from "@/components/TopNavBar";
import HeroSection from "@/components/home/HeroSection";
import FeaturedTreks from "@/components/home/FeaturedTreks";
import WhyTrekWithUs from "@/components/home/WhyTrekWithUs";
import WeatherAndSocialProof from "@/components/home/WeatherAndSocialProof";
import Footer from "@/components/Footer";
import Statistics from "@/components/home/Statistics";

export default function Home() {
  return (
    <>
      <TopNavBar activePage="home" />
      <main>
        <HeroSection />
        <Statistics />
        <FeaturedTreks />
        <WhyTrekWithUs />
        <WeatherAndSocialProof />
      </main>
      <Footer />
    </>
  );
}
