export default function Statistics() {
  return (
    <section className="bg-surface-container-low py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter text-center">
          <div className="flex flex-col items-center">
            <span className="text-primary text-2xl font-bold mb-2">20+</span>
            <span className="font-label-sm uppercase tracking-widest text-on-surface-variant">
              Years of Experience
            </span>
          </div>
          <div className="flex flex-col items-center border-y md:border-y-0 md:border-x border-outline-variant py-8 md:py-0">
            <span className="text-primary text-2xl font-bold mb-2">1,500+</span>
            <span className="font-label-sm uppercase tracking-widest text-on-surface-variant">
              Successful Expeditions
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-primary text-2xl font-bold mb-2">98%</span>
            <span className="font-label-sm uppercase tracking-widest text-on-surface-variant">
              Customer Satisfaction
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
