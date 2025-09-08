import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const PostPage = () => {
  const [category, setCategory] = useState("default");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [url, setUrl] = useState("");

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setMedia(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#161b22] flex justify-center py-8 px-4">
      <div className="w-full max-w-2xl space-y-6">

        {/* Category Selection */}
        <div className="bg-[#1a1f2a] rounded-2xl border border-gray-700 shadow p-5">
          <label className="font-semibold text-gray-200 mb-2 block">Select Category:</label>
          <select
            className="w-full bg-[#0b0c10] text-gray-200 border border-gray-600 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#45a29e]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="news">News</option>
            <option value="project">Project Demo</option>
            <option value="question">Questions</option>
          </select>
        </div>

        {/* Content Box */}
        <div className="bg-[#1a1f2a] rounded-2xl border border-gray-700 shadow p-5 space-y-4">
          <textarea
            placeholder="Write your post..."
            className="w-full px-4 py-3 rounded-2xl bg-[#0b0c10] text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#45a29e] resize-none"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* Styled File Upload */}
          <div
            className="w-full border-2 border-dashed border-gray-600 rounded-2xl h-40 flex flex-col items-center justify-center cursor-pointer hover:border-[#45a29e] transition"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <FaCloudUploadAlt className="text-gray-500 text-4xl mb-2" />
            <p className="text-gray-400">Click to add photo/video</p>
            <input
              type="file"
              id="fileInput"
              accept="image/*,video/*"
              onChange={handleMediaChange}
              className="hidden"
            />
          </div>

          {media && (
            <div className="mt-2">
              {media.startsWith("data:image") ? (
                <img
                  src={media}
                  alt="preview"
                  className="w-full h-64 object-cover rounded-2xl border border-gray-700"
                />
              ) : (
                <video controls className="w-full h-64 rounded-2xl border border-gray-700">
                  <source src={media} type="video/mp4" />
                </video>
              )}
            </div>
          )}

          {/* URL Input */}
          <input
            type="url"
            placeholder="Add URL (optional)"
            className="w-full px-4 py-3 rounded-2xl bg-[#0b0c10] text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#45a29e]"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          {/* Post Button */}
          <button className="w-full bg-[#45a29e] text-black font-semibold px-4 py-3 rounded-2xl hover:bg-[#66fcf1] transition mt-2">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
