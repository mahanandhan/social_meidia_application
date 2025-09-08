import React, { useState } from "react";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [comments, setComments] = useState(post.commentsArray || []);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    if (!liked) {
      setShowHeartAnimation(true);
      setTimeout(() => setShowHeartAnimation(false), 800); // hide animation after 0.8s
    }
  };

  const handleCommentToggle = () => {
    setShowCommentInput(!showCommentInput);
    setShowComments(true); // expand comments when adding
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const commentObj = {
      id: Date.now(),
      user: "You", // replace with actual user
      text: newComment,
    };
    setComments([...comments, commentObj]);
    setNewComment("");
  };

  return (
    <div className="bg-[#161b22] rounded-xl border border-gray-700 shadow mb-6 overflow-hidden">
      {/* User Info */}
      <div className="flex items-center p-4 gap-3">
        <img
          src={post.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-100">{post.user}</p>
          <p className="text-xs text-gray-500">{post.time}</p>
        </div>
        <div className="ml-auto">
    <button className="bg-[#66fcf1] text-black text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#45a29e] transition hover:scale-105 cursor-pointer">
      Follow
    </button>
  </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-4 relative">
        <p className="text-gray-200 mb-2">{post.content}</p>
        {post.image && (
          <div className="relative">
            <img
              src={post.image}
              alt="post"
              className="w-full h-64 object-cover rounded-xl mb-2 cursor-pointer"
              onDoubleClick={handleLike} // double click to like
            />
            {/* Heart animation */}
            {showHeartAnimation && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <FaHeart className="text-[#66fcf1] text-6xl animate-ping" />
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-6 mt-2">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 text-sm font-semibold transition ${
              liked ? "text-[#66fcf1]" : "text-gray-400 hover:text-[#45a29e]"
            }`}
          >
            <FaHeart /> {likeCount}
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-[#45a29e] transition"
          >
            <FaComment /> {comments.length}
          </button>

          <button
            onClick={() => alert("Share this post")}
            className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-[#45a29e] transition"
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
              className="w-full px-3 py-2 rounded-xl bg-[#0b0c10] text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#45a29e] mb-2"
            />
            <button
              onClick={handleAddComment}
              className="bg-[#45a29e] text-black px-4 py-2 rounded-xl hover:bg-[#66fcf1] transition"
            >
              Add Comment
            </button>
          </div>
        )}

        {/* Comments Section */}
        {showComments && comments.length > 0 && (
          <div className="mt-3 border-t border-gray-700 pt-2 space-y-2 max-h-60 overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="text-gray-300 text-sm">
                <span className="font-semibold text-gray-200">{comment.user}:</span>{" "}
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
          className="text-sm text-[#66fcf1] hover:underline transition"
        >
          {showCommentInput ? "Hide Comment" : "Add Comment"}
        </button>
      </div>
    </div>
  );
};

export default PostCard;
