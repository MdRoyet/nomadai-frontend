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
  User,
  Compass,
  Sparkles,
  MapPin,
  Globe,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const benefits = [
  { icon: Sparkles, text: "AI-powered travel recommendations" },
  { icon: MapPin, text: "Save & compare destinations" },
  { icon: Globe, text: "Join 50K+ travelers worldwide" },
];

const passwordChecks = [
  { label: "At least 6 characters", test: (p: string) => p.length >= 6 },
];

export default function RegisterPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const password = watch("password", "");

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setServerError("");
    try {
      const res = await api.post("/auth/register", data);
      setAuth(res.data, res.data.token);
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setServerError(err.response?.data?.message || "Failed to register");
      } else {
        setServerError("Failed to register");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branded Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-700 to-purple-900">
        {/* Mesh pattern */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }} />

        {/* Floating shapes */}
        <motion.div
          className="absolute top-16 right-[15%] w-28 h-28 bg-white/5 rounded-3xl rotate-12"
          animate={{ rotate: [12, 22, 12], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-24 left-[18%] w-20 h-20 bg-white/5 rounded-2xl -rotate-12"
          animate={{ rotate: [-12, -20, -12], y: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 right-[8%] w-16 h-16 bg-white/5 rounded-xl rotate-45"
          animate={{ rotate: [45, 60, 45] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-[35%] left-[8%] w-12 h-12 bg-white/5 rounded-2xl rotate-12"
          animate={{ rotate: [12, 30, 12], y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Glow orbs */}
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-purple-400/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-300/10 rounded-full blur-[100px]" />

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
              Start your
              <br />
              <span className="bg-gradient-to-r from-amber-300 to-pink-300 bg-clip-text text-transparent">
                travel journey
              </span>
            </h2>

            <p className="text-white/70 text-lg mb-10 leading-relaxed">
              Create your free account and unlock AI-powered travel planning, personalized recommendations, and a world of destinations.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
                    <benefit.icon className="w-4 h-4 text-amber-300" />
                  </div>
                  <span className="text-white/80 text-sm font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex items-center gap-6 text-white/50 text-sm"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Free forever
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> No credit card
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Cancel anytime
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel — Register Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Compass className="w-7 h-7 text-indigo-600" />
            <span className="font-bold text-xl text-neutral-900">NomadAI</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Create account</h1>
            <p className="text-neutral-500">
              Join thousands of travelers using AI to plan better trips
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
            mode="register"
            onError={setServerError}
          />

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-neutral-400">or sign up with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("name")}
                  className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 focus:bg-white transition-all"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 focus:bg-white transition-all"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  {...register("password")}
                  className="w-full pl-11 pr-12 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}

              {/* Password strength indicator */}
              {password && (
                <div className="mt-2 space-y-1">
                  {passwordChecks.map((check, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${check.test(password) ? "text-emerald-500" : "text-neutral-300"}`}
                      />
                      <span className={`text-xs ${check.test(password) ? "text-emerald-600" : "text-neutral-400"}`}>
                        {check.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500" />
              <span className="text-sm text-neutral-500">
                I agree to the{" "}
                <Link href="#" className="text-indigo-600 hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="#" className="text-indigo-600 hover:underline">Privacy Policy</Link>
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white py-3.5 rounded-xl font-semibold hover:from-indigo-600 hover:to-violet-700 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-neutral-500 mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
