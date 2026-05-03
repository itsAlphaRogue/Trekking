import { activeTreks, statusConfig } from "@/lib/adminData";

export default function AdminTreksPage() {
  return (
    <div className="space-y-8 pb-10">
      {/* Summary row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Now", value: "6", icon: "hiking", color: "text-secondary" },
          { label: "Trekkers Out", value: "23", icon: "groups", color: "text-primary" },
          { label: "Avg Progress", value: "52%", icon: "trending_up", color: "text-secondary" },
          { label: "Returning Today", value: "1", icon: "flight_land", color: "text-on-tertiary-fixed-variant" },
        ].map((s) => (
          <div key={s.label} className="bg-surface border border-outline-variant rounded p-5 flex items-center gap-4">
            <span className={`material-symbols-outlined text-3xl ${s.color}`}>{s.icon}</span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-outline font-sans">{s.label}</p>
              <p className="font-serif text-2xl font-semibold text-on-surface">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Trek cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {activeTreks.map((trek) => {
          const pct = Math.round((trek.currentDay / trek.totalDays) * 100);
          const st = statusConfig[trek.status];
          return (
            <div key={trek.id} className="bg-surface border border-outline-variant rounded overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-base font-semibold text-primary leading-tight">{trek.name}</h3>
                  <p className="text-[11px] text-outline font-sans">{trek.region} Region</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-semibold font-sans ${st.bg} ${st.text}`}>
                  {trek.status}
                </span>
              </div>

              <div className="px-6 py-5 flex-1 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-surface-container-highest overflow-hidden">
                      <img alt={trek.guide} className="w-full h-full object-cover" src={trek.guideAvatar} />
                    </div>
                    <span className="text-xs font-semibold text-on-surface font-sans">{trek.guide}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-on-surface-variant font-sans">
                    <span className="material-symbols-outlined text-sm">group</span>
                    {trek.groupSize} {trek.groupSize === 1 ? "person" : "people"}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-sans">
                    <span className="font-semibold text-primary">Day {trek.currentDay} of {trek.totalDays}</span>
                    <span className="text-outline">{pct}% complete</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>

                <div className="bg-surface-container-low rounded p-3 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-secondary font-sans">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <span className="font-semibold">Current: {trek.currentLocation} ({trek.altitude})</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant font-sans">
                    <span className="material-symbols-outlined text-sm">flag</span>
                    <span>Next: {trek.nextCheckpoint}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-outline font-sans">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    {trek.startDate}
                  </div>
                  <span>→</span>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">event</span>
                    {trek.endDate}
                  </div>
                </div>
              </div>

              <div className="px-6 py-3 border-t border-outline-variant flex gap-3">
                <button className="flex-1 text-xs font-semibold font-sans text-primary border border-primary rounded px-3 py-2 hover:bg-primary hover:text-on-primary transition-colors">
                  View Details
                </button>
                <button className="flex-1 text-xs font-semibold font-sans bg-primary-container text-on-primary rounded px-3 py-2 hover:opacity-90 transition-opacity">
                  Contact Guide
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
