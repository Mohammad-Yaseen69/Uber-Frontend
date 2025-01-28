import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom"
import { Inputsfield } from "../Components"
import { toast } from "react-toastify"
import { fetchData } from "../apis/api";
import { OtpForm } from "../Components";

const Login = () => {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showOtpSent, setShowOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    if (step < 2) {
      setStep(prev => prev += 1)
      return
    } else {
      toast.dismiss()
      setLoading(true)
      const loadingToastId = toast.loading("loading", { containerId: "app-toast-container" })
      const response = await fetchData("users/login", {
        method: "POST",
        data: data
      })

      console.log(response)

      if (response.isResponseOk) {
        toast.update(loadingToastId, {
          render: response.data?.message,
          type: 'success',
          isLoading: false,
          autoClose: 1900,
          containerId: "app-toast-container",
          style: { backgroundColor: "lightgreen" }
        });
        setTimeout(() => {
          setShowOtpSent(true)
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

      {!showOtpSent &&
        (
          <>
            <h1 className="text-4xl mb-10 text-black font-bold ">Welcome Back!</h1>

            <form action="" onSubmit={handleLogin}>
              <h1 className="text-black font-bold text-lg">{step == 1 ? "What's Your Email?" : "What's Your Password?"}</h1>

              {step == 1 ?
                (
                  <Inputsfield
                    type="email"
                    value={data?.email}
                    onChange={handleInputChange}
                    name={"email"}
                    placeholder="Enter your Email here.."
                  />
                )
                :
                step == 2 ?
                  (
                    <div className="relative">
                      <Inputsfield
                        type={showPassword ? "text" : "password"}
                        value={data?.password}
                        name="password"
                        onChange={handleInputChange}
                        placeholder="Enter Your Password"
                      />

                      <span className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ?
                          <IoMdEyeOff className="absolute right-3  top-1/2 text-gray-800" /> :
                          <IoMdEye className="absolute right-3 top-1/2 text-gray-800" />
                        }

                      </span>
                    </div>
                  ) : null
              }


              {step === 1 ?
                (<p className="text-[14px] pt-6">
                  New here? <Link to={'/register'} className="text-[#1fbad6]">Create An Account</Link>
                </p>) :
                (<p className="text-[14px] pt-6">
                  Wrong Email? <span className="text-[#1fbad6] cursor-pointer" onClick={() => setStep(prev => prev -= 1)}>Back</span>
                </p>)
              }

              <input
                className="inline-block cursor-pointer w-full bg-black text-white mt-3 rounded-lg text-center p-2 py-3"
                type="submit"
                value={step == 1 ? "Continue" : "Login"}
              />

              <Link to={'/driver/login'} className="inline-block w-full bg-[#1fbad6] text-white mt-2 rounded-lg text-center p-2 py-3" >
                Sign-in as Driver
              </Link>

            </form>
          </>
        )
      }
      {showOtpSent && <OtpForm data={data} />}
    </div>
  );
};

export default Login;