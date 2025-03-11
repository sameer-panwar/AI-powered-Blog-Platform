import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { library } from '@fortawesome/fontawesome-svg-core';

export function Login() {
    const [template, setTemplate] = useState(true);

    return (
        <>
            {template ?
                <Template 
                    title="Sign Up" 
                    onClick={() => setTemplate(false)} 
                    button="Create Account" 
                    btnColor="bg-orange-400" 
                    nextPage="Already have a Account? Log In" 
                    showUsername={true} 
                />
                :
                <Template 
                    title="Login" 
                    button="Login IN" 
                    onClick={() => setTemplate(true)} 
                    btnColor="bg-blue-400" 
                    nextPage="Sign Up" 
                    showUsername={false} 
                />
            }
        </>
    )
}


const Template = ({ title, button, nextPage, onClick, btnColor, showUsername = true }) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [userExist, setUserExist] = useState(false);
    const [authentication, setAuthentication] = useState({});
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });


    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        
        try {
            if(title == "Sign Up"){
                const response = await axios.post("http://localhost:3000/signup", formData, {
                    headers: { "Content-Type": "application/json" },
                });
                localStorage.removeItem("token");
                localStorage.setItem("token", response.data.token);
                console.log("User created successfully");
                navigate('/homePage');
            }else if(title == "Login"){
                const response = await axios.post("http://localhost:3000/login", formData, {
                    headers: { "Content-Type": "application/json" }
                });

                console.log(response.data);
                console.log(response.data.success);
                console.log(response.data.msg);

                
                if(response.data.success){
                    localStorage.removeItem("token");
                    localStorage.setItem("token", response.data.token);
                    console.log("Login successfully");
                    navigate('/homePage');
                }else{
                    console.log("not found");
                }

            }
        } catch (error) {
            setMessage("Login Failed: " + (error.response?.data?.message || error.message));
            console.error("Something went wrong:", error);
        }
        
        
    };

    return (
        <div className="parent-div h-screen flex justify-center items-center bg-gray-200">
            <div className="h-4/5 w-1/4 bg-white outline-dashed outline-gray-400 outline-1 border-2 border-white">
                <h1 className="text-center font-bold m-4 text-2xl pb-2">{title}</h1>

                <form onSubmit={handleLogin} className="h-3/4 m-4 p-4 outline-dashed outline-1 outline-gray-400 pt-8">
                    {showUsername && (
                        <Label
                            children="Username"
                            placeholder="John Doe"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    )}
                    <Label
                        children="Email"
                        placeholder="johndoe@ss.com"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Label
                        children="Password"
                        placeholder="hkkklnkbk"
                        type="password"
                        condition="Must be at least 6 characters long."
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button
                        className={`h-10 w-full ${btnColor} text-white font-bold mt-2 rounded-sm`}
                        type="submit"
                    >
                        {button}
                    </button>
                </form>

                <div className="place-self-center font-medium text-sm pt-2" onClick={onClick}>
                    {nextPage}
                </div>
            </div>


            <div className="h-4/5 w-1/4 bg-red-400"></div>
        </div>
    );
};


function Label({ children, placeholder, type, condition, name, value, onChange}) {
    return (
        <div className="pb-6 flex flex-col">
            <label className="font-medium mb-1" htmlFor={children}>{children}</label>
            <input className="h-10 p-2 outline-dashed outline-gray-400 outline-1" placeholder={placeholder} type={type} name={name} value={value} onChange={onChange}/>
            <div className="pt-1 text-xs font-medium text-gray-500">{condition}</div>
        </div>
    )
}