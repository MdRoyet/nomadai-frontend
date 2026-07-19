"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import api from "@/lib/api";
import {
  Send,
  Loader2,
  Sparkles,
  Bot,
  User,
  Trash2,
  RotateCcw,
  MapPin,
  Compass,
  MessageSquare,
  Lightbulb,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
  suggestions?: string[];
  isStreaming?: boolean;
}

const WELCOME_SUGGESTIONS = [
  "Find me a beach trip under $300",
  "Show me mountain destinations",
  "What's available in Tokyo?",
  "Plan a romantic getaway",
];

const CONTEXTUAL_SUGGESTIONS: Record<string, string[]> = {
  beach: ["Show me more beach options", "Which is the cheapest?", "Any with pool?"],
  mountain: ["Any with hiking trails?", "Cheapest mountain stay?", "Winter options?"],
  urban: ["Nightlife spots?", "Best for foodies?", "Budget-friendly options?"],
  desert: ["Desert camping?", "Luxury desert stays?", "Best time to visit?"],
  price: ["Any cheaper options?", "Best value for money?", "Luxury alternatives?"],
  default: ["Tell me more", "Show me alternatives", "What do you recommend?"],
};

function getSuggestions(text: string): string[] {
  const lower = text.toLowerCase();
  if (lower.includes("beach") || lower.includes("sea") || lower.includes("ocean"))
    return CONTEXTUAL_SUGGESTIONS.beach;
  if (lower.includes("mountain") || lower.includes("alp") || lower.includes("hik"))
    return CONTEXTUAL_SUGGESTIONS.mountain;
  if (lower.includes("city") || lower.includes("urban") || lower.includes("tokyo") || lower.includes("paris"))
    return CONTEXTUAL_SUGGESTIONS.urban;
  if (lower.includes("desert") || lower.includes("safari") || lower.includes("dune"))
    return CONTEXTUAL_SUGGESTIONS.desert;
  if (lower.includes("price") || lower.includes("cheap") || lower.includes("budget") || lower.includes("under"))
    return CONTEXTUAL_SUGGESTIONS.price;
  return CONTEXTUAL_SUGGESTIONS.default;
}

function formatMessage(text: string): React.ReactNode {
  // Simple markdown-like formatting
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
    <div className="flex gap-3 justify-start">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="bg-neutral-50 border border-neutral-100 px-4 py-3 rounded-2xl rounded-tl-sm">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(scrollToBottom, [messages, scrollToBottom]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addMessage = (msg: Omit<Message, "id" | "timestamp">) => {
    return {
      ...msg,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
  };

  const handleSend = async (text?: string) => {
    const userText = text || input;
    if (!userText.trim() || isLoading) return;

    const userMessage = addMessage({ role: "user", content: userText });
    const streamingMessage = addMessage({
      role: "ai",
      content: "",
      isStreaming: true,
    });

    setMessages((prev) => [...prev, userMessage, streamingMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Format history for API
      const history = messages.map((m) => ({
        role: m.role === "user" ? "human" : "ai",
        content: m.content,
      }));

      // Try streaming first
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/ai/chat/stream`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userText, history }),
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

              // Check for errors
              if (parsed.error) {
                fullText = `Sorry, I encountered an error: ${parsed.error}`;
                break;
              }

              // Extract text from LangGraph stream events
              if (parsed.agent && parsed.agent.messages) {
                const msgs = parsed.agent.messages;
                for (const msg of msgs) {
                  if (msg.type === "AIMessageChunk" && msg.content) {
                    fullText += typeof msg.content === "string" ? msg.content : "";
                  } else if (msg.type === "AIMessage" && msg.content) {
                    fullText = typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content);
                  }
                }
              }

              // Also handle direct AIMessageChunk events
              if (parsed.AIMessageChunk?.content) {
                fullText += parsed.AIMessageChunk.content;
              }

              if (fullText) {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === streamingMessage.id
                      ? { ...m, content: fullText }
                      : m
                  )
                );
              }
            } catch {
              // Skip unparseable lines
            }
          }
        }
      }

      // Fallback: if streaming didn't produce text, use non-streaming
      if (!fullText) {
        const res = await api.post("/ai/chat", { message: userText, history });
        fullText = res.data.reply;
      }

      // Finalize with suggestions
      const suggestions = getSuggestions(fullText);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === streamingMessage.id
            ? { ...m, content: fullText, isStreaming: false, suggestions }
            : m
        )
      );
    } catch {
      // Fallback to non-streaming
      try {
        const history = messages.map((m) => ({
          role: m.role === "user" ? "human" : "ai",
          content: m.content,
        }));
        const res = await api.post("/ai/chat", { message: userText, history });
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
              ? {
                  ...m,
                  content:
                    "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
                  isStreaming: false,
                }
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

  const clearChat = () => {
    setMessages([]);
    inputRef.current?.focus();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-neutral-900">NomadAI Concierge</h1>
            <p className="text-sm text-emerald-600 font-medium">Online — Powered by Groq AI</p>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="p-2.5 rounded-xl border border-neutral-200 text-neutral-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all duration-200"
            title="Clear chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-neutral-100 shadow-xl overflow-hidden flex flex-col h-[65vh]">
        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-3xl flex items-center justify-center mb-6">
                <Compass className="w-10 h-10 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                How can I help you travel?
              </h2>
              <p className="text-neutral-500 mb-8 max-w-md">
                I can search our database, compare destinations, and help you plan the perfect trip.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                {WELCOME_SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="flex items-center gap-3 p-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-left hover:bg-teal-50 hover:border-teal-200 transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      {i === 0 && <MapPin className="w-4 h-4 text-teal-600" />}
                      {i === 1 && <Compass className="w-4 h-4 text-amber-600" />}
                      {i === 2 && <MessageSquare className="w-4 h-4 text-violet-600" />}
                      {i === 3 && <Lightbulb className="w-4 h-4 text-rose-600" />}
                    </div>
                    <span className="text-sm font-medium text-neutral-700 group-hover:text-teal-700 transition-colors">
                      {s}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div key={msg.id}>
                  <div
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "ai" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-teal-500/20">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="max-w-[75%]">
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          msg.role === "user"
                            ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-br-sm"
                            : "bg-neutral-50 border border-neutral-100 text-neutral-800 rounded-bl-sm"
                        }`}
                      >
                        {msg.isStreaming && !msg.content ? (
                          <div className="flex gap-1.5 py-1">
                            {[0, 1, 2].map((i) => (
                              <span
                                key={i}
                                className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
                                style={{ animationDelay: `${i * 0.15}s` }}
                              />
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {formatMessage(msg.content)}
                          </p>
                        )}
                      </div>
                      <p
                        className={`text-[10px] text-neutral-400 mt-1 ${
                          msg.role === "user" ? "text-right" : "text-left"
                        }`}
                      >
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                    {msg.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-neutral-600" />
                      </div>
                    )}
                  </div>

                  {/* Contextual suggestions after AI messages */}
                  {msg.role === "ai" && !msg.isStreaming && msg.suggestions && (
                    <div className="flex gap-2 mt-2 ml-11 flex-wrap">
                      {msg.suggestions.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(s)}
                          className="text-xs font-medium bg-white border border-neutral-200 text-neutral-600 px-3 py-1.5 rounded-full hover:border-teal-300 hover:text-teal-700 hover:bg-teal-50 transition-all duration-200"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <TypingIndicator />
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-neutral-100 p-4 bg-gradient-to-r from-neutral-50/50 to-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-3 items-center"
          >
            <div className="flex-grow relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about destinations, prices, or travel tips..."
                className="w-full px-5 py-3.5 bg-white border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-400 transition-all duration-200 text-sm shadow-sm"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white p-3.5 rounded-2xl hover:from-teal-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
