"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Brain,
  Plane,
  ArrowRight,
  Sparkles,
  MessageSquare,
  FileText,
  Calendar,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Discover Destinations",
    shortTitle: "Discover",
    desc: "Browse thousands of curated properties, hidden gems, and travel experiences tailored to your preferences. Our AI learns your style with every interaction.",
    details: [
      "Smart search with natural language",
      "Personalized recommendations",
      "Real-time pricing & availability",
      "Community-curated collections",
    ],
    icon: Search,
    color: "from-teal-500 to-emerald-500",
    bgColor: "bg-teal-50 dark:bg-teal-950/30",
    iconBg: "bg-teal-100 dark:bg-teal-900/30",
    iconColor: "text-teal-600 dark:text-teal-400",
    image: "https://picsum.photos/seed/nomadai-step1/800/600",
    accent: "teal",
  },
  {
    num: "02",
    title: "Plan with AI Intelligence",
    shortTitle: "Plan",
    desc: "Use our AI console to generate full itineraries, analyze travel documents, parse PDFs, and build trip plans that match your budget and interests perfectly.",
    details: [
      "7 agentic AI tools at your service",
      "Document parsing & extraction",
      "Budget-aware itinerary builder",
      "Multi-language support",
    ],
    icon: Brain,
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50 dark:bg-violet-950/30",
    iconBg: "bg-violet-100 dark:bg-violet-900/30",
    iconColor: "text-violet-600 dark:text-violet-400",
    image: "https://picsum.photos/seed/nomadai-step2/800/600",
    accent: "violet",
  },
  {
    num: "03",
    title: "Book & Travel Confidently",
    shortTitle: "Travel",
    desc: "Complete your booking with secure payments, get a personalized travel guide, and carry an AI assistant in your pocket throughout your journey.",
    details: [
      "Secure instant booking",
      "Dynamic travel documents",
      "AI concierge on-the-go",
      "24/7 support & rebooking",
    ],
    icon: Plane,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    image: "https://picsum.photos/seed/nomadai-step3/800/600",
    accent: "amber",
  },
];

const miniFeatures = [
  { icon: MessageSquare, label: "AI Chat" },
  { icon: FileText, label: "Doc Analysis" },
  { icon: Calendar, label: "Smart Scheduling" },
  { icon: CreditCard, label: "Easy Payments" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.15 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function HowItWorksSection() {
  return (
    <section className="relative py-24 overflow-hidden transition-colors">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 transition-colors" />

      {/* Geometric accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-100/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-violet-100/30 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            How
            <span className="bg-gradient-to-r from-teal-600 to-violet-600 bg-clip-text text-transparent"> NomadAI </span>
            Works
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
            Three simple steps to your next unforgettable journey — powered by AI, designed for you
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-20"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={stepVariants}
              className={`flex flex-col ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
            >
              {/* Image Side */}
              <div className="flex-1 relative group">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-[350px] lg:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${step.color} opacity-20`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Floating number */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  className={`absolute -top-5 ${i % 2 === 0 ? "-right-5" : "-left-5"} w-20 h-20 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center text-white text-2xl font-bold shadow-xl`}
                >
                  {step.num}
                </motion.div>

                {/* Feature mini cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className={`absolute -bottom-6 ${i % 2 === 0 ? "left-6" : "right-6"} flex gap-2`}
                >
                  {miniFeatures.slice(i * 1 + 1, i * 1 + 3).map((feat, j) => (
                    <div
                      key={j}
                      className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md border border-neutral-100 dark:border-neutral-700 px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2"
                    >
                      <feat.icon className="w-4 h-4 text-teal-600" />
                      <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">{feat.label}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Content Side */}
              <div className="flex-1 space-y-6">
                <div className={`inline-flex items-center gap-2 ${step.iconBg} ${step.iconColor} px-4 py-2 rounded-2xl text-sm font-semibold`}>
                  <step.icon className="w-4 h-4" />
                  Step {step.num}
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
                  {step.title}
                </h3>

                <p className="text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed">
                  {step.desc}
                </p>

                {/* Detail list */}
                <ul className="space-y-3">
                  {step.details.map((detail, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + j * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`flex-shrink-0 w-6 h-6 ${step.iconBg} rounded-lg flex items-center justify-center`}>
                        <CheckCircle2 className={`w-4 h-4 ${step.iconColor}`} />
                      </div>
                      <span className="text-neutral-600 dark:text-neutral-300 font-medium">{detail}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={i === 0 ? "/explore" : i === 1 ? "/ai-assistant" : "/register"}
                  className={`inline-flex items-center gap-2 bg-gradient-to-r ${step.color} text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group`}
                >
                  {i === 0 ? "Start Exploring" : i === 1 ? "Try AI Tools" : "Get Started Free"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
