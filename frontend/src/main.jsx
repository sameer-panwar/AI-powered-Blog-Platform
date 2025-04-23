import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'

import './index.css'
import App from './App.jsx'

import { Layout } from '../Layout.jsx'
import { Login } from './Components/Auth/Login.jsx'
import { Dashboard } from './Components/Dashboard/Dashboard.jsx'
import { UserInfo } from './Components/Auth/UserInfo.jsx'
import { Home } from './Components/Dashboard/pages/Home.jsx'
import { Search } from './Components/Dashboard/pages/Search.jsx'
import { Notifications } from './Components/Dashboard/pages/Notifications.jsx'
import { Explore } from './Components/Dashboard/pages/Explore.jsx'
import { Profile } from './Components/Dashboard/pages/Profile.jsx'
import { Landing } from './Components/Landing/Landing.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Landing />} />
      <Route path="login" element={<Login />} />
      <Route path="signup/userInfo" element={<UserInfo />} />
      
      <Route path="homePage" element={<Dashboard />}>
        <Route index element={<Home />} /> 
        <Route path="Home" element={<Home />} />
        <Route path="Search" element={<Search />} />
        <Route path="Explore" element={<Explore />} />
        <Route path="Notifications" element={<Notifications />} />
        <Route path="Profile" element={<Profile />} />
      </Route>
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router}/>
  
)
