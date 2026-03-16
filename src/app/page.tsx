import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/features/hero/HeroSection";
import { GallerySection } from "@/features/gallery/GallerySection";
import { WorkingHoursSection } from "@/features/working-hours/WorkingHoursSection";
import { DiscountsSection } from "@/features/discounts/DiscountsSection";
import { TrainersSection } from "@/features/trainers/TrainersSection";
import { ScheduleSection } from "@/features/schedule/ScheduleSection"; // <-- ДОДАНО ІМПОРТ
import { ServicesSection } from "@/features/services/ServicesSection";
import { KBZhVCtaSection } from "@/features/kbzhv-cta/KBZhVCtaSection";
import { ContactSection } from "@/features/contact/ContactSection";


export default function HomePage() {
  return (
    // ПРИБРАНО bg-zinc-950, тепер фон прозорий і видно SiteBackground
    <div className="relative w-full min-h-dvh overflow-hidden">

      {/* Header */}
      <div className="absolute inset-x-0 top-0 z-50">
        <Header />
      </div>

      <main className="relative z-10 w-full flex flex-col">

        {/* Hero Section */}
        <div className="min-h-dvh w-full">
          <HeroSection />
        </div>

        {/* Інші секції */}
        <GallerySection />
        <WorkingHoursSection />

        <DiscountsSection />

        <TrainersSection />

        {/* НОВА СЕКЦІЯ РОЗКЛАДУ */}
        <ScheduleSection />

        <ServicesSection />

        <KBZhVCtaSection />
        <ContactSection />

      </main>

      <Footer />
    </div>
  );
}