import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// CSS
import './App.css'
import './components/LoginPage/Login.css'
import './components/RegisterPage/Register.css'
import './components/MainPage/MainPage.css'
import './components/EditPage/EditPage.css'
// Landing Page
import Navbar from './components/LandingPage/Navbar'
import Hero from './components/LandingPage/Hero'
import About from './components/LandingPage/About'
import InfoOne from './components/LandingPage/InfoOne'
import InfoTwo from './components/LandingPage/InfoTwo'
import CTA from './components/LandingPage/CTA'
import Testimonials from './components/LandingPage/Testimonials'
import GetInTouch from './components/LandingPage/GetInTouch'
import Footer from './components/LandingPage/Footer'
//Login Page
import Login from './components/LoginPage/Login'
// Register Page
import Register from './components/RegisterPage/Register'
//MainPage
import BottomMenu from './components/MainPage/BottomMenu'
import WelcomeMenu from './components/MainPage/WelcomeMenu'
import BoxBox from './components/MainPage/BoxBox'
//EditPage
import EditPage from './components/EditPage/EditPage'
import UserEdit from './components/EditPage/UserEdit'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <EditPage/>
      <UserEdit/>
      <BottomMenu/>
    </>
  )
}

export default App
