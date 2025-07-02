import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { Instagram, Twitter, Facebook, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-10 px-4 md:px-16 lg:px-28 py-5 lg:py-8 text-sm text-gray-600">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo & Copyright */}
        <div className="text-center md:text-left">
          <h1 className="text-center pb-3 text-2xl font-semibold">
            Hajuenter Work
          </h1>
          <p className="mt-1 text-gray-500">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6 text-gray-500">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/calculate" className="hover:text-blue-600 transition">
            Menghitung
          </Link>
          <Link to="/contact" className="hover:text-blue-600 transition">
            Kontak
          </Link>
        </div>
      </div>

      {/* Optional: Social media */}
      <div className="mt-6 flex justify-center gap-2 lg:gap-6 md:gap-6 text-gray-700">
        <a
          href="https://instagram.com/shusui_songolas"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 hover:text-blue-600 transition"
        >
          <Instagram className="w-5 h-5" />
          Instagram
        </a>

        <a
          href="https://x.com/shusui_songolas"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 hover:text-blue-600 transition"
        >
          <Twitter className="w-5 h-5" />
          Twitter
        </a>

        <a
          href="https://web.facebook.com/profile.php?id=100009064796323"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 hover:text-blue-600 transition"
        >
          <Facebook className="w-5 h-5" />
          Facebook
        </a>

        <a
          href="https://github.com/hajuenter"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 hover:text-blue-600 transition"
        >
          <Github className="w-5 h-5" />
          Github
        </a>
      </div>
    </footer>
  );
};

export default Footer;
