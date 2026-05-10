interface Stat {
  icon: string;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  badgeText: string;
  badgeClass: string;
  dark?: boolean;
  bgImage?: string;
}

const stats: Stat[] = [
  {
    icon: "confirmation_number",
    iconBg: "bg-primary-container/10",
    iconColor: "text-primary-container",
    label: "Total Bookings",
    value: "1,284",
    badgeText: "+12%",
    badgeClass: "bg-secondary-container text-on-secondary-fixed-variant",
  },
  {
    icon: "hiking",
    iconBg: "bg-secondary-container/20",
    iconColor: "text-secondary",
    label: "Active Treks",
    value: "24",
    badgeText: "+5%",
    badgeClass: "bg-secondary-container text-on-secondary-fixed-variant",
  },
  {
    icon: "contact_support",
    iconBg: "bg-tertiary-fixed/20",
    iconColor: "text-on-tertiary-fixed-variant",
    label: "Pending Inquiries",
    value: "56",
    badgeText: "-2%",
    badgeClass: "bg-error-container text-error",
  },
  {
    icon: "account_balance_wallet",
    iconBg: "bg-on-primary-container/20",
    iconColor: "text-on-primary",
    label: "Monthly Revenue",
    value: "$84,200",
    badgeText: "+18%",
    badgeClass: "bg-primary-fixed text-on-primary-fixed",
    dark: true,
    bgImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDOT_BvVt_iCQi_NFFKCsMnq_gvVOgFnq40Acf71VbUX3I0Cky_tiEr9jp4s6xWyRIrIgGia-02_4TOLGJm9wUWt7IRNWP8_zZz90COvkaIm9eGK197wc8fFye54ShJA7DUhrjHu73eV0_iJw8JqExAyYAMsJqeU1eO9_IDbJmm53RGO7YTxRSwLjOfnYZv6qAXn-eFB7AQZYo5gneuqBeVUAD3gXJK4iLXxjhZs3HKiaUiHslLXUfImPasXiJ2XKym2mIZBcjdjJvd",
  },
];

export default function DashboardStats() {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`p-6 border rounded hover:shadow-lg transition-shadow relative overflow-hidden ${
            stat.dark
              ? "bg-primary-container text-on-primary-container border-primary"
              : "bg-surface border-outline-variant"
          }`}
        >
          {/* Background image for revenue card */}
          {stat.bgImage && (
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <img
                className="w-full h-full object-cover"
                alt=""
                src={stat.bgImage}
              />
            </div>
          )}

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded ${stat.iconBg}`}>
                <span
                  className={`material-symbols-outlined ${stat.iconColor}`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {stat.icon}
                </span>
              </div>
              <span
                className={`text-[11px] font-semibold px-2 py-1 rounded font-sans ${stat.badgeClass}`}
              >
                {stat.badgeText}
              </span>
            </div>

            <p
              className={`text-[10px] font-semibold uppercase tracking-wider font-sans ${
                stat.dark ? "text-on-primary/70" : "text-outline"
              }`}
            >
              {stat.label}
            </p>
            <h3
              className={`font-serif text-3xl font-semibold mt-1 ${
                stat.dark ? "text-on-primary" : "text-on-surface"
              }`}
            >
              {stat.value}
            </h3>
          </div>
        </div>
      ))}
    </section>
  );
}
