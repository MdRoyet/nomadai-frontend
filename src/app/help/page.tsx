"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  Search,
  ChevronDown,
  MessageSquare,
  Mail,
  Phone,
  CreditCard,
  Shield,
  Globe,
  Settings,
  Users,
  MapPin,
} from "lucide-react";

const faqs = [
  {
    category: "Getting Started",
    icon: Globe,
    question: "How do I create a NomadAI account?",
    answer:
      "Click the 'Sign Up' button in the top right corner of the homepage. You can register using your email address, Google account, or Apple ID. Once registered, complete your traveler profile to get personalized recommendations.",
  },
  {
    category: "Getting Started",
    icon: Settings,
    question: "How does the AI travel assistant work?",
    answer:
      "Our AI assistant learns your travel preferences — budget, interests, pace, and style — to generate personalized itineraries. Simply chat with the assistant, tell it where you want to go (or let it suggest destinations), and it will create a day-by-day plan with activities, restaurants, and accommodations tailored to you.",
  },
  {
    category: "Bookings",
    icon: CreditCard,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers in select regions. All transactions are processed securely through Stripe.",
  },
  {
    category: "Bookings",
    icon: MapPin,
    question: "Can I modify or cancel my booking?",
    answer:
      "Yes, most bookings can be modified or cancelled directly from your dashboard. Cancellation policies vary by host — you can see the specific policy before confirming any booking. Free cancellation is available within 48 hours for most listings.",
  },
  {
    category: "Account & Security",
    icon: Shield,
    question: "How is my personal data protected?",
    answer:
      "We use industry-standard encryption (AES-256) for data storage and TLS 1.3 for data in transit. Your payment information is never stored on our servers. We comply with GDPR, CCPA, and other data protection regulations. See our Privacy Policy for full details.",
  },
  {
    category: "Account & Security",
    icon: Users,
    question: "How do I become a host on NomadAI?",
    answer:
      "Navigate to 'Become a Host' from the navigation menu. You'll need to verify your identity, provide details about your property or experience, and set your pricing and availability. Listings are reviewed within 48 hours before going live.",
  },
  {
    category: "Support",
    icon: MessageSquare,
    question: "What should I do if I have an issue during my trip?",
    answer:
      "Contact our 24/7 support team through the in-app chat, call our emergency hotline, or email support@nomadai.com. For urgent safety issues, use the SOS button in the app for immediate assistance. Our team will coordinate with local contacts to resolve any problems.",
  },
  {
    category: "Support",
    icon: Mail,
    question: "How do I report a problem with a listing or host?",
    answer:
      "You can report issues directly from the listing page or your booking details. Click the 'Report' button and describe the issue. Our Trust & Safety team investigates all reports within 24 hours and will follow up with you on the resolution.",
  },
];

const categories = [...new Set(faqs.map((faq) => faq.category))];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-neutral-900 transition-colors">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-primary-900/20 dark:via-neutral-900 dark:to-accent-900/10 py-24 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4" />
              Help Center
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              How Can We{" "}
              <span className="text-primary-600">Help You?</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
              Find answers to common questions or reach out to our support team.
              We&apos;re here to make your travel experience seamless.
            </p>

            {/* Search */}
            <div className="max-w-lg mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-neutral-200 dark:border-neutral-700 rounded-2xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-lg transition-colors text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((category) => {
            const categoryFaqs = filteredFaqs.filter(
              (faq) => faq.category === category
            );
            if (categoryFaqs.length === 0) return null;

            return (
              <div key={category} className="mb-10">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
                  {(() => {
                    const Icon = categoryFaqs[0]?.icon;
                    return Icon ? <Icon className="w-5 h-5 text-primary-600" /> : null;
                  })()}
                  {category}
                </h2>
                <div className="space-y-3">
                  {categoryFaqs.map((faq) => {
                    const globalIndex = faqs.indexOf(faq);
                    const isOpen = openIndex === globalIndex;

                    return (
                      <motion.div
                        key={faq.question}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-sm transition-colors"
                      >
                        <button
                          onClick={() =>
                            setOpenIndex(isOpen ? null : globalIndex)
                          }
                          className="w-full flex items-center justify-between p-5 text-left"
                        >
                          <span className="font-medium text-neutral-900 dark:text-neutral-100 pr-4">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 text-neutral-500 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800 pt-4">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-16 text-neutral-500 dark:text-neutral-400">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No results found for &quot;{searchQuery}&quot;</p>
              <p className="text-sm mt-2">
                Try a different search term or browse the categories below.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-accent-600 to-accent-700 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Still Need Help?
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
              Our support team is available 24/7 to assist you with any questions
              or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-accent-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-accent-50 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Contact Support
              </a>
              <a
                href="tel:+15551234567"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                <Phone className="w-5 h-5" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
