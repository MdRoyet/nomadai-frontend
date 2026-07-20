"use client";

import { useState, useMemo, Suspense } from "react";
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
} from "lucide-react";
import { toast } from "react-toastify";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthStore();

  const destinationId = searchParams.get("destinationId");
  const priceParam = searchParams.get("price");
  const titleParam = searchParams.get("title");
  const locationParam = searchParams.get("location");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const pricePerNight = Number(priceParam) || 0;

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [checkIn, checkOut]);

  const total = nights * pricePerNight * guests;

  const handleBooking = async () => {
    if (!user) {
      toast.info("Please login to book");
      router.push("/login?from=/booking" + window.location.search);
      return;
    }
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
        destinationId,
        checkIn,
        checkOut,
        guests,
        specialRequests,
      });
      toast.success("Booking confirmed!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (!destinationId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Book a Destination</h1>
          <p className="text-neutral-500 dark:text-neutral-400 mb-8">Search for a destination to book</p>
          <Link
            href="/explore"
            className="bg-gradient-to-r from-primary to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-emerald-700 transition-all"
          >
            Explore Destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back link */}
        <Link
          href={`/destinations/${destinationId}`}
          className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to destination
        </Link>

        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Destination Summary */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 p-6 shadow-sm">
              <h2 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">{titleParam}</h2>
              <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 text-sm">
                <MapPin className="w-4 h-4" /> {locationParam}
              </div>
            </div>

            {/* Dates */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 p-6 shadow-sm">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> Select Dates
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1">Check-in</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1">Check-out</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
              {nights > 0 && (
                <p className="text-sm text-primary mt-2 font-medium">{nights} night{nights > 1 ? "s" : ""}</p>
              )}
            </div>

            {/* Guests */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 p-6 shadow-sm">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" /> Guests
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-10 h-10 rounded-xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                >
                  -
                </button>
                <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100 w-12 text-center">{guests}</span>
                <button
                  onClick={() => setGuests(Math.min(10, guests + 1))}
                  className="w-10 h-10 rounded-xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Special Requests */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 p-6 shadow-sm">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" /> Special Requests
              </h3>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Any special requests or preferences..."
                rows={3}
                className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 p-6 shadow-sm sticky top-24">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" /> Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500 dark:text-neutral-400">Price per night</span>
                  <span className="text-neutral-900 dark:text-neutral-100 font-medium">${pricePerNight}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500 dark:text-neutral-400">Nights</span>
                  <span className="text-neutral-900 dark:text-neutral-100 font-medium">{nights || "—"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500 dark:text-neutral-400">Guests</span>
                  <span className="text-neutral-900 dark:text-neutral-100 font-medium">{guests}</span>
                </div>
                <div className="border-t border-neutral-100 dark:border-neutral-800 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">Total</span>
                    <span className="text-2xl font-bold text-primary">${total || "—"}</span>
                  </div>
                </div>
              </div>

              {!user ? (
                <Link
                  href={`/login?from=${encodeURIComponent("/booking" + window.location.search)}`}
                  className="block w-full bg-gradient-to-r from-primary to-emerald-600 text-white py-3.5 rounded-xl font-semibold text-center hover:from-primary-700 hover:to-emerald-700 transition-all shadow-lg shadow-primary/20"
                >
                  Login to Book
                </Link>
              ) : (
                <button
                  onClick={handleBooking}
                  disabled={submitting || nights <= 0}
                  className="w-full bg-gradient-to-r from-primary to-emerald-600 text-white py-3.5 rounded-xl font-semibold hover:from-primary-700 hover:to-emerald-700 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
