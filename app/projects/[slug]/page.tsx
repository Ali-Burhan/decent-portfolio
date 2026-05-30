import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/case-study/case-study-page";
import {
  CASE_STUDY_SLUGS,
  getCaseStudyBySlug,
} from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);
  if (!project) return { title: "Project not found" };

  const title = `${project.name} Case Study`;
  const description = project.tagline;
  const url = `${SITE_URL}/projects/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.name} | Ali Burhan`,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Ali Burhan`,
      description,
    },
  };
}

export default async function ProjectCaseStudyRoute({ params }: PageProps) {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);
  if (!project) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `${SITE_URL}/projects/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CaseStudyPage project={project} />
    </>
  );
}
