import { ArrowRight, Quote } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Testimonial = {
  name: string;
  role: string;
  organization: string;
  quote: string;
  logo?: string;
  logoAlt?: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Rajat Mehta",
    role: "Founder",
    organization: "CityCare Clinic",
    quote:
      "Nabz replaced our paper register and three spreadsheets. The evening cash reconciliation now takes two minutes instead of two hours.",
    logo: "/brand/hnx-logo-on-light.png",
    logoAlt: "CityCare Clinic",
  },
  {
    name: "Sneha Rao",
    role: "Operations Head",
    organization: "RetailMart",
    quote:
      "MyInventory unified our till, home delivery, and online storefront. Stock numbers finally agree across every outlet.",
    logo: "/brand/hnx-logo-on-light.png",
    logoAlt: "RetailMart",
  },
  {
    name: "Arjun Singh",
    role: "Principal",
    organization: "Greenwood School",
    quote:
      "EducationCloud brought attendance, fees, and the parent app into one portal. Teachers finally have one system, not five.",
    logo: "/brand/hnx-logo-on-light.png",
    logoAlt: "Greenwood School",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-y border-slate-900/[0.06] py-20 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-hnx-violet/10 blur-[130px]"
      />

      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-6">
            <Reveal>
              <p className="eyebrow font-semibold text-hnx-blue">
                What Teams Say
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1]">
                Trusted by teams building{" "}
                <span className="text-gradient-accent">what comes next.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="max-w-xl text-[0.9375rem] leading-relaxed text-mist-300">
                From small clinics to growing schools, the software we build becomes part of how
                teams work every day.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-hnx-blue font-semibold hover:text-hnx-cyan transition-colors"
              >
                Explore our products <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
              </Link>
            </Reveal>
          </div>

          <div className="flex flex-col gap-6">
            <Stagger className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {testimonials.map((item) => (
                <StaggerItem key={item.name} className="h-full">
                  <article
                    className={cn(
                      "glass edge-glow group relative overflow-hidden rounded-2xl p-6 sm:p-8",
                    )}
                  >
                    <div className="absolute top-6 right-6 h-12 w-12 rounded-full bg-hnx-blue/10 flex items-center justify-center group-hover:bg-hnx-blue transition-colors">
                      <Quote className="h-5 w-5 text-hnx-blue group-hover:text-white" strokeWidth={1.6} />
                    </div>
                    <blockquote className="relative z-10 mt-1 mb-6 text-[0.9375rem] leading-relaxed text-mist-200">
                      “{item.quote}”
                    </blockquote>
                    <div className="flex items-start gap-3">
                      {item.logo ? (
                        <Image
                          src={item.logo}
                          alt={item.logoAlt ?? item.organization}
                          width={100}
                          height={40}
                          className="h-10 w-auto object-contain shrink-0"
                          loading="lazy"
                          decoding="async"
                          priority
                        />
                      ) : null}
                      <div className="flex flex-col">
                        <strong className="text-[0.875rem] font-semibold text-mist-100">
                          {item.name}
                        </strong>
                        <span className="text-[0.75rem] text-mist-400">
                          {item.role}, {item.organization}
                        </span>
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.24} className="mt-6">
              <div className="flex flex-wrap items-center justify-center gap-3 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {["Next.js", "PostgreSQL", "AWS", "Azure", "Node.js", "Python"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-slate-900/10 bg-slate-900/[0.03] px-3.5 py-1 text-[0.7rem] text-mist-400 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}