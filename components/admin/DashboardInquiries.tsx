"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminGetInquiries, Inquiry } from "@/lib/supabase/queries/inquiries";

export default function DashboardInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminGetInquiries()
      .then((data) => setInquiries(data.slice(0, 4)))
      .finally(() => setLoading(false));
  }, []);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "New":
        return "bg-tertiary-fixed text-on-tertiary-fixed-variant";
      case "Contacted":
        return "bg-secondary-container text-on-secondary-container";
      case "Converted":
        return "bg-primary-container text-on-primary-container";
      default:
        return "bg-surface-container-highest text-on-surface-variant";
    }
  };

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

      <div className="flex-1 overflow-x-auto min-h-[300px]">
        {loading ? (
          <div className="h-full flex items-center justify-center py-10">
            <span className="material-symbols-outlined animate-spin text-primary">
              sync
            </span>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-surface-container-low">
              <tr>
                {["Client", "Interest", "Status", ""].map((h) => (
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
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center">
                    <p className="text-xs text-on-surface-variant italic font-sans">
                      No inquiries found.
                    </p>
                  </td>
                </tr>
              ) : (
                inquiries.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-surface-container-lowest transition-colors"
                  >
                    {/* Name */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold font-sans bg-primary-container text-on-primary-container">
                          {row.name.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-xs font-semibold text-on-surface font-sans">
                          {row.name}
                        </span>
                      </div>
                    </td>
                    {/* Trek */}
                    <td className="px-6 py-5">
                      <span className="text-sm text-on-surface-variant font-sans">
                        {row.trek || "General"}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-semibold font-sans ${getStatusClass(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    {/* Action */}
                    <td className="px-6 py-5 text-right">
                      <Link
                        href={`/admin/inquiries`}
                        className="text-outline hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined">
                          chevron_right
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
