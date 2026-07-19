import Link from "next/link";
import {
  Sparkles,
  MapPin,
  Star,
  ArrowRight,
  Plane,
  BarChart3,
  FileText,
  Image as ImageIcon,
  Tags,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import HeroSlider from "@/components/home/HeroSlider";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/home/AnimatedSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section with Slider */}
      <HeroSlider />

      {/* 2. Stats Section */}
      <section className="py-16 bg-white border-b border-neutral-100">
        <StaggerContainer className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "150+", label: "Global Destinations" },
            { value: "50k+", label: "Happy Travelers" },
            { value: "1.2M", label: "AI Trips Planned" },
            { value: "99%", label: "Satisfaction Rate" },
          ].map((stat, i) => (
            <StaggerItem key={i}>
              <h3 className="text-4xl font-bold text-primary">{stat.value}</h3>
              <p className="text-neutral-500 mt-2">{stat.label}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 3. Top Categories (Cards) */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Explore by Category
            </h2>
            <p className="text-neutral-500 max-w-xl mx-auto">
              Find exactly what you&apos;re looking for, from quiet mountains to
              bustling cities.
            </p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Tropical Beaches",
                desc: "Sun, sand, and crystal clear waters.",
                icon: "🏖️",
              },
              {
                title: "Mountain Retreats",
                desc: "Breathtaking views and crisp air.",
                icon: "⛰️",
              },
              {
                title: "Urban Escapes",
                desc: "Vibrant nightlife and rich culture.",
                icon: "🏙️",
              },
              {
                title: "Desert Oasis",
                desc: "Unique landscapes and starry nights.",
                icon: "🐪",
              },
            ].map((cat, i) => (
              <StaggerItem key={i}>
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md hover:border-primary-100 transition cursor-pointer h-full">
                  <div className="text-4xl mb-4">{cat.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{cat.title}</h3>
                  <p className="text-neutral-500 text-sm">{cat.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              How NomadAI Works
            </h2>
            <p className="text-neutral-500">
              Three simple steps to your next journey.
            </p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Discover",
                desc: "Browse thousands of curated properties and destinations tailored to your taste.",
              },
              {
                step: "02",
                title: "Plan with AI",
                desc: "Use our AI console to generate itineraries, analyze travel docs, and match your budget.",
              },
              {
                step: "03",
                title: "Travel",
                desc: "Book your stay with confidence and explore the world with an AI assistant in your pocket.",
              },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="relative p-8 rounded-2xl bg-neutral-50 border border-neutral-100 h-full">
                  <span className="absolute top-6 right-6 text-5xl font-bold text-neutral-200">
                    {item.step}
                  </span>
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 5. AI Features Highlight */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <span className="text-secondary font-semibold tracking-wide">
              AI CONSOLE
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-3">
              7 Powerful Agentic AI Tools
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto">
              We go beyond basic text generation. Our AI agents reason, use
              tools, and analyze data.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <MessageSquare className="w-6 h-6" />,
                title: "AI Chat Concierge",
                desc: "Chat with an agent that searches our database in real-time to find you the perfect stay.",
              },
              {
                icon: <MapPin className="w-6 h-6" />,
                title: "Smart Trip Matcher",
                desc: "Analyzes your preferences and past views to recommend highly personalized trips.",
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Document Intelligence",
                desc: "Upload travel insurance or visa PDFs. AI extracts key dates and summarizes rules.",
              },
              {
                icon: <ImageIcon className="w-6 h-6" />,
                title: "Image Understanding",
                desc: "Hosts can upload a property photo, and AI auto-generates the entire listing description.",
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Data Analyzer",
                desc: "Upload booking CSV files. AI identifies occupancy trends and risks, visualized in charts.",
              },
              {
                icon: <Tags className="w-6 h-6" />,
                title: "Auto Classification",
                desc: "Automatically tags and categorizes new listings based on image and text context.",
              },
            ].map((feat, i) => (
              <StaggerItem key={i}>
                <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700 hover:border-primary transition group h-full">
                  <div className="bg-primary/20 text-primary p-3 rounded-xl inline-block mb-4 group-hover:bg-primary group-hover:text-white transition">
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
                  <p className="text-neutral-400 text-sm">{feat.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Loved by Travelers
            </h2>
            <div className="flex justify-center gap-1 text-secondary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="fill-secondary w-5 h-5" />
              ))}
            </div>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah J.",
                role: "Solo Traveler",
                text: "The AI Chat Concierge found me a hidden cabin in the Alps under $500. It was magical!",
              },
              {
                name: "Mark T.",
                role: "Digital Nomad",
                text: "Uploading my visa PDF and having the AI extract the exact expiration date saved me hours of stress.",
              },
              {
                name: "Elena R.",
                role: "Host",
                text: "The image understanding tool wrote my entire property listing from 3 photos. Closed 5 bookings that week.",
              },
            ].map((rev, i) => (
              <StaggerItem key={i}>
                <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 flex flex-col h-full">
                  <p className="text-neutral-700 italic mb-6 flex-grow">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900">
                        {rev.name}
                      </h4>
                      <p className="text-sm text-neutral-500">{rev.role}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 7. Newsletter / CTA */}
      <section className="py-20 bg-primary-50">
        <AnimatedSection className="max-w-4xl mx-auto px-4 text-center">
          <Plane className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Plan Your Next Trip?
          </h2>
          <p className="text-neutral-600 mb-8 max-w-xl mx-auto">
            Join our newsletter for exclusive deals, AI travel tips, and
            destination highlights.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-5 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>

          <div className="flex justify-center items-center gap-2 mt-6 text-sm text-neutral-500">
            <ShieldCheck className="w-4 h-4" />
            We respect your privacy. Unsubscribe anytime.
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
