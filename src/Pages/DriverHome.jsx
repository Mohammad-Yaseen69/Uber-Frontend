import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaLongArrowAltRight, FaSearch } from "react-icons/fa";
import { fetchData } from '../apis/api';
import gsap from "gsap"
import { useSelector } from "react-redux"
import { IoSpeedometerOutline, IoCarOutline, IoCashOutline } from "react-icons/io5";
import { DriverInfoPanel, RideCard } from '../Components';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DriverHome = () => {
    const [panelOpen, setPanelOpen] = useState(false)
    const [colapse, setColapse] = useState(false)
    const driverData = useSelector(state => state.driver.driverData.data)
    const [confirmedRidePanel, setConfirmedRidePanel] = useState(false)
    const [activeRideIdx, setActiveRideIdx] = useState(0)
    const [selectedRide, setSelectedRide] = useState({})
    const [rideStarted, setRideStarted] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const [rides, setRides] = useState([
        {
            id: 1,
            pfp: 'https://thispersondoesnotexist.com/',
            name: 'Esther brenny',
            price: "300",
            distance: "7km",
            pickUp: "7684 changidardh raod",
            destination: "lorem ipasdlfnask faskfnaslk fasldalv"
        },
        {
            id: 1,
            pfp: 'https://thispersondoesnotexist.com/',
            name: 'Esther brenny',
            price: "300",
            distance: "7km",
            pickUp: "7684 changidardh raod",
            destination: "lorem ipasdlfnask faskfnaslk fasldalv"
        },
    ])

    const [openModal, setOpenModal] = useState(false)

    const handlePanelAnimations = () => {
        gsap.to('.driver-info-panel', { height: 0 })
        gsap.to('.confirm-panel', { height: 0 })
        gsap.to('.rides', { height: 0 })
        gsap.to('.ride-started-panel', { height: 0 })


        if (confirmedRidePanel) {
            gsap.to('.confirm-panel', { height: 'auto' })
        }
        else if (rideStarted) {
            gsap.to('.ride-started-panel', { height: 'auto' })
        }
        else if (rides.length === 0) {
            gsap.to(".driver-info-panel", { height: 'auto' })
        }

        if (!confirmedRidePanel) {
            gsap.to('.show-ride', { height: 'auto' })
        }


    }

    const refactorPricing = (price) => {
        const priceInNumber = Number(price);

        if (priceInNumber >= 1000 && priceInNumber < 10000) {
            return (priceInNumber / 1000).toFixed(1).replace(".0", "") + "k";
        } else if (priceInNumber >= 10000) {
            return (priceInNumber / 1000).toFixed(0) + "k";
        }

        return priceInNumber.toString();
    };

    const handleIgnoreRide = (idx) => {
        gsap.to(`.rides-${idx}`, {
            height: 0,
            onComplete: () => {
                setRides(prevRides => prevRides.filter((_, i) => i !== idx));

                if (idx < rides.length - 1) {
                    setActiveRideIdx(idx);
                    gsap.to(`.rides-${idx + 1}`, {
                        height: 'auto'
                    });
                }
            }
        });
    };


    useEffect(() => {
        handlePanelAnimations()
    }, [colapse, rides, activeRideIdx, selectedRide, rideStarted])

    const classes = "z-50 absolute bottom-0 left-0 overflow-hidden h-0 p-3 rounded-2xl shadow-2xl shadow-black w-full bg-white"

    return (
        <div className='flex min-h-screen flex-col justify-between  items-start  h-full'>
            <img className='w-14 my-10 z-10 mx-6' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

            <div className='absolute top-0 left-0 w-full h-full'>
                <img className='w-full h-full object-cover z-[-1]' src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg" alt="" />
            </div>

            <DriverInfoPanel
                driverData={driverData}
                classes={classes}
                refactorPricing={refactorPricing}
            />

            {rides?.map((ride, idx) => (
                <RideCard
                    key={ride.id}
                    ride={ride}
                    idx={idx}
                    classes={classes}
                    activeRideIdx={activeRideIdx}
                    handleIgnoreRide={handleIgnoreRide}
                    onAccept={(ride) => {
                        setSelectedRide(ride)
                        setConfirmedRidePanel(true)
                        setRides(prevRides => prevRides.filter((_, i) => i !== idx));
                    }}
                />
            ))}

            <div key={selectedRide.id} style={{ padding: 0 }} className={`${classes} confirm-panel  p-0`}>
                <div className='bg-gray-100 w-full border-b p-3 flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <img src={selectedRide.pfp} className='w-16 rounded-xl ' alt="" />
                        <div>
                            <h3 className='font-bold '>{selectedRide.name}</h3>
                            <p className='font-semibold text-gray-500 text-[12px]'>03243290556</p>
                        </div>
                    </div>
                    <div>
                        <h3 className='font-bold text-right'>₨{selectedRide.price}</h3>
                        <p className='font-semibold text-right text-gray-500 text-[12px]'>{selectedRide.distance}</p>
                    </div>
                </div>

                <div className='p-3 '>
                    <div>
                        <span className='text-gray-400 text-[12px] font-semibold'>Pick up</span>
                        <h2 className='font-semibold'>{selectedRide.pickUp}</h2>
                        <div className='mt-3 h-[1px] w-full bg-gray-200'></div>
                    </div>
                    <div className='mt-3'>
                        <span className='text-gray-400 text-[12px] font-semibold'>Drop off</span>
                        <h2 className='font-semibold'>{selectedRide.destination}</h2>
                        <div className='mt-3 h-[1px] w-full bg-gray-200'></div>
                    </div>
                </div>

                <div className='p-3 mb-3 flex gap-2 items-center flex-col justify-end'>
                    <button
                        onClick={() => {
                            setShowModal(true)
                        }}
                        className='cursor-pointer w-full   bg-green-500 text-white rounded-lg text-center font-bold px-3 py-2'>
                        Start the Ride
                    </button>
                    <button
                        onClick={() => {
                            setConfirmedRidePanel(false)
                            setSelectedRide({})
                        }}
                        className='cursor-pointer w-full   bg-red-500 text-white rounded-lg text-center font-bold px-3 py-2'>
                        Cancel
                    </button>


                </div>
            </div>


            <div className={`${classes} p-3 ride-started-panel`}>
                <div className='flex gap-2 items-center'>
                    <img src={selectedRide.pfp} className='w-[57px] rounded-full ' alt="" />
                    <div>
                        <p className='font-medium text-gray-500 text-[12px]'>Pickup at</p>
                        <h3 className='font-semibold text-[18px] leading-4'>naruto village</h3>
                    </div>
                </div>

                <div className='h-[1px] w-full bg-gray-100 mt-2'></div>

                <div className='p-2'>
                    <div className='grid grid-cols-3 gap-2 '>
                        <div className='text-center flex flex-col items-center justify-center gap-1 p-3 bg-gray-100 shadow rounded-sm'>
                            <p className='font-medium text-gray-500 text-[12px]'>Est</p>
                            <h3 className='font-semibold text-[16px] leading-4'>5min</h3>
                        </div>
                        <div className='text-center flex flex-col items-center justify-center gap-1 p-3 bg-gray-100 shadow rounded-sm'>
                            <p className='font-medium text-gray-500 text-[12px]'>Distace</p>
                            <h3 className='font-semibold text-[16px] leading-4'>4km</h3>
                        </div>
                        <div className='text-center flex flex-col items-center justify-center gap-1 p-3 bg-gray-100 shadow rounded-sm'>
                            <p className='font-medium text-gray-500 text-[12px]'>Fare</p>
                            <h3 className='font-semibold text-[16px] leading-4'>₨323</h3>
                        </div>
                    </div>

                    <button className='cursor-pointer w-full bg-gray-700 text-white mt-3 rounded-lg text-center font-bold p-2 py-3'>
                        Pickup
                    </button>
                </div>


            </div>




            {showModal &&
                <div className="absolute inset-0 z-50 top-0  flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white m-2 p-6 rounded-lg shadow-lg w-80">
                        <div className="">
                            <h3 className="mb-2 text-md font-semibold text-black">
                                Enter The Otp
                            </h3>
                            <input type="number" className='border-none mb-7 outline-none w-full py-3 bg-[#eeeeee] rounded-lg px-4' />
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-200 flex-1 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        setShowModal(false)
                                        setRideStarted(true)
                                        setConfirmedRidePanel(false)
                                    }}
                                    className="bg-green-500 flex-1 text-white px-4 py-2 rounded-lg font-medium transition"
                                >
                                    Confirm
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            }








        </div>
    )
}

export default DriverHome