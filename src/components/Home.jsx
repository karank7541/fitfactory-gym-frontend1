import React from "react";
import heroImg from "../assets/hero.png"; // 👈 AAP YAHAN APNI PHOTO RAKH DENA

const Home = () => {
  return (
    <section
      id="home"
      className="pt-24 min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 
                 bg-gradient-to-br from-gray-900 via-gray-800 to-black
                 text-white"
    >
      {/* ------------------------ LEFT CONTENT ------------------------ */}
      <div
        className="flex-1 text-center md:text-left mt-20 md:mt-0"
        data-aos="fade-right"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-xl">
          Transform Your Body <br />  
          <span className="text-blue-400">Build Your Confidence 💪</span>
        </h1>

        <p className="text-lg text-gray-300 mt-4 md:w-3/4">
          Join FitFactory — Where fitness meets dedication.  
          World-class trainers • Premium equipment • Real transformation.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4 justify-center md:justify-start">
          
          {/* Join Now → Scroll to Plans */}
          <button
            onClick={() =>
              document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
          >
            Join Now
          </button>

          <button
            onClick={() =>
              document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-6 py-3 border border-blue-400 text-blue-400 rounded-xl 
                       hover:bg-blue-500 hover:text-white transition font-semibold"
          >
            Explore Plans
          </button>
        </div>
      </div>

      {/* ------------------------ RIGHT IMAGE ------------------------ */}
      <div
        className="flex-1 flex justify-center mt-12 md:mt-0"
        data-aos="fade-left"
      >
        <img
          src={heroImg}
          alt="FitFactory Gym"
          className="w-full max-w-md rounded-3xl shadow-2xl border border-gray-700"
        />
      </div>
    </section>
  );
};

export default Home;