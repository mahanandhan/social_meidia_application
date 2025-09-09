import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import PostCard from "../components/PostCard";
import axios from "axios";
import { toast } from "react-toastify";

const ProjectPage = () => {
  const [posts, setPosts] = useState([]);
  const [feedType, setFeedType] = useState("all"); // "all" or "following"
  const [loading, setLoading] = useState(false);

  // Fetch posts from backend
  const fetchPosts = async (type) => {
    setLoading(true);
    try {
      const endpoint =
        type === "following"
          ? "https://social-meidia-application.onrender.com/api/posts/following"
          : "https://social-meidia-application.onrender.com/api/posts/all";

      const res = await axios.get(endpoint, { withCredentials: true });

      // Filter only "project" category posts if backend has categories
      const projectPosts = res.data.filter(post => post.category === "project");

      setPosts(projectPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(feedType);
  }, [feedType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0c10] via-[#1f2833] to-[#0b0c10] text-gray-200">
      {/* Navbar */}
      <Navbar />

      {/* Feed Type Toggle */}
      <div className="pt-20 max-w-2xl mx-auto px-4 flex gap-4">
        <button
          onClick={() => setFeedType("all")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
            feedType === "all"
              ? "bg-[#66fcf1] text-black"
              : "bg-[#161b22] text-gray-300 hover:bg-[#1f2833]"
          }`}
        >
          All Projects
        </button>
        <button
          onClick={() => setFeedType("following")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
            feedType === "following"
              ? "bg-[#66fcf1] text-black"
              : "bg-[#161b22] text-gray-300 hover:bg-[#1f2833]"
          }`}
        >
          Following
        </button>
      </div>

      {/* Scrollable Project Feed */}
      <main className="pb-20 max-w-2xl mx-auto px-4 h-screen overflow-y-auto hide-scrollbar">
        {loading ? (
          <p className="text-center text-gray-400 mt-10">Loading projects...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            {feedType === "following"
              ? "No projects from people you follow yet."
              : "No projects available."}
          </p>
        ) : (
          posts.map((post) => (
            <PostCard key={post._id} post={post} posts={posts} setPosts={setPosts} />
          ))
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default ProjectPage;
