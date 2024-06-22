import React, { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import LeftSide from "../../components/LeftSide";
import { DotGroup } from "../../components/Dot";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { token } = useParams();
  const navigate= useNavigate();

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    setPasswordsMatch(newPassword === confirmPassword && newPassword !== "");
  }, [newPassword, confirmPassword]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordsMatch) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
    navigate('/auth/sign-in')
  };

  return (
    <section className="bg-secondaryBlack relative flex flex-col mmd:flex-row">
      <LeftSide />
      <div className="mmd:left-[38%] bg-secondaryBlack absolute flex-grow w-full p-10 mmd:w-[62%] overflow-x-hidden min-h-screen overflow-hidden">
        <div>
          <div className="hidden fixed top-1 left-[38%] ml-5 mmd:flex flex-col space-y-2">
            <DotGroup />
          </div>
          <div className="hidden fixed top-1 left-[38%] ml-1.5 mmd:flex flex-col space-y-2">
            <DotGroup />
          </div>
          <div className="flex flex-col items-center justify-center bg-secondaryBlack mt-8">
            <div className="text-center">
              <h3 className="text-white text-2xl font-bold mb-4">Reset Password To Your Account</h3>
              <p className="text-sm font-normal text-gray-400">Fill New Password Below</p>
            </div>

            <form className="mb-2 w-auto md:w-[60%] mt-8" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="text-white text-base font-medium">New Password*</label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    placeholder="Enter New Password"
                    className={`w-full p-3 ${passwordsMatch ? 'border-green-500 border' : 'border-none'} bg-primaryBlack text-white rounded-lg mt-1`}
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
              <div className="mb-6">
                <label className="text-white text-base font-medium">Confirm Password*</label>
                <div className="relative">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder="Enter Confirm Password"
                    className={`w-full p-3 ${passwordsMatch ? 'border-green-500 border' : 'border-none'} bg-primaryBlack text-white rounded-lg mt-1`}
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {confirmPasswordVisible ? (
                      <EyeSlashIcon className="h-5 w-5 text-primaryGreen" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                </div>
              </div>
              {errorMessage && (
                <div className="mb-6 text-red-500 text-sm">
                  {errorMessage}
                </div>
              )}
              <button type="submit" className="mt-6 w-full p-3 bg-primaryGreen text-primaryBlack font-bold rounded-lg">
                Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
