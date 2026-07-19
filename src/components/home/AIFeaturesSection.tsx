"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MessageSquare,
  MapPin,
  FileText,
  Image as ImageIcon,
  BarChart3,
  Tags,
  ArrowRight,
  Sparkles,
  Zap,
  Brain,
  Wand2,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "AI Chat Concierge",
    desc: "Chat with an intelligent agent that searches our entire database in real-time to find you the perfect stay, restaurant, or experience.",
    tag: "Most Popular",
    tagColor: "bg-teal-500/20 text-teal-300",
    gradient: "from-teal-500/20 to-emerald-500/20",
    borderHover: "hover:border-teal-500/50",
    iconBg: "bg-teal-500/20 group-hover:bg-teal-500",
  },
  {
    icon: MapPin,
    title: "Smart Trip Matcher",
    desc: "Analyzes your preferences, past views, and travel history to recommend highly personalized destinations you'll actually love.",
    tag: "AI Powered",
    tagColor: "bg-violet-500/20 text-violet-300",
    gradient: "from-violet-500/20 to-purple-500/20",
    borderHover: "hover:border-violet-500/50",
    iconBg: "bg-violet-500/20 group-hover:bg-violet-500",
  },
  {
    icon: FileText,
    title: "Document Intelligence",
    desc: "Upload travel insurance, visa PDFs, or booking confirmations. AI extracts key dates, summarizes rules, and alerts you before deadlines.",
    tag: "Time Saver",
    tagColor: "bg-amber-500/20 text-amber-300",
    gradient: "from-amber-500/20 to-orange-500/20",
    borderHover: "hover:border-amber-500/50",
    iconBg: "bg-amber-500/20 group-hover:bg-amber-500",
  },
  {
    icon: ImageIcon,
    title: "Image Understanding",
    desc: "Hosts upload a property photo, and AI auto-generates the entire listing description, highlights, and marketing copy instantly.",
    tag: "Creative",
    tagColor: "bg-rose-500/20 text-rose-300",
    gradient: "from-rose-500/20 to-pink-500/20",
    borderHover: "hover:border-rose-500/50",
    iconBg: "bg-rose-500/20 group-hover:bg-rose-500",
  },
  {
    icon: BarChart3,
    title: "Data Analyzer",
    desc: "Upload booking CSVs or revenue reports. AI identifies occupancy trends, seasonal patterns, and revenue optimization opportunities.",
    tag: "Analytics",
    tagColor: "bg-cyan-500/20 text-cyan-300",
    gradient: "from-cyan-500/20 to-sky-500/20",
    borderHover: "hover:border-cyan-500/50",
    iconBg: "bg-cyan-500/20 group-hover:bg-cyan-500",
  },
  {
    icon: Tags,
    title: "Auto Classification",
    desc: "Automatically tags and categorizes new listings based on image analysis, text context, and geographic data for instant discoverability.",
    tag: "Automation",
    tagColor: "bg-emerald-500/20 text-emerald-300",
    gradient: "from-emerald-500/20 to-green-500/20",
    borderHover: "hover:border-emerald-500/50",
    iconBg: "bg-emerald-500/20 group-hover:bg-emerald-500",
  },
  {
    icon: Wand2,
    title: "Itinerary Builder",
    desc: "Describe your dream trip in a sentence. AI creates a day-by-day itinerary with timing, transport, meals, and budget breakdown.",
    tag: "New",
    tagColor: "bg-indigo-500/20 text-indigo-300",
    gradient: "from-indigo-500/20 to-blue-500/20",
    borderHover: "hover:border-indigo-500/50",
    iconBg: "bg-indigo-500/20 group-hover:bg-indigo-500",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    desc: "Travel anywhere — AI translates listings, signs, menus, and conversations in 40+ languages in real-time with cultural context.",
    tag: "Global",
    tagColor: "bg-sky-500/20 text-sky-300",
    gradient: "from-sky-500/20 to-blue-500/20",
    borderHover: "hover:border-sky-500/50",
    iconBg: "bg-sky-500/20 group-hover:bg-sky-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
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

export default function AIFeaturesSection() {
  return (
    <section className="relative py-24 overflow-hidden transition-colors">
      {/* Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950" />

      {/* Animated mesh */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 0.5px, transparent 0)`,
        backgroundSize: "40px 40px",
      }} />

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/3 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-teal-500/10 text-teal-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-teal-500/20">
            <Brain className="w-4 h-4" />
            AI Console
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            8 Powerful
            <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-400 bg-clip-text text-transparent"> Agentic AI </span>
            Tools
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            We go beyond basic text generation. Our AI agents reason, use tools, analyze data, and take action — all to make your travel seamless.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feat, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`group relative bg-neutral-900/50 backdrop-blur-sm p-6 rounded-3xl border border-neutral-800 ${feat.borderHover} transition-all duration-500 overflow-hidden h-full flex flex-col`}
            >
              {/* Hover gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Tag */}
              <div className="relative flex items-center justify-between mb-4">
                <div className={`${feat.iconBg} p-3 rounded-2xl text-white transition-colors duration-300`}>
                  <feat.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${feat.tagColor}`}>
                  {feat.tag}
                </span>
              </div>

              {/* Content */}
              <div className="relative flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed flex-grow">
                  {feat.desc}
                </p>
              </div>

              {/* Bottom line */}
              <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${feat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-14"
        >
          <Link
            href="/ai-assistant"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-teal-600 hover:to-emerald-700 transition-all duration-300 shadow-xl shadow-teal-500/20 hover:shadow-teal-500/30 hover:-translate-y-0.5 group"
          >
            <Zap className="w-5 h-5" />
            Try All AI Tools Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-neutral-500 text-sm mt-4">No credit card required • Free tier available</p>
        </motion.div>
      </div>
    </section>
  );
}
