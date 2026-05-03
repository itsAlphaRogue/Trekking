export default function ContactSidebar() {
  const whatsappMsg = encodeURIComponent(
    "Hi, I'd like to inquire about trekking packages with Himalayan Vistas."
  );
  const whatsappUrl = `https://wa.me/9779800000000?text=${whatsappMsg}`;

  return (
    <div className="lg:col-span-5 flex flex-col gap-8">
      {/* Quick contact cards */}
      <div className="flex flex-col gap-4">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center p-6 bg-surface-container border border-outline-variant hover:border-secondary transition-all"
        >
          <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center mr-6 group-hover:scale-110 transition-transform shrink-0">
            <span className="material-symbols-outlined text-on-secondary-container text-3xl">
              chat
            </span>
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold text-primary">
              Start a WhatsApp Chat
            </h3>
            <p className="text-base text-on-surface-variant font-sans">
              +977 98-0000-0000
            </p>
          </div>
        </a>

        <a
          href="mailto:contact@himalayanvistas.com"
          className="group flex items-center p-6 bg-surface-container border border-outline-variant hover:border-secondary transition-all"
        >
          <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center mr-6 group-hover:scale-110 transition-transform shrink-0">
            <span className="material-symbols-outlined text-on-secondary-container text-3xl">
              mail
            </span>
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold text-primary">
              Send an Email
            </h3>
            <p className="text-base text-on-surface-variant font-sans">
              contact@himalayanvistas.com
            </p>
          </div>
        </a>
      </div>

      {/* Office info card */}
      <div className="p-10 bg-primary text-on-primary shadow-2xl relative overflow-hidden">
        {/* decorative icon */}
        <div className="absolute -right-12 -top-12 opacity-10 pointer-events-none">
          <span
            className="material-symbols-outlined text-[160px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            location_on
          </span>
        </div>

        <h3 className="font-serif text-2xl font-semibold mb-6">
          Kathmandu Headquarters
        </h3>

        <div className="space-y-4 text-base font-sans">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined mt-0.5 shrink-0">
              pin_drop
            </span>
            <p>
              Street 42, Thamel Ward 26,
              <br />
              Kathmandu 44600, Nepal
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined shrink-0">call</span>
            <p>+977 1 442 3890</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined shrink-0">schedule</span>
            <p>Mon – Fri: 9:00 AM – 6:00 PM (NPT)</p>
          </div>
        </div>

        {/* Map thumbnail */}
        <div className="mt-8 pt-8 border-t border-on-primary/20">
          <p className="text-xs font-semibold uppercase tracking-widest text-on-primary/80 mb-4 font-sans">
            Location Map
          </p>
          <div className="h-48 w-full bg-primary-container rounded-sm overflow-hidden border border-on-primary/10 group">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Kathmandu, Nepal"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXzZvXiFl4XHkbPu2ellDgm-MZqcs6cyxYKIVVx0A46_s09_cU2gIz-KgyUBGoby-rRdN3ceTgJAGxb2zrt_Zs_ZJYC82es-nww8ldwq_RcfFbNEJ90O6oajS9LvuzcVGrIJ9AQJD1AVhDHp6G0Ccjg9OLZbwWxIr0MHMGpHqOkda6wFkurOsVjC9AWyb9DZ555LtN-7A59L2Kh4DXVG8fAVMW2WfZn72nMoBFeMy0VUt7bk1vLXVTDRRmDN9EvGc7BClKQSK6-YzI"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
