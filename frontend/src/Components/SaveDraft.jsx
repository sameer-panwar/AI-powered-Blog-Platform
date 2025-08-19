import { Bookmark } from "lucide-react"

export const SaveDraft = ({user, blog, onSavedDraft})=>{

    const isBookmarked = user?.savedBlogs?.includes(blog._id);
    
    return (
        <div>
            <Bookmark
                onClick={() => onSavedDraft(blog._id)}
                fill={isBookmarked ? "purple" : "none"}
                stroke="purple"
                className="hover:scale-125 transition-transform duration-200 cursor-pointer"
            />
        </div>
    )
}
