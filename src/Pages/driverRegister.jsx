import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import { Inputsfield, OtpForm } from "../Components";
import { fetchData } from "../apis/api";
import { toast } from "react-toastify";

const DriverRegister = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    fullName: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => (prev += 1));
      return;
    } else {
      if (data.password !== data.confirmPassword) {
        toast.error("Confirm Password not matching", {
          containerId: "app-toast-container",
          type: "error",
          isLoading: false,
          autoClose: 1900,
          style: { backgroundColor: "lightpink" },
        });
      } else {
        toast.dismiss();
        setLoading(true);
        const loadingToastId = toast.loading("Loading...", {
          containerId: "app-toast-container",
        });
        const response = await fetchData("driver/register", {
          method: "POST",
          data: data,
        });

        if (response.isResponseOk) {
          toast.update(loadingToastId, {
            render: response.data?.message,
            type: "success",
            isLoading: false,
            autoClose: 1900,
            containerId: "app-toast-container",
            style: { backgroundColor: "lightgreen" },
          });
          setTimeout(() => {
            setOtpSent(true);
          }, 2000);
        } else {
          toast.update(loadingToastId, {
            render: response.message || "Something went wrong",
            type: "error",
            isLoading: false,
            autoClose: 1900,
            containerId: "app-toast-container",
            style: { backgroundColor: "lightpink" },
          });
        }

        setLoading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white w-full h-full px-5 py-7">
      {!otpSent && (
        <>
          <h1 className="text-3xl mb-10 text-black font-bold">
            Start Your Journey as a Driver!
          </h1>

          <form onSubmit={handleRegister}>
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

            {step === 1 ? (
              <p className="text-[14px] pt-6">
                Already have an Account?{" "}
                <Link to={"/driver/login"} className="text-[#1fbad6]">
                  Login
                </Link>
              </p>
            ) : (
              <p className="text-[14px] pt-6">
                <span
                  className="text-[#1fbad6] cursor-pointer"
                  onClick={() => setStep((prev) => (prev -= 1))}
                >
                  Back
                </span>
              </p>
            )}

            <input
              disabled={loading}
              className="inline-block cursor-pointer w-full bg-black text-white mt-3 rounded-lg text-center p-2 py-3"
              type="submit"
              value={step < 3 ? "Next" : "Register"}
            />

            <Link
              to="/register"
              className="inline-block w-full bg-[#1fbad6] text-white mt-2 rounded-lg text-center p-2 py-3"
            >
              Sign-in as User
            </Link>
          </form>
        </>
      )}
      {otpSent && <OtpForm data={data} type="driver" />}
    </div>
  );
};

export default DriverRegister;
