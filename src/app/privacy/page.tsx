"use client";

import { motion } from "framer-motion";
import { Shield, Calendar, ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "Information We Collect",
    content: `When you create a NomadAI account, we collect your name, email address, and profile information you choose to provide. As you use our platform, we automatically gather usage data such as pages visited, search queries, and booking history to improve our services. Payment information is collected solely through our secure payment processor, Stripe, and is never stored on our servers.`,
  },
  {
    title: "How We Use Your Information",
    content: `We use your information to provide and improve our travel services, personalize your experience, process bookings and payments, and communicate with you about your trips and account. Our AI assistant uses your preferences and past behavior to generate tailored travel recommendations. We may also use aggregated, anonymized data for analytics and product development.`,
  },
  {
    title: "Information Sharing",
    content: `We share your information with hosts only when you make a booking — they receive your name and trip details necessary to fulfill the reservation. We do not sell your personal data to third parties. We may share anonymized data with research partners, and we may disclose information when required by law or to protect the safety of our users and the public.`,
  },
  {
    title: "Data Security",
    content: `We implement industry-standard security measures including AES-256 encryption for data at rest, TLS 1.3 for data in transit, and regular security audits. Our infrastructure is hosted on SOC 2 compliant cloud providers. Despite our best practices, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "Cookies and Tracking",
    content: `NomadAI uses essential cookies to maintain your session and preferences. We also use analytics cookies to understand how visitors interact with our platform, which helps us improve the user experience. You can manage cookie preferences through your browser settings. We do not use third-party advertising trackers without your explicit consent.`,
  },
  {
    title: "Your Rights",
    content: `Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data. You can request a copy of your data or account deletion at any time through your account settings or by contacting our privacy team. We will respond to data requests within 30 days as required by applicable law.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this privacy policy from time to time to reflect changes in our practices or applicable laws. Material changes will be communicated via email or prominent notice on our platform at least 30 days before they take effect. Your continued use of NomadAI after changes take effect constitutes acceptance of the updated policy.`,
  },
  {
    title: "Contact Us",
    content: `If you have questions about this privacy policy or our data practices, please contact our Data Protection Officer at privacy@nomadai.com. You may also reach us by mail at NomadAI Inc., 123 Adventure Lane, San Francisco, CA 94102, or by calling our privacy hotline at +1 (555) 123-4568.`,
  },
];

export default function PrivacyPage() {
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
            <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Legal
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Privacy Policy
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
            <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/40 rounded-2xl p-6 mb-10">
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                At NomadAI, we take your privacy seriously. This policy describes
                how we collect, use, and protect your personal information when
                you use our platform and services. By using NomadAI, you agree to
                the practices described in this policy.
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
