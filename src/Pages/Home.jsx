import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaLongArrowAltRight, FaSearch } from "react-icons/fa";
import UserHome from './UserHome';
import DriverHome from './DriverHome';
import { useSelector } from 'react-redux';


const Home = () => {
  const [isLoggedIn] = useState(document.cookie.includes('loggedIn=true'))
  const [loggedInAs] = useState(document.cookie.includes("loggedInAs=driver") ? "driver" : document.cookie.includes("loggedInAs=user") ? "user" : null)
  const data = useSelector(state => loggedInAs === "user" ? state.user : state.driver)

  
  console.log(data)

  return (
    <div className={`flex min-h-screen ${!isLoggedIn ? "bg-[url(https://images.unsplash.com/photo-1647424825116-fbf8b9415fc5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center" : "bg-white"} flex-col justify-between  items-start  h-full`}>
      {!isLoggedIn && <img className='w-14 my-10 z-10 mx-6' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />}


      {(isLoggedIn && loggedInAs === "user")
        &&
        <UserHome />
      }

      {
        (isLoggedIn && loggedInAs === "driver") &&
        <DriverHome />
      }

      {!isLoggedIn &&
        (<div className='bg-white w-full h-[35%]  p-7 '>
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