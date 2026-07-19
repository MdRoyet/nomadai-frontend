"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "@/lib/api";
import Input from "@/components/ui/Input";
import { Loader2, Upload, ArrowLeft } from "lucide-react";
import Link from "next/link";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  short_desc: z
    .string()
    .min(10, "Short description must be at least 10 characters")
    .max(100, "Keep it under 100 characters"),
  full_desc: z
    .string()
    .min(50, "Full description must be at least 50 characters"),
  price: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Price must be a positive number",
    ),
  location: z.string().min(2, "Location is required"),
  category: z.string().min(1, "Category is required"),
  image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  tags: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function AddItemPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      await api.post("/destinations", {
        ...data,
        price: Number(data.price),
        image_url: data.image_url || "",
      });
      router.push("/items/manage");
    } catch (err: unknown) {
      // Narrow unknown to a shape that may contain axios-like error response
      const hasResponse = (e: unknown): e is { response?: { data?: { message?: string } } } =>
        typeof e === "object" && e !== null && "response" in e;

      if (hasResponse(err)) {
        setServerError(err.response?.data?.message || "Failed to create listing");
      } else if (err instanceof Error) {
        setServerError(err.message || "Failed to create listing");
      } else {
        setServerError("Failed to create listing");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/items/manage"
        className="inline-flex items-center text-neutral-500 hover:text-primary mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Manage
      </Link>

      <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm">
        <h1 className="text-2xl font-bold mb-6">Add New Destination</h1>

        {serverError && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Title"
            placeholder="e.g., Luxury Beachfront Villa"
            {...register("title")}
            error={errors.title?.message}
          />

          <Input
            label="Short Description"
            placeholder="A brief 1-sentence summary"
            {...register("short_desc")}
            error={errors.short_desc?.message}
          />

          <div>
            <label className="block text-sm font-medium text-neutral-800 mb-1.5">
              Full Description
            </label>
            <textarea
              rows={5}
              className={`w-full px-4 py-3 border ${errors.full_desc ? "border-red-500" : "border-neutral-300"} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition`}
              placeholder="Describe the property, amenities, and surroundings in detail..."
              {...register("full_desc")}
            />
            {errors.full_desc && (
              <p className="text-red-500 text-xs mt-1">
                {errors.full_desc.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Price per Night ($)"
              type="number"
              placeholder="e.g., 250"
              {...register("price")}
              error={errors.price?.message}
            />
            <div>
              <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                Category
              </label>
              <select
                className={`w-full px-4 py-3 border ${errors.category ? "border-red-500" : "border-neutral-300"} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white`}
                {...register("category")}
              >
                <option value="">Select...</option>
                <option value="Beach">Beach</option>
                <option value="Mountain">Mountain</option>
                <option value="Urban">Urban</option>
                <option value="Desert">Desert</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          <Input
            label="Location"
            placeholder="e.g., Malé, Maldives"
            {...register("location")}
            error={errors.location?.message}
          />

          <Input
            label="Image URL (Optional)"
            placeholder="https://images.unsplash.com/..."
            {...register("image_url")}
            error={errors.image_url?.message}
          />

          <Input
            label="Tags (Optional - comma separated)"
            placeholder="e.g., Luxury, Pool, Family"
            {...register("tags")}
            error={errors.tags?.message}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition flex items-center justify-center disabled:opacity-50 mt-4"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Create Listing"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
