import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import axios from "axios";
import { toast } from "react-toastify";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const res = await axios.get(
        `https://social-meidia-application.onrender.com/api/users/profile/${query}`,
        { withCredentials: true }
      );
      setResults([res.data]); // wrap in array for mapping
    } catch (err) {
      console.error(err);
      toast.error("User not found");
      setResults([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0b0c10] via-[#1f2833] to-[#0b0c10] text-gray-200">
      <div className="flex-1 overflow-y-auto pt-16 pb-20 px-4">
        <form onSubmit={handleSearch} className="mb-6">
          <input
            type="text"
            placeholder="Search users by username..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 bg-[#161b22] text-gray-200 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#45a29e] transition"
          />
        </form>

        <div className="space-y-4">
          {results.length > 0 ? (
            results.map((user) => (
              <div
                key={user._id}
                className="p-4 bg-[#161b22] rounded-xl border border-gray-700 shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{user.username}</h3>
                  <p className="text-sm text-gray-400">
                    {user.followers?.length || 0} Followers •{" "}
                    {user.following?.length || 0} Following
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/user/${user.username}`)}
                  className="bg-[#66fcf1] text-black px-4 py-2 rounded-xl hover:bg-[#45a29e] transition"
                >
                  View Profile
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No results yet...</p>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SearchPage;
