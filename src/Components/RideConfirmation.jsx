import React from 'react'
import { TbCash } from "react-icons/tb";
import Driver from "../assets/driver.png"
import { RiPinDistanceLine } from "react-icons/ri";

const RideConfirmation = ({ rideData, pickUp, destination, onClick }) => {
  console.log(rideData)
  return (
    <div className='p-3 relative flex flex-col justify-between h-full mt-6'>
      <div>
        <h4 className='text-black font-bold text-xl'>Confirm Your Ride!</h4>
        <div className='relative mt-4'>
          <input
            style={{ fontFamily: "sans-serif", fontWeight: 300 }}
            value={pickUp}
            readOnly
            className='border-none outline-none w-full py-3 bg-[#eeeeee] rounded-lg px-10 mb-3'
          />
          <input
            style={{ fontFamily: "sans-serif", fontWeight: 300 }}
            value={destination}
            type="text"
            className='border-none outline-none w-full py-3 bg-[#eeeeee] rounded-lg px-10'
            readOnly
          />

          <div className='flex gap-[3px] flex-col items-center justify-center absolute top-[20%]  left-4'>
            <span style={{ border: "3px solid black" }} className='p-[1.5px] flex-shrink-0 rounded-full'></span>
            <span className='w-[2.4px] bg-black h-11'></span>
            <span style={{ border: "3px solid black" }} className='p-[1.5px] flex-shrink-0 rounded-full'></span>
          </div>
        </div>


        <div className='mt-4 flex flex-col gap-3'>
          <div className='flex border-b py-1 items-center  gap-3 '>
            <TbCash size={30} />
            <div>
              <h4 className='text-gray-700 font-semibold'>Price</h4> <h4 className='font-semibold'>₨{rideData?.price}</h4>
            </div>
          </div>

          <div className='flex border-b py-1 items-center  gap-3 '>
            <img src={Driver} className='w-30' alt="" />
            <div>
              <h4 className='text-gray-700 font-semibold'>Available Drivers</h4> <h4 className='font-semibold'>{rideData?.availableDrivers}</h4>
            </div>
          </div>
          <div className='flex py-1 items-center  gap-3 '>
            <RiPinDistanceLine  size={30} />
            <div>
              <h4 className='text-gray-700 font-semibold'>Driver Disance</h4> <h4 className='font-semibold'>{rideData?.distance}</h4>
            </div>
          </div>
        </div>
      </div>


      <button onClick={onClick} className='cursor-pointer  w-full bg-black text-white mb-14 rounded-lg text-center font-bold p-2 py-3'>Confirm Your Ride</button>
    </div>
  )
}

export default RideConfirmation