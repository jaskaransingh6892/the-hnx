"use client";

import { useId, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const controlClasses =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[0.9375rem] text-mist-100 outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-mist-400/70 hover:border-white/20 focus:border-hnx-cyan/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(34,211,238,0.12)]";

type BaseProps = {
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
};

function Wrapper({
  label,
  error,
  required,
  hint,
  id,
  children,
  className,
}: BaseProps & { id: string; children: ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-[0.8125rem] font-medium text-mist-200">
        {label}
        {required ? <span className="ml-1 text-hnx-cyan">*</span> : null}
        {hint ? <span className="ml-2 text-[0.75rem] font-normal text-mist-400">{hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-[0.75rem] text-rose-300">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  label,
  error,
  required,
  hint,
  className,
  ...props
}: BaseProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <Wrapper label={label} error={error} required={required} hint={hint} id={id} className={className}>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(controlClasses, error && "border-rose-400/50")}
        {...props}
      />
    </Wrapper>
  );
}

export function TextAreaField({
  label,
  error,
  required,
  hint,
  className,
  ...props
}: BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <Wrapper label={label} error={error} required={required} hint={hint} id={id} className={className}>
      <textarea
        id={id}
        rows={5}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(controlClasses, "resize-y min-h-32", error && "border-rose-400/50")}
        {...props}
      />
    </Wrapper>
  );
}

export function SelectField({
  label,
  error,
  required,
  hint,
  className,
  options,
  placeholder,
  ...props
}: BaseProps & {
  options: readonly string[];
  placeholder: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <Wrapper label={label} error={error} required={required} hint={hint} id={id} className={className}>
      <div className="relative">
        <select
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            controlClasses,
            "appearance-none pr-10 [&>option]:bg-ink-800 [&>option]:text-mist-100",
            error && "border-rose-400/50",
          )}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 h-2 w-2 -translate-y-[70%] rotate-45 border-b border-r border-mist-400"
        />
      </div>
    </Wrapper>
  );
}
