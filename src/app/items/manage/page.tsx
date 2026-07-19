"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMyDestinations, deleteDestination } from "@/lib/api";
import { Destination } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Trash2, Eye, PlusCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function ManageItemsPage() {
  const queryClient = useQueryClient();
  const [deleteError, setDeleteError] = useState("");

  const { data: destinations, isLoading } = useQuery<Destination[]>({
    queryKey: ["myDestinations"],
    queryFn: fetchMyDestinations,
  });

  const mutation = useMutation({
    mutationFn: deleteDestination,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myDestinations"] });
      queryClient.invalidateQueries({ queryKey: ["destinations"] });
    },
    onError: (err: unknown) => {
      // Safely extract an error message from unknown error shape
      type AxiosLikeError = { response?: { data?: { message?: string } } };
      const axiosErr = err as AxiosLikeError;
      const message =
        // axios-like error shape
        axiosErr?.response?.data?.message ??
        // native Error
        (err instanceof Error ? err.message : undefined) ??
        // fallback
        "Failed to delete";

      setDeleteError(message);
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      setDeleteError("");
      mutation.mutate(id);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">
            Manage Listings
          </h1>
          <p className="text-neutral-500 mt-1">
            View, edit, or delete your published destinations.
          </p>
        </div>
        <Link
          href="/items/add"
          className="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary-700 transition flex items-center gap-2"
        >
          <PlusCircle className="w-5 h-5" /> Add New
        </Link>
      </div>

      {deleteError && (
        <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {deleteError}
        </div>
      )}

      {destinations?.length === 0 ? (
        <div className="bg-white border border-dashed border-neutral-200 rounded-2xl p-12 text-center">
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            No Listings Yet
          </h3>
          <p className="text-neutral-500 mb-6">
            Start by adding your first travel destination.
          </p>
          <Link
            href="/items/add"
            className="inline-flex bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary-700 transition"
          >
            Create First Listing
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-100">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden md:table-cell">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-100">
                {destinations?.map((dest) => (
                  <tr key={dest._id} className="hover:bg-neutral-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-xl overflow-hidden bg-neutral-100 shrink-0 relative">
                          <Image
                            src={dest.images[0] || ""}
                            alt={dest.title || "destination image"}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-neutral-900 line-clamp-1">
                            {dest.title}
                          </div>
                          <div className="text-xs text-neutral-500">
                            {dest.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-50 text-primary">
                        {dest.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 font-bold">
                      ${dest.price}
                      <span className="text-neutral-400 font-normal">/n</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/destinations/${dest._id}`}
                          className="text-accent hover:text-accent-700 p-2 rounded-lg hover:bg-accent-50 transition"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(dest._id)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition"
                          title="Delete"
                          disabled={mutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
