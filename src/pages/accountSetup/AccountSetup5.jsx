import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DotGroup } from '../../components/Dot';
import LeftSide from '../../components/LeftSide';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// ColorPalette Component to render each palette
const ColorPalette = ({ palette, isSelected, onClick }) => (
    <div
        className={`p-4 bg-primaryBlack rounded-lg flex flex-col justify-center cursor-pointer last: ${isSelected ? 'ring-2 ring-primaryGreen' : ''}`}
        onClick={onClick}
    >
        <div className="flex justify-center">
            {palette.colors.map((color, index) => (
                <div key={index} className="h-24 w-6" style={{ backgroundColor: color }}></div>
            ))}
        </div>
        <div className='text-white mt-2'><p>{palette.name}</p></div>
    </div>
);

function AccountSetupStep5() {
    const [selectedPalettes, setSelectedPalettes] = useState([]);
    const navigate = useNavigate();

    const handlePaletteSelect = (paletteName) => {
        setSelectedPalettes(prev =>
            prev.includes(paletteName) ? prev.filter(name => name !== paletteName) : [...prev, paletteName]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/accountsetup/step-5");
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const colorPalettes = [
        { name: "GrayScale", colors: ["#000000", "#444444", "#888888", "#cccccc","#ffffff"] },
        { name: "Pastel Color", colors: ["#1b85b8", "#5a5255", "#559e83", "#ae5a41","#c3cb71"] },
        { name: "Pencil Color", colors: ["#6cd6aa", "#f28caf", "#cb50e9", "#727dd6","#aba9a9"] },
        { name: "Neon Colors", colors: ["#39FF14", "#FF073A", "#FEFE33", "#0FF0FC","#8F00FF"] },
    ];

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
                    <p className="font-bold text-primaryGreen mt-1 mr-2 text-2xl">5/5</p>
                </div>
                <div className="w-full bg-white h-2 mt-4 rounded-lg">
                    <div className="bg-primaryGreen h-2 rounded-lg" style={{ width: '100%' }}></div>
                </div>
                <ArrowLeftIcon className="text-gray-100 w-5 h-5 mt-5 ml-1 cursor-pointer" onClick={handleGoBack} />
                <div className="flex flex-col items-start justify-center mt-8 max-h-screen mx-32">
                    <div className="">
                        <p className="text-3xl font-bold text-white">Have a design style in mind?</p>
                        <p className="text-customGray mt-2">Select as many as you'd like. (Optional)</p>
                    </div>
                    <form className="md:mt-8 mb-2 text-center w-auto max-w-screen-lg md:w-full" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="text-customGray text-base font-medium mb-1">Choose from the Colour options given below</label>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {colorPalettes.map((palette, index) => (
                                    <ColorPalette
                                        key={index}
                                        palette={palette}
                                        isSelected={selectedPalettes.includes(palette.name)}
                                        onClick={() => handlePaletteSelect(palette.name)}
                                    />
                                ))}
                            </div>
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

export default AccountSetupStep5;
