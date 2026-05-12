import Link from "next/link";

const inquiries = [
  {
    initials: "EW",
    avatarClass: "bg-secondary-container text-secondary",
    name: "Eleanor Wright",
    trek: "Everest Base Camp",
    method: "WhatsApp",
    methodIcon: "chat",
    methodColor: "text-whatsapp",
    status: "New",
    statusClass: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  },
  {
    initials: "JM",
    avatarClass: "bg-primary-fixed text-primary",
    name: "Julian Marc",
    trek: "Annapurna Circuit",
    method: "Email",
    methodIcon: "mail",
    methodColor: "text-outline",
    status: "Contacted",
    statusClass: "bg-surface-container-highest text-on-surface-variant",
  },
  {
    initials: "SH",
    avatarClass: "bg-secondary-fixed-dim text-secondary",
    name: "Sana Han",
    trek: "Manaslu Circuit",
    method: "WhatsApp",
    methodIcon: "chat",
    methodColor: "text-whatsapp",
    status: "New",
    statusClass: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  },
  {
    initials: "DK",
    avatarClass: "bg-outline-variant text-on-surface-variant",
    name: "David Kim",
    trek: "Upper Mustang",
    method: "Email",
    methodIcon: "mail",
    methodColor: "text-outline",
    status: "Converted",
    statusClass: "bg-secondary-container text-on-secondary-container",
  },
];

export default function DashboardInquiries() {
  return (
    <section className="lg:col-span-2 bg-surface border border-outline-variant rounded flex flex-col overflow-hidden">
      <div className="px-4 md:px-6 py-4 md:py-5 border-b border-outline-variant flex items-center justify-between">
        <h4 className="font-serif text-lg font-semibold text-primary">
          Recent Inquiries
        </h4>
        <Link
          href="/admin/inquiries"
          className="text-xs font-semibold text-primary underline decoration-outline-variant underline-offset-4 hover:opacity-70 transition-opacity font-sans"
        >
          View All
        </Link>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low">
            <tr>
              {["Client Name", "Trek Interest", "Contact Method", "Status", ""].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-[11px] font-semibold uppercase tracking-widest text-outline font-sans"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {inquiries.map((row) => (
              <tr
                key={row.name}
                className="hover:bg-surface-container-lowest transition-colors"
              >
                {/* Name */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold font-sans ${row.avatarClass}`}
                    >
                      {row.initials}
                    </div>
                    <span className="text-xs font-semibold text-on-surface font-sans">
                      {row.name}
                    </span>
                  </div>
                </td>
                {/* Trek */}
                <td className="px-6 py-5">
                  <span className="text-sm text-on-surface-variant font-sans">
                    {row.trek}
                  </span>
                </td>
                {/* Method */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span
                      className={`material-symbols-outlined text-lg ${row.methodColor}`}
                    >
                      {row.methodIcon}
                    </span>
                    <span className="text-sm font-sans">{row.method}</span>
                  </div>
                </td>
                {/* Status */}
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-semibold font-sans ${row.statusClass}`}
                  >
                    {row.status}
                  </span>
                </td>
                {/* Action */}
                <td className="px-6 py-5 text-right">
                  <button className="text-outline hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
