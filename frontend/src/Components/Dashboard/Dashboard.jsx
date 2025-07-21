import { useState } from "react";
import {Outlet, useNavigate} from 'react-router-dom';
import { House, Search, Bell, CircleUserRound, Telescope } from "lucide-react";


export function Dashboard(){
    

    return(
        <div className="h-screen w-full grid grid-cols-[15%_auto_20%]">
            <Nav />
            <Main />
            <Trending/>
        </div>
    )
}



const Nav=({setActiveSection})=>{
    const navigate=useNavigate();
    const [active, setActive]=useState(false);

    const handleLogOut=()=>{
        setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userID");
            navigate('/');
        }, 1000);
    }

    return(
        <div className="bg-gray-300 h-full flex flex-col justify-between items-center p-10">
            <div className="text-4xl font-bold cursor-pointer" onClick={()=> setActiveSection("Home")}>BLOGiQ</div>
            <div>
                <ul className="flex flex-col gap-8 font-medium cursor-pointer">
                    <li onClick={() => navigate("/homePage/Home")} className="nav-bar-list"><House />Home</li>
                    <li onClick={() => navigate("/homePage/Search")} className="nav-bar-list"> <Search />Search</li>
                    <li onClick={() => navigate("/homePage/Explore")} className="nav-bar-list"><Telescope /> Explore</li>
                    <li onClick={() => navigate("/homePage/Notifications")} className="nav-bar-list"><Bell /> Notifications</li>
                    <li onClick={() => navigate("/homePage/Profile")} className="nav-bar-list"><CircleUserRound /> Profile</li>
                </ul>
            </div>
            <div className="relative">
                {active && <div
                    className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-black text-white w-56 h-20 rounded-sm flex flex-col justify-center items-center font-bold">
                    <h1 className=" text-xl mb-2">Are you sure?</h1>
                    <div>
                        <button className="bg-blue-400 w-12 mr-2 rounded-sm cursor-pointer" onClick={handleLogOut}>Yes</button>
                        <button className="bg-red-500 w-12 rounded-sm cursor-pointer" onClick={()=>setActive(false)}>No</button>
                    </div>
                    
                </div>}
                <button 
                    className="font-bold text-xl cursor-pointer" 
                    onClick={()=>setActive(true)}
                    >
                    Log out
                </button>
            </div>
        </div>
    )
}



const Trending=()=>{
    const arr=[ "Data Science", "Big Data", "Machine Learning", "Marketing", "Finance", "WordPress", "Amazon WebService" ,"Artificial Intelligence"];
    return(
        <div className="h-full bg-gray-300">
            <h1 className="text-2xl font-bold text-center mt-10">Trending Topics</h1>
            <div className="m-8 mt-10 grid grid-cols-3">
                {arr.map((item, index)=>{
                    return <span key={index} className="w-fit h-fit p-4 border-1 ml-4 mt-4 text-sm font-bold text-white bg-black">{item}</span>
                })}
            </div>
        </div>
    )
}


const Main=()=>{
    return(
        <div className="h-screen flex flex-col overflow-hidden m-0">
            <div className="flex-1 overflow-y-auto no-scrollbar">
                <Outlet/>
            </div>
        </div>
    )
}