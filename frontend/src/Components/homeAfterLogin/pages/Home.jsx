import axios from 'axios';
import {useCallback, useEffect, useState} from 'react'
export const Home = () => {
    const [showBlog, setShowBlog] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [like, setLike] = useState(false);
  
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
  
    const [newBlog, setNewBlog] = useState({
      title: "",
      content: "",
      keywords: [],
    });
  
    const [keyword, setKeyword] = useState("");
    const [displayKeywords, setDisplayKeywords] = useState([]); // Typo fix: setDisplayKeyords -> setDisplayKeywords
  
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

      const handleLike= (Id)=>{
        try{
          console.log(Id);
          const response = axios.post("http://localhost:3000/updateLike",
            {blogId : Id},
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
          setLike(true);
        }
      }catch(error){
        console.log("Server Error", error);
      }
    }

  
    return (
      <div className="h-fit w-full ">
        <form className="p-6 mb-2 mt-8" onSubmit={handleSubmit}>
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
            <input
              placeholder="Title of the Blog"
              className="border-2 w-1/2 mb-2 p-2 rounded-xl"
              type="text"
              name="title"
              value={newBlog.title}
              onChange={handleChange}
            />
            <input
              placeholder="Keywords"
              className="border-2 mb-2 ml-2 p-2 pr-8 rounded-xl"
              type="text"
              name="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              type="button"
              onClick={addKeywords}
              className="h-8 w-20 bg-blue-500 text-white font-bold rounded-sm ml-2"
            >
              Add
            </button>
          </div>
          <textarea
            placeholder="Whats On your mind!"
            className="p-2 pt-1 border-2 w-full h-30"
            type="text"
            name="content"
            value={newBlog.content}
            onChange={handleChange}
          />
  
          <div className="flex justify-end gap-6 m-2">
            <button className="h-10 w-46 bg-red-400 text-white font-bold rounded-sm flex items-center justify-center">
              Generate With AI
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-bot text-black"
              >
                <path d="M12 8V4H8" />
                <rect width="16" height="12" x="4" y="8" rx="2" />
                <path d="M2 14h2" />
                <path d="M20 14h2" />
                <path d="M15 13v2" />
                <path d="M9 13v2" />
              </svg>
            </button>
            <button
              className="h-10 w-18 bg-blue-500 text-white font-bold rounded-sm"
              type="submit"
            >
              Post
            </button>
          </div>
        </form>
        <div>
          {loading ? (
            <p className="text-center">loading...</p>
          ) : showBlog && Array.isArray(showBlog) && showBlog.length > 0 ? (
            showBlog.map((blog) => {
              return (
                <div
                  key={blog._id}
                  className="flex justify-between items-start w-[95%] border border-gray-300 rounded-lg p-6  m-6"
                >
                  <div className="flex flex-col space-y-3 w-fit">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-black rounded-full"></div>
                      <div>
                        <h1 className="font-semibold text-gray-800">
                          {blog.name} •{" "}
                          <span className="text-xs text-gray-500 font-normal">
                            {blog.date}
                          </span>
                        </h1>
                        <p className="text-sm text-gray-500">{blog.role}</p>
                      </div>
                    </div>
  
                    <h1 className="text-xl font-bold text-gray-900">{blog.title}</h1>
                    <p className="text-gray-600">{blog.content}</p>

                    
                    <div className="flex space-x-3 text-sm item-center">
                      
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={like?"red":"none"}
                        stroke="currentColor"
                        strokeWidth={like?"0":"2"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-heart cursor-pointer"
                        onClick={()=>handleLike(blog._id)}
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                      <span className='font-bold mr-14 mt-1'>{blog.likes}</span>
                      {blog.keyword &&
                        Array.isArray(blog.keyword) &&
                        blog.keyword.map((newItem, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 w-fit h-fit border border-gray-400 rounded-full text-gray-600"
                          >
                            {newItem}
                          </span>
                        ))}
                    </div>
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