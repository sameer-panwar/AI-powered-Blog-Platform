import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Home = () => {

    const navigate = useNavigate();

    const [showBlog, setShowBlog] = useState(null); 
    const [loading, setLoading] = useState(true);
  
    console.log("re-render", showBlog); 
  
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getBlogsInfo", {
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
        console.log("Data fetched successfully:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setShowBlog([]); 
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);

    const handleReadMore = (blogId) => {
        navigate(`/dashboard/ViewBlog/${blogId}`);
    }

    return (
        <div className="grid grid-cols-3 gap-8 p-6">
            {loading ? (
                <div className="col-span-3 text-center">Loading...</div>
            ) : showBlog && showBlog.length > 0 ? (
                showBlog.map((blog, index) => (
                    <div key={index} className={`bg-white h-fit mb-6 rounded-xl ${index%3 ===1 ? "translate-y-20" : ""}`}>
                        <div className="h-46 w-full bg-black rounded-t-sm">Image</div>
                        <div className="flex flex-col gap-4  px-8 py-4">
                            <div className="font-bold text-3xl text-gray-800 leading-snug ">{blog.title}</div>
                            <div className=" text-2xl text-gray-500 break-words">{blog.info}</div>
                            <hr className="border-gray-300"/>
                            <div className="text-green-700 font-semibold"><button className="cursor-pointer" onClick={() => handleReadMore(blog._id)}>Continue reading... </button></div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-span-3 text-center">No blogs available</div>
            )}
                      
        </div>
        
    );
}
