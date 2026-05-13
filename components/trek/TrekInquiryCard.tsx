import Image from "next/image";
import { TrekDetail } from "@/lib/supabase/queries/treks";

export default function TrekInquiryCard({
  trek,
  contact,
}: {
  trek: TrekDetail;
  contact: { email: string; phone: string };
}) {
  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in the ${trek.title}. Can you provide more details?`,
  );
  // Clean phone number: remove non-numeric except leading +
  const cleanPhone = contact.phone.replace(/[^\d+]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappMsg}`;
  const emailSubject = encodeURIComponent(`Inquiry: ${trek.title}`);
  const emailUrl = `mailto:${contact.email}?subject=${emailSubject}`;

  return (
    <div className="sticky top-32 bg-surface-container-lowest p-8 border border-outline-variant shadow-sm">
      <h3 className="font-serif text-2xl font-semibold mb-2 text-on-surface">
        Book Your Trek
      </h3>
      <p className="text-base text-on-surface-variant mb-6 font-sans">
        Experience the high-altitude reliability of Himalayan Vistas.
      </p>

      {/* CTA buttons */}
      <div className="mt-8 flex flex-col gap-4">
        <a
          href={emailUrl}
          className="w-full bg-primary-container text-on-primary py-4 font-serif text-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">mail</span>
          Inquire via Email
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full border-2 border-secondary text-secondary py-4 font-serif text-lg flex items-center justify-center gap-2 hover:bg-secondary hover:text-on-secondary active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">chat</span>
          WhatsApp Inquiry
        </a>
      </div>

      {/* Guide section */}
      {trek.guideName && (
        <div className="mt-8 border-t border-outline-variant pt-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-surface-container-high overflow-hidden shrink-0 relative">
              <Image
                alt={trek.guideName}
                className="w-full h-full object-cover"
                src={trek.guideImage || "/fallback.png"}
                fill
                sizes="48px"
              />
            </div>
            <div>
              <p className="text-base font-bold font-sans">{trek.guideName}</p>
              <p className="text-xs text-on-surface-variant font-sans">
                {trek.guideTitle}
              </p>
            </div>
          </div>
          {trek.guideQuote && (
            <p className="text-sm italic text-on-surface-variant font-sans">
              &ldquo;{trek.guideQuote}&rdquo;
            </p>
          )}
        </div>
      )}
    </div>
  );
}
