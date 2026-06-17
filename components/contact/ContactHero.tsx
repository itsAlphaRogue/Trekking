import Image from "next/image";

export default function ContactHero({ heroImage }: { heroImage?: string }) {
  return (
    <section className="relative h-102.25 overflow-hidden flex items-center">
      <Image
        className="absolute inset-0 w-full h-full object-cover"
        alt="Himalayan peaks in morning mist"
        src={heroImage || "/default.png"}
        fill
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-primary/20 backdrop-brightness-75" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-8 w-full">
        <h1 className="font-serif text-5xl md:text-[64px] leading-tight md:leading-18 tracking-tight font-bold text-on-primary max-w-2xl">
          Connect with the Peaks
        </h1>
        <p className="text-lg leading-7 text-stone-100 mt-4 max-w-xl font-sans">
          Your journey to the high Himalayas begins with a single conversation.
          Our expedition experts are ready to guide you.
        </p>
      </div>
    </section>
  );
}
