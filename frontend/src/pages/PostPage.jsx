import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PostPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("default");
  const [imageUrl, setImageUrl] = useState(""); // direct image/video link
  const [link, setLink] = useState(""); // external link
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Title and description are required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title,
        description,
        category,
        image: imageUrl || null, // send URL or null
        link: link || null,
      };

      await axios.post("https://social-meidia-application.onrender.com/api/posts/create", payload, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Post created successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error creating post:", err);
      toast.error(err.response?.data?.error || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#161b22] flex justify-center py-8 px-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Title */}
        <div className="bg-[#1a1f2a] rounded-2xl border border-gray-700 shadow p-5">
          <label className="font-semibold text-gray-200 mb-2 block">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full bg-[#0b0c10] text-gray-200 border border-gray-600 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#45a29e]"
          />
        </div>

        {/* Description */}
        <div className="bg-[#1a1f2a] rounded-2xl border border-gray-700 shadow p-5">
          <textarea
            placeholder="Write your description..."
            className="w-full px-4 py-3 rounded-2xl bg-[#0b0c10] text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#45a29e] resize-none"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="bg-[#1a1f2a] rounded-2xl border border-gray-700 shadow p-5">
          <label className="font-semibold text-gray-200 mb-2 block">Select Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#0b0c10] text-gray-200 border border-gray-600 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#45a29e]"
          >
            <option value="default">Default</option>
            <option value="news">News</option>
            <option value="project">Project Demo</option>
            <option value="questions">Questions</option>
          </select>
        </div>

        {/* Image/Video URL */}
        <input
          type="url"
          placeholder="Paste image/video URL"
          className="w-full px-4 py-3 rounded-2xl bg-[#0b0c10] text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#45a29e]"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        {/* External Link */}
        <input
          type="url"
          placeholder="Add external link (optional)"
          className="w-full px-4 py-3 rounded-2xl bg-[#0b0c10] text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#45a29e]"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#45a29e] text-black font-semibold px-4 py-3 rounded-2xl hover:bg-[#66fcf1] transition mt-2"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default PostPage;
