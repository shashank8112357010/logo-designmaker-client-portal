import { useMutation } from '@tanstack/react-query';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { signInOTPVerification } from '../../../services/api.service';
import { setUser } from '../../../store/accountSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';

const Otp = () => {
    const [otpDigits, setOTPDigits] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(60);
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const navigate = useNavigate();
    const otpRefs = useRef([]);
    const dispatch = useDispatch();
    const {userId} = useSelector((state)=>state.account)
    const [lodaing, setLoading] = useState(false)

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        } else {
            setIsResendEnabled(true);
        }
        return () => clearInterval(interval);
    }, [timer]);


    const mutation = useMutation({
        mutationFn: signInOTPVerification,
        onSuccess: (res) => {
            console.log(res);
            dispatch(setUser({ user: res.data.user, ...res.data }))
            toast.success(res.data.message);
            setLoading(false)
            navigate('/dashboard/overview')
        },
        onError: (error) => {
            setLoading(false)
            console.error('Error', error.response.data.message);
            toast.error(error.response.data.message)
        }
    });


    const isFormValid = () => {
        return otpDigits;
    };


    const handleOTPSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        if (isFormValid()) {
            mutation.mutate({ otp: otpDigits[0]+otpDigits[1]+otpDigits[2]+otpDigits[3] , userId });
        }
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

    const handleResendClick = () => {
        if (isResendEnabled) {
            setTimer(60);
            setIsResendEnabled(false);
        }
    };

    const formatTimer = () => {
        const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
        const seconds = (timer % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
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
                <div className="text-center">
                    <span className="text-white mr-2">{`${formatTimer()}`}</span>
                    <span className={` mr-1 ${isResendEnabled ? 'text-white' : 'text-gray-400'}`}>Didn't receive OTP?</span>
                    <span
                        className={`cursor-pointer ${isResendEnabled ? 'text-primaryGreen' : 'text-gray-400'}`}
                        onClick={handleResendClick}
                        style={{ pointerEvents: isResendEnabled ? 'auto' : 'none' }}
                    >
                        Resend
                    </span>
                </div>
                <button type="submit" className="mt-4 w-full p-3 bg-primaryGreen text-primaryBlack font-bold rounded-lg">

                {
                      lodaing ? <BeatLoader  size={12} /> : "Proceed"
                    }
                </button>
            </form>
        </div>
    );
}

export default Otp;
