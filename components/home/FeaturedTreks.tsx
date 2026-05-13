import Link from "next/link";
import { queryTreks } from "@/lib/supabase/queries/treks";

export default async function FeaturedTreks() {
  const { treks } = await queryTreks({ isFeatured: true });

  // Map treks to bento positions (max 4 for the current layout)
  const [t0, t1, t2, t3] = treks;

  return (
    <section className="py-30 max-w-7xl mx-auto px-6 md:px-8 textured-bg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
        <div>
          <h2 className="font-serif text-[40px] leading-12 font-semibold text-primary mb-4">
            Featured Expeditions
          </h2>
          <p className="text-base text-on-surface-variant max-w-md font-sans">
            Our most sought after journeys, curated for those who demand the
            extraordinary.
          </p>
        </div>
        <Link
          href="/treks"
          className="text-xs font-semibold uppercase tracking-widest border-b border-primary text-primary pb-1 hover:opacity-70 transition-opacity whitespace-nowrap font-sans"
        >
          View All Treks
        </Link>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-200">
        {/* Position 1 — large left */}
        {t0 && (
          <div className="md:col-span-8 group relative overflow-hidden bg-surface-container-high h-100 md:h-auto">
            {t0.image && (
              <img
                alt={t0.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={t0.image}
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
              <div className="flex gap-2 mb-4">
                <span className="bg-primary text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 font-sans">
                  {t0.difficulty}
                </span>
                {t0.duration > 0 && (
                  <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 font-sans">
                    {t0.duration} DAYS
                  </span>
                )}
              </div>
              <h3 className="text-white font-serif text-[32px] leading-10 font-semibold mb-2">
                {t0.title}
              </h3>
              <p className="text-white/80 text-base mb-6 max-w-md font-sans line-clamp-2">
                {t0.description}
              </p>
              <Link
                href={`/treks/${t0.slug}`}
                className="inline-block bg-white text-primary px-8 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-primary hover:text-white transition-all font-sans"
              >
                Explore Expedition
              </Link>
            </div>
          </div>
        )}

        {/* Position 2 — small right */}
        {t1 && (
          <div className="md:col-span-4 group relative overflow-hidden bg-surface-container-high h-75 md:h-auto">
            {t1.image && (
              <img
                alt={t1.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={t1.image}
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
              <div className="flex gap-2 mb-4">
                <span className="bg-secondary text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 font-sans">
                  {t1.difficulty}
                </span>
              </div>
              <h3 className="text-white font-serif text-[32px] leading-10 font-semibold mb-2">
                {t1.title}
              </h3>
              <p className="text-white/80 text-base mb-6 font-sans line-clamp-2">
                {t1.description}
              </p>
              <Link
                href={`/treks/${t1.slug}`}
                className="inline-block border border-white text-white px-8 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-white hover:text-primary transition-all font-sans"
              >
                Details
              </Link>
            </div>
          </div>
        )}

        {/* Position 3 — small left */}
        {t2 && (
          <div className="md:col-span-4 group relative overflow-hidden bg-surface-container-high h-75 md:h-auto">
            {t2.image && (
              <img
                alt={t2.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={t2.image}
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
              <div className="flex gap-2 mb-4">
                <span className="bg-tertiary-container text-tertiary-fixed text-xs font-semibold uppercase tracking-widest px-3 py-1 font-sans">
                  {t2.difficulty}
                </span>
              </div>
              <h3 className="text-white font-serif text-[32px] leading-10 font-semibold mb-2">
                {t2.title}
              </h3>
              <Link
                href={`/treks/${t2.slug}`}
                // className="text-white text-xs font-semibold uppercase tracking-widest flex items-center gap-2 hover:translate-x-2 transition-transform font-sans"
                className="border w-fit flex items-center border-white text-white px-8 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-white hover:text-primary transition-all font-sans"
              >
                View Trek{" "}
                <svg
                  className="h-3 fill-white/80"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z" />
                </svg>
              </Link>
            </div>
          </div>
        )}

        {/* Position 4 — large right */}
        {t3 && (
          <div className="md:col-span-8 group relative overflow-hidden bg-surface-container-high h-100 md:h-auto">
            {t3.image && (
              <img
                alt={t3.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={t3.image}
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
              <h3 className="text-white font-serif text-[32px] leading-10 font-semibold mb-2">
                {t3.title}
              </h3>
              <p className="text-white/80 text-base max-w-lg mb-4 font-sans line-clamp-2">
                {t3.description}
              </p>
              <Link
                href={`/treks/${t3.slug}`}
                className="inline-block bg-white text-primary px-8 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-primary hover:text-white transition-all font-sans"
              >
                Plan Journey
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
