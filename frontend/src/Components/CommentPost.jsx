import {
    Heart,
    MessageCircle,
    Forward,
    ArrowUp
} from 'lucide-react';


export const CommentPost = ({blog, onComment})=>{

  return (
      <div className = "flex flex-row w-fit mx-4">

        <MessageCircle onClick={onComment}/>
        <span className='text-gray-500 mt-1 pl-2'>{blog.comments.length}</span>
        
      </div>
    )
}



{/* <template>

 const [showComment, setShowComment] = useState(false);


  const displayComments = ()=>{
    if(blog.comments.length && showComment === false){
      setShowComment(true);
    }else{
      setShowComment(false);
    }
  }

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
    </div>
  )
</template> */}