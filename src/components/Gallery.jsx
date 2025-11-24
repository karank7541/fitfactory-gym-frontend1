import React, { useState, useEffect } from "react";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import videoFile from "../assets/video1.mp4";

const Gallery = () => {
  const [preview, setPreview] = useState(null);

  const media = [
    { type: "image", src: img1 },
    { type: "image", src: img2 },
    { type: "image", src: img3 },
    { type: "image", src: img4 },
    { type: "image", src: img5 },
    { type: "video", src: videoFile },
  ];

  // ESC Key → Close modal
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && setPreview(null);
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <section id="gallery" className="min-h-screen px-6 md:px-16 py-20 bg-gray-100">
      
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center">
        Our Gallery 📸
      </h2>
      <p className="text-gray-600 text-center mt-2 md:w-2/3 mx-auto">
        A glimpse of our workouts, events, and transformations.
      </p>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {media.map((item, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition"
            onClick={() => setPreview(item)}
          >
            {/* Image */}
            {item.type === "image" && (
              <img
                src={item.src}
                alt="gallery-img"
                className="w-full h-64 object-cover rounded-2xl group-hover:scale-110 transition duration-500"
              />
            )}

            {/* Video (thumbnail mode) */}
            {item.type === "video" && (
              <video
                src={item.src}
                muted
                className="w-full h-64 object-cover opacity-90 rounded-2xl group-hover:scale-110 transition duration-500"
              />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300" />

            {/* Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-white text-5xl drop-shadow-xl">
              {item.type === "video" ? "▶️" : "🔍"}
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="relative max-w-3xl w-full animate-fadeIn">

            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-white text-4xl hover:text-red-400 transition z-[9999]"
              onClick={() => setPreview(null)}
            >
              ✖
            </button>

            {/* Transparent Click Layer (Fix for video) */}
            <div className="absolute inset-0 z-[9000]"></div>

            {/* Actual Media */}
            {preview.type === "image" ? (
              <img
                src={preview.src}
                alt="preview"
                className="w-full rounded-xl shadow-xl relative z-[8000]"
              />
            ) : (
              <video
                src={preview.src}
                controls
                autoPlay
                className="w-full rounded-xl shadow-xl relative z-[8000]"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;