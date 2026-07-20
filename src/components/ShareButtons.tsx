"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { Share2, Link, MessageCircle } from "lucide-react";
import { toast } from "react-toastify";

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

interface ShareTarget {
  label: string;
  icon: React.ReactNode;
  bg: string;
  hoverBg: string;
  action: () => void;
}

export default function ShareButtons({ title, url, description }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description || title);

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copied!");
    }).catch(() => {
      toast.error("Failed to copy link");
    });
  }, [url]);

  const targets: ShareTarget[] = [
    {
      label: "WhatsApp",
      icon: <MessageCircle className="w-4 h-4" />,
      bg: "bg-green-500",
      hoverBg: "hover:bg-green-600",
      action: () => window.open(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, "_blank"),
    },
    {
      label: "Twitter",
      icon: <Share2 className="w-4 h-4" />,
      bg: "bg-black dark:bg-white",
      hoverBg: "hover:bg-gray-800 dark:hover:bg-gray-200",
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, "_blank"),
    },
    {
      label: "Facebook",
      icon: <Share2 className="w-4 h-4" />,
      bg: "bg-blue-600",
      hoverBg: "hover:bg-blue-700",
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedDesc}`, "_blank"),
    },
    {
      label: "Copy Link",
      icon: <Link className="w-4 h-4" />,
      bg: "bg-gray-500 dark:bg-gray-600",
      hoverBg: "hover:bg-gray-600 dark:hover:bg-gray-500",
      action: copyLink,
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {targets.map((t) => (
        <motion.button
          key={t.label}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={t.action}
          className={`flex items-center gap-2 px-4 py-2 ${t.bg} ${t.hoverBg} text-white rounded-xl text-sm font-medium transition-colors`}
        >
          {t.icon}
          <span>{t.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
