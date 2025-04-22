import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'

import './index.css'
import App from './App.jsx'

import { Layout } from '../Layout.jsx'
import { Login } from './Components/loginpage/Login.jsx'
import { HomePage } from './Components/homeAfterLogin/HomePage.jsx'
import { Hero } from './Components/home/Hero.jsx'
import { UserInfo } from './Components/loginpage/UserInfo.jsx'
import { Home } from './Components/homeAfterLogin/pages/Home.jsx'
import { Search } from './Components/homeAfterLogin/pages/Search.jsx'
import { Notifications } from './Components/homeAfterLogin/pages/Notifications.jsx'
import { Explore } from './Components/homeAfterLogin/pages/Explore.jsx'
import { Profile } from './Components/homeAfterLogin/pages/Profile.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Hero />} />
      <Route path="login" element={<Login />} />
      <Route path="signup/userInfo" element={<UserInfo />} />
      
      <Route path="homePage" element={<HomePage />}>
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
