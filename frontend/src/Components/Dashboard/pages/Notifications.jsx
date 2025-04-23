
export const Notifications=()=>{
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
