import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

import axios from 'axios';

import {
  Lightbulb,
  Plane,
  Monitor,
  Utensils,
  Sparkles,
  Users,
  Heart,
  MessageCircle, 
  Send,
  Bookmark,
} from 'lucide-react';

export default function MainContent() {

  const [showBlog, setShowBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getBlogs", {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });
        const data = response.data.data;
        if (Array.isArray(data)) {
          setShowBlog(data);
        } else {
          setShowBlog([]); 
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setShowBlog([]); 
      }
    };

    useEffect(() => {
          fetchData();
        }, []);

    console.log("showBlog", showBlog);

    function getInitials(name) {
      const words = name.trim().split(" ");
      const first = words[0][0].toUpperCase();
      const last = words[words.length - 1][0].toUpperCase();
      return first + last;
    }
        
  return (
    <div className="flex gap-4 p-6 min-h-screen">
      {/* Left Main Section */}
      <div className="flex-1 space-y-6">
        {/* Inspire Me Card */}
        <div className="bg-purple-100/30 border border-purple-200 rounded-xl p-4 mx-10">
          <h2 className="text-purple-600 font-semibold flex items-center gap-2">
            <Lightbulb size={18} />
            Inspire Me <Sparkles size={16} />
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            What advice would you give your younger self?
          </p>
          <button className="mt-3 bg-purple-600 text-white px-4 py-1.5 text-sm rounded-md">
            Start Writing
          </button>
        </div>

        {/* Categories */}
        <div className="flex justify-center items-center gap-2 flex-wrap text-sm">
          <span className="font-medium text-gray-700">Categories:</span>
          <button className="flex items-center gap-1 px-3 py-1 border rounded-full">
            <Plane size={16} /> Travel
          </button>
          <button className="flex items-center gap-1 px-3 py-1 border rounded-full">
            <Monitor size={16} /> Tech
          </button>
          <button className="flex items-center gap-1 px-3 py-1 border rounded-full">
            <Utensils size={16} /> Food
          </button>
          <button className="flex items-center gap-1 px-3 py-1 border rounded-full">
            <Sparkles size={16} /> Lifestyle
          </button>
        </div>

        {/* Blog Card */}
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : showBlog.length > 0 ? (
          showBlog.map((blog, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 shadow-md w-full max-w-2xl mx-auto space-y-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
                  {getInitials(blog.name)}
                </div>
                <div>
                <div className="font-semibold text-sm text-gray-900">{blog.name}</div>
                <div className="text-xs text-gray-500">@{blog.username} • {formatDistanceToNow(blog.createdAt, { addSuffix: true })}</div>
                </div>
                <div className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                  {blog.keyword[0]}
                </div>
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">{blog.title}</h2>
                <p className="text-sm text-gray-600 mb-3">
                  {blog.content}
                </p>
                <div className="w-full h-48 bg-gray-100 rounded-md mb-4 flex items-center justify-center text-gray-400 text-sm">
                    📷 The Art of Slow Living in a Fast-Paced World
                </div>
                <div className="flex items-center text-gray-500 text-sm gap-6">
                    <span className="flex items-center gap-1"><Heart />{blog.likedBy.length}</span>
                    <span className="flex items-center gap-1"><MessageCircle />{blog.comments.length}</span>
                    <span className="flex items-center gap-1"><Send />7</span>
                    <span className="ml-auto"><Bookmark /></span>
                </div>
              </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No blogs available</div>
            )}
        </div>

      {/* Right Sidebar */}
      <div className="w-84 space-y-6">
        {/* Saved Drafts */}
        <div className="bg-white rounded-xl p-4 border shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-3">🔖 Saved Drafts</h4>
          <div className="space-y-2 text-sm">
            <div className="bg-gray-100 p-2 rounded">My Travel Bucket List <span className="text-gray-400 text-xs block">2 days ago</span></div>
            <div className="bg-gray-100 p-2 rounded">Productivity Tips That Actually Work <span className="text-gray-400 text-xs block">1 week ago</span></div>
            <div className="bg-gray-100 p-2 rounded">Learning to Code at 30 <span className="text-gray-400 text-xs block">2 weeks ago</span></div>
          </div>
          <button className="w-full mt-4 border px-4 py-1.5 rounded-md text-sm">
            View All Drafts
          </button>
        </div>

        {/* Suggested Authors */}
        <div className="bg-white rounded-xl p-4 border shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Users size={18} /> Suggested Authors
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Alice Chen</p>
                <p className="text-xs text-gray-500">12.5K followers</p>
              </div>
              <button className="text-sm bg-gray-200 px-3 py-0.5 rounded">Follow</button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Mark Williams</p>
                <p className="text-xs text-gray-500">8.2K followers</p>
              </div>
              <button className="text-sm bg-gray-200 px-3 py-0.5 rounded">Follow</button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Lisa Park</p>
                <p className="text-xs text-gray-500">7.1K followers</p>
              </div>
              <button className="text-sm bg-gray-200 px-3 py-0.5 rounded">Follow</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
