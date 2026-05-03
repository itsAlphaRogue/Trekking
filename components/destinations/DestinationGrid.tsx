export default function DestinationGrid() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 md:px-8">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
        <div>
          <h2 className="font-serif text-[40px] leading-12 font-semibold text-primary mb-4">
            Major Trekking Regions
          </h2>
          <p className="text-base text-on-surface-variant max-w-xl font-sans">
            From the legendary trails of Everest to the quiet paths of Manaslu,
            find your next high-altitude adventure.
          </p>
        </div>
        <div className="hidden md:flex gap-4">
          <span className="text-xs font-semibold text-on-surface-variant px-4 py-2 border border-outline-variant rounded-full font-sans">
            4 Regions Available
          </span>
        </div>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Everest Region — large top left */}
        <div className="md:col-span-8 group relative overflow-hidden bg-white border border-stone-100">
          <div className="aspect-video overflow-hidden">
            <img
              alt="Mount Everest"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA-jp-v2aAhfGXwN-tg1bVF4gCND8KJpkC_1P1X-gEitYfopr8AHlbJa-OlQTKqTb2qZ49GlH6h5q_pM7lJL8xGeN7Wn5VKr9sn07R8z-SS_5rtwqLZ8ICkTNKZR9NMJU-m-01JZ0Q34Aj8MD9KDFMPcNe7PSXmiRm7SMY-Dr-8f2D8UOx5fV_svLJATkcwqu_DvQfMXFJ1YMskEdYCR0lzAC6SHc8X2G_zIX10OSCZ-NZ7YJkduOd7VYNW-zWudAIbBBpIoXKQzFp"
            />
          </div>
          <div className="p-8 md:p-10 flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-on-secondary-fixed-variant/10 text-on-secondary-fixed-variant px-3 py-1 text-xs font-semibold uppercase tracking-wider font-sans">
                  Iconic
                </span>
                <span className="text-on-tertiary-container text-xs font-semibold flex items-center gap-1 font-sans">
                  <svg
                    className="h-5 fill-on-tertiary-container"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M720-480v-168l-64 64-56-56 160-160 160 160-56 57-64-64v167h-80ZM40-80l240-320 180 240h300L560-426 460-294l-50-66 150-200L920-80H40Zm420-80Z" />
                  </svg>
                  8,848m
                </span>
              </div>
              <h3 className="font-serif text-[32px] leading-10 font-semibold text-primary mb-4">
                Everest Region
              </h3>
              <p className="text-base text-on-surface-variant mb-6 font-sans">
                Home to the world&rsquo;s highest peak, the Khumbu valley offers
                a spiritual journey through Sherpa culture and legendary glacial
                landscapes.
              </p>
            </div>
            <button className="bg-primary-container text-white font-serif px-8 py-4 whitespace-nowrap self-start md:self-end hover:bg-primary transition-colors active:scale-95 duration-200">
              View Trips
            </button>
          </div>
        </div>

        {/* Annapurna Region — top right */}
        <div className="md:col-span-4 group relative flex flex-col bg-white border border-stone-100">
          <div className="aspect-4/5 overflow-hidden">
            <img
              alt="Annapurna Base Camp"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbyilJMjg2y5GTKzj_5m7KFrQ19In2XvZaLyCyRH6JpW3HUSFxJursJFkKkqCNm6SEzKp-XacFLDSYmDToVJCWj6tSy3raHYz5hLUGKGT1NNXDTgENt0z7cmliuamyTzudgojIdUhMd-pQRFICijO7g1LBZ2jnoxKCESsRUa7xBhzpn3YsVpj_3EF4mYCXm0A03XxpfHEKOo_rbWwbaH6XTtKQEpqieDCCLUkA8TGoOcXdpT5H_9e9FLViwmFyLtWPblt6piR_813W"
            />
          </div>
          <div className="p-8 flex flex-col flex-1">
            <span className="text-secondary text-xs font-semibold uppercase tracking-widest mb-3 font-sans">
              Diverse Landscapes
            </span>
            <h3 className="font-serif text-[32px] leading-10 font-semibold text-primary mb-3">
              Annapurna Region
            </h3>
            <p className="text-base text-on-surface-variant mb-8 flex-1 font-sans">
              A kaleidoscope of terrains ranging from lush subtropical forests
              to the arid high-altitude deserts of Mustang.
            </p>
            <button className="border border-primary text-primary font-serif px-6 py-3 hover:bg-primary hover:text-white transition-all active:scale-95 duration-200">
              View Trips
            </button>
          </div>
        </div>

        {/* Langtang Valley — bottom left */}
        <div className="md:col-span-4 group relative flex flex-col bg-white border border-stone-100">
          <div className="aspect-4/5 overflow-hidden">
            <img
              alt="Langtang Valley"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHSYvqHqr8HL9aGUKW68hU1yeZ_GOtdEyJcmRzjuVGbim9yaN7AKXCYFANtLHMnaKYK_kYW28urHdRcVFxpodG16vBKVYeFa0smW7cxVSzvyE5SlUZQMGaVq3gpma0959hS3R2v93lqkRGi9x0m0dsqAia6zRNczuBj2o4KecnD1raosLh9uwlJaxb_9mTVu1RQ39w7KpI8G0kGeHhNQeytAZPmwV1JPfej85gasqY_LHabG6z7Cta91cy7aFevzFDSWxF6xSf1fQk"
            />
          </div>
          <div className="p-8 flex flex-col flex-1">
            <span className="text-secondary text-xs font-semibold uppercase tracking-widest mb-3 font-sans">
              The Valley of Glaciers
            </span>
            <h3 className="font-serif text-[32px] leading-10 font-semibold text-primary mb-3">
              Langtang Valley
            </h3>
            <p className="text-base text-on-surface-variant mb-8 flex-1 font-sans">
              Easily accessible yet profoundly wild, Langtang offers intimate
              mountain views and rich Tamang heritage.
            </p>
            <button className="border border-primary text-primary font-serif px-6 py-3 hover:bg-primary hover:text-white transition-all active:scale-95 duration-200">
              View Trips
            </button>
          </div>
        </div>

        {/* Manaslu Circuit — bottom right */}
        <div className="md:col-span-8 group relative overflow-hidden bg-white border border-stone-100">
          <div className="grid md:grid-cols-2 h-full min-h-100">
            <div className="overflow-hidden">
              <img
                alt="Manaslu Peak"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV22A9-_QcBXJLB4zeyGcpq6jNIrvWjep-hb4mYMVGYnjj5W7F-mbHgGmAvgDg3m8rCGLnOgu_T1Ruq8HXqbRRlIo5eMSrQq7RGcU-y9UJFFMVXZ2xIVn1DNdlWs-XvqBYvTnA20Mxjlau3wF_JLNBXoTxY326NKAbfMq8rKE4WUv6s5rAg77Si1puFgvPgeVDWEUaNSdUOxVDuFw_rOzOxEe_UTB6yQUx77tPWoqqvU1Vo6IzVbPX3S-RcBWdFfQGTJDb1ppwnqUC"
              />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-3 py-1 text-xs font-semibold uppercase tracking-wider font-sans">
                  Off the Beaten Path
                </span>
              </div>
              <h3 className="font-serif text-[32px] leading-10 font-semibold text-primary mb-4">
                Manaslu Region
              </h3>
              <p className="text-base text-on-surface-variant mb-8 font-sans">
                The &ldquo;Mountain of the Spirit&rdquo; provides a remote
                trekking experience through restricted areas and ancient
                Tibetan-style villages.
              </p>
              <button className="bg-primary-container text-white font-serif px-8 py-4 self-start hover:bg-primary transition-colors active:scale-95 duration-200">
                View Trips
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
