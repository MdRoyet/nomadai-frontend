"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Star,
  Compass,
  Heart,
  TrendingUp,
} from "lucide-react";

const preferences = [
  {
    emoji: "🏔️",
    title: "Adventure",
    desc: "Mountain treks & thrill",
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50",
    bgDark: "dark:bg-blue-950/40",
    borderLight: "border-blue-200",
    borderDark: "dark:border-blue-800/50",
    hoverBorder: "hover:border-blue-400 dark:hover:border-blue-500",
    textLight: "text-blue-700",
    textDark: "dark:text-blue-300",
  },
  {
    emoji: "🏖️",
    title: "Relaxation",
    desc: "Beaches & spas",
    color: "from-cyan-500 to-teal-600",
    bgLight: "bg-cyan-50",
    bgDark: "dark:bg-cyan-950/40",
    borderLight: "border-cyan-200",
    borderDark: "dark:border-cyan-800/50",
    hoverBorder: "hover:border-cyan-400 dark:hover:border-cyan-500",
    textLight: "text-cyan-700",
    textDark: "dark:text-cyan-300",
  },
  {
    emoji: "🏛️",
    title: "Culture",
    desc: "History & traditions",
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
    bgDark: "dark:bg-amber-950/40",
    borderLight: "border-amber-200",
    borderDark: "dark:border-amber-800/50",
    hoverBorder: "hover:border-amber-400 dark:hover:border-amber-500",
    textLight: "text-amber-700",
    textDark: "dark:text-amber-300",
  },
  {
    emoji: "🍜",
    title: "Food",
    desc: "Culinary journeys",
    color: "from-rose-500 to-pink-600",
    bgLight: "bg-rose-50",
    bgDark: "dark:bg-rose-950/40",
    borderLight: "border-rose-200",
    borderDark: "dark:border-rose-800/50",
    hoverBorder: "hover:border-rose-400 dark:hover:border-rose-500",
    textLight: "text-rose-700",
    textDark: "dark:text-rose-300",
  },
  {
    emoji: "🌿",
    title: "Nature",
    desc: "Wildlife & landscapes",
    color: "from-emerald-500 to-green-600",
    bgLight: "bg-emerald-50",
    bgDark: "dark:bg-emerald-950/40",
    borderLight: "border-emerald-200",
    borderDark: "dark:border-emerald-800/50",
    hoverBorder: "hover:border-emerald-400 dark:hover:border-emerald-500",
    textLight: "text-emerald-700",
    textDark: "dark:text-emerald-300",
  },
];

const previewDestinations = [
  { name: "Santorini", country: "Greece", rating: 4.9, price: "$289" },
  { name: "Kyoto", country: "Japan", rating: 4.8, price: "$245" },
  { name: "Patagonia", country: "Argentina", rating: 4.7, price: "$312" },
];

export default function TripMatcherSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="relative py-24 overflow-hidden transition-colors">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-violet-50/30 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-violet-500/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px]" />

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [-12, 12, -12], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" as const }}
        className="absolute top-16 right-[12%] w-20 h-20 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-2xl opacity-60 blur-[1px]"
      />
      <motion.div
        animate={{ y: [10, -10, 10], rotate: [0, -6, 6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" as const }}
        className="absolute bottom-24 left-[8%] w-14 h-14 bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-xl opacity-60 blur-[1px]"
      />
      <motion.div
        animate={{ y: [-8, 8, -8], x: [-5, 5, -5] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" as const }}
        className="absolute top-[40%] left-[5%] w-10 h-10 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg opacity-40 blur-[1px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-violet-200 dark:border-violet-800"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Matching
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 font-display">
            Find Your{" "}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Perfect Trip
            </span>
          </h2>

          <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Our AI analyzes your preferences, travel history, and interests to recommend
            destinations tailored just for you. No more endless scrolling — discover
            places you&apos;ll actually love.
          </p>
        </motion.div>

        {/* Preference Cards Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-16"
        >
          {preferences.map((pref, i) => (
            <motion.div
              key={pref.title}
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{ y: -8, scale: 1.04 }}
              onHoverStart={() => setHoveredCard(i)}
              onHoverEnd={() => setHoveredCard(null)}
              className={`relative group cursor-pointer perspective-1000`}
            >
              <div
                className={`relative p-6 rounded-2xl border ${
                  pref.bgLight} ${pref.bgDark} ${pref.borderLight} ${pref.borderDark} ${pref.hoverBorder} transition-all duration-500 overflow-hidden`}
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pref.color} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`} />

                {/* Emoji */}
                <motion.div
                  animate={hoveredCard === i ? { scale: 1.2, rotate: [0, -10, 10, 0] } : { scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-4xl mb-3"
                >
                  {pref.emoji}
                </motion.div>

                {/* Title */}
                <h3 className={`text-lg font-bold ${pref.textLight} ${pref.textDark} mb-1`}>
                  {pref.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {pref.desc}
                </p>

                {/* Bottom gradient line */}
                <div className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${pref.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Simulated Matching Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="relative max-w-4xl mx-auto">
            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 rounded-[2rem] blur-xl" />

            <div className="relative bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl shadow-neutral-200/50 dark:shadow-black/30 overflow-hidden">
              {/* Card Header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex-grow">
                  <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    AI Match Results
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-violet-600 dark:text-violet-400 font-medium">
                  <TrendingUp className="w-3 h-3" />
                  98% Match
                </div>
              </div>

              {/* Match Summary */}
              <div className="px-6 py-5 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-2 mb-3">
                  <Compass className="w-5 h-5 text-violet-500" />
                  <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    Based on your preferences, we found 5 perfect destinations
                  </span>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Our AI analyzed your travel style, preferred climate, and interests to curate
                  these top matches just for you.
                </p>
              </div>

              {/* Preview Destination Cards */}
              <div className="px-6 py-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {previewDestinations.map((dest, i) => (
                    <motion.div
                      key={dest.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 * i }}
                      whileHover={{ y: -4 }}
                      className="group/dest relative bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-4 border border-neutral-100 dark:border-neutral-700 hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300 cursor-pointer"
                    >
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 rounded-xl opacity-0 group-hover/dest:opacity-100 transition-opacity duration-300" />

                      <div className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-violet-500" />
                            <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
                              {dest.country}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                              {dest.rating}
                            </span>
                          </div>
                        </div>
                        <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                          {dest.name}
                        </h4>
                        <p className="text-sm font-semibold text-violet-600 dark:text-violet-400">
                          from {dest.price}
                          <span className="text-xs text-neutral-400 dark:text-neutral-500 font-normal ml-1">
                            /night
                          </span>
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Footer */}
              <div className="px-6 py-4 border-t border-neutral-100 dark:border-neutral-800 bg-gradient-to-r from-violet-50/50 to-indigo-50/50 dark:from-violet-950/20 dark:to-indigo-950/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-400" />
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      Personalized for your travel style
                    </span>
                  </div>
                  <Link
                    href="/match"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 hover:-translate-y-0.5 group/link"
                  >
                    <Sparkles className="w-4 h-4" />
                    Find My Match
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-14"
        >
          <Link
            href="/match"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 shadow-xl shadow-violet-500/20 hover:shadow-violet-500/30 hover:-translate-y-0.5 group"
          >
            <Sparkles className="w-5 h-5" />
            Take the Trip Quiz
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-neutral-400 dark:text-neutral-500 text-sm mt-4">
            Free • AI-powered • 2-minute quiz
          </p>
        </motion.div>
      </div>
    </section>
  );
}
