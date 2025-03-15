import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function UserInfo(){
    const navigate = useNavigate(); 
    const [currentPage, setCurrentPage]=useState("gender");
    const [gender, setGender]=useState(true);
    const [userData, setUserData]=useState({
        name: "",
        role: "",
        bio: ""
    });
    const [error, setError]=useState("");

    const handleNameError=()=>{
        if(userData.name.length === 0){
            setError("We be friends if you tell me your name");
            return;
        }else if(userData.name.length<3){
            setError("Name should be atleast 3 characters long");
            return;
        }
        setCurrentPage("role")
        setError("");
    }

    const handleRoleError=()=>{
        if(userData.role.length === 0){
            setError("Dont left empty, Manifest your role");
            return;
        }
        setCurrentPage("bio")
        setError("");
    }
    

    
    function handleChange(e){
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
        console.log(userData);
    }

    const handleSubmit= async()=>{
        try{
            const response=await axios.post("http://localhost:3000/signup/userInfo", userData, {
                headers: {
                     Authorization: localStorage.getItem("token"),
                     "Content-Type": "application/json" 
                    }
            });
            console.log(response.data.msg);
            setTimeout(()=>{
                navigate("/homePage");
            }
            ,2000);
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="flex flex-col justify-center items-center h-screen w-screen">
            <div className="absolute top-10 left-18 text-3xl font-bold">LOGO</div>
            <div className="outline-dotted outline-2 h-[70%] w-[30%]  flex flex-col justify-center items-center">
                
                {currentPage === "gender" && 
                <div className="mb-auto mt-auto">
                    <div  className="text-3xl font-bold mb-6">Your Gender?</div>
                    <div>
                        <button  
                            className="bg-gray-500 w-24 h-10 my-2 rounded-l-sm text-white font-bold shadow-2xl"
                            onClick={()=>{
                                setCurrentPage("name")
                                setGender(true)
                            }}
                            >Male
                        </button>
                        <button 
                            className="bg-gray-300 w-24 my-2 h-10 rounded-r-sm text-black font-medium  shadow-2xl"
                            onClick={()=>{
                                setCurrentPage("name")
                                setGender(false)  
                            }}
                            >Female
                        </button>
                    </div>
                </div>}
                {currentPage === "name" &&<Template
                    question={`Welcome ${gender? "Mr Laddu": "Ms Rumjum"}!\nAhh jeez I forgot!!\nWhat's your name?`}
                    button="Next"
                    name="name"
                    placeholder={gender? "Example: Laddu": "Exanple: Rumjum"}
                    onClick={handleNameError}
                    onChange={handleChange}
                    btnType={"button"}
                    error={error}
                />}
                {currentPage === "role" &&<Template
                    question={`Hello ${userData.name}!\nHow you doin!!\nTell me your role?`}
                    button="Next"
                    name="role"
                    placeholder="Software Developer at Blinkit"
                    onClick={handleRoleError}
                    onChange={handleChange}
                    btnType={"button"}
                    error={error}
                />}
                {currentPage === "bio" &&<Template
                    question={`ooouhh Crazyyyy!!\n\n This one is last right\n Write a short Bio?`}
                    button="Submit"
                    name="bio"
                    placeholder="I am a Software Developer at Blinkit"
                    onChange={handleChange}
                    btnType={"submit"}
                    onClick={()=>handleSubmit()}
                /> }
            </div>
        </div>
    )
}

const Template=({question, button,name, placeholder, onClick, onChange, btnType, error})=>{
    return(
        <form className="whitespace-pre-line mb-auto mt-auto w-[80%]"
            onSubmit={(e)=>e.preventDefault()}
            >
            <label htmlFor="name" className="block text-4xl font-medium text-gray-700 mb-6">
                {question}
            </label>
            <div className="mt-1">
                <input
                    type="text"
                    name={name}
                    id="name"
                    autoComplete="name"
                    placeholder={placeholder}
                    onChange={onChange}
                    required
                    className="block w-[80%]  p-4 shadow-sm border-1 sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                />
                <div className="text-red-500 font-semibold text-sm mt-2 ml-4">{error}</div>
            </div>
            <button
                type={btnType}
                onClick={onClick}
                className="w-20 ml-auto mt-24 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {button}
            </button>
        </form>
    )
}