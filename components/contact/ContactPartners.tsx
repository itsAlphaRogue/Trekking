const partners = ["PATA", "TAAN", "NTB", "ISO 9001"];

export default function ContactPartners() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 border-t border-surface-variant">
      <div className="flex flex-wrap justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary w-full text-center lg:text-left mb-2 font-sans">
          Recognized By
        </p>
        <div className="flex flex-1 justify-between items-center gap-8 md:gap-16 flex-wrap">
          {partners.map((p) => (
            <span
              key={p}
              className="font-serif text-2xl md:text-3xl font-bold text-primary"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
