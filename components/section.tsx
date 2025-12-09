import React from "react";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function Section({ children, id, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 sm:px-12 lg:px-24 ${className}`}
    >
      {children}
    </section>
  );
}
