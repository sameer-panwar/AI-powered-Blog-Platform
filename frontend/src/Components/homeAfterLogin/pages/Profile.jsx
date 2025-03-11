import { useState } from "react";

export const Profile=()=>{
    const [isEditing, setIsEditing]=useState(false);
    const [username, setUsername]=useState("Raman Chawla");
    const [role, setRole]=useState("Software Developer at Blinkit");
    const [bio, setBio]=useState("Dehradun");
    const data=[
        {
            id: 1,
            name: "Raman Chawala",
            blog: {
                title:"Generative AI",
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus ducimus exercitationem tenetur veritatis doloribus, labore ratione debitis, nemo, aliquid velit earum cupiditate odio ipsam ipsa. Animi optio, illum dolore vel nobis asperiores possimus assumenda dolorem autem fuga nemo accusantium dignissimos, sint cum velit adipisci excepturi distinctio ipsum mollitia. Officiis aut accusantium rem. Dolorum, culpa. Animi quos nihil atque architecto est. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores nesciunt tempora ducimus nam facilis fugit accusamus vitae animi id. Nisi dignissimos perspiciatis magni sequi numquam.7"
            },
            role:"Software Developer at Blinkit",
            date: "APR 15, 2024",
            keyword:["AI", "Data Science"]
        },{
            id: 2,
            name: "Shayam Puri",
            blog: {
                title:"Generative AI",
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus ducimus exercitationem tenetur veritatis doloribus, labore ratione debitis, nemo, aliquid velit earum cupiditate odio ipsam ipsa. Animi optio, illum dolore vel nobis asperiores possimus assumenda dolorem autem fuga nemo accusantium dignissimos, sint cum velit adipisci excepturi distinctio ipsum mollitia. Officiis aut accusantium rem. Dolorum, culpa. Animi quos nihil atque architecto est. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores nesciunt tempora ducimus nam facilis fugit accusamus vitae animi id. Nisi dignissimos perspiciatis magni sequi numquam.7"
            },
            role:"Software Developer at Blinkit",
            date: 12,
            keyword:["AI", "Data Science"]
        },{
            id: 3,
            name: "Shayam Puri",
            blog: {
                title:"Generative AI",
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus ducimus exercitationem tenetur veritatis doloribus, labore ratione debitis, nemo, aliquid velit earum cupiditate odio ipsam ipsa. Animi optio, illum dolore vel nobis asperiores possimus assumenda dolorem autem fuga nemo accusantium dignissimos, sint cum velit adipisci excepturi distinctio ipsum mollitia. Officiis aut accusantium rem. Dolorum, culpa. Animi quos nihil atque architecto est. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores nesciunt tempora ducimus nam facilis fugit accusamus vitae animi id. Nisi dignissimos perspiciatis magni sequi numquam.7"
            },
            role:"Software Developer at Blinkit",
            date: 12,
            keyword:["AI", "Data Science"]
        },{
            id: 4,
            name: "Shayam Puri",
            blog: {
                title:"Generative AI",
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus ducimus exercitationem tenetur veritatis doloribus, labore ratione debitis, nemo, aliquid velit earum cupiditate odio ipsam ipsa. Animi optio, illum dolore vel nobis asperiores possimus assumenda dolorem autem fuga nemo accusantium dignissimos, sint cum velit adipisci excepturi distinctio ipsum mollitia. Officiis aut accusantium rem. Dolorum, culpa. Animi quos nihil atque architecto est. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores nesciunt tempora ducimus nam facilis fugit accusamus vitae animi id. Nisi dignissimos perspiciatis magni sequi numquam.7"
            },
            role:"Software Developer at Blinkit",
            date: 12,
            keyword:["AI", "Data Science"]
        },{
            id: 5,
            name: "Shayam Puri",
            blog: {
                title:"Generative AI",
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus ducimus exercitationem tenetur veritatis doloribus, labore ratione debitis, nemo, aliquid velit earum cupiditate odio ipsam ipsa. Animi optio, illum dolore vel nobis asperiores possimus assumenda dolorem autem fuga nemo accusantium dignissimos, sint cum velit adipisci excepturi distinctio ipsum mollitia. Officiis aut accusantium rem. Dolorum, culpa. Animi quos nihil atque architecto est. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores nesciunt tempora ducimus nam facilis fugit accusamus vitae animi id. Nisi dignissimos perspiciatis magni sequi numquam.7"
            },
            role:"Software Developer at Blinkit",
            date: 12,
            keyword:["AI", "Data Science"]
        },{
            id: 6,
            name: "Shayam Puri",
            blog: {
                title:"Generative AI",
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus ducimus exercitationem tenetur veritatis doloribus, labore ratione debitis, nemo, aliquid velit earum cupiditate odio ipsam ipsa. Animi optio, illum dolore vel nobis asperiores possimus assumenda dolorem autem fuga nemo accusantium dignissimos, sint cum velit adipisci excepturi distinctio ipsum mollitia. Officiis aut accusantium rem. Dolorum, culpa. Animi quos nihil atque architecto est. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores nesciunt tempora ducimus nam facilis fugit accusamus vitae animi id. Nisi dignissimos perspiciatis magni sequi numquam.7"
            },
            role:"Software Developer at Blinkit",
            date: 12,
            keyword:["AI", "Data Science"]
            }
    ]
        const handleSave=()=>{
            setIsEditing(false);
        }
        
    
    return(
        <div className="flex flex-col mt-20 ml-10">
            <div className="grid grid-cols-3">
                <div className="h-40 w-40 bg-black rounded-full">{data.img}</div>
                <div>
                <div className=" mt-10  text-4xl font-bold">{isEditing? <input value={username} onChange={(e)=>setUsername(e.target.value)} className="w-full border-1"/>: username}</div>
                    <div className=" flex gap-8 mt-4 text-lg">
                        <div>Blogs: <span className="font-bold">{data.blogs}</span></div>
                        <div>Likes: <span className="font-bold">{data.likes}</span></div>
                    </div>
                </div>
                <button className="ml-30 mt-16 h-10 w-20 font-medium bg-black text-white rounded-2xl"  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>{isEditing=== true?"Save":"Edit"}</button>
            </div>
            <div className="mt-4 font-bold">{isEditing?<input value={role} onChange={(e)=>{setRole(e.target.value)}} className="border-1 w-[40%] h-10"/>:role}</div>
            <div className="pt-2">{isEditing?<textarea value={bio} onChange={(e)=>{setBio(e.target.value)}} className="border-1 w-80 h-20"/>:bio}</div>   
            <div className="mt-20">
                <h1 className="text-2xl font-bold">Recent Blogs</h1>
                {data.map((item) => {
                return (
                    <div
                    key={item.id}
                    className="flex justify-between items-start w-full border border-gray-300 rounded-lg p-6 mt-6 mb-6">
                
                    <div className="flex flex-col space-y-3 w-3/4">
                        
                        <div className="flex items-center space-x-3">
                        {/* {<img src={item.profilePic} alt="Profile" className="h-10 w-10 rounded-full" />} */}
                        <div className="h-10 w-10 bg-black rounded-full"></div>
                        <div>
                            <h1 className="font-semibold text-gray-800">{item.name} • <span className="text-xs text-gray-500 font-normal">{item.date}</span></h1>
                            <p className="text-sm text-gray-500">{item.role}</p>
                        </div>
                        </div>

                    
                        <h1 className="text-xl font-bold text-gray-900">{item.blog.title}</h1>
                        <p className="text-gray-600">{item.blog.content}</p>

                        
                        <div className="flex space-x-3 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                            {item.keyword.map((newItem)=>{
                                return <span key={newItem} className="px-3 py-1 w-fit h-fit border border-gray-400 rounded-full text-gray-600">
                                        {newItem}
                                    </span>
                            })}
                        </div>
                    </div>
                    
                    
                    <img
                        src={item.blog.image}
                        alt="Blog"
                        className="h-24 w-32 object-cover rounded-md"
                    />
                    </div>
                );
                })}
            </div>
        </div>
    )
}