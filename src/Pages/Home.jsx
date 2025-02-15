import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaLongArrowAltRight, FaSearch } from "react-icons/fa";
import { fetchData } from '../apis/api';
import gsap from "gsap"
import { FaChevronDown } from "react-icons/fa";

const Home = () => {
  const [isLoggedIn] = useState(document.cookie.includes('loggedIn=true'))
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef()

  useEffect(() => {
    console.log(panelOpen)
    if (panelOpen) {
      gsap.to(panelRef.current, { height: "100%" })
    } else {
      gsap.to(panelRef.current, { height: "33%" })
    }
  }, [panelOpen])
  return (
    <div className={`flex min-h-screen ${!isLoggedIn ? "bg-[url(https://images.unsplash.com/photo-1647424825116-fbf8b9415fc5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center" : "bg-white"} flex-col justify-between  items-start  h-full`}>
      <img className='w-14 my-10 z-10 mx-6' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />


      <div className='absolute top-0 left-0 w-full h-full'>
        <img className='w-full h-full object-cover z-[-1]' src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg" alt="" />
      </div>

      <div
        onClick={(e) => {
          if(!panelOpen){
            setPanelOpen(true)
          }
        }}
        ref={panelRef}
        className='z-50 absolute bottom-0 left-0 h-[33%] p-4 rounded-2xl shadow-2xl shadow-black w-full bg-white'
      >
        {!panelOpen && <h4 className='font-bold text-[20px] text-black font-uber mb-3'>{"Find a Trip"}</h4>}
        {panelOpen && <FaChevronDown onClick={() => setPanelOpen(false)} className='colapse mb-6 z-50 cursor-pointer' />}

        <div className='relative'>
          <input style={{ fontFamily: "sans-serif", fontWeight: 300 }} type="text" placeholder='Add a Pickup Location' className='border-none outline-none w-full py-3 bg-[#eeeeee] rounded-lg px-10 mb-3' />
          <input style={{ fontFamily: "sans-serif", fontWeight: 300 }} type="text" placeholder='Enter Your Destination' className='border-none outline-none w-full py-3 bg-[#eeeeee] rounded-lg px-10' />

          <div className='flex gap-[3px] flex-col items-center justify-center absolute top-[20%]  left-4'>
            <span style={{ border: "3px solid black" }} className='p-[1.5px] flex-shrink-0 rounded-full'></span>
            <span className='w-[2.4px] bg-black h-11'></span>
            <span style={{ border: "3px solid black" }} className='p-[1.5px] flex-shrink-0 rounded-full'></span>
          </div>
        </div>
      </div>

      {!isLoggedIn &&
        (<div className='bg-white w-full  p-7 '>
          <h1 className='text-3xl mb-5 font-semibold'>Start with Uber</h1>
          <Link to={'/login'} className='w-full bg-black items-center cont-btn justify-center text-white py-4 rounded-md flex'>
            <p className='color-white'>Continue</p>
            <FaLongArrowAltRight className='text-white mt-1 ml-2 arrow' />
          </Link>
        </div>)
      }
    </div>
  )
}

export default Home
