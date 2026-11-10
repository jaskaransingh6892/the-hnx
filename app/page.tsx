import { Hero } from "@/components/sections/Hero";
import { TrustIntro } from "@/components/sections/TrustIntro";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { WhySection } from "@/components/sections/WhySection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TechSection } from "@/components/sections/TechSection";
import { GuidesSection } from "@/components/sections/GuidesSection";
import { CTASection } from "@/components/sections/CTASection";
import { TestimonialsSection } from "@/components/sections/Testimonials";
import { NewsletterSection } from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustIntro />
      <ServicesSection />
      <ProductsSection limit={3} />
      <WhySection />
      <ProcessSection />
      <TechSection />
      <GuidesSection />
      <TestimonialsSection />
      <NewsletterSection />
      <CTASection />
    </>
  );
}
