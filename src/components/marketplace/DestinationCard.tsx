import Link from "next/link";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { Destination } from "@/types";

export default function DestinationCard({
  destination,
}: {
  destination: Destination;
}) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-lg hover:border-primary-100 transition-all duration-300 flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden bg-neutral-100">
        <Image
          src={destination.images[0]}
          alt={destination.title}
          fill
          priority
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <Star className="w-3 h-3 fill-secondary text-secondary" />
          {destination.rating}
        </div>
      </div>
      <div className="p-5 flex flex-col grow">
        <div className="flex items-center text-xs text-neutral-500 mb-2">
          <MapPin className="w-3 h-3 mr-1" /> {destination.location}
        </div>
        <h3 className="font-semibold text-lg text-neutral-900 mb-2 line-clamp-1">
          {destination.title}
        </h3>
        <p className="text-neutral-500 text-sm line-clamp-2 mb-4 grow">
          {destination.short_desc}
        </p>
        <div className="flex justify-between items-center mt-auto pt-2 border-t border-neutral-50">
          <div>
            <span className="text-primary font-bold text-lg">
              ${destination.price}
            </span>
            <span className="text-neutral-400 text-xs"> /night</span>
          </div>
          <Link
            href={`/destinations/${destination._id}`}
            className="text-accent font-semibold text-sm hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
