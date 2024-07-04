import React from "react";
import { Link } from "react-router-dom";

function EmailSent() {
    return (
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <div className="h-32 w-32 bg-primaryGreen rounded-full flex items-center justify-center">
                            <img src="/img/sentmail.png" alt="Email Sent" />
                        </div>
                    </div>
                    <h3 className="text-white text-3xl font-bold mb-2">Check Your Mail</h3>
                    <p className="text-sm font-normal text-gray-400 mb-4">
                        We just sent a link to your registered email address
                    </p>
                    <p className="text-sm font-normal text-gray-400 mt-40">
                        Didn’t receive a Mail? <Link to="/auth/sign-in" ><span className="text-primaryGreen cursor-pointer">Resend</span></Link>
                    </p>
                </div>
    );
}

export default EmailSent;
