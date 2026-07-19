"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Languages,
  ArrowRight,
  Sparkles,
  MessageSquare,
} from "lucide-react";

const languages = [
  { name: "Spanish", flag: "🇪🇸", delay: 0 },
  { name: "French", flag: "🇫🇷", delay: 0.1 },
  { name: "Japanese", flag: "🇯🇵", delay: 0.2 },
  { name: "Arabic", flag: "🇸🇦", delay: 0.3 },
  { name: "Mandarin", flag: "🇨🇳", delay: 0.4 },
  { name: "Portuguese", flag: "🇧🇷", delay: 0.5 },
  { name: "German", flag: "🇩🇪", delay: 0.6 },
  { name: "Italian", flag: "🇮🇹", delay: 0.7 },
  { name: "Korean", flag: "🇰🇷", delay: 0.8 },
  { name: "Hindi", flag: "🇮🇳", delay: 0.9 },
];

const translationExample = {
  source: "Where is the nearest train station?",
  translated: "¿Dónde está la estación de tren más cercana?",
  culturalNote:
    "In Spain, train stations are often called 'estación de tren' or simply 'cercanías' for commuter rail. Asking locals with a smile goes a long way!",
  pronunciation: "DOHN-deh ehs-TAH la ehs-tah-SYOHN deh tren mahs sehr-KAH-nah",
};

export default function MultiLanguageSection() {
  return (
    <section className="relative py-24 overflow-hidden transition-colors">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[100px]" />

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
        className="absolute top-20 left-[10%] w-16 h-16 bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 rounded-2xl opacity-60 blur-[1px]"
      />
      <motion.div
        animate={{ y: [10, -10, 10], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
        className="absolute bottom-20 right-[15%] w-12 h-12 bg-gradient-to-br from-sky-100 to-cyan-100 dark:from-sky-900/30 dark:to-cyan-900/30 rounded-xl opacity-60 blur-[1px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text + Language Pills */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            <span className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-indigo-200 dark:border-indigo-800">
              <Globe className="w-4 h-4" />
              Global Reach
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 font-display">
              Travel in
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Any Language
              </span>
            </h2>

            <p className="text-neutral-500 dark:text-neutral-400 text-lg mb-8 leading-relaxed max-w-lg">
              Break down language barriers with AI-powered translation across 40+ languages.
              Get real-time translations with cultural context and pronunciation guides
              so you can communicate anywhere in the world.
            </p>

            {/* Language Pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {languages.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: lang.delay }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="inline-flex items-center gap-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 cursor-default"
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {lang.name}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/translate"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-7 py-3.5 rounded-2xl font-semibold hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5 group"
              >
                <Languages className="w-5 h-5" />
                Try Translation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-sm text-neutral-400 dark:text-neutral-500">
                Free • No sign-up required
              </span>
            </motion.div>
          </motion.div>

          {/* Right side - Translation Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 rounded-[2rem] blur-xl" />

              <div className="relative bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl shadow-neutral-200/50 dark:shadow-black/30 overflow-hidden">
                {/* Card Header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-grow">
                    <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                      AI Translation
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
                    <Sparkles className="w-3 h-3" />
                    Instant
                  </div>
                </div>

                {/* Source */}
                <div className="px-6 py-5 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                      English
                    </span>
                    <span className="text-neutral-300 dark:text-neutral-600">•</span>
                    <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                      Source
                    </span>
                  </div>
                  <p className="text-neutral-800 dark:text-neutral-200 text-base leading-relaxed">
                    {translationExample.source}
                  </p>
                </div>

                {/* Target */}
                <div className="px-6 py-5 border-b border-neutral-100 dark:border-neutral-800 bg-gradient-to-r from-indigo-50/50 to-violet-50/50 dark:from-indigo-950/20 dark:to-violet-950/20">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      Spanish
                    </span>
                    <span className="text-neutral-300 dark:text-neutral-600">•</span>
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      Target
                    </span>
                  </div>
                  <p className="text-neutral-800 dark:text-neutral-200 text-base leading-relaxed mb-2">
                    {translationExample.translated}
                  </p>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 italic">
                    🔊 {translationExample.pronunciation}
                  </p>
                </div>

                {/* Cultural Note */}
                <div className="px-6 py-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-xs">💡</span>
                    </div>
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      Cultural Note
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {translationExample.culturalNote}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
