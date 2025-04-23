import axios from "axios";
import { useState } from "react";

useState

export const Search=()=>{
    const [searchUser, setSearchUser]=useState("");
    const [prevSearch, setPrevSearch]=useState([]);
    const [searchResult, setSearchResult]=useState([
        
    ]);

    const onHandleKeyDown=(e)=>{
        if(e.key === "Enter"){
            handleSearch();
        }
    }

    const handleSearch=async ()=>{

        setSearchResult([]);
        setPrevSearch((prev)=>[...prev, searchUser]);
        const response =await axios.get("http://localhost:3000/searchUser", {
            params:{
                searchUser: searchUser
            }
            ,
            headers:{
                Authorization: localStorage.getItem("token"),
            }
        })

        if(!response.data.success){
            console.log("No user found");
        }else{
            const data=response.data.users;
            setSearchResult(data);
        }
        console.log(searchResult);
    }

    return(
        <div className="h-full flex  flex-col">
            <div>
                <div className="h-fit w-full flex justify-center mt-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search translate-x-7 translate-y-3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <input 
                        placeholder="Search people, blogs and find your interest" 
                        className="border-1 w-1/2 h-12 text-xl pl-10 rounded-l-lg"
                        onChange={(e)=>setSearchUser(e.target.value)}
                        value={searchUser}
                        onKeyDown={onHandleKeyDown}
                    />
                    <button 
                        className="w-28 h-12 bg-blue-400 text-white font-semibold text-[18px] rounded-r-xl cursor-pointer"
                        onClick={handleSearch}>
                            Search
                    </button>
                </div>
            </div>
            <div className="h-full mx-40 mt-10 ">
                {searchResult.map((item)=>{
                    return(
                        <div key={item._id} className="flex items-center gap-4 p-4">
                            <div className="w-12 h-12 bg-black rounded-full"></div>
                            <div>
                                <h1 className="text-blue-400 text-xl">{item.name}</h1>
                                <div className="text-sm">{item.role}</div>
                            </div>
                        </div>
                    )
                })}
                <div>{!searchResult && prevSearch}</div>
                <div className="text-center mt-10 text-gray-400 font-bold">No more results...</div>
            </div>
        </div>
    )
}