export function Contact(){
    return(
        <div className="h-screen flex justify-center items-center flex-col ">
            <h1 className="text-4xl font-bold mt-24 mb-20">About Us</h1>
            <h3 className="text-3xl w-2/3 mb-10 font-medium text-center">AI-Powered Blog Platform helps writers, creators, and businesses generate high-quality content effortlessly with advanced AI technology</h3>
            
            <div className="mt-20 mb-20"><input placeholder="Email Address" className="border-2 border-black h-16 w-xl rounded-l-xl pl-4"/><button className="h-16 w-42 text-xl bg-red-500 border-2 border-black text-white font-bold rounded-r-xl font-serif">Subscribe</button></div>
            
            <div className="relative w-full h-screen bg-black text-white flex flex-col justify-center items-center">
                
                        
                    <div className="flex gap-60">
                        <ul>
                            <li>Home</li>
                            <li>Resources</li>
                            <li>FAQ</li>
                            <li>Contact Us</li>
                        </ul>
                        <ul className="">
                            <li>linkdin</li>
                            <li>instagram</li>
                            <li>twitter</li>
                            <li>github</li>
                        </ul>
                    </div>
                <div className="text-center">
                    <div className="pt-20">Terms of Services | Privacy Policy</div>
                    <div className="pt-2">© 2025 AI-Powered Blog. All rights reserved.</div>
                </div>
            </div>
                
        </div>
    )
}