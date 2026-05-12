import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import DestinationsHero from "@/components/destinations/DestinationsHero";
import DestinationGrid from "@/components/destinations/DestinationGrid";
import DestinationsTrust from "@/components/destinations/DestinationsTrust";
import { getRegions } from "@/lib/supabase/queries/regions";
import { getSettings } from "@/lib/supabase/queries/settings";

export const metadata = {
  title: "Destinations | Himalayan Vistas",
  description:
    "Explore Nepal's most iconic trekking regions — Everest, Annapurna, Langtang, and Manaslu.",
};

export default async function DestinationsPage() {
  const [regions, settings] = await Promise.all([
    getRegions(),
    getSettings(),
  ]);

  return (
    <>
      <TopNavBar activePage="destinations" companyName={settings.company_name} />
      <main>
        <DestinationsHero />
        <DestinationGrid regions={regions} />
        <DestinationsTrust />
      </main>
      <Footer settings={settings} />
    </>
  );
}
