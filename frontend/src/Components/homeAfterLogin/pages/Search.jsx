
export const Search=()=>{
    return(
        <div className="h-full flex justify-center">
            <div className="h-fit w-full flex justify-center mt-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search translate-x-7 translate-y-3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <input placeholder="Search people, blogs and find your interest" className="border-1 w-1/2 h-12 text-xl pl-10 rounded-l-lg"/><button className="w-28 h-12 bg-blue-400 text-white font-semibold text-[18px] rounded-r-xl">Search</button>
            </div>
        </div>
    )
}