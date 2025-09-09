import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
    bio: "",
  });

  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Function to normalize Google Drive links
  const formatImageLink = (link) => {
    if (link.includes("drive.google.com")) {
      const match = link.match(/\/d\/(.*?)\//);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
    }
    return link; // return as-is for imgur/cloudinary/etc.
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "image") {
      setPreviewUrl(formatImageLink(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/api/auth/register", formData, {
        withCredentials: true,
      });

      toast.success("Registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b0c10] via-[#1f2833] to-[#0b0c10] text-gray-200 px-4">
      <div className="bg-[#161b22] p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#66fcf1]">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-2 rounded-xl bg-[#0b0c10] border border-gray-600 focus:ring-2 focus:ring-[#45a29e] outline-none"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 rounded-xl bg-[#0b0c10] border border-gray-600 focus:ring-2 focus:ring-[#45a29e] outline-none"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 rounded-xl bg-[#0b0c10] border border-gray-600 focus:ring-2 focus:ring-[#45a29e] outline-none"
            required
          />

          {/* Profile Image URL */}
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Profile Image URL (Google Drive, Imgur, Cloudinary...)"
            className="w-full px-4 py-2 rounded-xl bg-[#0b0c10] border border-gray-600 focus:ring-2 focus:ring-[#45a29e] outline-none"
          />

          {/* Image Preview */}
          {previewUrl && (
            <div className="flex justify-center">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover mt-2 border border-gray-600"
              />
            </div>
          )}

          {/* Bio */}
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write a short bio..."
            className="w-full px-4 py-2 rounded-xl bg-[#0b0c10] border border-gray-600 focus:ring-2 focus:ring-[#45a29e] outline-none resize-none"
            rows="3"
          ></textarea>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#66fcf1] text-black font-semibold rounded-xl hover:bg-[#45a29e] transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-[#66fcf1] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
