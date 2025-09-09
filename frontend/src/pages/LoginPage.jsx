import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://social-meidia-application.onrender.com/api/auth/login",
        { email, password },
        { withCredentials: true } // ✅ important for cookies
      );

      toast.success("✅ Login successful!");
      console.log("User data:", res.data);

      // redirect after login
      setTimeout(() => {
        window.location.href = "/main";
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b0c10] via-[#1f2833] to-[#0b0c10] px-4">
      <div className="w-full max-w-md bg-[#161b22] border border-gray-700 p-8 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.7)]">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="h-14 w-14 bg-gradient-to-tr from-[#45a29e] to-[#66fcf1] rounded-full flex items-center justify-center text-black font-bold text-xl shadow-md border border-[#2d3a3a]">
            ⚡
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Sign in to continue to{" "}
          <span className="font-semibold text-[#66fcf1]">Socialma</span>
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-[#0b0c10] text-gray-200 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#45a29e] transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-[#0b0c10] text-gray-200 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#45a29e] transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#45a29e] to-[#66fcf1] text-black font-semibold rounded-xl shadow-md hover:from-[#3c8d8a] hover:to-[#45d4cc] transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Extra Links */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
          <a
            href="/forgot-password"
            className="hover:text-[#66fcf1] transition"
          >
            Forgot password?
          </a>
          <a
            href="/register"
            className="text-gray-300 font-medium hover:text-[#66fcf1] transition"
          >
            Create account
          </a>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        {/* Social Login */}
        <button className="w-full py-3 flex items-center justify-center gap-2 border border-gray-600 rounded-xl hover:bg-[#1f2833] transition text-gray-200">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="font-medium">Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
