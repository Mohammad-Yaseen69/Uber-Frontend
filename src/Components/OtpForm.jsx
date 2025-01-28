import React, { useEffect, useState } from 'react';
import SmilyFace from "./SmilyFace"
import { fetchData } from "../apis/api"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const OtpForm = ({ data }) => {
    const [inputs, setInputs] = useState(["", "", "", "", ""]);
    const [currentInput, setCurrentInput] = useState(0);  // Start from 0
    const [verification, setVerification] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e, idx) => {
        const value = e.target.value;

        if (/^\d?$/.test(value)) {
            const newInputs = [...inputs];
            newInputs[idx] = value;
            setInputs(newInputs);

            if (value && idx <= inputs.length) {
                document.getElementById(`otp-input-${idx + 1}`).focus();
                setCurrentInput(idx + 1);
            }
        }
    };


    const handleKeyDown = (e, idx) => {
        if (e.key === "Backspace" && !inputs[idx] && idx > 0) {
            document.getElementById(`otp-input-${idx - 1}`).focus();
            setCurrentInput(idx - 1);  // Set to previous index
        }
    };

    useEffect(() => {
        document.getElementById(`otp-input-0`).focus();
    }, [])


    const handleVerify = async () => {
        setDisabled(true)
        const otp = inputs.join("");
        const obj = {
            otp:Number(otp),
            user:{
                ...data
            }
        }

        const loadingToastId = toast.loading("Loading...", { containerId: "app-toast-container" });
        const response = await fetchData("users/verifyOtp", {
            method: "POST",
            data: obj
        })

        if (response.isResponseOk) {
            toast.update(loadingToastId, {
                render: "Account Created Successfully",
                type: 'success',
                isLoading: false,
                autoClose: 1900,
                containerId: "app-toast-container",
                style: { backgroundColor: "lightgreen" }
            });

            setIsCorrect(true)
        }
        else {
            toast.update(loadingToastId, {
                render: response.message || "Something went wrong",
                type: 'error',
                isLoading: false,
                autoClose: 1900,
                containerId: "app-toast-container",
                style: { backgroundColor: "lightpink" }
            });
            navigate("/add-info/user")
            setIsCorrect(false)
        }

        setVerification(true)
        setDisabled(false)

    };

    return (
        <div className='flex items-center justify-center flex-col'>

            <SmilyFace currentInput={currentInput} isCorrect={isCorrect} verification={verification} />

            <div className="grid grid-cols-5 gap-3">
                {inputs.map((input, idx) => (
                    <input
                        key={idx}
                        id={`otp-input-${idx}`}
                        type="text"
                        value={input}
                        onChange={(e) => handleChange(e, idx)}
                        onKeyDown={(e) => handleKeyDown(e, idx)}
                        maxLength={1}
                        className={`custom-shadow-2 rounded-[22px] shadow-md transition-all duration-500 h-[60px] text-center text-xl font-bold border-[2px] outline-none 
                        ${currentInput === idx ? "border-[#1fbad6] pointer-events-auto" : "pointer-events-none"}`}
                    />
                ))}
            </div>


            <button disabled={disabled} onClick={handleVerify} className="custom-shadow-2 bg-[#1fbad6] text-white px-5 py-2 rounded-[22px] mt-5">
                Verify
            </button>

        </div>
    );
};

export default OtpForm;
