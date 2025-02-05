import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCamera, FaTimes } from "react-icons/fa";
import { fetchData } from "../apis/api";
import { toast } from 'react-toastify';
import ColorPicker from 'react-pick-color';
import { Inputsfield } from "../Components";
import { successToastOpt, errorToastOpt } from "../constant";

const SetInfo = () => {
    const { userType } = useParams();
    const [imageFileUrl, setImageFileUrl] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showPicker, setShowPicker] = useState(false);
    const [step, setStep] = useState(2);
    const [data, setData] = useState({
        capacity: 1,
        vehicalType: "",
        plate: "",
        color: ""
    });
    const fileInputRef = useRef();
    const pickerRef = useRef();

    const handleFileChange = (e) => {
        const image = e.target.files[0];
        setImageFile(image);
        if (image) {
            const imageUrl = URL.createObjectURL(image);
            setImageFileUrl(imageUrl);
        }
    };

    const uploadImage = async () => {
        if (!imageFileUrl && !imageFile) return;
        const formData = new FormData();
        formData.append("pfp", imageFile);

        setLoading(true);
        try {
            const response = await fetchData(`${userType}/update-user`, {
                method: "POST",
                data: formData
            });

            if (response.isResponseOk) {
                toast.success(response.data?.message, successToastOpt);
                if (userType === "users") {
                    navigate("/");
                } else {
                    setStep(2)
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data.message || "Something went wrong", errorToastOpt);
        }

        setLoading(false);
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        if (name === "capacity" && value > 4) {
            toast.error("Maximum Capacity is 4", { ...errorToastOpt });
            return;
        }
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                setShowPicker(false);
            }
        };

        if (showPicker) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showPicker]);


    const addDriverDetails = async () => {
        Object.keys(data).forEach(field => {
            if (!data[field]) {
                toast.error(`Please provide your vehical ${field == "vehicalType" ? "type" : field}`, errorToastOpt)
            }
        })

        setLoading(true)
        try {
            const response = await fetchData(`driver/addDetails`, {
                method: "POST",
                data: data
            });

            if (response.isResponseOk) {
                toast.success(response.data?.message, successToastOpt);
                navigate("/");
            }

        } catch (error) {
            console.log(error.response?.data.message);
            toast.error(error.response?.data.message || "Something went wrong", errorToastOpt);
        }

        setLoading(false);
    }

    console.log(data.color)
    return (
        <div className={`flex h-full items-center ${step === 1 ? "mt-24" : "mt-12"} flex-col`}>
            {step === 1 && (
                <>
                    <input onChange={handleFileChange} ref={fileInputRef} type="file" className='hidden' />
                    <h1 className="text-2xl mb-5 text-black font-bold text-center">Set Your Profile Pic</h1>
                    <div
                        onClick={() => fileInputRef.current.click()}
                        className='bg-[#d6d6d6] cursor-pointer relative flex justify-center items-center h-36 w-36 rounded-full'
                        style={{ backgroundImage: `url(${imageFileUrl})`, backgroundSize: "cover" }}
                    >
                        {!imageFileUrl && <FaCamera size={40} />}
                        {imageFileUrl && (
                            <span onClick={() => setImageFileUrl("")} className='w-5 flex items-center justify-center h-5 absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-red-500'>
                                <FaTimes size={14} color='white' />
                            </span>
                        )}
                    </div>
                </>
            )}

            {step === 2 && (
                <>
                    <h1 className="text-2xl mb-5 text-black font-bold text-center">Complete Your Driver Profile</h1>
                    <div className='w-full px-3 relative'>
                        <div className='grid grid-cols-2 gap-4'>
                            <select onChange={handleFieldChange} name="vehicalType" className='w-full border-none-custom border-none bg-gray-100 p-3 custom-shadow outline-none rounded-md mt-4 border-black placeholder:text-[15px]'>
                                <option value="" disabled selected>Vehicle Type</option>
                                <option value="car">Car</option>
                                <option value="bike">Bike</option>
                                <option value="auto">Auto Rickshaw</option>
                            </select>
                            <Inputsfield
                                onChange={handleFieldChange}
                                value={data.capacity}
                                type='number'
                                placeholder='Capacity'
                                required
                                name={'capacity'}
                                min={1}
                                max={4}
                            />
                        </div>
                        <Inputsfield
                            onChange={handleFieldChange}
                            value={data.plate}
                            type='text'
                            placeholder='Vehicle Number Plate'
                            required
                            name={'plate'}
                        />
                        <div className='relative'>
                            <Inputsfield
                                onClick={() => setShowPicker(true)}
                                value={data.color}
                                type='text'
                                placeholder='Vehicle Color'
                                required
                                name={'color'}
                                className={'cursor-default' }
                                style={{
                                   paddingLeft: data.color ? "37px" :""
                                }}
                            />
                            <div className={`absolute top-1/2 left-2 h-4 rounded w-4 `} style={{ backgroundColor: data.color }} ></div>
                        </div>
                        {showPicker && (
                            <div ref={pickerRef}>
                                <ColorPicker
                                    className='picker absolute z-50 top-0 left-1/2 -translate-x-1/2'
                                    color={data.color}
                                    onChange={color => setData(prev => ({ ...prev, color: color.hex }))}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}

            <div className='absolute bottom-7 flex gap-4'>
                {userType === "users" && <button onClick={() => navigate("/")} disabled={loading} className='bg-[#ddd] px-6 rounded-md py-1'>Skip</button>}
                <button onClick={step == 1 ? uploadImage : addDriverDetails} disabled={(step == 1 && !imageFileUrl) || loading} className={`bg-[#1fbad6] flex justify-center items-center ${(!imageFileUrl && step == 1) ? "opacity-60" : "opacity-100"} text-white px-6 rounded-md py-1`}>
                    {loading ? <span className='loader'></span> : "Add"}
                </button>
            </div>
        </div>
    );
};

export default SetInfo;