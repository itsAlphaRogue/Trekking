import TopNavBar from "@/components/TopNavBar";
import HeroSection from "@/components/home/HeroSection";
import FeaturedTreks from "@/components/home/FeaturedTreks";
import WhyTrekWithUs from "@/components/home/WhyTrekWithUs";
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
      </main>
      <Footer />
    </>
  );
}
