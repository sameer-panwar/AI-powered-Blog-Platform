import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Landing(){
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



const Home = ()=>{
    const navigate=useNavigate();
    return(
        <>
            <div className="hero-section h-screen w-full">
                <nav className="flex flex-row justify-between items-center h-24 w-full  bg-black text-white ">
                    <ul className="flex justify-evenly w-1/2 list-none"> 
                        <li className='text-secondary'>LOGO</li>   
                        <li>Home</li>
                        <li>Resources</li>
                        <li>Features</li>
                        <li>Contact</li>
                    </ul>
                    <button className="mr-8 h-10 w-28 border-2 border-white rounded-2xl" onClick={()=>navigate("/login")}>Login</button>
                </nav>
                <main className="flex justify-center items-center h-full">
                    <div className="main h-min w-fit">
                            <h1 className="text-6xl font-bold text-wrap w-2/3 ">Create & Discover AI-Generated Blogs Instantly</h1>
                            <h3 className="font-medium text-xl mt-2">Harness the power of AI to write high-quality blogs effortlessly.</h3>
                            <h3 className="mt-2"> Join thousands of creators revolutionizing content creation</h3>
                            <input placeholder="Email Address" className="border-1 h-12 w-60 mt-12 rounded-l-xl pl-2"/><button className="bg-green-500 border-2 text-white h-12 w-36 font-bold rounded-r-xl" onClick={()=>navigate('/login')}>Get Started {">"}</button>
                    </div>
                </main>
            </div>
        </>
    )
}

const Resources = ()=>{

    const data=[
        {
            id:1,
            header:"How to Write a Blog Post in 5 Minutes with AI",
            content:"A step-by-step guide on using AI tools to generate high-quality blog content quickly"
        },{
            id:2,
            header:"SEO for AI-Generated Content",
            content:"Learn how to optimize AI-written blogs for Google search rankings."
        },{
            id:3,
            header:"AI vs. Human Writing: Finding the Perfect Balance",
            content:"When to use AI and when to edit manually"
        }
    ]
    return (
        <div className="resourse-section h-screen w-full">
            <h1 className="text-4xl font-bold text-center mb-10 ">Resources</h1>
            {data.map((item)=>{
                return (
                    <div key={item.id} className={`h-50 w-auto border-1 p-10 flex ${item.id%2 === 0? "justify-end": "justify-start"} items-center mb-10 ml-8 mr-8`}>
                        <div>
                        <h1 className="text-2xl font-bold">{item.header}</h1>
                        <h3 className="text-xl font-medium mt-2">{item.content}</h3>
                        <button className="mt-4 bg-orange-400 text-white font-bold h-8 w-30 rounded-xl">Learn More</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}



const Features = ()=>{

    let data=[
        {   
            id:1,
            header:"AI-Generated Blogs",
            content:"Get high-quality blogs in seconds",
            img: "dsd"
        },{
            id:2,
            header:"Smart Suggestions",
            content:"AI refines & enhances your writing"
        },{
            id:3,
            header:"SEO-Optimized Content",
            content:"AI helps rank your blogs better"
        },{
            id:4,
            header:"Text-to-Speech Feature",
            content:"Listen to blogs on the go!"
        },{
            id:5,
            header:"Personalized Recommendations",
            content:"AI suggests topics based on your interests"
        }
    ];
    return(
        <div className="h-fit w-full p-20">
            <h1 className="mb-20 text-5xl font-bold text-center">Features</h1>
            <div className="grid grid-cols-3 gap-10 items-center">
                {data.map((item)=>{
                    return(
                    <div key={item.id} className="h-2/3 w-full bg-blue-600 text-center">
                        <div className=" h-48 w-30">
                            <img src={item.img} alt={item.id}/>
                        </div>
                        <div>
                            <h1 className="font-medium ">{item.header}</h1>
                            <h3 className="font-medium ">{item.content}</h3>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}


const Contact = ()=>{
    return(
        <div className="h-screen flex justify-center items-center flex-col ">
            <h1 className="text-4xl font-bold mt-24 mb-20">About Us</h1>
            <h3 className="text-3xl w-2/3 mb-10 font-medium text-center">AI-Powered Blog Platform helps writers, creators, and businesses generate high-quality content effortlessly with advanced AI technology</h3>
            
            <div className="mt-20 mb-20"><input placeholder="Email Address" className="border-2 border-black h-16 w-xl rounded-l-xl pl-4"/><button className="h-16 w-42 text-xl bg-red-500 border-2 border-black text-white font-bold rounded-r-xl font-serif">Subscribe</button></div>
            
            <div className="relative w-full h-screen bg-black text-white flex flex-col justify-center items-center">
                
                        
                    <div className="flex gap-60 pt-20">
                        <ul>
                            <h1 className="mb-4">Navigate to</h1>
                            <li>Home</li>
                            <li>Resources</li>
                            <li>FAQ</li>
                            <li>Contact Us</li>
                        </ul>
                        <ul>
                            <h1 className="mb-4">Reach Us</h1>
                            <li>linkdin</li>
                            <li>instagram</li>
                            <li>twitter</li>
                            <li>github</li>
                        </ul>
                        <ul className="">
                            <h1 className="mb-4">Support</h1>
                            <li>Help Center</li>
                            <li>Hire a Professional</li>
                            <li>Report Abuse</li>
                            <li>System Status</li>
                        </ul>
                    </div>
                <div className="text-center">
                    <div className="pt-20">Terms of Services | Privacy Policy</div>
                    <div className="pt-2">© 2025 AI-Powered Blog. All rights reserved.</div>
                </div>
            </div>
                
        </div>
    )
}