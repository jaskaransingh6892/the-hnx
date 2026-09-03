"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import { EASE } from "@/components/ui/Reveal";
import { budgetRanges, projectTypes } from "@/lib/content";

type Values = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
  website: string;
};

type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const empty: Values = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  message: "",
  website: "",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function validate(values: Values): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!values.projectType) errors.projectType = "Choose the closest project type.";
  if (values.message.trim().length < 20) {
    errors.message = "A little more detail helps. Twenty characters minimum.";
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  // Product cards link through as /contact?product=<slug>. Seeding the form
  // during render keeps it out of an effect and out of the submit path.
  const params = useSearchParams();
  const product = params.get("product");
  const requestedType = params.get("type");
  const [seeded, setSeeded] = useState(false);

  if (!seeded && (product || requestedType)) {
    setSeeded(true);
    setValues((current) => ({
      ...current,
      projectType:
        requestedType && (projectTypes as readonly string[]).includes(requestedType)
          ? requestedType
          : current.projectType,
      message: product ? `I would like to talk about ${product}. ` : current.message,
    }));
  }

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((current) => {
      const next = { ...current, [key]: value };
      if (touched[key]) setErrors(validate(next));
      return next;
    });
  }

  function blur(key: keyof Values) {
    setTouched((current) => ({ ...current, [key]: true }));
    setErrors(validate(values));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, projectType: true, message: true });

    if (Object.keys(found).length > 0) {
      document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(data.message ?? "Something went wrong.");

      setStatus("success");
      setValues(empty);
      setTouched({});
    } catch (error) {
      setStatus("error");
      setServerMessage(
        error instanceof Error ? error.message : "We could not send that. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="glass edge-glow flex flex-col items-center gap-5 rounded-2xl p-10 text-center sm:p-14"
        role="status"
      >
        <span className="grid h-16 w-16 place-items-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
          <CheckCircle2 className="h-8 w-8 text-emerald-300" strokeWidth={1.5} />
        </span>
        <h3 className="font-display text-2xl font-semibold text-mist-100">Message received.</h3>
        <p className="max-w-sm text-[0.9375rem] leading-relaxed text-mist-300">
          A senior engineer will read this and reply within one business day, usually with
          questions, because the good projects always have them.
        </p>
        <Button variant="secondary" magnetic={false} onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass relative rounded-2xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Name"
          required
          name="name"
          autoComplete="name"
          placeholder="Jordan Reyes"
          value={values.name}
          error={touched.name ? errors.name : undefined}
          onChange={(event) => update("name", event.target.value)}
          onBlur={() => blur("name")}
        />
        <TextField
          label="Email"
          required
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={values.email}
          error={touched.email ? errors.email : undefined}
          onChange={(event) => update("email", event.target.value)}
          onBlur={() => blur("email")}
        />
        <TextField
          label="Company"
          hint="optional"
          name="company"
          autoComplete="organization"
          placeholder="Company or project name"
          value={values.company}
          onChange={(event) => update("company", event.target.value)}
        />
        <SelectField
          label="Project Type"
          required
          name="projectType"
          placeholder="Select a project type"
          options={projectTypes}
          value={values.projectType}
          error={touched.projectType ? errors.projectType : undefined}
          onChange={(event) => update("projectType", event.target.value)}
          onBlur={() => blur("projectType")}
        />
        <SelectField
          label="Budget Range"
          hint="optional"
          name="budget"
          placeholder="Select a range"
          options={budgetRanges}
          value={values.budget}
          onChange={(event) => update("budget", event.target.value)}
          className="sm:col-span-2"
        />
        <TextAreaField
          label="Message"
          required
          name="message"
          placeholder="What are you building, who is it for, and what does success look like?"
          value={values.message}
          error={touched.message ? errors.message : undefined}
          onChange={(event) => update("message", event.target.value)}
          onBlur={() => blur("message")}
          className="sm:col-span-2"
        />
      </div>

      {/* honeypot: hidden from people, irresistible to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website-field">Website</label>
        <input
          id="website-field"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      <AnimatePresence>
        {status === "error" ? (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="mt-6 flex items-center gap-2 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-[0.8125rem] text-rose-200"
          >
            <TriangleAlert className="h-4 w-4 shrink-0" strokeWidth={1.8} />
            {serverMessage}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-[0.75rem] leading-relaxed text-mist-400">
          We reply within one business day. No mailing list, no sales sequence.
        </p>
        <Button
          type="submit"
          size="lg"
          magnetic={false}
          disabled={status === "submitting"}
          className="w-full sm:w-auto"
          icon={
            status === "submitting" ? (
              <Loader2 className="h-[18px] w-[18px] animate-spin" />
            ) : (
              <Send className="h-[18px] w-[18px]" />
            )
          }
        >
          {status === "submitting" ? "Sending" : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
