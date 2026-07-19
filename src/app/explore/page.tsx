"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDestinations } from "@/lib/api";
import DestinationCard from "@/components/marketplace/DestinationCard";
import { CardSkeleton } from "@/components/ui/Skeleton";

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const queryParams = new URLSearchParams({
    search,
    category,
    minPrice,
    maxPrice,
    sort,
    page: page.toString(),
  }).toString();

  const { data, isLoading } = useQuery({
    queryKey: ["destinations", queryParams],
    queryFn: () => fetchDestinations(queryParams),
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Explore Destinations
        </h1>
        <p className="text-neutral-500">
          Find your next adventure from our curated list of{" "}
          {data?.count || "100+"} properties.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="md:col-span-2 px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Categories</option>
          <option value="Beach">Beach</option>
          <option value="Mountain">Mountain</option>
          <option value="Urban">Urban</option>
          <option value="Desert">Desert</option>
        </select>
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="newest">Newest Arrivals</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating_desc">Highest Rated</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          [...Array(8)].map((_, i) => <CardSkeleton key={i} />)
        ) : data?.destinations?.length === 0 ? (
          <div className="col-span-full text-center py-16 text-neutral-500">
            No destinations found matching your criteria.
          </div>
        ) : (
          data?.destinations.map((dest) => (
            <DestinationCard key={dest._id} destination={dest} />
          ))
        )}
      </div>

      {/* Pagination */}
      {!isLoading && (data?.pages ?? 0) > 1 && (
        <div className="flex justify-center mt-12 gap-2">
          {Array.from({ length: data?.pages ?? 0 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-10 h-10 rounded-xl font-medium transition ${page === i + 1 ? "bg-primary text-white" : "bg-white border border-neutral-200 hover:border-primary"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
