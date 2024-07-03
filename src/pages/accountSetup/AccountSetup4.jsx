import React, { useState } from 'react';

function AccountSetupStep4({ formData, handleNextStep, handlePreviousStep }) {
    const [fontOptions, setSelectedFonts] = useState(formData?.selectedFonts || []);

    const handleFontSelect = (font) => {
        setSelectedFonts(prev =>
            prev?.includes(font) ? prev.filter(f => f !== font) : [...prev, font]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleNextStep({ fontOptions });
    };
    const fontOption = [
        { name: "Roboto", class: "font-roboto" },
        { name: "Open Sans", class: "font-open-sans" },
        { name: "Poppins", class: "font-poppins" },
        { name: "Merriweather", class: "font-merriweather" },
    ];

    return (
                <div className="flex flex-col items-start justify-center mt-8 max-h-screen mx-32">
                    <div className="">
                        <p className="text-3xl font-bold text-white">Have a design style in mind?</p>
                        <p className="text-customGray mt-2">Select as many as you'd like. (Optional)</p>
                    </div>
                    <form className="md:mt-8 mb-2 w-auto max-w-screen-lg md:w-full" onSubmit={handleSubmit}>
                        <div className="mb-6 text-center">
                            <label className="text-customGray text-center text-base font-medium mb-1">Choose from the Font options given below</label>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {fontOption.map((font, index) => (
                                    <div
                                        key={index}
                                        className={`p-6 bg-primaryBlack rounded-lg flex justify-center cursor-pointer ${fontOptions?.includes(font.name) ? 'ring-2 ring-primaryGreen' : ''}`}
                                        onClick={() => handleFontSelect(font.name)}
                                    >
                                        <div key={index} className={`h-24 w-40 flex items-center justify-center bg-gray-800 rounded-lg ${font.class}`}>
                                            <p className="text-white">{font.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {fontOptions?.map((font, index) => {
                                const fontClass = fontOptions.find(f => f.name === font)?.class || '';
                                return (
                                    <span key={index} className={`p-2 bg-primaryBlack rounded-lg ${fontClass}`}>
                                        <p className="text-white">{font}</p>
                                    </span>
                                );
                            })}
                        </div>
                        <div className="flex items-center justify-start">
                            <button type="submit" className="mt-1 p-3 bg-primaryGreen text-primaryBlack font-bold rounded-lg lg:w-[15%]">Next</button>
                        </div>
                    </form>
                </div>
    );
}

export default AccountSetupStep4;
