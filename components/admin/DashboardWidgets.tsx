const expeditions = [
  {
    name: "Everest Grp A",
    currentDay: 12,
    totalDays: 18,
    location: "Lobuche (4,940m)",
  },
  {
    name: "Annapurna Solo",
    currentDay: 4,
    totalDays: 14,
    location: "Ghorepani (2,874m)",
  },
  {
    name: "Manaslu Circuit",
    currentDay: 7,
    totalDays: 16,
    location: "Namrung (2,630m)",
  },
];

export default function DashboardWidgets() {
  return (
    <section className="space-y-6">
      {/* Live expedition status */}
      <div className="bg-surface border border-outline-variant rounded p-6">
        <h5 className="text-[11px] font-semibold uppercase tracking-widest text-outline font-sans mb-6">
          Live Expedition Status
        </h5>
        <div className="space-y-6">
          {expeditions.map((exp) => {
            const pct = Math.round((exp.currentDay / exp.totalDays) * 100);
            return (
              <div key={exp.name} className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-xs font-semibold text-primary font-sans">
                    {exp.name}
                  </span>
                  <span className="text-xs text-outline font-sans">
                    Day {exp.currentDay} / {exp.totalDays}
                  </span>
                </div>
                <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-secondary h-full rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-secondary font-sans">
                  <span className="material-symbols-outlined text-sm">
                    location_on
                  </span>
                  <span>Current: {exp.location}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weather widget */}
      <div className="bg-primary-container text-on-primary-container p-6 rounded border border-primary relative overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-[11px] font-semibold uppercase tracking-widest opacity-80 font-sans">
            EBC Base Camp Weather
          </h5>
          <span
            className="material-symbols-outlined text-on-primary-container"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            cloudy_snowing
          </span>
        </div>

        <div className="flex items-end gap-3">
          <span className="font-serif text-4xl font-semibold">-12°C</span>
          <span className="text-sm font-sans mb-1 opacity-70">
            Feels like -18°C
          </span>
        </div>

        <div className="mt-4 pt-4 border-t border-on-primary-container/20 grid grid-cols-3 gap-4 text-[11px] font-sans">
          {[
            { label: "Wind", value: "24 km/h" },
            { label: "Visibility", value: "High" },
            { label: "Forecast", value: "Light Snow" },
          ].map((w) => (
            <div key={w.label}>
              <p className="opacity-60">{w.label}</p>
              <p className="font-semibold">{w.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
