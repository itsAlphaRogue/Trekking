import { TrekDetail } from "@/lib/supabase/queries/treks";

export default function TrekWeather({ trek }: { trek: TrekDetail }) {
  return (
    <section className="bg-primary text-on-primary py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-lg">
            <h2 className="font-serif text-[40px] leading-[48px] font-semibold text-on-primary mb-4">
              Mountain Intelligence
            </h2>
            <p className="text-on-primary/70 text-lg leading-7 font-sans">
              Stay informed with real-time conditions. We monitor every base
              camp and high pass for optimal safety windows.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="bg-on-primary/10 backdrop-blur-sm p-6 border border-on-primary/20">
              <span className="material-symbols-outlined mb-2 block">
                thermostat
              </span>
              <p className="text-xs font-semibold uppercase tracking-widest text-on-primary/60 font-sans">
                Avg. Temp
              </p>
              <p className="font-serif text-[32px] leading-[40px] font-semibold">
                {trek.avgTemp ?? "—"}
              </p>
            </div>
            <div className="bg-on-primary/10 backdrop-blur-sm p-6 border border-on-primary/20">
              <span className="material-symbols-outlined mb-2 block">air</span>
              <p className="text-xs font-semibold uppercase tracking-widest text-on-primary/60 font-sans">
                Wind Speed
              </p>
              <p className="font-serif text-[32px] leading-[40px] font-semibold">
                {trek.windSpeed ?? "—"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
