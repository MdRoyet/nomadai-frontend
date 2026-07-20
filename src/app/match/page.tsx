"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import api from "@/lib/api";
import { toast } from "react-toastify";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Star,
  Heart,
  Check,
  RotateCcw,
  Trophy,
  Compass,
  Loader2,
} from "lucide-react";

// ---- Types ----

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

interface QuizOption {
  id: string;
  label: string;
  emoji: string;
}

interface MatchResult {
  id: string;
  name: string;
  location: string;
  price: string;
  rating: number;
  matchScore: number;
  reason: string;
  highlights: string[];
  bestFor: string;
  bestTime: string;
  image?: string;
}

interface QuizAnswers {
  travelStyle: string;
  climate: string;
  budget: string;
  interests: string;
  duration: string;
}

// ---- Hardcoded Fallback Data ----

const FALLBACK_QUESTIONS: QuizQuestion[] = [
  {
    id: "travelStyle",
    question: "What's your ideal travel style?",
    options: [
      { id: "adventure", label: "Adventure", emoji: "🏔️" },
      { id: "relaxation", label: "Relaxation", emoji: "🏖️" },
      { id: "culture", label: "Culture", emoji: "🏛️" },
      { id: "food", label: "Foodie", emoji: "🍜" },
      { id: "nature", label: "Nature", emoji: "🌿" },
      { id: "nightlife", label: "Nightlife", emoji: "🌃" },
    ],
  },
  {
    id: "climate",
    question: "What climate do you prefer?",
    options: [
      { id: "tropical", label: "Tropical & Warm", emoji: "☀️" },
      { id: "temperate", label: "Mild & Temperate", emoji: "🌤️" },
      { id: "cold", label: "Cold & Snowy", emoji: "❄️" },
      { id: "arid", label: "Dry & Arid", emoji: "🏜️" },
    ],
  },
  {
    id: "budget",
    question: "What's your budget per night?",
    options: [
      { id: "budget", label: "Budget ($0-$100)", emoji: "💰" },
      { id: "mid", label: "Mid-Range ($100-$300)", emoji: "💳" },
      { id: "luxury", label: "Luxury ($300-$700)", emoji: "✨" },
      { id: "ultra", label: "Ultra Luxury ($700+)", emoji: "👑" },
    ],
  },
  {
    id: "interests",
    question: "What interests you most?",
    options: [
      { id: "outdoors", label: "Outdoor Activities", emoji: "🚴" },
      { id: "history", label: "Historical Sites", emoji: "🏛️" },
      { id: "wellness", label: "Wellness & Spa", emoji: "🧘" },
      { id: "shopping", label: "Shopping & Markets", emoji: "🛍️" },
      { id: "wildlife", label: "Wildlife & Safari", emoji: "🦁" },
      { id: "photography", label: "Photography Spots", emoji: "📸" },
    ],
  },
  {
    id: "duration",
    question: "How long is your trip?",
    options: [
      { id: "weekend", label: "Weekend (2-3 days)", emoji: "🗓️" },
      { id: "week", label: "One Week", emoji: "📅" },
      { id: "twoweeks", label: "Two Weeks", emoji: "✈️" },
      { id: "month", label: "Extended (1 month+)", emoji: "🌍" },
    ],
  },
];

const FALLBACK_RESULTS: MatchResult[] = [
  {
    id: "1",
    name: "Santorini",
    location: "Greece, Europe",
    price: "$289",
    rating: 4.9,
    matchScore: 96,
    reason: "Perfect blend of stunning landscapes, rich culture, and world-class dining with breathtaking sunsets.",
    highlights: ["Romantic Sunsets", "Historic Villas", "Local Cuisine", "Wine Tasting"],
    bestFor: "Couples & Culture Lovers",
    bestTime: "Apr - Oct",
  },
  {
    id: "2",
    name: "Kyoto",
    location: "Japan, Asia",
    price: "$245",
    rating: 4.8,
    matchScore: 93,
    reason: "Ancient temples, traditional gardens, and authentic cultural experiences that transport you through time.",
    highlights: ["Temple Hopping", "Tea Ceremonies", "Cherry Blossoms", "Street Food"],
    bestFor: "Culture & Nature Enthusiasts",
    bestTime: "Mar - May",
  },
  {
    id: "3",
    name: "Bali",
    location: "Indonesia, Asia",
    price: "$178",
    rating: 4.7,
    matchScore: 91,
    reason: "Tropical paradise offering spiritual wellness retreats, stunning rice terraces, and vibrant nightlife.",
    highlights: ["Yoga Retreats", "Rice Terraces", "Temple Visits", "Surfing"],
    bestFor: "Wellness & Adventure Seekers",
    bestTime: "May - Sep",
  },
  {
    id: "4",
    name: "Patagonia",
    location: "Argentina, South America",
    price: "$312",
    rating: 4.7,
    matchScore: 88,
    reason: "Raw, untamed wilderness with glaciers, mountains, and some of the best hiking on the planet.",
    highlights: ["Glacier Trekking", "Wildlife Viewing", "Scenic Drives", "Camping"],
    bestFor: "Adventure & Nature Lovers",
    bestTime: "Nov - Mar",
  },
  {
    id: "5",
    name: "Marrakech",
    location: "Morocco, Africa",
    price: "$156",
    rating: 4.6,
    matchScore: 85,
    reason: "A sensory feast of colors, spices, and sounds with a perfect mix of history, food, and adventure.",
    highlights: ["Souks & Markets", "Desert Tours", "Riads", "Local Cuisine"],
    bestFor: "Foodies & Culture Enthusiasts",
    bestTime: "Mar - May",
  },
];

const TRAVEL_TIPS = [
  {
    icon: Compass,
    title: "Plan Ahead",
    tip: "Book accommodations 2-3 months in advance for the best deals and availability.",
  },
  {
    icon: Heart,
    title: "Travel Insurance",
    tip: "Always get travel insurance — it's a small cost for big peace of mind.",
  },
  {
    icon: MapPin,
    title: "Local Experiences",
    tip: "Ask locals for recommendations — they know the hidden gems tourists miss.",
  },
  {
    icon: Star,
    title: "Off-Season Travel",
    tip: "Consider shoulder season for fewer crowds and better prices.",
  },
];

// ---- Slide Variants ----

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

// ---- Main Component ----

export default function MatchPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    travelStyle: "",
    climate: "",
    budget: "",
    interests: "",
    duration: "",
  });
  const [questions, setQuestions] = useState<QuizQuestion[]>(FALLBACK_QUESTIONS);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [direction, setDirection] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // Fetch questions on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get("/quiz");
        if (res.data?.questions?.length) {
          // Map API fields (value/icon) to frontend fields (id/emoji)
          const mapped = res.data.questions.map((q: any) => ({
            id: q.id,
            question: q.question,
            options: q.options.map((o: any) => ({
              id: o.value || o.id,
              label: o.label,
              emoji: o.icon || o.emoji,
            })),
          }));
          setQuestions(mapped);
        }
      } catch {
        // Use fallback data
      }
    };
    fetchQuestions();
  }, []);

  const totalSteps = questions.length;
  const currentQuestion = questions[step];
  const progress = ((step + 1) / totalSteps) * 100;

  const handleSelect = useCallback((questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  }, []);

  const handleNext = useCallback(() => {
    if (step < totalSteps - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    } else {
      submitQuiz();
    }
  }, [step, totalSteps]);

  const handleBack = useCallback(() => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  }, [step]);

  const submitQuiz = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await api.post("/match", {
        preferences: answers.travelStyle,
        budget: answers.budget,
        travelStyle: answers.travelStyle,
        interests: answers.interests,
        climate: answers.climate,
        duration: answers.duration,
      });
      // Map backend response to frontend format
      const recs = res.data?.recommendations || [];
      const mapped = recs.map((r: any) => ({
        id: r.destination?._id || r.destinationId,
        name: r.destination?.title || r.destinationId,
        location: r.destination?.location || "",
        price: r.destination?.price ? `$${r.destination.price}/night` : r.estimatedBudget || "",
        rating: r.destination?.rating || 0,
        matchScore: r.matchScore || 0,
        reason: r.reason || "",
        highlights: r.highlights || [],
        bestFor: r.bestFor || "",
        bestTime: r.bestTimeToVisit || "",
        image: r.destination?.images?.[0] || "",
      }));
      setResults(mapped.length > 0 ? mapped : FALLBACK_RESULTS);
      toast.success("Found your perfect matches!");
    } catch {
      setResults(FALLBACK_RESULTS);
      toast.info("Using demo results");
    } finally {
      setIsLoading(false);
      setIsQuizComplete(true);
    }
  };

  const handleStartOver = () => {
    setStep(0);
    setAnswers({ travelStyle: "", climate: "", budget: "", interests: "", duration: "" });
    setResults([]);
    setIsQuizComplete(false);
    setError(null);
    setDirection(1);
  };

  const isCurrentSelected = currentQuestion
    ? !!answers[currentQuestion.id as keyof QuizAnswers]
    : false;

  // ---- Loading State ----
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" as const }}
            className="w-20 h-20 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-violet-500/30"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 font-display">
            AI is finding your perfect destinations...
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg">
            Analyzing your preferences against thousands of destinations
          </p>
          <div className="mt-8 flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                className="w-3 h-3 bg-violet-500 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // ---- Results State ----
  if (isQuizComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
        {/* Background decorations */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/20">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 font-display">
              Your Perfect Matches
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
              Based on your preferences, we&apos;ve curated {results.length} destinations that match your travel style perfectly.
            </p>
          </motion.div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {results.map((result, i) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl shadow-neutral-200/30 dark:shadow-black/20 overflow-hidden"
              >
                {/* Match Score Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="relative w-14 h-14">
                    <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                      <circle
                        cx="28"
                        cy="28"
                        r="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-neutral-100 dark:text-neutral-800"
                      />
                      <circle
                        cx="28"
                        cy="28"
                        r="24"
                        fill="none"
                        stroke="url(#scoreGradient)"
                        strokeWidth="4"
                        strokeDasharray={`${(result.matchScore / 100) * 150.8} 150.8`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
                        {result.matchScore}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Location */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-violet-500" />
                    <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
                      {result.location}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                    {result.name}
                  </h3>

                  {/* Price & Rating */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-lg font-bold text-violet-600 dark:text-violet-400">
                      {result.price}
                      <span className="text-xs text-neutral-400 dark:text-neutral-500 font-normal ml-1">/night</span>
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                        {result.rating}
                      </span>
                    </div>
                  </div>

                  {/* Reason */}
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">
                    {result.reason}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {result.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center gap-1 text-xs font-medium bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 px-2.5 py-1 rounded-lg border border-violet-100 dark:border-violet-900/50"
                      >
                        <Check className="w-3 h-3" />
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Meta Info */}
                  <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400 dark:text-neutral-500">Best for</span>
                      <span className="font-medium text-neutral-700 dark:text-neutral-300">
                        {result.bestFor}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400 dark:text-neutral-500">Best time</span>
                      <span className="font-medium text-neutral-700 dark:text-neutral-300">
                        {result.bestTime}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Travel Tips */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 text-center mb-8 font-display">
              Travel Tips
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TRAVEL_TIPS.map((tip, i) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-sm"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900/40 dark:to-indigo-900/40 rounded-xl flex items-center justify-center mb-3">
                    <tip.icon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1 text-sm">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {tip.tip}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={handleStartOver}
              className="inline-flex items-center gap-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 px-6 py-3 rounded-2xl font-semibold hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300"
            >
              <RotateCcw className="w-5 h-5" />
              Start Over
            </button>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-violet-500/20"
            >
              Explore All Destinations
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  // ---- Quiz State ----
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" as const }}
            className="w-16 h-16 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-violet-500/20"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 font-display">
            Smart Trip{" "}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Matcher
            </span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-xl mx-auto">
            Answer a few questions and our AI will find destinations perfectly matched to your travel style.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
              Step {step + 1} of {totalSteps}
            </span>
            <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" as const }}
            />
          </div>
        </motion.div>

        {/* Quiz Step */}
        <div className="relative overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            >
              {/* Question */}
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 text-center mb-8 font-display">
                {currentQuestion.question}
              </h2>

              {/* Options Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                {currentQuestion.options.map((option) => {
                  const isSelected = answers[currentQuestion.id as keyof QuizAnswers] === option.id;
                  return (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.04, y: -4 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSelect(currentQuestion.id, option.id)}
                      className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                        isSelected
                          ? "border-violet-500 bg-violet-50 dark:bg-violet-950/40 shadow-lg shadow-violet-500/15"
                          : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:border-violet-300 dark:hover:border-violet-700"
                      }`}
                    >
                      {/* Selected indicator */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center"
                        >
                          <Check className="w-3.5 h-3.5 text-white" />
                        </motion.div>
                      )}

                      <span className="text-3xl block mb-3">{option.emoji}</span>
                      <span
                        className={`font-semibold text-sm ${
                          isSelected
                            ? "text-violet-700 dark:text-violet-300"
                            : "text-neutral-700 dark:text-neutral-300"
                        }`}
                      >
                        {option.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-between"
        >
          <button
            onClick={handleBack}
            disabled={step === 0}
            className="inline-flex items-center gap-2 text-neutral-500 dark:text-neutral-400 font-semibold px-5 py-3 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!isCurrentSelected}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-3.5 rounded-2xl font-semibold hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none group"
          >
            {step === totalSteps - 1 ? (
              <>
                <Sparkles className="w-5 h-5" />
                Find My Match
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-2xl text-center"
          >
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
