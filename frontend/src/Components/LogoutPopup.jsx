import { useNavigate } from "react-router-dom";
import { useLogout } from "../Context/LogOutContext";
import logOutIcon from '/Landing-Page/logout.png';


export const LogOutDisplay= ()=>{
    const navigate = useNavigate();
    const { showLogoutPopup, setShowLogoutPopup } = useLogout();

    const handleLogOut=()=>{
        setTimeout(() => {
            localStorage.clear();
            navigate('/');
        }, 1000);
    }

    const handleSwitchAccount=()=>{
        setTimeout(() => {
            localStorage.clear();
            navigate('/login');
        }, 1000);
    }
    return(
      <>
      {showLogoutPopup && 
      <div className="absolute inset-0 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center z-50">
        <div className="relative w-[50%] bg-black p-16 rounded-lg shadow-lg text-center">
          <div className=" absolute right-10 top-6 text-3xl text-white font-bold cursor-pointer hover:text-4xl" onClick={() => setShowLogoutPopup(false)}>✗</div>
          <div><img src={logOutIcon} alt="Logout Confirmation" className="w-40 h-40 mx-auto"/></div>

          <div className="space-y-6 mt-6 mb-4">
            <h1 className="text-2xl font-bold text-white mb-4">Are You Logging out?</h1>
            <p className="w-xl text-sm text-gray-300 mb-4 px-20 break-words">
              You can always log back at any time. If you just want to switch accounts, you can <span className="underline cursor-pointer" onClick={handleSwitchAccount}>add another account.</span>
            </p>
          </div>

          <div className="space-x-6">

            <button
              className="bg-white text-black outline-2 outline-gray-500 px-4 py-2 rounded-sm hover:bg-gray-300 hover:scale-110 hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
              onClick={() => setShowLogoutPopup(false)}
            >
              No, Stay Logged In
            </button>

            <button
              className="bg-black text-white border-2 border-gray-400 font-bold px-4 py-2 rounded-sm hover:bg-gray-900 hover:border-white hover:scale-110 hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
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


