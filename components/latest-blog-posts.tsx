"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Loader2, AlertCircle } from "lucide-react";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  readingTime?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  coverImage?: string;
  tags?: string[];
  featured?: boolean;
}

interface LatestBlogPostsProps {
  cmsEndpoint?: string;
  limit?: number;
  className?: string;
  onPostClick?: (post: BlogPost) => void;
}

export function LatestBlogPosts({
  cmsEndpoint = "/api/blog/posts",
  limit = 3,
  className = "",
  onPostClick,
}: LatestBlogPostsProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, [cmsEndpoint, limit]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${cmsEndpoint}?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }

      const data = await response.json();
      setPosts(data.posts || data); // Handle different response formats
    } catch (err) {
      console.error("Error fetching blog posts:", err);
      setError(err instanceof Error ? err.message : "Failed to load blog posts");
      
      // Fallback to mock data for demo purposes
      setPosts(getMockPosts());
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const handlePostClick = (post: BlogPost) => {
    if (onPostClick) {
      onPostClick(post);
    } else {
      // Default behavior: navigate to blog post
      window.location.href = `/blog/${post.slug}`;
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
          <span className="ml-3 text-foreground/60">Loading latest posts...</span>
        </div>
      </div>
    );
  }

  // Error State
  if (error && posts.length === 0) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <p className="text-foreground/80 mb-2">Failed to load blog posts</p>
          <p className="text-sm text-foreground/60 mb-4">{error}</p>
          <button
            onClick={fetchPosts}
            className="px-4 py-2 bg-accent text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty State
  if (posts.length === 0) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center py-12 text-foreground/60">
          No blog posts available yet. Check back soon!
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Latest Blog Posts</h2>
          <p className="text-foreground/60">Insights, tutorials, and thoughts on development</p>
        </div>
        <a
          href="/blog"
          className="hidden md:flex items-center gap-2 text-accent hover:underline font-semibold group"
        >
          View All
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-foreground/[0.02] overflow-hidden hover:border-accent/30 transition-all duration-300 cursor-pointer"
            onClick={() => handlePostClick(post)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handlePostClick(post);
              }
            }}
            aria-label={`Read article: ${post.title}`}
          >
            {/* Featured Badge */}
            {post.featured && (
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">
                  Featured
                </span>
              </div>
            )}

            {/* Cover Image */}
            {post.coverImage && (
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-accent/10 to-accent/5">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Meta Info */}
              <div className="flex items-center gap-4 text-xs text-foreground/60">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </div>
                {post.readingTime && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readingTime}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-foreground/70 text-sm leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Read More Link */}
              <div className="flex items-center gap-2 text-accent font-semibold text-sm pt-2">
                Read More
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.article>
        ))}
      </div>

      {/* View All Link (Mobile) */}
      <div className="md:hidden text-center pt-4">
        <a
          href="/blog"
          className="inline-flex items-center gap-2 text-accent hover:underline font-semibold group"
        >
          View All Posts
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}

// Mock data for demo/fallback
function getMockPosts(): BlogPost[] {
  return [
    {
      id: "1",
      title: "Building Scalable Microservices with Next.js and AWS",
      excerpt: "Learn how to architect and deploy production-ready microservices using Next.js, AWS Lambda, and serverless technologies.",
      slug: "building-scalable-microservices-nextjs-aws",
      publishedAt: "2025-12-10",
      readingTime: "8 min read",
      coverImage: "/blog/microservices.jpg",
      tags: ["Next.js", "AWS", "Microservices"],
      featured: true,
    },
    {
      id: "2",
      title: "AI-Powered Applications with LangChain and Python",
      excerpt: "Explore how to build intelligent applications using LangChain, OpenAI, and Python for real-world use cases.",
      slug: "ai-powered-applications-langchain-python",
      publishedAt: "2025-12-05",
      readingTime: "12 min read",
      coverImage: "/blog/ai-langchain.jpg",
      tags: ["AI", "LangChain", "Python"],
    },
    {
      id: "3",
      title: "Optimizing React Performance: Tips and Tricks",
      excerpt: "Discover advanced techniques to optimize your React applications for better performance and user experience.",
      slug: "optimizing-react-performance",
      publishedAt: "2025-11-28",
      readingTime: "6 min read",
      coverImage: "/blog/react-performance.jpg",
      tags: ["React", "Performance", "Optimization"],
    },
  ];
}
