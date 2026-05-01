export default function HeroSection() {
  return (
    <section className="relative h-230.25 flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Mount Everest"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrgoSqs4cPQK1mamJWCRgY6Gm__s3TK3uTF2gVhwu6Qx6wXw8bzTW3lcHsvFbHGqFgWvoP28sX979m_SC-3eyPhYC93hmVE04hjgKQy-5CFWk-K6mss85ILUTusAB5WyvjqzvuPf31ESLf2Bv-w0QsLNc0rx5PbF4AkdhC00IqHoEJQlhNStnvXmTTTixSlkB-7Esb4tpSL_IRkJnRm-PR2iwId77btUUz7cIKo3AE2nr0rPc8iJSrmSJ-MhLdCKnbtTEsi4xc8vnz"
        />
        <div className="absolute inset-0 bg-linear-to-r from-primary/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
        <div className="max-w-2xl">
          <span className="text-white text-xs font-semibold uppercase tracking-widest mb-4 block font-sans">
            Peak Performance Guiding
          </span>
          <h1 className="text-white font-serif text-5xl md:text-[64px] leading-tight md:leading-18 tracking-tight font-bold mb-8">
            Scale the Roof of the World.
          </h1>
          <p className="text-white/90 text-lg leading-7 mb-10 max-w-lg font-sans">
            Experience the raw majesty of the Himalayas with elite-level safety
            protocols and premium high-altitude support.
          </p>

          {/* Search Bar */}
          <div className="bg-white/10 backdrop-blur-xl p-2 flex flex-col md:flex-row items-center gap-4 border border-white/20">
            <div className="flex-1 w-full px-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-white/70">
                explore
              </span>
              <input
                className="bg-transparent border-none text-white placeholder-white/60 focus:outline-none focus:ring-0 w-full text-base"
                placeholder="Find Your Adventure..."
                type="text"
              />
            </div>
            <div className="h-8 w-px bg-white/20 hidden md:block" />
            <div className="flex-1 w-full px-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-white/70">
                calendar_today
              </span>
              <select className="bg-transparent border-none text-white focus:outline-none focus:ring-0 w-full text-base appearance-none cursor-pointer">
                <option className="text-slate-900">Season: Spring 2024</option>
                <option className="text-slate-900">Autumn 2024</option>
              </select>
            </div>
            <button className="w-full md:w-auto bg-white text-[#1B365D] px-8 py-4 text-xs font-semibold uppercase tracking-widest hover:bg-stone-100 transition-colors font-sans">
              Search Treks
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
