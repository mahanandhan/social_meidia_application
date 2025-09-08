import React from "react";

const Navbar = () => {
  return (
    <div className="w-full fixed top-0 z-10 bg-[#161b22] border-b border-gray-700 px-6 py-3 flex items-center justify-between shadow-md">
      <span className="text-2xl font-bold text-[#66fcf1]">⚡ Socialma</span>
      
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-9 h-9 rounded-full border border-gray-600"
        />
      </div>
    </div>
  );
};

export default Navbar;
