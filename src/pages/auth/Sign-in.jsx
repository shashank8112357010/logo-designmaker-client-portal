import { useState } from "react";
import { Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import LeftSide from "../../components/LeftSide";
import { DotGroup } from "../../components/Dot";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     navigate('/accountsetup');
  };

  return (
    <section className=" bg-secondaryBlack relative h-screen mmd:flex-1">
      <LeftSide />
      <div className="mmd:left-1/3 bg-secondaryBlack w-full mmd:w-2/3 fixed h-screen overflow-hidden ">
        <div className="hidden fixed top-1 left-1/3 ml-5 mmd:flex flex-col space-y-2">
          <DotGroup />
        </div>
        <div className="hidden fixed top-1 left-1/3 ml-1.5 mmd:flex flex-col space-y-2">
          <DotGroup />
        </div>
        <div className="flex flex-col items-center justify-center mt-2 h-screen overscroll-contain ">
          <div className="text-center">
            <h3 className="text-white text-2xl font-bold mb-4">Login to your account</h3>
            <p className="text-sm font-normal text-gray-400">Welcome back! Please enter your credentials to log in.</p>
          </div>
          <form className=" mb-2 w-auto md:w-1/2" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="text-white text-base font-medium mb-1">Email*</label>
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
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center justify-center">
                <input type="checkbox" id="keep-me" className="mr-2" />
                <label htmlFor="keep-me" className="text-customGray text-sm">Keep me Logged in</label>
              </div>
              <Link to="/auth/forget-password" className="text-primaryGreen text-sm">Forgot Password?</Link>
            </div>
            <button type="submit" className="mt-6 w-full p-3 bg-primaryGreen text-primaryBlack font-bold rounded-lg">Login</button>
            <div className="flex justify-center items-center my-6">
              <div className="text-customGray ml-2 mr-2">______________________________</div>
              <p className="text-white mt-3">Or</p>
              <div className="text-customGray mr-2 ml-2">______________________________</div>
            </div>
            <button
              className="mt-4 flex items-center justify-center w-full p-3 bg-white text-black font-bold rounded-lg gap-2"
            >
              Sign in with Google <img src="/img/Google.png" alt="" />
            </button>
            <p className="text-center text-white font-medium mt-4">
              Don't have an account?
              <Link to="/auth/sign-up" className="text-primaryGreen ml-1">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
      <footer className="bg-secondaryBlack">
        h
      </footer>
    </section>

  );
}

export default SignIn;
