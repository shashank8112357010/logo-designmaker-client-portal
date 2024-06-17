import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import EditProfile from './EditProfile';
import Preferences from './Preferences';
import Security from './Security';

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('Edit Profile');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const tabClasses = (tab) => (
        `text-sm font-medium ml-6 cursor-pointer ${activeTab === tab ? 'text-primaryGreen ' : 'text-primarypurple'}`
    );

    return (
        <div className="flex bg-primaryBlack flex-row relative">
            <Sidebar />
            <div className="lg:ml-[16.7%] lg:w-[83.3%]  w-full bg-primaryBlack min-h-screen flex-1 flex flex-col absolute border-l-2 border-secondaryBlack">
                <Header />
                <main className="flex-grow p-6 bg-primaryBlack">
                    <div className="bg-secondaryBlack p-6 rounded-xl">
                        <div className="relative flex  gap-12 pb-2 mb-2">
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white" />
                            <div className="absolute bottom-0 left-0 h-[3px] bg-primaryGreen rounded-lg" style={{ width: `140px`, transform: `translateX(${activeTab === 'Edit Profile' ? 0 : activeTab === 'Preferences' ? 140 : 270}px)` }} />
                            {['Edit Profile', 'Preferences', 'Security'].map(tab => (
                                <button
                                    key={tab}
                                    className={tabClasses(tab)}
                                    onClick={() => handleTabClick(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        {activeTab === 'Edit Profile' && <EditProfile />}
                        {activeTab === 'Preferences' && <Preferences />}
                        {activeTab === 'Security' && <Security />}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserProfile;