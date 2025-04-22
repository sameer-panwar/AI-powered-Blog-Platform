import { useEffect, useState } from "react";
import axios from 'axios';
import { ProfilePopup } from "./ProfilePopup";

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

    

    return(
        <>
            {isEditing && <ProfilePopup profile={profile} onClose={()=>setIsEditing(false)}/>}
            <div className="flex flex-col mt-20 ml-10">

                <div className="grid grid-cols-3">
                    
                    <div className="h-40 w-40 bg-black rounded-full"></div>
                    
                    <div>
                        <div className=" mt-10  text-4xl font-bold"> {profile.name}</div>
                        <div className=" flex gap-8 mt-4 text-lg">
                            <div>Blogs: <span className="font-bold">{profile.blogs}</span></div>
                            <div>Likes: <span className="font-bold">{profile.likes}</span></div>
                        </div>
                    </div>
                    
                    <button 
                        className="ml-30 mt-16 h-10 w-20 font-medium bg-black text-white rounded-2xl"
                        onClick={()=>setIsEditing(true)}>
                            Edit
                    </button>
                </div>

            <div className="mt-4 font-bold">{profile.role}</div>
            <div className="pt-2">{profile.bio}</div>   
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

                            
                            <div className="flex space-x-3 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                                {item.keyword.map((newItem, index)=>{
                                    return <span key={index} className="px-3 py-1 w-fit h-fit border border-gray-400 rounded-full text-gray-600">
                                            {newItem}
                                        </span>
                                })}
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