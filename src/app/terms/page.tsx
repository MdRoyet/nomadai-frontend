"use client";

import { motion } from "framer-motion";
import { FileText, Calendar, ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "Acceptance of Terms",
    content: `By accessing or using NomadAI, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. These terms apply to all visitors, users, and others who access or use the service. We reserve the right to modify these terms at any time, and continued use after changes constitutes acceptance.`,
  },
  {
    title: "User Accounts",
    content: `You must be at least 18 years old to create a NomadAI account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You agree to provide accurate, current, and complete information during registration and to update it as necessary. One person or entity may not maintain more than one account.`,
  },
  {
    title: "Acceptable Use",
    content: `You agree to use NomadAI only for lawful purposes and in accordance with these terms. You may not use the platform to engage in any fraudulent, harassing, or harmful activity, to impersonate any person or entity, to interfere with the platform's operation, or to violate any applicable local, state, national, or international law or regulation.`,
  },
  {
    title: "Intellectual Property",
    content: `The NomadAI platform, including its design, code, content, trademarks, and logos, is owned by NomadAI Inc. and protected by intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to use the platform for personal travel purposes. You may not copy, modify, distribute, sell, or lease any part of our service without written consent.`,
  },
  {
    title: "Bookings and Transactions",
    content: `When you make a booking through NomadAI, you enter into a direct agreement with the host or service provider. NomadAI acts as an intermediary platform facilitating the transaction. All prices are displayed in your selected currency and include applicable fees unless stated otherwise. Payment is processed securely through our third-party payment processor.`,
  },
  {
    title: "Limitation of Liability",
    content: `NomadAI is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform. Our total liability to you shall not exceed the greater of the amount you paid to us in the past twelve months or one hundred dollars. We do not guarantee uninterrupted or error-free service.`,
  },
  {
    title: "Governing Law",
    content: `These Terms of Service are governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions. Any disputes arising under these terms shall be resolved in the state or federal courts located in San Francisco County, California.`,
  },
  {
    title: "Contact",
    content: `If you have any questions about these Terms of Service, please contact us at legal@nomadai.com. You may also write to us at NomadAI Inc., 123 Adventure Lane, San Francisco, CA 94102, or call our legal department at +1 (555) 123-4569.`,
  },
];

export default function TermsPage() {
  return (
    <div className="bg-white dark:bg-neutral-900 transition-colors">
      {/* Hero */}
      <section className="py-20 border-b border-neutral-100 dark:border-neutral-800 transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <a
              href="/"
              className="inline-flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-sm hover:text-primary-600 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>
            <div className="inline-flex items-center gap-2 bg-accent-100 dark:bg-accent-900/40 text-accent-700 dark:text-accent-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FileText className="w-4 h-4" />
              Legal
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Terms of Service
            </h1>
            <p className="flex items-center justify-center gap-2 text-neutral-500 dark:text-neutral-400">
              <Calendar className="w-4 h-4" />
              Last updated: January 15, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-accent-50 dark:bg-accent-900/20 border border-accent-100 dark:border-accent-800/40 rounded-2xl p-6 mb-10">
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Welcome to NomadAI. These Terms of Service govern your use of
                our platform, website, and services. Please read them carefully
                before using NomadAI. If you have any questions, feel free to
                contact our legal team.
              </p>
            </div>

            <div className="space-y-10">
              {sections.map((section, i) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                    {section.title}
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {section.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
