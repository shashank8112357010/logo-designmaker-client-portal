import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import LeftSide from "../../../components/LeftSide";
import { DotGroup } from "../../../components/Dot";

import Otp from "./Otp";
import { signIn } from "../../../services/api.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { setUser, setupFields } from "../../../store/accountSlice";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import { setToken } from "../../../helpers/token.helper";

export const useSignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: (res) => {
      const { message, isUserReq, user, token, userReq } = res.data;

      if (message !== "OTP sent successfully") {
        dispatch(setUser({ user, ...res.data }));
        if (isUserReq) {
          const { firstName, lastName, businessName, brandName, slogan, designRequirements, niche, other, fontOptions, colorOptions } = userReq;
          dispatch(setupFields({
            firstName,
            lastName,
            businessName,
            brandName,
            slogan,
            designRequirements,
            niche,
            other,
            fontOptions,
            colorOptions
          }));
          navigate('/dashboard/overview');
        } else {
          navigate('/accountsetup');
        }
        toast.success(message);
        dispatch(setToken(token));
      } else {
        toast.success(message);
        dispatch(setUser({ userId: res.data.userId }));

      }

      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  });

  const handleSubmitLoginAPIService = (workEmail, password) => {
    setLoading(true);
    mutation.mutate({ workEmail, password });
  };

  return { handleSubmitLoginAPIService, loading };
}

function SignIn() {
  const [workEmail, setWorkEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: (res) => {
      const { message, isUserReq, user, token, userReq } = res.data;

      if (message !== "OTP sent successfully") {
        dispatch(setUser({ user, ...res.data }));
        if (isUserReq) {
          const { firstName, lastName, businessName, brandName, slogan, designRequirements, niche, other, fontOptions, colorOptions } = userReq;
          dispatch(setupFields({
            firstName,
            lastName,
            businessName,
            brandName,
            slogan,
            designRequirements,
            niche,
            other,
            fontOptions,
            colorOptions
          }));
          navigate('/dashboard/overview');
        } else {
          navigate('/accountsetup');
        }
        toast.success(message);
        dispatch(setToken(token));
      } else {
        toast.success(message);
        dispatch(setUser({ userId: res.data.userId }));
        setShowOTP(true)
      }

      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  });

  const handleSubmitLoginAPIService = (workEmail, password) => {
    setLoading(true);
    mutation.mutate({ workEmail, password });
  };

  const handleUsernameChange = (e) => {
    setWorkEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const isFormValid = () => {
    return workEmail && password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (isFormValid()) {
      handleSubmitLoginAPIService(workEmail, password);
    }
  };

  return (
    <section className="bg-secondaryBlack flex flex-col mmd:flex-row">
      <LeftSide />
      <div className="mmd:left-[38%] bg-secondaryBlack absolute flex-grow w-full p-10 mmd:w-[62%] overflow-x-hidden overflow-hidden min-h-screen">
        <div>
          <div className="hidden fixed top-1 left-[38%] ml-5 mmd:flex flex-col space-y-2">
            <DotGroup />
          </div>
          <div className="hidden fixed top-1 left-[38%] ml-1.5 mmd:flex flex-col space-y-2">
            <DotGroup />
          </div>
          <div>
            {!showOTP ? (
              <div className="flex flex-col items-center justify-center bg-secondaryBlack">
                <div className="text-center mt-10">
                  <h3 className="text-white text-2xl font-bold mb-4">Sign In to your Account</h3>
                  <p className="text-sm font-normal text-gray-400">Welcome back! Please enter your credentials to log in.</p>
                </div>

                <form className="mb-2 w-auto md:w-[60%] mt-4" onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="text-white text-base font-medium ">Work Email*</label>
                    <input
                      type="email"
                      value={workEmail}
                      onChange={handleUsernameChange}
                      placeholder="Enter Work Email"
                      className="w-full p-3 bg-primaryBlack border-none text-white rounded-lg mt-1"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="text-white font-medium ">Password*</label>
                    <div className="relative">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Enter password"
                        className="w-full p-3 bg-primaryBlack border-none text-white rounded-lg mt-1"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                      />
                      <div
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? (
                          <EyeSlashIcon className="h-5 w-5 text-primaryGreen" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-600" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center justify-center">
                      <input type="checkbox" id="keep-me" className="mr-2" />
                      <label htmlFor="keep-me" className="text-customGray text-sm">Keep me Logged in</label>
                    </div>
                    <Link to="/auth/forget-password" className="text-primaryGreen text-sm">Forgot Password?</Link>
                  </div>
                  <button type="submit" className="mt-6 w-full p-3 bg-primaryGreen text-primaryBlack font-bold rounded-lg">
                    {loading ? <BeatLoader size={12} /> : "Login"}
                  </button>
                  <div className="flex justify-center items-center my-6">
                    <div className="bg-customGray ml-2 mr-2 w-[40%] h-0.5"></div>
                    <p className="text-white">Or</p>
                    <div className="bg-customGray mr-2 ml-2 w-[40%] h-0.5"></div>
                  </div>
                  <button
                    className="mt-4 flex items-center justify-center w-full p-3 bg-white text-primaryBlack font-bold rounded-lg gap-2"
                  >
                    Sign in with Google <img src="/img/Google.png" alt="" />
                  </button>
                  <p className="text-center text-white font-medium mt-4">
                    Don't have an account?
                    <Link to="/auth/sign-up" className="text-primaryGreen ml-1">Sign up</Link>
                  </p>
                </form>
              </div>
            ) : (
              <Otp workEmail={workEmail} password={password} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
