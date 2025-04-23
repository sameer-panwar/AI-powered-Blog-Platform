import { useEffect, useState } from "react";
import axios from 'axios';
import { EditProfile } from "./EditProfile";
import { Heart ,MessageCircle} from "lucide-react";

export const Profile=()=>{
    const [loading, setLoading]=useState(true);
    const [profile, setProfile]=useState({
        name: "",
        username: "",
        role: "",
        bio: "",
        blogs:null,
        likes:null
    });
    const [isEditing, setIsEditing]=useState(false);
    const [adminBlogs, setAdminBlogs]=useState(null);
        
    const getData =async ()=>{
        try{
            const response=await axios.get("http://localhost:3000/profile",{
                headers:{
                    authorization: localStorage.getItem("token")
                }
            });
            setProfile(response.data.user);
        }
        catch(error){
            console.log(error);
        }
    }

    const getBlogs=async()=>{
        try{
            const response=await axios.get("http://localhost:3000/adminBlogs",{
            headers:{
                Authorization: localStorage.getItem("token")
            }
            })
            const data=response.data.adminBlogs 
            console.log(response.data);
            setAdminBlogs(data);
            setLoading(false);
        }catch(error){
            console.log("Server Error", error);
            setLoading(false);
        }
        
    }
        
    useEffect(()=>{
        getData();
        getBlogs();
    },[]);

    useEffect(()=>{
        console.log(profile);
    },[profile]);


    const handleLike= async (id)=>{
        try{
          const response = await axios.post("http://localhost:3000/updateLike",
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

          const recievedData = adminBlogs.map((blog)=>{
            if(blog._id == result._id){
              return result;
            }else{
              return blog;
            }
          })
          console.log("recieved data:", recievedData);

          setAdminBlogs(recievedData);
        }
      }catch(error){
        console.log("Server Error", error);
      }
    }

    return(
        <>
            {isEditing && <EditProfile profile={profile} onClose={()=>setIsEditing(false)}/>}
            <div className="flex flex-col mt-20 ml-10">

                <div className="grid grid-cols-2 items-center mr-auto">
                    
                    <div className="h-40 w-40 bg-black rounded-full"></div>
                    
                    <div className="ml-20">
                        <div className=" mt-6  text-4xl font-bold"> {profile.name}</div>
                        <div className=" flex gap-8 mt-6 text-lg">
                            <div>Blogs: <span className="font-bold">{profile.blogs}</span></div>
                            <div>Likes: <span className="font-bold">{profile.likes}</span></div>
                        </div>
                    </div>
                    
                </div>

            <div className="mt-4 font-bold">{profile.role}</div>
            <div className="pt-2">{profile.bio}</div>   
            <div className="flex justify-end mr-10">
                <button 
                    className="h-10 w-34 mt-20 font-medium bg-black text-white rounded-xl"
                    onClick={()=>setIsEditing(true)}>
                        Edit Profile
                </button>
            </div>
    <div className="mt-20">
                <h1 className="text-2xl font-bold">Recent Blogs</h1>
                {loading ? (
                    <p className="text-center">loading...</p>
                    ) : adminBlogs && Array.isArray(adminBlogs) && adminBlogs.length > 0 ? (
                    adminBlogs.map((item) => {
                    return (
                    <div
                        key={item._id}
                        className="flex justify-between items-start w-[95%] border border-gray-300 rounded-lg p-6 mt-6 m-4">
                    
                        <div className="flex flex-col space-y-3 w-fit">
                            
                            <div className="flex items-center space-x-3">
                                {/* {<img src={item.profilePic} alt="Profile" className="h-10 w-10 rounded-full" />} */}
                                <div className="h-10 w-10 bg-black rounded-full"></div>
                                <div>
                                    <h1 className="font-semibold text-gray-800">{item.name} • <span className="text-xs text-gray-500 font-normal">{item.date}</span></h1>
                                    <p className="text-sm text-gray-500">{item.role}</p>
                                </div>
                            </div>

                        
                            <h1 className="text-xl font-bold text-gray-900">{item.title}</h1>
                            <p className="text-gray-600">{item.content}</p>

                            <div>
                            {item.keyword.map((newItem, index)=>{
                                    return <span key={index} className="px-3 py-1 w-fit h-fit border border-gray-400 rounded-full text-gray-600">
                                            {newItem}
                                        </span>
                                })}
                            </div>
                            <div className="flex space-x-8 text-sm">
                                <div className="flex ">
                                    {item?.likedBy?.includes(JSON.parse(localStorage.getItem("userID")))?
                                        (<Heart onClick={()=>handleLike(item._id)} fill='red' stroke='red'/>)
                                        :
                                        (<Heart onClick={()=>handleLike(item._id)}/>)
                                    }
                                    <div className="ml-2 mt-1">{item.likes}</div>
                                </div>
                                <MessageCircle />
                            </div>
                        </div>
                    </div>
                );
                })):<p className="mt-4 text-sm ml-2 text-gray-500">No Blogs uploaded!</p>}
            </div>
        </div>

        </>
    )
}