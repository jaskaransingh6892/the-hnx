/**
 * Case-study copy for the product detail pages.
 *
 * These are build stories, not outcome stories. Everything here describes what
 * the product does and why it was built that way — all of it checkable against
 * the running software. Adoption figures and before/after numbers are
 * deliberately absent rather than estimated: an invented metric is the fastest
 * way to lose a reader who decides to verify one.
 *
 * When real numbers exist, add them to `results` and they will render.
 */
export type CaseStudy = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** One line under the H1 — the product's job in plain terms. */
  standfirst: string;
  /** Where the product came from and what it exists to fix. */
  problem: string[];
  /** The decisions that shaped it, each with the reasoning kept in. */
  decisions: { title: string; body: string }[];
  /** What was actually built, grouped so the scope is legible. */
  built: { area: string; items: string[] }[];
  stack: string[];
  /** Measured outcomes. Left empty until there are real ones to show. */
  results: { metric: string; label: string }[];
};

export const caseStudies: Record<string, CaseStudy> = {
  myinventory: {
    metaTitle: "MyInventory — Retail Stock & Billing Software Case Study",
    metaDescription:
      "How we built MyInventory: GST-ready retail billing, barcode stock control, multi-store inventory, home delivery, and an online storefront on one system.",
    h1: "MyInventory",
    standfirst:
      "Retail software that carries a sale from the barcode scan to the invoice, the return, the delivery, and the online shop — without the numbers ever disagreeing.",
    problem: [
      "Most inventory software stops at counting boxes. The shop keeps a stock system, then a separate billing counter, then a spreadsheet for home delivery, and increasingly a website someone updates by hand. Every one of those holds a version of the same figure, and they drift apart within a week.",
      "The cost shows up quietly: an item sold that the website still lists, a return that adjusted the refund but not the stock, a supplier order placed against a count nobody trusts. Staff learn to check two places before answering a customer, which is the point at which the software has started costing more than it saves.",
      "MyInventory was built to close that gap — one catalogue, one stock figure, and every transaction that touches it going through the same system.",
    ],
    decisions: [
      {
        title: "The sale continues past the till",
        body: "Billing, returns, home delivery, and the online storefront all read and write the same stock record. A return pulls up the original bill, and the refund, the tax, and the stock move together rather than as three separate corrections someone has to remember.",
      },
      {
        title: "Barcodes validated before they reach the shelf",
        body: "Duplicate barcodes are the classic retail data problem — two products sharing a code means every scan is a coin toss. Codes are checked for uniqueness at the point an item is created, not discovered later at the counter.",
      },
      {
        title: "One catalogue serves the shop and the shelf",
        body: "The storefront is not a second system with its own product list. It reads the same items, the same prices, and the same photographs, so the website cannot advertise something the shop knows is out of stock.",
      },
      {
        title: "Sessions that actually end",
        body: "Logging out blacklists the token, so a copied session cannot be replayed. The sign-in route is rate limited, roles decide which half of the app a user sees, and an audit log records what happened and who was signed in — readable inside the app, not buried in a server file.",
      },
      {
        title: "Configuration without a redeploy",
        body: "Currency, invoice prefix, low-stock threshold, and the wording of every outgoing email are settings. Shops change these; needing a developer for it makes the software feel rented rather than owned.",
      },
    ],
    built: [
      {
        area: "Stock and catalogue",
        items: [
          "Items with HSN code, barcode, unit, category, and supplier",
          "Bulk import of an entire price list from Excel",
          "Product images to object storage, swappable without touching the listing",
          "Custom filters — brand, weight, flavour, organic — defined per shop",
        ],
      },
      {
        area: "Counter",
        items: [
          "Barcode scanning straight into the bill",
          "Cash, card, and UPI, including a payment split across two methods",
          "GST handled per line at the applicable rate",
          "Returns resolved against the original invoice",
        ],
      },
      {
        area: "Beyond the shop",
        items: [
          "Home delivery orders taken and tracked through to the door",
          "Customer-facing storefront with carts, wishlists, saved addresses, and reviews",
          "Order tracking and status visible to both sides",
          "Multi-store stock, with each outlet's position kept separate and comparable",
        ],
      },
      {
        area: "Dashboard",
        items: [
          "Twelve views built in — no report to configure before the first useful number",
          "Sales trend over a chosen range with the payment split beside it",
          "Top products and the ones that stopped moving",
          "Store and staff performance, ranked and comparable",
          "Stock alerts and invoice status — paid, pending, dispatched",
        ],
      },
      {
        area: "Access and accountability",
        items: [
          "Password sign-in, or a code mailed to staff at a busy counter",
          "Role-based screens for owners and counter operators",
          "Token blacklisting on logout and rate limiting on sign-in",
          "Audit log and staff hours drawn from the same record",
        ],
      },
    ],
    stack: ["PostgreSQL", "Node.js", "React", "Object storage", "Role-based auth"],
    results: [],
  },

  educationcloud: {
    metaTitle: "EducationCloud — School Management Software Case Study",
    metaDescription:
      "How we built EducationCloud: a school portal covering students, teachers, homework, exams, fees, a parent app, an AI assistant, and the PM POSHAN workflow.",
    h1: "EducationCloud",
    standfirst:
      "A school management portal covering students, teachers, houses, homework, exams, and fees — with a parent app, online payments, and the PM POSHAN mid-day meal workflow built in.",
    problem: [
      "A school runs on more separate records than most businesses. Attendance in one register, marks in another, fees in a ledger, homework on a whiteboard, and the house points on a noticeboard someone updates on Fridays. Each is maintained by a different person, and none of them can answer a parent's question without three of those people being available.",
      "Software exists for this, but most of it is built for the administrator and forgets that a school has five kinds of user. A teacher marking attendance between periods, a student checking what is due tomorrow, and a parent following two children in different classes all need different things from the same data.",
      "EducationCloud was built as one portal with roles that genuinely differ, so each of those people opens the same system and gets their own half of it.",
    ],
    decisions: [
      {
        title: "Five role types, not one with permissions bolted on",
        body: "Admins, teachers, students, parents, and staff each get an interface shaped around what they came to do. A parent login follows every child they have in one place rather than requiring a separate account per student.",
      },
      {
        title: "The assistant answers from the school's own data",
        body: "A built-in assistant handles the questions that otherwise reach the office — when homework is due, which house a student is in, what the fee position is. It answers from that school's records, so it is useful rather than generically conversational.",
      },
      {
        title: "PM POSHAN treated as a first-class workflow",
        body: "Government and aided schools run the mid-day meal scheme on paperwork that has to reconcile at the end of every month. The system logs the daily meal, costs it against the scheme norms, draws down foodgrain, books the cooking cost, and produces MDM-MIS-ready summaries — turning a monthly reconciliation exercise into a daily few seconds.",
      },
      {
        title: "Fees collected where the parent already is",
        body: "Fee structures, bills, and concessions in the system; payment online through Razorpay; receipts reconciled automatically. Defaulter and collection reports come from the same records rather than a parallel spreadsheet.",
      },
      {
        title: "Messages reach people on the channel they read",
        body: "In-app, email, SMS, and WhatsApp, with absence and fee reminders sent automatically and circulars targeted at the right audience instead of everyone.",
      },
    ],
    built: [
      {
        area: "People",
        items: [
          "Student directory that stays fast at scale, with class and section filters",
          "Teacher records with qualifications, specialisation, and class-teacher assignments",
          "Roll numbers, guardians, photographs, and ID cards",
          "Students reassigned between classes and sections in one action",
        ],
      },
      {
        area: "Academics",
        items: [
          "Month-view homework calendar with due-date badges and reminders",
          "Class-level syllabus by type, with file attachments per subject",
          "Sections, subjects, and rosters",
          "Exams, results, and report cards on demand",
        ],
      },
      {
        area: "School life",
        items: [
          "Houses with points, captains, and live standings",
          "Extracurricular activities with coaches, venues, and schedules",
          "Admin-managed activity categories — sports, dance, quiz, music, art",
          "House rosters students can browse",
        ],
      },
      {
        area: "Parents and fees",
        items: [
          "One parent login following every child",
          "Attendance, homework, results, and fees in the parent view",
          "Online fee payment with auto-reconciled receipts",
          "Automatic absence and fee alerts",
        ],
      },
      {
        area: "Operations",
        items: [
          "PM POSHAN daily meals register, foodgrain stock, and cooking-cost funds",
          "MDM-MIS ready monthly summaries with foodgrain and fund reconciliation",
          "Device management for tablets, laptops, and projectors, tracked by QR code",
          "Warranty, repair, and issue history from purchase to scrap",
        ],
      },
    ],
    stack: ["Cloud-hosted", "Role-based access", "Razorpay", "SMS & WhatsApp delivery", "AI assistant"],
    results: [],
  },
};
