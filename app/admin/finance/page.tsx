const monthly = [
  { month: "May",  revenue: 48200, expenses: 22100, bookings: 18 },
  { month: "Jun",  revenue: 52400, expenses: 24800, bookings: 21 },
  { month: "Jul",  revenue: 61000, expenses: 28200, bookings: 25 },
  { month: "Aug",  revenue: 58700, expenses: 26900, bookings: 23 },
  { month: "Sep",  revenue: 74100, expenses: 31400, bookings: 30 },
  { month: "Oct",  revenue: 84200, expenses: 36100, bookings: 34 },
];

const transactions = [
  { id: "TX-0091", date: "Oct 24", client: "Eleanor Wright", trek: "Everest Base Camp",  amount: "$4,900", type: "Booking",  status: "Paid"    },
  { id: "TX-0090", date: "Oct 23", client: "Sana Han",       trek: "Manaslu Circuit",    amount: "$7,800", type: "Booking",  status: "Paid"    },
  { id: "TX-0089", date: "Oct 22", client: "Amara Osei",     trek: "Gokyo Lakes",        amount: "$6,600", type: "Booking",  status: "Paid"    },
  { id: "TX-0088", date: "Oct 20", client: "Guide Payroll",  trek: "—",                  amount: "$3,200", type: "Expense",  status: "Settled" },
  { id: "TX-0087", date: "Oct 19", client: "Kenji Tanaka",   trek: "Langtang Valley",    amount: "$4,250", type: "Booking",  status: "Paid"    },
  { id: "TX-0086", date: "Oct 18", client: "Permit Fees",    trek: "Manaslu ×3",         amount: "$1,500", type: "Expense",  status: "Settled" },
  { id: "TX-0085", date: "Oct 17", client: "Julian Marc",    trek: "Annapurna Circuit",  amount: "$2,100", type: "Booking",  status: "Pending" },
];

const maxRevenue = Math.max(...monthly.map(m => m.revenue));

export default function AdminFinancePage() {
  const currentMonth = monthly[monthly.length - 1];
  const prevMonth = monthly[monthly.length - 2];
  const revenueChange = (((currentMonth.revenue - prevMonth.revenue) / prevMonth.revenue) * 100).toFixed(1);
  const profit = currentMonth.revenue - currentMonth.expenses;

  return (
    <div className="space-y-8 pb-10">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Monthly Revenue", value: `$${(currentMonth.revenue / 1000).toFixed(1)}k`, change: `+${revenueChange}%`, positive: true },
          { label: "Expenses",        value: `$${(currentMonth.expenses / 1000).toFixed(1)}k`, change: "-4.2%", positive: false },
          { label: "Net Profit",      value: `$${(profit / 1000).toFixed(1)}k`, change: "+22%", positive: true },
          { label: "Bookings",        value: `${currentMonth.bookings}`, change: "+13%", positive: true },
        ].map((k) => (
          <div key={k.label} className="bg-surface border border-outline-variant rounded p-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-outline font-sans">{k.label}</p>
            <p className="font-serif text-3xl font-semibold text-on-surface mt-1">{k.value}</p>
            <span className={`text-xs font-semibold font-sans ${k.positive ? "text-secondary" : "text-error"}`}>{k.change} vs last month</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Bar chart */}
        <div className="xl:col-span-2 bg-surface border border-outline-variant rounded p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-serif text-lg font-semibold text-primary">Revenue vs Expenses</h4>
            <div className="flex items-center gap-4 text-[11px] font-sans">
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary inline-block" />Revenue</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-secondary-container inline-block" />Expenses</div>
            </div>
          </div>
          <div className="flex items-end gap-3 h-48">
            {monthly.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end gap-1 justify-center" style={{ height: "160px" }}>
                  <div
                    className="flex-1 bg-primary rounded-t transition-all hover:opacity-80"
                    style={{ height: `${(m.revenue / maxRevenue) * 100}%` }}
                    title={`Revenue: $${m.revenue.toLocaleString()}`}
                  />
                  <div
                    className="flex-1 bg-secondary-container rounded-t transition-all hover:opacity-80"
                    style={{ height: `${(m.expenses / maxRevenue) * 100}%` }}
                    title={`Expenses: $${m.expenses.toLocaleString()}`}
                  />
                </div>
                <span className="text-[11px] text-outline font-sans">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-surface border border-outline-variant rounded p-6 space-y-5">
          <h4 className="font-serif text-lg font-semibold text-primary">October Breakdown</h4>
          {[
            { label: "Trek Bookings",   value: "$71,400", pct: 85, color: "bg-primary" },
            { label: "Private Guiding", value: "$8,400",  pct: 10, color: "bg-secondary" },
            { label: "Gear Rental",     value: "$4,200",  pct: 5,  color: "bg-tertiary-fixed-dim" },
          ].map((r) => (
            <div key={r.label} className="space-y-2">
              <div className="flex justify-between text-xs font-sans">
                <span className="font-semibold text-on-surface">{r.label}</span>
                <span className="text-on-surface-variant">{r.value} ({r.pct}%)</span>
              </div>
              <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${r.color}`} style={{ width: `${r.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions table */}
      <div className="bg-surface border border-outline-variant rounded overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between">
          <h4 className="font-serif text-lg font-semibold text-primary">Recent Transactions</h4>
          <button className="text-xs font-semibold text-primary font-sans border-b border-primary pb-0.5 hover:opacity-70 transition-opacity">Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low">
              <tr>
                {["ID", "Date", "Client", "Trek", "Amount", "Type", "Status"].map((h) => (
                  <th key={h} className="px-6 py-3 text-[11px] font-semibold uppercase tracking-widest text-outline font-sans whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-6 py-4 text-xs font-semibold text-primary-container font-sans">{tx.id}</td>
                  <td className="px-6 py-4 text-xs text-outline font-sans">{tx.date}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-on-surface font-sans">{tx.client}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant font-sans">{tx.trek}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-on-surface font-sans">{tx.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-semibold font-sans ${
                      tx.type === "Booking" ? "bg-primary-fixed text-on-primary-fixed-variant" : "bg-error-container text-error"
                    }`}>{tx.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-semibold font-sans ${
                      tx.status === "Paid"    ? "bg-secondary-container text-on-secondary-fixed-variant" :
                      tx.status === "Pending" ? "bg-tertiary-fixed text-on-tertiary-fixed-variant" :
                                               "bg-surface-container-highest text-on-surface-variant"
                    }`}>{tx.status}</span>
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
