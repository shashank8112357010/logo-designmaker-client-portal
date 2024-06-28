import React, { useState } from 'react';

function AccountSetupStep2({ formData, handleNextStep, handlePreviousStep }) {
    const [brandName, setBrandName] = useState(formData?.brandName);
    const [slogan, setSlogan] = useState(formData?.slogan);

    const handleBrandNameChange = (e) => {
        setBrandName(e.target.value);
    };

    const handleSloganChange = (e) => {
        setSlogan(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleNextStep({ brandName, slogan });
    };

    return (
       
                <div className="flex flex-col items-start justify-center mt-8 max-h-screen  sm:mx-32">
                    <div className="">
                        <p className="text-3xl font-bold text-white">Make your Designs in a few steps</p>
                        <p className="text-customGray mt-2">Let's get to know you better and create a design you love.</p>
                    </div>
                    <form className="mt-8 mb-2 w-auto max-w-screen-lg md:w-full" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="text-white text-base font-medium mb-1">Add your brand name*</label>
                            <input
                                type="text"
                                value={brandName}
                                onChange={handleBrandNameChange}
                                placeholder="Please Add your Brand name"
                                className="w-full p-3 bg-primaryBlack border-none text-white rounded-lg mt-1"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="text-white text-base font-medium mb-1">Add your slogan <span className="text-customGray">Or add it later</span></label>
                            <input
                                type="text"
                                value={slogan}
                                onChange={handleSloganChange}
                                placeholder="Please Add your Slogan"
                                className="w-full p-3 bg-primaryBlack border-none text-white rounded-lg mt-1"
                            />
                        </div>
                        <div className="flex items-center justify-start">
                            <button type="submit" className="mt-6 p-3 bg-primaryGreen text-primaryBlack font-bold rounded-lg lg:w-[15%]">Next</button>
                        </div>
                    </form>
                </div>
    );
}

export default AccountSetupStep2;
