"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Bot,
  User,
  Sparkles,
  Minimize2,
  MapPin,
  Compass,
  Lightbulb,
  RotateCcw,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
  suggestions?: string[];
  isStreaming?: boolean;
}

// Page context mapping for smarter recommendations
const PAGE_CONTEXT: Record<string, string> = {
  "/": "home page - user is browsing the main landing page",
  "/explore": "explore page - user is browsing and filtering destinations",
  "/destinations": "destinations marketplace - user is viewing property listings",
  "/ai-assistant": "AI assistant page - user wants AI help",
  "/dashboard": "user dashboard - user is managing their account",
  "/about": "about page - user is learning about NomadAI",
  "/register": "registration page - user is creating an account",
  "/login": "login page - user is logging in",
};

const QUICK_ACTIONS: { icon: typeof MapPin; label: string; prompt: string; color: string }[] = [
  { icon: MapPin, label: "Beach Getaway", prompt: "Recommend me a beach destination under $300", color: "text-cyan-600" },
  { icon: Compass, label: "Mountain Escape", prompt: "Show me mountain retreats with great views", color: "text-emerald-600" },
  { icon: Lightbulb, label: "Surprise Me", prompt: "Surprise me with your top 3 recommendations", color: "text-amber-600" },
];

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatMessage(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|\n)/g);
  return parts.map((part, i) => {
    if (part === "\n") return <br key={i} />;
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function TypingIndicator() {
  return (
    <div className="flex gap-2.5 items-start">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-sm">
        <Bot className="w-3.5 h-3.5 text-white" />
      </div>
      <div className="bg-neutral-100 px-3.5 py-2.5 rounded-2xl rounded-tl-sm">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(scrollToBottom, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setUnread(0);
    }
  }, [isOpen]);

  const getContext = () => {
    for (const [path, ctx] of Object.entries(PAGE_CONTEXT)) {
      if (pathname === path || pathname.startsWith(path + "/")) return ctx;
    }
    return `page: ${pathname}`;
  };

  const addMessage = (msg: Omit<Message, "id" | "timestamp">) => ({
    ...msg,
    id: crypto.randomUUID(),
    timestamp: new Date(),
  });

  const handleSend = async (text?: string) => {
    const userText = text || input;
    if (!userText.trim() || isLoading) return;

    const userMessage = addMessage({ role: "user", content: userText });
    const streamingMessage = addMessage({ role: "ai", content: "", isStreaming: true });

    setMessages((prev) => [...prev, userMessage, streamingMessage]);
    setInput("");
    setIsLoading(true);

    if (!isOpen) setUnread((p) => p + 1);

    try {
      const history = messages.map((m) => ({
        role: m.role === "user" ? "human" : "ai",
        content: m.content,
      }));

      const context = getContext();

      // Try streaming
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/ai/chat/stream`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userText, history, context }),
        }
      );

      if (!response.ok) throw new Error("Stream failed");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

          for (const line of lines) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.error) {
                fullText = `Error: ${parsed.error}`;
                break;
              }
              if (parsed.agent?.messages) {
                for (const msg of parsed.agent.messages) {
                  if ((msg.type === "AIMessageChunk" || msg.type === "AIMessage") && msg.content) {
                    fullText = typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content);
                  }
                }
              }
              if (fullText) {
                setMessages((prev) =>
                  prev.map((m) => m.id === streamingMessage.id ? { ...m, content: fullText } : m)
                );
              }
            } catch { /* skip */ }
          }
        }
      }

      // Fallback
      if (!fullText) {
        const res = await api.post("/ai/chat", { message: userText, history, context });
        fullText = res.data.reply;
      }

      const suggestions = getSuggestions(fullText);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === streamingMessage.id
            ? { ...m, content: fullText, isStreaming: false, suggestions }
            : m
        )
      );

      if (!isOpen) setUnread((p) => p + 1);
    } catch {
      try {
        const history = messages.map((m) => ({
          role: m.role === "user" ? "human" : "ai",
          content: m.content,
        }));
        const res = await api.post("/ai/chat", { message: userText, history, context: getContext() });
        const suggestions = getSuggestions(res.data.reply);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === streamingMessage.id
              ? { ...m, content: res.data.reply, isStreaming: false, suggestions }
              : m
          )
        );
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === streamingMessage.id
              ? { ...m, content: "Sorry, I'm having trouble right now. Please try again.", isStreaming: false }
              : m
          )
        );
      }
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => setMessages([]);

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full shadow-2xl shadow-teal-500/30 flex items-center justify-center text-white hover:shadow-teal-500/40 transition-shadow"
          >
            <MessageCircle className="w-6 h-6" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center text-white border-2 border-white">
                {unread > 9 ? "9+" : unread}
              </span>
            )}
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-teal-400 animate-ping opacity-20" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[520px] bg-white rounded-3xl shadow-2xl border border-neutral-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-300 rounded-full border-2 border-teal-500" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">NomadAI Assistant</h3>
                  <p className="text-white/70 text-[11px]">Online — Ask me anything</p>
                </div>
              </div>
              <div className="flex gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={clearChat}
                    className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
                    title="Clear chat"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-3 space-y-3">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-4">
                    <Sparkles className="w-7 h-7 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-1 text-sm">Need travel help?</h3>
                  <p className="text-neutral-500 text-xs mb-5">
                    I can find destinations, compare prices, and plan your trip.
                  </p>

                  {/* Quick Actions */}
                  <div className="w-full space-y-2">
                    {QUICK_ACTIONS.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(action.prompt)}
                        className="w-full flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-100 rounded-xl text-left hover:bg-teal-50 hover:border-teal-200 transition-all duration-200 group"
                      >
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <action.icon className={`w-4 h-4 ${action.color}`} />
                        </div>
                        <span className="text-xs font-medium text-neutral-700 group-hover:text-teal-700">
                          {action.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <div key={msg.id}>
                      <div className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        {msg.role === "ai" && (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <div className="max-w-[80%]">
                          <div
                            className={`px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                              msg.role === "user"
                                ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-br-sm"
                                : "bg-neutral-100 text-neutral-800 rounded-bl-sm"
                            }`}
                          >
                            {msg.isStreaming && !msg.content ? (
                              <div className="flex gap-1 py-0.5">
                                {[0, 1, 2].map((i) => (
                                  <span
                                    key={i}
                                    className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"
                                    style={{ animationDelay: `${i * 0.15}s` }}
                                  />
                                ))}
                              </div>
                            ) : (
                              <p className="whitespace-pre-wrap">{formatMessage(msg.content)}</p>
                            )}
                          </div>
                          <p className={`text-[9px] text-neutral-400 mt-0.5 ${msg.role === "user" ? "text-right" : ""}`}>
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                        {msg.role === "user" && (
                          <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center flex-shrink-0">
                            <User className="w-3 h-3 text-neutral-600" />
                          </div>
                        )}
                      </div>

                      {/* Inline suggestions */}
                      {msg.role === "ai" && !msg.isStreaming && msg.suggestions && (
                        <div className="flex gap-1.5 mt-1.5 ml-8 flex-wrap">
                          {msg.suggestions.map((s, i) => (
                            <button
                              key={i}
                              onClick={() => handleSend(s)}
                              className="text-[10px] font-medium bg-white border border-neutral-200 text-neutral-600 px-2 py-1 rounded-full hover:border-teal-300 hover:text-teal-700 transition"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && messages[messages.length - 1]?.role === "user" && <TypingIndicator />}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-neutral-100 p-3">
              <div className="flex gap-2 items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about destinations..."
                  className="flex-grow px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-400 transition"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white p-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-teal-500/20"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function getSuggestions(text: string): string[] {
  const lower = text.toLowerCase();
  if (lower.includes("beach") || lower.includes("sea")) return ["More beach options", "Cheapest option?", "Any with pool?"];
  if (lower.includes("mountain") || lower.includes("alp")) return ["Hiking nearby?", "Winter stays?", "Budget options?"];
  if (lower.includes("city") || lower.includes("urban")) return ["Nightlife spots?", "Food scene?", "Best for couples?"];
  if (lower.includes("desert")) return ["Desert camping?", "Luxury options?", "Best season?"];
  return ["Tell me more", "Show alternatives", "What do you recommend?"];
}
