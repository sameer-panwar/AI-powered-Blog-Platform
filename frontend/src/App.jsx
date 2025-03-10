import { useState } from 'react'
import './App.css'
import { Hero } from './Components/home/Hero'
import { Resources } from './Components//home/Resource'
import { Features } from './Components/home/Features'
import { Contact } from './Components/home/Contact'
import { Login } from './Components/Login'
import { HomePage } from './Components/homeAfterLogin/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
        {/* <Hero/>
        <Resources/>
        <Features/>
        <Contact/>  */}
        <HomePage/>
        
    </>
  )
}
 
export default App
