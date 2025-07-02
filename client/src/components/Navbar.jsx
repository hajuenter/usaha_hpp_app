import React, { useState } from "react";
import { assets } from "./../assets/assets";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  MenuIcon,
  XIcon,
  HomeIcon,
  CalculatorIcon,
  PhoneIcon,
} from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-4 md:px-16 lg:px-28 py-3 bg-gray-50 backdrop-blur border-b border-gray-200/20">
      <Link to="/" className="max-md:flex-1">
        <img src={assets.logo} alt="Logo" className="w-36 h-auto" />
      </Link>

      <div
        className={`${
          menuOpen ? "left-0" : "-left-1/4"
        } max-md:fixed max-md:top-0 max-md:z-40 max-md:w-1/4 max-md:h-screen max-md:flex max-md:flex-col max-md:justify-center max-md:items-center max-md:gap-8 max-md:backdrop-blur max-md:bg-black/70 transition-all duration-300 md:static md:flex md:flex-row md:gap-8 md:bg-transparent`}
      >
        <XIcon
          onClick={() => setMenuOpen(false)}
          className="md:hidden absolute top-6 justify-center w-8 h-8 cursor-pointer text-white"
        />

        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-2 ${
              isActive ? "text-blue-700" : "text-blue-600 md:text-black"
            } hover:text-blue-700 transition`
          }
        >
          <HomeIcon className="w-6 h-6" />
          <span className="hidden max-md:hidden md:inline">Home</span>
        </NavLink>

        <button
          onClick={() => {
            setMenuOpen(false);
            if (user) {
              navigate("/calculate");
            } else {
              toast.error("Silakan login terlebih dahulu");
            }
          }}
          className={`flex cursor-pointer items-center gap-2 text-blue-600 md:text-black hover:text-blue-700 transition`}
        >
          <CalculatorIcon className="w-6 h-6" />
          <span className="hidden max-md:hidden md:inline">Menghitung</span>
        </button>

        <NavLink
          to="/contact"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-2 ${
              isActive ? "text-blue-700" : "text-blue-600 md:text-black"
            } hover:text-blue-700 transition`
          }
        >
          <PhoneIcon className="w-6 h-6" />
          <span className="hidden max-md:hidden md:inline">Kontak</span>
        </NavLink>
      </div>

      <div className="flex items-center gap-3.5">
        {!user ? (
          <button
            onClick={() => openSignIn()}
            className="px-4 py-1 sm:px-7 text-white sm:py-2 bg-blue-600 hover:bg-blue-700 transition rounded-full font-medium cursor-pointer"
          >
            Login
          </button>
        ) : (
          <UserButton />
        )}

        {menuOpen ? (
          <XIcon
            onClick={() => setMenuOpen(false)}
            className="md:hidden w-8 h-8 cursor-pointer"
          />
        ) : (
          <MenuIcon
            onClick={() => setMenuOpen(true)}
            className="md:hidden w-8 h-8 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
