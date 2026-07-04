import Image from "next/image";

interface WhyTrekWithUsProps {
  companyName?: string;
  imageUrl?: string;
}

export default function WhyTrekWithUs({
  companyName = "Himalayan Vistas",
  imageUrl = "https://images.unsplash.com/photo-1551632432-c735e8326f67?q=80&w=2070&auto=format&fit=crop",
}: WhyTrekWithUsProps) {
  return (
    <section className="bg-surface-container-low py-30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 items-center">
          {/* Image column */}
          <div className="relative lg:pr-12 group">
            {/* Background Accent Frame - Inspired by Himalayan adventure branding */}
            <div className="absolute inset-0 border border-secondary/20 translate-x-6 translate-y-6 z-0 hidden md:block transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4"></div>

            <div className="aspect-4/5 bg-surface-container-highest overflow-hidden relative shadow-2xl border-4 border-white z-10">
              <Image
                alt="Sherpa Guide Portrait"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                src={imageUrl}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle depth overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Expertise Card - Premium Glassmorphism design */}
            <div className="absolute -bottom-10 -right-6 md:-bottom-14 md:-right-10 bg-white/95 backdrop-blur-xl p-8 md:p-10 shadow-2xl border border-stone-100 max-w-70 md:max-w-sm hidden md:block z-20 transition-all duration-500 hover:-translate-y-2">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-0.5 bg-secondary/40"></span>
                    <span className="text-secondary font-bold text-xs tracking-[0.2em] uppercase">
                      20+ Years
                    </span>
                  </div>
                  <h4 className="font-serif text-2xl md:text-[32px] leading-[1.15] font-bold text-primary">
                    Local Himalayan <br /> Expertise
                  </h4>
                </div>

                <p className="text-sm md:text-base text-on-surface-variant font-sans leading-relaxed border-t border-stone-100 pt-6">
                  Expert guides, carefully crafted itineraries, and unwavering
                  commitment to safety.
                </p>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="lg:pl-20 mt-16 md:mt-0">
            <h2 className="font-serif text-[40px] leading-12 font-semibold text-primary mb-10">
              Why {companyName}?
            </h2>

            <div className="space-y-12">
              {/* Experience */}
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-[#c7ebd4] flex items-center justify-center shrink-0">
                  <svg
                    className="h-5 fill-secondary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                  >
                    <path d="M288 32C318.9 32 344 57.1 344 88C344 118.9 318.9 144 288 144C257.1 144 232 118.9 232 88C232 57.1 257.1 32 288 32zM224 237.6C224 203.6 251.6 176 285.6 176C305.9 176 325.3 184.1 339.6 198.4L387.8 246.6C393.8 252.6 401.9 256 410.4 256L447.9 256C453.7 256 459.2 257.6 463.9 260.3L463.9 184C463.9 170.7 474.6 160 487.9 160C501.2 160 511.9 170.7 511.9 184L511.9 584C511.9 597.3 501.2 608 487.9 608C474.6 608 463.9 597.3 463.9 584L463.9 315.7C459.2 318.4 453.7 320 447.9 320L410.4 320C384.9 320 360.5 309.9 342.5 291.9L335.9 285.3L335.9 394.5L370.4 424.1C388.1 439.3 399.7 460.3 403 483.4L415.6 571.5C418.1 589 405.9 605.2 388.4 607.7C370.9 610.2 354.7 598 352.2 580.5L339.6 492.4C338.5 484.7 334.6 477.7 328.7 472.6L257.3 411.4C236 393.2 223.8 366.5 223.8 338.5L223.8 237.5zM219.2 441.3C221.5 443.6 223.9 445.7 226.3 447.8L271.2 486.3C267.6 494.7 262.7 502.6 256.8 509.7L184.6 596.5C173.3 610.1 153.1 611.9 139.5 600.6C125.9 589.3 124.1 569.1 135.4 555.5L207.7 468.8C210.3 465.7 212.2 462.2 213.5 458.4L219.2 441.3zM96 224C96 188.7 124.7 160 160 160C177.7 160 192 174.3 192 192L192 320C192 337.7 177.7 352 160 352L128 352C110.3 352 96 337.7 96 320L96 224z" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-serif text-lg font-semibold mb-2">
                    Decades of Real Himalayan Experience{" "}
                  </h5>
                  <p className="text-base text-on-surface-variant font-sans">
                    Led by expert local guides with 20+ years of trekking
                    experience, ensuring safe, insightful journeys across the
                    Himalayas.
                  </p>
                </div>
              </div>

              {/* eco friendly , trusted partners */}
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center shrink-0">
                  <svg
                    className="h-5 fill-tertiary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                  >
                    <path d="M80 88C80 74.7 90.7 64 104 64L536 64C549.3 64 560 74.7 560 88C560 101.3 549.3 112 536 112L528 112L528 528L536 528C549.3 528 560 538.7 560 552C560 565.3 549.3 576 536 576L104 576C90.7 576 80 565.3 80 552C80 538.7 90.7 528 104 528L112 528L112 112L104 112C90.7 112 80 101.3 80 88zM288 176L288 208C288 216.8 295.2 224 304 224L336 224C344.8 224 352 216.8 352 208L352 176C352 167.2 344.8 160 336 160L304 160C295.2 160 288 167.2 288 176zM192 160C183.2 160 176 167.2 176 176L176 208C176 216.8 183.2 224 192 224L224 224C232.8 224 240 216.8 240 208L240 176C240 167.2 232.8 160 224 160L192 160zM288 272L288 304C288 312.8 295.2 320 304 320L336 320C344.8 320 352 312.8 352 304L352 272C352 263.2 344.8 256 336 256L304 256C295.2 256 288 263.2 288 272zM416 160C407.2 160 400 167.2 400 176L400 208C400 216.8 407.2 224 416 224L448 224C456.8 224 464 216.8 464 208L464 176C464 167.2 456.8 160 448 160L416 160zM176 272L176 304C176 312.8 183.2 320 192 320L224 320C232.8 320 240 312.8 240 304L240 272C240 263.2 232.8 256 224 256L192 256C183.2 256 176 263.2 176 272zM416 256C407.2 256 400 263.2 400 272L400 304C400 312.8 407.2 320 416 320L448 320C456.8 320 464 312.8 464 304L464 272C464 263.2 456.8 256 448 256L416 256zM352 448L395.8 448C405.7 448 413.3 439 409.8 429.8C396 393.7 361 368 320.1 368C279.2 368 244.2 393.7 230.4 429.8C226.9 439 234.5 448 244.4 448L288.2 448L288.2 528L352.2 528L352.2 448z" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-serif text-lg font-semibold mb-2">
                    Trusted Lodges & Partners{" "}
                  </h5>
                  <p className="text-base text-on-surface-variant font-sans">
                    We collaborate with handpicked, eco-friendly lodges that
                    offer comfort, authenticity, and great value.
                  </p>
                </div>
              </div>

              {/* thoughtfully crafted */}
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                  <svg
                    className="h-5 fill-on-primary-fixed-variant"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                  >
                    <path d="M320.1 32C329.1 32 337.4 37.1 341.5 45.1L415 189.3L574.9 214.7C583.8 216.1 591.2 222.4 594 231C596.8 239.6 594.5 249 588.2 255.4L473.7 369.9L499 529.8C500.4 538.7 496.7 547.7 489.4 553C482.1 558.3 472.4 559.1 464.4 555L320.1 481.6L175.8 555C167.8 559.1 158.1 558.3 150.8 553C143.5 547.7 139.8 538.8 141.2 529.8L166.4 369.9L52 255.4C45.6 249 43.4 239.6 46.2 231C49 222.4 56.3 216.1 65.3 214.7L225.2 189.3L298.8 45.1C302.9 37.1 311.2 32 320.2 32zM320.1 108.8L262.3 222C258.8 228.8 252.3 233.6 244.7 234.8L119.2 254.8L209 344.7C214.4 350.1 216.9 357.8 215.7 365.4L195.9 490.9L309.2 433.3C316 429.8 324.1 429.8 331 433.3L444.3 490.9L424.5 365.4C423.3 357.8 425.8 350.1 431.2 344.7L521 254.8L395.5 234.8C387.9 233.6 381.4 228.8 377.9 222L320.1 108.8z" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-serif text-lg font-semibold mb-2">
                    Thoughtfully Crafted{" "}
                  </h5>
                  <p className="text-base text-on-surface-variant font-sans">
                    Carefully designed routes covering must-see highlights, with
                    flexibility to customize your perfect Himalayan adventure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
