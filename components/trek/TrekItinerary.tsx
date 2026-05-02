import { ItineraryDay } from "@/lib/treks";

export default function TrekItinerary({ days }: { days: ItineraryDay[] }) {
  return (
    <div>
      <h2 className="font-serif text-[40px] leading-[48px] font-semibold text-on-surface mb-8">
        The Expedition Itinerary
      </h2>

      <div className="space-y-0">
        {days.map((item, index) => {
          const isLast = index === days.length - 1;

          return (
            <div key={index} className="relative pb-8">
              {/* Vertical connector line */}
              {!isLast && (
                <span
                  className="absolute left-[7px] top-6 bottom-0 w-0.5 bg-secondary-container"
                  aria-hidden="true"
                />
              )}

              <div className="flex gap-6">
                {/* Node */}
                {item.isCollapsed ? (
                  <div className="relative z-10 flex items-center justify-center w-4 h-4 rounded-full bg-surface-container-highest shrink-0 mt-1.5">
                    <span className="w-1.5 h-1.5 bg-outline rounded-full" />
                  </div>
                ) : (
                  <div className="relative z-10 w-4 h-4 rounded-full bg-secondary shrink-0 mt-1.5 border-4 border-surface" />
                )}

                {/* Content */}
                <div>
                  {item.isCollapsed ? (
                    <>
                      <span className="text-xs font-semibold uppercase tracking-widest text-outline font-sans">
                        {item.day}
                      </span>
                      <p className="text-base italic text-on-surface-variant mt-1 font-sans">
                        {item.description}
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="font-serif text-xl font-semibold mb-2">
                        {item.day}: {item.title}
                      </h3>
                      <p className="text-base text-on-surface-variant font-sans">
                        {item.description}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
