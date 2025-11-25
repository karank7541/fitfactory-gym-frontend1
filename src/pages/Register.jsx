import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      const res = await fetch(
        "https://fitfactory-backend1-production.up.railway.app/api/otp/register",
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

      if (!res.ok) {
        return alert(data.message);
      }

      alert("OTP sent to your email.");

      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (error) {
      console.log(error);
      alert("Network error!");
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
          
          {/* Name */}
          <div>
            <label className="font-medium text-gray-200">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 bg-white/20 p-3 text-white rounded-lg border border-white/30 outline-none"
              placeholder="Enter your full name"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="font-medium text-gray-200">Phone Number</label>
            <input
              type="text"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 bg-white/20 p-3 text-white rounded-lg border border-white/30 outline-none"
              placeholder="Enter your mobile number"
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-medium text-gray-200">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 bg-white/20 p-3 text-white rounded-lg border border-white/30 outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="font-medium text-gray-200">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 bg-white/20 p-3 text-white rounded-lg border border-white/30 outline-none"
                placeholder="Create a password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 cursor-pointer text-gray-300"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="font-medium text-gray-200">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full mt-1 bg-white/20 p-3 text-white rounded-lg border border-white/30 outline-none"
                placeholder="Re-enter password"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-4 cursor-pointer text-gray-300"
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-200">
          Already have an account?
          <Link to="/login" className="text-blue-400 ml-1 font-semibold hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;