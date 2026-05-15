export const profile = {
  name: "Manikandan B",
  handle: "manikandan.exe",
  title: "Full Stack Engineer | React, Node.js, Hono, Prisma & PostgreSQL",
  roles: [
    "Full Stack Engineer",
    "React / TypeScript Specialist",
    "Node.js + Hono Backend Engineer",
    "Prisma + PostgreSQL Architect",
    "AI & Data Science Student",
  ],
  tagline:
    "Full Stack Developer specializing in modern TypeScript ecosystems and scalable web app architecture. I ship high-performance SPAs, ERP systems, dashboards, and API-driven platforms with a heavy focus on UI/UX, animation, and developer experience.",
  email: "manikandansns05@gmail.com",
  phone: "+91 7010534355",
  location: "Cuddalore, Tamil Nadu",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/",
  resumeUrl: "/MANIKANDAN_FSD_2025_compressed.pdf",
};

export const stats = [
  { label: "Years Coding", value: "3+" },
  { label: "Projects Shipped", value: "25+" },
  { label: "Stacks Mastered", value: "10" },
  { label: "Coffee / day", value: "∞" },
];

export const skills = {
  Frontend: [
    "React.js",
    "Next.js",
    "TypeScript",
    "JavaScript (ES6+)",
    "TailwindCSS",
    "SCSS/SASS",
    "GSAP",
    "Motion",
    "Lenis",
    "HTML5",
    "Responsive UI",
    "Parallax Animations",
  ],
  Backend: [
    "Node.js",
    "Hono.js",
    "Express.js",
    "REST API Development",
    "Auth Systems",
    "API Architecture",
    "ASP.NET Core Web API",
  ],
  Database: ["PostgreSQL", "MongoDB", "Prisma ORM"],
  "Data & State": ["TanStack Query", "Axios", "Zod", "TypeScript Types"],
  DevOps: ["Bun", "Vite", "Git", "GitHub", "Docker", "Cloudinary", "Postman"],
  "UI / Animation": [
    "Glassmorphism",
    "ScrollTrigger",
    "Smooth Scrolling",
    "GSAP Timelines",
    "Motion Design",
    "Interactive Interfaces",
  ],
  Architecture: [
    "MERN Stack",
    "Scalable SPAs",
    "Dashboard Systems",
    "ERP Systems",
    "Admin Panels",
    "Reusable Components",
  ],
  "Other Areas": [
    "Cybersecurity Fundamentals",
    "AI-Based Applications",
    "Performance Optimization",
    "Version Control",
  ],
};

export const proficiency = [
  { name: "React / Next.js / TypeScript", value: 93 },
  { name: "Node.js / Hono / Express", value: 88 },
  { name: "PostgreSQL / Prisma ORM", value: 86 },
  { name: "GSAP / Motion / Lenis", value: 84 },
  { name: "MongoDB / Mongoose", value: 80 },
  { name: "TanStack Query / Zod", value: 82 },
  { name: "Docker / DevOps", value: 65 },
];

export const journey = [
  {
    year: "2021",
    title: "Started B.Tech — AI & Data Science",
    org: "SNS College of Engineering, Coimbatore",
    text: "Began exploring AI, ML, and the math behind intelligent systems. GPA 8.25/10.",
    tag: "EDU",
  },
  {
    year: "Dec 2022",
    title: "Freelance Full Stack Developer",
    org: "Self-employed",
    text: "Started shipping production MERN / TypeScript apps for clients — scalable reusable frontends, animated dashboards, portfolio systems, and full project lifecycle ownership.",
    tag: "WORK",
  },
  {
    year: "Mar 2023",
    title: "Web Developer — Freelancers' League",
    org: "Team-led delivery",
    text: "Led frontend + backend on multiple client projects in React.js / Node.js. Improved engagement through optimized UI/UX and performance.",
    tag: "WORK",
  },
  {
    year: "Sep 2024",
    title: ".NET Developer Intern — Wise Work",
    org: "Blazor / ASP.NET / MudBlazor",
    text: "Built Web APIs and component-driven UI. Wrote tests with xUnit, bUnit, and Playwright in an agile squad.",
    tag: "WORK",
  },
  {
    year: "May 2025",
    title: "Full Stack Developer — RDX Digital Technologies",
    org: "React · Node · PostgreSQL · Prisma · TypeScript",
    text: "Building scalable full stack apps, admin dashboards, quotation management, and business workflow systems. Owning Shopify customisations and enterprise apps (ISEW, Rajdeep quotation software). Shipping reusable component architecture and API/auth integrations in real-world production.",
    tag: "NOW",
  },
];

export type Project = {
  title: string;
  blurb: string;
  stack: string[];
  tag: string;
  accent: "green" | "cyan" | "purple";
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    title: "ISEW Enterprise Application",
    blurb:
      "Enterprise app suite at RDX — admin dashboards, business workflows, and quotation management built on a modern TS stack.",
    stack: ["React", "TypeScript", "Node", "PostgreSQL", "Prisma"],
    tag: "Enterprise / ERP",
    accent: "purple",
  },
  {
    title: "Rajdeep Quotation Software",
    blurb:
      "Quotation lifecycle platform — line items, approvals, PDF export, and role-based dashboards for sales ops.",
    stack: ["Next.js", "Prisma", "PostgreSQL", "TanStack Query"],
    tag: "SaaS / Internal Tools",
    accent: "cyan",
  },
  {
    title: "ERP Mechanical Management",
    blurb:
      "Full ERP for mechanical workshops — orders, inventory, billing, RBAC, and PDF exports.",
    stack: ["Next.js", "Prisma", "PostgreSQL", "TypeScript"],
    tag: "Enterprise / ERP",
    accent: "green",
  },
  {
    title: "Guest Room Booking System",
    blurb:
      "End-to-end room reservation platform with auth, calendar availability, payments, and admin dashboard.",
    stack: ["React", "Node", "Express", "MongoDB", "Tailwind"],
    tag: "SaaS / Booking",
    accent: "green",
  },
  {
    title: "GSUN Marine Service Portal",
    blurb:
      "Marine ship service website with admin dashboard, Cloudinary uploads via Multer, and EmailJS integration.",
    stack: ["MERN", "Cloudinary", "EmailJS"],
    tag: "Portfolio / Admin",
    accent: "cyan",
  },
  {
    title: "Nutrition & Fitness Recommender",
    blurb:
      "AI app that computes BMI / body-fat and recommends cost-estimated meals with images via Gemini + DuckDuckGo automation.",
    stack: ["React", "Gemini API", "Node", "Automation"],
    tag: "AI / Health",
    accent: "purple",
  },
  {
    title: "Shopify Customisations Suite",
    blurb:
      "Storefront customisations, integrations, and management workflows for production e-commerce clients.",
    stack: ["Shopify", "Liquid", "Node", "REST"],
    tag: "E-Commerce",
    accent: "cyan",
  },
  {
    title: "Animated Portfolio Systems",
    blurb:
      "Premium animated portfolios and landing pages using GSAP timelines, Lenis smooth scroll, and Motion micro-interactions.",
    stack: ["React", "GSAP", "Motion", "Tailwind"],
    tag: "UI / Animation",
    accent: "green",
  },
];

export const socials = [
  { name: "GitHub", href: "https://github.com/", key: "github" },
  { name: "LinkedIn", href: "https://linkedin.com/", key: "linkedin" },
  { name: "Email", href: "mailto:manikandansns05@gmail.com", key: "mail" },
  { name: "Phone", href: "tel:+917010534355", key: "phone" },
];
