"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

const RESET_MS = 2400;

/**
 * The async clipboard needs a secure context, a focused document and, in some
 * browsers, a permission the visitor never granted. When it refuses, a
 * throwaway textarea and the old `execCommand` path still work.
 */
function legacyCopy(text: string): boolean {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.top = "0";
  area.style.opacity = "0";
  area.style.pointerEvents = "none";
  document.body.appendChild(area);
  area.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  area.remove();
  return copied;
}

/**
 * Copies a value and says so.
 *
 * It deliberately does not fall back to opening a mail client: pressing
 * "Copy email" and having a mail window appear is a surprise, and the address
 * itself is already a mailto link beside this button.
 */
export function CopyButton({
  value,
  label = "Copy",
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number>(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    window.clearTimeout(timer.current);

    let copied = false;
    try {
      await navigator.clipboard.writeText(value);
      copied = true;
    } catch {
      copied = legacyCopy(value);
    }

    setState(copied ? "copied" : "failed");
    timer.current = window.setTimeout(() => setState("idle"), RESET_MS);
  }

  const copied = state === "copied";

  return (
    <button
      type="button"
      onClick={copy}
      data-cursor={copied ? "Copied" : label}
      className={cn(
        "copy-button inline-flex items-center gap-1.5 rounded-full border border-slate-900/10 bg-slate-900/[0.03] px-2.5 py-1 text-[0.6875rem] font-medium text-mist-300 transition-colors duration-300 hover:border-hnx-cyan/40 hover:text-hnx-cyan",
        copied && "border-hnx-live/40 text-hnx-live",
        state === "failed" && "border-rose-400/40 text-rose-500",
        className,
      )}
    >
      <span aria-hidden>
        {copied ? <Check className="h-3 w-3" strokeWidth={2.4} /> : <Copy className="h-3 w-3" strokeWidth={2} />}
      </span>
      <span>{state === "failed" ? "Press Ctrl+C" : copied ? "Copied" : label}</span>
      {/* The visible label changes under the pointer; announce it properly. */}
      <span className="sr-only" role="status">
        {copied ? `${value} copied to clipboard` : ""}
      </span>
    </button>
  );
}
