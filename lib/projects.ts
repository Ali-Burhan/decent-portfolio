import portfolioData from "@/data/portfolio.json";

export type DiagramType =
  | "serverless"
  | "marketplace"
  | "ai-education"
  | "frontend-platform";

export interface PortfolioProject {
  name: string;
  slug: string;
  description: string;
  achievements: string[];
  technologies: string[];
  url?: string | null;
  duration?: string;
  company?: string;
  type: "Work" | "Freelance";
  tagline: string;
  diagramType: DiagramType;
  myRole: string;
  problem: string;
  overview: string;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const CASE_STUDY_META: Record<
  string,
  Omit<
    PortfolioProject,
    | "name"
    | "description"
    | "achievements"
    | "technologies"
    | "url"
    | "duration"
    | "company"
    | "type"
  >
> = {
  "forwood-safety": {
    slug: "forwood-safety",
    tagline: "Python serverless safety platform at 1,000+ global sites",
    diagramType: "serverless",
    myRole:
      "Software engineer on the platform team — backend architecture, Terraform automation, E2E testing, and release management.",
    problem:
      "Industrial safety operations needed reliable microservices at scale across thousands of sites, with controlled release cadence and lower cloud spend.",
    overview:
      "Forwood Safety is a microservices safety platform deployed globally. I contributed to Python serverless services on AWS, infrastructure automation, and quality gates that keep releases predictable across dev, staging, and production.",
  },
  lumaya: {
    slug: "lumaya",
    tagline: "Sole-developer marketplace from requirements to production",
    diagramType: "marketplace",
    myRole:
      "Sole full-stack developer — architecture, implementation, KYC integration, real-time chat, and production operations on AWS Lightsail.",
    problem:
      "A business marketplace needed verified sellers, real-time buyer–seller communication, and a production-ready stack delivered in a fixed timeline.",
    overview:
      "Lumaya is a full-stack business marketplace (lumaya.ch) I delivered end-to-end in four months: listings, Veriff KYC, WebSocket chat, and a hardened PostgreSQL deployment on AWS Lightsail.",
  },
  cazvid: {
    slug: "cazvid",
    tagline: "AI job board UI and recruiter workflows at global scale",
    diagramType: "frontend-platform",
    myRole:
      "Frontend engineer — component library, API integration with NestJS/MongoDB services, and performance optimization for recruiter dashboards.",
    problem:
      "An AI-driven job platform needed fast, multilingual UI and recruiter tooling that could handle high posting volume without sacrificing Core Web Vitals.",
    overview:
      "CazVid is an AI-driven job board. I built 25+ frontend components and a Kanban recruiter dashboard, integrating 20+ REST APIs while improving load performance through code splitting and lazy loading.",
  },
  "teachtrack-ai": {
    slug: "teachtrack-ai",
    tagline: "LangChain RAG platform for automated assessments",
    diagramType: "ai-education",
    myRole:
      "Sole builder — GPT-4 test generation, automated grading, and curriculum-grounded RAG over school materials.",
    problem:
      "Teachers spent hours creating and grading assessments manually across multiple schools, with inconsistent turnaround for students.",
    overview:
      "TeachTrack AI automates test creation and grading for schools using GPT-4, custom prompt templates, and LangChain RAG over curriculum documents — serving 1,200+ students and 45+ teachers across three schools.",
  },
};

function enrichProject(
  raw: {
    name: string;
    description: string;
    achievements?: string[];
    technologies: string[];
    url?: string | null;
    duration?: string;
    slug?: string;
  },
  company: string,
  type: "Work" | "Freelance"
): PortfolioProject | null {
  const slug =
    "slug" in raw && typeof raw.slug === "string" ? raw.slug : slugify(raw.name);
  const meta = CASE_STUDY_META[slug];
  if (!meta) return null;

  return {
    ...meta,
    name: raw.name,
    description: raw.description,
    achievements: raw.achievements ?? [],
    technologies: raw.technologies,
    url: raw.url ?? null,
    duration: raw.duration,
    company,
    type,
    ...meta,
  };
}

export function getAllCaseStudyProjects(): PortfolioProject[] {
  const work = portfolioData.experience.flatMap((exp) =>
    (exp.projects ?? []).map((p) =>
      enrichProject(p, exp.company, "Work")
    )
  );
  const freelance = portfolioData.freelanceProjects
    .filter((p) => p.name === "TeachTrack AI")
    .map((p) => enrichProject(p, "Freelance", "Freelance"));

  return [...work, ...freelance].filter(
    (p): p is PortfolioProject => p !== null
  );
}

export function getCaseStudyBySlug(slug: string): PortfolioProject | undefined {
  return getAllCaseStudyProjects().find((p) => p.slug === slug);
}

export const CASE_STUDY_SLUGS = getAllCaseStudyProjects().map((p) => p.slug);
