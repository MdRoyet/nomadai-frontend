"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import {
  Languages,
  ArrowRightLeft,
  Copy,
  Check,
  Globe,
  Sparkles,
  MessageSquare,
  Volume2,
  BookOpen,
  ChevronDown,
  Search,
  X,
} from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  region: string;
  flag: string;
}

interface TranslationResult {
  translatedText: string;
  culturalNotes?: string;
  pronunciation?: string;
  alternativeTranslations?: string[];
}

const QUICK_PHRASES = [
  { text: "Where is the airport?", icon: "✈️" },
  { text: "How much does this cost?", icon: "💰" },
  { text: "Thank you very much", icon: "🙏" },
  { text: "I need help, please", icon: "🆘" },
  { text: "Where is the nearest hotel?", icon: "🏨" },
  { text: "I don't understand", icon: "🤷" },
  { text: "Can you speak slower?", icon: "🗣️" },
  { text: "Where is the restroom?", icon: "🚻" },
  { text: "What time is it?", icon: "🕐" },
  { text: "I would like to order food", icon: "🍽️" },
];

const FALLBACK_LANGUAGES: Language[] = [
  { code: "es", name: "Spanish", nativeName: "Español", region: "Spain", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", region: "France", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", region: "Germany", flag: "🇩🇪" },
  { code: "it", name: "Italian", nativeName: "Italiano", region: "Italy", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", nativeName: "Português", region: "Brazil", flag: "🇧🇷" },
  { code: "ja", name: "Japanese", nativeName: "日本語", region: "Japan", flag: "🇯🇵" },
  { code: "ko", name: "Korean", nativeName: "한국어", region: "South Korea", flag: "🇰🇷" },
  { code: "zh", name: "Mandarin", nativeName: "中文", region: "China", flag: "🇨🇳" },
  { code: "ar", name: "Arabic", nativeName: "العربية", region: "Saudi Arabia", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", region: "India", flag: "🇮🇳" },
  { code: "ru", name: "Russian", nativeName: "Русский", region: "Russia", flag: "🇷🇺" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", region: "Netherlands", flag: "🇳🇱" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", region: "Turkey", flag: "🇹🇷" },
  { code: "th", name: "Thai", nativeName: "ไทย", region: "Thailand", flag: "🇹🇭" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", region: "Vietnam", flag: "🇻🇳" },
  { code: "pl", name: "Polish", nativeName: "Polski", region: "Poland", flag: "🇵🇱" },
  { code: "sv", name: "Swedish", nativeName: "Svenska", region: "Sweden", flag: "🇸🇪" },
  { code: "da", name: "Danish", nativeName: "Dansk", region: "Denmark", flag: "🇩🇰" },
  { code: "fi", name: "Finnish", nativeName: "Suomi", region: "Finland", flag: "🇫🇮" },
  { code: "no", name: "Norwegian", nativeName: "Norsk", region: "Norway", flag: "🇳🇴" },
  { code: "el", name: "Greek", nativeName: "Ελληνικά", region: "Greece", flag: "🇬🇷" },
  { code: "cs", name: "Czech", nativeName: "Čeština", region: "Czech Republic", flag: "🇨🇿" },
  { code: "ro", name: "Romanian", nativeName: "Română", region: "Romania", flag: "🇷🇴" },
  { code: "hu", name: "Hungarian", nativeName: "Magyar", region: "Hungary", flag: "🇭🇺" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська", region: "Ukraine", flag: "🇺🇦" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", region: "Indonesia", flag: "🇮🇩" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", region: "Malaysia", flag: "🇲🇾" },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili", region: "Kenya", flag: "🇰🇪" },
  { code: "tl", name: "Filipino", nativeName: "Filipino", region: "Philippines", flag: "🇵🇭" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", region: "Bangladesh", flag: "🇧🇩" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", region: "India", flag: "🇮🇳" },
  { code: "ur", name: "Urdu", nativeName: "اردو", region: "Pakistan", flag: "🇵🇰" },
  { code: "he", name: "Hebrew", nativeName: "עברית", region: "Israel", flag: "🇮🇱" },
  { code: "fa", name: "Persian", nativeName: "فارسی", region: "Iran", flag: "🇮🇷" },
  { code: "sk", name: "Slovak", nativeName: "Slovenčina", region: "Slovakia", flag: "🇸🇰" },
  { code: "bg", name: "Bulgarian", nativeName: "Български", region: "Bulgaria", flag: "🇧🇬" },
  { code: "hr", name: "Croatian", nativeName: "Hrvatski", region: "Croatia", flag: "🇭🇷" },
  { code: "lt", name: "Lithuanian", nativeName: "Lietuvių", region: "Lithuania", flag: "🇱🇹" },
  { code: "sl", name: "Slovenian", nativeName: "Slovenščina", region: "Slovenia", flag: "🇸🇮" },
  { code: "et", name: "Estonian", nativeName: "Eesti", region: "Estonia", flag: "🇪🇪" },
  { code: "lv", name: "Latvian", nativeName: "Latviešu", region: "Latvia", flag: "🇱🇻" },
  { code: "ca", name: "Catalan", nativeName: "Català", region: "Spain", flag: "🇪🇸" },
  { code: "af", name: "Afrikaans", nativeName: "Afrikaans", region: "South Africa", flag: "🇿🇦" },
];

function LanguageDropdown({
  languages,
  selected,
  onSelect,
  label,
}: {
  languages: Language[];
  selected: Language | null;
  onSelect: (lang: Language) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = languages.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(search.toLowerCase()) ||
      l.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <label className="block text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
        {label}
      </label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{selected?.flag || "🌐"}</span>
          <span className="font-medium text-neutral-800 dark:text-neutral-200">
            {selected?.name || "Select language"}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-3 border-b border-neutral-100 dark:border-neutral-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search languages..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 text-neutral-800 dark:text-neutral-200 placeholder-neutral-400"
                    autoFocus
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600"
                    >
                      <X className="w-3 h-3 text-neutral-400" />
                    </button>
                  )}
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="p-4 text-center text-sm text-neutral-400">
                    No languages found
                  </div>
                ) : (
                  filtered.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onSelect(lang);
                        setOpen(false);
                        setSearch("");
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors ${
                        selected?.code === lang.code ? "bg-indigo-50 dark:bg-indigo-950/30" : ""
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <div className="flex-grow min-w-0">
                        <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200 block">
                          {lang.name}
                        </span>
                        <span className="text-xs text-neutral-400 dark:text-neutral-500">
                          {lang.nativeName}
                        </span>
                      </div>
                      {selected?.code === lang.code && (
                        <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TranslatePage() {
  const [languages, setLanguages] = useState<Language[]>(FALLBACK_LANGUAGES);
  const [sourceLang, setSourceLang] = useState<Language | null>(
    FALLBACK_LANGUAGES.find((l) => l.code === "en") || FALLBACK_LANGUAGES[0]
  );
  const [targetLang, setTargetLang] = useState<Language | null>(
    FALLBACK_LANGUAGES.find((l) => l.code === "es") || FALLBACK_LANGUAGES[1]
  );
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const res = await api.get("/languages");
        if (res.data?.languages?.length) {
          setLanguages(res.data.languages);
          if (!sourceLang) {
            setSourceLang(
              res.data.languages.find((l: Language) => l.code === "en") ||
                res.data.languages[0]
            );
          }
          if (!targetLang) {
            setTargetLang(res.data.languages.find((l: Language) => l.code === "es") || res.data.languages[1]);
          }
        }
      } catch {
        // Use fallback languages
      }
    };
    loadLanguages();
  }, [sourceLang, targetLang]);

  const handleTranslate = useCallback(async () => {
    if (!inputText.trim() || !sourceLang || !targetLang) return;
    setIsTranslating(true);
    setError(null);
    setResult(null);

    try {
      const res = await api.post("/translate", {
        text: inputText,
        sourceLanguage: sourceLang.code,
        targetLanguage: targetLang.code,
      });
      setResult(res.data);
    } catch {
      setError("Translation failed. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  }, [inputText, sourceLang, targetLang]);

  const handleQuickPhrase = (text: string) => {
    setInputText(text);
  };

  const swapLanguages = () => {
    const tempSource = sourceLang;
    const tempTarget = targetLang;
    setSourceLang(tempTarget);
    setTargetLang(tempSource);
    if (result?.translatedText) {
      setInputText(result.translatedText);
      setResult(null);
    }
  };

  const copyTranslation = async () => {
    if (!result?.translatedText) return;
    try {
      await navigator.clipboard.writeText(result.translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleTranslate();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 transition-colors">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-violet-600/5 dark:from-indigo-600/10 dark:to-violet-600/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-indigo-500/5 rounded-full blur-[100px]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-indigo-200 dark:border-indigo-800">
              <Sparkles className="w-4 h-4" />
              AI-Powered
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-3 font-display">
              AI Language
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Translator
              </span>
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-xl mx-auto">
              Translate text across 40+ languages with cultural context and pronunciation guides
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Main Translation Interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl shadow-neutral-200/50 dark:shadow-black/20 overflow-hidden mb-8"
        >
          {/* Language Selectors */}
          <div className="flex items-end gap-3 p-6 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
            <div className="flex-grow">
              <LanguageDropdown
                languages={languages}
                selected={sourceLang}
                onSelect={setSourceLang}
                label="From"
              />
            </div>

            <button
              onClick={swapLanguages}
              className="flex-shrink-0 w-12 h-12 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-xl flex items-center justify-center hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200 mb-0.5 shadow-sm"
              title="Swap languages"
            >
              <ArrowRightLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
            </button>

            <div className="flex-grow">
              <LanguageDropdown
                languages={languages}
                selected={targetLang}
                onSelect={setTargetLang}
                label="To"
              />
            </div>
          </div>

          {/* Text Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-100 dark:divide-neutral-800">
            {/* Source */}
            <div className="relative p-6">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type or paste text to translate..."
                className="w-full h-48 resize-none bg-transparent text-neutral-800 dark:text-neutral-200 text-base leading-relaxed focus:outline-none placeholder-neutral-400 dark:placeholder-neutral-500"
                maxLength={5000}
              />
              <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800 mt-3">
                <span className="text-xs text-neutral-400 dark:text-neutral-500">
                  {inputText.length} / 5,000 characters
                </span>
                <span className="text-xs text-neutral-400 dark:text-neutral-500">
                  Ctrl + Enter to translate
                </span>
              </div>
            </div>

            {/* Target */}
            <div className="relative p-6 bg-neutral-50 dark:bg-neutral-800/30 min-h-[220px]">
              {isTranslating ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4" />
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2" />
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6" />
                </div>
              ) : error ? (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <X className="w-4 h-4" />
                  {error}
                </div>
              ) : result?.translatedText ? (
                <div>
                  <p className="text-neutral-800 dark:text-neutral-200 text-base leading-relaxed mb-4">
                    {result.translatedText}
                  </p>
                  <button
                    onClick={copyTranslation}
                    className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy translation
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-neutral-400 dark:text-neutral-500 text-sm text-center">
                    Translation will appear here
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Translate Button */}
          <div className="p-6 border-t border-neutral-100 dark:border-neutral-800">
            <button
              onClick={handleTranslate}
              disabled={!inputText.trim() || isTranslating}
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3.5 rounded-2xl font-semibold hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
            >
              {isTranslating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Translating...
                </>
              ) : (
                <>
                  <Languages className="w-5 h-5" />
                  Translate
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Results Sections */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-6 mb-8"
            >
              {/* Cultural Notes */}
              {result.culturalNotes && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                      Cultural Notes
                    </h3>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {result.culturalNotes}
                  </p>
                </motion.div>
              )}

              {/* Pronunciation */}
              {result.pronunciation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                      <Volume2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                      Pronunciation Guide
                    </h3>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed font-mono text-sm bg-neutral-50 dark:bg-neutral-800 px-4 py-3 rounded-xl">
                    {result.pronunciation}
                  </p>
                </motion.div>
              )}

              {/* Alternative Translations */}
              {result.alternativeTranslations && result.alternativeTranslations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                      Alternative Translations
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.alternativeTranslations.map((alt, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-4 py-2 rounded-xl text-sm text-neutral-700 dark:text-neutral-300"
                      >
                        {alt}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Phrases */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                Quick Travel Phrases
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Click a phrase to translate instantly
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {QUICK_PHRASES.map((phrase, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -2 }}
                onClick={() => handleQuickPhrase(phrase.text)}
                className="flex items-start gap-3 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-left hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md transition-all duration-300 group"
              >
                <span className="text-2xl mt-0.5">{phrase.icon}</span>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                  {phrase.text}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Supported Languages Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-100 to-indigo-100 dark:from-sky-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center">
              <Languages className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                Supported Languages
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {languages.length} languages and counting
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {languages.map((lang, i) => (
              <motion.div
                key={lang.code}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.02, 0.5) }}
                whileHover={{ scale: 1.03, y: -2 }}
                onClick={() => {
                  setTargetLang(lang);
                  if (inputText.trim()) handleTranslate();
                }}
                className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md transition-all duration-300 cursor-pointer group"
              >
                <span className="text-2xl">{lang.flag}</span>
                <div className="min-w-0">
                  <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200 block truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {lang.name}
                  </span>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500 block truncate">
                    {lang.nativeName}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
