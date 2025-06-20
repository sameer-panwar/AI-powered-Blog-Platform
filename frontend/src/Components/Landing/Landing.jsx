import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Brain, Flower,BookText, SlidersHorizontal, CalendarCheck2, MapPin, Mail, PhoneIncoming, MoveRight, Quote} from 'lucide-react'
import Marquee from "react-fast-marquee";

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
            <Features/>
            <HowItWorks/>
            <Testimonials/>
            <Contact/>
        </>
    )
}



const Home = ()=>{
    const navigate=useNavigate();
    return(
        <>
            <div className="hero-section h-screen w-full flex flex-col">
                <nav className="grid grid-cols-[60%_40%] justify-between items-center h-24 w-full px-10">
                    <ul className="flex justify-around list-none"> 
                        <li className='text-secondary text-2xl font-bold'>BLOGiQ</li>   
                        <li><a href="#home">Home</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#howItWorks">How It Works</a></li>
                        <li><a href="#testimonials">Testimonials</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                    </ul>
                    <div className="flex justify-end gap-12">
                        <button 
                            className="px-4 py-2 border-2 rounded-xl" 
                            onClick={()=>navigate("/login")}>
                                Login
                        </button>
                        <button
                            className="px-4 border-2 rounded-xl" >
                            Sign Up
                        </button>
                    </div>
                </nav>
                <main className=" flex-1 grid grid-cols-[60%_40%] justify-center items-center w-full">
                    <div className="main h-min p-20">
                            <h1 className=" text-6xl font-bold text-wrap ">Write Smarter. Publish Faster. Powered by AI</h1>
                            <h3 className="font-medium text-xl mt-2">Create and manage intelligent blog posts with AI that thinks like you</h3>
                            <h3 className="mt-2"> Join thousands of creators revolutionizing content creation</h3>
                            <input placeholder="Email Address" className="border-1 h-12 w-60 mt-12 rounded-l-xl pl-2"/><button className="bg-green-500 border-2 text-white h-12 w-36 font-bold rounded-r-xl" onClick={()=>navigate('/login')}>Get Started {">"}</button>
                    </div>
                    <div className="">
                        
                    </div>
                </main>
            </div>
        </>
    )
}



const Features = ()=>{

    const data = [
        {
            id: 1,
            icon: <Brain size={50}/>,
            title: "AI Content Suggestions",
            content: "Get smart topic ideas and outlines to kickstart your blog effortlessly."
        },
        {
            id: 2,
            icon: <Flower size={50}/>,
            title: "SEO Optimization",
            content: "Improve search rankings with keyword-rich suggestions and on-page SEO enhancements."
        },
        {
            id: 3,
            icon: <BookText size={50}/>,
            title: "Readability Improvements",
            content: "Make your content clearer and easier to read with AI-powered suggestions."
        },
        {
            id: 4,
            icon: <SlidersHorizontal size={50}/>,
            title: "Tone & Style Adjustments",
            content: "Modify writing tone—casual, professional, or friendly—to suit your target audience."
        },
        {
            id: 5,
            icon: <CalendarCheck2 size={50}/>,
            title: "AI-Generated Summaries",
            content: "Summarize long posts into concise overviews with catchy headlines or meta descriptions."
        }


    ];
    return(
        <div id="features" className="min-h-screen w-full p-8  pt-10 pb-10">
                <div className="flex flex-col justify-center items-center gap-4 ">
                    <SubHeading heading={"Features"}/>
                    <div className="text-4xl font-bold">Our Primary Features</div>
                    <div className="w-[60%] text-center">Discover powerful features that make content creation effortless — from easy editing and media uploads to analytics, sharing, and customization.</div>
                </div>
                <div className="flex-1 grid grid-cols-3 gap-10 m-10">
                    {data.map((item)=>{
                        return(
                        <div key={item.id} className="h-[200px] flex flex-col justify-center items-center text-center p-6">
                                <div>{item.icon}</div>
                                <h1 className="font-bold mt-4">{item.title}</h1>
                                <h3 className="font-medium text-sm">{item.content}</h3>
                        </div>
                        )
                    })}
                </div>
            
        </div>
    )
}

const HowItWorks = ()=>{

    return (
        <div id="howItWorks" className="resourse-section min-h-screen w-full flex flex-col items-center p-10 gap-4">
            <SubHeading heading={"How it Works"}/>
            <h1 className="text-4xl font-bold ">How our AI powered Blog Platform Works</h1>
            <div className="w-[50%] text-center">From idea to publication, our platform uses AI to simplify every step of blogging—helping you write smarter, faster, and more effectively.</div>
            <div className="grid grid-cols-3 gap-10 m-10">
                <div className="h-[450px] w-[300px] bg-red-400"></div>
                <div className="h-[450px] w-[300px] bg-red-400"></div>
                <div className="h-[450px] w-[300px] bg-red-400"></div>
                
            </div>
        </div>
    )
}

const Testimonials = ()=>{
    const data = [
        {
            id: 1,
            userName: "Aarav Mehta",
            userRole: "Product Manager",
            content: "This platform completely changed the way we handle customer feedback. Highly recommended!"
        },
        {
            id: 2,
            userName: "Saanvi Sharma",
            userRole: "UX Designer",
            content: "Clean design, smooth experience, and outstanding support from the team."
        },
        {
            id: 3,
            userName: "Karan Singh",
            userRole: "Software Engineer",
            content: "I integrated this tool within a day. Super developer-friendly and fast."
        },
        {
            id: 4,
            userName: "Neha Gupta",
            userRole: "Content Strategist",
            content: "This tool helped us boost engagement by 40% in just 2 weeks!"
        },
        {
            id: 5,
            userName: "Rohan Desai",
            userRole: "Digital Marketer",
            content: "Finally found a platform that delivers results without the fluff. Excellent ROI!"
        },
        {
            id: 6,
            userName: "Ishita Kapoor",
            userRole: "HR Manager",
            content: "Super easy to onboard new hires using this. Saves time and adds value."
        },
        {
            id: 7,
            userName: "Arjun Verma",
            userRole: "Data Analyst",
            content: "The insights we get now are next-level. Crisp, real-time, and actionable."
        },
        {
            id: 8,
            userName: "Meera Joshi",
            userRole: "Startup Founder",
            content: "If you're building fast and lean, this tool is your best friend."
        },
        {
            id: 9,
            userName: "Devansh Roy",
            userRole: "Freelance Developer",
            content: "Easy to set up, even easier to use. Love the simplicity and power."
        },
        {
            id: 10,
            userName: "Priya Nair",
            userRole: "Operations Lead",
            content: "Helped us streamline internal ops. The team loves it!"
        }
        ];

    return (
        <div id="testimonials" className="min-h-screen flex flex-col items-center justify-center text-center">
            <SubHeading heading={"Testimonials"}/>
            <h1 className="text-4xl font-bold w-[50%]">Words of praise from others about our presence.</h1>
          <div className="mt-8 w-full">
                <Marquee speed={60} gradient={false}>
                {data.map((item)=>{
                    return (<div key={item.id} className="grid grid-row-[10%_60%_30%] m-4 p-4 bg-red-400 h-[200px] w-[350px] rounded-2xl">
                        <div className="pl-2"><Quote size={24}/></div>
                        <div className="mt-2 mb-6">{item.content}</div>
                        <div className="grid grid-cols-[15%_85%]">
                            <div className="bg-black rounded-full w-8 h-8 mt-2"></div>
                            <div className="text-left">
                                <h1 className="font-bold">{item.userName}</h1>
                                <div className="text-sm">{item.userRole}</div>
                            </div>
                        </div>
                    </div>)
                })}
            </Marquee>
            </div>
            <div className="mt-8 w-full">
                <Marquee speed={60} gradient={false} direction="right">
                {data.map((item)=>{
                    return (<div key={item.id} className="grid grid-row-[10%_60%_30%] m-4 p-4 bg-red-400 h-[200px] w-[350px] rounded-2xl">
                        <div className="pl-2"><Quote size={24}/></div>
                        <div className="mt-2 mb-6">{item.content}</div>
                        <div className="grid grid-cols-[15%_85%]">
                            <div className="bg-black rounded-full w-8 h-8 mt-2"></div>
                            <div className="text-left">
                                <h1 className="font-bold">{item.userName}</h1>
                                <div className="text-sm">{item.userRole}</div>
                            </div>
                        </div>
                    </div>)
                })}
            </Marquee>
            </div>
        </div>
    )
}

const Contact = ()=>{
    return(
        <div id="contact" className="min-h-screen pt-20 relative">
            <div className="flex flex-col justify-center items-center gap-4">
                <SubHeading heading={"Contact Us"}/>
                <h1 className="text-4xl font-bold">Ready to Start Writing Smarter?</h1>
                <div className="w-[30%] text-center">Create high-quality, AI-powered blogs effortlessly—save time, boost reach, and focus on your ideas.</div>
                <button className="flex gap-2 bg-blue-500 rounded-2xl px-8 py-2 text-white font-bold">Get Started <MoveRight size={24}/></button>
            </div>
    
            <div className="absolute bottom-0 left-0 w-full bg-black text-white flex flex-col justify-center items-center">
                
                    <div className="flex gap-60 pt-20">
                        <ul>
                            <h1 className="mb-4 text-xl font-bold">Contact</h1>
                            <li className="flex gap-2 mb-2"><PhoneIncoming size={16}/>+91 9720523426</li>
                            <li className="flex gap-2 mb-2"><Mail size={16}/>@batofgothammmm@gmail.com</li>
                            <li className="flex gap-2"><MapPin size={16}/>Tokyo, Japan</li>
                        </ul>
                        <ul>
                            <h1 className="mb-4 font-bold">Navigate</h1>
                            <li>Home</li>
                            <li>Resources</li>
                            <li>FAQ</li>
                            <li>Contact Us</li>
                            <li>Features</li>
                        </ul>
                        <ul>
                            <h1 className="mb-4 font-bold">Follow Us</h1>
                            <li>linkdin</li>
                            <li>instagram</li>
                            <li>twitter</li>
                            <li>github</li>
                        </ul>
                        <ul className="">
                            <h1 className="mb-4 font-bold">Support</h1>
                            <li>Help Center</li>
                            <li>Hire a Professional</li>
                            <li>Report Abuse</li>
                            <li>System Status</li>
                        </ul>
                    </div>
                <div className="text-center pb-4">
                    <div className="pt-20">Terms of Services | Privacy Policy</div>
                    <div className="text-sm">© 2025 AI-Powered Blog. All rights reserved.</div>
                </div>
            </div>
                
        </div>
    )
}

const SubHeading =({heading})=>{
    return(
        <div className="px-4 bg-green-300 rounded-2xl text-sm">{heading}</div>
    )
}