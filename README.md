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
  services/               capability catalogue + engagement models
  products/               filterable product showcase
  about/                  philosophy, stats, differentiators
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
             Process, Tech, CTA, About, Contact, ContactForm
  ui/        Logo, Button, SectionHeading, Reveal, Magnetic, Counter,
             SpotlightCard, ServiceCard, ProductCard, FeatureCard,
             TechBadge, StatusBadge, Field
  visuals/   ParticleField (canvas), HeroCore (orbits), Aurora, GridField

lib/
  content.ts  services, products, process, technologies, stats, copy
  site.ts     company name, contact details, social links, navigation
  utils.ts    classname helper
```

---

## Editing the site

Almost all copy and data lives in two files. Nothing else needs touching.

**`lib/site.ts`** — company name, email, phone, location, hours, social links,
and the primary navigation.

**`lib/content.ts`** — services, products, process steps, technologies, stats,
and form options.

### Adding a product

Append an entry to `products` in `lib/content.ts`:

```ts
{
  slug: "atlas",
  name: "Atlas",
  category: "AI Platform",       // new categories appear in the filter automatically
  status: "Coming Soon",         // "Live" | "In Development" | "Coming Soon"
  summary: "One-line pitch.",
  description: "Two-line explanation.",
  icon: Boxes,                   // any lucide-react icon
  accent: "from-cyan-400 to-blue-600",
  highlights: ["Point one", "Point two", "Point three"],
}
```

It then appears on the homepage showcase, the products page, and the category
filter with no further changes. The homepage shows the first three
(`<ProductsSection limit={3} />`); `/products` shows all of them.

### Adding a service

Append to `services` in the same file. Each entry carries a `capabilities`
array — those strings render as the chips on `/services` and the links in the
footer.

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
Accents run cyan `#22d3ee` → blue `#4f7cff` → violet `#8b5cf6` on a near-black
`#03050a` ground.

---

## The contact form

`components/sections/ContactForm.tsx` validates on blur and on submit, shows
inline field errors, and has distinct submitting / success / error states. A
hidden honeypot field catches bots.

`app/api/contact/route.ts` re-validates everything server-side (never trust the
client), rejects unknown project types and budget ranges, and currently writes
the enquiry to the server log. To deliver it for real, replace the marked
integration point with a transactional email provider (Resend, Postmark,
SendGrid, SES) or a CRM webhook, reading credentials from environment
variables.

Product cards deep-link as `/contact?product=<name>`, which pre-fills the
message. `?type=<project type>` pre-selects the project type.

---

## Motion and accessibility

- Scroll reveals, the hero particle field, the orbit visuals, and the marquee
  all stop for `prefers-reduced-motion: reduce`; the counters jump straight to
  their final figures.
- The canvas particle count scales with viewport area and is capped, so it
  stays cheap on low-power devices.
- A skip link, visible focus rings, `aria-invalid` / `aria-describedby` on form
  fields, `aria-pressed` on the product filter, and labelled landmarks are in
  place.
- A `<noscript>` rule reveals anything the reveal animations would otherwise
  leave hidden.

---

## Before going live

1. Replace the placeholder contact details and social URLs in `lib/site.ts`.
2. Set `site.url` to the real domain — canonical URLs, the sitemap, robots.txt,
   and social card URLs all derive from it.
3. Review the figures in `stats` (`lib/content.ts`); they are placeholders.
4. Swap the six example products for real ones.
5. Wire the contact endpoint to a real delivery provider.
