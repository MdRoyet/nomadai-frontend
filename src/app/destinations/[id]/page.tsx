"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { fetchDestinationById } from "@/lib/api";
import { MapPin, Star, Tag } from "lucide-react";
import DestinationCard from "@/components/marketplace/DestinationCard";

export default function DestinationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data, isLoading } = useQuery({
    queryKey: ["destination", id],
    queryFn: () => fetchDestinationById(id),
  });

  if (isLoading)
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-neutral-500">
        Loading destination...
      </div>
    );
  if (!data?.destination)
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-red-500">
        Destination not found.
      </div>
    );

  const { destination, related } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Images & Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="relative rounded-2xl overflow-hidden h-100 bg-neutral-100">
          <Image
            src={destination.images[0]}
            alt={destination.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center text-sm text-neutral-500 mb-2">
            <MapPin className="w-4 h-4 mr-1 text-primary" />{" "}
            {destination.location}
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            {destination.title}
          </h1>
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center bg-secondary-50 text-secondary px-3 py-1 rounded-full text-sm font-semibold">
              <Star className="w-4 h-4 mr-1 fill-secondary" />{" "}
              {destination.rating} Rating
            </div>
            <span className="bg-primary-50 text-primary px-3 py-1 rounded-full text-sm font-semibold">
              {destination.category}
            </span>
          </div>
          <p className="text-neutral-600 text-lg mb-8">
            {destination.short_desc}
          </p>
          <div className="border-t border-neutral-100 pt-6">
            <span className="text-3xl font-bold text-primary">
              ${destination.price}
            </span>
            <span className="text-neutral-400"> /night</span>
          </div>
        </div>
      </div>

      {/* Full Description */}
      <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm mb-12">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
          {destination.full_desc}
        </p>

        <div className="mt-8 pt-6 border-t border-neutral-100">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Tag className="w-4 h-4 text-primary" /> Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {destination.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-lg text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related Items */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((item) => (
              <DestinationCard key={item._id} destination={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
