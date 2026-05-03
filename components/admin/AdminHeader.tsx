"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/admin/dashboard": {
    title: "Overview",
    subtitle: "Welcome back. Here is what's happening today.",
  },
  "/admin/treks": {
    title: "Active Treks",
    subtitle: "Monitor all live expeditions in real time.",
  },
  "/admin/bookings": {
    title: "Bookings",
    subtitle: "Manage all confirmed and pending bookings.",
  },
  "/admin/inquiries": {
    title: "Inquiries",
    subtitle: "Respond to new and ongoing client inquiries.",
  },
  "/admin/finance": {
    title: "Finance",
    subtitle: "Revenue, expenses, and financial summaries.",
  },
  "/admin/settings": {
    title: "Settings",
    subtitle: "Manage your account and system preferences.",
  },
};

export default function AdminHeader() {
  const pathname = usePathname();
  const match =
    Object.entries(pageTitles).find(([key]) => pathname.startsWith(key))?.[1] ??
    pageTitles["/admin/dashboard"];

  return (
    <header className="h-20 border-b border-outline-variant flex items-center justify-between px-8 md:px-10 bg-surface/80 backdrop-blur-md sticky top-0 z-10 shrink-0">
      <div>
        <h2 className="font-serif text-xl font-semibold text-primary">
          {match.title}
        </h2>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-outline font-sans">
          {match.subtitle}
        </p>
      </div>

      <div className="flex items-center gap-5">
        {/* Notification */}
        <div className="relative cursor-pointer">
          <span className=" text-on-surface-variant hover:text-primary transition-colors">
            <svg
              className="h-6 fill-on-surface-variant"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
            </svg>
          </span>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full" />
        </div>

        {/* Date range */}
        <div className="flex items-center gap-2 border border-outline-variant px-3 py-2 rounded bg-surface-container-lowest">
          <span className="material-symbols-outlined text-outline text-sm">
            <svg
              className=" h-5 fill-on-surface-variant"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M224 64C241.7 64 256 78.3 256 96L256 128L384 128L384 96C384 78.3 398.3 64 416 64C433.7 64 448 78.3 448 96L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 96C192 78.3 206.3 64 224 64zM160 304L160 336C160 344.8 167.2 352 176 352L208 352C216.8 352 224 344.8 224 336L224 304C224 295.2 216.8 288 208 288L176 288C167.2 288 160 295.2 160 304zM288 304L288 336C288 344.8 295.2 352 304 352L336 352C344.8 352 352 344.8 352 336L352 304C352 295.2 344.8 288 336 288L304 288C295.2 288 288 295.2 288 304zM432 288C423.2 288 416 295.2 416 304L416 336C416 344.8 423.2 352 432 352L464 352C472.8 352 480 344.8 480 336L480 304C480 295.2 472.8 288 464 288L432 288zM160 432L160 464C160 472.8 167.2 480 176 480L208 480C216.8 480 224 472.8 224 464L224 432C224 423.2 216.8 416 208 416L176 416C167.2 416 160 423.2 160 432zM304 416C295.2 416 288 423.2 288 432L288 464C288 472.8 295.2 480 304 480L336 480C344.8 480 352 472.8 352 464L352 432C352 423.2 344.8 416 336 416L304 416zM416 432L416 464C416 472.8 423.2 480 432 480L464 480C472.8 480 480 472.8 480 464L480 432C480 423.2 472.8 416 464 416L432 416C423.2 416 416 423.2 416 432z" />
            </svg>
          </span>
          <span className="text-xs font-semibold font-sans text-on-surface">
            Oct 24 – Oct 30
          </span>
        </div>

        {/* New booking */}
        <button className="bg-primary text-on-primary px-5 py-2 rounded text-xs font-semibold font-sans flex items-center gap-2 hover:bg-primary-container transition-colors">
          <span className="text-lg">
            <svg
              className="h-5 fill-on-primary"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          </span>
          New Booking
        </button>
      </div>
    </header>
  );
}
