import React from 'react';

const RideCard = ({ ride, idx, classes, activeRideIdx, handleIgnoreRide, onAccept }) => {
    return (
        <div key={ride.id} style={{ padding: 0 }} className={`${classes} rides rides-${idx} ${idx === activeRideIdx && "show-ride"} h-auto p-0`}>
            <div className='bg-gray-100 w-full border-b p-3 flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <img src={ride.pfp} className='w-16 rounded-xl ' alt="" />
                    <div>
                        <h3 className='font-bold '>{ride.name}</h3>
                        <p className='font-semibold text-gray-500 text-[12px]'>03243290556</p>
                    </div>
                </div>

                <div>
                    <h3 className='font-bold text-right'>₨421</h3>
                    <p className='font-semibold text-right text-gray-500 text-[12px]'>{ride.distance}</p>
                </div>
            </div>

            <div className='p-3'>
                <LocationDetail label="Pick up" value={ride.pickUp} />
                <LocationDetail label="Drop off" value={ride.destination} />
            </div>

            <div className='p-3 mb-3 flex gap-3 items-center justify-end'>
                <span
                    onClick={() => handleIgnoreRide(idx)}
                    className='font-semibold cursor-pointer text-gray-600 text-[14px]'
                >
                    Ignore
                </span>
                <button
                    onClick={() => onAccept(ride, idx)}
                    className='cursor-pointer bg-black text-white rounded-lg text-center font-bold px-3 py-2'>
                    Accept
                </button>
            </div>
        </div>
    );
};

const LocationDetail = ({ label, value }) => (
    <div className={label === "Drop off" ? 'mt-3' : ''}>
        <span className='text-gray-400 text-[12px] font-semibold'>{label}</span>
        <h2 className='font-semibold'>{value}</h2>
        <div className='mt-3 h-[1px] w-full bg-gray-200'></div>
    </div>
);

export default RideCard;
