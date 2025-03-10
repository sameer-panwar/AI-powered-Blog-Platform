export function Resources(){

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