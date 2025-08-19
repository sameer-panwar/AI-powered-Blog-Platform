import { Header } from '../Pages/Dashboard/Home/Header';
import { Sidebar } from '../Pages/Dashboard/Home/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { createContext, useState } from 'react';
import logOutIcon from '/Landing-Page/logout.png';

export const LogOutContext = createContext();

export const Dashboard = () => {
  const navigate=useNavigate();
  const [logout, setLogout] = useState(false);
  

  return (
    <div className='h-screen w-screen m-0 p-0'>
      
        {logout && <LogOutDisplay navigate={navigate}/>}
        <LogOutContext.Provider value={{ logout, setLogout }}>
          <header className="fixed top-0 left-0 w-full h-16">
            <Header setLogout={setLogout} />
          </header>
        </LogOutContext.Provider>


        {/* Side bar */}
        <aside className="fixed top-16 left-0 w-64 h-full">
          <Sidebar />
        </aside>


        {/* Main Content */}
        <main className="h-full ml-64 pl-6 pt-16">
          <Outlet />
        </main>
            
        
    </div>
  )
}

const LogOutDisplay= ({navigate})=>{
  
    const [logout, setLogout]=useState(false);

    const handleLogOut=()=>{
        setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userID");
            navigate('/');
        }, 1000);
    }

    const handleSwitchAccount=()=>{
        setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userID");
            navigate('/login');
        }, 1000);
    }
    return(
      <>
      {logout && 
      <div className="absolute inset-0 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center z-50">
        <div className="relative bg-white p-10 rounded-lg shadow-lg text-center">
          <div className=" absolute right-10 top-6 text-3xl font-bold cursor-pointer hover:text-4xl" onClick={() => setLogout(false)}>✗</div>
          <div><img src={logOutIcon} alt="Logout Confirmation" className="w-40 h-40 mx-auto"/></div>

          <div className="space-y-6 mt-6 mb-4">
            <h1 className="text-2xl font-bold text-black mb-4">Are You Logging out?</h1>
            <p className="w-xl text-sm text-gray-600 mb-4 px-20 break-words">
              You can always log back at any time. If you just want to switch accounts, you can <span className="underline cursor-pointer" onClick={handleSwitchAccount}>add another account.</span>
            </p>
          </div>

          <div className="space-x-6">

            <button
              className="bg-white text-gray-500 outline-2 outline-gray-500 px-4 py-2 rounded-sm hover:bg-gray-800 hover:text-white cursor-pointer"
              onClick={() => setLogout(false)}
            >
              No, Stay Logged In
            </button>

            <button
              className="bg-black text-white font-bold px-4 py-2 rounded-sm hover:bg-white hover:text-black hover:outline-2 cursor-pointer"
              onClick={handleLogOut}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>}
      </>
    )
}


