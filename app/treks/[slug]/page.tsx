import { notFound } from "next/navigation";
import {
  getTrekBySlug,
  getTrekItinerary,
  getTrekGallery,
  getAllTrekSlugsStatic,
} from "@/lib/supabase/queries/treks";
import { getSettings } from "@/lib/supabase/queries/settings";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import TrekHero from "@/components/trek/TrekHero";
import TrekQuickFacts from "@/components/trek/TrekQuickFacts";
import TrekItinerary from "@/components/trek/TrekItinerary";
import TrekGallery from "@/components/trek/TrekGallery";
import TrekInquiryCard from "@/components/trek/TrekInquiryCard";
import TrekWeather from "@/components/trek/TrekWeather";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllTrekSlugsStatic();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const trek = await getTrekBySlug(slug);
  if (!trek) return {};
  return {
    title: `${trek.title} | Himalayan Vistas`,
    description: trek.tagline ?? trek.title,
  };
}

export default async function TrekDetailPage({ params }: Props) {
  const { slug } = await params;

  const trek = await getTrekBySlug(slug);
  if (!trek) notFound();

  // Fetch data in parallel
  const [itinerary, gallery, settings] = await Promise.all([
    getTrekItinerary(trek.id),
    getTrekGallery(trek.id),
    getSettings(),
  ]);

  const contact = { email: settings.email, phone: settings.phone };

  return (
    <>
      <TopNavBar 
        activePage="treks" 
        companyName={settings.company_name} 
        contact={contact}
      />
      <main>
        <TrekHero trek={trek} />
        <TrekQuickFacts trek={trek} />

        <section className="max-w-7xl mx-auto px-6 md:px-8 my-20 md:my-30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <TrekItinerary days={itinerary} />
              <TrekGallery images={gallery} />
            </div>
            <div className="lg:col-span-4">
              <TrekInquiryCard trek={trek} contact={contact} />
            </div>
          </div>
        </section>

        <TrekWeather trek={trek} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
