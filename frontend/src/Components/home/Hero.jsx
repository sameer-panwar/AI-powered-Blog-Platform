import { useEffect } from "react";
import { Contact } from "./pages/Contact";
import { Features } from "./pages/Features";
import { Home } from "./pages/Home";
import { Resources } from "./pages/Resource";
import { useNavigate } from "react-router-dom";

export function Hero(){
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchData=async()=>{
            try{const response=await fetch("http://localhost:3000/autoLogin",{
                headers:{
                    authorization: localStorage.getItem("token")
                }
                })
            
                if(response.status === 200){
                    navigate("/homePage");
                }else{
                    navigate("/");
                }
            }catch(error){
                console.log("Server Error", error);
                navigate("/");
            }
        }
        fetchData();
    },[])   
    return(
        <>
            <Home/>
            <Resources/>
            <Features/>
            <Contact/>
        </>
    )
}