import Link from "next/link";
import { Region, Difficulty } from "@/lib/regions";

const difficultyColors: Record<Difficulty, string> = {
  Easy: "bg-[#c7ebd4] text-[#2e4d3c]",
  Moderate: "bg-[#d6e3ff] text-[#2e476f]",
  Strenuous: "bg-[#002046] text-white",
  Challenging: "bg-[#4f2e09] text-[#ffdcbf]",
  Remote: "bg-[#ffdcbf] text-[#633f19]",
};

export default function RegionTreks({ region }: { region: Region }) {
  return (
    <section className="bg-[#faf9f7] py-30 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
          <button className="hidden md:block border-b border-primary text-primary text-xs font-semibold uppercase tracking-widest pb-1 hover:text-secondary hover:border-secondary transition-all font-sans">
            View All Treks
          </button>
        </div>

        {/* Trek Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {region.treks.map((trek) => (
            <Link
              key={trek.id}
              href={`/treks/${trek.slug}`}
              className="group bg-white overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-3/4">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={trek.title}
                  src={trek.image}
                />
                <div
                  className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur font-sans ${difficultyColors[trek.difficulty]}`}
                >
                  {trek.difficulty.toUpperCase()}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 grow flex flex-col">
                <h3 className="font-serif text-[32px] leading-10 font-semibold text-primary mb-4 group-hover:text-secondary transition-colors">
                  {trek.title}
                </h3>
                <p className="text-base text-on-surface-variant mb-6 grow font-sans">
                  {trek.description}
                </p>
                <div className="pt-6 border-t border-[#e3e2e0] flex justify-between items-center">
                  <div className="flex items-center gap-2 text-outline">
                    <span className="material-symbols-outlined text-sm">
                      schedule
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest font-sans">
                      {trek.duration}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold uppercase tracking-widest text-outline font-sans">
                      From
                    </p>
                    <p className="font-serif text-xl font-semibold text-primary">
                      ${trek.priceFrom.toLocaleString()}
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
