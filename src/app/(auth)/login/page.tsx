"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AxiosError } from "axios";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import Input from "@/components/ui/Input";
import { Loader2 } from "lucide-react";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
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
      } else if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("Failed to login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setValue("email", "demo@nomadai.com");
    setValue("password", "password123");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-neutral-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>
          <p className="text-neutral-500 mt-2">
            Log in to your NomadAI account
          </p>
        </div>

        {serverError && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            placeholder="********"
            {...register("password")}
            error={errors.password?.message}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition flex items-center justify-center disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Log In"}
          </button>
        </form>

        <button
          onClick={handleDemoLogin}
          className="w-full mt-3 border border-primary text-primary py-3 rounded-xl font-semibold hover:bg-primary-50 transition"
        >
          Use Demo Credentials
        </button>

        <p className="text-center text-sm text-neutral-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-accent font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
