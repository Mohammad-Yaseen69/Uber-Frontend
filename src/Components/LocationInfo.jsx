import React from 'react'

const LocationInfo = ({Icon, head, para, onClick}) => {
  return (
    <div onClick={onClick} className='flex gap-3 items-center hover:scale-105 transition-all duration-200 cursor-pointer'>
        <div className='w-10 h-10 flex items-center justify-center bg-[#eeeeee] rounded-full flex-shrink-0'>
            <Icon />
        </div>

        <div className='border-b border-[rgba(0, 0, 0, 0.3)]'>
            <h4 className='mb-[2px] leading-5 font-semibold'>{head.slice(0, 26)}{head.length > 26 && "..."} </h4>
            <p className='text-[13px] pb-3'>{para.slice(0, 35)}{head.length > 35 && "..."}</p>
        </div>
    </div>
  )
}

export default LocationInfo