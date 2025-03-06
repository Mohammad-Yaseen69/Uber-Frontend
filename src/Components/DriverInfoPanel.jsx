import React from 'react';
import { IoSpeedometerOutline, IoCarOutline, IoCashOutline } from "react-icons/io5";

const DriverInfoPanel = ({ driverData, classes, refactorPricing }) => {
    return (
        <div className={`${classes} driver-info-panel h-[30%]`}>
            <div className='flex flex-col w-full gap-4'>
                <div className='flex gap-3 items-center'>
                    <img className='w-[50px] rounded-full ' src="https://thispersondoesnotexist.com/" alt="" />
                    <div>
                        <h4 className='font-bold '>{driverData?.fullName}</h4>
                        <p className='text-gray-500 text-[12px]'>Basic Level</p>
                    </div>
                </div>

                <div className='bg-gray-200 grid grid-cols-3 p-2 rounded-md'>
                    <StatsBox icon={<IoSpeedometerOutline color='black' size={35} />} value="30km" label="Distance" />
                    <StatsBox icon={<IoCashOutline color='black' size={35} />} value={`₨${refactorPricing('1500')}`} label="Earning" />
                    <StatsBox icon={<IoCarOutline color='black' size={35} />} value="819" label="Rides" />
                </div>
            </div>
        </div>
    );
};

const StatsBox = ({ icon, value, label }) => (
    <div className='flex flex-col items-center justify-center'>
        {icon}
        <h3 className='font-semibold mt-1'>{value}</h3>
        <p className='text-gray-600 font-medium text-[12px]'>{label}</p>
    </div>
);

export default DriverInfoPanel;
