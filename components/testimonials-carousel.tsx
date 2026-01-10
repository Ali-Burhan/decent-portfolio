"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image?: string;
  content: string;
  rating?: number;
  date?: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export function TestimonialsCarousel({
  testimonials,
  autoPlay = true,
  autoPlayInterval = 5000,
  className = "",
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play functionality
  React.useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, autoPlay, autoPlayInterval]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12 text-foreground/60">
        No testimonials available
      </div>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className={`relative ${className}`}>
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-foreground/[0.02] p-8 md:p-12">
        {/* Quote Icon */}
        <div className="absolute top-8 left-8 text-accent/20">
          <Quote className="w-16 h-16" />
        </div>

        {/* Testimonial Content */}
        <div className="relative min-h-[300px] flex items-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="w-full"
            >
              <div className="space-y-6">
                {/* Rating */}
                {currentTestimonial.rating && (
                  <div className="flex gap-1" aria-label={`Rating: ${currentTestimonial.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`w-5 h-5 ${
                          i < currentTestimonial.rating!
                            ? "text-accent fill-accent"
                            : "text-foreground/20 fill-foreground/20"
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>
                )}

                {/* Content */}
                <blockquote className="text-lg md:text-xl text-foreground/90 leading-relaxed italic">
                  "{currentTestimonial.content}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4">
                  {/* Avatar */}
                  <div className="relative">
                    {currentTestimonial.image ? (
                      <img
                        src={currentTestimonial.image}
                        alt={currentTestimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-accent/30"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center">
                        <span className="text-xl font-bold text-accent">
                          {currentTestimonial.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full border-2 border-background flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  {/* Details */}
                  <div>
                    <p className="font-bold text-foreground">{currentTestimonial.name}</p>
                    <p className="text-sm text-foreground/70">
                      {currentTestimonial.role} at {currentTestimonial.company}
                    </p>
                    {currentTestimonial.date && (
                      <p className="text-xs text-foreground/50 mt-1">{currentTestimonial.date}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        {testimonials.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/10 hover:bg-foreground/10 transition-colors group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/10 hover:bg-foreground/10 transition-colors group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-accent"
                  : "w-2 bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-selected={index === currentIndex}
              role="tab"
            />
          ))}
        </div>
      )}

      {/* Counter */}
      <div className="text-center mt-4 text-sm text-foreground/60 font-mono">
        {currentIndex + 1} / {testimonials.length}
      </div>
    </div>
  );
}
