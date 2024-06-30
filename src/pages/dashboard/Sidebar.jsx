import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, ClipboardDocumentListIcon, RectangleStackIcon, Cog6ToothIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import { removeToken } from '../../helpers/token.helper';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activePath, setActivePath] = useState(location.pathname);
    const [helpdeskOpen, setHelpdeskOpen] = useState(location.pathname.includes('/dashboard/help'));

    useEffect(() => {
        setActivePath(location.pathname);
        if (!location.pathname.includes('/dashboard/help')) {
            setHelpdeskOpen(false);
        } 
    }, [location]);

    const handleLinkClick = (path) => {
        setActivePath(path);
        navigate(path);
    };

    const toggleHelpdesk = () => {
        setHelpdeskOpen(!helpdeskOpen);
    };

    const handleHelpdeskClick = () => {
        toggleHelpdesk();
        
        const helpdeskPath = '/dashboard/help';
        setActivePath(helpdeskPath);
        navigate(helpdeskPath);
    };

    const getLinkClasses = (path) => {
        const isActive = activePath === path || (helpdeskOpen && path.includes('/dashboard/help'));
        const baseClasses = `relative flex items-center space-x-5 h-10 w-full pl-4`;
        const activeClasses = `text-primaryGreen bg-black bg-opacity-15`;
        const inactiveClasses = `text-white`;

        return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
    };

    const getPseudoClasses = (path) => {
        const isActive = activePath === path || (helpdeskOpen && path.includes('/dashboard/help'));
        return isActive ? 'border-l-8 border-primaryGreen rounded-tr-lg rounded-br-lg' : '';
    };

    const handleLogout = () => {
        removeToken(); 
        // navigate('/auth/sign-in'); 
    };

    return (
        <aside className="w-[16.7%] bg-primaryBlack fixed top-0 overflow-y-auto h-screen custom-scrollbar">
            <div className='flex flex-col justify-center space-y-10 w-full mb-4'>
                <div className='m-6'>
                    <img src="/img/Logo.png" className="h-10 w-64 mb-10" alt="Logo" />
                </div>
                <nav className="space-y-4 flex flex-col items-baseline justify-center w-full">
                    <Link
                        to="/dashboard/overview"
                        className={getLinkClasses('/dashboard/overview')}
                        onClick={() => handleLinkClick('/dashboard/overview')}
                    >
                        <div className={`absolute left-0 h-full w-2 ${getPseudoClasses('/dashboard/overview')} `}></div>
                        <HomeIcon className="h-6 w-6" />
                        <span>Overview</span>
                    </Link>
                    <Link
                        to="/dashboard/services"
                        className={getLinkClasses('/dashboard/services')}
                        onClick={() => handleLinkClick('/dashboard/services')}
                    >
                        <div className={`absolute left-0 h-full w-2 ${getPseudoClasses('/dashboard/services')} `}></div>
                        <RectangleStackIcon className="h-6 w-6" />
                        <span>Services</span>
                    </Link>
                    <Link
                        to="/dashboard/files"
                        className={getLinkClasses('/dashboard/files')}
                        onClick={() => handleLinkClick('/dashboard/files')}
                    >
                        <div className={`absolute left-0 h-full w-2 ${getPseudoClasses('/dashboard/files')} `}></div>
                        <ClipboardDocumentListIcon className="h-6 w-6" />
                        <span>Files</span>
                    </Link>
                    <Link
                        to="/dashboard/transactions"
                        className={getLinkClasses('/dashboard/transactions')}
                        onClick={() => handleLinkClick('/dashboard/transactions')}
                    >
                        <div className={`absolute left-0 h-full w-2 ${getPseudoClasses('/dashboard/transactions')} `}></div>
                        <div className='pl-1 flex justify-between items-center gap-6'>
                            <img src='/img/sidebar/right.png' alt='i' className={`h-4 w-4 ${activePath === '/dashboard/transactions' ? 'bg-primaryGreen' : 'bg-white'} p-0.5`} />
                            <span>Transactions</span>
                        </div>
                    </Link>
                    <div className="relative w-full">
                        <button
                            className={getLinkClasses('/dashboard/help')}
                            onClick={handleHelpdeskClick}
                        >
                            <div className={`absolute left-0 h-full w-2 ${getPseudoClasses('/dashboard/help')}`}></div>
                            <QuestionMarkCircleIcon className="h-6 w-6" />
                            <div className='flex justify-between items-center gap-3'>
                                <span>Helpdesk</span>
                                <div className={`ml-auto mt-2 ${helpdeskOpen ? 'triangle-up' : (activePath === '/dashboard/help' ? 'triangle-down-green' : 'triangle-down-white')}`} />
                            </div>
                        </button>
                        {helpdeskOpen && (
                            <div className="w-full pl-20 mb-4 gap-2 flex flex-col">
                                <Link
                                    to="/dashboard/help"
                                    className={`mt-4 ${activePath === '/dashboard/help' ? 'text-primaryGreen' : 'text-customGray'}`}
                                    onClick={() => handleLinkClick('/dashboard/help')}
                                >
                                    <span>Tickets</span>
                                </Link>
                                <Link
                                    to="/dashboard/help/refunds"
                                    className={`${activePath === '/dashboard/help/refunds' ? 'text-primaryGreen' : 'text-customGray'}`}
                                    onClick={() => handleLinkClick('/dashboard/help/refunds')}
                                >
                                    <span>Refunds</span>
                                </Link>
                            </div>
                        )}
                    </div>
                    <Link
                        to="/dashboard/settings"
                        className={getLinkClasses('/dashboard/settings')}
                        onClick={() => handleLinkClick('/dashboard/settings')}
                    >
                        <div className={`absolute left-0 h-full w-2 ${getPseudoClasses('/dashboard/settings')} `}></div>
                        <Cog6ToothIcon className="h-6 w-6" />
                        <span>Settings</span>
                    </Link>
                </nav>
                <button
                    className="relative pt-5   w-fit px-6 text-white"
                    onClick={handleLogout}
                >
                    <div className='bg-red-500 flex items-center pl-4 pr-8 py-2 space-x-5 w-fit rounded-lg '>
                    {/* <div className={`absolute left-0 h-full w-2 ${getPseudoClasses('/auth/sign-in')} `}></div> */}
                    <img src="/img/sidebar/logout.png" className="h-6 w-6" alt="Logout Icon" />
                    <span>Logout</span>
                    </div>
                </button>

            </div>
        </aside>
    );
};

export default Sidebar;
