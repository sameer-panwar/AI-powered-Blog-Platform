import { useState } from "react";


export function HomePage(){
    const [activeSection, setActiveSection]=useState("Home");

    return(
        <div className="h-screen flex gap-10">
            <Nav setActiveSection={setActiveSection}/>
            <div className="h-screen w-[60%]  flex-1 text-black ml-[15%] mr-[25%] overflow-y-auto">
                {activeSection === "Home" && <Home/>}
                {activeSection === "Search" && <Search/>}
                {activeSection === "Explore" && <Explore/>}
                {activeSection === "Notifications" && <Notifications/>}
                {activeSection === "Profile" && <Profile/>}
            </div>
            <Trending/>
        </div>
    )
}

const Nav=({setActiveSection})=>{
    return(
        <div className="fixed top-0 left-0 bg-gray-300 h-full w-[15%] flex flex-col justify-between items-center p-10">
            <div className="text-4xl font-bold cursor-pointer" onClick={()=> setActiveSection("Home")}>LOGO</div>
            <div>
                <ul className="flex flex-col gap-8 font-medium cursor-pointer">
                    <li onClick={() => setActiveSection("Home")}>Home</li>
                    <li onClick={() => setActiveSection("Search")}>Search</li>
                    <li onClick={() => setActiveSection("Explore")}>Explore</li>
                    <li onClick={() => setActiveSection("Notifications")}>Notifications</li>
                    <li onClick={() => setActiveSection("Profile")}>Profile</li>
                </ul>
            </div>
            <div><button className="font-bold text-xl">Log out</button></div>
        </div>
    )
}

const Home=()=>{
    const data=[
        {
            id: 1,
            name: "Rancho",
            blog: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus ducimus exercitationem tenetur veritatis doloribus, labore ratione debitis, nemo, aliquid velit earum cupiditate odio ipsam ipsa. Animi optio, illum dolore vel nobis asperiores possimus assumenda dolorem autem fuga nemo accusantium dignissimos, sint cum velit adipisci excepturi distinctio ipsum mollitia. Officiis aut accusantium rem. Dolorum, culpa. Animi quos nihil atque architecto est. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores nesciunt tempora ducimus nam facilis fugit accusamus vitae animi id. Nisi dignissimos perspiciatis magni sequi numquam.7"
        },{
            id: 2,
            name: "Rancho",
            blog: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores nesciunt tempora ducimus nam facilis fugit accusamus vitae animi id. Nisi dignissimos perspiciatis magni sequi numquam.7"
        },{
            id: 3,
            name: "Rancho",
            blog: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores nesciunt tempora ducimus nam facilis fugit accusamus vitae animi id. Nisi dignissimos perspiciatis magni sequi numquam.7"
        },{
            id: 4,
            name: "Rancho",
            blog: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores nesciunt tempora ducimus nam facilis fugit accusamus vitae animi id. Nisi dignissimos perspiciatis magni sequi numquam.7"
        },{
            id: 5,
            name: "Rancho",
            blog: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores nesciunt tempora ducimus nam facilis fugit accusamus vitae animi id. Nisi dignissimos perspiciatis magni sequi numquam.7"
        },{
            id: 6,
            name: "Rancho",
            blog: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores nesciunt tempora ducimus nam facilis fugit accusamus vitae animi id. Nisi dignissimos perspiciatis magni sequi numquam.7"
        }
    ]
    return(
        <div className="h-fit p-1 w-full">
            <div className=" p-6 mb-4">
                <h1 className="text-2xl font-bold pb-8">Write a new Blog</h1>
                <input placeholder="Whats On your mind!" className="p-2 pt-1 border-2 w-full h-30"/><button className="h-10 w-18 bg-blue-500 text-white font-bold rounded-xs mt-2 ml-auto block">Post</button>
            </div>
            <div>
                {data.map((item)=>{
                    return(
                    <div key={item.id} className="h-fit w-fit m-6 mb-9   border-1 p-2 border-gray-400">
                        <h1 className="font-bold">{item.name}</h1>
                        <div>{item.blog}</div>
                        <Button children="Like" color="bg-blue-400"/>
                        <Button children="Share" color="bg-red-400"/>
                    </div>)
                })}
            </div>
        </div>
    )
}

const Button=({children, onclick, color})=>{
    return(<>
        <button onClick={onclick} className={`h-10 w-18 ${color} rounded-xl mr-4 mt-2`}>{children}</button>
    </>)
}

const Search=()=>{
    return(
        <div className="h-full flex justify-center">
            <div className="h-fit w-full flex justify-center mt-10">
            <input placeholder="Search people, blogs and find your interest" className="border-1 w-1/2 h-12 text-xl pl-2 rounded-l-lg"/><button className="w-28 h-12 bg-blue-400 text-white font-semibold text-[18px] rounded-r-xl">Search</button>
            </div>
        </div>
    )
}

const Explore=()=>{
    return(
        <div>
            fmdsdslkdslkf
        </div>
    )
}

const Notifications=()=>{
    const data=[
        {
            notif:"Someone has liked your blog."
        },{
            notif:"Someone has liked your blog."
        },
        {
            notif:"Someone has liked your blog."
        },{
            notif:"Someone has liked your blog."
        },
    ]
    return(
        <div className="h-full flex flex-col ">
            <h1 className="text-center mt-10 text-4xl font-bold">Nofifications</h1>
            <ul className="h-fit w-full flex flex-col justify-center gap-4 mt-10">
                {data.map((item)=>{
                    return <li className="ml-10 text-2xl border-2 w-1/2" key={item}>{item.notif}</li>
                })}
            </ul>
        </div>
    )
}

const Profile=()=>{
    const [isEditing, setIsEditing]=useState(true);
    const [username, setUsername]=useState("");
    const [bio, setBio]=useState("")
    const data={
            img:"",
            username: "Raman Chawla",
            bio: "cake murder 12 may",
            blogs: 4,
            likes: 34,
            recentblog: {
                heading: "yoosfhoofjsl"
                ,content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo eaque laboriosam nemo. In ducimus, fuga perspiciatis, quae ratione, rem mollitia beatae sunt quod reprehenderit laboriosam!"
         
            } 
        };
    
    return(
        <div className="flex flex-col mt-20 ml-16">
            <div className="flex">
                <div className="h-40 w-40 bg-black rounded-full">{data.img}</div>
                <div>
                <div className="">{isEditing? <input value={data.username} onChange={(e)=>setUsername(e.target.value)} className="w-1/2 border-2 mt-10 ml-14 text-4xl font-bold"/>: data.username}</div>
                    <div className="ml-18 flex gap-8 mt-4 text-lg">
                        <div>Blogs: <span className="font-bold">{data.blogs}</span></div>
                        <div>Likes: <span className="font-bold">{data.likes}</span></div>
                    </div>
                </div>
                <button className="ml-30 mt-16 h-10 w-20 font-medium bg-black text-white rounded-2xl">{edit=== true?"Edit":"Save"}</button>
            </div>
            <div className="mt-6">{data.bio}</div>   
            <div className="mt-30">
                <h1 className="text-2xl font-bold">Recent Blogs</h1>

                <div className="w-[80%] mt-6 border-1 p-4"><span className="font-bold mb-2">{data.recentblog.heading}</span><br/>{data.recentblog.content}</div>
            </div>
        </div>
    )
}

const Trending=()=>{
    return(
        <div className="h-full w-[25%] fixed top-0 right-0 bg-gray-300">
            <h1 className="text-2xl font-bold text-center mt-10">Trending Blogs</h1>
            <div className="m-8 mt-10">
                foidsjfjdfjldsjfdslkfj<br/>
                fhoidsfoidsiofjdsiofjodsjf<br/>
                foidsjfjdfjldsjfdslkfj<br/>
                fhoidsfoidsiofjdsiofjodsjf<br/>
                foidsjfjdfjldsjfdslkfj<br/>
                fhoidsfoidsiofjdsiofjodsjf<br/>
            </div>
        </div>
    )
}