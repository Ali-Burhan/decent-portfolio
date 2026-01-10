import React from "react";

interface LoadingSkeletonProps {
  className?: string;
  variant?: "card" | "text" | "circle" | "rectangle";
}

export function LoadingSkeleton({ 
  className = "", 
  variant = "rectangle" 
}: LoadingSkeletonProps) {
  const baseClasses = "animate-pulse bg-foreground/10";
  
  const variantClasses = {
    card: "rounded-2xl h-64",
    text: "rounded h-4",
    circle: "rounded-full aspect-square",
    rectangle: "rounded-lg h-32",
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label="Loading..."
    />
  );
}

// Project Card Skeleton
export function ProjectCardSkeleton() {
  return (
    <div className="rounded-2xl border border-foreground/10 p-6 space-y-4">
      <LoadingSkeleton variant="text" className="w-3/4" />
      <LoadingSkeleton variant="text" className="w-full" />
      <LoadingSkeleton variant="text" className="w-full" />
      <div className="flex gap-2 pt-4">
        <LoadingSkeleton variant="text" className="w-16 h-6" />
        <LoadingSkeleton variant="text" className="w-16 h-6" />
        <LoadingSkeleton variant="text" className="w-16 h-6" />
      </div>
    </div>
  );
}

// Contact Form Skeleton
export function ContactFormSkeleton() {
  return (
    <div className="rounded-2xl border border-foreground/10 p-8 space-y-6">
      <LoadingSkeleton variant="text" className="w-1/2 h-6" />
      <LoadingSkeleton variant="rectangle" className="h-12" />
      <LoadingSkeleton variant="rectangle" className="h-12" />
      <LoadingSkeleton variant="rectangle" className="h-32" />
      <LoadingSkeleton variant="rectangle" className="h-12 w-32" />
    </div>
  );
}
