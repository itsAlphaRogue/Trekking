export default function DestinationsTrust() {
  return (
    <section className="bg-stone-100 border-y border-stone-200 py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-16 items-center">
        {/* Left: trust content */}
        <div>
          <h2 className="font-serif text-[40px] leading-12 font-semibold text-primary mb-6">
            Expert Guidance for High Altitudes
          </h2>
          <p className="text-lg leading-7 text-on-surface-variant mb-8 font-sans">
            Every journey is backed by our signature safety protocol, ensuring
            your comfort as you push your limits across the highest peaks on
            Earth.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-secondary">
                verified_user
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary font-sans">
                  Safety First
                </p>
                <p className="text-sm text-on-surface-variant font-sans">
                  Oximeters &amp; satellite phones on all treks.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-secondary">
                eco
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary font-sans">
                  Eco-Certified
                </p>
                <p className="text-sm text-on-surface-variant font-sans">
                  Zero-waste trekking protocols.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: email capture */}
        <div className="bg-white p-10 border border-stone-200 shadow-sm">
          <h4 className="font-serif text-[32px] leading-10 font-semibold text-primary mb-4">
            Start Planning
          </h4>
          <p className="text-base text-on-surface-variant mb-6 font-sans">
            Get our curated destination guide and seasonal trekking calendar.
          </p>
          <div className="flex flex-col gap-4">
            <input
              className="bg-[#faf9f7] border-b border-secondary p-4 text-base font-sans focus:border-primary focus:outline-none transition-all placeholder:text-on-surface-variant/60"
              placeholder="Your Email Address"
              type="email"
            />
            <button className="bg-primary text-white py-4 font-serif font-bold hover:opacity-90 transition-opacity">
              Request Guide
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
