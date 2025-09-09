import React, { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get("https://social-meidia-application.onrender.com/api/auth/me", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchMe();
  }, []);

  return (
    <div className="w-full fixed top-0 z-10 bg-[#161b22] border-b border-gray-700 px-6 py-3 flex items-center justify-between shadow-md">
      <span className="text-2xl font-bold text-[#66fcf1]">⚡ Socialma</span>

      <div className="flex items-center gap-4">
        {user ? (
          <img
            src={user.image || "https://i.pravatar.cc/40"} // fallback if no image
            alt="profile"
            className="w-9 h-9 rounded-full border border-gray-600 object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gray-700 animate-pulse"></div> // loading placeholder
        )}
      </div>
    </div>
  );
};

export default Navbar;
