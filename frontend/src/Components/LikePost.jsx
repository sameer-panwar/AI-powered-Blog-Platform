import { Heart } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export const LikePost = ({ blog, onLike})=>{
    
    const isLiked = blog.likedBy?.includes((localStorage.getItem("userID")));

    return(
        <div className="flex flex-row w-fit mx-4">
            {
                <Heart onClick={()=>onLike(blog._id)} 
                fill={isLiked? "purple" : "none"}
                stroke='purple' 
                className="hover:scale-125 transition-transform duration-200 cursor-pointer"/>}

            <span className='text-gray-500 mt-1 pl-2'>{blog.likedBy.length}</span>
        </div>
    )
}