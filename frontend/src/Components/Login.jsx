export function Login(){
    return(
        <div className="parent-div h-screen flex justify-center items-center bg-gray-200">
            <div className="h-4/5 w-1/4 bg-white outline-dashed outline-gray-400 outline-1 border-2 border-white">
                <h1 className="text-center font-bold m-4 text-2xl pb-2">Blog Platform</h1>
                <form action="" className="h-3/4 m-4 p-4 outline-dashed outline-1 outline-gray-400 pt-8">
                    <Label children="Username" placeholder="John Doe" type="text"/>
                    <Label children="Email" placeholder="johndoe@ss.com" type="text"/>
                    <Label children="Password" placeholder="hkkklnkbk" type="password" condition="Must be at least 6 characters long."/>
                    <button className="h-10 w-full bg-orange-400 text-white font-bold mt-2 rounded-sm">Create Account</button>
                </form>
                <div className="place-self-center font-medium text-sm pt-2">Already have an account? Login</div>
            </div>
            <div className="h-4/5 w-1/4 bg-red-400">

            </div>
        </div>
    )
}

function Label({children, placeholder, type, condition}){
    return(
        <div className="pb-6 flex flex-col">
            <label className="font-medium mb-1" htmlFor={children}>{children}</label>
            <input className="h-10 p-2 outline-dashed outline-gray-400 outline-1" placeholder={placeholder} type={type}/>
            <div className="pt-1 text-xs font-medium text-gray-500">{condition}</div>
        </div>
    )
}