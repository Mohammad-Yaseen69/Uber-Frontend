import React from 'react'
import { Link } from 'react-router-dom'
import { FaLongArrowAltRight } from "react-icons/fa";


const Home = () => {
  return (
    <div className='flex  bg-[url(https://images.unsplash.com/photo-1647424825116-fbf8b9415fc5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center flex-col justify-between  items-start  h-full bg-red-50'>
       <img className='w-14 my-10 mx-6' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div className='bg-white w-full  p-7 '>
        <h1 className='text-3xl mb-5 font-semibold'>Start with Uber</h1>
        <Link to={'/login'} className='w-full bg-black items-center cont-btn justify-center text-white py-4 rounded-md flex'>
          <p className='color-white'>Continue</p>
          <FaLongArrowAltRight className='text-white mt-1 ml-2 arrow' />
        </Link>
      </div>
    </div>
  )
}

export default Home
