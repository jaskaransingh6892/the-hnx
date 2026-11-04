import { budgetRanges, projectTypes } from "@/lib/content";

type Payload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  projectType?: unknown;
  budget?: unknown;
  message?: unknown;
  website?: unknown;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function bad(message: string, status = 400) {
  return Response.json({ ok: false, message }, { status });
}

/**
 * Contact endpoint.
 *
 * Validation is repeated here on purpose — the client-side checks are a
 * convenience, this is the boundary that actually matters.
 *
 * Delivery goes to a configured server-side webhook. A missing or failing
 * destination never returns success, so visitors can use the email fallback.
 */
export async function POST(request: Request) {
  let payload: Payload;

  try {
    payload = (await request.json()) as Payload;
  } catch {
    return bad("Malformed request body.");
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return bad("Malformed request body.");
  }

  // Honeypot: a filled hidden field means an automated submission.
  if (payload.website) {
    return Response.json({ ok: true, message: "Thanks." });
  }

  const name = asText(payload.name);
  const email = asText(payload.email);
  const company = asText(payload.company);
  const projectType = asText(payload.projectType);
  const budget = asText(payload.budget);
  const message = asText(payload.message);

  if (name.length < 2) return bad("Please include your name.");
  if (!EMAIL.test(email)) return bad("Please include a valid email address.");
  if (!(projectTypes as readonly string[]).includes(projectType)) {
    return bad("Please choose a valid project type.");
  }
  if (budget && !(budgetRanges as readonly string[]).includes(budget)) {
    return bad("Please choose a valid budget range.");
  }
  if (message.length < 20) return bad("Please add a little more detail to your message.");
  if (message.length > 5000) return bad("That message is too long. Please trim it a little.");

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return bad("The form is temporarily unavailable. Please email us directly instead.", 503);
  }

  let destination: URL;
  try {
    destination = new URL(webhookUrl);
  } catch {
    console.error("[contact] invalid webhook configuration");
    return bad("The form is temporarily unavailable. Please email us directly instead.", 503);
  }

  if (destination.protocol !== "https:") {
    console.error("[contact] webhook must use HTTPS");
    return bad("The form is temporarily unavailable. Please email us directly instead.", 503);
  }

  const enquiry = {
    receivedAt: new Date().toISOString(),
    name,
    email,
    company: company || null,
    projectType,
    budget: budget || null,
    message,
  };

  try {
    const token = process.env.CONTACT_WEBHOOK_TOKEN;
    const delivery = await fetch(destination, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(enquiry),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!delivery.ok) {
      console.error("[contact] webhook rejected enquiry", delivery.status);
      return bad("We could not send your message. Please email us directly instead.", 502);
    }
  } catch {
    console.error("[contact] webhook delivery failed");
    return bad("We could not send your message. Please email us directly instead.", 502);
  }

  return Response.json({
    ok: true,
    message: "Thanks — your enquiry was delivered.",
  });
}

export async function GET() {
  return Response.json({ ok: false, message: "Method not allowed." }, { status: 405 });
}
