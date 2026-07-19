"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Menu,
  X,
  Compass,
  LogOut,
  PlusCircle,
  LayoutDashboard,
  BarChart3,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-100 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-primary" />
            <span className="font-display font-bold text-xl text-neutral-900 dark:text-neutral-100">
              NomadAI
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/explore"
              className="text-neutral-600 dark:text-neutral-400 hover:text-primary transition font-medium"
            >
              Explore
            </Link>
            <Link
              href="/about"
              className="text-neutral-600 dark:text-neutral-400 hover:text-primary transition font-medium"
            >
              About
            </Link>
            <Link
              href="/data-analyzer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-primary transition font-medium flex items-center gap-1"
            >
              <BarChart3 className="w-4 h-4" /> Data Analyzer
            </Link>
            <Link
              href="/contact"
              className="text-neutral-600 dark:text-neutral-400 hover:text-primary transition font-medium"
            >
              Contact
            </Link>

            {user ? (
              <>
                <Link
                  href="/items/add"
                  className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-primary transition font-medium"
                >
                  <PlusCircle className="w-4 h-4" /> Add Listing
                </Link>
                <Link
                  href="/items/manage"
                  className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-primary transition font-medium"
                >
                  <LayoutDashboard className="w-4 h-4" /> Manage
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 bg-secondary text-white px-4 py-2 rounded-xl font-semibold hover:bg-secondary-600 transition"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
                <ThemeToggle />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-primary transition font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary text-white px-5 py-2 rounded-xl font-semibold hover:bg-primary-700 transition"
                >
                  Get Started
                </Link>
                <ThemeToggle />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-700 dark:text-neutral-300"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 px-4 py-4 space-y-3 transition-colors">
          <Link
            href="/explore"
            className="block py-2 text-neutral-700 dark:text-neutral-300"
            onClick={() => setIsOpen(false)}
          >
            Explore
          </Link>
          <Link
            href="/about"
            className="block py-2 text-neutral-700 dark:text-neutral-300"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            href="/data-analyzer"
            className="block py-2 text-neutral-700 dark:text-neutral-300 flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <BarChart3 className="w-4 h-4" /> Data Analyzer
          </Link>
          <Link
            href="/contact"
            className="block py-2 text-neutral-700 dark:text-neutral-300"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>

          {user ? (
            <>
              <Link
                href="/items/add"
                className="block py-2 text-neutral-700 dark:text-neutral-300"
                onClick={() => setIsOpen(false)}
              >
                Add Listing
              </Link>
              <Link
                href="/items/manage"
                className="block py-2 text-neutral-700 dark:text-neutral-300"
                onClick={() => setIsOpen(false)}
              >
                Manage Listings
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full text-left py-2 text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="pt-2 flex flex-col gap-3">
              <Link
                href="/login"
                className="w-full text-center border border-primary text-primary py-2 rounded-xl font-medium"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="w-full text-center bg-primary text-white py-2 rounded-xl font-medium"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
