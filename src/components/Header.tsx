

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube, FaSpotify, FaSoundcloud } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // ✅ Get logged-in user
  const storedUser = sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/"; // refresh + go home
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Albums", path: "/albums" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Videos", path: "/videos" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    !user ? { name: "Login", path: "/login" } : null,
    user ? { name: "My Account", path: "/purchases" } : null,
    { name: "Admin", path: "/admin" },
  ].filter(Boolean);

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Top Social Bar */}
      <div className="w-full bg-background/95 border-b border-border flex justify-end items-center px-4 py-1 gap-4 text-muted-foreground text-lg">
        <a href="https://www.facebook.com/vdjshaan.official" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com/vdjshaan" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
          <FaInstagram />
        </a>
        <a href="https://www.youtube.com/vdjshaan" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
          <FaYoutube />
        </a>
        <a href="https://open.spotify.com/artist/7uypXShthkQWrIUhpW6cJb" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
          <FaSpotify />
        </a>
        <a href="https://soundcloud.com/vdjshaan" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
          <FaSoundcloud />
        </a>
        <a href="https://twitter.com/vdjshaan" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
          <FaXTwitter />
        </a>
      </div>

      {/* Main Header */}
      <div className="bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-white rounded-full p-0.5 md:p-1 flex items-center justify-center">
                <img src="/vdj_logo.png" alt="VDJ Shaan Logo" className="h-12 w-12 md:h-14 md:w-14 object-contain" />
              </div>
              <span className="text-3xl font-bold text-neon animate-glow hover:scale-105 transition-transform duration-300">
                VDJ ShaaN
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                    isActive(item.path) ? "text-primary glow" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {user && (
                <>
                  <span className="text-sm font-medium text-primary">Hi, {user.name}</span>
                  <button onClick={handleLogout} className="text-sm font-medium text-red-500 hover:text-red-700">
                    Logout
                  </button>
                </>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-card border border-border rounded-lg mt-2 p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block py-2 px-3 rounded-md text-sm font-medium transition-colors duration-300 ${
                    isActive(item.path) ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-primary hover:bg-muted"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user && (
                <>
                  <span className="block py-2 px-3 text-sm font-medium text-primary">Hi, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 px-3 text-sm font-medium text-red-500 hover:text-red-700"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

