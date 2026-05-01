import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-100 border-t border-stone-200 mt-20 transition-all">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="font-serif font-bold text-lg text-[#1B365D]">
            Himalayan Vistas
          </span>
          <p className="font-serif text-sm text-stone-500">
            © 2024 Himalayan Vistas. Crafted for high-altitude reliability.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-8">
          {["Sustainability", "Safety Protocols", "Partner with Us", "FAQ"].map(
            (item) => (
              <Link
                key={item}
                href="#"
                className="font-serif text-sm text-stone-500 hover:text-[#1B365D] transition-colors"
              >
                {item}
              </Link>
            )
          )}
        </nav>

        <div className="flex gap-4">
          <button className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:border-[#1B365D] hover:text-[#1B365D] transition-colors">
            <span className="material-symbols-outlined text-xl">public</span>
          </button>
          <button className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:border-[#1B365D] hover:text-[#1B365D] transition-colors">
            <span className="material-symbols-outlined text-xl">
              photo_camera
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
