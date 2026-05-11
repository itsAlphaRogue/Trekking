import { Suspense } from "react";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import TripsFilters from "@/components/treks/TreksFilters";
import TripsSortBar from "@/components/treks/TreksSortBar";
import TrekCard from "@/components/treks/TrekCard";
import TripsPagination from "@/components/treks/TreksPagination";
import { queryTreks, Difficulty } from "@/lib/supabase/queries/treks";

export const metadata = {
  title: "All Treks | Himalayan Vistas",
  description:
    "Browse all Himalayan trekking packages — filter by difficulty, region, duration and price.",
};

// Opt out of static generation — this page reads URL search params
export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TripsPage({ searchParams }: Props) {
  const sp = await searchParams;

  const filters = {
    q: (sp.q as string) ?? undefined,
    difficulty: sp.difficulty
      ? ((Array.isArray(sp.difficulty)
          ? sp.difficulty
          : [sp.difficulty]) as Difficulty[])
      : undefined,
    regions: sp.region
      ? Array.isArray(sp.region)
        ? sp.region
        : [sp.region]
      : undefined,
    minPrice: sp.minPrice ? Number(sp.minPrice) : undefined,
    maxPrice: sp.maxPrice ? Number(sp.maxPrice) : undefined,
    maxDuration: sp.maxDuration ? Number(sp.maxDuration) : undefined,
    sortBy:
      (sp.sortBy as "popular" | "price_asc" | "price_desc" | "duration_asc") ??
      "popular",
    page: sp.page ? Number(sp.page) : 1,
  };

  const { treks, total, totalPages } = await queryTreks(filters);

  return (
    <>
      <TopNavBar activePage="treks" />
      <main className="flex flex-col min-h-screen bg-surface">
        <div className="max-w-7xl w-full mx-auto px-6 md:px-8 py-12 grow">
          <div className="flex flex-col md:flex-row gap-12">
            <Suspense fallback={<div className="w-80 shrink-0" />}>
              <TripsFilters />
            </Suspense>

            <section className="grow min-w-0">
              <Suspense fallback={null}>
                <TripsSortBar total={total} />
              </Suspense>

              {treks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 gap-4">
                  <span className="material-symbols-outlined text-6xl text-outline-variant">
                    search_off
                  </span>
                  <h2 className="font-serif text-2xl text-primary">
                    No treks found
                  </h2>
                  <p className="text-base text-on-surface-variant font-sans">
                    Try adjusting your filters to find the perfect expedition.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {treks.map((trek) => (
                    <TrekCard key={trek.id} trek={trek} />
                  ))}
                </div>
              )}

              <Suspense fallback={null}>
                <TripsPagination
                  currentPage={filters.page ?? 1}
                  totalPages={totalPages}
                />
              </Suspense>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
