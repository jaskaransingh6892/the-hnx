"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Mail, GitBranch, Link as LinkIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { EASE, Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function ContactSection() {
  return (
    <section id="contact" className="section bg-ink-950 relative isolate overflow-hidden">
      <div className="noise-layer" aria-hidden="true" />
      <div className="shell relative z-10">
        <div className="grid lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <Reveal className="eyebrow text-cyan-400 mb-2">05 / Contact</Reveal>
            <Reveal className="text-3xl font-display font-bold text-mist-100 tracking-tight mb-4">
              Let’s build ✦ something useful ✦
            </Reveal>
            <Reveal className="mb-8 max-w-lg text-mist-300 leading-relaxed">
              Freelance build, a full-time role or a quick question. Write to me and I’ll reply by
              email.
            </Reveal>

            <div className="space-y-4">
              {[
                {
                  label: "Email",
                  value: site.email,
                  href: `mailto:${site.email}`,
                  icon: <Mail className="h-5 w-5" />,
                },
                {
                  label: "GitHub",
                  value: "github.com/the-hnx",
                  href: "https://github.com/the-hnx",
                  icon: <GitBranch className="h-5 w-5" />,
                },
                {
                  label: "LinkedIn",
                  value: "linkedin.com/company/the-hnx",
                  href: "https://www.linkedin.com/company/the-hnx",
                  icon: <LinkIcon className="h-5 w-5" />,
                },
              ].map((item) => (
                <Reveal
                  key={item.label}
                  direction="up"
                  className="group flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-cyan-500/20 transition-colors"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-cyan-400 group-hover:bg-cyan-500 group-hover:text-ink-950 transition-colors">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-mist-500 uppercase tracking-wider">{item.label}</span>
                    <Link
                      href={item.href}
                      className="text-mist-100 hover:text-cyan-400 transition-colors"
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined}
                    >
                      {item.value}
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="hidden lg:block relative"
          >
            <div className="glass-strong rounded-2xl p-8 border border-white/5 shadow-2xl">
              <div className="eyebrow text-mist-500 mb-3">Say hello</div>
              <p className="text-xl font-display font-bold text-mist-100 mb-6">
                Let’s build ✦ something useful ✦
              </p>
              <ButtonLink
                href={`mailto:${site.email}`}
                size="lg"
                icon={<ArrowRight className="h-[18px] w-[18px]" />}
                className="w-full"
              >
                Write to me
              </ButtonLink>
              <p className="mt-6 text-center text-xs text-mist-500">
                © {new Date().getFullYear()} {site.name}. Designed and built by hand · Next.js
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
