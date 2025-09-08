import React, { useState } from "react";
import BottomNav from "../components/BottomNav";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // 🔹 later you’ll connect this to backend API
    setResults([
      { id: 1, name: "John Doe", type: "User" },
      { id: 2, name: "AI in Education", type: "Project" },
      { id: 3, name: "Latest Tech News", type: "Post" },
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0b0c10] via-[#1f2833] to-[#0b0c10] text-gray-200">
      

      {/* Search Section */}
      <div className="flex-1 overflow-y-auto pt-16 pb-20 px-4">
        <form onSubmit={handleSearch} className="mb-6">
          <input
            type="text"
            placeholder="Search users, posts, or projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 bg-[#161b22] text-gray-200 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#45a29e] transition"
          />
        </form>

        {/* Results */}
        <div className="space-y-4">
          {results.length > 0 ? (
            results.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-[#161b22] rounded-xl border border-gray-700 shadow hover:bg-[#1f2833] transition"
              >
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-400">{item.type}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No results yet...</p>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default SearchPage;
