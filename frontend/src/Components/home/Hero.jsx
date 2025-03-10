export function Hero(){
    return(
        <>
            <div className="hero-section h-screen w-full">
                <nav className="flex flex-row justify-between items-center h-24 w-full  bg-black text-white ">
                    <ul className="flex justify-evenly w-1/2 list-none"> 
                        <li>LOGO</li>   
                        <li>Home</li>
                        <li>Resources</li>
                        <li>Why us?</li>
                        <li>Contact</li>
                    </ul>
                    <button className="mr-8 h-10 w-28 border-2 border-white rounded-2xl">Login</button>
                </nav>
                <main className="flex justify-center items-center h-full">
                    <div className="main h-min w-fit">
                            <h1 className="text-6xl font-bold text-wrap w-2/3 ">Create & Discover AI-Generated Blogs Instantly</h1>
                            <h3 className="font-medium text-xl mt-2">Harness the power of AI to write high-quality blogs effortlessly.</h3>
                            <h3 className="mt-2"> Join thousands of creators revolutionizing content creation</h3>
                            <input placeholder="Email Address" className="border-1 h-12 w-60 mt-12 rounded-l-xl pl-2"/><button className="bg-green-500 border-2 text-white h-12 w-36 font-bold rounded-r-xl">Get Started {">"}</button>
                    </div>
                </main>
            </div>
        </>
    )
}