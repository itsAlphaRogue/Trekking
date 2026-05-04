import { Region } from "@/lib/regions";

export default function RegionHero({ region }: { region: Region }) {
  return (
    <header className="relative h-[921px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img className="w-full h-full object-cover" alt={region.name} src={region.heroImage} />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full">
        <div className="max-w-2xl">
          <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] mb-6 font-sans">
            {region.heroLabel}
          </span>
          <h1 className="font-serif text-5xl md:text-[64px] leading-tight md:leading-[72px] tracking-tight font-bold text-on-primary mb-6">
            {region.name}: {region.tagline}
          </h1>
          <p className="text-lg leading-relaxed text-on-primary/90 italic max-w-lg font-sans">
            {region.description}
          </p>
        </div>
      </div>
    </header>
  );
}
