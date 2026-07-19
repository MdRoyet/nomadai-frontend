"use client";

import { useEffect, useState } from "react";
import { Compass } from "lucide-react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-neutral-900 transition-colors">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Compass className="w-12 h-12 text-teal-600 animate-spin" style={{ animationDuration: "3s" }} />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">NomadAI</span>
            <span className="text-sm text-neutral-400">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
