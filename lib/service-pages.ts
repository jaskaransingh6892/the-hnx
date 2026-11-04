/**
 * Long-form copy for the individual service pages.
 *
 * Kept apart from `content.ts` because the shape is different: `services`
 * there carries the short summaries reused across cards and navigation, while
 * everything here exists only to give /services/[slug] a page worth indexing.
 *
 * Each entry has to say something the other pages do not. Pages spun
 * from the same paragraph would compete with each other and read as thin
 * content, which costs more in search than having fewer pages would.
 */
export type ServicePage = {
  /** Leads with the phrase people search for, not the internal name. */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  build: { name: string; body: string }[];
  approach: { title: string; body: string }[];
  audience: string[];
  faq: { q: string; a: string }[];
  deliverables?: { title: string; body: string }[];
};

export const servicePages: Record<string, ServicePage> = {
  "web-development": {
    metaTitle: "Web Development Company — Custom Websites & Web Applications",
    metaDescription:
      "Custom website and web application development: fast, search-visible marketing sites, customer portals, and platforms your team can edit without a developer.",
    h1: "Web development that earns its traffic",
    intro: [
      "A website is usually the first thing a buyer checks and the last thing anyone budgets time for. We build the kind that loads immediately, reads well on a phone, and can be updated by the people who own the words — without a ticket, a deploy, or a designer.",
      "That covers a five-page marketing site as readily as a logged-in portal with roles, billing, and a search index behind it. The engineering standard does not drop because the brief is small.",
    ],
    build: [
      {
        name: "Custom website development",
        body: "Designed and built for your content rather than fitted into a bought theme, so nothing important has to be squeezed into a layout that was never meant for it.",
      },
      {
        name: "Web applications",
        body: "Dashboards, portals, and internal tools with real authentication, permissions, and audit trails — the parts that decide whether software survives its second year.",
      },
      {
        name: "Progressive web apps",
        body: "Installable, offline-tolerant experiences for teams working from warehouses, sites, and vehicles where the signal comes and goes.",
      },
      {
        name: "Headless CMS integration",
        body: "Your marketing team edits pages in a clean interface; the site stays fast because the content is rendered ahead of time, not assembled on every request.",
      },
    ],
    approach: [
      {
        title: "Speed is a feature, not a phase",
        body: "Performance budgets are set before the first component is written. Planning for speed early reduces the rework needed after launch.",
      },
      {
        title: "Search visibility is built in",
        body: "Semantic markup, clean URLs, metadata, sitemaps, and structured data ship with the site rather than being bolted on once rankings disappoint.",
      },
      {
        title: "Editable without us",
        body: "If every copy change needs a developer, the site goes stale. We hand over something your team can actually run.",
      },
    ],
    audience: [
      "Companies whose current site is slow, hard to edit, or invisible in search",
      "Teams that need a customer-facing portal, not just brochure pages",
      "Founders who need a credible site before the first sales conversation",
    ],
    faq: [
      {
        q: "How long does a website take to build?",
        a: "The timeline depends on the content, design reviews, integrations, and features in scope. We agree milestones after understanding the brief and aim to launch a useful first release before expanding it.",
      },
      {
        q: "Can we edit the content ourselves afterwards?",
        a: "Yes. We integrate a headless CMS so your team edits pages, posts, and images directly. No developer, no deploy, and the site stays fast because pages are pre-rendered.",
      },
      {
        q: "Do you redesign existing websites or only build new ones?",
        a: "Both. For a redesign, we map existing URLs, preserve useful content, plan redirects where needed, and monitor search visibility after launch.",
      },
    ],
    deliverables: [
      {
        title: "An agreed site or application",
        body: "The pages, templates, and user flows defined in the scope, built for desktop and mobile use.",
      },
      {
        title: "Launch and search foundations",
        body: "Metadata, crawlable links, a sitemap, and a launch plan. For a redesign, that includes a URL and redirect map where needed.",
      },
      {
        title: "Code and editing handover",
        body: "Repository and deployment access, plus guidance for the team that will maintain the site or edit its content.",
      },
    ],
  },

  "custom-software": {
    metaTitle: "Custom Software Development Company — Bespoke Business Systems",
    metaDescription:
      "Custom software development for businesses that have outgrown off-the-shelf tools: bespoke systems, legacy modernisation, and platform re-architecture.",
    h1: "Custom software for the way you already work",
    intro: [
      "Most companies reach a point where the tool everyone uses no longer matches the business. The workarounds start — a spreadsheet beside the system, a chat group that holds the real process, a person who is the only one who knows the exception. That is the signal that the software is now costing more than it saves.",
      "We build the system that models your business as it actually runs, including the parts that are unusual. Bespoke does not mean rebuilding everything: often the right answer is a focused piece of software that sits alongside what you already own.",
    ],
    build: [
      {
        name: "Custom software development",
        body: "Applications designed around your workflow instead of forcing the workflow into someone else's product assumptions.",
      },
      {
        name: "Legacy system modernisation",
        body: "Moving software off ageing stacks without a big-bang cutover — usually strangling the old system module by module while it keeps running.",
      },
      {
        name: "Platform re-architecture",
        body: "For systems that work but cannot be changed cheaply any more: untangling the parts, restoring test coverage, and making the next change affordable.",
      },
      {
        name: "Software consulting",
        body: "An honest read on whether to build, buy, or fix what exists. Sometimes the recommendation is that you do not need us.",
      },
    ],
    approach: [
      {
        title: "We model the exceptions, not just the happy path",
        body: "Every business has cases that do not fit the diagram. Software that ignores them gets worked around within a month.",
      },
      {
        title: "Nothing goes dark during a rebuild",
        body: "Replacements run in parallel with what they replace. Cutting over is a decision you make once you trust the new system, not a date you gamble on.",
      },
      {
        title: "Written so the next team can read it",
        body: "Documented, tested, and conventional. You should not be locked into us because nobody else can understand the codebase.",
      },
    ],
    audience: [
      "Businesses running critical operations on spreadsheets and manual handoffs",
      "Teams paying for software that fits roughly two thirds of what they do",
      "Companies with a working system nobody dares to change",
    ],
    faq: [
      {
        q: "Is custom software more expensive than buying a product?",
        a: "Upfront, almost always. Over several years it often is not, once you count per-seat licences, the modules you pay for but cannot use, and the staff time spent on workarounds. We will tell you plainly when buying is the better answer.",
      },
      {
        q: "What happens to our existing data?",
        a: "Migration is planned as part of the build, not left to the end. We map the old data, clean what needs cleaning, and run both systems in parallel until the numbers agree.",
      },
      {
        q: "Do we own the source code?",
        a: "Yes. You own the code, the repositories, and the infrastructure accounts. There is no arrangement where switching provider means losing the software.",
      },
    ],
    deliverables: [
      {
        title: "Workflow and system map",
        body: "The users, exceptions, existing tools, data, and integration points the first release must account for, documented with the agreed scope.",
      },
      {
        title: "A working software release",
        body: "The agreed workflows and permissions implemented as a usable application, with acceptance checks tied to the work it needs to support.",
      },
      {
        title: "Code and operating handover",
        body: "Repository access, deployment notes, and a migration or integration plan where the new system replaces or connects to an existing one.",
      },
    ],
  },

  "erp-business-systems": {
    metaTitle: "ERP & CRM Development Company — Custom Business Systems",
    metaDescription:
      "Custom ERP and CRM development that unifies finance, inventory, sales, and people into one system — built around your operations, deployed module by module.",
    h1: "ERP and CRM built around your operations",
    intro: [
      "An ERP is only worth having if it becomes the single place people check. That does not happen because the software has more modules than the alternative; it happens because the system matches how the business actually moves stock, money, and approvals.",
      "We build ERP and CRM platforms module by module, starting with the one that is hurting most. Finance, inventory, procurement, sales, and workforce come together over time rather than in one launch that asks everybody to change on the same Monday.",
    ],
    build: [
      {
        name: "ERP development",
        body: "Finance, inventory, procurement, and workforce on one ledger, with multi-entity and multi-location handled properly rather than through duplicated records.",
      },
      {
        name: "CRM development",
        body: "Pipelines that reflect how your team actually sells, with every touchpoint captured so forecasts are based on activity instead of optimism.",
      },
      {
        name: "SaaS product development",
        body: "Multi-tenant platforms with subscriptions, roles, and per-customer configuration, built to be sold rather than merely used internally.",
      },
      {
        name: "Business process automation",
        body: "Approvals, reconciliations, and scheduled jobs that run without somebody remembering to run them.",
      },
    ],
    approach: [
      {
        title: "One module live beats ten in progress",
        body: "The first module reaches production early and earns trust. Adoption is what makes an ERP work, and adoption follows something people can already use.",
      },
      {
        title: "The numbers have to reconcile",
        body: "Stock, invoices, and payments are checked against the system they replace until they agree. An ERP nobody trusts is a very expensive spreadsheet.",
      },
      {
        title: "Roles decide the screens",
        body: "An owner and a counter operator open the same system and see different halves of it, with an audit log recording who did what.",
      },
    ],
    audience: [
      "Growing businesses whose finance, stock, and sales data live in separate places",
      "Companies on a generic ERP that fits the industry but not the company",
      "Teams that want to sell their internal system as a product",
    ],
    faq: [
      {
        q: "How long before an ERP is actually usable?",
        a: "We identify the first useful module during discovery and agree milestones before development. Timing depends on integrations, data quality, permissions, and rollout needs. Later modules can follow once the first workflow is working for its users.",
      },
      {
        q: "Can it work alongside our accounting software?",
        a: "Yes. Where a tool already works well we integrate with it rather than replace it. Replacing accounting software is a decision with its own cost, and it is rarely the right first move.",
      },
      {
        q: "What about our existing stock and customer data?",
        a: "It is migrated as part of the build, with both systems running in parallel until the balances match. Nothing is switched off on trust alone.",
      },
    ],
    deliverables: [
      {
        title: "Process and data map",
        body: "The workflows, roles, existing systems, and records the first module needs to work with, agreed before implementation.",
      },
      {
        title: "A usable first module",
        body: "A working slice of the ERP or CRM that solves one operational problem, with roles and permissions that match the people using it.",
      },
      {
        title: "Migration and handover plan",
        body: "Data mapping, reconciliation checks, and the documentation your team needs to operate and extend the system.",
      },
    ],
  },

  cybersecurity: {
    metaTitle: "VAPT Services — Website & API Security Audits",
    metaDescription:
      "Website and API VAPT from The HNX: scoped penetration testing, evidence-backed findings, and practical remediation guidance for your engineering team.",
    h1: "VAPT and security audits for websites and APIs",
    intro: [
      "A scanner can list exposed software versions. It may miss whether one customer's account can read another customer's records, or whether a harmless-looking workflow can be used in a way the team never intended. Those questions need an assessment shaped around the application itself.",
      "The HNX assesses websites, web applications, and APIs with an agreed scope and written authorization. We examine the paths that handle identities, data, and business actions, then give your team a report that explains what was found, why it matters, and how to address it. The objective is a safer system and a clear next step, not a long list of scanner alerts.",
    ],
    build: [
      {
        name: "Website security audits",
        body: "A review of the public-facing site and its exposed functionality, including configuration, forms, authentication, and the paths that handle sensitive data.",
      },
      {
        name: "Web application VAPT",
        body: "Vulnerability assessment and penetration testing across agreed user roles and workflows, with attention to access control, session handling, input processing, and business logic.",
      },
      {
        name: "API security assessments",
        body: "Testing the agreed endpoints and roles for authentication, object-level authorization, data exposure, and misuse of sensitive business actions.",
      },
      {
        name: "Findings and remediation guidance",
        body: "A prioritized report with evidence, reproduction context, likely impact, and practical fix recommendations that engineers can use to plan remediation.",
      },
    ],
    approach: [
      {
        title: "Written scope before testing",
        body: "We agree which domains, environments, APIs, accounts, and test windows are in scope. Authorization and operational boundaries are settled before any active testing starts.",
      },
      {
        title: "Tools support the assessment",
        body: "Automated checks help find coverage gaps; manual review follows the application's roles and workflows, where access-control and business-logic mistakes often hide.",
      },
      {
        title: "Reports are written for the fix",
        body: "Each confirmed issue should have enough context for the owning team to understand and reproduce it. We separate confirmed findings from observations that need further investigation.",
      },
    ],
    audience: [
      "Teams preparing to launch or substantially change a website, web application, or API",
      "Businesses handling customer, payment, or operational data through online workflows",
      "Engineering teams that need a clear, prioritized view of web and API security risks",
    ],
    faq: [
      {
        q: "What is the difference between a vulnerability scan and VAPT?",
        a: "A scan is an automated check for known patterns. VAPT uses that information alongside manual testing of agreed roles and workflows to validate whether an issue is real and what it could affect. The exact coverage is defined in the scope.",
      },
      {
        q: "Can you test a live production website?",
        a: "Sometimes. We first agree authorization, test windows, accounts, rate limits, and activities to avoid. Where a production test could disrupt users or data, a staging environment may be the safer choice.",
      },
      {
        q: "Does a VAPT report certify that our system is secure?",
        a: "No assessment can prove the absence of every vulnerability. The report records the agreed scope, the work performed, and the findings at that point in time. If you need a particular compliance or certification outcome, tell us before scoping so the requirements can be reviewed separately.",
      },
    ],
    deliverables: [
      {
        title: "Agreed test scope",
        body: "A written record of the assets, user roles, environments, boundaries, and test window covered by the assessment.",
      },
      {
        title: "Prioritized findings report",
        body: "Confirmed issues with evidence, reproduction context, severity rationale, and the affected workflow or data.",
      },
      {
        title: "Remediation discussion",
        body: "A walkthrough with the owning team to explain the risks and help prioritize practical fixes. Any retest is scoped separately.",
      },
    ],
  },

  "mobile-applications": {
    metaTitle: "Mobile App Development Company — iOS & Android Applications",
    metaDescription:
      "iOS and Android app development with offline resilience, native performance, and store release engineering — cross-platform where it fits, native where it counts.",
    h1: "Mobile apps that hold up outside the office",
    intro: [
      "The phone is where most software is now used, and it is the least forgiving place to run it. Connections drop, batteries drain, and the person holding it is standing up, in a hurry, often outdoors. An app that only works on office wifi is not finished.",
      "We build iOS and Android products that keep working when the network does not, sync cleanly when it returns, and feel native on both platforms rather than like a website in a wrapper.",
    ],
    build: [
      {
        name: "Mobile app development",
        body: "Products built for the platform's own conventions — gestures, navigation, permissions, and notifications that behave the way users already expect.",
      },
      {
        name: "Cross-platform delivery",
        body: "One codebase for iOS and Android where the app suits it, which is most business apps. We say so when a case genuinely needs native.",
      },
      {
        name: "App store release engineering",
        body: "Store listings, review submissions, signing, staged rollouts, and crash reporting. The part that surprises teams shipping their first app.",
      },
      {
        name: "Mobile backend services",
        body: "APIs, push notifications, and sync built for intermittent connections rather than assuming the request always succeeds.",
      },
    ],
    approach: [
      {
        title: "Offline is designed, not patched",
        body: "What happens to a half-finished form in a lift is decided at design time. Retrofitting offline behaviour into a finished app rarely goes well.",
      },
      {
        title: "Tested on real devices",
        body: "Including the mid-range Android phone your users actually carry, not only the newest handset on a fast connection.",
      },
      {
        title: "Store rejections are planned for",
        body: "Review guidelines are checked before submission. A rejection costs a week, and it is nearly always avoidable.",
      },
    ],
    audience: [
      "Companies whose field or delivery staff work where connectivity is unreliable",
      "Businesses whose customers expect an app alongside the website",
      "Teams whose current app is slow, crashes, or has stalled in review",
    ],
    faq: [
      {
        q: "Should we build native or cross-platform?",
        a: "For most business apps cross-platform is the better economics — one codebase, one team, both stores. Native earns its cost when the app leans hard on the camera, background processing, or heavy graphics. We recommend based on your app, not on preference.",
      },
      {
        q: "Do you handle publishing to the App Store and Play Store?",
        a: "Yes, including developer account setup, signing, listing copy, screenshots, and the review process. The accounts stay in your name.",
      },
      {
        q: "What happens after launch?",
        a: "Crash reporting and analytics are in from day one, and both platforms force OS updates on their own schedule. We support apps past release rather than handing over a build and leaving.",
      },
    ],
    deliverables: [
      {
        title: "Mobile flows and device plan",
        body: "The agreed screens, platform behaviours, permissions, and offline or sync rules documented for the people and devices that will use the app.",
      },
      {
        title: "Testable app builds",
        body: "Builds for the agreed iOS and Android targets, with the core journeys and backend connections ready for review on real devices.",
      },
      {
        title: "Release and support handover",
        body: "Store submission materials where included, plus repository, signing, crash-reporting, and update guidance for the team that will operate the app.",
      },
    ],
  },

  "desktop-applications": {
    metaTitle: "Desktop Application Development — Windows, macOS & Linux Software",
    metaDescription:
      "Desktop software development for teams needing local processing power, hardware integration, and offline reliability across Windows, macOS, and Linux.",
    h1: "Desktop software for work the browser cannot do",
    intro: [
      "Plenty of work does not belong in a browser tab. Large files that should never leave the machine, a barcode scanner or weighing scale on a serial port, a design tool that needs the GPU, a plant floor with no reliable internet — these are desktop problems, and pretending otherwise makes them worse.",
      "We build desktop applications for Windows, macOS, and Linux that use the machine they run on, talk to the hardware attached to it, and keep working when the connection is gone.",
    ],
    build: [
      {
        name: "Desktop application development",
        body: "Applications with proper installers, automatic updates, and file-system access, built to run for years on machines that are not reimaged often.",
      },
      {
        name: "Cross-platform desktop builds",
        body: "One product, three operating systems, with the platform differences that matter handled rather than papered over.",
      },
      {
        name: "Hardware and peripheral integration",
        body: "Scanners, printers, scales, card readers, and instruments over USB, serial, or the network — including the ones with documentation from 2004.",
      },
      {
        name: "Secure offline sync",
        body: "Local-first data that reconciles with the server when it reappears, with conflicts resolved by rules you agreed rather than last-write-wins.",
      },
    ],
    approach: [
      {
        title: "The machine is an asset, not a thin client",
        body: "If there is a fast processor and a local disk in front of the user, the software should use them instead of waiting on a round trip.",
      },
      {
        title: "Updates that do not need IT",
        body: "Signed, automatic updates so a fix reaches every desk without someone visiting each machine.",
      },
      {
        title: "Hardware is proven early",
        body: "Integration with physical devices is tested against the actual model you own, at the start. It is the part that most often derails a schedule.",
      },
    ],
    audience: [
      "Manufacturing, laboratory, and retail teams with hardware attached to the workstation",
      "Businesses working with files too large or too sensitive to upload",
      "Sites where the internet is unreliable but the work cannot stop",
    ],
    faq: [
      {
        q: "Why choose desktop software over a web application?",
        a: "Three reasons usually decide it: hardware that must be spoken to directly, files that should not leave the machine, or work that has to continue without internet. If none of those apply, a web application is normally the cheaper answer and we will say so.",
      },
      {
        q: "Can the desktop app share data with our web system?",
        a: "Yes. The usual shape is local-first storage with background sync, so the desktop app is fully usable offline and reconciles with the central system when the connection returns.",
      },
      {
        q: "Do you support older Windows versions?",
        a: "Where the business needs it, yes. We confirm the supported versions up front, because it affects which frameworks are available and is expensive to change later.",
      },
    ],
    deliverables: [
      {
        title: "Compatibility and device scope",
        body: "The supported operating systems, workstation constraints, peripheral models, and offline or sync requirements agreed before implementation.",
      },
      {
        title: "Installable desktop application",
        body: "The scoped workflows packaged for the agreed platforms, including the file or hardware integrations the work depends on.",
      },
      {
        title: "Update and recovery guidance",
        body: "Repository and release notes with the agreed update process, local data handling, and steps for restoring or reconciling work after a failure.",
      },
    ],
  },

  "ai-automation": {
    metaTitle: "AI Development Services — RAG, Private LLMs & Automation",
    metaDescription:
      "AI development for RAG assistants, private LLMs, computer vision, predictive analytics, and workflow automation with evaluation and human review.",
    h1: "AI development for real business workflows",
    intro: [
      "An AI prototype can look convincing while failing on messy inputs, changing data, access boundaries, or real user questions. Useful systems start with a bounded task and an evaluation plan, whether the work involves retrieval, image analysis, forecasting, or automation.",
      "We build assistants, private model deployments, vision and prediction workflows, and automated processes connected to your systems. The right review and monitoring depend on what an error would cost your team.",
    ],
    build: [
      {
        name: "Knowledge assistants and RAG",
        body: "Search and retrieval over approved company content so responses can point to their sources and users can check the answer.",
      },
      {
        name: "Workflow agents and automation",
        body: "Assistants and pipelines that can classify, draft, route, or take bounded actions through approved tools, with a person reviewing consequential steps.",
      },
      {
        name: "Private LLM deployment",
        body: "A managed or controlled model environment selected around data handling, latency, and operating cost. Fine-tuning is considered only where evaluation shows it helps.",
      },
      {
        name: "Computer vision",
        body: "Image and video analysis scoped around the actual dataset and task, with uncertain predictions routed for review rather than treated as facts.",
      },
      {
        name: "Predictive analytics",
        body: "Forecasting and anomaly detection compared with a useful baseline, then monitored as the underlying data and business process change.",
      },
      {
        name: "Document intelligence",
        body: "Forms, invoices, and records turned into structured information with traceable extraction and review for low-confidence cases.",
      },
    ],
    approach: [
      {
        title: "Evaluation before deployment",
        body: "We build a test set from your real questions and measure against it. Without that, 'it seems better' is the only available verdict.",
      },
      {
        title: "Grounded, with sources",
        body: "Answers point at the document they came from. Anything else is unverifiable, and unverifiable answers do not survive contact with a real decision.",
      },
      {
        title: "A human stays in the loop where it counts",
        body: "For anything with money or legal weight attached, the system proposes and a person approves. Automation is a lever, not an abdication.",
      },
      {
        title: "Governance is part of the workflow",
        body: "Data access, model choice, approval points, and operating logs are defined with the team that owns the process, then revisited as the system changes.",
      },
    ],
    audience: [
      "Teams answering the same questions from the same documents every week",
      "Businesses processing invoices, forms, or applications by hand",
      "Companies that tried a generic chatbot and found it confidently wrong",
    ],
    faq: [
      {
        q: "Will our data be used to train someone else's model?",
        a: "Data handling depends on the provider and deployment. We document retention, training use, and access controls before choosing a managed or private setup. Where the requirement is strict, we can assess a model in your own environment.",
      },
      {
        q: "How do we validate the output?",
        a: "We use representative inputs and an agreed baseline to test quality before launch and after meaningful changes. For knowledge assistants, answers should also carry sources; for vision or prediction, uncertain cases need a review path.",
      },
      {
        q: "Do we need to fine-tune a model?",
        a: "Often the first improvement is better data access, prompts, or workflow design. We consider fine-tuning only when a test set shows that those approaches are insufficient and the extra operating cost is justified.",
      },
      {
        q: "Is this worth it for a small team?",
        a: "It depends entirely on volume. If a task takes an hour a week, no. If three people spend a morning a day on it, the case usually makes itself. We would rather work that out with you before quoting than after.",
      },
    ],
    deliverables: [
      {
        title: "Use-case and data inventory",
        body: "The approved sources or datasets, target task, access boundaries, and cases that require a person's decision.",
      },
      {
        title: "Working model or integrated workflow",
        body: "The scoped assistant, vision or prediction flow, private deployment, or automation connected to the agreed data and review steps.",
      },
      {
        title: "Evaluation and operating guide",
        body: "A representative test set, documented limitations and approvals, and a process for checking quality as data, models, or workflows change.",
      },
    ],
  },

  "cloud-api": {
    metaTitle: "Cloud Solutions & API Development — DevOps, CI/CD, Integrations",
    metaDescription:
      "Cloud architecture, API development and integration, CI/CD pipelines, and monitoring built for uptime, observability, and predictable monthly cost.",
    h1: "Cloud and APIs, without the surprise invoice",
    intro: [
      "Cloud bills grow quietly. So does the time between finishing a change and having it live. Both are architecture problems wearing an operations costume, and both get more expensive the longer they are left alone.",
      "We design cloud infrastructure and API layers for the size you actually are, with deployment that takes minutes, monitoring that tells you before your customers do, and costs that can be forecast.",
    ],
    build: [
      {
        name: "Cloud solutions",
        body: "Architecture on AWS, Azure, or a smaller host, sized for current load with a clear path to scale — not a Kubernetes cluster for an application three people use.",
      },
      {
        name: "API development and integration",
        body: "Documented, versioned APIs, and the connective work between systems that were never designed to speak to each other.",
      },
      {
        name: "DevOps and CI/CD pipelines",
        body: "Automated tests, builds, and deploys, so shipping is routine rather than an event scheduled for a Friday night.",
      },
      {
        name: "Observability and monitoring",
        body: "Logs, metrics, traces, and alerts that fire on the things customers feel, not on every transient blip.",
      },
    ],
    approach: [
      {
        title: "Right-sized, then scaled",
        body: "Infrastructure matched to real traffic. Over-provisioning for imagined scale is the most common cause of a cloud bill nobody can explain.",
      },
      {
        title: "Deploys are boring on purpose",
        body: "Automated pipelines with a rollback that works. If releasing is frightening, releases become rare, and rare releases are the risky ones.",
      },
      {
        title: "Portable by default",
        body: "We avoid provider-specific lock-in where the alternative is reasonable, so moving host later is a decision rather than a rewrite.",
      },
    ],
    audience: [
      "Teams whose cloud bill has grown faster than their usage",
      "Companies deploying by hand, or afraid to deploy at all",
      "Businesses needing systems that were never meant to integrate to work together",
    ],
    faq: [
      {
        q: "Can you reduce our existing cloud costs?",
        a: "Usually, yes. The savings normally come from right-sizing over-provisioned instances, removing resources nobody owns, and fixing storage and data-transfer patterns. We start with an audit so the number is real before anything is promised.",
      },
      {
        q: "Which cloud provider do you recommend?",
        a: "It depends on your team, your existing licences, and where your data has to live. AWS and Azure both work well. For smaller applications a simpler host is often cheaper and easier to run.",
      },
      {
        q: "Do you take over infrastructure someone else built?",
        a: "Yes. That begins with documenting what exists and what it costs, because inherited infrastructure usually has more running in it than anyone remembers.",
      },
    ],
    deliverables: [
      {
        title: "Architecture and cost baseline",
        body: "An inventory of the agreed services, integrations, traffic assumptions, and current or expected spend so design choices have a clear starting point.",
      },
      {
        title: "Infrastructure and API setup",
        body: "The scoped environments, deployment pipeline, and documented endpoints or integrations implemented on the agreed platform.",
      },
      {
        title: "Monitoring and operations handover",
        body: "Relevant logs, metrics, and alerts, with deployment, rollback, access, and ownership notes for the team operating the system.",
      },
    ],
  },

  "ui-ux-design": {
    metaTitle: "UI/UX Design Services — Product Design, Design Systems, Prototypes",
    metaDescription:
      "UI/UX design for complex products: user research, interface systems, interactive prototypes, and usability and accessibility audits that reduce support load.",
    h1: "Interface design for genuinely complex products",
    intro: [
      "Designing a landing page and designing a system a warehouse manager uses for six hours a day are different jobs. The second one is judged on how quickly a trained user completes the twentieth task of the morning, not on how it looks in a portfolio.",
      "We design interfaces for products with real depth — many roles, many states, and screens that have to stay clear when the data is messy.",
    ],
    build: [
      {
        name: "UI/UX design",
        body: "Research, flows, and interface design driven by what users are trying to finish, including the error states that decide whether they trust the software.",
      },
      {
        name: "Design systems",
        body: "Components, tokens, and rules so the tenth screen matches the first and a new developer can build one without guessing.",
      },
      {
        name: "Interactive prototyping",
        body: "Clickable prototypes tested with real users before engineering starts. Changing a prototype costs hours; changing shipped software costs weeks.",
      },
      {
        name: "Usability and accessibility audits",
        body: "Where existing products lose people, with WCAG conformance checked properly rather than assumed from a colour contrast tool.",
      },
    ],
    approach: [
      {
        title: "Designed with real data",
        body: "Names that overflow, empty states, sixty-row tables. Interfaces designed on tidy sample data break on contact with the actual database.",
      },
      {
        title: "Handoff engineers can build from",
        body: "Our designers and developers work in the same team, so specifications answer the questions implementation actually raises.",
      },
      {
        title: "Accessibility from the start",
        body: "Keyboard navigation, focus order, and contrast designed in. Retrofitting accessibility means redoing work, and increasingly it is a procurement requirement.",
      },
    ],
    audience: [
      "Products where users need training before they can be productive",
      "Teams whose screens have drifted apart as features were added",
      "Companies with high support volume caused by confusing interfaces",
    ],
    faq: [
      {
        q: "Can you design without also building it?",
        a: "Yes. We hand over designs and a documented system your own developers implement. We do note where a decision will be expensive to build, since that conversation is cheaper before engineering starts.",
      },
      {
        q: "Do you redesign existing products?",
        a: "Often, and it usually starts with an audit of where users currently struggle. Redesigning on assumptions tends to move the problems rather than remove them.",
      },
      {
        q: "How do you know the design is better?",
        a: "By testing it. Prototypes go in front of people who resemble your users, and we measure task completion and where they hesitate — before the design becomes code.",
      },
    ],
    deliverables: [
      {
        title: "User and workflow findings",
        body: "A concise record of the users, tasks, friction points, and design priorities found in the agreed research or product audit.",
      },
      {
        title: "Flows and interactive designs",
        body: "The agreed screens and prototypes, including key empty, error, permission, and keyboard states where they affect the experience.",
      },
      {
        title: "Build-ready design handover",
        body: "Component rules, visual tokens, interaction notes, and accessibility findings that engineers can use without guessing at the intended behaviour.",
      },
    ],
  },
};
