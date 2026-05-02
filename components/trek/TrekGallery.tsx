import { GalleryImage } from "@/lib/treks";

export default function TrekGallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="mt-24">
      <h2 className="font-serif text-[40px] leading-[48px] font-semibold text-on-surface mb-8">
        Glimpses of the Trail
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div
            key={i}
            className={`overflow-hidden bg-surface-container-low ${
              img.span === "wide" ? "col-span-2 aspect-video" : "aspect-square"
            }`}
          >
            <img
              alt={img.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              src={img.src}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
