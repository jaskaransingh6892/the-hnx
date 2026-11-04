# The HNX

Marketing and product site for **The HNX** — a technology company that builds
its own software products and delivers engineering services to clients.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Motion, and
Lucide icons. Every page is statically generated; the only server route is the
contact endpoint.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npx eslint .     # lint
```

Node 20+ is required.

---

## Project structure

```
app/
  layout.tsx              root shell: fonts, metadata, JSON-LD, navbar, footer
  page.tsx                homepage (composes the sections below)
  services/               capability catalogue + service detail pages
  products/               product showcase + build stories
  guides/                 website, ERP, and VAPT buyer guides
  about/                  philosophy and differentiators
  process/                delivery timeline
  contact/                contact form and company details
  api/contact/route.ts    form endpoint (validation + delivery hook)
  icon.svg                favicon
  apple-icon.tsx          180x180 home-screen icon (generated)
  opengraph-image.tsx     1200x630 social card (generated)
  manifest.ts robots.ts sitemap.ts

components/
  layout/    Navbar, Footer, PageHero, ScrollProgress
  sections/  Hero, TrustIntro, Services, Products, ProductGallery, Why,
             Process, Tech, Guides, ProjectScopePlanner, CTA, About,
             Contact, ContactForm
  ui/        Logo, Button, SectionHeading, Reveal, Magnetic, Counter,
             SpotlightCard, ServiceCard, ProductCard, FeatureCard,
             TechBadge, StatusBadge, Field
  visuals/   ParticleField (canvas), HeroCore (orbits), Aurora, GridField

lib/
  content.ts  services, products, process, technologies, form options
  service-pages.ts  detail-page copy for each service
  case-studies.ts  product build stories and optional verified evidence
  guides.ts   guide links used across the site
  site.ts     company name, contact details, social links, navigation
  utils.ts    classname helper
```

---

## Editing the site

The brand, catalogue, and detailed editorial content live in these files:

**`lib/site.ts`** — company name, email, phone, location, hours, social links,
and the primary navigation.

**`lib/content.ts`** — services, products, process steps, technologies, and
form options.

**`lib/service-pages.ts`** — service detail-page copy and FAQs.

**`lib/case-studies.ts`** — product build stories and verified evidence when available.

**`lib/guides.ts`** — links to the buyer guides under `app/guides/`.

### Adding a product

Append an entry to `products` in `lib/content.ts`:

```ts
{
  slug: "atlas",
  name: "Atlas",
  category: "AI Platform",
  status: "Coming Soon",         // "Live" | "In Development" | "Coming Soon"
  summary: "One-line pitch.",
  description: "Two-line explanation.",
  icon: Boxes,                   // any lucide-react icon
  accent: "from-cyan-400 to-blue-600",
  highlights: ["Point one", "Point two", "Point three"],
}
```

It then appears on the homepage showcase and the products page. The homepage
shows the first three (`<ProductsSection limit={3} />`); `/products` shows all
of them. Add an entry to `lib/case-studies.ts` to publish a build-story detail
page and link it from the product card. Without that entry, the card can still
link to the running product but does not point to a missing case study.

### Adding a service

Append to `services` in `lib/content.ts` and add matching detail content in
`lib/service-pages.ts`. The `capabilities` array renders on `/services` and
the service links in the footer point to the detail pages.

### Adding verified case-study evidence

Case-study content lives in `lib/case-studies.ts`. Each case study can show
real product screenshots, measured outcomes, and approved testimonials when
those materials are available. These sections stay hidden while their data is
absent or empty.

- Put genuine product screenshots in `public/products/<slug>/`. Remove any
  private customer or patient data first. Add each image to `screenshots` with
  its public path, intrinsic width and height, descriptive alt text, and a
  caption explaining the workflow shown.
- Add a `results` entry only for a value you have measured. Include the metric,
  its plain-language label, and `context` naming the baseline, timeframe, or
  measurement method so the claim can be checked.
- Add an attributed `testimonials` entry only after written approval of the
  exact quote, name, role, organization, and any logo. Set
  `approvedForPublication: true` only when that approval is recorded.
- For a public “satisfied clients” count, confirm the count, the period it
  covers, and what qualifies as satisfied (for example, approved feedback or
  a survey response). Do not substitute the number of enquiries or projects.

Do not turn illustrative graphics or estimates into case-study proof.

---

## The brand

The mark is built from two vertical rails crossed by two diagonals. Read
together they resolve into all three letters of the name: **H** in the
uprights, **N** in the left rail, descending diagonal and right rail, and
**X** in the crossing. The node at the intersection is the connection point.

- `components/ui/Logo.tsx` — `<Logo />` (mark + wordmark) and `<LogoMark />`
- `app/icon.svg` — favicon
- `public/brand/hnx-logo.svg` — full lockup for decks, docs, business cards
- `public/brand/hnx-icon.svg` — square icon for social profiles and app stores

Colour tokens and the type scale live in `app/globals.css` under `@theme`.
The site uses a light `#f7f9ff` ground, white raised surfaces, and cyan, blue,
and violet accents. Service icons use distinct colour families; technology
badges use brand SVGs from Simple Icons where available.

---

## The contact form

`components/sections/ContactForm.tsx` validates on blur and on submit, shows
inline field errors, and has distinct submitting / success / error states. A
hidden honeypot field catches bots.

`app/api/contact/route.ts` re-validates everything server-side and sends valid
enquiries to a configured HTTPS webhook. Set `CONTACT_WEBHOOK_URL` to an email
provider workflow or CRM endpoint that accepts a JSON `POST` and returns a 2xx
response only after storing or delivering the enquiry. If the endpoint expects
Bearer authentication, set `CONTACT_WEBHOOK_TOKEN` as well. Both variables are
server-side secrets; do not use the `NEXT_PUBLIC_` prefix. Test with a real
enquiry after deployment and verify it reaches the destination.

If the webhook is missing or rejects a request, the form keeps the visitor's
answers, shows an error, and offers a pre-filled email draft to
`projects@thehnx.com`. It no longer reports success for an undelivered enquiry
or logs the visitor's personal details.

Product cards deep-link as `/contact?product=<name>`, which pre-fills the
message. `?type=<project type>` pre-selects the project type. The services page
planner also adds a fixed `stage` value to the contact draft; visitors still
need to add their own project details.

---

## Motion and accessibility

- Scroll reveals, the hero particle field, the orbit visuals, and the marquee
  all stop for `prefers-reduced-motion: reduce`; the counters jump straight to
  their final figures.
- The canvas particle count scales with viewport area and is capped, so it
  stays cheap on low-power devices.
- A skip link, visible focus rings, `aria-invalid` / `aria-describedby` on form
  fields, and labelled landmarks are in place.
- A `<noscript>` rule reveals anything the reveal animations would otherwise
  leave hidden.

---

## Deploying to Vercel

Next.js needs no build configuration on Vercel — it detects the framework,
runs `npm run build`, and serves the app.

Set the canonical origin in Project Settings → Environment Variables for all
environments. Configure contact delivery before accepting enquiries:

| Key | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | the public canonical origin, e.g. `https://thehnx.com` (no trailing slash) |
| `CONTACT_WEBHOOK_URL` | HTTPS endpoint that delivers or stores form enquiries |
| `CONTACT_WEBHOOK_TOKEN` | optional Bearer token required by that endpoint |

Canonical tags, `og:url`, the social card URL, `sitemap.xml`, and
`robots.txt` all derive from it. Without it they fall back to
`https://thehnx.com` and will point at the wrong place. Update the value when
a custom domain is attached.

Deploy from the CLI:

```bash
npx vercel login      # once, interactive
npx vercel --prod
```

Or import the GitHub repo from the Vercel dashboard for automatic deploys on
every push to `main`.

---

## Before going live

1. Replace the placeholder contact details and social URLs in `lib/site.ts`.
2. Set `NEXT_PUBLIC_SITE_URL` on the host to the real domain — canonical URLs,
   the sitemap, robots.txt, and social card URLs all derive from it.
3. Confirm product links and case-study claims match the live products.
4. Configure the contact webhook and verify a real enquiry reaches the destination.
