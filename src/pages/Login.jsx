import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      alert("Login Successful!");
      localStorage.setItem("token", data.token);

      // Fetch full user data
      const userRes = await fetch("http://localhost:5001/api/auth/dashboard", {
        method: "GET",
        headers: {
          Authorization: data.token,
        },
      });

      const userData = await userRes.json();
      if (!userRes.ok) return alert("Could not load user data");

      localStorage.setItem("user", JSON.stringify(userData.user));
      navigate("/dashboard");

    } catch (err) {
      alert("Network Error!");
      console.log(err);
    }
  };

  return (
    <div className="pt-28 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 px-4">

      {/* Card */}
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 animate-fadeIn">

        <h2 className="text-4xl font-bold text-center text-white mb-6">
          Welcome Back 👋
        </h2>

        <p className="text-center text-gray-300 mb-6">
          Login to continue your fitness journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email Field */}
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

          {/* Password Field */}
          <div>
            <label className="font-medium text-gray-200">Password</label>
            <div className="mt-1 flex items-center bg-white/20 border border-white/30 rounded-lg px-3 relative">
              <span className="text-white text-xl">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-transparent p-3 text-white placeholder-gray-300 outline-none"
              />
              <span
                className="absolute right-3 top-3 text-gray-200 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-lg transition transform hover:scale-[1.02]"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-4 text-center text-gray-200">
          Don’t have an account?
          <a
            href="/register"
            className="text-blue-400 ml-1 font-semibold hover:underline"
          >
            Register
          </a>
        </p>

      </div>
    </div>
  );
};

export default Login;