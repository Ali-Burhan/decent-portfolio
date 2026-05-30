# Portfolio Components Usage Guide

## 📦 Components Created

All components are fully typed with TypeScript, use Tailwind CSS for styling, Framer Motion for animations, and follow WCAG 2.1 AA accessibility standards.

---

## 1. SkillsGrid Component

**File:** `components/skills-grid.tsx`

### Features

- ✅ Categorized skill display
- ✅ Animated proficiency bars (beginner/intermediate/expert)
- ✅ Shimmer effects on bars
- ✅ Responsive grid layout
- ✅ Hover tooltips
- ✅ ARIA labels for screen readers

### Usage

```tsx
import { SkillsGrid, type Skill } from "@/components/skills-grid";

const skills: Skill[] = [
  {
    name: "Next.js",
    category: "Frontend",
    proficiency: "expert",
    icon: "⚛️",
  },
  {
    name: "Python",
    category: "Backend",
    proficiency: "expert",
    icon: "🐍",
  },
  {
    name: "AWS Lambda",
    category: "Cloud & DevOps",
    proficiency: "intermediate",
    icon: "☁️",
  },
  {
    name: "LangChain",
    category: "AI & ML",
    proficiency: "expert",
    icon: "🤖",
  },
];

export default function SkillsPage() {
  return (
    <div className="container mx-auto py-12">
      <SkillsGrid skills={skills} />
    </div>
  );
}
```

### Props

| Prop        | Type      | Default  | Description            |
| ----------- | --------- | -------- | ---------------------- |
| `skills`    | `Skill[]` | Required | Array of skill objects |
| `className` | `string`  | `""`     | Additional CSS classes |

### Skill Interface

```typescript
interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Cloud & DevOps" | "AI & ML" | "Tools";
  proficiency: "beginner" | "intermediate" | "expert";
  icon?: string; // Emoji or icon
}
```

---

## 2. TestimonialsCarousel Component

**File:** `components/testimonials-carousel.tsx`

### Features

- ✅ Auto-play with configurable interval
- ✅ Smooth slide animations
- ✅ Keyboard navigation (arrow keys)
- ✅ Dot indicators
- ✅ Rating stars
- ✅ Avatar support
- ✅ Responsive design

### Usage

```tsx
import {
  TestimonialsCarousel,
  type Testimonial,
} from "@/components/testimonials-carousel";

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "John Doe",
    role: "CTO",
    company: "Tech Corp",
    image: "/testimonials/john.jpg",
    content:
      "Ali delivered an exceptional AI-powered platform that transformed our business operations.",
    rating: 5,
    date: "December 2025",
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Product Manager",
    company: "StartupXYZ",
    content:
      "Outstanding work on our microservices architecture. Highly recommend!",
    rating: 5,
    date: "November 2025",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-center mb-12">What Clients Say</h2>
      <TestimonialsCarousel
        testimonials={testimonials}
        autoPlay={true}
        autoPlayInterval={5000}
      />
    </section>
  );
}
```

### Props

| Prop               | Type            | Default  | Description                  |
| ------------------ | --------------- | -------- | ---------------------------- |
| `testimonials`     | `Testimonial[]` | Required | Array of testimonial objects |
| `autoPlay`         | `boolean`       | `true`   | Enable auto-play             |
| `autoPlayInterval` | `number`        | `5000`   | Auto-play interval in ms     |
| `className`        | `string`        | `""`     | Additional CSS classes       |

---

## 3. CaseStudyModal Component

**File:** `components/case-study-modal.tsx`

### Features

- ✅ Full-screen overlay modal
- ✅ ESC key to close
- ✅ Body scroll lock when open
- ✅ Image gallery
- ✅ Project metadata (duration, role, team)
- ✅ Technology tags
- ✅ Live/GitHub links
- ✅ Focus trap for accessibility

### Usage

```tsx
"use client";

import { useState } from "react";
import { CaseStudyModal, type CaseStudy } from "@/components/case-study-modal";

const caseStudy: CaseStudy = {
  id: "1",
  title: "AI-Powered Educational Platform",
  description: "Built an AI platform serving 1000+ sites",
  longDescription:
    "Comprehensive AI-powered educational platform with LangChain integration...",
  images: ["/projects/edu-1.jpg", "/projects/edu-2.jpg"],
  technologies: ["Next.js", "Python", "LangChain", "AWS Lambda"],
  role: "Lead Full Stack Developer",
  duration: "6 months",
  team: "4 developers",
  achievements: [
    "Reduced teacher workload by 70%",
    "Automated 500+ assessments monthly",
    "Deployed across 60+ countries",
  ],
  liveUrl: "https://example.com",
  githubUrl: "https://github.com/user/repo",
  category: "AI & Education",
};

export default function ProjectsPage() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (caseStudy: CaseStudy) => {
    setSelectedCase(caseStudy);
    setIsModalOpen(true);
  };

  return (
    <>
      <button onClick={() => openModal(caseStudy)}>View Case Study</button>

      <CaseStudyModal
        caseStudy={selectedCase}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
```

### Props

| Prop        | Type                | Default  | Description      |
| ----------- | ------------------- | -------- | ---------------- |
| `caseStudy` | `CaseStudy \| null` | Required | Case study data  |
| `isOpen`    | `boolean`           | Required | Modal open state |
| `onClose`   | `() => void`        | Required | Close handler    |

---

## 4. DownloadResumeButton Component

**File:** `components/download-resume-button.tsx`

### Features

- ✅ Loading state with spinner
- ✅ Success feedback
- ✅ Error handling
- ✅ Multiple variants (primary, secondary, outline)
- ✅ Multiple sizes (sm, md, lg)
- ✅ Floating Action Button (FAB) variant
- ✅ Keyboard accessible

### Usage

```tsx
import {
  DownloadResumeButton,
  DownloadResumeFAB,
} from "@/components/download-resume-button";

// Standard Button
export default function Header() {
  return (
    <DownloadResumeButton
      resumeUrl="/Ali_Burhan_Resume.pdf"
      fileName="Ali_Burhan_Resume.pdf"
      variant="primary"
      size="md"
      onDownloadStart={() => console.log("Download started")}
      onDownloadComplete={() => console.log("Download complete")}
      onDownloadError={(error) => console.error(error)}
    />
  );
}

// Floating Action Button
export default function Layout({ children }) {
  return (
    <>
      {children}
      <DownloadResumeFAB
        resumeUrl="/resume.pdf"
        fileName="Ali_Burhan_Resume.pdf"
        position="bottom-right"
      />
    </>
  );
}
```

### Props (DownloadResumeButton)

| Prop                 | Type                                    | Default                   | Description                |
| -------------------- | --------------------------------------- | ------------------------- | -------------------------- |
| `resumeUrl`          | `string`                                | `"/resume.pdf"`           | Resume file URL            |
| `fileName`           | `string`                                | `"Ali_Burhan_Resume.pdf"` | Download filename          |
| `variant`            | `"primary" \| "secondary" \| "outline"` | `"primary"`               | Button style               |
| `size`               | `"sm" \| "md" \| "lg"`                  | `"md"`                    | Button size                |
| `className`          | `string`                                | `""`                      | Additional CSS classes     |
| `onDownloadStart`    | `() => void`                            | -                         | Download start callback    |
| `onDownloadComplete` | `() => void`                            | -                         | Download complete callback |
| `onDownloadError`    | `(error: Error) => void`                | -                         | Error callback             |

---

## 5. LatestBlogPosts Component

**File:** `components/latest-blog-posts.tsx`

### Features

- ✅ CMS integration with fetch API
- ✅ Loading skeleton
- ✅ Error handling with retry
- ✅ Fallback mock data
- ✅ Featured posts badge
- ✅ Reading time display
- ✅ Tag support
- ✅ Responsive grid
- ✅ Keyboard navigation

### Usage

```tsx
import { LatestBlogPosts, type BlogPost } from "@/components/latest-blog-posts";

// With CMS integration
export default function BlogSection() {
  return (
    <section className="py-20">
      <LatestBlogPosts
        cmsEndpoint="/api/blog/posts"
        limit={3}
        onPostClick={(post) => {
          // Custom navigation
          window.location.href = `/blog/${post.slug}`;
        }}
      />
    </section>
  );
}

// Create API route: app/api/blog/posts/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "3");

  // Fetch from your CMS (Contentful, Sanity, etc.)
  const posts = await fetchFromCMS(limit);

  return Response.json({ posts });
}
```

### Props

| Prop          | Type                       | Default             | Description              |
| ------------- | -------------------------- | ------------------- | ------------------------ |
| `cmsEndpoint` | `string`                   | `"/api/blog/posts"` | API endpoint             |
| `limit`       | `number`                   | `3`                 | Number of posts to fetch |
| `className`   | `string`                   | `""`                | Additional CSS classes   |
| `onPostClick` | `(post: BlogPost) => void` | -                   | Custom click handler     |

### BlogPost Interface

```typescript
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string; // ISO date string
  readingTime?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  coverImage?: string;
  tags?: string[];
  featured?: boolean;
}
```

---

## 🎨 Styling & Customization

All components use Tailwind CSS and respect your theme configuration:

```tsx
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
        foreground: "var(--foreground)",
        background: "var(--background)",
      },
    },
  },
};
```

---

## ♿ Accessibility Features

All components follow WCAG 2.1 AA standards:

- ✅ **Keyboard Navigation**: All interactive elements are keyboard accessible
- ✅ **ARIA Labels**: Proper labels for screen readers
- ✅ **Focus Management**: Visible focus indicators
- ✅ **Semantic HTML**: Proper heading hierarchy and landmarks
- ✅ **Color Contrast**: Meets AA contrast ratios
- ✅ **Screen Reader Support**: Descriptive labels and live regions

---

## 🚀 Performance Optimizations

- ✅ **Lazy Loading**: Images load on demand
- ✅ **Code Splitting**: Components are client-side only when needed
- ✅ **Optimized Animations**: GPU-accelerated transforms
- ✅ **Debounced Events**: Throttled scroll and resize handlers
- ✅ **Memoization**: React.memo for expensive renders

---

## 📱 Responsive Design

All components are fully responsive:

- **Mobile**: Stacked layouts, touch-friendly targets
- **Tablet**: 2-column grids where appropriate
- **Desktop**: Full grid layouts with hover effects

---

## 🧪 Testing

Example test for SkillsGrid:

```tsx
import { render, screen } from "@testing-library/react";
import { SkillsGrid } from "@/components/skills-grid";

describe("SkillsGrid", () => {
  const mockSkills = [
    { name: "Next.js", category: "Frontend", proficiency: "expert" },
  ];

  it("renders skills correctly", () => {
    render(<SkillsGrid skills={mockSkills} />);
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });

  it("displays proficiency bars", () => {
    render(<SkillsGrid skills={mockSkills} />);
    expect(screen.getByLabelText(/95% proficiency/i)).toBeInTheDocument();
  });
});
```

---

## 📦 Installation Requirements

Make sure you have these dependencies:

```bash
npm install framer-motion lucide-react
```

```json
// package.json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.300.0",
    "next": "^14.0.0",
    "react": "^18.0.0",
    "tailwindcss": "^3.4.0"
  }
}
```

---

## 🎯 Integration Example

Complete page using all components:

```tsx
"use client";

import { SkillsGrid } from "@/components/skills-grid";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { LatestBlogPosts } from "@/components/latest-blog-posts";
import { DownloadResumeFAB } from "@/components/download-resume-button";
import portfolioData from "@/data/portfolio.json";

export default function HomePage() {
  return (
    <main>
      {/* Skills Section */}
      <section className="py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Skills & Expertise
        </h2>
        <SkillsGrid skills={portfolioData.skills} />
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-foreground/5">
        <h2 className="text-4xl font-bold text-center mb-12">
          Client Testimonials
        </h2>
        <TestimonialsCarousel testimonials={testimonials} />
      </section>

      {/* Blog Section */}
      <section className="py-20">
        <LatestBlogPosts cmsEndpoint="/api/blog/posts" limit={3} />
      </section>

      {/* Floating Resume Download */}
      <DownloadResumeFAB position="bottom-right" />
    </main>
  );
}
```

---

## 🎉 Summary

You now have 5 production-ready components:

1. **SkillsGrid** - Showcase technical skills with animated proficiency bars
2. **TestimonialsCarousel** - Display client feedback with smooth animations
3. **CaseStudyModal** - Present detailed project case studies
4. **DownloadResumeButton** - Professional resume download with loading states
5. **LatestBlogPosts** - Fetch and display blog posts from any CMS

All components are:

- ✅ Fully typed with TypeScript
- ✅ Styled with Tailwind CSS
- ✅ Animated with Framer Motion
- ✅ Accessible (WCAG 2.1 AA)
- ✅ Responsive
- ✅ Production-ready
