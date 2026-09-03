import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { services } from "@/lib/content";
import { nav, site } from "@/lib/site";

const socialGlyphs: Record<string, string> = {
  LinkedIn: "in",
  X: "X",
  GitHub: "gh",
  Dribbble: "dr",
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-ink-950">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-hnx-blue/12 blur-[120px]"
      />

      <div className="shell relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-[0.8125rem] leading-relaxed text-mist-300">
              {site.shortDescription}
            </p>
            <ul className="flex gap-2 pt-1">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] font-mono text-[0.6875rem] uppercase text-mist-300 transition-colors duration-300 hover:border-hnx-cyan/40 hover:text-hnx-cyan"
                  >
                    {socialGlyphs[social.label] ?? social.label.slice(0, 2)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-col gap-4">
            <h3 className="eyebrow text-mist-400">Navigate</h3>
            <ul className="flex flex-col gap-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.8125rem] text-mist-300 transition-colors duration-300 hover:text-hnx-cyan"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="flex flex-col gap-4">
            <h3 className="eyebrow text-mist-400">Services</h3>
            <ul className="flex flex-col gap-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-[0.8125rem] text-mist-300 transition-colors duration-300 hover:text-hnx-cyan"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <h3 className="eyebrow text-mist-400">Get in touch</h3>
            <ul className="flex flex-col gap-3.5 text-[0.8125rem] text-mist-300">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 transition-colors duration-300 hover:text-hnx-cyan"
                >
                  <Mail className="h-4 w-4 text-mist-400" strokeWidth={1.6} />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                  className="inline-flex items-center gap-2.5 transition-colors duration-300 hover:text-hnx-cyan"
                >
                  <Phone className="h-4 w-4 text-mist-400" strokeWidth={1.6} />
                  {site.phone}
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mist-400" strokeWidth={1.6} />
                {site.location}
              </li>
            </ul>

            <Link
              href="/contact"
              className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[0.8125rem] font-medium text-mist-100 transition-colors duration-300 hover:border-hnx-cyan/40 hover:text-hnx-cyan"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-8 sm:flex-row">
          <p className="text-[0.75rem] text-mist-400">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-mist-400/70 uppercase">
            Building What&apos;s Next
          </p>
        </div>
      </div>
    </footer>
  );
}
