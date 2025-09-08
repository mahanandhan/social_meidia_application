import React from "react";
import { Home, Newspaper, Lightbulb, HelpCircle, Search, User } from "lucide-react";
import { IoCreateSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {
    const navigate = useNavigate();
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#161b22] border-t border-gray-700 flex justify-around items-center py-2 text-gray-400">
      <button className="flex flex-col items-center hover:text-[#66fcf1] transform hover:scale-105 transition duration-200">
        <Home onClick={() => navigate("/main")} size={22} />
        <span onClick={() => navigate("/main")} className="text-xs">Home</span>
      </button>
      <button className="flex flex-col items-center hover:text-[#66fcf1] transform hover:scale-105 transition duration-200">
        <Newspaper onClick={() => navigate("/news")} size={22} />
        <span onClick={() => navigate("/news")} className="text-xs">News</span>
      </button>
      <button className="flex flex-col items-center hover:text-[#66fcf1] transform hover:scale-105 transition duration-200">
        <Lightbulb size={22} />
        <span className="text-xs">Projects</span>
      </button>
      <button className="flex flex-col items-center hover:text-[#66fcf1] transform hover:scale-105 transition duration-200">
        <IoCreateSharp onClick={() => navigate("/post")} size={22}/>
        <span onClick={() => navigate("/post")} className="text-xs">Post</span>
      </button>
      <button className="flex flex-col items-center hover:text-[#66fcf1] transform hover:scale-105 transition duration-200">
        <HelpCircle size={22} />
        <span className="text-xs">Ask</span>
      </button>
      <button className="flex flex-col items-center hover:text-[#66fcf1] transform hover:scale-105 transition duration-200">
        <Search onClick={() => navigate("/search")} size={22} />
        <span onClick={() => navigate("/search")} className="text-xs">Search</span>
      </button>
      <button className="flex flex-col items-center hover:text-[#66fcf1] transform hover:scale-105 transition duration-200">
        <User size={22} />
        <span className="text-xs">Profile</span>
      </button>
    </nav>
  );
};

export default BottomNav;
