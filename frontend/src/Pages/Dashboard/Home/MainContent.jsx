import {
  Lightbulb,
  Plane,
  Monitor,
  Utensils,
  Sparkles,
  Users,
} from 'lucide-react';
import { BlogList } from '../../../Components/BlogList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSavedBlogs } from '../../../Context/SavedBlogsContext';

export default function MainContent() {

  const [suggestedAuthors, setSuggestedAuthors] = useState([]);
  const {savedBlogsList} = useSavedBlogs();

  console.log("saved blogs",savedBlogsList);

  const fetchAuthors =async ()=>{

    try{
        const response = await axios.get("http://localhost:3000/suggestedAuthors",{
          headers:{
            authorization: localStorage.getItem("token")
          }
        });

        setSuggestedAuthors(response.data);
    }catch(error){
      console.log("Server error", error);
    }
  }

  useEffect(()=>{
    fetchAuthors();
  },[])

        
  return (
  
    <div className="flex w-full h-full p-6 gap-6 overflow-x-hidden">
      {/* Left Main Section */}
      <div className="flex-1 space-y-6 px-6 overflow-y-visible">
        {/* Inspire Me Card */}
        <div className="bg-purple-100/30 border border-purple-200 rounded-xl p-4">
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
          <BlogList />
        </div>

      {/* Right Sidebar */}
      <div className="w-80 space-y-6 shrink-0">
        {/* Saved Drafts */}
        <div className="bg-white rounded-xl p-4 border shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-3">🔖 Saved Drafts</h4>
          <div className="space-y-2 text-sm">
            {savedBlogsList?.map((blog)=>{
              return (
                <div key={blog._id} className="bg-gray-100 p-2 rounded">
                  {blog.title}
                  <span className="text-gray-400 text-xs block">2 days ago</span>
                </div>)
            })}
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
            {suggestedAuthors.map((Author, index)=>{
              return (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{Author.name}</p>
                  <p className="text-xs text-gray-500">12.5K followers</p>
                </div>
                <button className="text-sm bg-gray-200 px-3 py-0.5 rounded">Follow</button>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>

  );
}



