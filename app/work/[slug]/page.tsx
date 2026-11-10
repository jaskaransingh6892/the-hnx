import { notFound } from "next/navigation";
import { works } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { ExternalLink } from "lucide-react";

export const metadata = ({ params }: { params: { slug: string } }) => {
  const work = works.find((w) => w.slug === params.slug);
  if (!work) return {};
  return {
    title: `${work.title} — Case Study | ${work.category}`,
    description: work.tagline,
  };
};

export default function WorkPage({ params }: { params: { slug: string } }) {
  const work = works.find((w) => w.slug === params.slug);
  if (!work) notFound();

  return (
    <section className="section min-h-[70vh] flex flex-col">
      <div className="noise-layer" aria-hidden="true" />
      <div className="shell relative z-10 flex flex-col gap-8">
        <div className="flex items-start justify-between gap-4 md:gap-8">
          <div>
            <span className="eyebrow text-cyan-400 mb-2 block">{work.category}</span>
            <h1 className="text-[clamp(2rem,5vw,3rem)] font-display font-bold text-mist-100 leading-[1.05] tracking-tight mb-3">
              {work.title}
            </h1>
            <p className="text-mist-300 leading-relaxed">{work.tagline}</p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <ButtonLink href="/" size="sm" variant="secondary">
              ← Back to work
            </ButtonLink>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <p className="text-mist-300 leading-relaxed text-lg">
              {work.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {work.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-mist-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="glass-strong rounded-2xl p-8 border border-white/5 shadow-2xl">
            <span className="eyebrow text-mist-500 mb-3 block">Overview</span>
            <p className="text-mist-300 leading-relaxed">
              {work.description} Explore the code and approach on GitHub.
            </p>
            <ButtonLink
              href="https://github.com/the-hnx"
              size="sm"
              icon={<ExternalLink className="h-4 w-4" />}
              className="w-full mt-4"
            >
              View on GitHub
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
