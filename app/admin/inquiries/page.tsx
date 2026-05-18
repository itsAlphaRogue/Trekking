"use client";

import { useEffect, useState, useMemo } from "react";
import {
  adminGetInquiries,
  adminUpdateInquiry,
  adminDeleteInquiry,
  Inquiry,
  InquiryStatus,
} from "@/lib/supabase/queries/inquiries";

// ─── Constants ──────────────────────────────────────────────────────────────

const STATUS_STYLE: Record<InquiryStatus, string> = {
  New: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  Contacted: "bg-primary-fixed text-on-primary-fixed-variant",
  Converted: "bg-secondary-container text-on-secondary-fixed-variant",
  Closed: "bg-surface-container-highest text-on-surface-variant",
};

const STATUS_OPTIONS: (InquiryStatus | "All")[] = [
  "All",
  "New",
  "Contacted",
  "Converted",
  "Closed",
];

// ─── Helper: Initials ────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [filter, setFilter] = useState<InquiryStatus | "All">("All");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchInquiries() {
      try {
        const data = await adminGetInquiries();
        if (mounted) {
          setInquiries(data);
          if (data.length > 0) setSelected(data[0]);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to load inquiries:", error);
        if (mounted) setLoading(false);
      }
    }
    fetchInquiries();
    return () => {
      mounted = false;
    };
  }, []);

  // Filtered list
  const filtered = useMemo(() => {
    return filter === "All"
      ? inquiries
      : inquiries.filter((i) => i.status === filter);
  }, [inquiries, filter]);

  // Status counts
  const counts = useMemo(() => {
    const c: Record<string, number> = { All: inquiries.length };
    STATUS_OPTIONS.forEach((opt) => {
      if (opt !== "All") {
        c[opt] = inquiries.filter((i) => i.status === opt).length;
      }
    });
    return c;
  }, [inquiries]);

  const handleStatusChange = async (id: string, status: InquiryStatus) => {
    setSaving(true);
    try {
      await adminUpdateInquiry(id, { status });
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)),
      );
      if (selected?.id === id) {
        setSelected((prev) => (prev ? { ...prev, status } : null));
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status.");
    } finally {
      setSaving(false);
    }
  };

  const handleNotesChange = async (id: string, notes: string) => {
    try {
      await adminUpdateInquiry(id, { internal_notes: notes });
      setInquiries((prev) =>
        prev.map((inq) =>
          inq.id === id ? { ...inq, internal_notes: notes } : inq,
        ),
      );
    } catch (error) {
      console.error("Failed to update notes:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await adminDeleteInquiry(id);
      const nextList = inquiries.filter((inq) => inq.id !== id);
      setInquiries(nextList);
      if (selected?.id === id) {
        setSelected(nextList[0] || null);
      }
    } catch (error) {
      console.error("Failed to delete inquiry:", error);
      alert("Failed to delete inquiry.");
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <span className="material-symbols-outlined animate-spin text-primary text-4xl">
          sync
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-10rem)] pb-4 animate-in fade-in duration-700">
      {/* Left: list */}
      <div className="w-full lg:max-w-md flex flex-col gap-4 shrink-0">
        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap">
          {STATUS_OPTIONS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest font-sans transition-colors ${
                filter === f
                  ? "bg-primary text-on-primary shadow-md"
                  : "bg-surface border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
              }`}
            >
              {f} <span className="opacity-70">({counts[f] || 0})</span>
            </button>
          ))}
        </div>

        {/* Inquiry list */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-surface-container-low rounded border border-dashed border-outline-variant">
              <p className="text-xs text-on-surface-variant font-sans italic">
                No inquiries found.
              </p>
            </div>
          ) : (
            filtered.map((inq) => (
              <button
                key={inq.id}
                onClick={() => setSelected(inq)}
                className={`w-full text-left p-3 rounded border transition-all duration-200 ${
                  selected?.id === inq.id
                    ? "border-primary bg-primary-fixed/20 shadow-sm"
                    : "border-outline-variant bg-surface hover:border-primary hover:bg-surface-container-lowest"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-[10px] font-bold font-sans shrink-0">
                    {getInitials(inq.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-on-surface font-sans truncate">
                        {inq.name}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[8px] font-bold font-sans shrink-0 uppercase tracking-tighter ${
                          STATUS_STYLE[inq.status]
                        }`}
                      >
                        {inq.status}
                      </span>
                    </div>
                    <p className="text-[10px] font-semibold text-secondary font-sans truncate">
                      {inq.trek || "General Interest"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 pl-11">
                  <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-outline font-sans">
                    <span className="material-symbols-outlined text-xs">
                      mail
                    </span>
                    Email
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-outline font-sans">
                    {new Date(inq.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Right: detail panel */}
      <div className="flex-1 bg-surface border border-outline-variant rounded flex flex-col overflow-hidden shadow-sm">
        {selected ? (
          <>
            {/* Detail header */}
            <div
              className="px-5 py-3 border-b border-outline-variant flex items-center
          justify-between bg-surface-container-lowest shrink-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container
          flex items-center justify-center text-[10px] font-bold font-sans"
                >
                  {" "}
                  {getInitials(selected.name)}
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-primary leading-tight">
                    {selected.name}
                  </h3>
                  <p className="text-[11px] text-on-surface-variant font-sans leading-none mt-0.5">
                    {selected.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest font-sans ${
                    STATUS_STYLE[selected.status]
                  }`}
                >
                  {selected.status}
                </span>
                <select
                  value={selected.status}
                  onChange={(e) =>
                    handleStatusChange(
                      selected.id,
                      e.target.value as InquiryStatus,
                    )
                  }
                  disabled={saving}
                  className="border border-outline-variant rounded px-2 py-1 text-[9px] font-bold
          uppercase tracking-widest font-sans bg-surface focus:outline-none focus:border-primary
          text-on-surface-variant cursor-pointer"
                >
                  <option value="" disabled>
                    Status
                  </option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Converted">Converted</option>
                  <option value="Closed">Closed</option>
                </select>
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="w-8 h-8 flex items-center justify-center text-outline hover:text-error transition-colors"
                  title="Delete Inquiry"
                >
                  <span className="material-symbols-outlined text-lg">
                    delete
                  </span>
                </button>
              </div>
            </div>

            {/* Inquiry details */}
            <div className="px-5 py-4 flex-1 overflow-y-auto space-y-5 custom-scrollbar">
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: "hiking",
                    label: "Trek",
                    value: selected.trek || "General",
                  },
                  {
                    icon: "calendar_today",
                    label: "Date",
                    value: new Date(selected.created_at).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric", year: "numeric" },
                    ),
                  },
                  {
                    icon: "phone",
                    label: "Phone",
                    value: selected.phone || "—",
                  },
                  {
                    icon: "mail",
                    label: "Email",
                    value: selected.email,
                  },
                ].map((d) => (
                  <div
                    key={d.label}
                    className="bg-surface-container-low rounded p-3 border border-outline-variant/30 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded bg-surface flex items-center justify-center shrink-0 border border-outline-variant/20">
                      <span className="material-symbols-outlined text-base text-outline">
                        {d.icon}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-outline font-sans leading-none mb-1">
                        {d.label}
                      </p>
                      <p className="text-xs font-bold text-on-surface font-sans truncate">
                        {d.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-outline">
                    chat
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-outline font-sans">
                    Message
                  </p>
                </div>
                <div className="p-4 bg-surface-container-low rounded text-xs text-on-surface font-sans leading-relaxed border border-outline-variant/30 italic">
                  &quot;{selected.message}&quot;
                </div>
              </div>

              {/* Internal Notes */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-outline">
                    edit_note
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-outline font-sans">
                    Internal Notes
                  </p>
                </div>
                <textarea
                  rows={3}
                  defaultValue={selected.internal_notes || ""}
                  onBlur={(e) => handleNotesChange(selected.id, e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded p-3 text-xs font-sans focus:outline-none focus:border-primary transition-all resize-none placeholder:text-on-surface-variant/40 placeholder:italic"
                  placeholder="Type follow-up notes here..."
                />
              </div>
            </div>

            {/* Actions */}
            <div
              className="px-5 py-3 border-t border-outline-variant flex items-center gap-3
          bg-surface-container-lowest shrink-0"
            >
              <a
                href={`https://wa.me/${selected.phone?.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Hi ${selected.name}, this is from Himalayan Vistas regarding your inquiry about ${selected.trek || "our trekking packages"}.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 border border-outline-variant rounded
          text-[9px] font-bold uppercase tracking-widest font-sans text-whatsapp
          hover:bg-surface-container transition-all"
              >
                <span className="material-symbols-outlined text-base">
                  chat
                </span>
                WhatsApp
              </a>
              <a
                href={`mailto:${selected.email}`}
                className="flex items-center gap-2 px-3 py-2 border border-outline-variant rounded
          text-[9px] font-bold uppercase tracking-widest font-sans text-on-surface-variant
          hover:bg-surface-container transition-all"
              >
                <span className="material-symbols-outlined text-base">
                  mail
                </span>
                Email
              </a>
              <div className="ml-auto text-right">
                <p
                  className="text-[8px] font-bold uppercase tracking-[0.1em] text-outline font-sans
          opacity-60 leading-tight"
                >
                  Last Update
                </p>
                <p className="text-[10px] font-bold text-on-surface-variant font-sans leading-tight">
                  {new Date(selected.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-outline">
                mail
              </span>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-primary">
                Select an Inquiry
              </h3>
              <p className="text-sm text-on-surface-variant font-sans max-w-xs">
                Choose an inquiry from the list to view full details and manage
                the lead.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
