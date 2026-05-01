import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import DestinationsHero from "@/components/destinations/DestinationsHero";
import DestinationGrid from "@/components/destinations/DestinationGrid";
import DestinationsTrust from "@/components/destinations/DestinationsTrust";

export const metadata = {
  title: "Destinations | Himalayan Vistas",
  description:
    "Explore Nepal's most iconic trekking regions — Everest, Annapurna, Langtang, and Manaslu.",
};

export default function DestinationsPage() {
  return (
    <>
      <TopNavBar activePage="destinations" />
      <main>
        <DestinationsHero />
        <DestinationGrid />
        <DestinationsTrust />
      </main>
      <Footer />
    </>
  );
}
