import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {Heart, MessageCircle, Forward, Bot, ArrowUp} from 'lucide-react'


export const ViewBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState({});

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/getBlogsById/${id}`,{
                    headers: {
                        authorization: localStorage.getItem("token"),
                    }
                });
                const data = response.data.data;
                setBlog(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        }
        fetchBlog();
        console.log(blog);
    }, [id]);

   console.log("Blog data",blog.data);

    return (
        <div className="h-fit w-full bg-white my-10 p-20">
            <div className="text-4xl font-bold leading-snug">{blog?.title}</div>
            <div className="text-gray-600">{blog?.description}</div>
            <LikeCommentSection blog={blog} />
        </div>
    );
}


export const LikeCommentSection = ({blog})=>{
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

        setBlog(result);
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
        console.log("Comment added successfully", updatedBlog);
        setBlog(updatedBlog);
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

        <span className='font-semibold mt-1'>{blog?.likedBy?.length}</span>

        <MessageCircle onClick={displayComments}/>

        <span className='font-semibold mt-1'>{blog?.comments?.length}</span>
        
        
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
          <h1 className='font-bold '>Comments ({blog?.comments?.length})</h1>
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
        blog?.comments?.length?<button onClick={displayComments} className='text-white-500 font-semiBold cursor-pointer text-left'>View Comments </button>: ""}
    </>
  )
}