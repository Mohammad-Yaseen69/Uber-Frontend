import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaLongArrowAltRight, FaSearch } from "react-icons/fa";
import { fetchData } from '../apis/api';
import gsap from "gsap"
import { FaChevronDown } from "react-icons/fa";
import { LocationInfo, VehicalSelectionBox, RideConfirmation, FindDriverPanel } from '../Components';
import { IoAirplane } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";

const Home = () => {
  const [isLoggedIn] = useState(document.cookie.includes('loggedIn=true'))
  const [panelOpen, setPanelOpen] = useState(false)
  const [pickUpField, setpickUpField] = useState("")
  const [selectedVehical, setSelectedVehical] = useState("car")
  const [destinationField, setDestinationField] = useState("")
  const [confirmRide, setConfirmRide] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [destinations, setDestinations] = useState([
    {
      place: 'Kempegowda International Airport adfasdfasdfasdfasdf',
      location: "KIAL Rd, Devanahalli. Bengaluru. Karnataka"
    },
    {
      place: 'Kempegowda International Airport adfasdfasdfasdfasdf',
      location: "KIAL Rd, Devanahalli. Bengaluru. Karnataka"
    },
    {
      place: 'Kempegowda International Airport adfasdfasdfasdfasdf',
      location: "KIAL Rd, Devanahalli. Bengaluru. Karnataka"
    },
    {
      place: 'Kempegowda International Airport adfasdfasdfasdfasdf',
      location: "KIAL Rd, Devanahalli. Bengaluru. Karnataka"
    }
  ])
  const [location, setlocation] = useState({
    location: null,
    place: null
  })
  const [vehicalData, setvehicalData] = useState([
    {
      type: "car",
      heading: "UberGo",
      availableDrivers: 4,
      price: 189,
      distance: "8 min",
      text: "Affordable, car rides",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2T80mE3molYgk4BCI9vmfXlAT8ebK1NdIBA&s"
    },
    {
      type: "bike",
      heading: "UberBike",
      availableDrivers: 4,
      price: 189,
      distance: "8 min",
      text: "Affordable, bike rides",
      img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
    },
    {
      type: "auto",
      heading: "UberAuto",
      availableDrivers: 4,
      price: 189,
      distance: "8 min",
      text: "Affordable, auto rides",
      img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
    }
  ])

  const handlePanelAnimations = () => {
    // Reset all panels
    gsap.to('.panel', { height: "0" })
    gsap.to('.vehical-panel', { height: "0" })
    gsap.to('.confirm-panel', { height: "0" })
    gsap.to('.find-driver-panel', { height: "0" })

    // Show appropriate panel
    if (panelOpen) {
      gsap.to('.panel', { height: "100%" })
    }
    else if (confirmRide) {
      gsap.to('.confirm-panel', { height: "100%" })
    }
    else if(confirmed){
      gsap.to(".find-driver-panel", {height: "50%"})
    }
    else if (location.location && location.place) {
      gsap.to('.vehical-panel', { height: "62%" })
    }
    else {
      gsap.to('.panel', { height: "31%" })
    }
  }

  useEffect(() => {
    handlePanelAnimations()
  }, [panelOpen, location, confirmRide, confirmed])
  console.log(selectedVehical)


  const classes = "z-50 absolute bottom-0 left-0 h-0 p-2 rounded-2xl shadow-2xl shadow-black w-full bg-white"

  return (
    <div className={`flex min-h-screen ${!isLoggedIn ? "bg-[url(https://images.unsplash.com/photo-1647424825116-fbf8b9415fc5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center" : "bg-white"} flex-col justify-between  items-start  h-full`}>
      <img className='w-14 my-10 z-10 mx-6' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />


      <div className='absolute top-0 left-0 w-full h-full'>
        <img className='w-full h-full object-cover z-[-1]' src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg" alt="" />
      </div>

      <div
        onClick={(e) => {
          if (!panelOpen) {
            setPanelOpen(true)
          }
        }}
        className='panel z-50 absolute bottom-0 left-0 h-[31%] p-4 rounded-2xl shadow-2xl shadow-black w-full bg-white'
      >
        {!panelOpen && <h4 className='font-bold text-[20px] text-black font-uber mb-3'>{"Find a Trip"}</h4>}
        {panelOpen && <FaChevronDown onClick={() => setPanelOpen(false)} className='colapse mb-6 z-50 cursor-pointer' />}

        <div className='relative'>
          <input
            style={{ fontFamily: "sans-serif", fontWeight: 300 }}
            type="text" placeholder='Add a Pickup Location'
            value={pickUpField}
            onChange={(e) => setpickUpField(e.target.value)}
            className='border-none outline-none w-full py-3 bg-[#eeeeee] rounded-lg px-10 mb-3'
          />
          <input
            style={{ fontFamily: "sans-serif", fontWeight: 300 }}
            onChange={(e) => setDestinationField(e.target.value)}
            value={destinationField}
            type="text"
            placeholder='Enter Your Destination' className='border-none outline-none w-full py-3 bg-[#eeeeee] rounded-lg px-10'
          />

          <div className='flex gap-[3px] flex-col items-center justify-center absolute top-[20%]  left-4'>
            <span style={{ border: "3px solid black" }} className='p-[1.5px] flex-shrink-0 rounded-full'></span>
            <span className='w-[2.4px] bg-black h-11'></span>
            <span style={{ border: "3px solid black" }} className='p-[1.5px] flex-shrink-0 rounded-full'></span>
          </div>
        </div>


        {panelOpen &&
          <div className='mt-6 flex flex-col gap-4'>
            {destinations?.map(({ place, location }, idx) => (
              <LocationInfo
                key={idx}
                Icon={FaLocationDot}
                head={place}
                para={location}
                onClick={() => {
                  setPanelOpen(false)
                  setlocation({
                    location: location,
                    place: place
                  })
                }}
              />
            ))}
          </div>
        }
      </div>


      {(!panelOpen && (location.location !== null && location.place !== null))
        &&
        <div className={`vehical-panel ${classes}`} >
          <IoArrowBack onClick={() => setlocation({ location: null, place: null })} className='size-5 mt-2 cursor-pointer' />
          <div className='flex flex-col gap-2 mt-2'>
            {vehicalData.map((v, idx) => (
              <VehicalSelectionBox
                heading={v.heading}
                activeVehical={selectedVehical}
                setActiveVehical={setSelectedVehical}
                availableDrivers={v.availableDrivers}
                price={v.price}
                distance={v.distance}
                text={v.text}
                img={v.img}
                type={v.type}
              />
            ))}
          </div>
          <button onClick={() => setConfirmRide(true)} className='cursor-pointer w-full bg-black text-white mt-3 rounded-lg text-center font-bold p-2 py-3'>Confirm</button>
        </div>
      }

      {confirmRide &&
        <div className={`confirm-panel ${classes}`}>
          <IoArrowBack onClick={() => setConfirmRide(false)} className='size-5 mt-2 cursor-pointer' />
          <RideConfirmation
            rideData={vehicalData.find(v => v.type === selectedVehical)}
            pickUp={pickUpField}
            destination={location.location}
            onClick={() => {
              setConfirmed(true)
              setConfirmRide(false)
            }}
          />
        </div>
      }

     {confirmed &&
      <div  className={`find-driver-panel ${classes}`}>
        <FindDriverPanel rideData={vehicalData.find(v => v.type === selectedVehical)} />
      </div>
      }



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