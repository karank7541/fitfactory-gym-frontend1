import React from "react";

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-extrabold text-white mb-4">FitFactory</h2>
          <p className="text-gray-400">
            Your transformation is our mission. Train smart. Stay healthy.
          </p>

          {/* Location */}
          <div className="mt-4">
            <a
              href="https://maps.app.goo.gl/ZWyFW8KYZTkjpU4i7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white flex items-center gap-2"
            >
              📍 View Location on Google Maps
            </a>
          </div>

          {/* Email */}
          <div className="mt-2">
            <a
              href="mailto:fitfactoryranchi@gmail.com"
              className="text-gray-400 hover:text-white flex items-center gap-2"
            >
              📧 fitfactoryranchi@gmail.com
            </a>
          </div>

          {/* WhatsApp Number (visible) */}
          <div className="mt-2">
            <a
              href="https://wa.me/917004305022"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white flex items-center gap-2"
            >
              💬 WhatsApp: 7004305022
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-white" onClick={() => scrollToSection("home")}>Home</li>
            <li className="cursor-pointer hover:text-white" onClick={() => scrollToSection("trainers")}>Trainers</li>
            <li className="cursor-pointer hover:text-white" onClick={() => scrollToSection("plans")}>Plans</li>
            <li className="cursor-pointer hover:text-white" onClick={() => scrollToSection("about")}>About</li>
            <li className="cursor-pointer hover:text-white" onClick={() => scrollToSection("contact")}>Contact</li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4 text-2xl">

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/fitfactory_ranchi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              📸
            </a>

            {/* YouTube */}
            <a 
              href="https://youtube.com/shorts/RPsXDbNButQ?si=x4GACYv2xJAjFdcq"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              ▶️
            </a>

            {/* WhatsApp Icon */}
            <a 
              href="https://wa.me/917004305022"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              💬
            </a>

          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 mt-10 text-sm">
        © {new Date().getFullYear()} FitFactory Gym. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;