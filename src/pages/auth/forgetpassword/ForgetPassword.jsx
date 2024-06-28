import { useState } from "react";
import { Link } from "react-router-dom";
import LeftSide from "../../../components/LeftSide";
import { DotGroup } from "../../../components/Dot";
import { resetPasswordLinkSend } from "../../../services/api.service";
import EmailSent from "./EmailSent";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [showSentMail, setShowSentMail] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await resetPasswordLinkSend({ workEmail: email }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
        setShowSentMail(true)
    }

    return (
        <>
            <section className="bg-secondaryBlack relative flex flex-col mmd:flex-row">
                <LeftSide />
                <div className="mmd:left-[38%] bg-secondaryBlack absolute flex-grow w-full p-10 mmd:w-[62%] overflow-x-hidden overflow-hidden min-h-screen">
                    <div className="">
                        <div className="hidden fixed top-1 left-[38%] ml-5 mmd:flex flex-col space-y-2">
                            <DotGroup />
                        </div>
                        <div className="hidden fixed top-1 left-[38%] ml-1.5 mmd:flex flex-col space-y-2">
                            <DotGroup />
                        </div>
                        <div className="flex flex-col items-center justify-center mt-40 ">
                            {showSentMail ? (
                                <EmailSent />
                            ) : (
                                <div className="w-full flex flex-col items-center justify-start">
                                    <div className="text-center">
                                        <h3 className="text-white text-2xl font-bold mb-4">Forgot Password</h3>
                                        <p className="text-sm font-normal text-gray-400">
                                            Enter your email address and we'll send you a link to reset your password.
                                        </p>
                                    </div>
                                    <form className="mb-2 mt-8 w-auto md:w-[60%]" onSubmit={handleSubmit}>
                                        <div className="mb-6">
                                            <label className="text-white text-base font-medium">Email*</label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={handleEmailChange}
                                                    placeholder="name@mail.com"
                                                    className="w-full p-3 bg-primaryBlack border-none text-white rounded-lg mt-1"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className="mt-6 w-full p-3 bg-primaryGreen text-primaryBlack font-bold rounded-lg">
                                            Send Reset Link
                                        </button>
                                        <p className="text-center text-white font-medium mt-4">
                                            Remember your password?
                                            <Link to="/auth/sign-in" className="text-primaryGreen ml-1">Sign in</Link>
                                        </p>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ForgotPassword
