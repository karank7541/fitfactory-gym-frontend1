import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      window.location.href = "/";
      return;
    }

    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);

    setOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg"
          : "bg-white/50 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-3xl font-extrabold text-blue-600 tracking-wide cursor-pointer">
          FitFactory
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 text-lg font-medium">
          <li onClick={() => scrollToSection("home")} className="cursor-pointer hover:text-blue-600 transition">Home</li>
          <li onClick={() => scrollToSection("trainers")} className="cursor-pointer hover:text-blue-600 transition">Trainers</li>
          <li onClick={() => scrollToSection("plans")} className="cursor-pointer hover:text-blue-600 transition">Plans</li>

          <li onClick={() => scrollToSection("gallery")} className="cursor-pointer hover:text-blue-600 transition">Gallery</li>

          <li onClick={() => scrollToSection("feedback")} className="cursor-pointer hover:text-blue-600 transition">Feedback</li>

          <li onClick={() => scrollToSection("about")} className="cursor-pointer hover:text-blue-600 transition">About</li>
          <li onClick={() => scrollToSection("contact")} className="cursor-pointer hover:text-blue-600 transition">Contact</li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-5">
          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <button className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition font-semibold">
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-md">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">
                <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-md">
                  Dashboard
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className="px-5 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Icon */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-8 h-8 flex items-center justify-center"
        >
          {open ? (
            <svg className="w-7 h-7" fill="none" stroke="black" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="black" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-xl px-6 py-5 space-y-5 text-lg">

          <ul className="space-y-5 font-semibold">
            <li onClick={() => scrollToSection("home")} className="cursor-pointer hover:text-blue-600">Home</li>
            <li onClick={() => scrollToSection("trainers")} className="cursor-pointer hover:text-blue-600">Trainers</li>
            <li onClick={() => scrollToSection("plans")} className="cursor-pointer hover:text-blue-600">Plans</li>
            <li onClick={() => scrollToSection("gallery")} className="cursor-pointer hover:text-blue-600">Gallery</li>
            <li onClick={() => scrollToSection("feedback")} className="cursor-pointer hover:text-blue-600">Feedback</li>
            <li onClick={() => scrollToSection("about")} className="cursor-pointer hover:text-blue-600">About</li>
            <li onClick={() => scrollToSection("contact")} className="cursor-pointer hover:text-blue-600">Contact</li>
          </ul>

          <div className="border-t pt-6 space-y-4">
            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition font-semibold">
                    Login
                  </button>
                </Link>

                <Link to="/register">
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md">
                    Register
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard">
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                    Dashboard
                  </button>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full border border-red-600 text-red-600 py-3 rounded-lg hover:bg-red-600 hover:text-white transition font-semibold"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;