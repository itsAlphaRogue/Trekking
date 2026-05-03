import { Suspense } from "react";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import TripsFilters from "@/components/trips/TripsFilters";
import TripsSortBar from "@/components/trips/TripsSortBar";
import TripCard from "@/components/trips/TripCard";
import TripsPagination from "@/components/trips/TripsPagination";
import { queryTrips, Difficulty } from "@/lib/tripListings";

export const metadata = {
  title: "All Treks | Himalayan Vistas",
  description:
    "Browse all Himalayan trekking packages — filter by difficulty, region, duration and price.",
};

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TripsPage({ searchParams }: Props) {
  const sp = await searchParams;

  // Parse URL search params server-side
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

  // This function is the one you replace with a Supabase query
  const { trips, total, totalPages } = queryTrips(filters);

  return (
    <>
      <TopNavBar activePage="trips" />
      <main className="flex flex-col min-h-screen bg-surface">
        <div className="max-w-7xl w-full mx-auto px-6 md:px-8 py-12 grow">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Sidebar filters — needs Suspense because it uses useSearchParams */}
            <Suspense fallback={<div className="w-80 shrink-0" />}>
              <TripsFilters />
            </Suspense>

            {/* Results */}
            <section className="grow min-w-0">
              {/* Sort bar */}
              <Suspense fallback={null}>
                <TripsSortBar total={total} />
              </Suspense>

              {/* Grid */}
              {trips.length === 0 ? (
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
                  {trips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
              )}

              {/* Pagination */}
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
