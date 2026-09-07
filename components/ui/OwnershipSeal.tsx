import { LogoMark } from "./Logo";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

/**
 * Authorship mark for the product pages.
 *
 * A case study can be read as a portfolio piece for someone else's software,
 * so these pages say plainly whose product it is. It doubles as the visible
 * half of the `author` / `copyrightHolder` claims in the page's structured
 * data — the same statement, once for readers and once for crawlers.
 */
export function OwnershipSeal({ product }: { product: string }) {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="shell">
        <Reveal>
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
            {/* Hairline that fades at both ends, so the block reads as a seal
                closing the page rather than another bordered section. */}
            <span
              aria-hidden
              className="h-px w-full bg-[linear-gradient(90deg,transparent_0%,rgba(91,134,255,0.35)_50%,transparent_100%)]"
            />

            <LogoMark className="h-11 w-11" />

            <div className="flex flex-col gap-2.5">
              <p className="eyebrow text-mist-400">Owned &amp; operated</p>
              <p className="font-display text-[1.35rem] font-bold leading-snug text-mist-100 sm:text-[1.5rem]">
                {product} is a product of{" "}
                <span className="text-gradient-accent">{site.name}</span>
              </p>
              <p className="mx-auto max-w-md text-[0.875rem] leading-relaxed text-mist-300">
                Designed, engineered, and run in-house — not white-labelled, not resold. The
                team that built it is the team that supports it.
              </p>
            </div>

            <p className="text-[0.75rem] text-mist-400">
              &copy; {new Date().getFullYear()} {site.legalName}. {product} and all associated
              source code, design, and branding are the property of {site.legalName}.
            </p>

            <span
              aria-hidden
              className="h-px w-full bg-[linear-gradient(90deg,transparent_0%,rgba(91,134,255,0.35)_50%,transparent_100%)]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
