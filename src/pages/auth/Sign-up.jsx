import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckEmail } from './CheckEmail.jsx';
import { CheckCircleIcon, ChevronDownIcon, QuestionMarkCircleIcon, EyeIcon, EyeSlashIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import LeftSide from "../../components/LeftSide.jsx";
import { DotGroup } from "../../components/Dot.jsx";

export function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [validity, setValidity] = useState({
    lowercase: false,
    number: false,
    uppercase: false,
    specialChar: false,
    minLength: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setValidity({
      lowercase: /[a-z]/.test(value),
      number: /\d/.test(value),
      uppercase: /[A-Z]/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      minLength: value.length >= 8,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidPassword = Object.values(validity).every(Boolean);

    if (isValidPassword) {
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);
    }
  };

  const handlePhoneNumberKeyDown = (e) => {
    const allowedKeys = [
      'Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'
    ];
    const isNumberKey = /^[0-9]+$/.test(e.key);

    if (!isNumberKey && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <section className=" bg-secondaryBlack mmd:flex-1 no-scrollbar relative">
      <LeftSide />
      <div className="bg-secondaryBlack relative ">
      <div className="mmd:left-1/3 w-full bg-secondaryBlack mmd:w-2/3 p-10 absolute overflow-x-hidden ">
        <div className=" hidden fixed top-1 left-1/3 ml-5 mmd:flex flex-col  space-y-2">
          <DotGroup />
        </div>
        <div className="hidden fixed top-1 left-1/3 ml-1.5 mmd:flex flex-col space-y-2">
          <DotGroup />
        </div>
        {isSubmitted ? (
          <CheckEmail email={email} />
        ) : (
          <div className="flex flex-col items-center justify-center bg-secondaryBlack h-screen overscroll-contain">
            <div className="text-center">
              <h3 className="text-white text-2xl font-bold mb-4">Sign up with free trial</h3>
              <p className="text-sm font-normal text-gray-400">Empower your experience, sign up for a free account today</p>
            </div>
            <form className="mmd:mt-8 mb-2 sm:w-3/4    max-w-screen-lg lgg:w-1/2" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="text-white text-base font-medium mb-1">Work email*</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="name@mail.com"
                  className="w-full p-3 bg-primaryBlack border-none text-gray-600 rounded-lg"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="text-white font-medium mb-1 flex items-center ">
                  Phone number*
                  <span className="text-primaryGreen text-xs ml-1 flex items-center">
                    Why
                    <QuestionMarkCircleIcon className="w-4 h-4 ml-0.5" />
                  </span>
                </label>
                <div className="relative flex bg-primaryBlack rounded-lg overflow-hidden">
                  <div className="flex items-center bg-primaryBlack text-gray-300 px-3 border-r border-gray-700">
                    <span>+91</span>
                    <ChevronDownIcon className="text-gray-300 h-4 w-6 ml-2 cursor-pointer hover:bg-slate-400 rounded-full hover:bg-opacity-20" />
                  </div>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    className="w-full p-3 bg-primaryBlack border-none text-gray-600"
                    required
                    pattern="\d*"
                    onKeyDown={handlePhoneNumberKeyDown}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <ShieldCheckIcon className="text-primaryGreen h-5 w-5" />
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <label className="text-white font-medium mb-1">Password*</label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter password"
                    className="w-full p-3 bg-primaryBlack border-none text-gray-600 rounded-lg"
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
              <div>
                <div className="flex items-center mt-4">
                  <div className='flex items-center mr-9'>
                    <CheckCircleIcon className={`h-5 w-5 ${validity.lowercase ? "text-primaryGreen" : "text-gray-600"}`} />
                    <span className={`text-[13px] ml-2 ${validity.lowercase ? "text-primaryGreen" : "text-gray-600"}`}>One lowercase character</span>
                  </div>
                  <div className='flex items-center'>
                    <CheckCircleIcon className={`h-5 w-5 ${validity.number ? "text-primaryGreen" : "text-gray-600"}`} />
                    <span className={`text-[13px] ml-2 ${validity.number ? "text-primaryGreen" : "text-gray-600"}`}>One number</span>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <div className='flex items-center mr-9'>
                    <CheckCircleIcon className={`h-5 w-5 ${validity.uppercase ? "text-primaryGreen" : "text-gray-600"}`} />
                    <span className={`text-[13px] ml-2 ${validity.uppercase ? "text-primaryGreen" : "text-gray-600"}`}>One uppercase character</span>
                  </div>
                  <div className='flex items-center'>
                    <CheckCircleIcon className={`h-5 w-5 ${validity.specialChar ? "text-primaryGreen" : "text-gray-600"}`} />
                    <span className={`text-[13px] ml-2 ${validity.specialChar ? "text-primaryGreen" : "text-gray-600"}`}>One special character</span>
                  </div>
                </div>
                <div className='flex items-center mt-2'>
                  <CheckCircleIcon className={`h-5 w-5 ${validity.minLength ? "text-primaryGreen" : "text-gray-600"}`} />
                  <span className={`text-[13px] ml-2 ${validity.minLength ? "text-primaryGreen" : "text-gray-600"}`}>8 character minimum</span>
                </div>
              </div>
              <div className="flex items-center justify-center  mt-6">
                <div className="flex items-center justify-center">
                  <div className="w-8 mt-[-25px]">
                    <input type="checkbox" id="exclude-emails" className="mr-2" />
                  </div>
                  <label htmlFor="exclude-emails" className="text-gray-600 text-sm">
                    Please exclude me from any future emails regarding triosale and related Intuit product and feature updates,marketing best practices, and promotions.
                  </label>
                </div>
              </div>
              <p className="text-gray-500 mt-4 text-[13px]">
                By registering for an account, you are consenting to our <Link to="#" className="text-primaryGreen underline">Terms of Service</Link> and confirming that you have reviewed and accepted the <Link to="#" className="text-primaryGreen">Global Privacy Statement.</Link>
              </p>
              <button type="submit" className="mt-6 w-full p-3 bg-primaryGreen text-primaryBlack font-bold rounded-lg">Get started free</button>
              <p className="text-center text-white font-medium mt-4">
                Already have an account?
                <Link to="/auth/sign-in" className="text-primaryGreen ml-1">Login</Link>
              </p>
            </form>
          </div >
        )
        }
      </div >
      </div>
    </section>
  );
}

export default SignUp;


