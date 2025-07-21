import axios from 'axios';
import React from 'react';
import {useCallback, useEffect, useState} from 'react'
import {Heart, MessageCircle, Forward, Bot, ArrowUp} from 'lucide-react'
import {formatDistanceToNow} from "date-fns"
export const Home = () => {
    const [showBlog, setShowBlog] = useState(null); 
    const [loading, setLoading] = useState(true);
  
    console.log("re-render", showBlog); 
  
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
    
  
    return (
      <div className="h-fit w-full px-30 bg-black text-white">
        <BlogForm />
        <div className='w-full h-full'>
          {loading ? (
            <p className="text-center">loading...</p>
          ) : showBlog && Array.isArray(showBlog) && showBlog.length > 0 ? (
            showBlog.map((blog) => {
              return (
                <div
                  key={blog._id}
                  className="flex justify-between items-start w-full h-full rounded-lg p-6 py-10 flex-wrap "
                >
                  <div className="flex flex-col space-y-3 w-full">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-red-500 rounded-full"></div>
                      <div>
                        <h1 className="font-semibold text-white-800">
                          <span className='pr-2 text-red-500'>{blog.name} </span> •
                          <span className="text-sm text-blue-400 font-normal ml-2">
                            {formatDistanceToNow(new Date(blog.createdAt), {addSuffix: true})}
                          </span>
                        </h1>
                        <p className="text-sm text-red-400">{blog.role}</p>
                      </div>
                    </div>
  
                    <h1 className="text-2xl font-bold text-white-900">{blog.title}</h1>
                    <div className="text-white-600 text-base leading-relaxed whitespace-pre-wrap">
                      {blog.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">
                          {paragraph.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                        </p>
                      ))}
                    </div>


                    <div className='my-2 space-x-4'>
                      {blog.keyword &&
                          Array.isArray(blog.keyword) &&
                          blog.keyword.map((newItem, index) => (
                            <span
                              key={index}
                              className=" py-0.5 px-5 w-fit h-fit border border-gray-400 rounded-lg text-gray-600 bg-blue-50"
                            >
                              {newItem}
                            </span>
                        ))}
                    </div>
                    <LikeCommentSection 
                      blog={blog}
                      setShowBlog={setShowBlog} 
                      showBlog={showBlog}
                    />
                  </div>
 
                </div>
              );
            })
          ) : (
            <p className="text-center">No data Available.</p>
          )}
        </div>
      </div>
    );
};



const BlogForm = ()=>{
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    keywords: [],
  });

  const [keyword, setKeyword] = useState("");
    const [displayKeywords, setDisplayKeywords] = useState([]);
  
    const handleChange = useCallback((e) => {
      setNewBlog((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },[]);
  
    const addKeywords =useCallback( () => {
      if (keyword.trim()) {
        setDisplayKeywords((prev) => [...prev, keyword.trim()]);
        setNewBlog((prev) => ({
          ...prev,
          keywords: [...prev.keywords, keyword.trim()],
        }));
        setKeyword("");
      }
    });
  
    const handleSubmit = useCallback(async (e) => {
      e.preventDefault();
      console.log(newBlog);
  
      try {
        const response = await axios.post(
          "http://localhost:3000/postBlog",
          newBlog,
          {
            headers: {
              authorization: localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        );
        setNewBlog({
          title: "",
          content: "",
          keywords: [],
        });
        setDisplayKeywords([]);
        console.log("Blog Posted Successfully");
      } catch (error) {
        console.log("Server Error", error);
      }
    });
  return(
    <form className="p-6 mb-2" onSubmit={handleSubmit}>
          <h1 className="text-5xl font-bold pb-8 font-serif">Write a new Blog</h1>
  
          <div className="ml-108 p-2">
            {displayKeywords.map((item) => (
              <span
                key={item}
                className="px-3 py-1 mr-2 w-fit h-fit border border-gray-400 rounded-full text-gray-600"
              >
                {item}
              </span>
            ))}
          </div>
          <div>
            <div className='blog-input'>
              <input
                className="border-2 mb-2 p-2 rounded-xl w-full"
                type="text"
                name="title"
                value={newBlog.title}
                onChange={handleChange}
              />
              <p className='placeholder'>Title of the Blog</p>
            </div>
            <div className='blog-input'>
              <input
                className="border-2 mb-2 p-2 pr-8 rounded-xl"
                type="text"
                name="keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                />
              <p className='placeholder'>Keywords</p>
              <button
                type="button"
                onClick={addKeywords}
                className="h-8 w-20 bg-blue-500 text-white font-bold rounded-sm ml-2"
              >
                Add
              </button>
            </div>
            <div className='blog-input'>
              <textarea
                className="p-2 pt-1 border-2 w-full h-30"
                type="text"
                name="content"
                value={newBlog.content}
                onChange={handleChange}
              />
              <p className='placeholder'>Whats On your Mind!</p>
            </div>
          </div>
  
          <div className="flex justify-end gap-6 m-2">
            <button className="h-10 w-46 bg-red-400 text-white font-bold rounded-sm flex items-center justify-center">
              Generate With AI
              <Bot className='ml-2'/>
            </button>
            <button
              className="h-10 w-18 bg-blue-500 text-white font-bold rounded-sm"
              type="submit"
            >
              Post
            </button>
          </div>
        </form>
  );
}

export const LikeCommentSection = ({blog, setShowBlog, showBlog})=>{
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);

  const handleLike= async (id)=>{
    try{
      const response = await axios.put("http://localhost:3000/updateLike",
        {blogId : id},
        {
          headers: {
            authorization: localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
      });
    
      if(!response){
        console.log("Error, like not updated!");
      }else{
        console.log("Liked a post.");
        
        let result = response.data.data;

        const recievedData = showBlog.map((blog)=>{
          if(blog._id == result._id){
            return result;
          }else{
            return blog;
          }
        });
        setShowBlog(recievedData);
      }
    }catch(error){
      console.log("Server Error", error);
    }
  }


  const handleComment = async (blogID, comment)=>{

    if(comment.trim() === ""){
      console.log("Please Write something, before submitting.");
      return;
    }

    try{
        const response = await axios.put("http://localhost:3000/comment", 
          {
            blogID,
            comment
          }, {
          headers: {
            authorization: localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        });
        const updatedBlog = response.data.data;
       

        const updatedBlogs = showBlog.map((blog) =>{
          return blog._id === updatedBlog._id ? updatedBlog : blog
        });
      
        setShowBlog(updatedBlogs);
    }catch(error){
      console.log("Server Error", error);
    }
  }


  const displayComments = ()=>{
    if(blog.comments.length && showComment === false){
      setShowComment(true);
    }else{
      setShowComment(false);
    }
  }

  return (
    <>
      <div className = "flex space-x-3 mt-3 text-sm item-center">
        {blog?.likedBy?.includes((localStorage.getItem("userID")))?
          (<Heart onClick={()=>handleLike(blog._id)} fill='red' stroke='red'/>)
            :
          (<Heart onClick={()=>handleLike(blog._id)}/>)
        }

        <span className='font-semibold mt-1'>{blog.likedBy.length}</span>

        <MessageCircle onClick={displayComments}/>

        <span className='font-semibold mt-1'>{blog.comments.length}</span>
        
        
      </div>
      <div className='flex'>
        <input 
          type='text'
          value={comment}
          onChange={(e)=>setComment(e.target.value)}
          placeholder='Add comment...'  
          className='ml-2 w-[25%] outline-0'
        />
        {comment.trim() && <button>
          <Forward 
            onClick={()=>handleComment(blog._id, comment)}
          />
        </button>}
      </div>
        {showComment?
        <div className='border-2 rounded-2xl p-4 border-gray-300'>
          <h1 className='font-bold '>Comments ({blog.comments.length})</h1>
          {blog?.comments?.map((item)=>{
            return (
              <div key={item._id} className='m-4'>
                <div className='flex items-center gap-2'>
                  <div className='w-5 h-5 rounded-full bg-black'></div>
                  
                  <h1 className='font-semibold'>
                    {item?.postedBy && typeof item.postedBy === 'object' && item.postedBy.name
                      ? item.postedBy.name
                      : "Unknown"}
                  </h1>
                </div>
                <div className='ml-8 text-gray-600'>{item.comment}</div>
              </div>
            )
          })}

          <div className='flex justify-center'>
            <button onClick={()=>setShowComment(false)}><ArrowUp /></button>  
          </div>
        </div>
        :
        blog.comments.length?<button onClick={displayComments} className='text-white-500 font-semiBold cursor-pointer text-left'>View Comments </button>: ""}
    </>
  )
}