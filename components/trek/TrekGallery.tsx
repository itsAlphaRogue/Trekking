import { GalleryImage } from "@/lib/supabase/queries/treks";

export default function TrekGallery({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) return null;

  return (
    <div className="mt-24">
      <h2 className="font-serif text-[40px] leading-[48px] font-semibold text-on-surface mb-8">
        Glimpses of the Trail
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className={`overflow-hidden bg-surface-container-low ${
              img.span === "wide" ? "col-span-2 aspect-video" : "aspect-square"
            }`}
          >
            <img
              alt={img.alt ?? "/fallback.png"}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              src={img.src}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
