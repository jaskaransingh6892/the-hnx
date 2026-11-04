import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { guides } from "@/lib/guides";

export function GuidesSection() {
  return (
    <section className="relative border-y border-slate-900/[0.06] bg-white py-20 sm:py-24">
      <div className="shell flex flex-col gap-12">
        <SectionHeading
          eyebrow="Practical guides"
          title="Know what to ask"
          highlight="before you buy"
          description="Use these checklists to plan a website redesign, retail ERP, or security assessment with a clearer scope."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {guides.map((guide) => (
            <article key={guide.slug} className="glass edge-glow flex h-full flex-col rounded-2xl p-6 sm:p-7">
              <p className="eyebrow text-hnx-blue">{guide.category}</p>
              <h3 className="mt-4 font-display text-lg font-bold text-mist-100">{guide.title}</h3>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-mist-300">{guide.description}</p>
              <Link
                href={`/guides/${guide.slug}`}
                className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.875rem] font-semibold text-hnx-blue transition-colors hover:text-hnx-cyan"
              >
                Read the guide
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
              </Link>
            </article>
          ))}
        </div>
        <Link
          href="/guides"
          className="mx-auto inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-hnx-blue transition-colors hover:text-hnx-cyan"
        >
          Browse all guides
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
        </Link>
      </div>
    </section>
  );
}
