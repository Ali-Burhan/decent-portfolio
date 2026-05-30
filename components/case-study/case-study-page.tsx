import Link from "next/link";
import { Nav } from "@/components/nav";
import { SiteFooter } from "@/components/site-footer";
import { ArchitectureDiagram } from "@/components/case-study/architecture-diagram";
import { ProjectMediaGallery } from "@/components/case-study/project-media-gallery";
import type { PortfolioProject } from "@/lib/projects";
import { getProjectMedia } from "@/lib/project-media";
import { SITE_URL, RESUME_PATH } from "@/lib/site";
import portfolioData from "@/data/portfolio.json";

interface CaseStudyPageProps {
  project: PortfolioProject;
}

export function CaseStudyPage({ project }: CaseStudyPageProps) {
  const { personalInfo, socialLinks } = portfolioData;
  const caseStudyUrl = `${SITE_URL}/projects/${project.slug}`;
  const media = getProjectMedia(project.slug);

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.overview,
    url: project.url ?? caseStudyUrl,
    author: {
      "@type": "Person",
      name: personalInfo.name,
      url: SITE_URL,
      sameAs: [socialLinks.github, socialLinks.linkedin],
    },
    keywords: project.technologies.join(", "),
    ...(project.url ? { sameAs: project.url } : {}),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />
      <Nav />
      <main className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        <nav className="text-sm text-foreground/50 mb-8" aria-label="Breadcrumb">
          <Link href="/projects" className="hover:text-accent transition-colors">
            Projects
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground/80">{project.name}</span>
        </nav>

        <header className="mb-10">
          <p className="text-accent font-mono text-sm mb-2">{project.company} · {project.type}</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{project.name}</h1>
          <p className="text-lg text-foreground/70">{project.tagline}</p>
          {project.duration && (
            <p className="text-sm text-foreground/50 mt-2">{project.duration}</p>
          )}
        </header>

        {media && (
          <figure className="mb-10 overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 shadow-lg shadow-accent/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={media.cover}
              alt={media.alt}
              loading="eager"
              decoding="async"
              className="block w-full h-auto"
            />
          </figure>
        )}

        <section className="prose prose-invert max-w-none mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-3">Overview</h2>
          <p className="text-foreground/75 leading-relaxed">{project.overview}</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-3">Problem</h2>
          <p className="text-foreground/75 leading-relaxed">{project.problem}</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-3">My role</h2>
          <p className="text-foreground/75 leading-relaxed">{project.myRole}</p>
        </section>

        {media && <ProjectMediaGallery media={media} projectName={project.name} />}

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-sm font-medium bg-foreground/5 border border-foreground/10 text-foreground/80"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">Architecture</h2>
          <ArchitectureDiagram type={project.diagramType} />
          {project.slug === "teachtrack-ai" && (
            <p className="text-xs text-foreground/50 mt-3 italic">
              Representative flow — illustrative diagram; no public production URL.
            </p>
          )}
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4">Outcomes</h2>
          <ul className="space-y-3">
            {project.achievements.map((item) => (
              <li key={item} className="flex gap-3 text-foreground/75 text-sm leading-relaxed">
                <span className="text-accent mt-1 shrink-0" aria-hidden>
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12 p-6 rounded-xl border border-foreground/10 bg-foreground/[0.02]">
          <h2 className="text-lg font-semibold text-foreground mb-4">Links</h2>
          <div className="flex flex-wrap gap-3">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Live site
              </a>
            )}
            <Link
              href="/contact"
              className="px-4 py-2 rounded-lg border border-foreground/20 text-sm font-medium hover:border-accent/50 transition-colors"
            >
              Contact for demo
            </Link>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg border border-foreground/20 text-sm font-medium hover:border-accent/50 transition-colors"
            >
              GitHub
            </a>
            <a
              href={RESUME_PATH}
              download
              className="px-4 py-2 rounded-lg border border-foreground/20 text-sm font-medium hover:border-accent/50 transition-colors"
            >
              Resume (PDF)
            </a>
          </div>
        </section>

        <section className="border-t border-foreground/10 pt-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">Code & proof</h2>
          <p className="text-sm text-foreground/65 leading-relaxed">
            Open-source work is on{" "}
            <a
              href={socialLinks.github}
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/Ali-Burhan
            </a>
            . Pinned repositories should align with the projects listed here — see{" "}
            <code className="text-xs bg-foreground/5 px-1 py-0.5 rounded">GITHUB_PINS.md</code> in
            the repo for suggested pins.
          </p>
        </section>

        <div className="mt-12">
          <Link
            href="/projects"
            className="text-sm text-accent hover:underline font-medium"
          >
            ← All projects
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
