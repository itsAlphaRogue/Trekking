import { notFound } from "next/navigation";
import { getRegionBySlug, getAllRegionSlugs } from "@/lib/regions";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import RegionHero from "@/components/region/RegionHero";
import RegionStats from "@/components/region/RegionStats";
import RegionSpecialties from "@/components/region/RegionSpecialties";
import RegionTreks from "@/components/region/RegionTreks";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllRegionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);
  if (!region) return {};
  return {
    title: `${region.name} | Himalayan Vistas`,
    description: region.description,
  };
}

export default async function RegionPage({ params }: Props) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) notFound();

  return (
    <>
      <TopNavBar activePage="destinations" />
      <main>
        <RegionHero region={region} />
        <RegionStats region={region} />
        <RegionSpecialties region={region} />
        <RegionTreks region={region} />
      </main>
      <Footer />
    </>
  );
}
