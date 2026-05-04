import { Region } from "@/lib/regions";

export default function RegionSpecialties({ region }: { region: Region }) {
  return (
    <section
      className="py-[120px]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10c20 0 20 20 40 20s20-20 40-20' stroke='%231B365D' stroke-opacity='0.05' fill='none'/%3E%3Cpath d='M0 30c20 0 20 20 40 20s20-20 40-20' stroke='%231B365D' stroke-opacity='0.05' fill='none'/%3E%3C/svg%3E")`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 -z-10" />
            <img
              className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-xl"
              alt={`${region.name} specialty`}
              src={region.specialtyImage}
            />
          </div>

          <div className="lg:w-1/2 space-y-12">
            <div className="space-y-4">
              <h2 className="font-serif text-[40px] leading-[48px] font-semibold text-primary">
                Regional Specialties
              </h2>
              <div className="w-20 h-1 bg-secondary" />
            </div>

            <div className="space-y-10">
              {region.specialties.map((item) => (
                <div key={item.number} className="flex gap-6 group">
                  <span className="font-serif text-[32px] leading-[40px] font-semibold text-outline-variant group-hover:text-primary transition-colors shrink-0">
                    {item.number}
                  </span>
                  <div>
                    <h4 className="font-serif text-2xl font-semibold text-primary mb-2">{item.title}</h4>
                    <p className="text-base text-on-surface-variant font-sans">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
