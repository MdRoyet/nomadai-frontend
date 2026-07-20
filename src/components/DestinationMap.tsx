'use client';

import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';

interface DestinationMapProps {
  location: string;
  title: string;
}

export default function DestinationMap({ location, title }: DestinationMapProps) {
  const handleViewOnMap = () => {
    const encodedLocation = encodeURIComponent(location);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`,
      '_blank'
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className="relative overflow-hidden rounded-xl shadow-lg"
    >
      {/* Gradient Background Simulating Map */}
      <div className="h-64 bg-gradient-to-br from-blue-200 via-green-200 to-blue-300 dark:from-blue-800 dark:via-green-800 dark:to-blue-900 relative">
        {/* Map Grid Lines */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-gray-600 dark:text-gray-400"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Decorative Roads */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="10,5"
              className="text-gray-500 dark:text-gray-300"
            />
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="10,5"
              className="text-gray-500 dark:text-gray-300"
            />
          </svg>
        </div>

        {/* Location Pin */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
              }}
              className="flex flex-col items-center"
            >
              <MapPin className="h-12 w-12 text-red-500 drop-shadow-lg" />
              <div className="w-4 h-1 bg-black/20 rounded-full mt-1" />
            </motion.div>
          </div>
        </motion.div>

        {/* Location Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="absolute bottom-4 left-4 right-4"
        >
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {location}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* View on Map Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleViewOnMap}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium flex items-center justify-center gap-2 transition-all"
      >
        <ExternalLink className="h-5 w-5" />
        View on Google Maps
      </motion.button>
    </motion.div>
  );
}
