/**
 * Central site configuration — personal portfolio.
 */
const rawOrigin = process.env.NEXT_PUBLIC_SITE_URL || "https://thehnx.com";
const origin = rawOrigin.endsWith("/") ? rawOrigin.slice(0, -1) : rawOrigin;

export const site = {
  name: "The HNX",
  legalName: "The HNX",
  alternateNames: ["TheHNX", "The HNX", "HNX", "The Hnx", "TheHnx"],
  domain: "thehnx.com",
  url: origin,
  tagline: "Interface · Logic · Intelligence",
  description:
    "Full-stack developer & AI/ML engineer. I build the interface, the services and the model behind them, so a rough idea becomes a product people can use.",
  shortDescription: "Interface, services and the model behind them.",
  email: "hello@thehnx.com",
  salesEmail: "hello@thehnx.com",
  phone: "+91 78890 02108",
  get whatsapp() {
    return this.phone.replace(/\D/g, "");
  },
  location: "Remote-first",
  hours: "Mon – Fri · 09:00 – 19:00",
  gaId: process.env.NEXT_PUBLIC_GA_ID || "G-563R65KGMV",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-K98J9FCB",
  googleSiteVerification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    "A2OLyaGhacAh2P_6UpYgk5fmKUjc7tzfRJPBMnY7vFk",
  socials: [
    { label: "Email", href: "mailto:hello@thehnx.com" },
    { label: "GitHub", href: "https://github.com/the-hnx" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/the-hnx" },
  ],
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
] as const;

export const works = [
  {
    slug: "vpn-tunneling-dashboard",
    title: "VPN Tunneling Dashboard",
    category: "Full-stack / Network visibility",
    tagline: "Make the invisible readable.",
    description:
      "A monitoring interface that brings VPN tunnel activity into one clear view. Graphs and structured tables make IKE and Child SA data easier to inspect.",
    stack: ["React", "REST APIs", "Data visualization"],
  },
  {
    slug: "jatayu",
    title: "JATAYU",
    category: "Applied AI / Autonomous UAV",
    tagline: "From seeing to responding.",
    description:
      "An autonomous UAV project connecting human detection, tracking and stereo-vision navigation with hardware and control logic.",
    stack: ["Python", "OpenCV", "NanoDet", "MAVLink", "Raspberry Pi"],
  },
  {
    slug: "retail-optimization-platform",
    title: "Retail Optimization Platform",
    category: "Product engineering / Retail analytics",
    tagline: "Connect the floor to the bigger picture.",
    description:
      "A retail platform bringing analytics and inventory tracking into one connected product.",
    stack: ["React", "Node.js", "Express", "Supabase", "YOLO", "OpenCV"],
  },
] as const;

export const experiences = [
  {
    year: "July 2026 – Now",
    role: "Research Intern",
    org: "IIT Bombay",
    orgLocation: "Mumbai",
    detail: "Working on the industry project Dhatuverse.",
  },
  {
    year: "2026",
    role: "B.E. Computer Engineering",
    org: "Xavier Institute of Engineering",
    orgLocation: "",
    detail: "Bachelor of Engineering, class of 2026.",
  },
  {
    year: "July 2025",
    role: "Project Intern",
    org: "BARC",
    orgLocation: "Mumbai",
    detail: "Built a research-focused web system under expert mentorship.",
  },
  {
    year: "June 2024",
    role: "AI/ML Intern",
    org: "IBM SkillsBuild",
    orgLocation: "Virtual",
    detail: "Machine learning fundamentals and data analysis.",
  },
] as const;

export const stack = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { group: "Backends & APIs", items: ["Node.js", "Express", "FastAPI", "REST"] },
  { group: "Databases", items: ["PostgreSQL", "MongoDB", "Supabase", "Qdrant"] },
  { group: "Data pipelines", items: ["SQL", "ETL / ELT", "Python", "Power BI"] },
  { group: "Computer vision", items: ["OpenCV", "YOLO", "NanoDet", "Raspberry Pi"] },
  { group: "Applied AI", items: ["LangChain", "Hugging Face", "Model evaluation", "MLOps"] },
] as const;
