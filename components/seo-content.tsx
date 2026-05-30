import portfolioData from "@/data/portfolio.json";
import { RESUME_PATH, SITE_URL } from "@/lib/site";
import { CASE_STUDY_SLUGS } from "@/lib/projects";

/**
 * Server-rendered, visually hidden content for crawlers and assistive tech
 * on the JS-heavy OS homepage.
 */
export function SeoContent() {
  const { personalInfo, socialLinks, highlights } = portfolioData;
  const experience = portfolioData.experience ?? [];
  const freelance = portfolioData.freelanceProjects ?? [];

  const workProjects = experience.flatMap((job) =>
    (job.projects ?? []).map((p) => ({
      name: p.name,
      description: p.description,
      slug: "slug" in p ? (p as { slug?: string }).slug : undefined,
    }))
  );

  return (
    <article className="sr-only" aria-label="Portfolio overview">
      <h1>
        {personalInfo.name} — {personalInfo.role}
      </h1>
      <p>{personalInfo.description}</p>
      <p>
        Based in {personalInfo.location}. {personalInfo.availability}. Contact:{" "}
        <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>,{" "}
        <a href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}>{personalInfo.phone}</a>.
      </p>
      <p>
        {highlights.yearsExperience} years experience · {highlights.projectsCompleted}{" "}
        projects · {highlights.technologies} technologies · {highlights.sites} sites served ·{" "}
        {highlights.infraCostReduction} infrastructure cost reduction on flagship platform work.
      </p>
      <nav aria-label="Site sections">
        <ul>
          <li>
            <a href={`${SITE_URL}/about`}>About</a>
          </li>
          <li>
            <a href={`${SITE_URL}/experience`}>Experience</a>
          </li>
          <li>
            <a href={`${SITE_URL}/projects`}>Projects</a>
          </li>
          {CASE_STUDY_SLUGS.map((slug) => (
            <li key={slug}>
              <a href={`${SITE_URL}/projects/${slug}`}>
                Case study: {slug.replace(/-/g, " ")}
              </a>
            </li>
          ))}
          <li>
            <a href={`${SITE_URL}/contact`}>Contact</a>
          </li>
          <li>
            <a href={`${SITE_URL}/now`}>Now</a>
          </li>
          <li>
            <a href={RESUME_PATH} download>
              Download resume (PDF)
            </a>
          </li>
        </ul>
      </nav>
      <section>
        <h2>Experience</h2>
        {experience.map((job) => (
          <div key={`${job.company}-${job.position}`}>
            <h3>
              {job.position} at {job.company}
            </h3>
            <p>
              {job.duration} · {job.location}
            </p>
            {(job.projects ?? []).map((p) => (
              <div key={p.name}>
                <h4>{p.name}</h4>
                <p>{p.description}</p>
              </div>
            ))}
          </div>
        ))}
      </section>
      <section>
        <h2>Projects</h2>
        {workProjects.map((p) => (
          <div key={p.name}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            {p.slug && (
              <p>
                <a href={`${SITE_URL}/projects/${p.slug}`}>Read case study</a>
              </p>
            )}
          </div>
        ))}
        {freelance.map((p) => (
          <div key={p.name}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            {"slug" in p && (p as { slug?: string }).slug && (
              <p>
                <a href={`${SITE_URL}/projects/${(p as { slug: string }).slug}`}>
                  Read case study
                </a>
              </p>
            )}
          </div>
        ))}
      </section>
      <p>
        <a href={socialLinks.github}>GitHub</a> ·{" "}
        <a href={socialLinks.linkedin}>LinkedIn</a>
      </p>
    </article>
  );
}
