"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Compass,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Globe,
  Shield,
  Zap,
} from "lucide-react";

const slides = [
  {
    tagline: "Powered by Agentic AI",
    title: ["Discover Your Next", "Adventure with AI"],
    desc: "Explore curated destinations, generate custom itineraries, and chat with an AI concierge that books your perfect stay.",
    cta: { label: "Explore Destinations", href: "/explore" },
    image: "https://picsum.photos/seed/nomadai-hero1/1920/1080",
    accent: "from-teal-500/80 to-emerald-600/80",
    badge: "New",
  },
  {
    tagline: "Smart Planning",
    title: ["Plan Trips That", "Match Your Style"],
    desc: "Our AI analyzes your preferences and budget to create personalized itineraries in seconds.",
    cta: { label: "Try AI Assistant", href: "/ai-assistant" },
    image: "https://picsum.photos/seed/nomadai-hero2/1920/1080",
    accent: "from-amber-500/80 to-orange-600/80",
    badge: "Popular",
  },
  {
    tagline: "Document Intelligence",
    title: ["Upload, Analyze", "Travel Stress-Free"],
    desc: "Upload visa PDFs, insurance docs, or booking confirmations — AI extracts key info instantly.",
    cta: { label: "See How It Works", href: "/ai-assistant" },
    image: "https://picsum.photos/seed/nomadai-hero3/1920/1080",
    accent: "from-indigo-500/80 to-violet-600/80",
    badge: "AI Powered",
  },
  {
    tagline: "Marketplace",
    title: ["Find Unique Stays", "Around the Globe"],
    desc: "From cozy mountain cabins to beachfront villas — discover handpicked properties curated by our community.",
    cta: { label: "Browse Marketplace", href: "/destinations" },
    image: "https://picsum.photos/seed/nomadai-hero4/1920/1080",
    accent: "from-rose-500/80 to-pink-600/80",
    badge: "Trending",
  },
];

const features = [
  { icon: Sparkles, label: "AI-Powered", desc: "Smart recommendations" },
  { icon: Globe, label: "150+ Destinations", desc: "Worldwide coverage" },
  { icon: Shield, label: "Secure Booking", desc: "Protected payments" },
  { icon: Zap, label: "Instant Results", desc: "Real-time planning" },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 1.1,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" as const },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)" as const,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function HeroSection() {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

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
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [isPaused, paginate]);

  useEffect(() => {
    setImagesLoaded(true);
  }, []);

  const slide = slides[current];

  return (
    <section
      className="relative h-[90vh] min-h-[650px] w-full flex items-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images */}
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {imagesLoaded && (
            <Image
              src={slide.image}
              alt="Hero background"
              fill
              priority={current === 0}
              className="object-cover"
              sizes="100vw"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Multi-layer overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-[1]" />

      {/* Animated mesh pattern */}
      <div className="absolute inset-0 z-[2] opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 right-[15%] w-72 h-72 rounded-full bg-teal-500/10 blur-3xl z-[2]"
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-[25%] w-48 h-48 rounded-full bg-amber-500/10 blur-3xl z-[2]"
        animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-[10%] w-36 h-36 rounded-full bg-violet-500/10 blur-3xl z-[2]"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className={`inline-flex items-center gap-2 bg-gradient-to-r ${slide.accent} text-white px-5 py-2 rounded-full text-sm font-semibold backdrop-blur-sm shadow-lg`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                {slide.tagline}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.05] tracking-tight"
            >
              {slide.title[0]}
              <br />
              <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-amber-300 bg-clip-text text-transparent">
                {slide.title[1]}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-white/80 mb-10 max-w-xl leading-relaxed"
            >
              {slide.desc}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href={slide.cta.href}
                className="group relative bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-teal-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5"
              >
                {slide.cta.label}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="/ai-assistant"
                className="group bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-0.5"
              >
                <Compass className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                Try AI Assistant
              </Link>
            </motion.div>

            {/* Feature pills */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 mt-10"
            >
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 px-4 py-2 rounded-xl text-sm hover:bg-white/20 transition-colors cursor-default"
                >
                  <feat.icon className="w-4 h-4 text-teal-300" />
                  <span className="font-medium">{feat.label}</span>
                  <span className="text-white/50 hidden sm:inline">— {feat.desc}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        <button
          onClick={() => paginate(-1)}
          className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-xl hover:bg-white/25 transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-white group-hover:-translate-x-0.5 transition-transform" />
        </button>
      </div>
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        <button
          onClick={() => paginate(1)}
          className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-xl hover:bg-white/25 transition-all duration-300 group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Slide Indicators & Progress */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex items-end justify-between">
            {/* Left: slide counter */}
            <div className="hidden sm:flex items-center gap-3 text-white/70">
              <span className="text-5xl font-bold text-white">
                {String(current + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col">
                <div className="w-12 h-[2px] bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-teal-400 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    key={current}
                  />
                </div>
                <span className="text-sm mt-1">/ {String(slides.length).padStart(2, "0")}</span>
              </div>
            </div>

            {/* Center: Dots */}
            <div className="flex gap-2 items-center">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent([i, i > current ? 1 : -1])}
                  className="group relative p-1"
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <div className={`h-2 rounded-full transition-all duration-500 ${
                    i === current
                      ? "w-10 bg-gradient-to-r from-teal-400 to-emerald-400"
                      : "w-2 bg-white/40 group-hover:bg-white/60"
                  }`} />
                </button>
              ))}
            </div>

            {/* Right: Brand watermark */}
            <div className="hidden sm:block text-white/30 text-sm font-medium">
              NomadAI © 2025
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
