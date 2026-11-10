import { Hero } from "@/components/sections/Hero";
import { WorkSection } from "@/components/sections/WorkSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { StackSection } from "@/components/sections/StackSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { BackToTop } from "@/components/ui/BackToTop";

export default function HomePage() {
  return (
    <>
      <BackToTop />
      <Hero />
      <WorkSection />
      <ExperienceSection />
      <StackSection />
      <ContactSection />
    </>
  );
}
