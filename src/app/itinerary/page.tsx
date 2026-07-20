"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  Users,
  DollarSign,
  Sparkles,
  Loader2,
  MapPin,
  Save,
  ChevronRight,
  Clock,
  Compass,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "@/lib/api";

interface Destination {
  _id: string;
  name: string;
  country: string;
  description?: string;
  image?: string;
}

interface ItineraryActivity {
  time: string;
  title: string;
  description: string;
}

interface ItineraryDay {
  day: number;
  title: string;
  activities: ItineraryActivity[];
  location: string;
  notes: string;
}

const LOADING_MESSAGES = [
  "Crafting your perfect adventure...",
  "Scouting hidden gems...",
  "Mapping out the best routes...",
  "Curating unforgettable experiences...",
  "Packing virtual bags...",
];

const STEPS = [
  { label: "Destination", icon: MapPin },
  { label: "Details", icon: Calendar },
  { label: "Generate", icon: Sparkles },
  { label: "Itinerary", icon: Compass },
];

export default function ItineraryPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [destinationQuery, setDestinationQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Destination[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState("");
  const [generating, setGenerating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchDestinations = useCallback(async () => {
    if (!destinationQuery.trim()) return;
    setSearching(true);
    try {
      const res = await api.get(
        `/destinations?search=${encodeURIComponent(destinationQuery)}`
      );
      setSearchResults(res.data.destinations || res.data || []);
    } catch {
      toast.error("Failed to search destinations");
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  }, [destinationQuery]);

  const selectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    setCurrentStep(2);
  };

  const parseItineraryFromAI = (response: string): ItineraryDay[] => {
    const days: ItineraryDay[] = [];
    const dayBlocks = response.split(/(?:^|\n)##?\s*(?:Day|day)\s*(\d+)/i);

    if (dayBlocks.length < 2) {
      const lines = response.split("\n").filter((l) => l.trim());
      return [
        {
          day: 1,
          title: "Your Itinerary",
          activities: lines.map((line, i) => ({
            time: `${9 + Math.floor(i * 1.5)}:00`,
            title: line.replace(/^[-*•]\s*/, "").slice(0, 60),
            description: line.replace(/^[-*•]\s*/, ""),
          })),
          location: selectedDestination?.name || "",
          notes: "",
        },
      ];
    }

    for (let i = 1; i < dayBlocks.length; i += 2) {
      const dayNum = parseInt(dayBlocks[i]);
      const block = dayBlocks[i + 1] || "";
      const lines = block.split("\n").filter((l) => l.trim());

      let title = lines[0]?.replace(/^[-*]\s*/, "").trim() || `Day ${dayNum}`;
      const locationMatch = block.match(/\*\*Location:\*\*\s*(.+)/i);
      const location = locationMatch?.[1]?.trim() || selectedDestination?.name || "";
      const notesMatch = block.match(/\*\*Notes?:\*\*\s*(.+)/i);
      const notes = notesMatch?.[1]?.trim() || "";

      const activityLines = lines.slice(1).filter(
        (l) => !l.match(/\*\*(?:Location|Note)/i)
      );

      const activities: ItineraryActivity[] = activityLines.map(
        (line, idx) => {
          const cleaned = line.replace(/^[-*•]\s*/, "");
          const timeMatch = cleaned.match(/^(\d{1,2}:\d{2}\s*(?:AM|PM)?)/i);
          return {
            time: timeMatch?.[1] || `${9 + idx}:00`,
            title: cleaned.replace(/^\d{1,2}:\d{2}\s*(?:AM|PM)?\s*[-–—:]\s*/, "").split(".")[0],
            description: cleaned,
          };
        }
      );

      days.push({ day: dayNum, title, activities, location, notes });
    }

    return days;
  };

  const generateItinerary = async () => {
    if (!selectedDestination) return;
    setGenerating(true);
    setError(null);
    setLoadingMessage(LOADING_MESSAGES[0]);

    let msgIdx = 0;
    const interval = setInterval(() => {
      msgIdx = (msgIdx + 1) % LOADING_MESSAGES.length;
      setLoadingMessage(LOADING_MESSAGES[msgIdx]);
    }, 3000);

    try {
      const days = Math.ceil(
        (new Date(endDate).getTime() - new Date(startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      ) || 3;

      const prompt = `Create a detailed ${days}-day travel itinerary for ${selectedDestination.name}, ${selectedDestination.country}. 
Travelers: ${travelers}. Budget: ${budget || "flexible"}.
Dates: ${startDate || "flexible"} to ${endDate || "flexible"}.
For each day, use this format:
## Day N
**Title**
- Time: Activity title
  Activity description
**Location**: specific area/neighborhood
**Notes**: practical tips
Include specific attractions, restaurants, and activities. Be detailed and practical.`;

      const res = await api.post("/ai/chat", { message: prompt });
      const content =
        res.data?.reply || res.data?.message || res.data?.response || "";

      if (!content) {
        throw new Error("No itinerary content received from AI");
      }

      const daysParsed = parseItineraryFromAI(content);
      setItinerary(daysParsed);
      setCurrentStep(4);
      toast.success("Itinerary generated!");
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to generate itinerary";
      setError(msg);
      toast.error(msg);
    } finally {
      clearInterval(interval);
      setGenerating(false);
    }
  };

  const saveItinerary = async () => {
    if (!itinerary.length) return;
    setSaving(true);
    try {
      await api.post("/itineraries", {
        destination: selectedDestination?._id,
        destinationName: selectedDestination?.name,
        startDate,
        endDate,
        travelers,
        budget,
        itinerary,
      });
      toast.success("Itinerary saved!");
    } catch {
      toast.error("Failed to save itinerary");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-white mb-2"
          >
            AI Itinerary Builder
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="text-blue-100 text-lg"
          >
            Let AI craft your perfect trip, day by day
          </motion.p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-10">
          {STEPS.map((step, i) => {
            const StepIcon = step.icon;
            const active = currentStep === i + 1;
            const done = currentStep > i + 1;
            return (
              <div key={step.label} className="flex items-center flex-1 last:flex-none">
                <motion.div
                  animate={{ scale: active ? 1.1 : 1 }}
                  className={`flex flex-col items-center gap-1 ${
                    active
                      ? "text-blue-600 dark:text-blue-400"
                      : done
                        ? "text-green-500 dark:text-green-400"
                        : "text-gray-400 dark:text-gray-600"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      active
                        ? "bg-blue-100 dark:bg-blue-900/50"
                        : done
                          ? "bg-green-100 dark:bg-green-900/50"
                          : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    {done ? "✓" : i + 1}
                  </div>
                  <span className="text-xs font-medium hidden sm:block">
                    {step.label}
                  </span>
                </motion.div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 mx-2 h-px bg-gray-200 dark:bg-gray-700 mt-5" />
                )}
              </div>
            );
          })}
        </div>

        {/* Steps Content */}
        <AnimatePresence mode="wait">
          {/* Step 1: Destination */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                Where do you want to go?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
                Search for a destination to start building your itinerary
              </p>

              <div className="flex gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={destinationQuery}
                    onChange={(e) => setDestinationQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && searchDestinations()}
                    placeholder="Search destinations..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <button
                  onClick={searchDestinations}
                  disabled={searching || !destinationQuery.trim()}
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  {searching ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  Search
                </button>
              </div>

              {searchResults.length > 0 && (
                <div className="space-y-2">
                  {searchResults.map((dest) => (
                    <motion.button
                      key={dest._id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => selectDestination(dest)}
                      className="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {dest.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {dest.country}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {searchResults.length === 0 && !searching && destinationQuery && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No destinations found. Try a different search.
                </p>
              )}
            </motion.div>
          )}

          {/* Step 2: Trip Details */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                Trip Details
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
                {selectedDestination?.name},{" "}
                {selectedDestination?.country} &mdash; tell us more
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Travelers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={travelers}
                      onChange={(e) => setTravelers(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Budget (optional)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="e.g. $1500 or flexible"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Generate */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8 text-center"
            >
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Ready to Generate
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-2 text-sm">
                {selectedDestination?.name}, {selectedDestination?.country}
              </p>
              {startDate && endDate && (
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                  {startDate} to {endDate} &middot; {travelers} traveler{travelers > 1 ? "s" : ""}
                  {budget && ` \u00b7 Budget: ${budget}`}
                </p>
              )}

              {error && (
                <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 p-3 rounded-xl mb-4 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {generating ? (
                <div className="py-8">
                  <Loader2 className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-spin mx-auto mb-4" />
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    {loadingMessage}
                  </p>
                </div>
              ) : (
                <div className="flex gap-3 justify-center mt-6">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={generateItinerary}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg shadow-blue-500/25"
                  >
                    <Sparkles className="w-4 h-4" />
                    Generate Itinerary
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 4: Display */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Your Itinerary
                </h2>
                <button
                  onClick={saveItinerary}
                  disabled={saving}
                  className="px-5 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Itinerary
                </button>
              </div>

              {/* Timeline */}
              <div className="relative pl-8 md:pl-12">
                <div className="absolute left-3 md:left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />

                <div className="space-y-6">
                  {itinerary.map((day, idx) => (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: idx * 0.1,
                        ease: [0.25, 0.1, 0.25, 1] as const,
                      }}
                      className="relative"
                    >
                      {/* Timeline dot */}
                      <div className="absolute -left-8 md:-left-12 top-4 w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-400 border-4 border-gray-50 dark:border-gray-950 flex items-center justify-center">
                        <span className="text-[10px] text-white font-bold">
                          {day.day}
                        </span>
                      </div>

                      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              Day {day.day}: {day.title}
                            </h3>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                <MapPin className="w-3 h-3" />
                                {day.location}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {day.activities.map((activity, aIdx) => (
                            <div
                              key={aIdx}
                              className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                            >
                              <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-mono whitespace-nowrap pt-0.5">
                                <Clock className="w-3 h-3" />
                                {activity.time}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {activity.title}
                                </p>
                                {activity.description !== activity.title && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                    {activity.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {day.notes && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
                            {day.notes}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setItinerary([]);
                    setSelectedDestination(null);
                  }}
                  className="px-5 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors"
                >
                  Start Over
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
