"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";

interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number;
}

const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "EUR", symbol: "\u20ac", name: "Euro", rate: 0.92 },
  { code: "GBP", symbol: "\u00a3", name: "British Pound", rate: 0.79 },
  { code: "JPY", symbol: "\u00a5", name: "Japanese Yen", rate: 149.5 },
  { code: "CAD", symbol: "CA$", name: "Canadian Dollar", rate: 1.36 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 1.53 },
  { code: "INR", symbol: "\u20b9", name: "Indian Rupee", rate: 83.2 },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", rate: 4.97 },
  { code: "MXN", symbol: "MX$", name: "Mexican Peso", rate: 17.15 },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc", rate: 0.88 },
  { code: "CNY", symbol: "\u00a5", name: "Chinese Yuan", rate: 7.24 },
  { code: "KRW", symbol: "\u20a9", name: "South Korean Won", rate: 1325 },
  { code: "THB", symbol: "\u0e3f", name: "Thai Baht", rate: 35.6 },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", rate: 1.34 },
  { code: "AED", symbol: "AED", name: "UAE Dirham", rate: 3.67 },
  { code: "SAR", symbol: "SAR", name: "Saudi Riyal", rate: 3.75 },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah", rate: 15650 },
  { code: "TRY", symbol: "\u20ba", name: "Turkish Lira", rate: 32.3 },
  { code: "ZAR", symbol: "R", name: "South African Rand", rate: 18.9 },
  { code: "NGN", symbol: "\u20a6", name: "Nigerian Naira", rate: 1550 },
];

const STORAGE_KEY = "nomadai-currency";

function getStoredCurrency(): Currency {
  if (typeof window === "undefined") return CURRENCIES[0];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const found = CURRENCIES.find((c) => c.code === parsed.code);
      if (found) return found;
    }
  } catch {
    // fall through
  }
  return CURRENCIES[0];
}

export function convertPrice(
  price: number,
  fromCurrency: string = "USD"
): { amount: number; symbol: string; code: string } {
  const target = getStoredCurrency();
  const fromRate = CURRENCIES.find((c) => c.code === fromCurrency)?.rate || 1;
  const usdAmount = price / fromRate;
  const converted = usdAmount * target.rate;

  let displayAmount: number;
  if (target.rate >= 1000) {
    displayAmount = Math.round(converted);
  } else if (target.rate >= 100) {
    displayAmount = Math.round(converted);
  } else {
    displayAmount = Math.round(converted * 100) / 100;
  }

  return {
    amount: displayAmount,
    symbol: target.symbol,
    code: target.code,
  };
}

export default function CurrencySelector() {
  const [current, setCurrent] = useState<Currency>(CURRENCIES[0]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrent(getStoredCurrency());
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const select = useCallback((currency: Currency) => {
    setCurrent(currency);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currency));
    setOpen(false);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
      >
        <Globe className="w-4 h-4 text-gray-400" />
        <span>
          {current.code} {current.symbol}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="absolute right-0 top-full mt-1 w-64 max-h-80 overflow-y-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50"
          >
            {CURRENCIES.map((currency) => (
              <button
                key={currency.code}
                onClick={() => select(currency)}
                className={`w-full text-left px-4 py-2.5 flex items-center gap-3 text-sm transition-colors ${
                  current.code === currency.code
                    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <span className="font-mono font-bold w-8 text-right">
                  {currency.code}
                </span>
                <span className="text-gray-400 dark:text-gray-500 w-8">
                  {currency.symbol}
                </span>
                <span className="text-gray-500 dark:text-gray-400 truncate">
                  {currency.name}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
