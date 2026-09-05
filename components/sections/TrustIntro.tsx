import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { products } from "@/lib/content";

/**
 * This panel used to hold four counters — projects delivered, industries
 * served, years of expertise. None of them could be checked by a reader, and
 * one contradicted the technology section further down the page. Shipped
 * software a visitor can open is worth more than a number they have to take
 * on faith, so that is what sits here instead.
 */
const commitments = [
  "A senior engineer reads every enquiry, and replies within one business day",
  "You own the code, the repositories, and the infrastructure accounts",
  "Same engineers and same standards, whether the brief is a marketing site or an ERP",
];

export function TrustIntro() {
  return (
    <section id="intro" className="relative overflow-hidden border-y border-white/[0.06] py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-hnx-blue/50 to-transparent"
      />

      <div className="shell relative grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-20">
        <div className="flex flex-col gap-6">
          <Reveal>
            <p className="font-display text-[clamp(1.6rem,3.6vw,2.6rem)] font-semibold leading-[1.16] text-mist-100">
              The HNX is where ideas evolve into{" "}
              <span className="text-gradient-accent">powerful digital experiences.</span>
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-mist-300 sm:text-base">
              We partner with startups, growing businesses, and enterprises to build software
              that holds up as they scale. Some of it is our own — products we design, ship,
              and support. The rest is built for clients who need a technology team that thinks
              in systems rather than tickets.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-mist-300 sm:text-base">
              Same engineers, same standards, whether the brief is a marketing site or an ERP
              replacing fifteen years of spreadsheets.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-4">
          <Stagger className="flex flex-col gap-4">
            {products.map((product) => (
              <StaggerItem key={product.slug}>
                <article className="glass edge-glow group relative overflow-hidden rounded-2xl p-5 sm:p-6">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-hnx-blue/16 blur-2xl transition-colors duration-500 group-hover:bg-hnx-cyan/24"
                  />
                  <div className="relative flex items-baseline gap-2.5">
                    <h3 className="font-display text-lg font-bold text-mist-100">{product.name}</h3>
                    <span className="eyebrow text-mist-400">{product.category}</span>
                  </div>
                  <p className="relative mt-2 text-[0.8125rem] leading-relaxed text-mist-300">
                    {product.summary}
                  </p>
                  <div className="relative mt-4 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-mist-200 transition-colors duration-300 hover:text-hnx-cyan"
                    >
                      Read the case study
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
                    </Link>
                    {product.href ? (
                      <a
                        href={product.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-hnx-cyan transition-colors duration-300 hover:text-hnx-blue"
                      >
                        Open it
                        <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </a>
                    ) : null}
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.12}>
            <ul className="flex flex-col gap-2.5 pt-1">
              {commitments.map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-hnx-cyan" />
                  <span className="text-[0.8125rem] leading-relaxed text-mist-300">{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
