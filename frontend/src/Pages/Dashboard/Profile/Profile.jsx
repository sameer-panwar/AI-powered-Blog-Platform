import { useState, useEffect } from "react";
import { HiOutlineLocationMarker, HiOutlineCalendar } from "react-icons/hi";

// BoxIcons
import { BiLink } from "react-icons/bi";

// FontAwesome
import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { BlogList, getInitials } from "../../../Components/BlogList";
import { useUser } from "../../../Context/UserContext";

const Profile = ({userId}) => {

  const { user } = useUser(); 
  const [profileUser, setProfileUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (userId) {
          const res = await axios.get(`http://localhost:3000/profile/${userId}`, {
            headers: { authorization: localStorage.getItem("token") },
          });
          setProfileUser(res.data.user);
          setIsAdmin(false);
        } else {
          setProfileUser(user);
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [userId, user]);

  if (!profileUser) return <div className="text-center text-gray-500">Loading profile...</div>;

  return (
    <div className="flex flex-col px-20 py-10 h-full overflow-x-hidden">
      <ProfileHeader profileUser={profileUser} isAdmin={isAdmin}/>
      <ProfileContent profileUser={profileUser} isAdmin={isAdmin} />
    </div>
  );
}

// ProfileHeader Component
const ProfileHeader =({profileUser, isAdmin})=>{

    return (
        <div className="w-fit h-full my-4 p-10 rounded-xl shadow-md border">
            <div className="flex items-start space-x-8">
                {isAdmin? 
                    <div>
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-600">
                            {profileUser.name && getInitials(profileUser.name)}
                        </div>
                    </div>
                    :
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-600">
                        {profileUser.name && getInitials(profileUser.name)}
                        </div>
                        <button className="bg-purple-600 text-white px-8 py-2 rounded font-medium">
                            Follow
                        </button>
                    </div>
                }

                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900">{profileUser.name}</h2>
                    <p className="text-gray-500">@{profileUser.username}</p>
                    <p className="text-purple-600 font-medium mt-1">
                        {profileUser.role}
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


                    <div className="flex items-center mt-6 space-x-2 ml-auto text-gray-600">
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
const ProfileContent = ({profileUser, isAdmin})=>{
    const [content, setContent] = useState("UserBlogs");

    if(isAdmin){
    return (
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
            <div>
                {content === "UserBlogs" 
                    ? <BlogList userId={profileUser._id} /> 
                    : <BlogList saved />}
            </div>
        </div>        
    )
    }else{
        return(
            <div>
                <div className="w-full h-12 font-bold rounded-l-2xl bg-purple-400 text-white">Recent Blogs</div>
                <div><BlogList userId={profileUser._id}/></div>
            </div>
        )
    }
}

export default Profile;
