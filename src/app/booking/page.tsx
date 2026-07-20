"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  MessageSquare,
  CreditCard,
  Loader2,
  Search,
  Home,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "@/lib/api";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

function SearchDestinationForm({ onFound }: { onFound: (d: { id: string; price: number; title: string; location: string }) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ _id: string; title: string; price: number; location: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const { data } = await api.get(`/destinations?search=${encodeURIComponent(query.trim())}&page=1`);
      setResults(data.destinations ?? []);
    } catch {
      toast.error("Failed to search destinations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
          <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Find a Destination</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Search to start your booking</p>
        </div>
      </div>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          Search
        </button>
      </div>
      {results.length > 0 && (
        <div className="mt-4 space-y-2">
          {results.map((d) => (
            <button
              key={d._id}
              onClick={() => onFound({ id: d._id, price: d.price, title: d.title, location: d.location })}
              className="w-full text-left rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-600 dark:bg-slate-700 dark:hover:border-blue-500 dark:hover:bg-slate-600"
            >
              <p className="font-semibold text-slate-900 dark:text-white">{d.title}</p>
              <div className="mt-1 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {d.location}</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">${d.price}/night</span>
              </div>
            </button>
          ))}
        </div>
      )}
      {results.length === 0 && !loading && query.trim() && (
        <p className="mt-4 text-sm text-slate-400 dark:text-slate-500">No destinations found.</p>
      )}
    </div>
  );
}

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const destinationId = searchParams.get("destinationId");
  const priceParam = searchParams.get("price");
  const titleParam = searchParams.get("title");
  const locationParam = searchParams.get("location");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [destInfo, setDestInfo] = useState<{ id: string; price: number; title: string; location: string } | null>(null);

  useEffect(() => {
    if (destinationId && priceParam && titleParam && locationParam) {
      setDestInfo({
        id: destinationId,
        price: Number(priceParam),
        title: titleParam,
        location: locationParam,
      });
    }
  }, [destinationId, priceParam, titleParam, locationParam]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [checkIn, checkOut]);

  const totalPrice = useMemo(() => {
    if (!destInfo) return 0;
    return nights * destInfo.price * guests;
  }, [nights, destInfo, guests]);

  const handleBooking = async () => {
    if (!destInfo) return;
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }
    if (nights <= 0) {
      toast.error("Check-out must be after check-in");
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/bookings", {
        destinationId: destInfo.id,
        checkIn,
        checkOut,
        guests,
        specialRequests,
      });
      toast.success("Booking confirmed successfully!");
      router.push("/dashboard/bookings");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  // No destination in URL → show search
  if (!destInfo) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp}>
            <Link href="/explore" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
              <ArrowLeft className="h-4 w-4" /> Back to Explore
            </Link>
            <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">Book a Destination</h1>
            <p className="mb-8 text-slate-500 dark:text-slate-400">Select a destination below to start your booking.</p>
            <SearchDestinationForm
              onFound={(d) => {
                router.push(`/booking?destinationId=${d.id}&price=${d.price}&title=${encodeURIComponent(d.title)}&location=${encodeURIComponent(d.location)}`);
              }}
            />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp}>
          <Link
            href={`/destinations/${destInfo.id}`}
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
          >
            <ArrowLeft className="h-4 w-4" /> Back to destination
          </Link>
          <h1 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">Complete Your Booking</h1>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left: Booking Form */}
          <div className="space-y-6 lg:col-span-2">
            {/* Destination Summary */}
            <motion.div variants={fadeInUp} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30">
                  <Home className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">{destInfo.title}</h2>
                  <p className="mt-1 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                    <MapPin className="h-3.5 w-3.5" /> {destInfo.location}
                  </p>
                  <p className="mt-2 font-bold text-emerald-600 dark:text-emerald-400">${destInfo.price} /night</p>
                </div>
              </div>
            </motion.div>

            {/* Dates */}
            <motion.div variants={fadeInUp} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <Calendar className="h-4 w-4" /> Trip Dates
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Check-in</label>
                  <input
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Check-out</label>
                  <input
                    type="date"
                    min={checkIn || today}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                  />
                </div>
              </div>
            </motion.div>

            {/* Guests */}
            <motion.div variants={fadeInUp} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <Users className="h-4 w-4" /> Guests
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-lg font-bold text-slate-600 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                >
                  -
                </button>
                <span className="min-w-[3rem] text-center text-2xl font-bold text-slate-900 dark:text-white">{guests}</span>
                <button
                  onClick={() => setGuests((g) => Math.min(10, g + 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-lg font-bold text-slate-600 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                >
                  +
                </button>
              </div>
            </motion.div>

            {/* Special Requests */}
            <motion.div variants={fadeInUp} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <MessageSquare className="h-4 w-4" /> Special Requests
              </h3>
              <textarea
                rows={3}
                placeholder="Any special requirements or preferences..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500"
              />
            </motion.div>
          </div>

          {/* Right: Order Summary (sticky) */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.div variants={fadeInUp} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <CreditCard className="h-4 w-4" /> Order Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>Destination</span>
                  <span className="font-medium text-slate-900 dark:text-white">{destInfo.title}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>Price per night</span>
                  <span className="font-medium text-slate-900 dark:text-white">${destInfo.price}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>Number of nights</span>
                  <span className="font-medium text-slate-900 dark:text-white">{nights}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>Guests</span>
                  <span className="font-medium text-slate-900 dark:text-white">{guests}</span>
                </div>

                <div className="border-t border-slate-200 pt-3 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">Total</span>
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">${totalPrice.toLocaleString()}</span>
                  </div>
                  {nights > 0 && (
                    <p className="mt-1 text-right text-xs text-slate-400 dark:text-slate-500">
                      ${destInfo.price} x {nights} nights x {guests} guest{guests > 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={submitting || nights <= 0}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
                ) : (
                  "Book Now"
                )}
              </button>

              <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
                Free cancellation up to 48 hours before check-in
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
