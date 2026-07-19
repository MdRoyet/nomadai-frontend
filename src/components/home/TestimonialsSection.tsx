"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  Heart,
  MapPin,
  Camera,
  MessageSquare,
} from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Solo Traveler",
    avatar: "https://picsum.photos/seed/nomadai-sarah/200/200",
    location: "New York, USA",
    rating: 5,
    text: "The AI Chat Concierge found me a hidden cabin in the Swiss Alps under $500/week. It understood my vibe perfectly — quiet, mountain views, close to hiking trails. I never would have found it on my own. The trip was absolutely magical!",
    trip: "Swiss Alps Adventure",
    date: "March 2025",
    highlight: "Found a hidden gem under budget",
    icon: MapPin,
  },
  {
    name: "Mark Thompson",
    role: "Digital Nomad",
    avatar: "https://picsum.photos/seed/nomadai-mark/200/200",
    location: "London, UK",
    rating: 5,
    text: "Uploading my visa PDF and having the AI extract the exact expiration date, required documents, and application deadlines saved me hours of stress. It even reminded me about my travel insurance renewal. This is the future of travel planning.",
    trip: "Southeast Asia Nomad Tour",
    date: "January 2025",
    highlight: "Saved 3+ hours of document work",
    icon: MessageSquare,
  },
  {
    name: "Elena Rodriguez",
    role: "Property Host",
    avatar: "https://picsum.photos/seed/nomadai-elena/200/200",
    location: "Barcelona, Spain",
    rating: 5,
    text: "The image understanding tool wrote my entire property listing from 3 photos. It captured the charm of my villa better than I could have described it. I closed 5 bookings that very week — a new record for my property!",
    trip: "Mediterranean Villa Listing",
    date: "February 2025",
    highlight: "5x more bookings in first week",
    icon: Camera,
  },
  {
    name: "James Chen",
    role: "Family Traveler",
    avatar: "https://picsum.photos/seed/nomadai-james/200/200",
    location: "Toronto, Canada",
    rating: 5,
    text: "Planning a family trip with 2 kids used to be a nightmare. NomadAI's itinerary builder created a perfect 10-day Japan itinerary with kid-friendly activities, restaurant recommendations, and even nap time breaks. Game changer!",
    trip: "Japan Family Adventure",
    date: "April 2025",
    highlight: "Perfect family itinerary in minutes",
    icon: Heart,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
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

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50/30 to-white" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-rose-100/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-amber-100/20 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Heart className="w-4 h-4" />
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Loved by
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent"> Travelers </span>
            Worldwide
          </h2>
          <div className="flex justify-center gap-1 text-amber-400 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="fill-amber-400 w-6 h-6" />
            ))}
          </div>
          <p className="text-neutral-500 text-lg mt-3">
            4.9 average from 12,000+ reviews
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <div className="max-w-4xl mx-auto mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="relative bg-white rounded-3xl p-8 md:p-12 border border-neutral-100 shadow-xl"
            >
              {/* Quote icon */}
              <Quote className="absolute top-8 right-8 w-12 h-12 text-neutral-100" />

              {/* Rating */}
              <div className="flex gap-1 text-amber-400 mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="fill-amber-400 w-5 h-5" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-8 font-medium">
                &ldquo;{testimonials[activeIndex].text}&rdquo;
              </p>

              {/* Highlight badge */}
              <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-xl text-sm font-semibold mb-8">
                {(() => {
                  const Icon = testimonials[activeIndex].icon;
                  return <Icon className="w-4 h-4" />;
                })()}
                {testimonials[activeIndex].highlight}
              </div>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[activeIndex].avatar}
                    alt={testimonials[activeIndex].name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-lg"
                  />
                  <div>
                    <h4 className="font-bold text-neutral-900 text-lg">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-neutral-500 text-sm">
                      {testimonials[activeIndex].role} • {testimonials[activeIndex].location}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-neutral-800">{testimonials[activeIndex].trip}</p>
                  <p className="text-xs text-neutral-400">{testimonials[activeIndex].date}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-2xl border border-neutral-200 text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-8 bg-gradient-to-r from-rose-500 to-pink-500"
                      : "w-2 bg-neutral-200 hover:bg-neutral-300"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-2xl border border-neutral-200 text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {testimonials.map((review, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              onClick={() => setActiveIndex(i)}
              className={`relative p-6 rounded-3xl border cursor-pointer transition-all duration-300 ${
                i === activeIndex
                  ? "bg-white border-rose-200 shadow-xl ring-2 ring-rose-100"
                  : "bg-white border-neutral-100 shadow-sm hover:shadow-lg hover:border-neutral-200"
              }`}
            >
              {/* Stars */}
              <div className="flex gap-0.5 text-amber-400 mb-3">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="fill-amber-400 w-4 h-4" />
                ))}
              </div>

              {/* Snippet */}
              <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-3">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{review.name}</p>
                  <p className="text-xs text-neutral-400">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
