import { ItineraryDay } from "@/lib/supabase/queries/treks";

export default function TrekItinerary({ days }: { days: ItineraryDay[] }) {
  if (days.length === 0) return null;

  return (
    <div>
      <h2 className="font-serif text-[40px] leading-12 font-semibold text-on-surface mb-8">
        The Expedition Itinerary
      </h2>

      <div className="bg-secondary-container/30 border-l-4 border-secondary p-4 mb-10 rounded-r-lg">
        <p className="text-sm text-on-secondary-container font-sans flex items-start gap-3">
          <span
            className="material-symbols-outlined text-secondary shrink-0"
            style={{ fontSize: "20px" }}
          >
            edit_note
          </span>

          <span>
            <strong className="text-secondary">Tailor It Your Way.</strong>{" "}
            Every expedition is{" "}
            <span className="font-black">Fully Customizable</span>. From pace
            and acclimatization days to hidden trails and exclusive experiences.
          </span>
        </p>
      </div>

      <div className="space-y-0">
        {days.map((item, index) => {
          const isLast = index === days.length - 1;
          return (
            <div key={item.id} className="relative pb-8">
              {/* Vertical connector line */}
              {!isLast && (
                <span
                  className="absolute left-1.75 top-6 bottom-0 w-0.5 bg-secondary-container"
                  aria-hidden="true"
                />
              )}

              <div className="flex gap-6">
                {/* Node */}
                {item.is_collapsed ? (
                  <div className="relative z-10 flex items-center justify-center w-4 h-4 rounded-full bg-surface-container-highest shrink-0 mt-1.5">
                    <span className="w-1.5 h-1.5 bg-outline rounded-full" />
                  </div>
                ) : (
                  <div className="relative z-10 w-4 h-4 rounded-full bg-secondary shrink-0 mt-1.5 border-4 border-surface" />
                )}

                {/* Content */}
                <div>
                  {item.is_collapsed ? (
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
