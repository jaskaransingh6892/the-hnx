import { budgetRanges, projectTypes } from "@/lib/content";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  message?: string;
  website?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function bad(message: string, status = 400) {
  return Response.json({ ok: false, message }, { status });
}

/**
 * Contact endpoint.
 *
 * Validation is repeated here on purpose — the client-side checks are a
 * convenience, this is the boundary that actually matters.
 *
 * Delivery: the enquiry is currently written to the server log. Plug in a
 * transactional provider (Resend, Postmark, SendGrid, SES) or a CRM webhook
 * where marked below, reading credentials from environment variables.
 */
export async function POST(request: Request) {
  let payload: Payload;

  try {
    payload = (await request.json()) as Payload;
  } catch {
    return bad("Malformed request body.");
  }

  // Honeypot: a filled hidden field means an automated submission.
  if (payload.website) {
    return Response.json({ ok: true, message: "Thanks." });
  }

  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const company = (payload.company ?? "").trim();
  const projectType = (payload.projectType ?? "").trim();
  const budget = (payload.budget ?? "").trim();
  const message = (payload.message ?? "").trim();

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

  const enquiry = {
    receivedAt: new Date().toISOString(),
    name,
    email,
    company: company || null,
    projectType,
    budget: budget || null,
    message,
  };

  // --- integration point -------------------------------------------------
  // await sendEnquiryEmail(enquiry);
  // await pushToCrm(enquiry);
  console.info("[contact] new enquiry", enquiry);
  // -----------------------------------------------------------------------

  return Response.json({
    ok: true,
    message: "Thanks — we will be in touch within one business day.",
  });
}

export async function GET() {
  return Response.json({ ok: false, message: "Method not allowed." }, { status: 405 });
}
