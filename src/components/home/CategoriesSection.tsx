"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Palmtree,
  Mountain,
  Building2,
  Tent,
  Ship,
  Snowflake,
  TreePine,
  Castle,
  ArrowUpRight,
  Compass,
} from "lucide-react";

const categories = [
  {
    title: "Tropical Beaches",
    desc: "Sun-kissed shores, turquoise waters, and swaying palms await your arrival.",
    icon: Palmtree,
    image: "https://picsum.photos/seed/nomadai-beach/600/400",
    count: 240,
    color: "from-cyan-500 to-blue-600",
    tags: ["Maldives", "Bali", "Cancún"],
  },
  {
    title: "Mountain Retreats",
    desc: "Breathtaking peaks, alpine lodges, and crisp mountain air for the soul.",
    icon: Mountain,
    image: "https://picsum.photos/seed/nomadai-mountain/600/400",
    count: 185,
    color: "from-emerald-500 to-teal-600",
    tags: ["Swiss Alps", "Patagonia", "Nepal"],
  },
  {
    title: "Urban Escapes",
    desc: "Vibrant nightlife, world-class dining, and cultural immersion in every corner.",
    icon: Building2,
    image: "https://picsum.photos/seed/nomadai-city/600/400",
    count: 320,
    color: "from-violet-500 to-indigo-600",
    tags: ["Tokyo", "Paris", "New York"],
  },
  {
    title: "Desert Safari",
    desc: "Endless dunes, starlit skies, and ancient wonders beneath golden sands.",
    icon: Tent,
    image: "https://picsum.photos/seed/nomadai-desert/600/400",
    count: 95,
    color: "from-amber-500 to-orange-600",
    tags: ["Sahara", "Wadi Rum", "Atacama"],
  },
  {
    title: "Island Hopping",
    desc: "Crystal lagoons, hidden coves, and island vibes that never get old.",
    icon: Ship,
    image: "https://picsum.photos/seed/nomadai-island/600/400",
    count: 130,
    color: "from-sky-500 to-cyan-600",
    tags: ["Greece", "Philippines", "Caribbean"],
  },
  {
    title: "Winter Wonderland",
    desc: "Snow-capped peaks, cozy chalets, and world-class ski resorts.",
    icon: Snowflake,
    image: "https://picsum.photos/seed/nomadai-snow/600/400",
    count: 110,
    color: "from-blue-500 to-slate-600",
    tags: ["Aspen", "Niseko", "Chamonix"],
  },
  {
    title: "Forest Lodges",
    desc: "Immerse yourself in ancient forests, tranquil rivers, and nature's embrace.",
    icon: TreePine,
    image: "https://picsum.photos/seed/nomadai-forest/600/400",
    count: 85,
    color: "from-green-600 to-emerald-700",
    tags: ["Costa Rica", "Black Forest", "Olympic NP"],
  },
  {
    title: "Historic Castles",
    desc: "Step back in time with grand architecture, cobblestone streets, and legends.",
    icon: Castle,
    image: "https://picsum.photos/seed/nomadai-castle/600/400",
    count: 70,
    color: "from-rose-500 to-red-600",
    tags: ["Scotland", "Prague", "Loire Valley"],
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function CategoriesSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-teal-100/20 via-emerald-100/20 to-amber-100/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Compass className="w-4 h-4" />
            Browse Categories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Explore by
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent"> Category</span>
          </h2>
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
            From serene beaches to bustling cities — find the perfect escape that matches your travel style
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="group relative"
            >
              <Link href="/explore" className="block h-full">
                <div className="relative bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-40 group-hover:opacity-50 transition-opacity duration-500`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    {/* Count badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-neutral-800 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {cat.count}+ stays
                    </div>

                    {/* Arrow icon */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                      <ArrowUpRight className="w-5 h-5 text-neutral-800" />
                    </div>

                    {/* Icon overlay */}
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-xl border border-white/30">
                        <cat.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-teal-600 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed mb-4 flex-grow">
                      {cat.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {cat.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="bg-neutral-50 text-neutral-500 px-2.5 py-1 rounded-lg text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-neutral-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
          >
            View All Categories
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
