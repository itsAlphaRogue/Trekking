import Link from "next/link";

export default function FeaturedTreks() {
  return (
    <section className="py-30 max-w-7xl mx-auto px-6 md:px-8 textured-bg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
        <div>
          <h2 className="font-serif text-[40px] leading-12 font-semibold text-primary mb-4">
            Featured Expeditions
          </h2>
          <p className="text-base text-on-surface-variant max-w-md font-sans">
            Our most sought-after journeys, curated for those who demand the
            extraordinary.
          </p>
        </div>
        <Link
          href="#"
          className="text-xs font-semibold uppercase tracking-widest border-b border-primary text-primary pb-1 hover:opacity-70 transition-opacity whitespace-nowrap font-sans"
        >
          View All Treks
        </Link>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-200">
        {/* Everest Base Camp — large left */}
        <div className="md:col-span-8 group relative overflow-hidden bg-surface-container-high h-100 md:h-auto">
          <img
            alt="Everest Base Camp Trek"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCY3lzc9xdBV_sYus9fvVB6bVDpqabM4OxnqhPGMAH3rhmf6OApTgk-8GRE7qOOznW4-OQyzYE39pVauVr0MtoLegvArY9vrCp1YVhjRlkRcX9Vn12l8zC7cwgVmRZXLKiey29cJM2J7Qqt_dJG2sJiHxlZiuZY0Mm00pj_Y_rhs5x8qVk6furygaz8Gh9GpXrhq37rcWTK-gne8jAfkmYPg-xksJ3UOjvg8Q97j6oEc7NDToxc5K-s7HRWbi5HS9exgTSRDJZGJ-Gm"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
            <div className="flex gap-2 mb-4">
              <span className="bg-primary text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 font-sans">
                STRENUOUS
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 font-sans">
                14 DAYS
              </span>
            </div>
            <h3 className="text-white font-serif text-[32px] leading-10 font-semibold mb-2">
              Everest Base Camp Luxury
            </h3>
            <p className="text-white/80 text-base mb-6 max-w-md font-sans">
              The classic journey, elevated with premium tea house upgrades and
              private logistics.
            </p>
            <button className="bg-white text-primary px-8 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-primary hover:text-white transition-all font-sans">
              Explore Expedition
            </button>
          </div>
        </div>

        {/* Annapurna Circuit — small right */}
        <div className="md:col-span-4 group relative overflow-hidden bg-surface-container-high h-75 md:h-auto">
          <img
            alt="Annapurna Circuit"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgakyjk8UIHXM0ZqxxVaRpjSl9O5pjjjOkzcAIYNoYfU5SxJF2-GcpX7mDqCaMfdIVWcKVWic9BSzRcTNbarO6-8Y_Ow8SQTelmv89dpMf9Wjy1_zs1TmQFkJ4Lyfp5bvbDm0RXNUvMsnyhVqrQ9OkxvcI6Bu9XzQ8K4vq2sBHOEa2r04NukpMI86ZppgRAr4OdycoMFlQ2Uz3vWUVxjls_bh_Dkr2i3LYXP0I48s_9rWKYdQ1KV1VJnybvm4WnM0ZQO2D92W9_sZ8"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
            <div className="flex gap-2 mb-4">
              <span className="bg-secondary text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 font-sans">
                MODERATE
              </span>
            </div>
            <h3 className="text-white font-serif text-[32px] leading-10 font-semibold mb-2">
              Annapurna Circuit
            </h3>
            <p className="text-white/80 text-base mb-6 font-sans">
              A cultural odyssey through diverse landscapes and ancient
              villages.
            </p>
            <button className="border border-white text-white px-8 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-white hover:text-primary transition-all font-sans">
              Details
            </button>
          </div>
        </div>

        {/* Upper Mustang — small left */}
        <div className="md:col-span-4 group relative overflow-hidden bg-surface-container-high h-75 md:h-auto">
          <img
            alt="Upper Mustang"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_kstuF48RGFkQbf4KAyt8HrfqFainFIh1tz9q4BqUKc0NfpT0-gP5Ckadcgq8-tF8rarESuMGk2qPXHanIkm1_kZ_L6N7dRZZdQ2Qe7XTE8-MGMRltqAJExUsJN3iXWB2oRs45BeQQsLAf9zViThPyjW-GCYvc48P4B8U743YeX_hEJVolJbyWqxqkpF0roWpkBRvCrLD4Wmsb0sP37BKbL-M-3LaFLsR_yb5P3jWPvi1JJM4Cn-RQ-fb71fwi_E-cMFO_kp-zqS4"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
            <div className="flex gap-2 mb-4">
              <span className="bg-tertiary-container text-tertiary-fixed text-xs font-semibold uppercase tracking-widest px-3 py-1 font-sans">
                REMOTE
              </span>
            </div>
            <h3 className="text-white font-serif text-[32px] leading-10 font-semibold mb-2">
              Upper Mustang
            </h3>
            <button className="text-white text-xs font-semibold uppercase tracking-widest flex items-center gap-2 hover:translate-x-2 transition-transform font-sans">
              View Trek{" "}
              <svg
                className="h-3 fill-white/80"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Gokyo Lakes — large right */}
        <div className="md:col-span-8 group relative overflow-hidden bg-surface-container-high h-100 md:h-auto">
          <img
            alt="Gokyo Lakes"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmi-NgPjrRpwouageJLRi_TPnjGyzpA2VgDCc_uHE-EvpxKmGqlGNTupA-P_0r37piXbh1GNz7q-toGiPrtXdjAHhlWbjZqTDdwsdIPmMCF0Wjh-t0qi3ogQb4wfllUoLRe472hvaUe4Oa8OX8v7vMp-iodHwJq0rb1iN7te8GP6KlNepT7YTIqExDG-w_pPy6gP_TlYFZP4mCE7b_cc7SqSa7fv4wuG-DEfiXkrEYpQNFLr5kFLJpmWnJ90cY6VV92KBQgcdWV41c"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
            <h3 className="text-white font-serif text-[32px] leading-10 font-semibold mb-2">
              Gokyo Lakes &amp; Cho La Pass
            </h3>
            <p className="text-white/80 text-base max-w-lg mb-4 font-sans">
              Venture beyond the main trail to the shimmering turquoise waters
              of Gokyo.
            </p>
            <button className="bg-white text-primary px-8 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-primary hover:text-white transition-all font-sans">
              Plan Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
