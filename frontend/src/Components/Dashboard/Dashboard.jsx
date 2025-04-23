import { useState } from "react";
import {Outlet, useNavigate} from 'react-router-dom';


export function Dashboard(){
    

    return(
        <div className="h-screen w-full flex m-0 p-0 bg-secondary">
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
        <div className="fixed top-0 left-0 bg-gray-300 h-full w-[15%] flex flex-col justify-between items-center p-10">
            <div className="text-4xl font-bold cursor-pointer" onClick={()=> setActiveSection("Home")}>LOGO</div>
            <div>
                <ul className="flex flex-col gap-8 font-medium cursor-pointer">
                    <li onClick={() => navigate("/homePage/Home")}>Home</li>
                    <li onClick={() => navigate("/homePage/Search")}>Search</li>
                    <li onClick={() => navigate("/homePage/Explore")}>Explore</li>
                    <li onClick={() => navigate("/homePage/Notifications")}>Notifications</li>
                    <li onClick={() => navigate("/homePage/Profile")}>Profile</li>
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


const Main=()=>{
    return(
        <div className="h-screen w-[60%] flex flex-col ml-[15%] mr-[25%] p-0 text-black overflow-hidden">
            <div className="flex-1 overflow-y-auto no-scrollbar">
                <Outlet/>
            </div>
        </div>
    )
}