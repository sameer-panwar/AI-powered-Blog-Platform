export function Features(){

    let data=[
        {   
            id:1,
            header:"AI-Generated Blogs",
            content:"Get high-quality blogs in seconds"
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
        <div className="h-screen p-20 flex justify-center items-center flex-col">
            <h1 className="mb-36 text-5xl font-bold">Why Us?</h1>
            <div className="grid grid-cols-3 gap-10 justify-evenly items-center">
                {data.map((item)=>{
                    return(
                    <div key={item.id} className="h-48 w-1xl bg-blue-600">
                        <h1 className="font-medium text-3xl p-5">{item.header}</h1>
                        <h3 className="font-medium text-xl m-5">{item.content}</h3>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}