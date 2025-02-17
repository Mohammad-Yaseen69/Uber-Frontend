import React from 'react'
import { FaUserAlt } from "react-icons/fa";


const VehicalSelectionBox = ({heading, text, img, availableDrivers, price, distance, activeVehical ,setActiveVehical, type}) => {
  return (
    <div onClick={() => setActiveVehical(type)} className={`flex cursor-pointer border-[3px] gap-2  p-2 rounded-md w-full ${activeVehical == type && "border-black border-[3px]"}`}>
        <img style={{mixBlendMode:"darken"}} src={img} className={`w-14 flex-shrink-0 flex-1`} alt="" />
        <div className='flex flex-col flex-[2]'>
            <div className='flex gap-2 items-center'>
                <h4 className='font-semibold '>{heading}</h4>
                <span className='flex items-center gap-1'>
                    <FaUserAlt className='size-[10px]'/>
                    <span className='text-[12px]'>{availableDrivers}</span>
                </span>
            </div>
            <p className='text-[12px]'>{distance} away</p>
            <p className='text-[12px] text-gray-700'>{text}</p>
        </div>
        <p className='font-semibold'>₨{price}</p>
    </div>
  )
}

export default VehicalSelectionBox