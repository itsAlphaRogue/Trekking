import { notFound } from "next/navigation";
import {
  getRegionBySlug,
  getRegionSpecialties,
  getTreksByRegion,
  getAllRegionSlugsStatic,
} from "@/lib/supabase/queries/regions";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import RegionHero from "@/components/region/RegionHero";
import RegionStats from "@/components/region/RegionStats";
import RegionSpecialties from "@/components/region/RegionSpecialties";
import RegionTreks from "@/components/region/RegionTreks";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllRegionSlugsStatic();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const region = await getRegionBySlug(slug);
  if (!region) return {};
  return {
    title: `${region.name} | Himalayan Vistas`,
    description: region.description ?? region.name,
  };
}

export default async function RegionPage({ params }: Props) {
  const { slug } = await params;

  const region = await getRegionBySlug(slug);
  if (!region) notFound();

  const [specialties, treks] = await Promise.all([
    getRegionSpecialties(region.id),
    getTreksByRegion(slug),
  ]);

  return (
    <>
      <TopNavBar activePage="destinations" />
      <main>
        <RegionHero region={region} />
        <RegionStats region={region} />
        <RegionSpecialties region={region} specialties={specialties} />
        <RegionTreks treks={treks} />
      </main>
      <Footer />
    </>
  );
}
