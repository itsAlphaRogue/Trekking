import Link from "next/link";
import { TrekListing, Difficulty } from "@/lib/supabase/queries/treks";

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

export default function TrekCard({ trek }: { trek: TrekListing }) {
  const diff = difficultyConfig[trek.difficulty];

  return (
    <article className="bg-surface-container-lowest rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-surface-container-high flex flex-col">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          alt={trek.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          src={trek.image || "fallback.png"}
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
            {trek.title}
          </h2>
          <button
            aria-label="Save trek"
            className="text-outline hover:text-primary transition-colors cursor-pointer shrink-0"
          >
            <svg
              className="h-8 fill-primary"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
            </svg>
          </button>
        </div>

        <p className="text-base text-on-surface-variant mb-6 grow font-sans">
          {trek.description}
        </p>

        <div className="border-t border-surface-container py-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {trek.duration > 0 && (
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-widest text-outline font-sans">
                  Duration
                </span>
                <span className="text-base font-bold text-primary font-sans">
                  {trek.duration} Days
                </span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-widest text-outline font-sans">
                Price
              </span>
              <span className="text-base font-bold text-primary font-sans">
                From ${trek.priceFrom.toLocaleString()}
              </span>
            </div>
          </div>
          <Link
            href={`/treks/${trek.slug}`}
            className="bg-primary text-on-primary px-6 py-3 text-xs font-semibold rounded-lg hover:bg-primary-container transition-colors font-sans"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
