import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  BrainCircuit,
  Boxes,
  CloudCog,
  Code2,
  Compass,
  CreditCard,
  Cpu,
  Database,
  Fingerprint,
  Gauge,
  GitBranch,
  Globe,
  Headset,
  Layers,
  LayoutDashboard,
  LineChart,
  MonitorSmartphone,
  Network,
  Palette,
  Rocket,
  ScanSearch,
  Server,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";

/* ------------------------------------------------------------------
   SERVICES
   Eight capability groups shown on the homepage; each group unpacks
   into the individual services listed on /services.
------------------------------------------------------------------ */
export type Service = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  capabilities: string[];
};

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    tagline: "Sites and platforms that carry a brand",
    description:
      "Marketing sites, portals, and complex web platforms engineered for speed, search visibility, and effortless editing.",
    icon: Globe,
    accent: "from-cyan-400/80 to-blue-500/70",
    capabilities: [
      "Custom Website Development",
      "Web Applications",
      "Progressive Web Apps",
      "Headless CMS Integration",
    ],
  },
  {
    slug: "custom-software",
    title: "Custom Software",
    tagline: "Systems shaped around how you actually work",
    description:
      "When off-the-shelf tools stop fitting, we design and build the software that models your business precisely.",
    icon: Code2,
    accent: "from-blue-400/80 to-indigo-500/70",
    capabilities: [
      "Custom Software Development",
      "Legacy System Modernisation",
      "Platform Re-architecture",
      "Software Consulting",
    ],
  },
  {
    slug: "erp-business-systems",
    title: "ERP & Business Systems",
    tagline: "One source of truth across operations",
    description:
      "ERP and CRM platforms that unify finance, inventory, sales, and people into a single operational backbone.",
    icon: LayoutDashboard,
    accent: "from-violet-400/80 to-fuchsia-500/70",
    capabilities: [
      "ERP Development",
      "CRM Development",
      "SaaS Product Development",
      "Business Process Automation",
    ],
  },
  {
    slug: "mobile-applications",
    title: "Mobile Applications",
    tagline: "Native-grade experiences on every device",
    description:
      "iOS and Android products built with offline resilience, native performance, and a design language that travels.",
    icon: Smartphone,
    accent: "from-sky-400/80 to-cyan-500/70",
    capabilities: [
      "Mobile App Development",
      "Cross-platform Delivery",
      "App Store Release Engineering",
      "Mobile Backend Services",
    ],
  },
  {
    slug: "desktop-applications",
    title: "Desktop Applications",
    tagline: "Heavy-duty tools for demanding workflows",
    description:
      "Windows, macOS, and Linux software for teams that need local power, hardware access, and offline reliability.",
    icon: MonitorSmartphone,
    accent: "from-teal-400/80 to-emerald-500/70",
    capabilities: [
      "Desktop Application Development",
      "Cross-platform Desktop Builds",
      "Hardware & Peripheral Integration",
      "Secure Offline Sync",
    ],
  },
  {
    slug: "ai-automation",
    title: "AI & Automation",
    tagline: "Intelligence wired into daily operations",
    description:
      "Assistants, copilots, and automated pipelines that remove repetitive work and surface decisions faster.",
    icon: BrainCircuit,
    accent: "from-fuchsia-400/80 to-violet-500/70",
    capabilities: [
      "AI Solutions",
      "AI Chatbots",
      "AI Automation",
      "Document & Data Intelligence",
    ],
  },
  {
    slug: "cloud-api",
    title: "Cloud & API Solutions",
    tagline: "Infrastructure that scales without drama",
    description:
      "Cloud architecture, CI/CD, and API layers designed for uptime, observability, and predictable cost.",
    icon: CloudCog,
    accent: "from-blue-400/80 to-cyan-500/70",
    capabilities: [
      "Cloud Solutions",
      "API Development & Integration",
      "DevOps & CI/CD Pipelines",
      "Observability & Monitoring",
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    tagline: "Clarity engineered into every screen",
    description:
      "Research, interface systems, and prototypes that turn complex products into something people enjoy using.",
    icon: Palette,
    accent: "from-indigo-400/80 to-violet-500/70",
    capabilities: [
      "UI/UX Design",
      "Design Systems",
      "Interactive Prototyping",
      "Usability & Accessibility Audits",
    ],
  },
];

/** Flat list of every individual service offering. */
export const serviceCatalogue: { name: string; group: string }[] = services.flatMap(
  (service) => service.capabilities.map((name) => ({ name, group: service.title })),
);

/* ------------------------------------------------------------------
   PRODUCTS
   Placeholder catalogue. Add an entry here and it appears on the
   homepage showcase, the products page, and the footer automatically.
------------------------------------------------------------------ */
export type ProductStatus = "Live" | "In Development" | "Coming Soon";

export type Product = {
  slug: string;
  name: string;
  category: string;
  status: ProductStatus;
  summary: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  highlights: string[];
};

export const products: Product[] = [
  {
    slug: "orbit",
    name: "Orbit",
    category: "ERP",
    status: "Live",
    summary: "The operating system for growing operations.",
    description:
      "A modular ERP covering finance, inventory, procurement, and workforce, deployed in weeks rather than quarters.",
    icon: Boxes,
    accent: "from-cyan-400 to-blue-600",
    highlights: ["Modular deployment", "Multi-entity ledger", "Realtime inventory"],
  },
  {
    slug: "nexa",
    name: "Nexa",
    category: "SaaS",
    status: "Live",
    summary: "Revenue intelligence for modern sales teams.",
    description:
      "A CRM that captures every touchpoint and turns pipeline noise into forecasts leadership can trust.",
    icon: LineChart,
    accent: "from-violet-400 to-indigo-600",
    highlights: ["Pipeline forecasting", "Automated capture", "Team analytics"],
  },
  {
    slug: "cortex",
    name: "Cortex",
    category: "AI Platform",
    status: "In Development",
    summary: "Private AI infrastructure for your own data.",
    description:
      "Retrieval, evaluation, and guardrails in one platform, so teams can ship AI features on internal knowledge safely.",
    icon: BrainCircuit,
    accent: "from-fuchsia-400 to-violet-600",
    highlights: ["Private retrieval", "Evaluation suite", "Policy guardrails"],
  },
  {
    slug: "flowline",
    name: "Flowline",
    category: "Business Automation",
    status: "In Development",
    summary: "Visual automation for operational workflows.",
    description:
      "Design approval chains, integrations, and scheduled jobs on a canvas without opening an engineering ticket.",
    icon: Workflow,
    accent: "from-teal-400 to-cyan-600",
    highlights: ["Visual builder", "Connector library", "Full audit trail"],
  },
  {
    slug: "vaulta",
    name: "Vaulta",
    category: "E-commerce Technology",
    status: "Coming Soon",
    summary: "Composable commerce for high-volume catalogues.",
    description:
      "A headless commerce core with storefront APIs, a pricing engine, and fulfilment orchestration built in.",
    icon: ShoppingBag,
    accent: "from-amber-400 to-orange-600",
    highlights: ["Headless storefronts", "Pricing engine", "Fulfilment routing"],
  },
  {
    slug: "signal-desk",
    name: "Signal Desk",
    category: "AI Platform",
    status: "Coming Soon",
    summary: "An AI support layer that resolves, not deflects.",
    description:
      "Handles repetitive requests, drafts grounded answers, and escalates complex cases to humans with full context.",
    icon: Headset,
    accent: "from-emerald-400 to-teal-600",
    highlights: ["Intent resolution", "Grounded answers", "Human handoff"],
  },
];

export const productStatusStyles: Record<ProductStatus, string> = {
  Live: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  "In Development": "border-sky-400/30 bg-sky-400/10 text-sky-300",
  "Coming Soon": "border-amber-400/30 bg-amber-400/10 text-amber-300",
};

export const productCategories = [
  "All",
  ...Array.from(new Set(products.map((product) => product.category))),
];

/* ------------------------------------------------------------------
   WHY THE HNX
------------------------------------------------------------------ */
export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const differentiators: Feature[] = [
  {
    title: "Built for Scalability",
    description:
      "Architecture decisions are made for your ten-thousandth user, not just your first hundred.",
    icon: Layers,
  },
  {
    title: "Modern Technology",
    description:
      "Current, well-supported stacks chosen on merit, never whatever happened to be lying around.",
    icon: Cpu,
  },
  {
    title: "AI-Ready Solutions",
    description:
      "Data models, APIs, and pipelines structured so intelligence can be layered in the moment you need it.",
    icon: Sparkles,
  },
  {
    title: "Business-Focused Approach",
    description:
      "Every sprint traces back to an outcome you can measure: revenue, retention, or hours reclaimed.",
    icon: Gauge,
  },
  {
    title: "Clean & Maintainable Architecture",
    description:
      "Documented, tested, and readable. Any competent team can pick it up and keep moving.",
    icon: GitBranch,
  },
  {
    title: "Long-Term Partnership",
    description:
      "We stay past launch with monitoring, iteration, and a roadmap that grows alongside the business.",
    icon: ShieldCheck,
  },
];

/* ------------------------------------------------------------------
   PROCESS
------------------------------------------------------------------ */
export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  detail: string;
  icon: LucideIcon;
  deliverables: string[];
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description: "We understand your idea, business, users, and goals.",
    detail:
      "Workshops with the people closest to the problem, an audit of what already exists, and a clear definition of success before a line of code is written.",
    icon: Compass,
    deliverables: ["Discovery workshop", "Requirement map", "Success metrics"],
  },
  {
    step: "02",
    title: "Strategy",
    description: "We define the technology, architecture, and roadmap.",
    detail:
      "Stack selection, system architecture, integration boundaries, and a phased delivery plan with realistic scope for every release.",
    icon: Network,
    deliverables: ["Solution architecture", "Stack decision record", "Phased roadmap"],
  },
  {
    step: "03",
    title: "Design",
    description: "We create intuitive and modern user experiences.",
    detail:
      "Flows, wireframes, and a complete interface system, prototyped and tested with real users so the build starts from certainty.",
    icon: Palette,
    deliverables: ["User flows", "High-fidelity UI", "Design system"],
  },
  {
    step: "04",
    title: "Build",
    description: "Our team transforms the vision into powerful software.",
    detail:
      "Two-week sprints, demo-able increments, automated testing, and code review on every change. Progress is visible continuously.",
    icon: Blocks,
    deliverables: ["Sprint demos", "Automated tests", "Staging environment"],
  },
  {
    step: "05",
    title: "Launch & Scale",
    description: "We deploy, optimize, and support your growth.",
    detail:
      "Zero-drama deployment, observability from day one, then continuous tuning as usage and requirements grow.",
    icon: Rocket,
    deliverables: ["Production launch", "Monitoring & alerts", "Growth roadmap"],
  },
];

/* ------------------------------------------------------------------
   TECHNOLOGY ECOSYSTEM
   `ring` places the badge on the orbit visual (0 = inner, 1 = outer).
------------------------------------------------------------------ */
export const techCategories = ["Frontend", "Backend", "Cloud", "Data", "AI"] as const;
export type TechCategory = (typeof techCategories)[number];

export type Tech = {
  name: string;
  category: TechCategory;
  icon: LucideIcon;
  ring: 0 | 1;
};

export const technologies: Tech[] = [
  { name: "Next.js", category: "Frontend", icon: Globe, ring: 0 },
  { name: "React", category: "Frontend", icon: Blocks, ring: 0 },
  { name: ".NET", category: "Backend", icon: Server, ring: 0 },
  { name: "Node.js", category: "Backend", icon: Code2, ring: 0 },
  { name: "Python", category: "Backend", icon: Cpu, ring: 0 },
  { name: "PostgreSQL", category: "Data", icon: Database, ring: 0 },
  { name: "SQL Server", category: "Data", icon: Database, ring: 1 },
  { name: "Azure", category: "Cloud", icon: CloudCog, ring: 1 },
  { name: "AWS", category: "Cloud", icon: CloudCog, ring: 1 },
  { name: "Docker", category: "Cloud", icon: Boxes, ring: 1 },
  { name: "OpenAI", category: "AI", icon: Sparkles, ring: 1 },
  { name: "AI APIs", category: "AI", icon: BrainCircuit, ring: 1 },
];

/* ------------------------------------------------------------------
   STATS - placeholder figures, review before launch
------------------------------------------------------------------ */
export type Stat = {
  value: number;
  suffix: string;
  label: string;
  hint: string;
};

export const stats: Stat[] = [
  { value: 120, suffix: "+", label: "Projects Delivered", hint: "Shipped and running in production" },
  { value: 40, suffix: "+", label: "Technologies", hint: "Across web, cloud, data, and AI" },
  { value: 18, suffix: "", label: "Industries Served", hint: "From fintech to logistics" },
  { value: 9, suffix: "+", label: "Years of Expertise", hint: "Combined engineering leadership" },
];

/* ------------------------------------------------------------------
   ABOUT - the four disciplines
------------------------------------------------------------------ */
export const principles: Feature[] = [
  {
    title: "Engineering",
    description:
      "Software that holds up under load, under audit, and under the next developer who opens it.",
    icon: Code2,
  },
  {
    title: "Design",
    description:
      "Interfaces that make complicated systems feel obvious the first time someone uses them.",
    icon: Palette,
  },
  {
    title: "Strategy",
    description:
      "Technical decisions argued from business consequences, not from preference or habit.",
    icon: Compass,
  },
  {
    title: "Intelligence",
    description:
      "AI applied where it removes real work, not sprinkled on top to look modern.",
    icon: BrainCircuit,
  },
];

/* ------------------------------------------------------------------
   ENGAGEMENT MODELS
------------------------------------------------------------------ */
export const engagementModels: Feature[] = [
  {
    title: "Product Build",
    description:
      "A defined scope, a dedicated team, and a launch date. Best for a new product or a major platform release.",
    icon: Rocket,
  },
  {
    title: "Embedded Squad",
    description:
      "Engineers and designers working inside your process on a rolling monthly basis.",
    icon: Boxes,
  },
  {
    title: "Technology Partner",
    description:
      "Ongoing architecture guidance, maintenance, and iteration for software already in production.",
    icon: ShieldCheck,
  },
];

/* ------------------------------------------------------------------
   CONTACT
------------------------------------------------------------------ */
export const projectTypes = [
  "Website",
  "Web Application",
  "ERP / CRM",
  "Mobile App",
  "Desktop Software",
  "AI Solution",
  "Custom Software",
  "Other",
] as const;

export const budgetRanges = [
  "Under $10k",
  "$10k - $25k",
  "$25k - $50k",
  "$50k - $100k",
  "$100k+",
  "Not sure yet",
] as const;

export const assurances: Feature[] = [
  {
    title: "Reply within one business day",
    description: "A senior engineer reads every enquiry that arrives.",
    icon: ScanSearch,
  },
  {
    title: "No-obligation scoping call",
    description: "Thirty minutes to pressure-test the idea before anything else.",
    icon: Fingerprint,
  },
  {
    title: "Transparent commercials",
    description: "Clear estimates and milestones before a contract is signed.",
    icon: CreditCard,
  },
];
