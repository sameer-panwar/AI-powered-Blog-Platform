import { useEffect, useState } from "react";
import { Label } from "../../Auth/Login"
import axios from 'axios';
import { Heart ,MessageCircle, UserRoundPen} from "lucide-react";
import { LikeCommentSection } from "./Home";

const EditProfile=({profile, onClose})=>{
    const [newValues, setNewValues]=useState({});
    const [success, setSuccess]=useState(false);

    useEffect(()=>{
        const id=profile._id
        const name=profile.name;
        const role=profile.role;
        const bio=profile.bio;
        setNewValues({
            id: id,
            name: name,
            role: role,
            bio: bio
        });
    },[]);

    function handleChange(e){
        setNewValues((prev)=>({
            ...prev,
            [e.target.name] : e.target.value 
        }))
    }
    
    const handleSubmit=async ()=>{
        console.log(newValues);
        const id=  localStorage.getItem("userID");
        
        try{
            const response=await axios.put("http://localhost:3000/editProfile",{
                id,
                name: newValues.name,
                role: newValues.role,
                bio: newValues.bio
            },{
                headers:{
                    authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data);
            if(!response.data.success){
                console.log("Cant update");        
            }else{
                console.log("Updated!!");
                setSuccess(true);
                setTimeout(() => {
                    onClose();
                }, 2000);
            }

        }catch(error){
            console.error("Server Error", error);
        }
    }

    return(
        <div className="fixed inset-0 bg-white flex flex-col items-center border-4 ml-[15%] mr-[25%] pb-20">
            {success && <div className="fixed top-0 m-4 border-2 p-2 bg-green-500 text-white font-bold rounded-xl">Profile updated Successfull.</div>}
            <button 
                className="ml-auto mb-auto p-6 text-3xl font-extrabold border-3 cursor-pointer"
                onClick={onClose}
                >X
            </button>
            <div className="w-40 h-40 rounded-full bg-black mb-10"></div>
            <Label
                children="Name"
                type="text"
                name="name"
                value={newValues.name}
                onChange={handleChange}
            />
            <Label 
                children="Role"
                type="text"
                name="role"
                value={newValues.role}
                onChange={handleChange}
            />
            <Label 
                children="Bio"
                type="textarea"
                name="bio"
                value={newValues.bio}
                onChange={handleChange}
            />
            <button 
                className="bg-red-400 text-white font-bold px-4 py-2 mt-4 rounded-sm cursor-pointer"
                onClick={handleSubmit}>
                    Apply Changes
            </button>
        </div>
    )
}

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
        const userID = localStorage.getItem("userID");
        try{
            const response=await axios.get(`http://localhost:3000/profile/${userID}`,{
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
        const userID = localStorage.getItem("userID");
        try{
            const response=await axios.get(`http://localhost:3000/adminBlogs/${userID}`,{
            headers:{
                Authorization: localStorage.getItem("token"),
                
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
                    className="flex justify-center items-center gap-2 h-10 w-34 mt-10 text-sm font-bold bg-black text-white rounded-xl"
                    onClick={()=>setIsEditing(true)}>
                        Edit Profile<UserRoundPen size={18}/> 
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
                            <LikeCommentSection 
                                blog={item}
                                setShowBlog={setAdminBlogs}
                                showBlog={adminBlogs}
                            />
                            {/* <div className="flex space-x-8 text-sm">
                                <div className="flex ">
                                    {item?.likedBy?.includes(JSON.parse(localStorage.getItem("userID")))?
                                        (<Heart onClick={()=>handleLike(item._id)} fill='red' stroke='red'/>)
                                        :
                                        (<Heart onClick={()=>handleLike(item._id)}/>)
                                    }
                                    <div className="ml-2 mt-1">{item.likes}</div>
                                </div>
                                <MessageCircle />
                            </div> */}
                        </div>
                    </div>
                );
                })):<p className="mt-4 text-sm ml-2 text-gray-500">No Blogs uploaded!</p>}
            </div>
        </div>

        </>
    )
}

