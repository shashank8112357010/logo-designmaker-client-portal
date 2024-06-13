import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { BellIcon } from '@heroicons/react/24/outline';

const Header = () => {
    return (
        <header className="flex flex-col sticky p-2 lg:flex-row items-start lg:items-center justify-between mb-8 border-b-2 border-secondaryBlack h-auto lg:h-20">
            <h1 className="text-white text-3xl font-semibold ml-2 mb-4 lg:mb-0">Overview</h1>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full lg:w-1/2 space-y-4 lg:space-y-0">
                <div className="relative w-full lg:w-auto flex-grow lg:flex-grow-0">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for something"
                        className="p-2 pl-10 bg-secondaryBlack text-white placeholder-gray-400 rounded-full w-full lg:w-auto"
                    />
                </div>
                <div className="ml-0 lg:ml-4 flex justify-center items-center space-x-4 lg:space-x-8 p-2">
                    <div className='bg-secondaryBlack rounded-full w-10 h-10 flex items-center justify-center'>
                        <BellIcon className='text-white h-8 w-8' />
                    </div>
                    <img
                        src="/img/Ellipse.jpg"
                        alt="Profile"
                        className="h-10 w-10 rounded-full text-white "
                    />
                </div>
            </div>
        </header>
    )
}

export default Header
