import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ClipboardDocumentListIcon, RectangleStackIcon, Cog6ToothIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid';

const Sidebar = () => {
    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);

    const handleLinkClick = (path) => {
        setActivePath(path);
    };

    const linkClasses = (path) => 
        `relative flex items-center space-x-5 h-10 w-full pl-4
        ${activePath === path ? 'text-primaryGreen bg-black  bg-opacity-15' : 'text-white'}`;

    const pseudoClasses = (path) => 
        `${activePath === path ? 'border-l-8 border-primaryGreen rounded-tr-lg rounded-br-lg' : ''}`;

    return (
        <div className="w-1/6 border-spacing-1 bg-primaryBlack fixed top-0 left-0 h-full border-r-2 border-secondaryBlack">
            <div className='flex flex-col justify-center space-y-10 w-full'>
                <div className='m-6'>
                    <img src="/img/Logo.png" className="h-10 w-64 mb-10" alt="Logo" />
                </div>
                <nav className="space-y-12 flex flex-col items-baseline justify-center w-full">
                    <Link 
                       
                        className={linkClasses('/')} 
                        onClick={() => handleLinkClick('/')}
                    >
                         <div className={`absolute left-0 h-full w-2 ${pseudoClasses('/')} `}></div>
                        <HomeIcon className="h-6 w-6" />
                        <span>Overview</span>
                    </Link>
                    <Link 
                     
                        className={linkClasses('/services')} 
                        onClick={() => handleLinkClick('/services')}
                    >
                        <div className={`absolute left-0 h-full w-2 ${pseudoClasses('/services')} `}></div>
                        <RectangleStackIcon className="h-6 w-6" />
                        <span>Services</span>
                    </Link>
                    <Link 
                      
                        className={linkClasses('/files')} 
                        onClick={() => handleLinkClick('/files')}
                    >
                          <div className={`absolute left-0 h-full w-2 ${pseudoClasses('/files')} `}></div>
                        <ClipboardDocumentListIcon className="h-6 w-6" />
                        <span>Files</span>
                    </Link>
                    <Link 
                       
                        className={linkClasses('/helpdesk')} 
                        onClick={() => handleLinkClick('/helpdesk')}
                    >
  <div className={`absolute left-0 h-full w-2 ${pseudoClasses('/helpdesk')} `}></div>
                        <QuestionMarkCircleIcon className="h-6 w-6" />
                        <span>Helpdesk</span>
                    </Link>
                    <Link 
                      
                        className={linkClasses('/settings')} 
                        onClick={() => handleLinkClick('/settings')}
                    >
                          <div className={`absolute left-0 h-full w-2 ${pseudoClasses('/settings')} `}></div>
                        <Cog6ToothIcon className="h-6 w-6" />
                        <span>Settings</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
