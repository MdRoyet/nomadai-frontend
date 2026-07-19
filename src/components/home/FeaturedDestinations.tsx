"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { fetchDestinations } from "@/lib/api";
import { Destination } from "@/types";
import {
  Star,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart,
  TrendingUp,
  Loader2,
} from "lucide-react";

export default function FeaturedDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchDestinations("sort=rating_desc&limit=8");
        setDestinations(res.destinations || []);
      } catch {
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const slideCount = destinations.length;

  const paginate = useCallback(
    (dir: number) => {
      if (slideCount === 0) return;
      setDirection(dir);
      setCurrent((prev) => (prev + dir + slideCount) % slideCount);
    },
    [slideCount]
  );

  // Auto-play
  useEffect(() => {
    if (isPaused || slideCount === 0) return;
    timerRef.current = setInterval(() => paginate(1), 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, paginate, slideCount]);

  const toggleFav = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  // Show 3 cards at a time on desktop, 1 on mobile
  const getVisibleIndices = () => {
    if (slideCount === 0) return [];
    const indices: number[] = [];
    for (let i = 0; i < 3; i++) {
      indices.push((current + i) % slideCount);
    }
    return indices;
  };

  if (loading) {
    return (
      <section className="py-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </section>
    );
  }

  if (destinations.length === 0) return null;

  const visible = getVisibleIndices();

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0, scale: 0.9 }),
  };

  return (
    <section
      className="relative py-20 overflow-hidden transition-colors"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-teal-50/30 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary-700 dark:text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <TrendingUp className="w-4 h-4" />
              Trending Now
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
              Top Featured
              <span className="bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent"> Destinations</span>
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-xl">
              Handpicked by our AI and loved by travelers worldwide
            </p>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => paginate(-1)}
              className="w-12 h-12 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="w-12 h-12 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <Link
              href="/explore"
              className="hidden sm:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300 shadow-md shadow-primary/20 text-sm"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout" custom={direction}>
              {visible.map((idx, pos) => {
                const d = destinations[idx];
                if (!d) return null;
                const isFav = favorites.has(d._id);
                return (
                  <motion.div
                    key={d._id + "-" + current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: 0.5,
                      delay: pos * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94] as const,
                    }}
                    className="group"
                  >
                    <Link href={`/destinations/${d._id}`} className="block h-full">
                      <div className="relative bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-2xl dark:hover:shadow-primary/5 transition-all duration-500 h-full flex flex-col">
                        {/* Image */}
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={d.images?.[0] || "https://picsum.photos/seed/nomadai/800/600"}
                            alt={d.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                          {/* Top badges */}
                          <div className="absolute top-4 left-4 flex items-center gap-2">
                            <span className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              Featured
                            </span>
                            {d.category && (
                              <span className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm text-neutral-800 dark:text-neutral-200 px-3 py-1 rounded-full text-xs font-bold">
                                {d.category}
                              </span>
                            )}
                          </div>

                          {/* Favorite button */}
                          <button
                            onClick={(e) => toggleFav(d._id, e)}
                            className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white dark:hover:bg-neutral-700 transition-all duration-300 shadow-lg"
                          >
                            <Heart
                              className={`w-5 h-5 transition-all duration-300 ${
                                isFav
                                  ? "text-red-500 fill-red-500 scale-110"
                                  : "text-neutral-400 hover:text-red-400"
                              }`}
                            />
                          </button>

                          {/* Bottom info on image */}
                          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                            <div className="flex items-center gap-1.5 text-white/90">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm font-medium">{d.location}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                              <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                                {d.rating?.toFixed(1)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-primary transition-colors line-clamp-1">
                            {d.title}
                          </h3>
                          <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-2">
                            {d.short_desc}
                          </p>

                          {/* Tags */}
                          {d.tags && d.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {d.tags.slice(0, 3).map((tag, i) => (
                                <span
                                  key={i}
                                  className="bg-primary/5 dark:bg-primary/10 text-primary-700 dark:text-primary px-2.5 py-1 rounded-lg text-xs font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Price & CTA */}
                          <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
                            <div>
                              <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                                ${d.price}
                              </span>
                              <span className="text-neutral-400 dark:text-neutral-500 text-sm ml-1">
                                / night
                              </span>
                            </div>
                            <span className="flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-2.5 transition-all duration-300">
                              View Details
                              <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Dots + Progress */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <div className="flex gap-2">
            {destinations.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="group relative p-1"
                aria-label={`Go to slide ${i + 1}`}
              >
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === current
                      ? "w-10 bg-gradient-to-r from-primary to-emerald-500"
                      : "w-2 bg-neutral-300 dark:bg-neutral-600 group-hover:bg-neutral-400 dark:group-hover:bg-neutral-500"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-sm text-neutral-400 dark:text-neutral-500 font-medium">
            {current + 1} / {slideCount}
          </span>
        </div>
      </div>
    </section>
  );
}
