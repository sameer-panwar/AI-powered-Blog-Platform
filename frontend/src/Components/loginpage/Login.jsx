import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { loginSchema, signupSchema } from '../type';
import axios from "axios";


export function Login() {
    const [template, setTemplate] = useState(true);

    return (
        <>
            {template ?
                <Template 
                    title="Sign Up" 
                    onClick={() => setTemplate(false)} 
                    btnColor="bg-orange-400" 
                    nextPage="Already have a Account? Log In" 
                    showUsername={true} 
                    buttonText="Sign Up"
                />
                :
                <Template 
                    title="Login" 
                    onClick={() => setTemplate(true)} 
                    btnColor="bg-blue-400" 
                    nextPage="Sign Up" 
                    showUsername={false} 
                    buttonText="Login"
                />
            }
        </>
    )
}


const Template = ({ title, buttonText ,nextPage, onClick, btnColor, showUsername = true}) => {
    const navigate = useNavigate();
    const [message, setMessage]= useState("");
    const [msgColor, setMsgColor]= useState("");
    const [loginState, setLoginState]=useState("");
    const [errors, setErrors]=useState({});
    const [submitted, setSubmitted]=useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    

    const handleLoginState = () => {
        
        if(title == "Sign Up"){
            setMsgColor("text-green-400");
            setMessage("creating your account...");
        }else{
            setMsgColor("text-green-400");
            setMessage("Logging...");
        }

        setTimeout(() => {
            setLoginState((prevLoginState) => {
                if (prevLoginState === "fullfilled") {
                    console.log("fullfilled");
                    setMsgColor("text-green-400");
                    setMessage(title === "Sign Up" ? "Your Account is created!" : "Login successful!");
        
                    setTimeout(() => {
                        navigate('/homePage');
                    }, 1000);
                } else {
                    console.log("no no no notfullfilled");
                    setMsgColor("text-red-500");
                    setMessage(title === "Sign Up" ? "Invalid Email/Password" : "Login Failed, Try again!");
                }
                return prevLoginState;
            });
        }, 3000);
        
    };


    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }));
    };

    useEffect(()=>{
        if(submitted){
            setErrors({});
            setSubmitted(false);    
        }
    },[formData]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const result = (title === "Sign Up") ? signupSchema.safeParse(formData) : loginSchema.safeParse(formData);
    
        console.log("ider se toh nikal chuke hai");
        if(!result.success) {
            const errorsObject=result.error.format();
            setErrors(errorsObject);
            console.log(errorsObject);
            setTimeout(() => { 
                console.log("After setting errors... still running");
            }, 1000); 
            console.log(result.success);
        }else{
            setErrors({});
            console.log("Moving to next step...");
            try {
                if(title == "Sign Up"){
                    const response = await axios.post("http://localhost:3000/signup", formData, {
                        headers: { "Content-Type": "application/json" },
                    });
                    localStorage.removeItem("token");
                    localStorage.setItem("token", response.data.token);
                    console.log("User created successfully");
                    setLoginState("fullfilled");
                    handleLoginState();
                    
                }else if(title == "Login"){
                    const response = await axios.post("http://localhost:3000/login", formData, {
                        headers: { "Content-Type": "application/json" }
                    });
                    console.log("Sending to backend:", formData);

                    
                    if(response.data.success){
                        localStorage.removeItem("token");
                        localStorage.setItem("token", response.data.token);
                        setLoginState("fullfilled");
                        console.log("dekh bhai set krra hu setloginstate ko fullfilled");
                        handleLoginState();
                        console.log("Login successfull");
                        
                    }else{
                        console.log("not found");
                        setLoginState("notfullfilled");
                        handleLoginState();
                    }

                }
            } catch (error) {
                setLoginState("notfullfilled");
                handleLoginState ();
                console.error("Something went wrong:", error);
            }
        }
        
        
    };

    return (
        <div className="parent-div h-screen flex justify-center items-center bg-gray-200">
            <div className="h-[80%] w-1/4 bg-white outline-dashed outline-gray-400 outline-1 border-2 border-white">
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
                            showErrors={errors.username && errors.username._errors[0]}
                        />
                    )}
                    <Label
                        children="Email"
                        placeholder="johndoe@ss.com"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        showErrors={errors.email && errors.email._errors[0]}
                    />
                    <Label
                        children="Password"
                        placeholder="hkkklnkbk"
                        type="password"
                        condition="Must be atleast 6 Charaters long"
                        showErrors={errors.password && errors.password._errors[0]}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button
                        className={`h-10 w-full ${btnColor} text-white font-bold mt-2 rounded-sm`}
                        type="submit"
                    >
                        {buttonText}
                    </button>
                    <div className={`text-center mt-2 font-bold text-sm ${msgColor}`}>{message}</div>
                </form>

                <div className="place-self-center font-medium my-4 text-sm" onClick={onClick}>
                    {nextPage}
                </div>
            </div>


            <div className="h-4/5 w-1/4 bg-red-400"></div>
        </div>
    );
};


function Label({ children, placeholder, type, condition, name, value, onChange, showErrors}) {
    return (
        <div className="pb-6 flex flex-col">
            <label className="font-medium mb-1" htmlFor={children}>{children}</label>
            <input className="h-10 p-2 outline-dashed outline-gray-400 outline-1" placeholder={placeholder} type={type} name={name} value={value} onChange={onChange}/>
            {showErrors?
                <div className="pt-1 text-xs font-bold text-red-500">{showErrors}</div>
                :
                <div className='pt-1 text-xs font-medium text-gray-500'>{condition}</div>
            }
        </div>
    )
}