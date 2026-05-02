export default function WhyTrekWithUs() {
  return (
    <section className="bg-surface-container-low py-30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 items-center">
          {/* Image column */}
          <div className="relative">
            <div className="aspect-4/5 bg-[#e3e2e0] overflow-hidden">
              <img
                alt="Expert Guide"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDq4bkFawaOprB6w5oEtKc8LooLZ2J2b82ovMYwwavZMsf8O8zXemjBFi8-5k6h3jditjfHBuk1GjiCRr-iIOgDZLYFxBD8vxrtn6fyZ3KsQyZCezBeHDqg3xpNJ0yEsyyPH6Za3y_xtcBDY-IUehH1szicYbl97sQwsnpeHV5RVZZERDrQXct0retc1g5puciQnMOpYbtCoMseqCCAAlriINkscLpvx4b3mvFA_mtmSeYZGIoqbCIu4nz2CKaurc07EtgxsKujIzhd"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-12 -right-12 bg-primary-container p-12 text-white max-w-xs hidden md:block">
              <h4 className="font-serif text-[32px] leading-10 font-semibold mb-4 text-on-primary-container">
                Safety First.
              </h4>
              <p className="text-base opacity-80 font-sans">
                Our guides carry oxygen, satellite communications, and medical
                kits on every trip.
              </p>
            </div>
          </div>

          {/* Text column */}
          <div className="lg:pl-20 mt-16 md:mt-0">
            <h2 className="font-serif text-[40px] leading-12 font-semibold text-primary mb-10">
              Why Himalayan Vistas?
            </h2>

            <div className="space-y-12">
              {/* Unrivaled Safety */}
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-[#c7ebd4] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary">
                    verified_user
                  </span>
                </div>
                <div>
                  <h5 className="font-serif text-lg font-semibold mb-2">
                    Unrivaled Safety
                  </h5>
                  <p className="text-base text-on-surface-variant font-sans">
                    24/7 mountain tracking and emergency evacuation protocols
                    managed by our Kathmandu-based operation center.
                  </p>
                </div>
              </div>

              {/* The Sherpa Spirit */}
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-tertiary">
                    landscape
                  </span>
                </div>
                <div>
                  <h5 className="font-serif text-lg font-semibold mb-2">
                    The Sherpa Spirit
                  </h5>
                  <p className="text-base text-on-surface-variant font-sans">
                    Our team consists of lifelong mountain residents with
                    multiple Everest summits and deep cultural knowledge.
                  </p>
                </div>
              </div>

              {/* Sustainable Luxury */}
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-primary-fixed-variant">
                    eco
                  </span>
                </div>
                <div>
                  <h5 className="font-serif text-lg font-semibold mb-2">
                    Sustainable Luxury
                  </h5>
                  <p className="text-base text-on-surface-variant font-sans">
                    We partner with eco-conscious lodges and minimize
                    environmental impact while providing world-class
                    hospitality.
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
