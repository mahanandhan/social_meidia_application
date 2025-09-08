import React from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import PostCard from "../components/PostCard";

const NewsPage = () => {
  const newsPosts = [
    {
      id: 1,
      user: "Tech Daily",
      avatar: "https://i.pravatar.cc/50?img=12",
      time: "3h ago",
      content:
        "📢 New educational trends in AI for students: online learning is evolving rapidly!",
      image: "https://picsum.photos/600/400?random=1",
      likes: 230,
      comments: 40,
    },
    {
      id: 2,
      user: "EduPortal",
      avatar: "https://i.pravatar.cc/50?img=15",
      time: "6h ago",
      content:
        "Scholarship programs for 2025 are now open! Check out the eligibility and deadlines.",
      image: "https://picsum.photos/600/400?random=2",
      likes: 180,
      comments: 22,
    },
    {
      id: 3,
      user: "LearningHub",
      avatar: "https://i.pravatar.cc/50?img=18",
      time: "1d ago",
      content:
        "Top 5 online courses for students to boost their coding skills this year.",
      image: "https://picsum.photos/600/400?random=3",
      likes: 145,
      comments: 30,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0c10] via-[#1f2833] to-[#0b0c10] text-gray-200">
      <Navbar />
      <main className="pt-20 pb-20 max-w-2xl mx-auto px-4 h-screen overflow-y-auto hide-scrollbar">
        {newsPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </main>
      <BottomNav />
    </div>
  );
};

export default NewsPage;
