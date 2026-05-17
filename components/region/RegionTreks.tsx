import Link from "next/link";
import Image from "next/image";

type Difficulty = "Easy" | "Moderate" | "Strenuous" | "Challenging" | "Remote";

interface Trek {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  difficulty: string;
  duration: number | null;
  price_from: number | null;
  image: string | null;
}

interface Props {
  treks: Trek[];
}

const difficultyColors: Record<Difficulty, string> = {
  Easy: "bg-secondary-container text-on-secondary-fixed-variant",
  Moderate: "bg-primary-fixed text-on-primary-fixed-variant",
  Strenuous: "bg-primary text-on-primary",
  Challenging: "bg-tertiary-container text-on-tertiary-container",
  Remote: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
};

function getDifficultyColor(difficulty: string): string {
  return (
    difficultyColors[difficulty as Difficulty] ??
    "bg-surface-container text-on-surface-variant"
  );
}

export default function RegionTreks({ treks }: Props) {
  if (treks.length === 0) return null;

  return (
    <section className="bg-surface py-30 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div className="max-w-xl">
            <h2 className="font-serif text-[40px] leading-12 font-semibold text-primary mb-4">
              Curated Expeditions
            </h2>
            <p className="text-lg text-on-surface-variant font-sans">
              Hand-picked journeys that blend physical challenge with profound
              cultural immersion.
            </p>
          </div>
          <Link
            href="/trips"
            className="hidden md:block border-b border-primary text-primary text-xs font-semibold uppercase tracking-widest pb-1 hover:text-secondary hover:border-secondary transition-all font-sans"
          >
            View All Treks
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {treks.map((trek) => (
            <Link
              key={trek.id}
              href={`/treks/${trek.slug}`}
              className="group bg-surface-container-lowest overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative overflow-hidden aspect-3/4">
                <Image
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={trek.title}
                  src={trek.image || "/fallback.png"}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {trek.difficulty && (
                  <div
                    className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur font-sans ${getDifficultyColor(trek.difficulty)}`}
                  >
                    {trek.difficulty.toUpperCase()}
                  </div>
                )}
              </div>

              <div className="p-8 grow flex flex-col">
                <h3 className="font-serif text-[32px] leading-10 font-semibold text-primary mb-4 group-hover:text-secondary transition-colors">
                  {trek.title}
                </h3>
                <p className="text-base text-on-surface-variant mb-6 grow font-sans">
                  {trek.description}
                </p>
                <div className="pt-6 border-t border-surface-variant flex justify-between items-center">
                  <div className="flex items-center gap-2 text-outline">
                    <span className="material-symbols-outlined text-sm">
                      schedule
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest font-sans">
                      {trek.duration ? `${trek.duration} Days` : "TBD"}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold uppercase tracking-widest text-outline font-sans">
                      From
                    </p>
                    <p className="font-serif text-xl font-semibold text-primary">
                      {trek.price_from ? `$${trek.price_from.toLocaleString()}` : "Inquire"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
