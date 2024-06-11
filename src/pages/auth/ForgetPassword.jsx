import { useState } from "react";
import { Link } from "react-router-dom";
import LeftSide from "../../components/LeftSide";
import { DotGroup } from "../../components/Dot";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
  };

  return (
    <section className="relative bg-secondaryBlack min-h-screen flex">
      <LeftSide />
      <div className="mmd:left-1/3 w-full mmd:w-2/3 p-10 relative overflow-hidden">
        <div className="hidden fixed top-1 left-1/3 ml-5 mmd:flex flex-col space-y-2">
          <DotGroup />
        </div>
        <div className="hidden fixed top-1 left-1/3 ml-1.5 mmd:flex flex-col space-y-2">
          <DotGroup />
        </div>
        <div className="flex flex-col items-center justify-center mt-20 max-h-screen">
          <div className="text-center">
            <h3 className="text-white text-2xl font-bold mb-4">Forgot Password</h3>
            <p className="text-sm font-normal text-gray-400">Enter your email address and we'll send you a link to reset your password.</p>
          </div>
          <form className="mt-8 mb-2 w-auto max-w-screen-lg md:w-1/2" onSubmit={handleSubmit}>
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
            <button type="submit" className="mt-6 w-full p-3 bg-primaryGreen text-primaryBlack font-bold rounded-lg">Send Reset Link</button>
            <p className="text-center text-white font-medium mt-4">
              Remember your password?
              <Link to="/auth/sign-in" className="text-primaryGreen ml-1">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
