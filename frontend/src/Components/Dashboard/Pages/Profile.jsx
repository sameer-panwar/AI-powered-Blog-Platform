import { useState } from "react";

import { HiOutlineLocationMarker, HiOutlineCalendar } from "react-icons/hi";

// BoxIcons
import { BiLink } from "react-icons/bi";

// FontAwesome
import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { DisplayUserBlogs } from "./MainContent";

const Profile = () => {
    return (
        <div className="mx-40 my-6">
            <ProfileHeader />
            <ProfileContent />
        </div>
    )
}

// ProfileHeader Component
const ProfileHeader =()=>{
    return (
        <div className="w-full mx-auto my-4 p-6 bg-white rounded-xl shadow-md border">
            <div className="flex items-start space-x-4">
                <div className="space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
                        JD
                    </div>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded font-medium">
                        Follow
                    </button>
                </div>

                <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
                    <p className="text-gray-500">@john_doe</p>
                    <p className="text-purple-600 font-medium mt-1">
                        Senior Frontend Developer & Tech Writer
                    </p>
                    <p className="text-gray-600 mt-2">
                        Passionate about building user-friendly web applications and
                        sharing knowledge through writing. Love exploring new technologies
                        and helping others learn to code. Coffee enthusiast ☕
                    </p>

                    <div className="flex items-center space-x-6 mt-4 font-semibold">
                        <div>
                        <p className="text-lg text-gray-900">1.2K</p>
                        <p className="text-gray-500 text-sm">Followers</p>
                        </div>
                        <div>
                        <p className="text-lg text-gray-900">389</p>
                        <p className="text-gray-500 text-sm">Following</p>
                        </div>
                        <div>
                        <p className="text-lg text-gray-900">42</p>
                        <p className="text-gray-500 text-sm">Posts</p>
                        </div>
                        <div>
                        <p className="text-lg text-gray-900">125.4K</p>
                        <p className="text-gray-500 text-sm">Views</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-4">
                        <HiOutlineLocationMarker className="text-lg" />
                        <span>San Francisco, CA</span>
                        <BiLink className="text-lg" />
                        <a href="https://johndoe.dev" className="text-purple-600 hover:underline">
                        johndoe.dev
                        </a>
                        <HiOutlineCalendar className="text-lg" />
                        <span>Joined March 2022</span>
                    </div>


                    <div className="flex items-center mt-4 space-x-2 ml-auto text-gray-600">
                        <FaTwitter className="hover:text-purple-600 cursor-pointer" />
                        <FaLinkedin className="hover:text-purple-600 cursor-pointer" />
                        <FaGithub className="hover:text-purple-600 cursor-pointer" />
                        <FaEnvelope className="hover:text-purple-600 cursor-pointer" />
                        
                    </div>
                </div>
            </div>
        </div>
    )
}


//Profile Content like User blogs, saved Blogs
const ProfileContent = ()=>{
    const [content, setContent] = useState("UserBlogs");
   
    return (
        <>
        <div className="w-full flex flex-col items-center mt-6">
            <div className="grid grid-cols-2 justify-around w-full h-12 rounded-2xl  bg-purple-200">
                <button 
                    onClick={() => setContent("UserBlogs")}
                    className={`w-full h-12 font-bold text-gray-900 rounded-l-2xl ${content === "UserBlogs" ? "bg-purple-400 text-white" : ""}`}
                    >My Blogs
                </button>
                <button 
                    onClick={() => setContent("SavedBlogs")}
                    className={`w-full h-12 font-bold text-gray-700 rounded-r-2xl ${content === "SavedBlogs" ? "bg-purple-400 text-white" : ""}`}
                    >Saved Blogs
                </button>
            </div>
            <div>{content === "UserBlogs" ? <DisplayUserBlogs userId={localStorage.getItem("userID")} /> : ""}</div>
        </div>        
        </>

    )
}

export default Profile;
