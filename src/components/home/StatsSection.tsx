"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Users,
  Brain,
  ThumbsUp,
  TrendingUp,
  Award,
  Globe,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    icon: MapPin,
    value: 150,
    suffix: "+",
    label: "Global Destinations",
    desc: "Across 6 continents",
    color: "from-teal-500 to-emerald-500",
    bg: "bg-teal-50 dark:bg-teal-950/30",
    iconColor: "text-teal-600 dark:text-teal-400",
  },
  {
    icon: Users,
    value: 50,
    suffix: "K+",
    label: "Happy Travelers",
    desc: "And counting every day",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: Brain,
    value: 1.2,
    suffix: "M",
    label: "AI Trips Planned",
    desc: "Intelligent itineraries",
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: ThumbsUp,
    value: 99,
    suffix: "%",
    label: "Satisfaction Rate",
    desc: "5-star average rating",
    color: "from-rose-500 to-pink-500",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
];

const badges = [
  { icon: TrendingUp, text: "Growing 3x faster than industry" },
  { icon: Award, text: "Best AI Travel Platform 2025" },
  { icon: Globe, text: "Available in 40+ languages" },
  { icon: Sparkles, text: "Powered by GPT-4 & Claude" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    const stepTime = duration / steps;
    let current = 0;
    const isDecimal = value % 1 !== 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        current = value;
        clearInterval(timer);
      }
      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function StatsSection() {
  return (
    <section className="relative py-20 overflow-hidden transition-colors">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-teal-50/50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 transition-colors" />
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #0d9488 1px, transparent 0)`,
        backgroundSize: "32px 32px",
      }} />

      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <TrendingUp className="w-4 h-4" />
            Trusted Worldwide
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Numbers That Speak
            <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent"> for Themselves</span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
            Join thousands of travelers who have transformed their journey planning with NomadAI
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white rounded-3xl p-8 border border-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

              {/* Icon */}
              <div className={`relative ${stat.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
              </div>

              {/* Value */}
              <div className="relative">
                <h3 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </h3>
                <p className="font-semibold text-neutral-800 dark:text-neutral-200 text-lg mb-1">{stat.label}</p>
                <p className="text-neutral-400 dark:text-neutral-500 text-sm">{stat.desc}</p>
              </div>

              {/* Bottom gradient bar */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Badge Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-2.5 bg-white border border-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 px-5 py-3 rounded-2xl shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-300 cursor-default"
            >
              <badge.icon className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-medium">{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
