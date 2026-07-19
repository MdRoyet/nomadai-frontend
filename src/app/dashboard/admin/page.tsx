"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  DollarSign,
  MapPin,
  Users,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Calendar,
  Star,
  BarChart3,
  Activity,
  Target,
  Crown,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";

// ─── Color Palette ───────────────────────────────────────────────────────────
const COLORS = {
  teal: "#0d9488",
  emerald: "#10b981",
  amber: "#f59e0b",
  indigo: "#4338ca",
  rose: "#f43f5e",
  violet: "#8b5cf6",
  cyan: "#06b6d4",
  slate: "#475569",
};

const CATEGORY_COLORS = [
  COLORS.teal,
  COLORS.amber,
  COLORS.indigo,
  COLORS.rose,
  COLORS.violet,
  COLORS.cyan,
  COLORS.emerald,
  "#ec4899",
  "#14b8a6",
  "#6366f1",
];

// ─── Types ───────────────────────────────────────────────────────────────────
interface AdminStats {
  overview: {
    totalDestinations: number;
    totalUsers: number;
    totalAdmins: number;
    totalRevenue: number;
    avgPrice: number;
    minPrice: number;
    maxPrice: number;
  };
  categoryStats: { _id: string; count: number; avgPrice: number; avgRating: number }[];
  ratingDistribution: { _id: number; count: number }[];
  recentDestinations: {
    title: string;
    price: number;
    category: string;
    rating: number;
    location: string;
    createdAt: string;
  }[];
  recentUsers: { name: string; email: string; role: string; createdAt: string }[];
  monthlyGrowth: { month: string; count: number; revenue: number }[];
  locationStats: { _id: string; count: number; avgPrice: number }[];
  topRated: { title: string; rating: number; price: number; location: string; category: string }[];
  priceByCategory: { _id: string; min: number; max: number; avg: number }[];
}

// ─── Animation Variants ──────────────────────────────────────────────────────
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

// ─── Skeleton Component ──────────────────────────────────────────────────────
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 ${className}`}
    />
  );
}

function KPISkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
      <Skeleton className="mb-4 h-5 w-40" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

// ─── Custom Tooltip ──────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-xl dark:border-slate-700 dark:bg-slate-800">
      <p className="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="font-mono text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}: {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
        </p>
      ))}
    </div>
  );
}

// ─── KPI Card ────────────────────────────────────────────────────────────────
function KPICard({
  title,
  value,
  change,
  icon: Icon,
  iconBg,
  iconColor,
  prefix = "",
  suffix = "",
}: {
  title: string;
  value: number;
  change?: number;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  prefix?: string;
  suffix?: string;
}) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <motion.div variants={cardVariants} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="font-mono text-3xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
            {prefix}
            {value.toLocaleString()}
            {suffix}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1">
              {isPositive ? (
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              ) : isNegative ? (
                <TrendingDown className="h-3.5 w-3.5 text-rose-500" />
              ) : null}
              <span
                className={`text-xs font-semibold ${
                  isPositive ? "text-emerald-600 dark:text-emerald-400" : isNegative ? "text-rose-600 dark:text-rose-400" : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {isPositive ? "+" : ""}
                {change}%
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">vs last month</span>
            </div>
          )}
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Chart Card Wrapper ──────────────────────────────────────────────────────
function ChartCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 ${className}`}
    >
      <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get("/admin/stats");
      setStats(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // ─── Format helpers ──────────────────────────────────────────────────────
  const formatCurrency = (n: number) => `$${n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  const formatCompact = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toString();
  };

  // ─── Compute data from API ──────────────────────────────────────────────
  const monthlyRevenue = (stats?.monthlyGrowth ?? []).map((m) => ({
    month: m.month,
    revenue: m.revenue,
  }));

  const monthlyDestinations = (stats?.monthlyGrowth ?? []).map((m) => ({
    month: m.month,
    count: m.count,
  }));

  const categoryPieData = (stats?.categoryStats ?? []).map((c) => ({
    name: c._id,
    value: c.count,
  }));

  const ratingBarData = (stats?.ratingDistribution ?? [])
    .sort((a, b) => a._id - b._id)
    .map((r) => ({
      rating: `${r._id} Stars`,
      count: r.count,
    }));

  const avgPriceByCategory = (stats?.priceByCategory ?? []).map((p) => ({
    category: p._id,
    min: p.min,
    max: p.max,
    avg: p.avg,
  }));

  const topLocations = (stats?.locationStats ?? [])
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .map((l) => ({
      location: l._id,
      count: l.count,
      avgPrice: l.avgPrice,
    }));

  // ─── Revenue change estimate ────────────────────────────────────────────
  const mg = stats?.monthlyGrowth ?? [];
  const revenueChange =
    mg.length >= 2
      ? Math.round(((mg[mg.length - 1].revenue - mg[mg.length - 2].revenue) / (mg[mg.length - 2].revenue || 1)) * 100)
      : undefined;

  // ─── Date range label ───────────────────────────────────────────────────
  const now = new Date();
  const dateLabel = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // ─── Error state ────────────────────────────────────────────────────────
  if (error && !loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="rounded-2xl border border-red-200 bg-white p-10 text-center shadow-lg dark:border-red-900/50 dark:bg-slate-800">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/30">
            <Activity className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">Failed to load dashboard</h2>
          <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">{error}</p>
          <button
            onClick={fetchStats}
            className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        {/* ─── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Overview of your platform performance
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <Calendar className="h-4 w-4 text-slate-400" />
              {dateLabel}
            </div>
            <button
              onClick={fetchStats}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </motion.div>

        {/* ─── KPI Cards ──────────────────────────────────────────────────── */}
        {loading && !stats ? (
          <KPISkeleton />
        ) : (
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <KPICard
              title="Total Revenue"
              value={stats?.overview.totalRevenue ?? 0}
              change={revenueChange}
              icon={DollarSign}
              iconBg="bg-emerald-50 dark:bg-emerald-900/30"
              iconColor="text-emerald-600 dark:text-emerald-400"
              prefix="$"
            />
            <KPICard
              title="Total Destinations"
              value={stats?.overview.totalDestinations ?? 0}
              icon={MapPin}
              iconBg="bg-blue-50 dark:bg-blue-900/30"
              iconColor="text-blue-600 dark:text-blue-400"
            />
            <KPICard
              title="Total Users"
              value={stats?.overview.totalUsers ?? 0}
              icon={Users}
              iconBg="bg-violet-50 dark:bg-violet-900/30"
              iconColor="text-violet-600 dark:text-violet-400"
            />
            <KPICard
              title="Average Price"
              value={stats?.overview.avgPrice ?? 0}
              icon={Target}
              iconBg="bg-amber-50 dark:bg-amber-900/30"
              iconColor="text-amber-600 dark:text-amber-400"
              prefix="$"
            />
          </motion.div>
        )}

        {/* ─── Revenue & Growth Charts ────────────────────────────────────── */}
        {loading && !stats ? (
          <div className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ChartSkeleton />
            <ChartSkeleton />
          </div>
        ) : (
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Monthly Revenue Area Chart */}
            <ChartCard title="Monthly Revenue">
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={monthlyRevenue}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.emerald} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS.emerald} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: number) => `$${formatCompact(v)}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke={COLORS.emerald}
                    strokeWidth={2.5}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Monthly Destinations Bar Chart */}
            <ChartCard title="Monthly New Destinations">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={monthlyDestinations}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="New Destinations" fill={COLORS.indigo} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </motion.div>
        )}

        {/* ─── Distribution Charts ────────────────────────────────────────── */}
        {loading && !stats ? (
          <div className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ChartSkeleton />
            <ChartSkeleton />
          </div>
        ) : (
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Category Donut Chart */}
            <ChartCard title="Destinations by Category">
              <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
                      data={categoryPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={120}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {categoryPieData.map((_, i) => (
                        <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-3 md:flex-col">
                  {categoryPieData.map((c, i) => (
                    <div key={c.name} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }} />
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                        {c.name}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                        {c.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ChartCard>

            {/* Rating Distribution Bar Chart */}
            <ChartCard title="Rating Distribution">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={ratingBarData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="rating"
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    tickLine={false}
                    axisLine={false}
                    width={65}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="Count" fill={COLORS.amber} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </motion.div>
        )}

        {/* ─── Price Analytics ────────────────────────────────────────────── */}
        {loading && !stats ? (
          <div className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ChartSkeleton />
            <ChartSkeleton />
          </div>
        ) : (
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Avg Price by Category */}
            <ChartCard title="Average Price by Category">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={avgPriceByCategory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: number) => `$${v}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="avg" name="Avg Price" fill={COLORS.teal} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Price Range by Category */}
            <ChartCard title="Price Range by Category">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={avgPriceByCategory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: number) => `$${v}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="min" name="Min" fill={COLORS.cyan} radius={[2, 2, 0, 0]} />
                  <Bar dataKey="avg" name="Avg" fill={COLORS.emerald} radius={[2, 2, 0, 0]} />
                  <Bar dataKey="max" name="Max" fill={COLORS.rose} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </motion.div>
        )}

        {/* ─── Location Analytics ─────────────────────────────────────────── */}
        {loading && !stats ? (
          <div className="mb-8">
            <ChartSkeleton />
          </div>
        ) : (
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="mb-8">
            <ChartCard title="Top 10 Locations by Destination Count">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={topLocations} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="location"
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    tickLine={false}
                    axisLine={false}
                    width={100}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="Destinations" radius={[0, 4, 4, 0]}>
                    {topLocations.map((_, i) => (
                      <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </motion.div>
        )}

        {/* ─── Recent Activity ────────────────────────────────────────────── */}
        {loading && !stats ? (
          <div className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ChartSkeleton />
            <ChartSkeleton />
          </div>
        ) : (
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Recent Destinations Table */}
            <motion.div
              variants={cardVariants}
              className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Recent Destinations
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-700/50">
                      <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Title
                      </th>
                      <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Category
                      </th>
                      <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Price
                      </th>
                      <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {(stats?.recentDestinations ?? []).slice(0, 7).map((d, i) => (
                      <tr key={i} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/30">
                        <td className="whitespace-nowrap px-6 py-3 font-medium text-slate-900 dark:text-white">
                          {d.title}
                        </td>
                        <td className="px-6 py-3">
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                            {d.category}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-3 font-mono font-semibold text-slate-900 dark:text-white">
                          ${d.price?.toLocaleString()}
                        </td>
                        <td className="px-6 py-3">
                          <span className="inline-flex items-center gap-1 text-amber-500">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <span className="font-mono text-xs font-bold">{d.rating?.toFixed(1)}</span>
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-3 text-slate-500 dark:text-slate-400">
                          {new Date(d.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                    {(!stats?.recentDestinations || stats.recentDestinations.length === 0) && (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-400">
                          No recent destinations
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Recent Users Table */}
            <motion.div
              variants={cardVariants}
              className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Recent Users
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-700/50">
                      <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Name
                      </th>
                      <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Email
                      </th>
                      <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Role
                      </th>
                      <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {(stats?.recentUsers ?? []).slice(0, 7).map((u, i) => (
                      <tr key={i} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/30">
                        <td className="whitespace-nowrap px-6 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                              {u.name?.charAt(0)?.toUpperCase()}
                            </div>
                            <span className="font-medium text-slate-900 dark:text-white">{u.name}</span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-3 text-slate-500 dark:text-slate-400">
                          {u.email}
                        </td>
                        <td className="px-6 py-3">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              u.role === "admin"
                                ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400"
                                : "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {u.role === "admin" && <Shield className="h-3 w-3" />}
                            {u.role}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-3 text-slate-500 dark:text-slate-400">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                    {(!stats?.recentUsers || stats.recentUsers.length === 0) && (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-sm text-slate-400">
                          No recent users
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ─── Top Rated Destinations ─────────────────────────────────────── */}
        {loading && !stats ? (
          <div className="mb-8">
            <ChartSkeleton />
          </div>
        ) : (
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="mb-8">
            <ChartCard title="Top Rated Destinations">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {(stats?.topRated ?? []).slice(0, 5).map((d, i) => (
                  <motion.div
                    key={i}
                    variants={cardVariants}
                    className="group relative overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-700 dark:from-slate-800 dark:to-slate-800/80 dark:hover:border-slate-600"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white dark:bg-white dark:text-slate-900">
                        {i + 1}
                      </span>
                      {i === 0 && <Crown className="h-4 w-4 text-amber-500" />}
                    </div>
                    <h4 className="mb-1 line-clamp-2 text-sm font-bold text-slate-900 dark:text-white">
                      {d.title}
                    </h4>
                    <div className="mb-2 flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-mono text-sm font-bold text-amber-500">{d.rating?.toFixed(1)}</span>
                    </div>
                    <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">{d.location}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                        ${d.price?.toLocaleString()}
                      </span>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                        {d.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
                {(!stats?.topRated || stats.topRated.length === 0) && (
                  <div className="col-span-full py-8 text-center text-sm text-slate-400">
                    No top rated destinations
                  </div>
                )}
              </div>
            </ChartCard>
          </motion.div>
        )}
      </div>
    </div>
  );
}
