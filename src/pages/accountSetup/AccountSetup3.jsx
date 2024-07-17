import React, { useState } from 'react';
import Select from '../../components/Select';

function AccountSetupStep3({ formData, handleNextStep }) {
    const [designRequirements, setDesignType] = useState(formData?.designRequirements || []);
    const [niche, setTargetNiche] = useState(formData?.niche || []);
    const [other, setOtherDetails] = useState(formData?.other);

    const [errors, setErrors] = useState({ designRequirements: false, niche: false });

    const handleSubmit = (e) => {
        e.preventDefault();

        let validationErrors = {};

        if (designRequirements.length === 0) {
            validationErrors.designRequirements = true;
        }

        if (niche.length === 0) {
            validationErrors.niche = true;
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            handleNextStep({ designRequirements, niche, other });
        }
    };

    const tags1 = [
        "Abstract Logos",
        "Lettermark Logos",
        "Wordmark Logos",
    ];

    const tags2 = [
        "Healthcare",
        "Technology",
        "Finance",
        "Education",
    ];

    return (
        <div className="flex flex-col items-start justify-center mt-8 max-h-screen mx-32">
            <div>
                <p className="text-3xl font-bold text-white">Tell us about your design requirements</p>
                <p className="text-customGray mt-2">Share your story to get a design that shows and tells it best.</p>
            </div>
            <form className="md:mt-8 mb-2 w-auto max-w-screen-lg md:w-full" onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="text-white text-base font-medium mb-1">What type of design do you need?</label>
                    <Select options={tags1} multiple={true} value={designRequirements} onChange={setDesignType} />
                    {errors.designRequirements && <p className="text-red-500 mt-1">Please select at least one design requirement.</p>}
                </div>
                <div className="mb-6">
                    <label className="text-white text-base font-medium mb-1">Which niche are you targeting?</label>
                    <Select options={tags2} multiple={true} value={niche} onChange={setTargetNiche} />
                    {errors.niche && <p className="text-red-500 mt-1">Please select at least one niche.</p>}
                </div>
                <div className="mb-6">
                    <label className="text-white text-base font-medium mb-1">If 'Other' selected, please specify</label>
                    <textarea
                        value={other}
                        onChange={(e) => setOtherDetails(e.target.value)}
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
