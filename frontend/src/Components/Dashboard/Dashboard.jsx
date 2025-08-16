import { Header } from './Pages/Header';
import { Sidebar } from './Pages/Sidebar';
import MainContent from './Pages/MainContent';
import { Outlet } from 'react-router-dom';


export const Dashboard = () => {
  return (
    <div className='h-screen w-screen m-0 p-0'>
        <Header />
        <div className="flex flex-row">
          <Sidebar />
            <div className='ml-64 mt-16 flex-1'>
              <Outlet />
            </div>
        </div>
    </div>
  )
}


