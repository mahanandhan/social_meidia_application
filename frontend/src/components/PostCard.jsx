import React, { useEffect, useState } from "react";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PostCard = ({ post, posts, setPosts }) => {
  const navigate = useNavigate();

  const [liked, setLiked] = useState(post.likes?.includes(post.user?._id));
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [comments, setComments] = useState(post.commentsArray || []);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  // Follow state
  const [isFollowing, setIsFollowing] = useState(false);

  // Read more state for long descriptions
  const [showFullDescription, setShowFullDescription] = useState(false);
  const maxDescriptionLength = 150;

  // Check if user follows post's author
  const checkFollowingStatus = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/auth/me", {
        withCredentials: true,
      });
      if (res.data.following.includes(post.user?._id)) {
        setIsFollowing(true);
      }
    } catch (err) {
      console.error("Error checking following status:", err);
    }
  };

  useEffect(() => {
    if (post.user?._id) checkFollowingStatus();
  }, [post.user?._id]);

  // Follow / Unfollow
  const handleFollowToggle = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/users/follow/${post.user._id}`,
        {},
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error("Error following/unfollowing:", err);
      toast.error("Failed to follow/unfollow user");
    }
  };

  // Like / Unlike
  const handleLike = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/posts/like/${post._id}`,
        {},
        { withCredentials: true }
      );

      setPosts(
        posts.map((p) =>
          p._id === post._id ? { ...p, likes: res.data.likes || [] } : p
        )
      );

      setLiked(res.data.message === "Post liked");
      setLikeCount(res.data.likes?.length || 0);

      if (res.data.message === "Post liked") {
        setShowHeartAnimation(true);
        setTimeout(() => setShowHeartAnimation(false), 800);
      }
    } catch (err) {
      console.error("Error liking post:", err);
      toast.error("Failed to like post");
    }
  };

  // Add Comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:3000/api/posts/comment/${post._id}`,
        { text: newComment },
        { withCredentials: true }
      );

      setPosts(
        posts.map((p) =>
          p._id === post._id
            ? { ...p, commentsArray: [...p.commentsArray, res.data.comment] }
            : p
        )
      );

      setComments([...comments, res.data.comment]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
      toast.error("Failed to add comment");
    }
  };

  const handleCommentToggle = () => {
    setShowCommentInput(!showCommentInput);
    setShowComments(true);
  };

  // Handle description truncation
  const renderDescription = () => {
    if (!post.description) return null;

    if (post.description.length <= maxDescriptionLength || showFullDescription) {
      return (
        <>
          <p className="text-gray-200 mb-2 text-sm sm:text-base">
            {post.description}
          </p>
          {post.description.length > maxDescriptionLength && (
            <button
              onClick={() => setShowFullDescription(false)}
              className="text-[#66fcf1] text-xs hover:underline"
            >
              Show less
            </button>
          )}
        </>
      );
    }

    return (
      <>
        <p className="text-gray-200 mb-2 text-sm sm:text-base">
          {post.description.substring(0, maxDescriptionLength)}...
        </p>
        <button
          onClick={() => setShowFullDescription(true)}
          className="text-[#66fcf1] text-xs hover:underline"
        >
          Read more
        </button>
      </>
    );
  };

  return (
    <div className="bg-[#161b22] rounded-xl border border-gray-700 shadow mb-6 overflow-hidden w-full">
      {/* User Info */}
      <div className="flex flex-col sm:flex-row sm:items-center p-4 gap-3">
        <div className="flex items-center gap-3">
          <img
            src={post.user?.profilePic || "https://via.placeholder.com/40"}
            alt={post.user?.username || "Unknown"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-100 text-sm sm:text-base">
              {post.user?.username || "Unknown User"}
            </p>
            <p className="text-xs text-gray-500">
              {post.createdAt
                ? new Date(post.createdAt).toLocaleString()
                : "Just now"}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-2 sm:mt-0 sm:ml-auto">
          <button
            onClick={handleFollowToggle}
            className={`text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition ${
              isFollowing
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-[#66fcf1] text-black hover:bg-[#52e0e0]"
            }`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>

          <button
            onClick={() => navigate(`/user/${post.user?.username}`)}
            className="bg-[#45a29e] text-black text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl hover:bg-[#66fcf1] transition"
          >
            View Profile
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-4 relative">
        {renderDescription()}

        {post.image && (
          <div className="relative">
            <img
              src={post.image}
              alt="post"
              className="w-full max-h-60 sm:max-h-80 object-cover rounded-xl mb-2 cursor-pointer"
              onDoubleClick={handleLike}
            />
            {showHeartAnimation && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <FaHeart className="text-[#66fcf1] text-6xl animate-ping" />
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 sm:gap-6 mt-2 text-xs sm:text-sm">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 sm:gap-2 font-semibold transition ${
              liked ? "text-[#66fcf1]" : "text-gray-400 hover:text-[#45a29e]"
            }`}
          >
            <FaHeart /> {likeCount}
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1 sm:gap-2 font-semibold text-gray-400 hover:text-[#45a29e] transition"
          >
            <FaComment /> {comments.length}
          </button>

          <button
            onClick={() => alert("Share this post")}
            className="flex items-center gap-1 sm:gap-2 font-semibold text-gray-400 hover:text-[#45a29e] transition"
          >
            <FaShare /> Share
          </button>
        </div>

        {/* Comment Input */}
        {showCommentInput && (
          <div className="mt-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full px-3 py-2 rounded-xl bg-[#0b0c10] text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#45a29e] mb-2 text-sm sm:text-base"
            />
            <button
              onClick={handleAddComment}
              className="bg-[#45a29e] text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl hover:bg-[#66fcf1] transition text-xs sm:text-sm"
            >
              Add Comment
            </button>
          </div>
        )}

        {/* Comments */}
        {showComments && comments.length > 0 && (
          <div className="mt-3 border-t border-gray-700 pt-2 space-y-2 max-h-40 sm:max-h-60 overflow-y-auto">
            {comments.map((comment) => (
              <div
                key={comment._id || comment.id}
                className="text-gray-300 text-xs sm:text-sm"
              >
                <span className="font-semibold text-gray-200">
                  {comment.user?.username || comment.user}:{" "}
                </span>
                {comment.text}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toggle comment input button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleCommentToggle}
          className="text-xs sm:text-sm text-[#66fcf1] hover:underline transition"
        >
          {showCommentInput ? "Hide Comment" : "Add Comment"}
        </button>
      </div>
    </div>
  );
};

export default PostCard;
