import React, { useState } from 'react';
import { DotGroup } from '../../components/Dot';
import LeftSide from '../../components/LeftSide';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

function AccountSetupStep4({ formData, handleNextStep, handlePreviousStep }) {
    const [selectedFonts, setSelectedFonts] = useState(formData?.selectedFonts || []);

    const handleFontSelect = (font) => {
        setSelectedFonts(prev =>
            prev?.includes(font) ? prev.filter(f => f !== font) : [...prev, font]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleNextStep({ selectedFonts });
    };

    const handleSkip = () => {
        handleNextStep({selectedFonts: selectedFonts || null });
    };

    const fontOptions = [
        { name: "Roboto", class: "font-roboto" },
        { name: "Open Sans", class: "font-open-sans" },
        { name: "Poppins", class: "font-poppins" },
        { name: "Merriweather", class: "font-merriweather" },
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
                    <p className="font-bold text-primaryGreen mt-1 mr-2 text-2xl">4/5</p>
                </div>
                <div className="w-full bg-white h-2 mt-4 rounded-lg">
                    <div className="bg-primaryGreen h-2 rounded-lg" style={{ width: '80%' }}></div>
                </div>
                <ArrowLeftIcon className="text-gray-100 w-5 h-5 mt-5 ml-1 cursor-pointer" onClick={handlePreviousStep} />
                <div className="flex flex-col items-start justify-center mt-8 max-h-screen mx-32">
                    <div className="">
                        <p className="text-3xl font-bold text-white">Have a design style in mind?</p>
                        <p className="text-customGray mt-2">Select as many as you'd like. (Optional)</p>
                    </div>
                    <form className="md:mt-8 mb-2 w-auto max-w-screen-lg md:w-full" onSubmit={handleSubmit}>
                        <div className="mb-6 text-center">
                            <label className="text-customGray text-center text-base font-medium mb-1">Choose from the Font options given below</label>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {fontOptions.map((font, index) => (
                                    <div
                                        key={index}
                                        className={`p-6 bg-primaryBlack rounded-lg flex justify-center cursor-pointer ${selectedFonts?.includes(font.name) ? 'ring-2 ring-primaryGreen' : ''}`}
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
                            {selectedFonts?.map((font, index) => {
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
                            <button type="button" className="mt-1 p-3 text-gray-400 font-medium mx-10" onClick={handleSkip}>Skip</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default AccountSetupStep4;
