import React, { useState } from 'react';
import { DotGroup } from '../../components/Dot';
import LeftSide from '../../components/LeftSide';

function AccountSetupStep3() {
    const [designType, setDesignType] = useState("");
    const [targetNiche, setTargetNiche] = useState("");
    const [otherDetails, setOtherDetails] = useState("");

    const handleDesignTypeChange = (e) => {
        setDesignType(e.target.value);
    };

    const handleTargetNicheChange = (e) => {
        setTargetNiche(e.target.value);
    };

    const handleOtherDetailsChange = (e) => {
        setOtherDetails(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                    <p className="font-bold text-primaryGreen mt-1 mr-2 text-2xl">3/5</p>
                </div>
                <div className="w-full bg-white h-2 mt-4 rounded-lg">
                    <div className="bg-primaryGreen h-2 rounded-lg" style={{ width: '60%' }}></div>
                </div>
                <div className="flex flex-col items-start justify-center mt-12 max-h-screen mx-32">
                    <div className="">
                        <p className="text-3xl font-bold text-white">Tell us about your design requirements</p>
                        <p className="text-customGray mt-2">Share your story to get a design that shows and tells it best.</p>
                    </div>
                    <form className="md:mt-8 mb-2 w-auto max-w-screen-lg md:w-full" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="text-white text-base font-medium mb-1">What type of design do you need?</label>
                            <select
                                value={designType}
                                onChange={handleDesignTypeChange}
                                className="w-full p-3 bg-primaryBlack border-none text-gray-600 rounded-lg appearance-none"
                                required
                            >
                                <option value="">Select Design Type</option>
                                <option value="Logo">Logo</option>
                                <option value="Banner">Banner</option>
                                <option value="Poster">Poster</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="text-white text-base font-medium mb-1">Which niche are you targeting?</label>
                            <select
                                value={targetNiche}
                                onChange={handleTargetNicheChange}
                                className="w-full p-3 bg-primaryBlack border-none text-gray-600 rounded-lg appearance-none"
                                required
                            >
                                <option value="">Select Target Niche</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Technology">Technology</option>
                                <option value="Food">Food</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="text-white text-base font-medium mb-1">If 'Other' selected, please specify</label>
                            <textarea
                                value={otherDetails}
                                onChange={handleOtherDetailsChange}
                                placeholder="Specify other details"
                                className="w-full p-3 bg-primaryBlack border-none text-gray-600 rounded-lg resize-none"
                                style={{ height: '100px' }}
                            />
                        </div>
                        <div className="flex items-center justify-start">
                            <button type="submit" className="mt-1 p-3 bg-primaryGreen text-primaryBlack font-bold rounded-lg lg:w-[15%]">Next</button>
                            <button type="button" className="mt-1 p-3 text-gray-400 font-medium mx-10">Skip</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default AccountSetupStep3;
