"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Plane,
  Send,
  Shield,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Mail,
  Gift,
  Bell,
  Globe,
  Zap,
  Heart,
} from "lucide-react";

const benefits = [
  { icon: Gift, text: "Exclusive weekly deals & flash sales" },
  { icon: Bell, text: "Early access to new AI features" },
  { icon: Globe, text: "Curated destination guides & tips" },
  { icon: Zap, text: "AI travel planning insights" },
];

const trustBadges = [
  { icon: Shield, text: "No spam, ever" },
  { icon: CheckCircle2, text: "Unsubscribe anytime" },
  { icon: Heart, text: "15,000+ subscribers" },
];

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-700" />

      {/* Mesh pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
        backgroundSize: "24px 24px",
      }} />

      {/* Floating elements */}
      <motion.div
        className="absolute top-12 left-[10%] w-20 h-20 bg-white/5 rounded-3xl rotate-12"
        animate={{ rotate: [12, 20, 12], y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-16 right-[15%] w-16 h-16 bg-white/5 rounded-2xl -rotate-6"
        animate={{ rotate: [-6, -15, -6], y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-1/3 right-[8%] w-12 h-12 bg-white/5 rounded-xl rotate-45"
        animate={{ rotate: [45, 55, 45] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Glow orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-teal-300/10 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
              <Sparkles className="w-4 h-4" />
              Join 15,000+ Travelers
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Plan Your
              <br />
              <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                Next Adventure?
              </span>
            </h2>

            <p className="text-white/80 text-lg mb-10 max-w-lg leading-relaxed">
              Subscribe to our newsletter for exclusive deals, AI-powered travel tips, and handpicked destination highlights delivered weekly to your inbox.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-10">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
                    <benefit.icon className="w-5 h-5 text-amber-300" />
                  </div>
                  <span className="text-white/90 font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4">
              {trustBadges.map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-white/60 text-sm"
                >
                  <badge.icon className="w-4 h-4" />
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side — Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Card glow */}
              <div className={`absolute -inset-1 bg-gradient-to-r from-teal-400/20 to-emerald-400/20 rounded-3xl blur-xl transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`} />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Get Travel Deals</h3>
                    <p className="text-white/60 text-sm">Weekly inspiration & offers</p>
                  </div>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">You&apos;re In!</h4>
                    <p className="text-white/70">
                      Check your inbox for a welcome gift from NomadAI.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 px-5 py-4 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white py-4 rounded-2xl font-bold text-lg hover:from-amber-500 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 group"
                    >
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                      Subscribe for Free
                    </button>

                    <p className="text-white/40 text-xs text-center">
                      By subscribing, you agree to our Terms & Privacy Policy
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Mini stats below card */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { value: "40+", label: "Destinations" },
                { value: "98%", label: "Open Rate" },
                { value: "4.9★", label: "Rating" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center"
                >
                  <p className="text-white font-bold text-lg">{stat.value}</p>
                  <p className="text-white/50 text-xs">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
