"use client";

import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Aurora, GridField } from "@/components/visuals/Aurora";

export function NewsletterSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("submitting");

    await new Promise((resolve) => setTimeout(resolve, 900));

    if (!email.includes("@")) {
      setStatus("idle");
      return;
    }

    setStatus("success");
    setEmail("");
  }

  if (status === "success") {
    return (
      <section
        id="newsletter"
        className="relative overflow-hidden py-16 sm:py-20 border-t border-slate-900/[0.06]"
      >
        <div className="shell relative">
          <Reveal className="relative isolate overflow-hidden rounded-[2rem] border border-indigo-100 bg-[linear-gradient(140deg,#eaf5ff_0%,#e9ecff_55%,#f4eaff_100%)] px-6 py-16 shadow-[0_28px_80px_-50px_rgba(76,95,186,0.42)] sm:px-12 sm:py-20">
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="text-hnx-blue font-semibold">Subscribed</span>
              <h3 className="font-display text-2xl font-bold text-mist-100">
                You are on the list
              </h3>
              <p className="text-mist-300">
                We will share engineering notes, product updates, and occasional
                guides — no spam.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section
      id="newsletter"
      className="relative overflow-hidden py-16 sm:py-20 border-t border-slate-900/[0.06]"
    >
      <div className="shell relative">
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] border border-indigo-100 bg-[linear-gradient(140deg,#eaf5ff_0%,#e9ecff_55%,#f4eaff_100%)] px-6 py-16 shadow-[0_28px_80px_-50px_rgba(76,95,186,0.42)] sm:px-12 sm:py-20">
          <Aurora intensity="soft" />
          <GridField className="opacity-60" />

          <div className="relative flex flex-col items-center gap-6 text-center">
            <p className="eyebrow text-hnx-blue">Stay in touch</p>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-[1.1] text-mist-100">
              Engineering notes, shipped.
            </h2>
            <p className="max-w-md text-[0.9375rem] text-mist-300">
              Get build stories, security notes, and product updates from The HNX
              — straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-mist-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-slate-900/10 bg-white/90 px-4 py-3 pl-11 text-[0.9375rem] text-mist-100 outline-none focus:border-hnx-cyan/60 transition-colors duration-300"
                />
              </div>
              <Button
                type="submit"
                size="md"
                magnetic={false}
                className="whitespace-nowrap"
                icon={<ArrowRight className="h-4 w-4" strokeWidth={1.8} />}
              >
                Subscribe
              </Button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}