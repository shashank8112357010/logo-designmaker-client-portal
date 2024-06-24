import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ClipboardDocumentListIcon, RectangleStackIcon, Cog6ToothIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid';

const Sidebar = () => {
    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);

    const handleLinkClick = (path) => {
        setActivePath(path);
    };

    const imageClasses = (path) =>
        `${activePath === path ? 'bg-primaryGreen' : 'bg-white'}`;

    const linkClasses = (path) =>
        `relative flex items-center space-x-5 h-10 w-full pl-4
        ${activePath === path ? 'text-primaryGreen bg-black bg-opacity-15' : 'text-white'}`;

    const pseudoClasses = (path) =>
        `${activePath === path ? 'border-l-8 border-primaryGreen rounded-tr-lg rounded-br-lg' : ''}`;

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    return (
        <aside className="w-[16.7%] bg-primaryBlack fixed top-0  overflow-y-auto h-screen">
            <div className='flex flex-col justify-center space-y-10 w-full'>
                <div className='m-6'>
                    <img src="/img/Logo.png" className="h-10 w-64 mb-10" alt="Logo" />
                </div>
                <nav className="space-y-6 flex flex-col items-baseline justify-center w-full">
                    <Link
                        to="/dashboard/overview"
                        className={linkClasses('/dashboard/overview')}
                        onClick={() => handleLinkClick('/dashboard/overview')}
                    >
                        <div className={`absolute left-0 h-full w-2 ${pseudoClasses('/dashboard/overview')} `}></div>
                        <HomeIcon className="h-6 w-6" />
                        <span>Overview</span>
                    </Link>
                    <Link
                    to="/dashboard/services"
                        className={linkClasses('/dashboard/services')}
                        onClick={() => handleLinkClick('/dashboard/services')}
                    >
                        <div className={`absolute left-0 h-full w-2 ${pseudoClasses('/dashboard/services')} `}></div>
                        <RectangleStackIcon className="h-6 w-6" />
                        <span>Services</span>
                    </Link>
                    <Link
                    to="/dashboard/files"
                        className={linkClasses('/dashboard/files')}
                        onClick={() => handleLinkClick('/dashboard/files')}
                    >
                        <div className={`absolute left-0 h-full w-2 ${pseudoClasses('/dashboard/files')} `}></div>
                        <ClipboardDocumentListIcon className="h-6 w-6" />
                        <span>Files</span>
                    </Link>
                    <Link
                        to="/dashboard/transactions"
                        className={linkClasses('/dashboard/transactions')}
                        onClick={() => handleLinkClick('/dashboard/transactions')}
                    >
                        <div className={`absolute left-0 h-full w-2 ${pseudoClasses('/dashboard/transactions')} `}></div>
                        <div className='pl-1 flex justify-between items-center gap-6'>
                            <img src='/img/sidebar/right.png' alt='i' className={`h-4 w-4 ${imageClasses('/dashboard/transactions')} p-0.5`} />
                            <span>Transactions</span>
                        </div>
                    </Link>
                    <Link
                        to="/dashboard/help"
                        className={linkClasses('/dashboard/help')}
                        onClick={() => handleLinkClick('/dashboard/help')}
                    >
                        <div className={`absolute left-0 h-full w-2 ${pseudoClasses('/dashboard/help')} `}></div>
                        <QuestionMarkCircleIcon className="h-6 w-6" />
                        <span>Helpdesk</span>
                    </Link>
                    <Link
                    to="/dashboard/settings"
                        className={linkClasses('/dashboard/settings')}
                        onClick={() => handleLinkClick('/dashboard/settings')}
                    >
                        <div className={`absolute left-0 h-full w-2 ${pseudoClasses('/dashboard/settings')} `}></div>
                        <Cog6ToothIcon className="h-6 w-6" />
                        <span>Settings</span>
                    </Link>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
