import React from 'react';
import { BigDotGroup, DotGroup } from './Dot';

const LeftSide = () => {
    return (
        <div className="hidden mmd:flex w-1/3 bg-primaryBlack fixed top-0 left-0 h-full p-10 flex-col justify-between">
            <div className="hidden md:flex absolute top-1 right-0 mr-[1px]">
                <DotGroup />
            </div>
            <div className="absolute top-1 right-4">
                <DotGroup />
            </div>
            <div className="absolute top-1 right-8">
                <DotGroup />
            </div>
            <div>
                <img
                    src="/img/Logo.png"
                    className="h-14 w-64"
                    alt="Logo"
                />
                <div className="mt-20">
                    <h1 className="text-white text-4xl font-bold mb-2">Start your remarkable</h1>
                    <h1 className="text-primaryGreen text-4xl font-bold">journey with us!</h1>
                </div>
            </div>
            <div className="relative h-full">
                <div className="absolute flex justify-center bottom-16 -left-4">
                    <BigDotGroup />
                </div>
                <div className="absolute flex justify-center bottom-4 -left-4">
                    <BigDotGroup />
                </div>
                <div className="absolute flex justify-center -bottom-8 -left-4">
                    <BigDotGroup />
                </div>
            </div>
        </div>
    );
};

export default LeftSide;
