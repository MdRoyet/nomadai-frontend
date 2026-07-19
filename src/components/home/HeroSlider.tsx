"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Compass, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    tagline: "Powered by Agentic AI",
    title: ["Discover Your Next", "Adventure with AI"],
    desc: "Explore curated destinations, generate custom itineraries, and chat with an AI concierge that books your perfect stay.",
    cta: { label: "Explore Destinations", href: "/explore" },
    bg: "from-primary-50 via-white to-accent-50",
  },
  {
    tagline: "Smart Planning",
    title: ["Plan Trips That", "Match Your Style"],
    desc: "Our AI analyzes your preferences and budget to create personalized itineraries in seconds.",
    cta: { label: "Try AI Assistant", href: "/ai-assistant" },
    bg: "from-secondary-50 via-white to-primary-50",
  },
  {
    tagline: "Document Intelligence",
    title: ["Upload, Analyze", "Travel Stress-Free"],
    desc: "Upload visa PDFs, insurance docs, or booking confirmations — AI extracts key info instantly.",
    cta: { label: "See How It Works", href: "/ai-assistant" },
    bg: "from-accent-50 via-white to-secondary-50",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function HeroSlider() {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback(
    (newDirection: number) => {
      setCurrent(([prev]) => {
        const next = (prev + newDirection + slides.length) % slides.length;
        return [next, newDirection];
      });
    },
    []
  );

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [isPaused, paginate]);

  const slide = slides[current];

  return (
    <section
      className={`relative h-[65vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br ${slide.bg} transition-colors duration-700`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0D9488_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Slide content */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-secondary-100 text-secondary-600 px-4 py-1.5 rounded-full font-medium text-sm mb-6"
          >
            {slide.tagline}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-neutral-900 mb-6 leading-tight"
          >
            {slide.title[0]} <br />{" "}
            <span className="text-primary">{slide.title[1]}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto"
          >
            {slide.desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href={slide.cta.href}
              className="bg-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-700 transition flex items-center justify-center gap-2 shadow-teal"
            >
              {slide.cta.label} <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/ai-assistant"
              className="bg-white border border-neutral-200 text-neutral-900 px-8 py-4 rounded-xl font-semibold text-lg hover:border-primary hover:text-primary transition flex items-center justify-center gap-2"
            >
              <Compass className="w-5 h-5" /> Try AI Assistant
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur p-2 rounded-full shadow-lg hover:bg-white transition"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-neutral-700" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur p-2 rounded-full shadow-lg hover:bg-white transition"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-neutral-700" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent([i, i > current ? 1 : -1])}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current
                ? "bg-primary w-8"
                : "bg-neutral-300 hover:bg-neutral-400"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
