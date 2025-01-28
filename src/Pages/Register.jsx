import React, { useState } from 'react'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { Inputsfield, OtpForm } from '../Components'
import { fetchData } from '../apis/api'
import { toast } from 'react-toastify'

const Register = () => {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [correctOtp, setCorrectOtp] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    fullName: ""
  })

  const handleRegister = async (e) => {
    e.preventDefault()
    if (step < 3) {
      setStep(prev => prev += 1)
      return
    } else {
      toast.dismiss()
      const loadingToastId = toast.loading("Loading...", { containerId: "app-toast-container" });
      const response = await fetchData("users/register", {
        method: "POST",
        data: data
      })

      console.log(response)

      if (response.isResponseOk) {
        toast.update(loadingToastId, {
          render: "Success! Please check you email for otp",
          type: 'success',
          isLoading: false,
          autoClose: 1900,
          containerId: "app-toast-container",
          style: { backgroundColor: "lightgreen" }
        });
        setTimeout(() => {
          setOtpSent(true)
        }, 2000)
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
      }

      setLoading(false)
      // response.isResponseOk
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="bg-white w-full h-full px-5 py-7">

      {!otpSent &&
        <>
          <h1 className="text-3xl mb-10 text-black font-bold ">Start Your Journey!</h1>

          <form action="" onSubmit={handleRegister}>

            {
              step === 1 ?
                (
                  <>
                    <h1 className="text-black font-bold text-lg">What's Your Name</h1>
                    <Inputsfield
                      type="text"
                      value={data?.fullName}
                      onChange={handleInputChange}
                      name={"fullName"}
                      placeholder="Enter Your Full Name"
                    />
                  </>
                )
                :
                step == 2 ?
                  (
                    <>
                      <h1 className="text-black font-bold text-lg">Enter Your Email</h1>
                      <Inputsfield
                        type="email"
                        value={data?.email}
                        onChange={handleInputChange}
                        name={"email"}
                        placeholder="example@gmail.com"
                      />

                      <h1 className="text-black font-bold text-lg mt-4">Enter Your Phone Number</h1>
                      <Inputsfield
                        type="numbe"
                        value={data?.phoneNumber}
                        onChange={handleInputChange}
                        name={"phoneNumber"}
                        placeholder="eg: 03232...."
                      />


                    </>
                  )
                  :
                  step == 3 ?
                    (
                      <>
                        <h1 className="text-black font-bold text-lg">Create an Password</h1>
                        <div className="relative">
                          <Inputsfield
                            type={showPassword ? "text" : "password"}
                            value={data?.password}
                            name="password"
                            onChange={handleInputChange}
                            placeholder=""
                          />

                          <span className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ?
                              <IoMdEyeOff className="absolute right-3  top-1/2 text-gray-800" /> :
                              <IoMdEye className="absolute right-3 top-1/2 text-gray-800" />
                            }

                          </span>
                        </div>

                        <h1 className="text-black font-bold text-lg mt-4">Confirm Password</h1>
                        <div className="relative">
                          <Inputsfield
                            type={showConfirmPass ? "text" : "password"}
                            value={data?.confirmPassword}
                            name="confirmPassword"
                            onChange={handleInputChange}
                            placeholder=""
                          />

                          <span className="cursor-pointer" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                            {showConfirmPass ?
                              <IoMdEyeOff className="absolute right-3  top-1/2 text-gray-800" /> :
                              <IoMdEye className="absolute right-3 top-1/2 text-gray-800" />
                            }

                          </span>
                        </div>
                      </>
                    ) : null
            }



            {step === 1 ?
              (<p className="text-[14px] pt-6">
                Already have an Account? <Link to={'/login'} className="text-[#1fbad6]">Login</Link>
              </p>) :
              (<p className="text-[14px] pt-6">
                <span className="text-[#1fbad6] cursor-pointer" onClick={() => setStep(prev => prev -= 1)}>Back</span>
              </p>)
            }

            <input
              disabled={loading}
              className="inline-block cursor-pointer w-full bg-black text-white mt-3 rounded-lg text-center p-2 py-3"
              type="submit"
              value={step < 3 ? "Next" : "Register"}
            />

            <Link className="inline-block w-full bg-[#1fbad6] text-white mt-2 rounded-lg text-center p-2 py-3" >
              Sign-in as Driver
            </Link>
          </form>
        </>
      }
      {otpSent && <OtpForm data={data} />}
    </div>
  )
}

export default Register