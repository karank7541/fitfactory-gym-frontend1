import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // submit form (backend untouched)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert(data.message || "Failed to send message!");
      }
    } catch (err) {
      alert("Network error!");
      console.log(err);
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 py-20 bg-gradient-to-br from-gray-50 to-gray-200 px-6 md:px-16"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800">
          Contact Us ✉️
        </h2>
        <p className="text-gray-600 text-center md:w-2/3 mx-auto mt-3">
          Have questions? Want to join? Reach out anytime — we respond fast!
        </p>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">

          {/* Left - Contact Info */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Get in Touch 📍
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Ask anything about membership, pricing, plans or gym services.
            </p>

            <ul className="space-y-5 mt-6 text-gray-700">

              <li className="flex items-center gap-3 text-lg">
                <span className="text-blue-600 text-2xl">📌</span>
                <a
                  href="https://maps.app.goo.gl/ZWyFW8KYZTkjpU4i7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600"
                >
                  View FitFactory on Google Maps
                </a>
              </li>

              <li className="flex items-center gap-3 text-lg">
                <span className="text-green-600 text-2xl">💬</span>
                <a
                  href="https://wa.me/917004305022"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600"
                >
                  WhatsApp: 7004305022
                </a>
              </li>

              <li className="flex items-center gap-3 text-lg">
                <span className="text-red-600 text-2xl">📧</span>
                <a
                  href="mailto:fitfactoryranchi@gmail.com"
                  className="hover:text-blue-600"
                >
                  fitfactoryranchi@gmail.com
                </a>
              </li>

            </ul>
          </div>

          {/* Right - Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Send a Message 💬
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div>
                <label className="font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full mt-2 p-3 bg-gray-50 border rounded-lg focus:border-blue-600 outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full mt-2 p-3 bg-gray-50 border rounded-lg focus:border-blue-600 outline-none"
                />
              </div>

              {/* Message */}
              <div>
                <label className="font-medium">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full mt-2 p-3 bg-gray-50 border rounded-lg focus:border-blue-600 outline-none"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold shadow-md"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;