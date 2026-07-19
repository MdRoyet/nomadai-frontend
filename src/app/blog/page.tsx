"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  User,
  ArrowRight,
  Search,
  Tag,
} from "lucide-react";

const categories = [
  "All",
  "Destinations",
  "Travel Tips",
  "Culture",
  "Food & Drink",
  "Adventure",
  "Budget Travel",
];

const posts = [
  {
    id: 1,
    title: "10 Hidden Gems in Southeast Asia You Need to Visit",
    excerpt:
      "Discover lesser-known destinations that offer authentic experiences without the crowds. From secret beaches to ancient temples.",
    date: "Jan 15, 2026",
    author: "Alex Rivera",
    category: "Destinations",
    image: "https://picsum.photos/seed/nomad1/600/400",
  },
  {
    id: 2,
    title: "How AI is Revolutionizing Travel Planning in 2026",
    excerpt:
      "From personalized itineraries to real-time price tracking, artificial intelligence is changing how we explore the world.",
    date: "Jan 12, 2026",
    author: "Mia Chen",
    category: "Travel Tips",
    image: "https://picsum.photos/seed/nomad2/600/400",
  },
  {
    id: 3,
    title: "A Foodie's Guide to Street Eats in Bangkok",
    excerpt:
      "Navigate the bustling streets of Bangkok like a local. Our top picks for pad thai, mango sticky rice, and more.",
    date: "Jan 10, 2026",
    author: "James Okafor",
    category: "Food & Drink",
    image: "https://picsum.photos/seed/nomad3/600/400",
  },
  {
    id: 4,
    title: "Budget Travel: How I Spent $30 a Day in Portugal",
    excerpt:
      "A practical guide to exploring Lisbon, Porto, and the Algarve on a shoestring budget without sacrificing experiences.",
    date: "Jan 8, 2026",
    author: "Sara Lindström",
    category: "Budget Travel",
    image: "https://picsum.photos/seed/nomad4/600/400",
  },
  {
    id: 5,
    title: "Understanding Japanese Tea Culture",
    excerpt:
      "A deep dive into the rituals, history, and philosophy behind Japan's centuries-old tea traditions. More than just a beverage.",
    date: "Jan 5, 2026",
    author: "Mia Chen",
    category: "Culture",
    image: "https://picsum.photos/seed/nomad5/600/400",
  },
  {
    id: 6,
    title: "Trekking the Inca Trail: What You Need to Know",
    excerpt:
      "Everything from permit logistics to packing essentials for the classic four-day trek to Machu Picchu.",
    date: "Jan 3, 2026",
    author: "Alex Rivera",
    category: "Adventure",
    image: "https://picsum.photos/seed/nomad6/600/400",
  },
];

const categoryColors: Record<string, string> = {
  Destinations: "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300",
  "Travel Tips": "bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-300",
  Culture: "bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300",
  "Food & Drink": "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  Adventure: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  "Budget Travel": "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white dark:bg-neutral-900 transition-colors">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary-50 via-white to-primary-50 dark:from-secondary-900/20 dark:via-neutral-900 dark:to-primary-900/10 py-24 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-secondary-100 dark:bg-secondary-900/40 text-secondary-700 dark:text-secondary-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Travel Blog
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              Stories &{" "}
              <span className="text-secondary-500">Inspiration</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
              Tips, guides, and stories from travelers around the world. Get
              inspired for your next adventure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="py-8 border-b border-neutral-100 dark:border-neutral-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative flex-1 w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-primary-600 text-white shadow-sm"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 text-neutral-500 dark:text-neutral-400">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="group bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-700 overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          categoryColors[post.category] ||
                          "bg-neutral-100 text-neutral-700"
                        }`}
                      >
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-neutral-500 dark:text-neutral-400 text-sm mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {post.author}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-primary-600 font-medium text-sm hover:gap-2 transition-all"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
