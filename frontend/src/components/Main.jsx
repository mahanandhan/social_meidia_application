import React from "react";
import Navbar from "./Navbar";
import FeedPage from "./FeedPage";
import BottomNav from "./BottomNav";

const Main = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0b0c10] via-[#1f2833] to-[#0b0c10] text-gray-200">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pt-16 pb-20">
        <FeedPage />
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Main;
