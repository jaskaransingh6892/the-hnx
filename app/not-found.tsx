import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { Aurora, GridField } from "@/components/visuals/Aurora";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden py-32">
      <Aurora intensity="soft" />
      <GridField />
      <div className="shell relative flex flex-col items-center gap-6 text-center">
        <LogoMark className="h-14 w-14" animated />
        <p className="font-mono text-[0.75rem] tracking-[0.24em] text-mist-400 uppercase">
          Error 404
        </p>
        <h1 className="font-display text-[clamp(2.2rem,6vw,3.6rem)] font-bold leading-tight">
          This route was never <span className="text-gradient-accent">built.</span>
        </h1>
        <p className="max-w-md text-[0.9375rem] leading-relaxed text-mist-300">
          The page you are looking for does not exist, or it moved somewhere more sensible.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg" icon={<ArrowRight className="h-[18px] w-[18px]" />}>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="secondary">
            Talk to us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
