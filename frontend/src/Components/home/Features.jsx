

export function Features(){

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