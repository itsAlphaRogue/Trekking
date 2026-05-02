import { TrekDetail } from "@/lib/treks";

export default function TrekHero({ trek }: { trek: TrekDetail }) {
  return (
    <section className="relative h-[819px] flex items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          alt={trek.title}
          className="w-full h-full object-cover"
          src={trek.heroImage}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full pb-16">
        <div className="inline-block bg-secondary text-on-secondary px-4 py-1 text-xs font-semibold uppercase tracking-widest mb-4 font-sans">
          {trek.regionLabel}
        </div>
        <h1 className="font-serif text-5xl md:text-[64px] leading-tight md:leading-[72px] tracking-tight font-bold text-on-primary mb-4">
          {trek.title}
        </h1>
        <p className="text-lg leading-7 text-on-primary/90 max-w-2xl font-sans">
          {trek.tagline}
        </p>
      </div>
    </section>
  );
}
