import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a project with ${site.name}. Tell us what you are building and a senior engineer will reply within one business day.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Build"
        highlight="What's Next."
        description="Tell us what you have in mind. Rough ideas are welcome — most of the best projects arrive as a paragraph and a question."
      />
      <ContactSection />
    </>
  );
}
