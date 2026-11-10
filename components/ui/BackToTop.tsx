"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <Link
      href="#top"
      className={cn(
        "fixed right-6 bottom-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.12] bg-ink-950/[0.85] backdrop-blur-md shadow-xl transition-all duration-300 hover:bg-cyan-500 hover:border-cyan-500/40 hover:text-ink-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500",
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-10 pointer-events-none"
      )}
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5 text-mist-200 transition-colors group-hover:text-ink-950" />
      <span className="sr-only">Back to top</span>
    </Link>
  );
}
