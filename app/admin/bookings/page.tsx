export type BookingStatus = "Confirmed" | "Pending" | "Cancelled" | "Completed";

const statusStyle: Record<BookingStatus, string> = {
  Confirmed: "bg-secondary-container text-on-secondary-fixed-variant",
  Pending:   "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  Cancelled: "bg-error-container text-error",
  Completed: "bg-surface-container-highest text-on-surface-variant",
};

const bookings = [
  { id: "BK-001", client: "Eleanor Wright",  initials: "EW", avatarBg: "bg-secondary-container text-secondary",        trek: "Everest Base Camp",  start: "Oct 12, 2024", end: "Oct 26, 2024", pax: 2, total: "$4,900",  status: "Confirmed" as BookingStatus },
  { id: "BK-002", client: "Julian Marc",     initials: "JM", avatarBg: "bg-primary-fixed text-primary",               trek: "Annapurna Circuit",  start: "Nov 1, 2024",  end: "Nov 15, 2024", pax: 1, total: "$2,100",  status: "Pending"   as BookingStatus },
  { id: "BK-003", client: "Sana Han",        initials: "SH", avatarBg: "bg-secondary-fixed-dim text-secondary",       trek: "Manaslu Circuit",    start: "Oct 17, 2024", end: "Nov 2, 2024",  pax: 4, total: "$7,800",  status: "Confirmed" as BookingStatus },
  { id: "BK-004", client: "David Kim",       initials: "DK", avatarBg: "bg-outline-variant text-on-surface-variant",  trek: "Upper Mustang",      start: "Oct 15, 2024", end: "Oct 27, 2024", pax: 2, total: "$3,800",  status: "Completed" as BookingStatus },
  { id: "BK-005", client: "Amara Osei",      initials: "AO", avatarBg: "bg-tertiary-fixed text-on-tertiary-fixed-variant", trek: "Gokyo Lakes",   start: "Oct 22, 2024", end: "Nov 3, 2024",  pax: 3, total: "$6,600",  status: "Confirmed" as BookingStatus },
  { id: "BK-006", client: "Lena Müller",     initials: "LM", avatarBg: "bg-primary-fixed-dim text-primary",           trek: "Three Passes Trek",  start: "Nov 5, 2024",  end: "Nov 25, 2024", pax: 2, total: "$4,400",  status: "Pending"   as BookingStatus },
  { id: "BK-007", client: "Kenji Tanaka",    initials: "KT", avatarBg: "bg-secondary-container text-secondary",       trek: "Langtang Valley",    start: "Oct 18, 2024", end: "Oct 25, 2024", pax: 5, total: "$4,250",  status: "Confirmed" as BookingStatus },
  { id: "BK-008", client: "Priya Sharma",    initials: "PS", avatarBg: "bg-surface-container text-on-surface-variant",trek: "Everest Base Camp",  start: "Dec 1, 2024",  end: "Dec 15, 2024", pax: 1, total: "$2,450",  status: "Cancelled" as BookingStatus },
];

export default function AdminBookingsPage() {
  const counts = {
    Confirmed: bookings.filter(b => b.status === "Confirmed").length,
    Pending:   bookings.filter(b => b.status === "Pending").length,
    Cancelled: bookings.filter(b => b.status === "Cancelled").length,
    Completed: bookings.filter(b => b.status === "Completed").length,
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(Object.entries(counts) as [BookingStatus, number][]).map(([status, count]) => (
          <div key={status} className="bg-surface border border-outline-variant rounded p-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-outline font-sans">{status}</p>
            <p className="font-serif text-3xl font-semibold text-on-surface mt-1">{count}</p>
          </div>
        ))}
      </div>

      {/* Search + filter bar */}
      <div className="bg-surface border border-outline-variant rounded p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-sm">search</span>
          <input
            className="w-full bg-surface-container-lowest border border-outline-variant rounded pl-9 pr-4 py-2 text-sm font-sans focus:outline-none focus:border-primary transition-colors"
            placeholder="Search bookings…"
            type="text"
          />
        </div>
        <div className="flex items-center gap-3">
          <select className="border border-outline-variant rounded px-3 py-2 text-sm font-sans bg-surface focus:outline-none focus:border-primary text-on-surface">
            <option>All Statuses</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Cancelled</option>
            <option>Completed</option>
          </select>
          <button className="bg-primary text-on-primary px-4 py-2 rounded text-xs font-semibold font-sans flex items-center gap-2 hover:bg-primary-container transition-colors">
            <span className="material-symbols-outlined text-sm">add</span>
            New Booking
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface border border-outline-variant rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low border-b border-outline-variant">
              <tr>
                {["Booking ID", "Client", "Trek", "Dates", "Pax", "Total", "Status", ""].map((h) => (
                  <th key={h} className="px-6 py-3 text-[11px] font-semibold uppercase tracking-widest text-outline font-sans whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold text-primary-container font-sans">{b.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold font-sans shrink-0 ${b.avatarBg}`}>{b.initials}</div>
                      <span className="text-sm font-semibold text-on-surface font-sans whitespace-nowrap">{b.client}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-on-surface-variant font-sans whitespace-nowrap">{b.trek}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-on-surface-variant font-sans whitespace-nowrap">{b.start} → {b.end}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-on-surface font-sans">{b.pax}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-on-surface font-sans">{b.total}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-semibold font-sans whitespace-nowrap ${statusStyle[b.status]}`}>{b.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-outline hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
