import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// CSS
import './App.css'
import './components/LoginPage/Login.css'
import './components/RegisterPage/Register.css'
import './components/MainPage/MainPage.css'
import './components/EditPage/EditPage.css'
import './components/MakeRoomPage/MakeRoomPage.css'
import './components/EachGroup/EachGroup.css'
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
//MakeRoomPage
import MakeRoom from './components/MakeRoomPage/MakeRoom'
import WelcomeMakeRoom from './components/MakeRoomPage/WelcomeMakeRoom'
//JoinRoomPage
import JoinRoom from './components/JoinPage/JoinRoom'
//MbitPage
import MbtiForm from './components/MbtiForm/MbtiForm'
//
import EachGroup from './components/EachGroup/EachGroup'

function App() {
  return (
    // <div>
    //   <JoinRoom />
    // </div>

      <div>
        {/* กำหนดเส้นทางสำหรับหน้าแรก */}
        <Routes>
          <Route path="/" element={<div> {/* ให้มี div หรือ fragment เพื่อครอบรอบ Navbar และ Hero */}
            <Navbar />
            <Hero />
          </div>} />
        </Routes>

        {/* กำหนดเส้นทางสำหรับหน้า Login */}
        <Routes>
          <Route path="/login" element={<div>
            <Navbar></Navbar>
            <Login />
          </div>} />
        </Routes>

        {/* กำหนดเส้นทางสำหรับหน้า Register */}
        <Routes>
          <Route path="/register" element={<div>
            <Navbar></Navbar>
            <Register />
          </div>} />
        </Routes>

        {/* กำหนดเส้นทางสำหรับหน้า Main */}
        <Routes>
          <Route path="/main" element={<div>
            <BottomMenu />
            
            <WelcomeMenu />
            <BoxBox />
            
          </div>}>
          </Route>
        </Routes>

        {/* กำหนดเส้นทางสำหรับหน้า Edit */}
        <Routes>
          <Route path="/edit" element={<EditPage />} />
          <Route path="/edit/user-edit" element={<UserEdit />} />
        </Routes>

        {/* กำหนดเส้นทางสำหรับหน้า Creaate */}
        <Routes>
          <Route path="/create_group" element={<div>
          <WelcomeMenu />
          <MakeRoom />
          </div>} />
        </Routes>

        <Routes>
          <Route path="/join_group" element={<div>
            <WelcomeMenu />
            <JoinRoom />
          </div>} />
        </Routes>

        <Routes>
          <Route path="/edit_profile" element={<div>
            <WelcomeMenu/>
            <UserEdit/>
          </div>} />
        </Routes>

        <Routes>
          <Route path="/mbti_collecting" element={<div>
            <WelcomeMenu/>
            <MbtiForm/>
          </div>} />
        </Routes>

        <Routes>
          <Route path="/group/:groupName" element={<div>
            <EachGroup/>
          </div>} />
        </Routes>

      </div>
  );
}

export default App
