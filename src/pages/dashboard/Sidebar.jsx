// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, BriefcaseIcon, FolderIcon, LifebuoyIcon, CogIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
    return (
        <div className=" md:flex w-1/6 border-spacing-1 bg-primaryBlack fixed top-0 left-0 h-full p-10 flex-col justify-between">
            <div>
                <img src="/img/Logo.png" className="h-14 w-64 mb-10" alt="Logo" />
                <nav className="space-y-4">
                    <Link to="/overview" className="flex items-center space-x-3 text-primaryGreen">
                        <HomeIcon className="h-5 w-5" />
                        <span>Overview</span>
                    </Link>
                    <Link to="/services" className="flex items-center space-x-3 text-gray-400 hover:text-primaryGreen">
                        <BriefcaseIcon className="h-5 w-5" />
                        <span>Services</span>
                    </Link>
                    <Link to="/files" className="flex items-center space-x-3 text-gray-400 hover:text-primaryGreen">
                        <FolderIcon className="h-5 w-5" />
                        <span>Files</span>
                    </Link>
                    <Link to="/helpdesk" className="flex items-center space-x-3 text-gray-400 hover:text-primaryGreen">
                        <LifebuoyIcon className="h-5 w-5" />
                        <span>Helpdesk</span>
                    </Link>
                    <Link to="/settings" className="flex items-center space-x-3 text-gray-400 hover:text-primaryGreen">
                        <CogIcon className="h-5 w-5" />
                        <span>Settings</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
