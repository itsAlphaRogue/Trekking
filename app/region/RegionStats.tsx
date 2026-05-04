import { Region } from "@/lib/regions";

export default function RegionStats({ region }: { region: Region }) {
  const stats = [
    { icon: "terrain", label: "Avg Elevation", value: region.stats.elevation },
    { icon: "speed", label: "Difficulty", value: region.stats.difficulty },
    { icon: "calendar_month", label: "Best Season", value: region.stats.bestSeason },
  ];

  return (
    <section className="py-[120px] px-6 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-surface-container-low p-10 flex flex-col justify-between border-b-2 border-secondary">
            <span className="material-symbols-outlined text-secondary text-4xl mb-6">{stat.icon}</span>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-outline mb-2 font-sans">{stat.label}</h3>
              <p className="font-serif text-[32px] leading-[40px] font-semibold text-primary">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
