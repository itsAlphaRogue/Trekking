export default function WeatherAndSocialProof() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-30 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Weather Widget */}
      <div className="bg-primary text-white p-8 flex flex-col justify-between h-64">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest opacity-60 font-sans">
            Current Conditions
          </span>
          <h4 className="font-serif text-[32px] leading-10 font-semibold mt-2">
            Lukla Gateway
          </h4>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <div className="text-4xl font-bold font-serif">12°C</div>
            <div className="text-base opacity-80 font-sans">Clear Skies</div>
          </div>
          <span className="material-symbols-outlined text-5xl">wb_sunny</span>
        </div>
      </div>

      {/* Testimonial */}
      <div className="md:col-span-2 border border-outline-variant p-8 flex flex-col justify-between h-64">
        <p className="font-serif text-[32px] leading-10 font-semibold text-slate-800 italic">
          &ldquo;The most professional trekking outfit I&rsquo;ve ever used.
          Their attention to safety and local knowledge made my Everest dream a
          reality.&rdquo;
        </p>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#e3e2e0]" />
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary font-sans">
              Julianne Moore
            </div>
            <div className="text-sm text-on-surface-variant font-sans">
              Expedition 2023
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
