import { useState, useEffect, useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';

import axios from 'axios';

import { LikePost } from './LikePost';
import { CommentPost } from './CommentPost';
import { SaveDraft } from './SaveDraft';
import { useUser } from "../Context/UserContext"
import { useSavedBlogs } from '../Context/SavedBlogsContext';


export const BlogList = ({userId, saved=false})=>{

  const [blogs, setBlogs] = useState([]);
  const {user, setUser} = useUser();
  const { savedBlogsList } = useSavedBlogs();
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  const fetchData = async () => {
      try {
        let response;
        if(saved){
          setBlogs(savedBlogsList);
          setLoading(false);
          return;
        }else if(userId){
           response = await axios.get(`http://localhost:3000/getUserBlogs/${userId}`, {
              headers: { authorization: localStorage.getItem("token") }
            }) 
        }else{
           response = await axios.get(`http://localhost:3000/getAllBlogs`, {
              headers: { authorization: localStorage.getItem("token") }
            });
        }

        const data = response.data.data;

        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          setBlogs([]); 
        }
        setLoading(false);

      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setBlogs([]); 
      }
    };

    useEffect(() => {
      fetchData();
    }, [userId, saved]);

    // useCallback(() => {
    //     fetchData();
    // }, [blogs]);
    

    console.log("blogs", blogs);

    // Like functionalitly
    const onLike = async (id)=>{
      try{
        const response = await axios.put(`http://localhost:3000/updateLike/${id}`,{},
        {
        headers: {
          authorization: localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      
      const { likedBy } = response.data.data;

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === id ? { ...blog, likedBy } : blog
        )
      );
      console.log("Updated like:", likedBy);
      }catch(error){
        console.log("Server error", error);
      }
    }


    const onComment =async () => {

    }

    const onSavedDraft = async (BlogId)=>{
      try{
        const response = await axios.put(`http://localhost:3000/updateBookmark/${BlogId}`,
          {},
          {
            headers: {
              authorization: localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        );

        const result = response.data.data;
        console.log(result, "bookmarks");

        setUser((prevUser) => ({
          ...prevUser,
          savedBlogs: result
        }));

        console.log("Updated bookmark:", result);
      }catch(error){
        console.log("Server error", error);
      }
    }

  return (
    <>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
        ) : blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-md w-full mx-auto space-y-6 my-4"
            >
              {/* Header section */}
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
                  {blog.name && getInitials(blog.name)}
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">{blog.name}</div>
                  <div className="text-xs text-gray-500">
                    @{blog.username} •{" "}
                    {formatDistanceToNow(blog.createdAt, { addSuffix: true })}
                  </div>
                </div>
                <div className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                  {blog.keyword[0]}
                </div>
              </div>

              {/* Title */}
              <h2 className="text-lg font-bold text-gray-900 mb-1">{blog.title}</h2>

              {/* Content */}
              <p className="text-sm text-gray-600 mb-3">{blog.content}</p>

              {/* Placeholder image */}
              <div className="w-full h-48 bg-gray-100 rounded-md mb-4 flex items-center justify-center text-gray-400 text-sm">
                📷 The Art of Slow Living in a Fast-Paced World
              </div>

              <div className='flex justify-between px-2'>
                <div className='flex'>
                  <LikePost blog={blog} onLike={onLike}/>
                  <CommentPost blog={blog} onComment={onComment}/>
                </div>
                <div>
                  <SaveDraft user={user} blog={blog} onSavedDraft={onSavedDraft}/>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No blogs available</div>
        )}

    </>
)}


export function getInitials(name) {
    const words = name.trim().split(" ");
    const first = words[0][0].toUpperCase();
    const last = words[words.length - 1][0].toUpperCase();
    return first + last;
}