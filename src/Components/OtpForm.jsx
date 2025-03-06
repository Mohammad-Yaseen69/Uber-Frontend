import React, { useEffect, useState } from 'react';
import SmilyFace from "./SmilyFace"
import { fetchData } from "../apis/api"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { errorToastOpt, successToastOpt } from "../constant"

const OtpForm = ({ data, type = "users" }) => {
    const [inputs, setInputs] = useState(["", "", "", "", ""]);
    const [currentInput, setCurrentInput] = useState(0);
    const [verification, setVerification] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [timer, setTimer] = useState(60)
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
            otp: Number(otp),
            user: {
                ...data
            }
        }
        
        const response = await fetchData(`${type}/verifyOtp`, {
            method: "POST",
            data: obj
        })
        setVerification(true)
        if (response.isResponseOk) {
            toast.success(response.data?.message, successToastOpt);
            
            setIsCorrect(true)
            setTimeout(() => {
                setVerification(false)
                if(data.fullName && data.phoneNumber){
                    localStorage.setItem("type", type)
                    localStorage.setItem("loggedIn", true)
                    navigate(`/set-info/${type}`)
                }else{
                    localStorage.setItem("type", type)
                    localStorage.setItem("loggedIn", true)
                    navigate("/")
                }
            }, 2000)
        }
        else {
            toast.error(response.message, errorToastOpt);
            setIsCorrect(false)
            setTimeout(() => {
                setVerification(false)
                setCurrentInput(0)
                setInputs(["", "", "", "", ""])
            }, 2000)
        }


        setDisabled(false)
    };

    useEffect(() => {
        let timeout;
        timeout = setTimeout(() => {
            setTimer(timer - 1)
        }, 1000)

        if (timer === 0) {
            clearTimeout(timeout)
        }

    }, [timer])


    const handleResend = async () => {
        const response = await fetchData(`${type}/resendOtp`, {
            method: "POST",
            data: { email: data.email }
        })

        if (response.isResponseOk) {
            toast.success(response.data?.message, { containerId: "app-toast-container" });
            setTimer(60)
            setCurrentInput(0)
        } else {
            toast.error(response.message, { containerId: "app-toast-container" });

        }
    }
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


            {timer !== 0 ? <p className='mt-4'>Resent code in <span>{timer}</span> seconds</p> : <button onClick={handleResend} className='mt-4 font-bold'>Resend the code</button>}
            <button disabled={disabled} onClick={handleVerify} className="custom-shadow-2 bg-[#1fbad6] text-white w-20 h-10 rounded-[22px] mt-5 flex justify-center items-center">
                {!disabled ? "Verify" : <span className='loader'></span>}
            </button>

        </div>
    );
};

export default OtpForm;