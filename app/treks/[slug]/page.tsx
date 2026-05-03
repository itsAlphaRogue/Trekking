import { notFound } from "next/navigation";
import { getTrekBySlug, getAllTrekSlugs } from "@/lib/treks";
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

export async function generateStaticParams() {
  return getAllTrekSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const trek = getTrekBySlug(slug);
  if (!trek) return {};
  return {
    title: `${trek.title} | Himalayan Vistas`,
    description: trek.tagline,
  };
}

export default async function TrekDetailPage({ params }: Props) {
  const { slug } = await params;
  const trek = getTrekBySlug(slug);

  if (!trek) notFound();

  return (
    <>
      <TopNavBar activePage="treks" />
      <main>
        <TrekHero trek={trek} />
        <TrekQuickFacts trek={trek} />

        {/* Main content grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 my-20 md:my-[120px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left: itinerary + gallery */}
            <div className="lg:col-span-8">
              <TrekItinerary days={trek.itinerary} />
              <TrekGallery images={trek.gallery} />
            </div>

            {/* Right: sticky inquiry card */}
            <div className="lg:col-span-4">
              <TrekInquiryCard trek={trek} />
            </div>
          </div>
        </section>

        <TrekWeather trek={trek} />
      </main>
      <Footer />
    </>
  );
}
