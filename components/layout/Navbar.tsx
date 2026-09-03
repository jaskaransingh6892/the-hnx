"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { EASE } from "@/components/ui/Reveal";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));

  // Close the mobile sheet whenever the route changes. Adjusting state during
  // render (rather than in an effect) avoids a flash of the open menu.
  const [routeAtOpen, setRouteAtOpen] = useState(pathname);
  if (routeAtOpen !== pathname) {
    setRouteAtOpen(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500",
          scrolled || open
            ? "border-b border-white/[0.07] bg-ink-950/72 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav className="shell flex h-[4.5rem] items-center justify-between gap-6" aria-label="Primary">
          <Link href="/" className="shrink-0" aria-label="The HNX — home">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[0.8125rem] font-medium transition-colors duration-300",
                    isActive(item.href)
                      ? "text-mist-100"
                      : "text-mist-300 hover:text-mist-100",
                  )}
                >
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.06]"
                      transition={{ duration: 0.45, ease: EASE }}
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <ButtonLink href="/contact" size="sm" icon={<ArrowRight className="h-4 w-4" />}>
              Let&apos;s Build Something
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <span className="relative block h-3.5 w-5">
              <motion.span
                animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="absolute left-0 top-0 block h-[1.5px] w-5 rounded-full bg-mist-100"
              />
              <motion.span
                animate={open ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute left-0 top-[6px] block h-[1.5px] w-3.5 rounded-full bg-mist-100"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="absolute left-0 top-[12px] block h-[1.5px] w-5 rounded-full bg-mist-100"
              />
            </span>
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto border-t border-white/[0.07] bg-ink-950/[0.97] backdrop-blur-2xl lg:hidden"
          >
            <div className="shell flex min-h-full flex-col justify-between gap-10 py-10">
              <ul className="flex flex-col gap-1.5">
                {nav.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.06, duration: 0.45, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-2xl border border-transparent px-4 py-4 font-display text-2xl font-semibold transition-colors",
                        isActive(item.href)
                          ? "border-white/10 bg-white/[0.05] text-mist-100"
                          : "text-mist-300 hover:text-mist-100",
                      )}
                    >
                      {item.label}
                      <ArrowRight className="h-5 w-5 text-mist-400" strokeWidth={1.6} />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col gap-4 pb-6">
                <ButtonLink href="/contact" size="lg" magnetic={false} className="w-full" icon={<ArrowRight className="h-4 w-4" />}>
                  Let&apos;s Build Something
                </ButtonLink>
                <p className="text-center text-[0.8125rem] text-mist-400">
                  Building what&apos;s next, for teams worldwide.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
