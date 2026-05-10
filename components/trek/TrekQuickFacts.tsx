import { TrekDetail } from "@/lib/supabase/queries/treks";

export default function TrekQuickFacts({ trek }: { trek: TrekDetail }) {
  const facts = [
    { label: "Duration",   value: trek.duration ? `${trek.duration} Days` : "—", color: "text-primary" },
    { label: "Max Alt",    value: trek.maxAltitude  ?? "—",                       color: "text-primary" },
    { label: "Difficulty", value: trek.difficulty   ?? "—",                       color: "text-secondary" },
    { label: "Group Size", value: trek.groupSize    ?? "—",                       color: "text-primary" },
  ];

  return (
    <section className="bg-surface-container-high border-b border-outline-variant">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant font-sans">
                {fact.label}
              </span>
              <span className={`font-serif text-[32px] leading-[40px] font-semibold ${fact.color}`}>
                {fact.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
