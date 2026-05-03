import Link from "next/link";
import { TripListing, Difficulty } from "@/lib/tripListings";

const difficultyConfig: Record<
  Difficulty,
  { bg: string; dot: string; label: string }
> = {
  Easy: {
    bg: "bg-secondary-container text-on-secondary-fixed-variant",
    dot: "bg-secondary",
    label: "Easy",
  },
  Moderate: {
    bg: "bg-secondary text-on-secondary",
    dot: "bg-secondary-fixed",
    label: "Moderate",
  },
  Strenuous: {
    bg: "bg-tertiary-container text-on-tertiary-container",
    dot: "bg-tertiary-fixed-dim",
    label: "Strenuous",
  },
  Challenging: {
    bg: "bg-primary text-on-primary",
    dot: "bg-primary-fixed-dim",
    label: "Challenging",
  },
  Remote: {
    bg: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    dot: "bg-tertiary-fixed-dim",
    label: "Remote",
  },
};

export default function TripCard({ trip }: { trip: TripListing }) {
  const diff = difficultyConfig[trip.difficulty];

  return (
    <article className="bg-surface-container-lowest rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-surface-container-high flex flex-col">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          alt={trip.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          src={trip.image}
        />
        <div
          className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 font-sans ${diff.bg}`}
        >
          <span className={`w-2 h-2 rounded-full ${diff.dot}`} />
          {diff.label}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-serif text-2xl font-semibold text-primary leading-tight">
            {trip.title}
          </h2>
          <button
            aria-label="Save trek"
            className="material-symbols-outlined text-outline hover:text-primary transition-colors cursor-pointer shrink-0"
          >
            bookmark
          </button>
        </div>

        <p className="text-base text-on-surface-variant mb-6 grow font-sans">
          {trip.description}
        </p>

        <div className="border-t border-surface-container py-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-widest text-outline font-sans">
                Duration
              </span>
              <span className="text-base font-bold text-primary font-sans">
                {trip.duration} Days
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-widest text-outline font-sans">
                Price
              </span>
              <span className="text-base font-bold text-primary font-sans">
                From ${trip.priceFrom.toLocaleString()}
              </span>
            </div>
          </div>
          <Link
            href={`/treks/${trip.slug}`}
            className="bg-primary text-on-primary px-6 py-3 text-xs font-semibold rounded-lg hover:bg-primary-container transition-colors font-sans"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
