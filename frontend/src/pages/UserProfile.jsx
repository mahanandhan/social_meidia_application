import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import PostCard from "../components/PostCard";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followingStatus, setFollowingStatus] = useState(false);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/api/users/profile/${username}`,
        { withCredentials: true }
      );
      setUser(res.data);

      // Check if current user is following
      const currentUserRes = await axios.get(
        "https://social-meidia-application.onrender.com/api/auth/me",
        { withCredentials: true }
      );
      const isFollowing = currentUserRes.data.following.includes(res.data._id);
      setFollowingStatus(isFollowing);

      // Fetch user posts
      const postsRes = await axios.get(
        `https://social-meidia-application.onrender.com/api/posts/user/${username}`,
        { withCredentials: true }
      );

      const normalizedPosts = postsRes.data.map(post => ({
        ...post,
        commentsArray: post.comments || [],
        likes: post.likes || [],
      }));

      setPosts(normalizedPosts);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch user data or posts");
    } finally {
      setLoading(false);
    }
  };

  const handleFollowToggle = async () => {
    try {
      const res = await axios.post(
        `https://social-meidia-application.onrender.com/api/users/follow/${user._id}`,
        {},
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setFollowingStatus(!followingStatus);

      setUser(prev => ({
        ...prev,
        followers: followingStatus
          ? prev.followers.filter(id => id !== user._id)
          : [...prev.followers, user._id],
      }));
    } catch (err) {
      console.error(err);
      toast.error("Failed to follow/unfollow user");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [username]);

  if (!user) return <p className="text-center mt-20 text-gray-300">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0c10] via-[#1f2833] to-[#0b0c10] text-gray-200">
      <Navbar />

      <div className="pt-20 max-w-2xl mx-auto px-4 text-center">
        <img
          src={user.profilePic || "https://via.placeholder.com/80"}
          alt={user.username}
          className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
        />
        <h2 className="text-xl font-semibold">{user.username}</h2>
        <p className="text-gray-400 text-sm">{user.email}</p>

        <div className="flex justify-center gap-6 mt-2 text-gray-300">
          <span>{user.followers?.length || 0} Followers</span>
          <span>{user.following?.length || 0} Following</span>
        </div>

        <button
          onClick={handleFollowToggle}
          className={`mt-4 px-6 py-2 rounded-xl font-semibold ${
            followingStatus
              ? "bg-red-500 text-white transform transition hover:scale-105 cursor-pointer"
              : "bg-[#66fcf1] text-black transform transition hover:scale-105 hover:bg-[#52e0e0]"
          }`}
        >
          {followingStatus ? "Unfollow" : "Follow"}
        </button>
      </div>

      <main className="pb-20 max-w-2xl mx-auto px-4 mt-6">
        {loading ? (
          <p className="text-center text-gray-400 mt-10">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">No posts yet.</p>
        ) : (
          posts.map(post => (
            <PostCard key={post._id} post={post} posts={posts} setPosts={setPosts} />
          ))
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default UserProfile;
