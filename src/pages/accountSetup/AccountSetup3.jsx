import React, { useState } from 'react';
import { DotGroup } from '../../components/Dot';
import LeftSide from '../../components/LeftSide';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Select from '../../components/Select';

function AccountSetupStep3({ formData, handleNextStep, handlePreviousStep }) {
    const [designType, setDesignType] = useState(formData?.designType || []);
    const [targetNiche, setTargetNiche] = useState(formData?.targetNiche || []);
    const [otherDetails, setOtherDetails] = useState(formData?.otherDetails);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleNextStep({ designType,targetNiche,otherDetails});
    };

    const handleSkip = () => {
        handleNextStep({
            designType:designType || null,
            targetNiche:targetNiche || null,
            otherDetails:otherDetails || null
        });
    };
    const tags1 = [
        "Tutorial",
        "HowTo",
        "DIY",
        "Review",
        "Tech",
        "Gaming",
        "Travel",
        "Fitness",
        "Cooking",
        "Vlog",
    ];

    const tags2 = [
        "Apple",
        "Banana",
        "Cherry",
        "Date",
        "Fig",
        "Grape",
        "Kiwi",
        "Lemon",
        "Mango",
        "Nectarine",
    ];

    return (
        <section className="relative bg-secondaryBlack flex">
            <LeftSide />
            <div className="mmd:left-[38%] w-full mmd:w-[62%] p-10 mmd:absolute overflow-hidden bg-secondaryBlack min-h-screen">
                <div className="hidden fixed top-1 left-[38%] ml-5 mmd:flex flex-col space-y-2">
                    <DotGroup />
                </div>
                <div className="hidden fixed top-1 left-[38%] ml-1.5 mmd:flex flex-col space-y-2">
                    <DotGroup />
                </div>
                <div className="flex justify-between items-center">
                    <h3 className="text-white text-2xl font-bold">Account set up</h3>
                    <p className="font-bold text-primaryGreen mt-1 mr-2 text-2xl">3/5</p>
                </div>
                <div className="w-full bg-white h-2 mt-4 rounded-lg">
                    <div className="bg-primaryGreen h-2 rounded-lg" style={{ width: '60%' }}></div>
                </div>
                <ArrowLeftIcon className="text-gray-100 w-5 h-5 mt-5 ml-1 cursor-pointer" onClick={handlePreviousStep} />
                <div className="flex flex-col items-start justify-center mt-8 max-h-screen mx-32">
                    <div className="">
                        <p className="text-3xl font-bold text-white">Tell us about your design requirements</p>
                        <p className="text-customGray mt-2">Share your story to get a design that shows and tells it best.</p>
                    </div>
                    <form className="md:mt-8 mb-2 w-auto max-w-screen-lg md:w-full" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="text-white text-base font-medium mb-1">What type of design do you need?</label>
                            <Select options={tags1} multiple={true} value={designType} onChange={setDesignType} />
                        </div>
                        <div className="mb-6">
                            <label className="text-white text-base font-medium mb-1">Which niche are you targeting?</label>
                           <Select options={tags2} multiple={true} value={targetNiche} onChange={setTargetNiche} />
                        </div>
                        <div className="mb-6">
                            <label className="text-white text-base font-medium mb-1">If 'Other' selected, please specify</label>
                            <textarea
                                value={otherDetails}
                                onChange={(e) => {setOtherDetails(e.target.value);}}
                                placeholder="Please Add your Description"
                                className="w-full p-3 bg-primaryBlack border-none text-white rounded-lg resize-none"
                                style={{ height: '100px' }}
                            />
                        </div>
                        <div className="flex items-center justify-start">
                            <button type="submit" className="mt-1 p-3 bg-primaryGreen text-primaryBlack font-bold rounded-lg lg:w-[15%]">Next</button>
                            <button type="button" className="mt-1 p-3 text-gray-400 font-medium mx-10" onClick={handleSkip}>Skip</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default AccountSetupStep3;
