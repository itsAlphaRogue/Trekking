import Image from "next/image";

export default function DestinationsHero({
  heroImage,
}: {
  heroImage?: string;
}) {
  return (
    <section className="relative h-153.5 flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          alt="Panoramic Himalayan mountain range"
          className="w-full h-full object-cover"
          src={heroImage || "/default.png"}
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,28,27,0.4), rgba(26,28,27,0.05))",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white mb-4 block font-sans">
            Unrivaled Expeditions
          </span>
          <h1 className="font-serif text-5xl md:text-[64px] leading-tight md:leading-18 tracking-tight font-bold text-white mb-6">
            Sacred Peaks &amp; Hidden Valleys
          </h1>
          <p className="text-lg leading-7 text-stone-100/90 max-w-lg font-sans">
            Explore the curated selection of Nepal&rsquo;s most iconic trekking
            regions, where luxury meets the rugged heart of the Himalayas.
          </p>
        </div>
      </div>
    </section>
  );
}
