import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://fitfactory-backend1-production.up.railway.app/api/auth/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await res.json();

      if (!res.ok) return alert(data.message);

      alert("OTP Verified Successfully! You can now login.");
      navigate("/login");
    } catch (err) {
      alert("Network Error!");
      console.log(err);
    }
  };

  if (!email) {
    return (
      <div className="pt-28 text-center text-xl text-white bg-gray-900 min-h-screen">
        <p>Email missing. Please register again.</p>
      </div>
    );
  }

  return (
    <div className="pt-28 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 px-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 animate-fadeIn">

        <h2 className="text-3xl font-bold text-center mb-4 text-white">
          Verify OTP 🔐
        </h2>

        <p className="text-center text-gray-300 mb-6">
          OTP sent to <span className="font-semibold text-blue-400">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="font-medium text-gray-200">Enter OTP</label>
            <div className="mt-2 flex items-center bg-white/20 border border-white/30 rounded-lg px-3">
              <span className="text-white text-xl">🔢</span>
              <input
                type="text"
                maxLength={4}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="4-digit OTP"
                className="w-full bg-transparent p-3 text-white placeholder-gray-300 outline-none text-lg tracking-widest"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-lg transition transform hover:scale-[1.02]"
          >
            Verify OTP
          </button>
        </form>

        {/* FIXED: No more refresh issue */}
        <p className="mt-4 text-center text-gray-300">
          Wrong email?
          <Link
            to="/register"
            className="text-blue-400 ml-1 font-semibold hover:underline"
          >
            Register again
          </Link>
        </p>

      </div>
    </div>
  );
};

export default VerifyOtp;