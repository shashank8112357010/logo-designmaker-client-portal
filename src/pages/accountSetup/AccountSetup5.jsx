import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {  useDispatch } from 'react-redux';
// import { resetFormData } from '../../store/accountSlice';
const ColorPalette = ({ palette, isSelected, onClick }) => (
    <div
        className={`p-4 bg-primaryBlack rounded-lg flex flex-col justify-center cursor-pointer last: ${isSelected ? 'ring-2 ring-primaryGreen' : ''}`}
        onClick={onClick}
    >
        <div className="flex justify-center">
            {palette?.colors?.map((color, index) => (
                <div key={index} className="h-24 w-6" style={{ backgroundColor: color }}></div>
            ))}
        </div>
        <div className='text-white mt-2'><p>{palette.name}</p></div>
    </div>
);

function AccountSetupStep5({ formData = {}, handleSubmit, handlePreviousStep }) {
    const [selectedPalettes, setSelectedPalettes] = useState(formData.selectedPalettes || []);

    // const navigate=useNavigate();
    // const dispatch = useDispatch();

    const handlePaletteSelect = (paletteName) => {
        setSelectedPalettes(prev =>
            prev?.includes(paletteName) ? prev.filter(name => name !== paletteName) : [...prev, paletteName]
        );
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const updatedFormData = {selectedPalettes };
        handleSubmit(updatedFormData);
    };


    const colorPalettes = [
        { name: "GrayScale", colors: ["#000000", "#444444", "#888888", "#cccccc", "#ffffff"] },
        { name: "Pastel Color", colors: ["#1b85b8", "#5a5255", "#559e83", "#ae5a41", "#c3cb71"] },
        { name: "Pencil Color", colors: ["#6cd6aa", "#f28caf", "#cb50e9", "#727dd6", "#aba9a9"] },
        { name: "Neon Colors", colors: ["#39FF14", "#FF073A", "#FEFE33", "#0FF0FC", "#8F00FF"] },
    ];

    return (
                <div className="flex flex-col items-start justify-center mt-8 max-h-screen mx-32">
                    <div className="">
                        <p className="text-3xl font-bold text-white">Have a design style in mind?</p>
                        <p className="text-customGray mt-2">Select as many as you'd like. (Optional)</p>
                    </div>
                    <form className="md:mt-8 mb-2 text-center w-auto max-w-screen-lg md:w-full" onSubmit={onSubmit}>
                        <div className="mb-6">
                            <label className="text-customGray text-base font-medium mb-1">Choose from the Colour options given below</label>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {colorPalettes?.map((palette, index) => (
                                    <ColorPalette
                                        key={index}
                                        palette={palette}
                                        isSelected={selectedPalettes?.includes(palette.name)}
                                        onClick={() => handlePaletteSelect(palette.name)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {selectedPalettes.map((palette, index) => {
                                return (
                                    <span key={index} className="p-2 bg-primaryBlack rounded-lg">
                                        <p className="text-white">{palette}</p>
                                    </span>
                                );
                            })}
                        </div>
                        <div className="flex items-center justify-start">
                            <button type="submit" className="mt-1 p-3 bg-primaryGreen text-primaryBlack font-bold rounded-lg lg:w-[15%]">Submit</button>
                        </div>
                    </form>
                </div>
    );
}

export default AccountSetupStep5;
