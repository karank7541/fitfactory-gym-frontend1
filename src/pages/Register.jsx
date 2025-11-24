import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";   // ✅ Added Link

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword)
      return alert("Passwords do not match!");

    try {
      const res = await fetch(
        "https://fitfactory-backend1.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      alert("OTP sent to your email! Please verify.");

      navigate("/verify-otp", {
        state: { email: formData.email },
      });
    } catch (err) {
      alert("Network error!");
      console.log(err);
    }
  };

  return (
    <div className="pt-28 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 px-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 animate-fadeIn">

        <h2 className="text-4xl font-bold text-center text-white mb-6">
          Create Account ✨
        </h2>

        <p className="text-center text-gray-300 mb-6">
          Join FitFactory & start your fitness journey today
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="font-medium text-gray-200">Full Name</label>
            <div className="mt-1 flex items-center bg-white/20 border border-white/30 rounded-lg px-3">
              <span className="text-white text-xl">👤</span>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full bg-transparent p-3 text-white placeholder-gray-300 outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="font-medium text-gray-200">Phone Number</label>
            <div className="mt-1 flex items-center bg-white/20 border border-white/30 rounded-lg px-3">
              <span className="text-white text-xl">📞</span>
              <input
                type="text"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className="w-full bg-transparent p-3 text-white placeholder-gray-300 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="font-medium text-gray-200">Email</label>
            <div className="mt-1 flex items-center bg-white/20 border border-white/30 rounded-lg px-3">
              <span className="text-white text-xl">📧</span>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-transparent p-3 text-white placeholder-gray-300 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="font-medium text-gray-200">Password</label>
            <div className="relative flex items-center bg-white/20 border border-white/30 rounded-lg px-3">
              <span className="text-white text-xl">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full bg-transparent p-3 text-white placeholder-gray-300 outline-none"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="font-medium text-gray-200">Confirm Password</label>
            <div className="relative flex items-center bg-white/20 border border-white/30 rounded-lg px-3">
              <span className="text-white text-xl">✔️</span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="w-full bg-transparent p-3 text-white placeholder-gray-300 outline-none"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-300"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-lg transition transform hover:scale-[1.02]"
          >
            Register
          </button>
        </form>

        {/* Login Link — FIXED */}
        <p className="mt-4 text-center text-gray-200">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-400 ml-1 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;