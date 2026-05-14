export const profile = {
  name: "Manikandan B",
  handle: "manikandan.exe",
  roles: [
    "Full Stack Developer",
    "MERN Stack Engineer",
    "Backend Engineer",
    "AI & Data Science Student",
  ],
  tagline:
    "I build scalable web apps, ERP systems, dashboards, and AI tools — with cinematic UI and bulletproof backends.",
  email: "manikandansns05@gmail.com",
  phone: "+91 7010534355",
  location: "Cuddalore, Tamil Nadu",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/",
  resumeUrl: "/MANIKANDAN_FSD_2025_compressed.pdf",
};

export const stats = [
  { label: "Years Coding", value: "3+" },
  { label: "Projects Shipped", value: "20+" },
  { label: "Stacks Mastered", value: "8" },
  { label: "Coffee / day", value: "∞" },
];

export const skills = {
  Frontend: [
    "React.js",
    "Next.js",
    "TypeScript",
    "TailwindCSS",
    "GSAP",
    "Motion",
    "SCSS",
    "HTML5",
  ],
  Backend: [
    "Node.js",
    "Hono",
    "Express.js",
    "REST APIs",
    "Auth Systems",
    "Prisma ORM",
    "ASP.NET",
  ],
  Database: ["PostgreSQL", "MongoDB", "Prisma"],
  DevOps: ["Docker", "Git", "GitHub", "Bun", "Vite"],
  "AI & Tools": [
    "Gemini API",
    "TanStack Query",
    "Axios",
    "Zod",
    "Postman",
    "EmailJS",
  ],
};

export const proficiency = [
  { name: "React / Next.js", value: 92 },
  { name: "Node.js / Express / Hono", value: 88 },
  { name: "TypeScript", value: 86 },
  { name: "PostgreSQL / Prisma", value: 82 },
  { name: "MongoDB / Mongoose", value: 80 },
  { name: "GSAP / Motion", value: 78 },
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
    text: "Started shipping production MERN apps for clients — boosted engagement by 90% with reusable, responsive systems.",
    tag: "WORK",
  },
  {
    year: "Mar 2023",
    title: "Web Developer — Freelancers' League",
    org: "Team-led delivery",
    text: "Led frontend + backend on multiple client projects in React.js / Node.js. Lifted user engagement by 70%.",
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
    year: "2025",
    title: "Full Stack + AI Builder",
    org: "ERP & SaaS systems",
    text: "Shipping ERP, marine service portals, AI nutrition apps, and admin dashboards with the modern JS stack.",
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
    title: "Guest Room Booking System",
    blurb:
      "End-to-end room reservation platform with auth, calendar availability, and admin dashboard.",
    stack: ["React", "Node", "Express", "MongoDB", "Tailwind"],
    tag: "SaaS / Booking",
    accent: "green",
  },
  {
    title: "ERP Mechanical Management",
    blurb:
      "Full ERP for mechanical workshops — orders, inventory, billing, role-based access, and PDF exports.",
    stack: ["Next.js", "Prisma", "PostgreSQL", "TypeScript"],
    tag: "Enterprise / ERP",
    accent: "purple",
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
      "AI app that computes BMI/body-fat and recommends cost-estimated meals with images via Gemini + DuckDuckGo.",
    stack: ["React", "Gemini API", "Node", "Automation"],
    tag: "AI / Health",
    accent: "green",
  },
  {
    title: "Food Ordering Platform",
    blurb:
      "Restaurant ordering app with menu engine, cart, order tracking, and admin order board.",
    stack: ["React", "Express", "MongoDB", "Stripe"],
    tag: "E-Commerce",
    accent: "purple",
  },
  {
    title: "Admin Dashboard System",
    blurb:
      "Modular dashboard kit: analytics widgets, RBAC, audit logs, dark mode, and modern charting.",
    stack: ["Next.js", "TanStack", "Prisma", "Tailwind"],
    tag: "Internal Tools",
    accent: "cyan",
  },
];

export const socials = [
  { name: "GitHub", href: "https://github.com/", key: "github" },
  { name: "LinkedIn", href: "https://linkedin.com/", key: "linkedin" },
  { name: "Email", href: "mailto:manikandansns05@gmail.com", key: "mail" },
  { name: "Phone", href: "tel:+917010534355", key: "phone" },
];
