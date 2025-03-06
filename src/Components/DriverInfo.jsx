import React from 'react'
import Pickup from "../assets/pickup.png"
import Dropoff from "../assets/drop.webp"
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { RiArrowDownWideLine } from "react-icons/ri";

const DriverInfo = ({ vehicalType, destination, pickup, setColapse, colapse }) => {
    return (
        <div>

            <RiArrowDownWideLine  onClick={() => setColapse((prev) => !prev)} fontWeight={900} fontSize={20} color='gray' className={`m-auto cursor-pointer ${colapse && "rotate-180"} '`}/>
            <div className='px-3 pb-3 flex justify-between w-full items-center'>
                <h5 className='font-semibold'>Meet at the pickup point</h5>


                <span className='p-2 bg-black items-center justify-center  gap-1  flex  rounded-md'>
                    <p className='text-white mb-0 '>2</p>
                    <p className=' text-white '>min</p>
                </span>
            </div>

            <div className='h-[1px] w-full bg-gray-300'></div>

            <div className='p-3 flex  w-full justify-between items-center'>
                <div className='flex relative items-center'>
                    <img className='w-20 flex-shrink-0 h-20 rounded-full object-cover z-50' src="https://thispersondoesnotexist.com/" alt="" />
                    <img className='w-36 absolute top-[20px] left-[60px] -mr-4' src={vehicalType.img} alt="" />
                </div>


                <div className='flex flex-col justify-end text-right'>
                    <h4 className='font-bold text-[22px]'>Rahul</h4>
                    <p className='font-semibold text-[16px] text-gray-600'>03243290556</p>
                </div>
            </div>

            <div className='p-3 flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                    <p className=' font-bold text-[14px]'>Color: </p>
                    <span className='w-7 h-3 rounded-md bg-[#2afdfa]'> </span>
                </div>
                <div className='flex items-center gap-1'>
                    <p className=' font-bold text-[14px]'>Plate: </p>
                    <p className='text-gray-600 font-semibold text-[14px]'>KPK4662 </p>
                </div>
                <div className='flex items-center gap-1'>
                    <p className=' font-bold text-[14px]'>Capacity: </p>
                    <p className='text-gray-600 font-semibold text-[14px]'>3 </p>
                </div>
            </div>

            <div className='p-3 grid '>
                {/* Pickup Section */}
                <div className='flex items-center gap-3'>
                    <img src={Pickup} className='w-10 p-2 object-cover object-center custom-shadow-2 rounded-lg' alt="Pickup" />
                    <p className='font-semibold text-[14px]'>{pickup} </p>
                </div>

                {/* Vertical Line */}
                <div className='flex justify-center w-10 self-stretch '>
                    <div className='w-1 rounded-full bg-black self-stretch h-7 '></div>
                </div>

                {/* Destination Section */}
                <div className='flex items-center gap-3'>
                    <img src={Dropoff} className='w-10 p-1 object-cover object-center custom-shadow-2 rounded-lg' alt="Dropoff" />
                    <p className='font-semibold text-[14px]'>{destination}</p>
                </div>
            </div>
        </div>
    )
}

export default DriverInfo