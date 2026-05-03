"use client";
import { useState } from "react";

type InquiryStatus = "New" | "Contacted" | "Converted" | "Closed";

const statusStyle: Record<InquiryStatus, string> = {
  New:       "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  Contacted: "bg-primary-fixed text-on-primary-fixed-variant",
  Converted: "bg-secondary-container text-on-secondary-fixed-variant",
  Closed:    "bg-surface-container-highest text-on-surface-variant",
};

const inquiries = [
  { id: 1, initials: "EW", avatarBg: "bg-secondary-container text-secondary",        name: "Eleanor Wright",  email: "eleanor@email.com",  trek: "Everest Base Camp",  method: "WhatsApp", methodIcon: "chat",  methodColor: "text-whatsapp", date: "Oct 24, 2024", message: "Hello! I'm interested in the EBC trek for March 2025. We are a couple with moderate trekking experience.", status: "New"       as InquiryStatus },
  { id: 2, initials: "JM", avatarBg: "bg-primary-fixed text-primary",               name: "Julian Marc",     email: "julian@email.com",   trek: "Annapurna Circuit",  method: "Email",    methodIcon: "mail",  methodColor: "text-outline",  date: "Oct 23, 2024", message: "Interested in the Annapurna Circuit for November. Can you send a detailed itinerary?", status: "Contacted" as InquiryStatus },
  { id: 3, initials: "SH", avatarBg: "bg-secondary-fixed-dim text-secondary",       name: "Sana Han",        email: "sana@email.com",     trek: "Manaslu Circuit",    method: "WhatsApp", methodIcon: "chat",  methodColor: "text-whatsapp", date: "Oct 22, 2024", message: "We are a group of 4. Looking for the Manaslu Circuit in late October.", status: "New"       as InquiryStatus },
  { id: 4, initials: "DK", avatarBg: "bg-outline-variant text-on-surface-variant",  name: "David Kim",       email: "david@email.com",    trek: "Upper Mustang",      method: "Email",    methodIcon: "mail",  methodColor: "text-outline",  date: "Oct 20, 2024", message: "Please confirm availability for the Upper Mustang permit trek.", status: "Converted" as InquiryStatus },
  { id: 5, initials: "AO", avatarBg: "bg-tertiary-fixed text-on-tertiary-fixed-variant", name: "Amara Osei", email: "amara@email.com",    trek: "Gokyo Lakes",        method: "WhatsApp", methodIcon: "chat",  methodColor: "text-whatsapp", date: "Oct 19, 2024", message: "Solo trekker looking for the Gokyo Lakes route. Is it suitable for beginners?", status: "Contacted" as InquiryStatus },
  { id: 6, initials: "LM", avatarBg: "bg-primary-fixed-dim text-primary",           name: "Lena Müller",     email: "lena@email.com",     trek: "Three Passes Trek",  method: "Email",    methodIcon: "mail",  methodColor: "text-outline",  date: "Oct 18, 2024", message: "Very experienced trekker. Interested in the Three Passes challenge for November.", status: "New"       as InquiryStatus },
];

export default function AdminInquiriesPage() {
  const [selected, setSelected] = useState(inquiries[0]);
  const [filter, setFilter] = useState<InquiryStatus | "All">("All");

  const filtered = filter === "All" ? inquiries : inquiries.filter(i => i.status === filter);
  const counts = { All: inquiries.length, New: 3, Contacted: 2, Converted: 1, Closed: 0 };

  return (
    <div className="flex gap-6 h-[calc(100vh-10rem)] pb-4">
      {/* Left: list */}
      <div className="w-full max-w-md flex flex-col gap-4 shrink-0">
        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap">
          {(["All", "New", "Contacted", "Converted", "Closed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded text-xs font-semibold font-sans transition-colors ${
                filter === f
                  ? "bg-primary text-on-primary"
                  : "bg-surface border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
              }`}
            >
              {f} <span className="opacity-70">({counts[f]})</span>
            </button>
          ))}
        </div>

        {/* Inquiry list */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filtered.map((inq) => (
            <button
              key={inq.id}
              onClick={() => setSelected(inq)}
              className={`w-full text-left p-4 rounded border transition-all ${
                selected.id === inq.id
                  ? "border-primary bg-primary-fixed/30"
                  : "border-outline-variant bg-surface hover:border-primary hover:bg-surface-container-lowest"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold font-sans shrink-0 ${inq.avatarBg}`}>{inq.initials}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-on-surface font-sans truncate">{inq.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold font-sans shrink-0 ${statusStyle[inq.status]}`}>{inq.status}</span>
                  </div>
                  <p className="text-xs text-secondary font-sans truncate">{inq.trek}</p>
                  <p className="text-xs text-on-surface-variant font-sans mt-1 truncate">{inq.message}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 pl-12">
                <div className={`flex items-center gap-1 text-[11px] font-sans ${inq.methodColor}`}>
                  <span className="material-symbols-outlined text-sm">{inq.methodIcon}</span>
                  {inq.method}
                </div>
                <span className="text-[11px] text-outline font-sans">{inq.date}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right: detail panel */}
      <div className="flex-1 bg-surface border border-outline-variant rounded flex flex-col overflow-hidden">
        {/* Detail header */}
        <div className="px-6 py-5 border-b border-outline-variant flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold font-sans ${selected.avatarBg}`}>{selected.initials}</div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-primary">{selected.name}</h3>
              <p className="text-xs text-on-surface-variant font-sans">{selected.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-[10px] font-semibold font-sans ${statusStyle[selected.status]}`}>{selected.status}</span>
            <select className="border border-outline-variant rounded px-3 py-1.5 text-xs font-sans bg-surface focus:outline-none focus:border-primary text-on-surface">
              <option>Change Status</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Converted</option>
              <option>Closed</option>
            </select>
          </div>
        </div>

        {/* Inquiry details */}
        <div className="px-6 py-5 flex-1 overflow-y-auto space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "hiking", label: "Trek Interest", value: selected.trek },
              { icon: "chat", label: "Contact Method", value: selected.method },
              { icon: "calendar_today", label: "Received", value: selected.date },
              { icon: "mail", label: "Email", value: selected.email },
            ].map((d) => (
              <div key={d.label} className="bg-surface-container-low rounded p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-sm text-outline">{d.icon}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-outline font-sans">{d.label}</span>
                </div>
                <p className="text-sm font-semibold text-on-surface font-sans">{d.value}</p>
              </div>
            ))}
          </div>

          {/* Message */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-outline font-sans mb-3">Message</p>
            <div className="bg-surface-container-low rounded p-4 text-sm text-on-surface font-sans leading-relaxed">
              {selected.message}
            </div>
          </div>

          {/* Reply area */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-outline font-sans mb-3">Reply</p>
            <textarea
              rows={4}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded p-4 text-sm font-sans focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-on-surface-variant/50"
              placeholder="Type your reply…"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-outline-variant flex gap-3">
          <a
            href={`https://wa.me/9779800000000?text=${encodeURIComponent(`Hi ${selected.name}, thank you for your inquiry about ${selected.trek}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded text-xs font-semibold font-sans text-whatsapp hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-sm">chat</span>
            WhatsApp
          </a>
          <a
            href={`mailto:${selected.email}`}
            className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded text-xs font-semibold font-sans text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-sm">mail</span>
            Email
          </a>
          <button className="ml-auto flex items-center gap-2 px-5 py-2 bg-primary text-on-primary rounded text-xs font-semibold font-sans hover:bg-primary-container transition-colors">
            <span className="material-symbols-outlined text-sm">send</span>
            Send Reply
          </button>
        </div>
      </div>
    </div>
  );
}
