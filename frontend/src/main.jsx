import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'

import './index.css'
import App from './App.jsx'

import { Layout } from '../Layout.jsx'
import { Login } from './Components/loginpage/Login.jsx'
import { HomePage } from './Components/homeAfterLogin/HomePage.jsx'
import { Hero } from './Components/home/Hero.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
        <Route path='' element={<Hero/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='homePage' element={<HomePage/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
