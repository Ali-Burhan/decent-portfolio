export interface ProjectMedia {
  cover: string;
  gallery: string[];
  video?: string;
  alt: string;
}

/** Screenshots & video under /public/projects/{slug}/ */
export const PROJECT_MEDIA: Record<string, ProjectMedia> = {
  "forwood-safety": {
    cover: "/projects/forwood/forwood.png",
    gallery: [
      "/projects/forwood/forwood.png",
      "/projects/forwood/forwood1.png",
      "/projects/forwood/forwood2.png",
    ],
    alt: "Forwood Safety — enterprise safety platform UI",
  },
  lumaya: {
    cover: "/projects/lumaya/lumaya.png",
    gallery: [
      "/projects/lumaya/lumaya.png",
      "/projects/lumaya/lumaya1.png",
      "/projects/lumaya/lumaya2.png",
      "/projects/lumaya/lumaya3.png",
      "/projects/lumaya/lumaya4.png",
      "/projects/lumaya/lumaya5.png",
    ],
    alt: "Lumaya — business marketplace screenshots",
  },
  cazvid: {
    cover: "/projects/cazvid/cazvid.png",
    gallery: [
      "/projects/cazvid/cazvid.png",
      "/projects/cazvid/cazvid1.png",
      "/projects/cazvid/cazvid2.png",
      "/projects/cazvid/cazvid3.png",
      "/projects/cazvid/cazvid4.png",
      "/projects/cazvid/cazvid5.png",
      "/projects/cazvid/cazvid6.png",
      "/projects/cazvid/cazvid7.png",
    ],
    alt: "CazVid — AI job board and recruiter dashboard",
  },
  "teachtrack-ai": {
    cover: "/projects/teachtrack/teachtrack.png",
    gallery: ["/projects/teachtrack/teachtrack.png"],
    video: "/projects/teachtrack/teachtrackvideo.mp4",
    alt: "TeachTrack AI — assessment and grading platform",
  },
};

export function getProjectMedia(slug?: string | null): ProjectMedia | null {
  if (!slug) return null;
  return PROJECT_MEDIA[slug] ?? null;
}
