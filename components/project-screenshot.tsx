import { cn } from "@/lib/utils";

interface ProjectScreenshotProps {
  src: string;
  alt: string;
  className?: string;
  /** When true, fills a `relative` parent (parent must have min-height or aspect ratio). */
  fill?: boolean;
  priority?: boolean;
}

/**
 * Plain <img> for /public/projects/* — avoids next/image fill + aspect-ratio bugs
 * that show empty bordered boxes on case study pages.
 */
export function ProjectScreenshot({
  src,
  alt,
  className,
  fill,
  priority,
}: ProjectScreenshotProps) {
  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        className={cn(
          "absolute inset-0 h-full w-full object-cover object-top",
          className
        )}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      className={cn("block h-auto w-full object-cover object-top", className)}
    />
  );
}
