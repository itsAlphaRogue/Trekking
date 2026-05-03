import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactSidebar from "@/components/contact/ContactSidebar";
import ContactPartners from "@/components/contact/ContactPartners";

export const metadata = {
  title: "Contact | Himalayan Vistas",
  description:
    "Get in touch with our expedition experts to plan your perfect Himalayan trek.",
};

export default function ContactPage() {
  return (
    <>
      <TopNavBar activePage="contact" />
      <main className="relative">
        <ContactHero />

        {/* Main content grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 py-24 relative">
          {/* Topographic dot pattern background */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(#466553 0.5px, transparent 0.5px)",
              backgroundSize: "24px 24px",
              opacity: 0.05,
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
            <ContactForm />
            <ContactSidebar />
          </div>
        </section>

        <ContactPartners />
      </main>
      <Footer />
    </>
  );
}
