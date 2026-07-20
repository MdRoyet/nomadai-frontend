"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Shield,
  Calendar,
  CreditCard,
  Heart,
  MapPin,
  Star,
  Trash2,
  X,
  Loader2,
  ExternalLink,
  RefreshCw,
  ClipboardList,
  DollarSign,
  Compass,
  BookOpen,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariant = {
  initial: { opacity: 0, y: 16, scale: 0.97 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

type Tab = "overview" | "bookings" | "favorites" | "itineraries";

interface Booking {
  _id: string;
  destination: { _id: string; title: string; location: string; images: string[]; price: number };
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

interface Favorite {
  _id: string;
  destination: { _id: string; title: string; location: string; images: string[]; price: number; rating: number };
}

interface Itinerary {
  _id: string;
  title: string;
  destination: { _id: string; title: string };
  startDate: string;
  endDate: string;
  days: { _id: string }[];
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  confirmed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-xl bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 ${className}`} />
  );
}

function StatCard({ title, value, icon: Icon, iconBg, iconColor, prefix = "" }: {
  title: string; value: number; icon: React.ElementType; iconBg: string; iconColor: string; prefix?: string;
}) {
  return (
    <motion.div variants={cardVariant} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-1 font-mono text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {prefix}{value.toLocaleString()}
          </p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [tab, setTab] = useState<Tab>("overview");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [bRes, fRes, iRes] = await Promise.allSettled([
        api.get("/bookings/my"),
        api.get("/favorites/my"),
        api.get("/itineraries/my"),
      ]);
      if (bRes.status === "fulfilled") setBookings(bRes.value.data.bookings ?? bRes.value.data ?? []);
      if (fRes.status === "fulfilled") setFavorites(fRes.value.data.favorites ?? fRes.value.data ?? []);
      if (iRes.status === "fulfilled") setItineraries(iRes.value.data.itineraries ?? iRes.value.data ?? []);
    } catch {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const cancelBooking = async (id: string) => {
    setCancellingId(id);
    try {
      await api.patch(`/bookings/${id}/cancel`);
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status: "cancelled" as const } : b)));
      toast.success("Booking cancelled");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to cancel booking");
    } finally {
      setCancellingId(null);
    }
  };

  const removeFavorite = async (favId: string) => {
    try {
      await api.delete(`/favorites/${favId}`);
      setFavorites((prev) => prev.filter((f) => f._id !== favId));
      toast.success("Removed from favorites");
    } catch {
      toast.error("Failed to remove from favorites");
    }
  };

  const deleteItinerary = async (id: string) => {
    try {
      await api.delete(`/itineraries/${id}`);
      setItineraries((prev) => prev.filter((i) => i._id !== id));
      toast.success("Itinerary deleted");
    } catch {
      toast.error("Failed to delete itinerary");
    }
  };

  const totalSpent = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const recentBookings = [...bookings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "overview", label: "Overview", icon: ClipboardList },
    { key: "bookings", label: "My Bookings", icon: CreditCard },
    { key: "favorites", label: "Favorites", icon: Heart },
    { key: "itineraries", label: "My Itineraries", icon: BookOpen },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <Skeleton className="mb-8 h-24 w-full" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-28" />)}
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div {...fadeInUp} className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-3xl font-bold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{user?.name || "User"}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {user?.email}</span>
                <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5" /> {user?.role || "user"}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Member since {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
              </div>
            </div>
            <button onClick={fetchData} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600">
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div {...fadeInUp} className="mb-8 flex gap-1 rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                tab === t.key
                  ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              <t.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {/* ── Overview ─────────────────────────────────────── */}
          {tab === "overview" && (
            <div className="space-y-8">
              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Bookings" value={bookings.length} icon={ClipboardList} iconBg="bg-blue-50 dark:bg-blue-900/30" iconColor="text-blue-600 dark:text-blue-400" />
                <StatCard title="Total Spent" value={totalSpent} icon={DollarSign} iconBg="bg-emerald-50 dark:bg-emerald-900/30" iconColor="text-emerald-600 dark:text-emerald-400" prefix="$" />
                <StatCard title="Favorites" value={favorites.length} icon={Heart} iconBg="bg-rose-50 dark:bg-rose-900/30" iconColor="text-rose-600 dark:text-rose-400" />
                <StatCard title="Itineraries" value={itineraries.length} icon={Compass} iconBg="bg-purple-50 dark:bg-purple-900/30" iconColor="text-purple-600 dark:text-purple-400" />
              </motion.div>

              <motion.div variants={fadeInUp} className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Recent Bookings</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-700/50">
                        <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Destination</th>
                        <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Dates</th>
                        <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Total</th>
                        <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                      {recentBookings.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-sm text-slate-400">No bookings yet</td>
                        </tr>
                      ) : recentBookings.map((b) => (
                        <tr key={b._id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/30">
                          <td className="whitespace-nowrap px-6 py-3 font-medium text-slate-900 dark:text-white">{b.destination?.title}</td>
                          <td className="whitespace-nowrap px-6 py-3 text-slate-500 dark:text-slate-400">
                            {new Date(b.checkIn).toLocaleDateString()} - {new Date(b.checkOut).toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-6 py-3 font-mono font-semibold text-slate-900 dark:text-white">${b.totalPrice?.toLocaleString()}</td>
                          <td className="px-6 py-3">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[b.status] || STATUS_STYLES.pending}`}>
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          )}

          {/* ── My Bookings ──────────────────────────────────── */}
          {tab === "bookings" && (
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-800">
                  <CreditCard className="mx-auto mb-4 h-12 w-12 text-slate-300 dark:text-slate-600" />
                  <p className="text-sm text-slate-500 dark:text-slate-400">No bookings yet. Explore destinations to book your first trip!</p>
                </div>
              ) : bookings.map((b) => (
                <motion.div key={b._id} variants={cardVariant} initial="initial" animate="animate" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-slate-900 dark:text-white">{b.destination?.title}</h4>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[b.status] || STATUS_STYLES.pending}`}>
                          {b.status}
                        </span>
                      </div>
                      <p className="mt-1 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                        <MapPin className="h-3.5 w-3.5" /> {b.destination?.location}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {new Date(b.checkIn).toLocaleDateString()} - {new Date(b.checkOut).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {b.guests} guest{b.guests > 1 ? "s" : ""}</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">${b.totalPrice?.toLocaleString()}</span>
                      </div>
                    </div>
                    {(b.status === "pending" || b.status === "confirmed") && (
                      <button
                        onClick={() => cancelBooking(b._id)}
                        disabled={cancellingId === b._id}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                      >
                        {cancellingId === b._id ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
                        Cancel
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* ── Favorites ────────────────────────────────────── */}
          {tab === "favorites" && (
            <div className="space-y-4">
              {favorites.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-800">
                  <Heart className="mx-auto mb-4 h-12 w-12 text-slate-300 dark:text-slate-600" />
                  <p className="text-sm text-slate-500 dark:text-slate-400">No favorites yet. Browse destinations and save the ones you love!</p>
                </div>
              ) : (
                <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {favorites.map((fav) => (
                    <motion.div key={fav._id} variants={cardVariant} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
                      <div className="relative h-48 bg-slate-100 dark:bg-slate-700">
                        {fav.destination?.images?.[0] ? (
                          <img src={fav.destination.images[0]} alt={fav.destination.title} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <MapPin className="h-12 w-12 text-slate-300 dark:text-slate-600" />
                          </div>
                        )}
                        <button
                          onClick={() => removeFavorite(fav._id)}
                          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-sm transition hover:bg-white hover:text-red-600 dark:bg-slate-800/90 dark:hover:bg-slate-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-slate-900 dark:text-white">{fav.destination?.title}</h4>
                        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                          <MapPin className="h-3.5 w-3.5" /> {fav.destination?.location}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">${fav.destination?.price}/night</span>
                          <span className="flex items-center gap-1 text-sm text-amber-500">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            {fav.destination?.rating?.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          )}

          {/* ── My Itineraries ──────────────────────────────── */}
          {tab === "itineraries" && (
            <div className="space-y-4">
              {itineraries.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-800">
                  <BookOpen className="mx-auto mb-4 h-12 w-12 text-slate-300 dark:text-slate-600" />
                  <p className="text-sm text-slate-500 dark:text-slate-400">No itineraries yet. Plan your next trip!</p>
                </div>
              ) : itineraries.map((itin) => {
                const days = Math.max(1, Math.ceil((new Date(itin.endDate).getTime() - new Date(itin.startDate).getTime()) / (1000 * 60 * 60 * 24)));
                return (
                  <motion.div key={itin._id} variants={cardVariant} initial="initial" animate="animate" className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800 sm:flex-row sm:items-center">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-900/30">
                      <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white">{itin.title}</h4>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {itin.destination?.title}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {new Date(itin.startDate).toLocaleDateString()} - {new Date(itin.endDate).toLocaleDateString()}</span>
                        <span>{days} day{days > 1 ? "s" : ""}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/itineraries/${itin._id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> View
                      </Link>
                      <button
                        onClick={() => deleteItinerary(itin._id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
