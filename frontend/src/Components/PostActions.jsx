import { useState } from "react";
import { Heart, MessageCircle, Bookmark, Key } from "lucide-react";

const PostActions = ({key, post, likes, comments, bookmarked, onLike, onComment, onBookmark }) => {
  const [commentText, setCommentText] = useState("");

  return (
    <div className="flex items-center space-x-4 mt-3">
      {/* Like */}
      <button onClick={()=>onLike(key)} className="flex items-center space-x-1">
        <Heart className="w-5 h-5 text-red-500" />
        <span>{likes}</span>
      </button>

      {/* Comment */}
      <div className="flex items-center space-x-1">
        <MessageCircle className="w-5 h-5" />
        <span>{comments}</span>
      </div>

      <input
        type="text"
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="border px-2 py-1 rounded text-sm"
      />
      <button
        onClick={() => {
          onComment(commentText);
          setCommentText("");
        }}
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        Post
      </button>

      {/* Bookmark */}
      <button onClick={onBookmark}>
        <Bookmark
          className={`w-5 h-5 ${bookmarked ? "text-blue-600 fill-blue-600" : ""}`}
        />
      </button>
    </div>
  );
};

export default PostActions;
