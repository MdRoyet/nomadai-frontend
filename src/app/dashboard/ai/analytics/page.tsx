"use client";

import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  ComposedChart,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  RadialBarChart,
  RadialBar,
} from "recharts";
import {
  TrendingUp,
  MapPin,
  Users,
  Calendar,
  Star,
  BarChart3,
  Activity,
  Target,
} from "lucide-react";

// Color palette
const COLORS = {
  primary: "#0d9488",
  teal: "#14b8a6",
  amber: "#f59e0b",
  indigo: "#4338ca",
  rose: "#f43f5e",
  violet: "#8b5cf6",
  cyan: "#06b6d4",
  emerald: "#10b981",
};

const CATEGORY_COLORS = [
  COLORS.primary,
  COLORS.amber,
  COLORS.indigo,
  COLORS.rose,
  COLORS.violet,
  COLORS.cyan,
  COLORS.emerald,
  COLORS.teal,
];

// Mock data
const revenueData = [
  { month: "Jan", revenue: 4200, lastYear: 3800 },
  { month: "Feb", revenue: 4800, lastYear: 4100 },
  { month: "Mar", revenue: 5500, lastYear: 4500 },
  { month: "Apr", revenue: 5100, lastYear: 4800 },
  { month: "May", revenue: 6200, lastYear: 5100 },
  { month: "Jun", revenue: 7500, lastYear: 5800 },
  { month: "Jul", revenue: 8200, lastYear: 6200 },
  { month: "Aug", revenue: 7800, lastYear: 6500 },
  { month: "Sep", revenue: 6800, lastYear: 5900 },
  { month: "Oct", revenue: 5900, lastYear: 5200 },
  { month: "Nov", revenue: 5200, lastYear: 4600 },
  { month: "Dec", revenue: 6100, lastYear: 5400 },
];

const categoryData = [
  { category: "Beach", count: 1245, color: COLORS.primary },
  { category: "Mountain", count: 982, color: COLORS.amber },
  { category: "City", count: 1567, color: COLORS.indigo },
  { category: "Island", count: 743, color: COLORS.rose },
  { category: "Countryside", count: 521, color: COLORS.violet },
  { category: "Desert", count: 387, color: COLORS.cyan },
];

const userGrowthData = [
  { month: "Jan", total: 12400, active: 8200, newSignups: 1200 },
  { month: "Feb", total: 13100, active: 8600, newSignups: 1350 },
  { month: "Mar", total: 14200, active: 9100, newSignups: 1520 },
  { month: "Apr", total: 15800, active: 9800, newSignups: 1680 },
  { month: "May", total: 17200, active: 10400, newSignups: 1750 },
  { month: "Jun", total: 19100, active: 11200, newSignups: 1980 },
  { month: "Jul", total: 21500, active: 12800, newSignups: 2350 },
  { month: "Aug", total: 23800, active: 13900, newSignups: 2180 },
  { month: "Sep", total: 25200, active: 14500, newSignups: 1920 },
  { month: "Oct", total: 26800, active: 15200, newSignups: 2050 },
  { month: "Nov", total: 28500, active: 16100, newSignups: 2280 },
  { month: "Dec", total: 30200, active: 17200, newSignups: 2450 },
];

const bookingTrendsData = [
  { month: "Jan", bookings: 840, revenue: 42000, avgValue: 50 },
  { month: "Feb", bookings: 920, revenue: 48500, avgValue: 52 },
  { month: "Mar", bookings: 1150, revenue: 62000, avgValue: 54 },
  { month: "Apr", bookings: 1080, revenue: 58000, avgValue: 54 },
  { month: "May", bookings: 1320, revenue: 72000, avgValue: 55 },
  { month: "Jun", bookings: 1580, revenue: 89000, avgValue: 56 },
  { month: "Jul", bookings: 1720, revenue: 98000, avgValue: 57 },
  { month: "Aug", bookings: 1650, revenue: 92000, avgValue: 56 },
  { month: "Sep", bookings: 1380, revenue: 76000, avgValue: 55 },
  { month: "Oct", bookings: 1190, revenue: 64000, avgValue: 54 },
  { month: "Nov", bookings: 1050, revenue: 55000, avgValue: 52 },
  { month: "Dec", bookings: 1280, revenue: 71000, avgValue: 55 },
];

const ratingData = [
  { name: "5 Stars", value: 3420, color: COLORS.primary },
  { name: "4 Stars", value: 2180, color: COLORS.teal },
  { name: "3 Stars", value: 890, color: COLORS.amber },
  { name: "2 Stars", value: 320, color: COLORS.violet },
  { name: "1 Star", value: 150, color: COLORS.rose },
];

const popularDestinations = [
  { destination: "Bali, Indonesia", bookings: 4520 },
  { destination: "Maldives", bookings: 3890 },
  { destination: "Santorini, Greece", bookings: 3650 },
  { destination: "Tokyo, Japan", bookings: 3420 },
  { destination: "Paris, France", bookings: 3280 },
  { destination: "Swiss Alps", bookings: 2950 },
  { destination: "New York, USA", bookings: 2780 },
  { destination: "Dubai, UAE", bookings: 2560 },
];

const seasonalData = [
  { season: "Beach", spring: 85, summer: 95, autumn: 60, winter: 40 },
  { season: "Skiing", spring: 50, summer: 20, autumn: 70, winter: 95 },
  { season: "City Tour", spring: 75, summer: 80, autumn: 85, winter: 70 },
  { season: "Hiking", spring: 90, summer: 85, autumn: 95, winter: 30 },
  { season: "Cruise", spring: 70, summer: 90, autumn: 65, winter: 45 },
  { season: "Cultural", spring: 80, summer: 75, autumn: 85, winter: 60 },
];

const weeklyActivityData = [
  { day: "Mon", activeUsers: 4200, bookings: 320 },
  { day: "Tue", activeUsers: 4800, bookings: 380 },
  { day: "Wed", activeUsers: 5100, bookings: 420 },
  { day: "Thu", activeUsers: 5400, bookings: 450 },
  { day: "Fri", activeUsers: 6200, bookings: 580 },
  { day: "Sat", activeUsers: 7800, bookings: 720 },
  { day: "Sun", activeUsers: 7200, bookings: 650 },
];

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-3 shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
      <p className="mb-1 text-sm font-medium text-neutral-900 dark:text-neutral-100">
        {label}
      </p>
      {payload.map((entry: any, index: number) => (
        <p
          key={index}
          className="text-sm"
          style={{ color: entry.color || entry.stroke }}
        >
          {entry.name}: {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
        </p>
      ))}
    </div>
  );
};

// Custom Pie Label
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Card Component
function ChartCard({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-colors hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-900/30">
          <Icon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {title}
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}

// Stat Card Component
function StatCard({
  label,
  value,
  change,
  isPositive,
}: {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}) {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm transition-colors hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
      <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        {value}
      </p>
      <p
        className={`mt-1 text-sm font-medium ${
          isPositive
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-rose-600 dark:text-rose-400"
        }`}
      >
        {isPositive ? "+" : ""}
        {change}
      </p>
    </div>
  );
}

export default function AnalyticsDashboardPage() {
  return (
    <div className="min-h-screen bg-neutral-50 transition-colors dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 shadow-lg shadow-teal-500/25">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                Analytics Dashboard
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400">
                Comprehensive insights into your travel platform performance
              </p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            label="Total Revenue"
            value="$78,400"
            change="12.5% from last month"
            isPositive={true}
          />
          <StatCard
            label="Active Users"
            value="17,200"
            change="6.8% from last month"
            isPositive={true}
          />
          <StatCard
            label="Total Bookings"
            value="14,690"
            change="3.2% from last month"
            isPositive={true}
          />
          <StatCard
            label="Avg. Rating"
            value="4.6"
            change="0.2 from last month"
            isPositive={true}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 1. Revenue Overview - AreaChart */}
          <ChartCard
            title="Revenue Overview"
            description="Monthly revenue with year-over-year comparison"
            icon={TrendingUp}
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="lastYearGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.violet} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={COLORS.violet} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-800" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#737373" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#737373" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="lastYear"
                    name="Last Year"
                    stroke={COLORS.violet}
                    strokeWidth={2}
                    fill="url(#lastYearGradient)"
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="This Year"
                    stroke={COLORS.primary}
                    strokeWidth={2}
                    fill="url(#revenueGradient)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* 2. Destinations by Category - BarChart */}
          <ChartCard
            title="Destinations by Category"
            description="Distribution of available destinations"
            icon={MapPin}
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-800" vertical={false} />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 12, fill: "#737373" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#737373" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="count"
                    name="Destinations"
                    radius={[8, 8, 0, 0]}
                    maxBarSize={60}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* 3. User Growth - LineChart */}
          <ChartCard
            title="User Growth"
            description="Tracking total, active users, and new signups"
            icon={Users}
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-800" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#737373" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#737373" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: 12, paddingTop: 16 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    name="Total Users"
                    stroke={COLORS.primary}
                    strokeWidth={2}
                    dot={{ r: 4, fill: COLORS.primary }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="active"
                    name="Active Users"
                    stroke={COLORS.amber}
                    strokeWidth={2}
                    dot={{ r: 4, fill: COLORS.amber }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="newSignups"
                    name="New Signups"
                    stroke={COLORS.violet}
                    strokeWidth={2}
                    dot={{ r: 4, fill: COLORS.violet }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* 4. Travel Booking Trends - ComposedChart */}
          <ChartCard
            title="Travel Booking Trends"
            description="Bookings volume with revenue overlay"
            icon={Calendar}
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={bookingTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-800" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#737373" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 12, fill: "#737373" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 12, fill: "#737373" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 16 }} />
                  <Bar
                    yAxisId="left"
                    dataKey="bookings"
                    name="Bookings"
                    fill={COLORS.cyan}
                    radius={[4, 4, 0, 0]}
                    barSize={32}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke={COLORS.rose}
                    strokeWidth={2}
                    dot={{ r: 4, fill: COLORS.rose }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* 5. Rating Distribution - PieChart / Donut */}
          <ChartCard
            title="Rating Distribution"
            description="Breakdown of customer satisfaction ratings"
            icon={Star}
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ratingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                    labelLine={false}
                    label={renderCustomLabel}
                  >
                    {ratingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => Number(value).toLocaleString()}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ fontSize: 12, paddingLeft: 20 }}
                    formatter={(value) => (
                      <span className="text-neutral-700 dark:text-neutral-300">
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* 6. Popular Destinations - Horizontal BarChart */}
          <ChartCard
            title="Popular Destinations"
            description="Top 8 destinations ranked by booking volume"
            icon={MapPin}
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={popularDestinations}
                  layout="vertical"
                  barCategoryGap="16%"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    className="dark:stroke-neutral-800"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 12, fill: "#737373" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
                  />
                  <YAxis
                    type="category"
                    dataKey="destination"
                    tick={{ fontSize: 11, fill: "#737373" }}
                    axisLine={false}
                    tickLine={false}
                    width={120}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="bookings"
                    name="Bookings"
                    radius={[0, 8, 8, 0]}
                    maxBarSize={28}
                  >
                    {popularDestinations.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* 7. Seasonal Patterns - RadarChart */}
          <ChartCard
            title="Seasonal Patterns"
            description="Travel demand across seasons by category"
            icon={Target}
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={seasonalData}>
                  <PolarGrid stroke="#e5e7eb" className="dark:stroke-neutral-800" />
                  <PolarAngleAxis
                    dataKey="season"
                    tick={{ fontSize: 11, fill: "#737373" }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fontSize: 10, fill: "#a3a3a3" }}
                  />
                  <Radar
                    name="Spring"
                    dataKey="spring"
                    stroke={COLORS.emerald}
                    fill={COLORS.emerald}
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Summer"
                    dataKey="summer"
                    stroke={COLORS.amber}
                    fill={COLORS.amber}
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Autumn"
                    dataKey="autumn"
                    stroke={COLORS.rose}
                    fill={COLORS.rose}
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Winter"
                    dataKey="winter"
                    stroke={COLORS.cyan}
                    fill={COLORS.cyan}
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 16 }} />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* 8. Weekly Activity - Area + Bar Combo */}
          <ChartCard
            title="Weekly Activity"
            description="Daily active users and bookings per day of week"
            icon={Activity}
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={weeklyActivityData}>
                  <defs>
                    <linearGradient id="weeklyAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-800" />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12, fill: "#737373" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 12, fill: "#737373" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 12, fill: "#737373" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 16 }} />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="activeUsers"
                    name="Active Users"
                    stroke={COLORS.primary}
                    strokeWidth={2}
                    fill="url(#weeklyAreaGradient)"
                    dot={{ r: 4, fill: COLORS.primary }}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="bookings"
                    name="Bookings"
                    fill={COLORS.amber}
                    radius={[6, 6, 0, 0]}
                    barSize={36}
                    opacity={0.8}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-neutral-200 pt-6 dark:border-neutral-800">
          <p className="text-center text-sm text-neutral-400 dark:text-neutral-500">
            Analytics Dashboard • Data refreshed in real-time • Built with Recharts & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}
