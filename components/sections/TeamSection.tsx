import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { team } from "@/lib/content";

export function TeamSection() {
  return (
    <section
      id="team"
      className="relative overflow-hidden border-y border-slate-900/[0.06] py-20 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/4 h-80 w-80 rounded-full bg-hnx-blue/10 blur-[130px]"
      />

      <div className="shell relative flex flex-col gap-12">
        <SectionHeading
          eyebrow="Meet the team"
          title="The people behind"
          highlight="the code."
          description="Engineers, designers, and security practitioners who build their own products too."
        />

        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <StaggerItem key={member.name} className="h-full">
              <Reveal delay={index * 0.06}>
                <article className="glass edge-glow flex h-full flex-col rounded-2xl p-6 sm:p-8 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 shrink-0 rounded-full border border-slate-900/10 bg-slate-900/20 flex items-center justify-center">
                      <member.icon className="h-5 w-5 text-mist-400 group-hover:text-hnx-cyan transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-display text-base font-bold text-mist-100">
                        {member.name}
                      </h4>
                      <p className="text-[0.8125rem] text-mist-400">{member.role}</p>
                    </div>
                  </div>
                  <p className="mt-auto text-[0.875rem] leading-relaxed text-mist-300">
                    {member.bio}
                  </p>
                </article>
              </Reveal>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}