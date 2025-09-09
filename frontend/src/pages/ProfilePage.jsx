import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import PostCard from "../components/PostCard";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch logged-in user info
  const fetchUser = async () => {
    try {
      const res = await axios.get("https://social-meidia-application.onrender.com/api/auth/me", {
        withCredentials: true,
      });
      setUser(res.data);
      fetchUserPosts(res.data.username);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch user info");
    }
  };

  // Fetch user's posts
  const fetchUserPosts = async (username) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://social-meidia-application.onrender.com/api/posts/user/${username}`,
        { withCredentials: true }
      );

      const mappedPosts = res.data.map((post) => ({
        ...post,
        commentsArray: post.comments || [],
        likes: post.likes || [],
      }));

      setPosts(mappedPosts);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  // Delete post handler
  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`https://social-meidia-application.onrender.com/api/posts/${postId}`, {
        withCredentials: true,
      });
      setPosts(posts.filter((p) => p._id !== postId));
      toast.success("Post deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete post");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Filter posts by category
  const filteredPosts =
    categoryFilter === "all"
      ? posts
      : posts.filter((post) => post.category === categoryFilter);

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://social-meidia-application.onrender.com/api/auth/logout",
        {},
        { withCredentials: true }
      );
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  if (!user)
    return (
      <p className="text-center mt-20 text-gray-300">Loading profile...</p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0c10] via-[#1f2833] to-[#0b0c10] text-gray-200">
      <Navbar />

      {/* User Info */}
      <div className="pt-20 max-w-2xl mx-auto px-4 text-center">
        <img
          src={user.image || "https://via.placeholder.com/80"}
          alt={user.username}
          className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
        />
        <h2 className="text-xl font-semibold">{user.username}</h2>
        <p className="text-gray-400 text-sm">{user.email}</p>
        <div className="flex justify-center gap-6 mt-2 text-gray-300">
          <span>{user.followers?.length || 0} Followers</span>
          <span>{user.following?.length || 0} Following</span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-4 px-6 py-2 rounded-xl font-semibold bg-red-500 text-white transform transition hover:scale-105"
        >
          Logout
        </button>
      </div>

      {/* Category Filter */}
      <div className="max-w-2xl mx-auto px-4 flex gap-2 mt-4 overflow-x-auto hide-scrollbar">
        {["all", "news", "project", "question"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1 rounded-xl text-sm font-semibold transition ${
              categoryFilter === cat
                ? "bg-[#66fcf1] text-black"
                : "bg-[#161b22] text-gray-300 hover:bg-[#1f2833]"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Posts */}
      <main className="pb-20 max-w-2xl mx-auto px-4 mt-4">
        {loading ? (
          <p className="text-center text-gray-400 mt-10">Loading posts...</p>
        ) : filteredPosts.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            No posts in this category.
          </p>
        ) : (
          filteredPosts.map((post) => (
            <div key={post._id} className="relative">
              <PostCard post={post} posts={posts} setPosts={setPosts} />

              {/* Delete Button only in ProfilePage */}
              <div className="flex justify-end -mt-2 mb-6 px-2">
                <button
                  onClick={() => handleDeletePost(post._id)}
                  className="flex items-center gap-2 text-red-500 hover:text-red-700 transition"
                >
                  <FaTrash /> <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;
