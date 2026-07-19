"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { AxiosError } from "axios";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import {
  Loader2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Compass,
  Sparkles,
  MapPin,
  Globe,
  ArrowRight,
  Zap,
} from "lucide-react";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const features = [
  { icon: Sparkles, text: "AI-powered trip planning" },
  { icon: MapPin, text: "150+ curated destinations" },
  { icon: Globe, text: "Available worldwide" },
  { icon: Zap, text: "Instant booking & recommendations" },
];

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setServerError("");
    try {
      const res = await api.post("/auth/login", data);
      setAuth(res.data, res.data.token);
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setServerError(err.response?.data?.message || "Failed to login");
      } else {
        setServerError("Failed to login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setServerError("");
    try {
      const res = await api.get("/auth/demo");
      setAuth(res.data, res.data.token);
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setServerError(err.response?.data?.message || "Failed to start demo");
      } else {
        setServerError("Failed to start demo");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branded Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-teal-600 via-emerald-700 to-teal-900">
        {/* Mesh pattern */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }} />

        {/* Floating shapes */}
        <motion.div
          className="absolute top-20 left-[15%] w-24 h-24 bg-white/5 rounded-3xl rotate-12"
          animate={{ rotate: [12, 20, 12], y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-[20%] w-20 h-20 bg-white/5 rounded-2xl -rotate-6"
          animate={{ rotate: [-6, -15, -6], y: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/3 right-[10%] w-16 h-16 bg-white/5 rounded-xl rotate-45"
          animate={{ rotate: [45, 55, 45] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-[10%] w-14 h-14 bg-white/5 rounded-2xl rotate-12"
          animate={{ rotate: [12, 25, 12], y: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Glow orbs */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-400/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-300/10 rounded-full blur-[100px]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                <Compass className="w-7 h-7 text-white" />
              </div>
              <span className="text-white/80 font-semibold text-lg">NomadAI</span>
            </div>

            <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
              Welcome back to
              <br />
              <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                your next adventure
              </span>
            </h2>

            <p className="text-white/70 text-lg mb-10 leading-relaxed">
              Log in to access your personalized travel dashboard, AI concierge, and saved destinations.
            </p>

            <div className="space-y-4">
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
                    <feat.icon className="w-4 h-4 text-amber-300" />
                  </div>
                  <span className="text-white/80 text-sm font-medium">{feat.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white dark:bg-neutral-900 transition-colors">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Compass className="w-7 h-7 text-teal-600" />
            <span className="font-bold text-xl text-neutral-900 dark:text-neutral-100">NomadAI</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Sign in</h1>
            <p className="text-neutral-500 dark:text-neutral-400">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Error */}
          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm"
            >
              {serverError}
            </motion.div>
          )}

          {/* Google Login */}
          <GoogleAuthButton
            mode="login"
            onError={setServerError}
          />

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200 dark:border-neutral-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-neutral-900 px-4 text-neutral-400">or sign in with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-400 focus:bg-white dark:focus:bg-neutral-800 transition-all"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className="w-full pl-11 pr-12 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-400 focus:bg-white dark:focus:bg-neutral-800 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600 text-teal-600 focus:ring-teal-500" />
                <span className="text-sm text-neutral-600 dark:text-neutral-400">Remember me</span>
              </label>
              <Link href="#" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-3.5 rounded-xl font-semibold hover:from-teal-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Demo Login */}
          <button
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full mt-4 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-400 py-3 rounded-xl font-medium hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Try Demo — Instant Login"}
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-teal-600 hover:text-teal-700 font-semibold">
              Create one free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
