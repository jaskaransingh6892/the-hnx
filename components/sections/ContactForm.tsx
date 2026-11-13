"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { prefersReducedMotion, withGsap } from "@/lib/gsap";
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DrawSVG } from "@/components/motion/DrawSVG";
import { usePresence } from "@/components/motion/usePresence";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import { budgetRanges, products, projectTypes } from "@/lib/content";
import { site } from "@/lib/site";

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

const messagePrompts: Record<string, string> = {
  Website: "Share your current website, the pages or features you need, your audience, and your launch goal.",
  "ERP / CRM": "Which tools do you use today, what workflow should the first module solve, and who will use it?",
  "Cybersecurity / VAPT": "Which website or API needs assessment, is it staging or production, and what is your target timeframe? Do not include passwords.",
};

const stageIntros: Record<string, string> = {
  planning: "We are planning a new project.",
  live: "We want to improve something already live.",
  problem: "We need to solve a specific problem.",
};

function emailFallback(values: Values) {
  const subject = `Project enquiry: ${values.projectType || "New project"}`;
  const body = [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    ...(values.company.trim() ? [`Company: ${values.company.trim()}`] : []),
    `Project type: ${values.projectType}`,
    ...(values.budget ? [`Budget: ${values.budget}`] : []),
    "",
    values.message.trim(),
  ].join("\n");

  return `mailto:${site.salesEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function validate(values: Values): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!values.projectType) errors.projectType = "Choose the closest project type.";
  if (values.message.trim().length < 20) {
    errors.message = "A little more detail helps. Twenty characters minimum.";
  } else if (values.message.trim().length > 5000) {
    errors.message = "Please keep the message under 5,000 characters.";
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const successPanel = useRef<HTMLDivElement>(null);
  const [errorShown, errorRef] = usePresence<HTMLDivElement>(status === "error", {
    y: -8,
    duration: 0.35,
  });

  // Runs when the success panel first mounts: the panel settles, then the
  // copy arrives behind the tick that DrawSVG is drawing.
  useEffect(() => {
    const node = successPanel.current;
    if (!node || prefersReducedMotion()) return;

    return withGsap(({ gsap }) => {
      const context = gsap.context(() => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(node, { opacity: 0, scale: 0.97, duration: 0.55 }, 0)
          .from("[data-success='line']", { opacity: 0, y: 14, duration: 0.5, stagger: 0.1 }, 0.25);
      }, node);

      return () => context.revert();
    });
  }, [status]);

  // Product cards and the scope planner pass only fixed context in the URL.
  // The key also updates the form when a visitor chooses another shortcut
  // while already on the contact page.
  const params = useSearchParams();
  const requestedProduct = params.get("product");
  const product = products.find((item) => item.name === requestedProduct)?.name ?? null;
  const requestedType = params.get("type");
  const requestedStage = params.get("stage");
  const seedKey = `${product ?? ""}|${requestedType ?? ""}|${requestedStage ?? ""}`;
  const starterMessage = [
    ...(product ? [`I would like to talk about ${product}.`] : []),
    ...(requestedStage && stageIntros[requestedStage] ? [stageIntros[requestedStage]] : []),
  ].join(" ");
  const [lastSeedKey, setLastSeedKey] = useState("");

  if (seedKey !== lastSeedKey) {
    setLastSeedKey(seedKey);
    setValues((current) => ({
      ...current,
      projectType:
        requestedType && (projectTypes as readonly string[]).includes(requestedType)
          ? requestedType
          : current.projectType,
      message: starterMessage || current.message,
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
    if (starterMessage && values.message.trim() === starterMessage.trim()) {
      found.message = "Please add a few details after the opening line.";
    }
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
      <div
        ref={successPanel}
        className="glass edge-glow flex flex-col items-center gap-5 rounded-2xl p-10 text-center sm:p-14"
        role="status"
      >
        <span className="grid h-16 w-16 place-items-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
          <DrawSVG duration={0.7} stagger={0.12} start="top bottom">
            <CheckCircle2 className="h-8 w-8 text-emerald-700" strokeWidth={1.5} />
          </DrawSVG>
        </span>
        <h3 data-success="line" className="font-display text-2xl font-semibold text-mist-100">
          Message received.
        </h3>
        <p data-success="line" className="max-w-sm text-[0.9375rem] leading-relaxed text-mist-300">
          Your enquiry was delivered. We will review the details and contact you using the
          email address you provided.
        </p>
        <Button variant="secondary" magnetic={false} onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
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
          maxLength={5000}
          hint={values.projectType === "Cybersecurity / VAPT" ? "Do not share passwords or secrets here" : undefined}
          placeholder={messagePrompts[values.projectType] ?? "What are you building, who is it for, and what does success look like?"}
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

      {errorShown ? (
          <div
            ref={errorRef}
            role="alert"
            className="mt-6 flex items-start gap-2 rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-[0.8125rem] text-rose-800"
          >
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.8} />
            <div>
              <p>{serverMessage}</p>
              <a className="mt-2 inline-block font-semibold underline underline-offset-2" href={emailFallback(values)}>
                Open an email draft
              </a>
              <p className="mt-1">Or email {site.salesEmail} directly.</p>
            </div>
          </div>
      ) : null}

      <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-[0.75rem] leading-relaxed text-mist-400">
          We use your contact details to respond to this project enquiry.
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
