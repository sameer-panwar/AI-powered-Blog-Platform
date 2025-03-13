import { useState } from "react";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { Explore } from "./pages/Explore";
import { Notifications } from "./pages/Notifications";
import { Profile } from "./pages/Profile";
import {useNavigate} from 'react-router-dom';

export function HomePage(){
    const [activeSection, setActiveSection]=useState("Home");

    return(
        <div className="h-screen flex gap-10 ">
            <Nav setActiveSection={setActiveSection}/>
            <div className="h-screen w-[60%]  flex flex-col text-black ml-[15%] mr-[25%] overflow-hidden">
                <div className="flex-1 overflow-y-auto no-scrollbar">
                    {activeSection === "Home" && <Home/>}
                    {activeSection === "Search" && <Search/>}
                    {activeSection === "Explore" && <Explore/>}
                    {activeSection === "Notifications" && <Notifications/>}
                    {activeSection === "Profile" && <Profile/>}
                </div>
                
            </div>
            <Trending/>
        </div>
    )
}

const Nav=({setActiveSection})=>{
    const navigate=useNavigate();
    return(
        <div className="fixed top-0 left-0 bg-gray-300 h-full w-[15%] flex flex-col justify-between items-center p-10">
            <div className="text-4xl font-bold cursor-pointer" onClick={()=> setActiveSection("Home")}>LOGO</div>
            <div>
                <ul className="flex flex-col gap-8 font-medium cursor-pointer">
                    <li onClick={() => setActiveSection("Home")}>Home</li>
                    <li onClick={() => setActiveSection("Search")}>Search</li>
                    <li onClick={() => setActiveSection("Explore")}>Explore</li>
                    <li onClick={() => setActiveSection("Notifications")}>Notifications</li>
                    <li onClick={() => setActiveSection("Profile")}>Profile</li>
                </ul>
            </div>
            <div>
                <button 
                    className="font-bold text-xl" 
                    onClick={()=>{
                        localStorage.removeItem("token");
                        navigate('/');
                    }}>
                    Log out
                </button>
            </div>
        </div>
    )
}

const Trending=()=>{
    const arr=[ "Data Science", "Big Data", "Machine Learning", "Marketing", "Finance", "WordPress", "Amazon WebService" ,"Artificial Intelligence"];
    return(
        <div className="h-full w-[25%] fixed top-0 right-0 bg-gray-300">
            <h1 className="text-2xl font-bold text-center mt-10">Trending Topics</h1>
            <div className="m-8 mt-10 grid grid-cols-3">
                {arr.map((item, index)=>{
                    return <span key={index} className="w-fit h-fit p-4 border-1 ml-4 mt-4 text-sm font-bold text-white bg-black">{item}</span>
                })}
            </div>
        </div>
    )
}