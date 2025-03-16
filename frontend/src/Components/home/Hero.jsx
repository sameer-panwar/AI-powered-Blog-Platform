import { useEffect } from "react";
import { Contact } from "./pages/Contact";
import { Features } from "./pages/Features";
import { Home } from "./pages/Home";
import { Resources } from "./pages/Resource";
import { useNavigate } from "react-router-dom";

export function Hero(){
    const navigate=useNavigate();
    useEffect(async ()=>{
        try{const response=await fetch("http://localhost:3000/autoLogin",{
            headers:{
                authorization: localStorage.getItem("token")
            }
        })
        console.log(response.status);
        navigate("/homePage");
        }catch(error){
            console.log("Server Error", error); 
        }
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