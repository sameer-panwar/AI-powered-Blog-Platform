export const Home=()=>{
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
    return(
        <div className="h-fit p-1 w-full ">
            <div className=" p-6 mb-2 mt-8">
                <h1 className="text-5xl font-bold pb-8 font-serif">Write a new Blog</h1>
                <input placeholder="Title of the Blog" className="border-2 w-1/2 mb-2 p-2 rounded-xl"/><input placeholder="Keywords" className="border-2 mb-2 ml-2 p-2 rounded-xl "/>
                <textarea placeholder="Whats On your mind!" className="p-2 pt-1 border-2 w-full h-30"/>
                <div className="flex justify-end gap-6 m-2">
                    <button className="h-10 w-46 bg-red-400 text-white font-bold rounded-sm flex items-center justify-center">Generate With AI<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot text-black"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg></button>
                    <button className="h-10 w-18 bg-blue-500 text-white font-bold rounded-sm ">Post</button>
                </div>
            </div>
            <div>
            {data.map((item) => {
                return (
                    <div
                    key={item.id}
                    className="flex justify-between items-start w-full border border-gray-300 rounded-lg p-6 m-4 mb-6">
                
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