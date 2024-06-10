import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DotGroup } from '../../components/Dot';
import LeftSide from '../../components/LeftSide';

function AccountSetupStep2() {
    const [brandName, setBrandName] = useState("");
    const [slogan, setSlogan] = useState("");
    const navigate = useNavigate();

    const handleBrandNameChange = (e) => {
        setBrandName(e.target.value);
    };

    const handleSloganChange = (e) => {
        setSlogan(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/account-setup-step-3');
    };

    return (
        <section className="relative bg-secondaryBlack min-h-screen flex">
            <LeftSide />
            <div className="md:left-1/3 w-full md:w-2/3 p-10 relative overflow-hidden">
                <div className="hidden fixed top-1 left-1/3 ml-5 md:flex flex-col space-y-2">
                    <DotGroup />
                </div>
                <div className="hidden fixed top-1 left-1/3 ml-1.5 md:flex flex-col space-y-2">
                    <DotGroup />
                </div>
                <div className="flex justify-between items-center">
                    <h3 className="text-white text-2xl font-bold">Account set up</h3>
                    <p className="font-bold text-primaryGreen mt-1 mr-2 text-2xl">2/5</p>
                </div>
                <div className="w-full bg-white h-2 mt-4 rounded-lg">
                    <div className="bg-primaryGreen h-2 rounded-lg" style={{ width: '40%' }}></div>
                </div>
                <div className="flex flex-col items-start justify-center mt-12 max-h-screen mx-32">
                    <div className="">
                        <p className="text-2xl font-bold text-white">Make your Designs in a few steps</p>
                        <p className="text-white mt-2">Let's get to know you better and create a design you love.</p>
                    </div>
                    <form className="md:mt-8 mb-2 w-auto max-w-screen-lg md:w-full" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="text-white text-base font-medium mb-1">Add your brand name*</label>
                            <input
                                type="text"
                                value={brandName}
                                onChange={handleBrandNameChange}
                                placeholder="Please Add your Brand name"
                                className="w-full p-3 bg-primaryBlack border-none text-gray-600 rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="text-white text-base font-medium mb-1">Add your slogan <span className="text-gray-400">Or add it later</span></label>
                            <input
                                type="text"
                                value={slogan}
                                onChange={handleSloganChange}
                                placeholder="Please Add your Slogan"
                                className="w-full p-3 bg-primaryBlack border-none text-gray-600 rounded-lg"
                            />
                        </div>
                        <div className="flex items-center justify-start">
                            <button type="submit" className="mt-6 p-3 bg-primaryGreen text-primaryBlack font-bold rounded-lg lg:w-[15%]">Next</button>
                            <button type="button" className="mt-6 p-3 text-gray-400 font-medium mx-10">Skip</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default AccountSetupStep2;
