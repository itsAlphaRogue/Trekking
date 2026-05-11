export default function Footer() {
  return (
    <footer className="bg-stone-100 border-t border-stone-200 mt-20 transition-all">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="font-serif font-bold text-lg text-primary-container">
            Himalayan Vistas
          </span>
          <p className="font-serif text-sm text-stone-500">
            © 2024 Himalayan Vistas. Crafted for high-altitude reliability.
          </p>
        </div>

        <div>{/*TODO: social media icons */}</div>
      </div>
    </footer>
  );
}
