// src/pages/ForgotPassword.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5001/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) return alert(data.message);

      alert("OTP sent to your email!");

      // move to verify page
      navigate("/verify-otp", {
        state: { email },
      });

    } catch (err) {
      alert("Network Error!");
      console.log(err);
    }
  };

  return (
    <div className="pt-28 min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

        <h2 className="text-3xl font-bold text-center mb-6">
          Forgot Password 🔐
        </h2>

        <p className="text-gray-600 text-center mb-4">
          Enter your email to receive the OTP.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="font-medium">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              className="w-full mt-1 p-3 border rounded-lg focus:border-blue-600 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Send OTP
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Remember password?
          <a href="/login" className="text-blue-600 ml-1 font-semibold hover:underline">
            Login
          </a>
        </p>

      </div>
    </div>
  );
};

export default ForgotPassword;