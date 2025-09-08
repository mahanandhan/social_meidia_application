import React from "react";
import Navbar from "./Navbar";
import PostCard from "./PostCard";
import BottomNav from "./BottomNav";

const FeedPage = () => {
  const posts = [
    {
      id: 1,
      user: "John Doe",
      avatar: "https://i.pravatar.cc/50?img=3",
      time: "2h ago",
      content:
        "🚀 Just finished my new project on AI-powered chatbots! Super excited to share this with you all.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      likes: 120,
      comments: 35,
    },
    {
      id: 2,
      user: "Sarah Lee",
      avatar: "https://i.pravatar.cc/50?img=5",
      time: "5h ago",
      content:
        "Education is the passport to the future! Sharing my notes on React performance optimization.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      likes: 95,
      comments: 18,
    },
    {
      id: 3,
      user: "Mark Smith",
      avatar: "https://i.pravatar.cc/50?img=8",
      time: "1d ago",
      content:
        "Check out my new education project showcase – looking for funders and mentors!",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      likes: 78,
      comments: 22,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0c10] via-[#1f2833] to-[#0b0c10] text-gray-200">
      {/* Navbar */}
      <Navbar />

      {/* Scrollable Feed */}
      <main className="pt-20 pb-20 max-w-2xl mx-auto px-4 h-screen overflow-y-auto hide-scrollbar">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default FeedPage;
