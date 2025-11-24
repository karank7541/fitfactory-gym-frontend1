import React from "react";
import aboutImg from "../assets/about-img.jpg"; // ← तुम अपनी image यहाँ रख देना

const About = () => {
  return (
    <section
      id="about"
      className="scroll-mt-24 py-20 px-6 md:px-16 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

        {/* Left Image */}
        <div
          className="group relative overflow-hidden rounded-2xl shadow-xl"
        >
          <img
            src={aboutImg}
            alt="FitFactory Gym"
            className="rounded-2xl w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
          />

          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-40 transition duration-500 rounded-2xl"></div>
        </div>

        {/* Right Text */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            About FitFactory 🏋️‍♂️
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            At FitFactory, we believe fitness is more than lifting weights — it's a
            lifestyle. Our mission is to help you become stronger, healthier, and more
            confident every single day.
          </p>

          <h3 className="text-2xl font-bold text-gray-800">
            Our Mission 🎯
          </h3>
          <p className="text-gray-600 leading-relaxed">
            To provide the best training environment with modern equipment,
            professional trainers, and structured programs that match every fitness
            level.
          </p>

          <h3 className="text-2xl font-bold text-gray-800">
            Why Choose Us? ⭐
          </h3>

          <ul className="text-gray-700 space-y-3">
            <li className="flex items-center gap-2">
              <span className="text-blue-600 text-xl">✔</span>
              Certified and experienced trainers
            </li>

            <li className="flex items-center gap-2">
              <span className="text-blue-600 text-xl">✔</span>
              Full gym + strength + cardio setup
            </li>

            <li className="flex items-center gap-2">
              <span className="text-blue-600 text-xl">✔</span>
              Clean and safe workout environment
            </li>

            <li className="flex items-center gap-2">
              <span className="text-blue-600 text-xl">✔</span>
              Custom workout & diet plans
            </li>

            <li className="flex items-center gap-2">
              <span className="text-blue-600 text-xl">✔</span>
              Affordable memberships for everyone
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default About;