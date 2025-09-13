import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Music, Youtube, Instagram, Facebook, Twitter } from "lucide-react";
import { FaSpotify, FaSoundcloud } from "react-icons/fa";

interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

const footerLinks: Record<string, FooterLink[]> = {
  "Quick Links": [
    { name: "Home", href: "/" },
    { name: "Videos", href: "/videos" },
    { name: "About", href: "/about" },
    { name: "Audio", href: "/audio" },
    { name: "Albums", href: "/albums" },
  ],
  Legal: [
    { name: "Terms and Conditions", href: "/terms-of-service" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Agreement", href: "/agreement.pdf", external: true }, // 👈 PDF opens
    { name: "Licensing", href: "/licensing" },
  ],
  Support: [
    { name: "Help Center", href: "/contact" },
    { name: "Community", href: "/community" },
    { name: "Feedback", href: "/feedback" },
    { name: "Report Issue", href: "/reportissue" },
  ],
};

const socialLinks = [
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/vdjshaan", color: "hover:text-red-500" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/vdjshaan", color: "hover:text-pink-500" },
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/vdjshaan.official", color: "hover:text-blue-500" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/vdjshaan", color: "hover:text-blue-400" },
  { name: "Spotify", icon: FaSpotify, href: "https://open.spotify.com/artist/7uypXShthkQWrIUhpW6cJb", color: "hover:text-green-500" },
  { name: "SoundCloud", icon: FaSoundcloud, href: "https://soundcloud.com/vdjshaan", color: "hover:text-orange-500" },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubscribe = () => {
    if (!email.trim()) {
      setMessage("Enter your email first");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      return;
    }
    setMessage("You have successfully subscribed!");
    setEmail("");
  };

  return (
    <footer className="bg-card/30 backdrop-blur-sm border-t border-primary/20 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center glow">
                <Music className="h-6 w-6 text-background" />
              </div>
              <div className="text-2xl font-bold text-neon animate-glow">vdj Shaan</div>
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Crowned by the Times Group as India’s No.1 VDJ, and having worked with legends like Sonu Nigam, Salim–Sulaiman, and Singer Shaan, Shaan is no longer just an artist — he is a brand, a storyteller, and a global ambassador of India’s fusion sound
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground ${social.color} transition-all duration-300 hover:scale-110 hover:glow`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-foreground mb-6">{category}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-primary/20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">The business is engaged in the following activities:</h3>
              <p className="text-muted-foreground">
                <span className="block">• DJ performances and music entertainment</span>
                <span className="block">• Production and sale of digital music albums and edits (via online platforms and direct downloads)</span>
                <span className="block">• Event curation and live shows</span>
              </p>

            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-w-[300px]"
              />
              <button
                onClick={handleSubscribe}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300 glow whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>
          {message && (
            <p className={`mt-4 text-center ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
              {message}
            </p>
          )}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary/20">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {currentYear} VDJ Shaan &nbsp;&nbsp;&nbsp;All rights reserved.</p>
            <p className="text-gray-300">
              Developed by{" "}
              <a
                href="https://jakirulsk.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 transition-colors font-medium"
              >
                Jakirul Sk
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
