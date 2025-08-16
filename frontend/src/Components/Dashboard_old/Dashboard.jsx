import { useState } from "react";
import {Outlet, useNavigate} from 'react-router-dom';
import { House, Search, Bell, CircleUserRound, SquarePen } from "lucide-react";
import logOutIcon from '/Landing-Page/logout.png';

export function Dashboard(){
    const navigate=useNavigate();
    const [logout, setLogout]=useState(false);

    const handleLogOut=()=>{
        setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userID");
            navigate('/');
        }, 1000);
    }

    const handleSwitchAccount=()=>{
        setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userID");
            navigate('/login');
        }, 1000);
    }

    return(
        <div className="h-screen w-screen flex flex-col">
            {logout && (
                <div className="absolute inset-0 bg-opacity-30 backdrop-blur-xs flex flex-col justify-center items-center z-50">
                <div className="relative bg-white p-10 rounded-lg shadow-lg text-center">
                    <div className=" absolute right-10 top-6 text-3xl font-bold cursor-pointer hover:text-4xl" onClick={() => setLogout(false)}>✗</div>
                    <div><img src={logOutIcon} alt="Logout Confirmation" className="w-46 h-46 mx-auto"/></div>

                    <div className="space-y-6 mt-6 mb-4">
                        <h1 className="text-2xl font-bold text-black mb-4">Are You Logging out?</h1>
                        <p className="w-xl text-sm text-gray-600 mb-4 px-20 break-words">
                            You can always log back at any time. If you just want to switch accounts, you can <span className="underline cursor-pointer" onClick={handleSwitchAccount}>add another account.</span>
                        </p>
                    </div>
                    
                    <div className="space-x-6">
                        
                        <button 
                            className="bg-white text-gray-500 outline-2 outline-gray-500 px-4 py-2 rounded-sm hover:bg-gray-800 hover:text-white cursor-pointer" 
                            onClick={() => setLogout(false)}
                        >
                            No, Stay Logged In
                        </button>

                        <button 
                            className="bg-black text-white font-bold px-4 py-2 rounded-sm hover:bg-white hover:text-black hover:outline-2 cursor-pointer" 
                            onClick={handleLogOut}
                        >
                            Log Out
                        </button>
                    </div>
                </div>
                </div>
            )}
            <Nav setLogout={setLogout}/>
            <Main />
            {/* <Trending/> */}
        </div>
    )
}



const Nav=({setLogout})=>{
    const navigate=useNavigate();
 
    return(
        <div className="bg-gray-300 flex flex-row justify-between items-center py-6 px-10 shadow-md">
            <div className="text-4xl font-bold cursor-pointer" onClick={()=> navigate("/homePage/Home")}>BLOGiQ</div>
            <div>
                <ul className="flex flex-row gap-8 font-medium cursor-pointer">
                    <li onClick={() => navigate("/homePage/Home")} className="nav-bar-list"><House />Home</li>
                    <li onClick={() => navigate("/homePage/Search")} className="nav-bar-list"> <Search />Search</li>
                    <li onClick={() => navigate("/homePage/Explore")} className="nav-bar-list"><SquarePen />Create</li>
                    <li onClick={() => navigate("/homePage/Notifications")} className="nav-bar-list"><Bell /> Notifications</li>
                    <li onClick={() => navigate("/homePage/Profile")} className="nav-bar-list"><CircleUserRound /> Profile</li>
                </ul>
            </div>
            <div className="relative">
                
                <button 
                    className="font-bold text-xl bg-red-500 text-white rounded-md px-4 py-2 cursor-pointer" 
                    onClick={()=>setLogout(true)}
                    >
                    Log out
                </button>
            </div>
        </div>
    )
}



// const Trending=()=>{
//     const arr=[ "Data Science", "Big Data", "Machine Learning", "Marketing", "Finance", "WordPress", "Amazon WebService" ,"Artificial Intelligence"];
//     return(
//         <div className="h-full bg-gray-300">
//             <h1 className="text-2xl font-bold text-center mt-10">Trending Topics</h1>
//             <div className="m-8 mt-10 grid grid-cols-3">
//                 {arr.map((item, index)=>{
//                     return <span key={index} className="w-fit h-fit p-4 border-1 ml-4 mt-4 text-sm font-bold text-white bg-black">{item}</span>
//                 })}
//             </div>
//         </div>
//     )
// }


const Main=()=>{
    return(
        <div className="h-screen w-screen flex flex-col overflow-hidden m-0">
            <div className="h-screen w-full px-50 overflow-y-auto no-scrollbar bg-gray-200">
                <Outlet/>
            </div>
        </div>
    )
}