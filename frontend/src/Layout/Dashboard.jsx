import { Header } from '../Pages/Dashboard/Home/Header';
import { Sidebar } from '../Pages/Dashboard/Home/Sidebar';
import { Outlet } from 'react-router-dom';
import { useLogout } from '../Context/LogOutContext';
import { LogOutDisplay } from '../Components/LogoutPopup';


export const Dashboard = () => {
  const { showLogoutPopup } = useLogout();

  

  return (
    <div className='h-screen w-screen m-0 p-0'>
      
        {showLogoutPopup && <LogOutDisplay />}
          <header className="fixed top-0 left-0 w-full h-16">
            <Header  />
          </header>
        


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



