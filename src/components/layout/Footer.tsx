import Link from "next/link";
import { Compass, X, Camera, Link as LinkIcon, Link2Icon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Compass className="w-6 h-6 text-primary" />
              <span className="font-display font-bold text-xl text-white">
                NomadAI
              </span>
            </Link>
            <p className="text-sm">
              Discover the world with AI-powered precision. Your next adventure
              starts here.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-primary transition">
                  Explore
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/dashboard/ai"
                  className="hover:text-primary transition"
                >
                  AI Console
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-assistant"
                  className="hover:text-primary transition"
                >
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link
                  href="/items/add"
                  className="hover:text-primary transition"
                >
                  List Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="#"
                aria-label="Twitter"
                className="bg-neutral-800 p-2 rounded-lg hover:bg-primary transition"
              >
                <X className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="bg-neutral-800 p-2 rounded-lg hover:bg-primary transition"
              >
                <Camera className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                className="bg-neutral-800 p-2 rounded-lg hover:bg-primary transition"
              >
                <Link2Icon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-6 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} NomadAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
