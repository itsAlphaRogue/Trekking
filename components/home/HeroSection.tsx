"use client";
import { useState, useRef, useEffect } from "react";

export default function HeroSection() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Spring");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = ["Spring", "Autumn", "Summer", "Winter"];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative h-180 flex items-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Mount Everest"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrgoSqs4cPQK1mamJWCRgY6Gm__s3TK3uTF2gVhwu6Qx6wXw8bzTW3lcHsvFbHGqFgWvoP28sX979m_SC-3eyPhYC93hmVE04hjgKQy-5CFWk-K6mss85ILUTusAB5WyvjqzvuPf31ESLf2Bv-w0QsLNc0rx5PbF4AkdhC00IqHoEJQlhNStnvXmTTTixSlkB-7Esb4tpSL_IRkJnRm-PR2iwId77btUUz7cIKo3AE2nr0rPc8iJSrmSJ-MhLdCKnbtTEsi4xc8vnz"
        />
        <div className="absolute inset-0 bg-linear-to-r from-primary-container/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
        <div className="max-w-2xl">
          <span className="text-white text-xs font-semibold uppercase tracking-widest mb-4 block">
            Peak Performance Guiding
          </span>

          <h1 className="text-white text-5xl md:text-[64px] leading-tight font-bold mb-8">
            Scale the Roof of the World.
          </h1>

          <p className="text-white/90 text-lg mb-10 max-w-lg">
            Experience the raw majesty of the Himalayas with elite-level safety
            protocols and premium high-altitude support.
          </p>

          {/* Search Bar */}
          <div className="bg-white/10 backdrop-blur-xl p-2 flex flex-col md:flex-row items-center gap-4 border border-white/20">
            {/* Search Input */}
            <div className="flex-1 w-full px-4 flex items-center gap-3">
              <svg className=" h-5 fill-white/80" viewBox="0 0 640 640">
                <path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM370.7 389.1L226.4 444.6C207 452.1 187.9 433 195.4 413.6L250.9 269.3C254.2 260.8 260.8 254.2 269.3 250.9L413.6 195.4C433 187.9 452.1 207 444.6 226.4L389.1 370.7C385.9 379.2 379.2 385.8 370.7 389.1zM352 320C352 302.3 337.7 288 320 288C302.3 288 288 302.3 288 320C288 337.7 302.3 352 320 352C337.7 352 352 337.7 352 320z" />
              </svg>

              <input
                className="bg-transparent text-white placeholder-white/60 focus:outline-none w-full text-base py-3"
                placeholder="Find Your Adventure..."
                type="text"
              />
            </div>

            <div className="h-6 w-px bg-white/20 hidden md:block" />

            {/* Custom Dropdown */}
            <div
              ref={dropdownRef}
              className="flex-1 w-full px-4 flex items-center gap-3 relative cursor-pointer group"
              onClick={() => setOpen(!open)}
            >
              <svg
                className=" h-5 fill-white/80"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <path d="M224 64C241.7 64 256 78.3 256 96L256 128L384 128L384 96C384 78.3 398.3 64 416 64C433.7 64 448 78.3 448 96L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 96C192 78.3 206.3 64 224 64zM160 304L160 336C160 344.8 167.2 352 176 352L208 352C216.8 352 224 344.8 224 336L224 304C224 295.2 216.8 288 208 288L176 288C167.2 288 160 295.2 160 304zM288 304L288 336C288 344.8 295.2 352 304 352L336 352C344.8 352 352 344.8 352 336L352 304C352 295.2 344.8 288 336 288L304 288C295.2 288 288 295.2 288 304zM432 288C423.2 288 416 295.2 416 304L416 336C416 344.8 423.2 352 432 352L464 352C472.8 352 480 344.8 480 336L480 304C480 295.2 472.8 288 464 288L432 288zM160 432L160 464C160 472.8 167.2 480 176 480L208 480C216.8 480 224 472.8 224 464L224 432C224 423.2 216.8 416 208 416L176 416C167.2 416 160 423.2 160 432zM304 416C295.2 416 288 423.2 288 432L288 464C288 472.8 295.2 480 304 480L336 480C344.8 480 352 472.8 352 464L352 432C352 423.2 344.8 416 336 416L304 416zM416 432L416 464C416 472.8 423.2 480 432 480L464 480C472.8 480 480 472.8 480 464L480 432C480 423.2 472.8 416 464 416L432 416C423.2 416 416 423.2 416 432z" />
              </svg>

              <div className="flex items-center justify-between w-full text-white text-base py-3 select-none">
                <span className="text-white/90">{selected}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>

              {/* Dropdown Menu Overlay */}
              {open && (
                <div className="absolute left-0 top-[calc(100%+12px)] w-full bg-primary/40 backdrop-blur-3xl border border-white/20 shadow-2xl z-50 overflow-hidden">
                  {options.map((opt) => (
                    <div
                      key={opt}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(opt);
                        setOpen(false);
                      }}
                      className={`w-full text-left px-6 py-4 text-sm font-medium transition-all cursor-pointer
                        ${
                          selected === opt
                            ? "bg-white text-primary-container"
                            : "text-white/80 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Button */}
            <button className="w-full md:w-auto bg-white text-primary-container px-8 py-4 text-xs font-semibold uppercase tracking-widest hover:bg-stone-100 transition-colors whitespace-nowrap">
              Search Treks
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
