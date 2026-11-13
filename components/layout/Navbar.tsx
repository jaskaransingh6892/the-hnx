"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { usePresence } from "@/components/motion/usePresence";
import { prefersReducedMotion, withGsap } from "@/lib/gsap";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  const header = useRef<HTMLElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const burger = useRef<HTMLSpanElement>(null);
  const pillPlaced = useRef(false);
  const [menuMounted, menuRef] = usePresence<HTMLDivElement>(open, { y: -12, duration: 0.35 });

  // Close the mobile sheet whenever the route changes. Adjusting state during
  // render (rather than in an effect) avoids a flash of the open menu.
  const [routeAtOpen, setRouteAtOpen] = useState(pathname);
  if (routeAtOpen !== pathname) {
    setRouteAtOpen(pathname);
    setOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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

  // Reading down the page, the bar is in the way; reaching for navigation
  // means scrolling back up, so that gesture is what brings it back. The 4px
  // deadband keeps trackpad jitter from flickering it.
  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (!open) {
        if (y > 300 && y > lastY + 4) setHidden(true);
        else if (y < lastY - 4 || y < 300) setHidden(false);
      }
      lastY = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => withGsap(({ gsap }) => {
    const node = header.current;
    if (!node) return;
    if (prefersReducedMotion()) {
      gsap.set(node, { yPercent: hidden ? -110 : 0 });
      return;
    }
    gsap.to(node, { yPercent: hidden ? -110 : 0, duration: 0.45, ease: "expo.out", overwrite: true });
  }), [hidden]);

  // The active-link pill is one element that travels, rather than one per
  // link fading in and out — so moving between links reads as a single object.
  useEffect(() => withGsap(({ gsap }) => {
    const listNode = list.current;
    const pillNode = pill.current;
    if (!listNode || !pillNode) return;

    const place = (animate: boolean) => {
      const current = listNode.querySelector<HTMLElement>("[data-active='true']");
      if (!current) {
        gsap.to(pillNode, { opacity: 0, duration: 0.2, overwrite: true });
        return;
      }
      const vars = { x: current.offsetLeft, width: current.offsetWidth, opacity: 1 };
      if (animate && !prefersReducedMotion()) {
        gsap.to(pillNode, { ...vars, duration: 0.45, ease: "expo.out", overwrite: true });
      } else {
        gsap.set(pillNode, vars);
      }
    };

    // Snap into place the first time; travel on every route change after.
    place(pillPlaced.current);
    pillPlaced.current = true;

    // Font swaps change every link width, and the pill is sized from them.
    document.fonts?.ready.then(() => place(false));

    const onResize = () => place(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }), [pathname]);

  // Three bars into an X.
  useEffect(() => withGsap(({ gsap }) => {
    const node = burger.current;
    if (!node) return;
    const [top, middle, bottom] = [...node.children] as HTMLElement[];
    const duration = prefersReducedMotion() ? 0 : 0.35;
    gsap.to(top, { rotate: open ? 45 : 0, y: open ? 6 : 0, duration, ease: "expo.out", overwrite: true });
    gsap.to(middle, { opacity: open ? 0 : 1, x: open ? 8 : 0, duration: duration * 0.7, overwrite: true });
    gsap.to(bottom, { rotate: open ? -45 : 0, y: open ? -6 : 0, duration, ease: "expo.out", overwrite: true });
  }), [open]);

  // Stagger the sheet's links in behind the sheet itself.
  useEffect(() => withGsap(({ gsap }) => {
    if (!menuMounted || !open || prefersReducedMotion()) return;
    const node = menuRef.current;
    if (!node) return;
    const context = gsap.context(() => {
      gsap.from("[data-menu='item']", {
        opacity: 0,
        x: -18,
        duration: 0.45,
        stagger: 0.06,
        delay: 0.05,
        ease: "expo.out",
      });
    }, node);
    return () => context.revert();
  }), [menuMounted, open, menuRef]);

  return (
    <header
      ref={header}
      className="fixed inset-x-0 top-0 z-50"
      // Tabbing into a hidden bar has to bring it back, or the focus ring
      // lands somewhere off screen.
      onFocusCapture={() => setHidden(false)}
    >
      <div
        className={cn(
          "transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500",
          scrolled || open
            ? "border-b border-slate-900/[0.08] bg-white/85 shadow-[0_12px_36px_-26px_rgba(50,72,130,0.28)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav className="shell flex h-[4.5rem] items-center justify-between gap-6" aria-label="Primary">
          <Link href="/" className="shrink-0" aria-label="The HNX — home">
            <Logo />
          </Link>

          <ul ref={list} className="relative hidden items-center gap-1 lg:flex">
            <span
              ref={pill}
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 h-full rounded-full border border-hnx-blue/15 bg-hnx-blue/[0.08] opacity-0"
            />
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-active={isActive(item.href)}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[0.8125rem] font-medium transition-colors duration-300",
                    isActive(item.href) ? "text-mist-100" : "text-mist-300 hover:text-mist-100",
                  )}
                >
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
            className="relative grid h-11 w-11 place-items-center rounded-full border border-hnx-blue/15 bg-white/90 shadow-sm lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <span ref={burger} className="relative block h-3.5 w-5">
              <span className="absolute left-0 top-0 block h-[1.5px] w-5 rounded-full bg-mist-100" />
              <span className="absolute left-0 top-[6px] block h-[1.5px] w-3.5 rounded-full bg-mist-100" />
              <span className="absolute left-0 top-[12px] block h-[1.5px] w-5 rounded-full bg-mist-100" />
            </span>
          </button>
        </nav>
      </div>

      {menuMounted ? (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto border-t border-slate-900/[0.08] bg-ink-950/[0.97] backdrop-blur-2xl lg:hidden"
        >
          <div className="shell flex min-h-full flex-col justify-between gap-10 py-10">
            <ul className="flex flex-col gap-1.5">
              {nav.map((item) => (
                <li key={item.href} data-menu="item">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between rounded-2xl border border-transparent px-4 py-4 font-display text-2xl font-semibold transition-colors",
                      isActive(item.href)
                        ? "border-slate-900/10 bg-slate-900/[0.05] text-mist-100"
                        : "text-mist-300 hover:text-mist-100",
                    )}
                  >
                    {item.label}
                    <ArrowRight className="h-5 w-5 text-mist-400" strokeWidth={1.6} />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-4 pb-6">
              <ButtonLink
                href="/contact"
                size="lg"
                magnetic={false}
                className="w-full"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Let&apos;s Build Something
              </ButtonLink>
              <p className="text-center text-[0.8125rem] text-mist-400">
                Building what&apos;s next, for teams worldwide.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
