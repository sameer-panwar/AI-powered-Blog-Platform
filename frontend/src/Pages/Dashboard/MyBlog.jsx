import { BlogList } from "../../Components/BlogList"

const MyBlog = ()=>{
    const userId = localStorage.getItem("userID");
    console.log(userId);
    return (
        <div className="p-10 h-full w-fit overflow-x-hidden">
            <BlogList userId={userId}/>
        </div>
    )
}

export default MyBlog;