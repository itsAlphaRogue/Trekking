import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import DestinationsHero from "@/components/destinations/DestinationsHero";
import DestinationGrid from "@/components/destinations/DestinationGrid";
import DestinationsTrust from "@/components/destinations/DestinationsTrust";
import { getRegions } from "@/lib/supabase/queries/regions";

export const metadata = {
  title: "Destinations | Himalayan Vistas",
  description:
    "Explore Nepal's most iconic trekking regions — Everest, Annapurna, Langtang, and Manaslu.",
};

export default async function DestinationsPage() {
  const regions = await getRegions();

  return (
    <>
      <TopNavBar activePage="destinations" />
      <main>
        <DestinationsHero />
        <DestinationGrid regions={regions} />
        <DestinationsTrust />
      </main>
      <Footer />
    </>
  );
}
