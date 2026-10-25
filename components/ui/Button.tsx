"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-[transform,box-shadow,background-color,border-color,color] duration-300 will-change-transform disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary:
    "text-white shadow-[0_12px_30px_-14px_rgba(62,99,233,0.72)] hover:shadow-[0_18px_38px_-14px_rgba(93,77,224,0.78)] bg-[linear-gradient(100deg,#2460e8_0%,#5364e9_48%,#8b43cf_100%)] bg-[length:200%_100%] bg-[position:0%_0%] hover:bg-[position:100%_0%] [transition:background-position_.6s_ease,box-shadow_.4s_ease,transform_.3s_ease]",
  secondary:
    "text-mist-100 border border-ink-700 bg-white/90 shadow-[0_8px_25px_-18px_rgba(53,74,128,0.45)] hover:border-hnx-blue/35 hover:bg-white hover:shadow-[0_14px_32px_-18px_rgba(53,74,128,0.4)]",
  ghost:
    "text-mist-300 hover:text-mist-100 border border-transparent hover:border-slate-900/10 hover:bg-slate-900/[0.04]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-sm",
  lg: "h-[3.25rem] px-7 text-[0.9375rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  magnetic?: boolean;
  icon?: ReactNode;
};

function Inner({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <>
      <span className="relative z-10">{children}</span>
      {icon ? (
        <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1">
          {icon}
        </span>
      ) : null}
    </>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  magnetic = true,
  icon,
  ...props
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  const button = (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
  return magnetic ? <Magnetic className="inline-flex">{button}</Magnetic> : button;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  magnetic = true,
  icon,
  href,
  ...props
}: CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href">) {
  const isExternal = href.startsWith("http");
  const content = <Inner icon={icon}>{children}</Inner>;
  const classes = cn(base, variants[variant], sizes[size], className);

  const link = isExternal ? (
    <a href={href} target="_blank" rel="noreferrer noopener" className={classes}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );

  return magnetic ? <Magnetic className="inline-flex">{link}</Magnetic> : link;
}
