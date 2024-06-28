import React, { useState } from 'react';
import Select from '../../components/Select';

function AccountSetupStep3({ formData, handleNextStep, handlePreviousStep }) {
    const [designType, setDesignType] = useState(formData?.designType || []);
    const [targetNiche, setTargetNiche] = useState(formData?.targetNiche || []);
    const [otherDetails, setOtherDetails] = useState(formData?.otherDetails);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleNextStep({ designType,targetNiche,otherDetails});
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
                           <Select options={tags2} multiple={true} value={targetNiche} onChange={setTargetNiche}  />
                        </div>
                        <div className="mb-6">
                            <label className="text-white text-base font-medium mb-1">If 'Other' selected, please specify</label>
                            <textarea
                                value={otherDetails}
                                onChange={(e) => {setOtherDetails(e.target.value);}}
                                placeholder="Please Add your Description"
                                className="w-full p-3 bg-primaryBlack border-none text-white rounded-lg resize-none mt-1"
                                style={{ height: '100px' }}
                            />
                        </div>
                        <div className="flex items-center justify-start">
                            <button type="submit" className="mt-1 p-3 bg-primaryGreen text-primaryBlack font-bold rounded-lg lg:w-[15%]">Next</button>
                        </div>
                    </form>
                </div>
    );
}

export default AccountSetupStep3;
