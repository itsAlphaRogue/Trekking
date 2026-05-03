"use client";
import { useState } from "react";

type Tab = "profile" | "company" | "notifications" | "security";

export default function AdminSettingsPage() {
  const [tab, setTab] = useState<Tab>("profile");

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: "profile",       label: "Profile",       icon: "person" },
    { key: "company",       label: "Company Info",  icon: "business" },
    { key: "notifications", label: "Notifications", icon: "notifications" },
    { key: "security",      label: "Security",      icon: "lock" },
  ];

  return (
    <div className="max-w-4xl space-y-6 pb-10">
      {/* Tab nav */}
      <div className="flex gap-1 bg-surface-container-low p-1 rounded-lg w-fit">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold font-sans transition-colors ${
              tab === t.key
                ? "bg-surface text-primary shadow-sm"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined text-base">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "profile" && (
        <div className="bg-surface border border-outline-variant rounded overflow-hidden">
          <div className="px-8 py-5 border-b border-outline-variant">
            <h3 className="font-serif text-lg font-semibold text-primary">Profile Settings</h3>
            <p className="text-xs text-on-surface-variant font-sans mt-1">Update your personal information and avatar.</p>
          </div>
          <div className="p-8 space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-surface-container-highest overflow-hidden">
                <img alt="Admin" className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm7GHZ1MDiggW9vIQlcRMe4dydXnSr3lCPdClZmPlD5Je8L0XFs-SUZg1OLu9n7kDI7prdB-Rq8dc87_jTkvtV_rKODP9o-X_7H_9lPoyVbhbLUh11F1BwUMQEUC3UfqiekQuqs3fTMlNcsdDlf7ODE5-deKIwMQ1oK51bBNh37cnb66TJkyAP4XPgcDY0KsUxwG9KaieMoRlS3w0-DXa25i3NPtoWvXYNBI9J59nK3eNNqz2Nb_1d7-qIJ_Py4mdo4Zq4PaSMWd0j"
                />
              </div>
              <div>
                <button className="text-xs font-semibold text-primary border border-primary rounded px-4 py-2 font-sans hover:bg-primary hover:text-on-primary transition-colors">
                  Change Photo
                </button>
                <p className="text-[11px] text-outline font-sans mt-2">JPG, PNG up to 2MB</p>
              </div>
            </div>
            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Full Name", value: "Tashi Dorje" },
                { label: "Role", value: "Chief Operations" },
                { label: "Email", value: "tashi@himalayanvistas.com" },
                { label: "Phone", value: "+977 98-0000-0000" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">{f.label}</label>
                  <input defaultValue={f.value} className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors" />
                </div>
              ))}
            </div>
            <button className="bg-primary text-on-primary px-6 py-2.5 rounded text-xs font-semibold font-sans hover:bg-primary-container transition-colors">Save Changes</button>
          </div>
        </div>
      )}

      {tab === "company" && (
        <div className="bg-surface border border-outline-variant rounded overflow-hidden">
          <div className="px-8 py-5 border-b border-outline-variant">
            <h3 className="font-serif text-lg font-semibold text-primary">Company Information</h3>
            <p className="text-xs text-on-surface-variant font-sans mt-1">Displayed on invoices, website, and communications.</p>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Company Name", value: "Himalayan Vistas Pvt. Ltd." },
                { label: "Registration No.", value: "NP-2018-TK-04821" },
                { label: "Contact Email", value: "contact@himalayanvistas.com" },
                { label: "Phone", value: "+977 1 442 3890" },
                { label: "WhatsApp Number", value: "+977 98-0000-0000" },
                { label: "Website", value: "https://himalayanvistas.com" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">{f.label}</label>
                  <input defaultValue={f.value} className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors" />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">Office Address</label>
              <textarea defaultValue="Street 42, Thamel Ward 26, Kathmandu 44600, Nepal" rows={2}
                className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors resize-none" />
            </div>
            <button className="bg-primary text-on-primary px-6 py-2.5 rounded text-xs font-semibold font-sans hover:bg-primary-container transition-colors">Save Changes</button>
          </div>
        </div>
      )}

      {tab === "notifications" && (
        <div className="bg-surface border border-outline-variant rounded overflow-hidden">
          <div className="px-8 py-5 border-b border-outline-variant">
            <h3 className="font-serif text-lg font-semibold text-primary">Notification Preferences</h3>
            <p className="text-xs text-on-surface-variant font-sans mt-1">Choose what alerts you receive and how.</p>
          </div>
          <div className="p-8 divide-y divide-outline-variant">
            {[
              { label: "New Inquiry Received",    desc: "Alert when a new inquiry comes through WhatsApp or email form.", on: true },
              { label: "Booking Confirmed",       desc: "Notify when a client completes a booking.", on: true },
              { label: "Trek Day Milestone",      desc: "Daily check-in updates from guides on active treks.", on: true },
              { label: "Payment Received",        desc: "Alert on successful payment transaction.", on: true },
              { label: "Booking Cancellation",    desc: "Notify when a confirmed booking is cancelled.", on: false },
              { label: "Weekly Revenue Summary",  desc: "Weekly digest of bookings and revenue performance.", on: false },
            ].map((n) => (
              <div key={n.label} className="flex items-start justify-between py-5 gap-8">
                <div>
                  <p className="text-sm font-semibold text-on-surface font-sans">{n.label}</p>
                  <p className="text-xs text-on-surface-variant font-sans mt-0.5">{n.desc}</p>
                </div>
                <button className={`w-11 h-6 rounded-full transition-colors shrink-0 relative ${n.on ? "bg-primary" : "bg-surface-container-highest"}`}>
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${n.on ? "left-6" : "left-1"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "security" && (
        <div className="space-y-6">
          <div className="bg-surface border border-outline-variant rounded overflow-hidden">
            <div className="px-8 py-5 border-b border-outline-variant">
              <h3 className="font-serif text-lg font-semibold text-primary">Change Password</h3>
            </div>
            <div className="p-8 space-y-6">
              {["Current Password", "New Password", "Confirm New Password"].map((f) => (
                <div key={f}>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">{f}</label>
                  <input type="password" className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors" placeholder="••••••••" />
                </div>
              ))}
              <button className="bg-primary text-on-primary px-6 py-2.5 rounded text-xs font-semibold font-sans hover:bg-primary-container transition-colors">Update Password</button>
            </div>
          </div>
          <div className="bg-surface border border-outline-variant rounded p-8 flex items-start justify-between gap-8">
            <div>
              <h4 className="text-sm font-semibold text-on-surface font-sans">Two-Factor Authentication</h4>
              <p className="text-xs text-on-surface-variant font-sans mt-1 max-w-sm">Add an extra layer of security to your account using an authenticator app.</p>
            </div>
            <button className="bg-secondary-container text-on-secondary-fixed-variant px-4 py-2 rounded text-xs font-semibold font-sans hover:opacity-90 transition-opacity shrink-0">Enable 2FA</button>
          </div>
          <div className="bg-error-container border border-error/30 rounded p-8 flex items-start justify-between gap-8">
            <div>
              <h4 className="text-sm font-semibold text-error font-sans">Danger Zone</h4>
              <p className="text-xs text-on-surface-variant font-sans mt-1 max-w-sm">Permanently delete this admin account. This action cannot be undone.</p>
            </div>
            <button className="border border-error text-error px-4 py-2 rounded text-xs font-semibold font-sans hover:bg-error hover:text-on-error transition-colors shrink-0">Delete Account</button>
          </div>
        </div>
      )}
    </div>
  );
}
