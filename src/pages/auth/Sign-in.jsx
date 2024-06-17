import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import LeftSide from "../../components/LeftSide";
import { DotGroup } from "../../components/Dot";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showOTP, setShowOTP] = useState(false); 
  const [otpDigits, setOTPDigits] = useState(["", "", "", ""]); 
  const navigate = useNavigate();
  const otpRefs = useRef([]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowOTP(true);
  };

  const handleOTPDigitChange = (index, value) => {
    if (/^\d*$/.test(value)) { 
      const newOTP = [...otpDigits];
      newOTP[index] = value;
      setOTPDigits(newOTP);
      if (value && index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    navigate('/accountsetup');
  };

  return (
    <section className="bg-secondaryBlack relative flex flex-col mmd:flex-row ">
      <LeftSide />
      <div className="mmd:left-[38%] bg-secondaryBlack absolute  flex-grow w-full p-10 mmd:w-[62%] overflow-x-hidden min-h-screen overflow-hidden">
        <div>
          <div className="hidden fixed top-1 left-[38%] ml-5 mmd:flex flex-col space-y-2">
            <DotGroup />
          </div>
          <div className="hidden fixed top-1 left-[38%] ml-1.5 mmd:flex flex-col space-y-2">
            <DotGroup />
          </div>
          <div >
            {!showOTP ? (
              <div className="flex flex-col items-center justify-center bg-secondaryBlack min-h-screen">
                <div className="text-center">
                  <h3 className="text-white text-2xl font-bold mb-4">Sign In to your Account</h3>
                  <p className="text-sm font-normal text-gray-400">Welcome back! Please enter your credentials to log in.</p>
                </div>

                <form className="mb-2 w-auto md:w-[60%] mt-4" onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="text-white text-base font-medium ">Username*</label>
                    <input
                      type="text"
                      value={username}
                      onChange={handleUsernameChange}
                      placeholder="Enter username"
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
                  <button type="submit" className="mt-6 w-full p-3 bg-primaryGreen text-primaryBlack font-bold rounded-lg">Login</button>
                  <div className="flex justify-center items-center my-6">
                    <div className="bg-customGray ml-2 mr-2 w-[40%] h-0.5"></div>
                    <p className="text-white ">Or</p>
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
              <div className="flex flex-col items-center justify-center bg-secondaryBlack min-h-screen">
                <div className="text-center -mt-40">
                  <h3 className="text-white text-2xl font-bold mb-4">Sign In to your Account</h3>
                  <p className="text-sm font-normal text-gray-400">Enter OTP to Sign In to your Account</p>
                </div>
                <form className="mt-16 w-auto md:w-[60%]" onSubmit={handleOTPSubmit}>
                  <div className="flex justify-center items-center mb-12">
                    {otpDigits.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        value={digit}
                        maxLength={1}
                        onChange={(e) => handleOTPDigitChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-12 text-center bg-primaryBlack border-none text-white rounded-lg mx-2"
                        style={{ fontSize: "1.5rem" }}
                        required
                        ref={(el) => otpRefs.current[index] = el}
                      />
                    ))}
                  </div>
                  <div className="text-center"><span className="text-white mr-1">Didn't receive OTP?</span><span className="text-primaryGreen cursor-pointer">Resend</span></div>
                  <button type="submit" className="mt-4 w-full p-3 bg-primaryGreen text-primaryBlack font-bold rounded-lg">Proceed</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
