import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'

import './index.css'


// import { Home } from './Components/Dashboard/Pages/Home.jsx'
// import { Search } from './Components/Dashboard/pages/Search.jsx'
// import { Notifications } from './Components/Dashboard/pages/Notifications.jsx'
// import { Explore } from './Components/Dashboard/pages/Explore.jsx'
// import { Profile } from './Components/Dashboard/pages/Profile.jsx'
// import { ViewBlog } from './Components/Dashboard/Pages/ViewBlog.jsx'
import { Layout } from '../Layout.jsx'
import { Landing } from './Components/Landing/Landing.jsx'
import { Login } from './Components/Auth/Login.jsx'
import { Dashboard } from './Components/Dashboard/Dashboard.jsx'
import { UserInfo } from './Components/Auth/UserInfo.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Landing />} />
      <Route path="login" element={<Login />} />
      <Route path="signup/userInfo" element={<UserInfo />} />

      <Route path="dashboard" element={<Dashboard />} />

        {/* <Route index element={<MainContent />} /> 
        <Route path="Home" element={<MainContent />} />
        {/* <Route path="ViewBlog/:id" element={<ViewBlog />} />
        <Route path="Search" element={<Search />} />
        <Route path="Explore" element={<Explore />} />
        <Route path="Notifications" element={<Notifications />} />
        <Route path="Profile" element={<Profile />} /> 
      </Route> */}
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router}/>
  
)
