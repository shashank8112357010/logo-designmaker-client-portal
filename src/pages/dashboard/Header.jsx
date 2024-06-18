import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import NotificationsDropdown from './Notification';

const Header = ({ heading }) => {
    const [showNotifications, setShowNotifications] = useState(false);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <header className="flex flex-col lg:flex-row sticky items-start lg:items-center justify-between p-2 bg-primaryBlack border-b-2 border-secondaryBlack h-16 lg:h-24 top-0 z-50">
            <h1 className="text-white text-3xl font-semibold ml-2 mb-4 lg:mb-0">{heading}</h1>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full lg:w-1/2 space-y-4 lg:space-y-0">
                <div className="relative w-full lg:w-1/2 flex-grow lg:flex-grow-0">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for something"
                        className="p-2 pl-10 bg-secondaryBlack text-white placeholder-gray-400 rounded-full w-full h-12"
                    />
                </div>
                <div className="ml-0 lg:ml-4 flex justify-center items-center space-x-4 lg:space-x-8 p-2 mr-6">
                    <div
                        className='bg-secondaryBlack rounded-full w-12 h-12 flex items-center justify-center relative cursor-pointer'
                        onClick={toggleNotifications}
                    >
                        <img src='/img/notification.png' alt='n' className='text-white h-6 w-6' />
                        {showNotifications && <NotificationsDropdown setShowNotifications={setShowNotifications} />}
                    </div>
                    <div className='flex items-center'>
                        <img
                            src="/img/Profile.jpg"
                            alt="Profile"
                            className="h-12 w-12 rounded-full text-white"
                        />
                        <div className='text-white ml-2'><h3>Jhon Doe</h3></div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
