"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Compass,
  ArrowUp,
  Send,
  MapPin,
  Plane,
  Globe,
  Heart,
  Sparkles,
} from "lucide-react";

const footerLinks = {
  explore: [
    { label: "Destinations", href: "/explore" },
    { label: "Featured Stays", href: "/explore?featured=true" },
    { label: "AI Itineraries", href: "/ai-assistant" },
    { label: "Travel Guides", href: "/explore?guides=true" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press Kit", href: "/press" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "AI Console", href: "/dashboard/ai" },
    { label: "List Property", href: "/items/add" },
    { label: "Help Center", href: "/help" },
    { label: "API Docs", href: "/docs" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const destinations = [
  "Bali, Indonesia",
  "Santorini, Greece",
  "Kyoto, Japan",
  "Patagonia, Argentina",
  "Marrakech, Morocco",
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-20">
      {/* Gradient top border */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

      {/* Main footer */}
      <div className="bg-neutral-900 text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top section - Newsletter + Brand */}
          <div className="py-12 border-b border-neutral-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Brand & Newsletter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <div className="bg-primary/20 p-2 rounded-xl">
                    <Compass className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-display font-bold text-2xl text-white">
                    NomadAI
                  </span>
                </Link>
                <p className="text-neutral-400 mb-6 max-w-md">
                  Discover the world with AI-powered precision. Your next
                  adventure starts with a single conversation.
                </p>

                {/* Newsletter */}
                <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <form onSubmit={handleSubscribe} className="flex gap-3 flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary-700 text-white px-5 py-3 rounded-xl font-semibold transition flex items-center gap-2 whitespace-nowrap"
                    >
                      {subscribed ? (
                        <>
                          <Sparkles className="w-4 h-4" /> Subscribed!
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Subscribe
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* Popular Destinations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-secondary" />
                  Trending Destinations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {destinations.map((dest) => (
                    <Link
                      key={dest}
                      href={`/explore?search=${encodeURIComponent(dest)}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-primary/50 rounded-lg text-sm text-neutral-300 hover:text-white transition"
                    >
                      <MapPin className="w-3 h-3 text-primary" />
                      {dest}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Plane className="w-4 h-4 text-primary" />
                Explore
              </h4>
              <ul className="space-y-3">
                {footerLinks.explore.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 hover:text-primary transition text-sm inline-flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-primary transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 hover:text-primary transition text-sm inline-flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-primary transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 hover:text-primary transition text-sm inline-flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-primary transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 hover:text-primary transition text-sm inline-flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-primary transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="py-6 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-500">
              &copy; {new Date().getFullYear()} NomadAI. All rights reserved.
            </p>

            <div className="flex items-center gap-1 text-sm text-neutral-500">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 mx-1" /> for travelers worldwide
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm text-neutral-400 hover:text-primary transition group"
            >
              Back to top
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
