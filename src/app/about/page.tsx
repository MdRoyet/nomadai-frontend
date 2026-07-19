"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Heart,
  Shield,
  Sparkles,
  Users,
  ArrowRight,
  Target,
  Compass,
} from "lucide-react";

const team = [
  {
    name: "Alex Rivera",
    role: "Founder & CEO",
    bio: "Passionate about leveraging AI to make travel accessible and personalized for everyone.",
  },
  {
    name: "Mia Chen",
    role: "Head of AI",
    bio: "Former ML researcher at DeepMind, now building intelligent travel recommendations.",
  },
  {
    name: "James Okafor",
    role: "Lead Designer",
    bio: "Award-winning UX designer crafting intuitive experiences for global travelers.",
  },
  {
    name: "Sara Lindström",
    role: "Head of Partnerships",
    bio: "Connecting local hosts and operators with travelers seeking authentic experiences.",
  },
];

const values = [
  {
    icon: Compass,
    title: "Discovery First",
    description:
      "We believe every journey begins with curiosity. Our platform is designed to inspire exploration beyond the beaten path.",
    color: "text-primary-600",
    bg: "bg-primary-50",
  },
  {
    icon: Heart,
    title: "Community Driven",
    description:
      "Travel is better when shared. We foster a community of hosts, travelers, and local guides who learn from each other.",
    color: "text-secondary-500",
    bg: "bg-secondary-50",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description:
      "We vet every listing and host, providing secure payments and 24/7 support so you can travel with confidence.",
    color: "text-accent-600",
    bg: "bg-accent-50",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Personalization",
    description:
      "Our intelligent assistant learns your preferences to craft itineraries that feel uniquely yours.",
    color: "text-primary-600",
    bg: "bg-primary-50",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-neutral-900 transition-colors">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-primary-900/20 dark:via-neutral-900 dark:to-secondary-900/10 py-24 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              Our Story
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              About{" "}
              <span className="text-primary-600">NomadAI</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
              We&apos;re reimagining how the world travels — combining human wanderlust
              with artificial intelligence to create unforgettable journeys.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 text-secondary-600 font-medium text-sm mb-4">
                <Target className="w-4 h-4" />
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                Make every trip{" "}
                <span className="text-secondary-500">extraordinary</span>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed mb-4">
                Travel should be about creating memories, not stress. NomadAI was born from
                the frustration of spending hours planning trips that never quite matched
                our expectations. We knew there had to be a better way.
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                By combining cutting-edge AI with a curated marketplace of unique
                destinations and local experiences, we help travelers discover places they
                never knew existed — and plan the perfect trip to get there.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-500 to-accent-600 rounded-3xl p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">50K+</div>
                    <div className="text-white/70 text-sm">Happy Travelers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">200+</div>
                    <div className="text-white/70 text-sm">Destinations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">4.9</div>
                    <div className="text-white/70 text-sm">Average Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">98%</div>
                    <div className="text-white/70 text-sm">Satisfaction</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-800/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 text-primary-600 font-medium text-sm mb-4">
              <Users className="w-4 h-4" />
              Our Team
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Meet the <span className="text-primary-600">Explorers</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-700 shadow-sm hover:shadow-teal transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-accent-600 flex items-center justify-center text-white text-xl font-bold mb-4">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 text-sm font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 text-accent-600 font-medium text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              Our Values
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              What We <span className="text-accent-600">Stand For</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-700 shadow-sm hover:shadow-lg transition-all"
              >
                <div
                  className={`w-12 h-12 ${value.bg} dark:bg-neutral-800 rounded-xl flex items-center justify-center mb-4`}
                >
                  <value.icon className={`w-6 h-6 ${value.color}`} />
                </div>
                <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                  {value.title}
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
              Join thousands of travelers who have discovered their dream
              destinations with NomadAI.
            </p>
            <a
              href="/explore"
              className="inline-flex items-center gap-2 bg-white text-primary-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-50 transition-colors"
            >
              Explore Destinations
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
