import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import PostCard from "../components/PostCard";
import axios from "axios";
import { toast } from "react-toastify";

const NewsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/posts/all", {
        withCredentials: true,
      });

      const newsPosts = res.data
        .filter(post => post.category === "news")
        .map(post => ({
          ...post,
          commentsArray: post.comments || [],
          likes: post.likes || [],
        }));

      setPosts(newsPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
      toast.error("Failed to fetch news posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0c10] via-[#1f2833] to-[#0b0c10] text-gray-200">
      <Navbar />

      <main className="pt-20 pb-20 max-w-2xl mx-auto px-4 h-screen overflow-y-auto hide-scrollbar">
        {loading ? (
          <p className="text-center text-gray-400 mt-10">Loading news posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">No news posts available.</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              posts={posts}
              setPosts={setPosts}
            />
          ))
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default NewsPage;
