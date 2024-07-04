import React, { useState } from 'react';
import EditProfile from './EditProfile';
import Preferences from './Preferences';
import Security from './Security';
import Choices from './Choices';

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('Edit Profile');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const tabClasses = (tab) => (
        `text-sm font-medium ml-6 cursor-pointer ${activeTab === tab ? 'text-primaryGreen ' : 'text-primarypurple'}`
    );

    return (
        <main className="flex-grow p-6 bg-primaryBlack">
            <div className="bg-secondaryBlack p-6 rounded-xl">
                <div className="relative flex gap-12 pb-2 mb-2">
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white" />
                    <div className="absolute bottom-0 left-0 h-[3px] bg-primaryGreen rounded-lg" style={{ width: `140px`, transform: `translateX(${activeTab === 'Edit Profile' ? 0 : activeTab === 'Choices' ? 120 : activeTab === 'Preferences' ? 255 : 390}px)` }} />
                    {['Edit Profile','Choices', 'Preferences', 'Security'].map(tab => (
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
                {activeTab === 'Choices' && <Choices />}
                {activeTab === 'Preferences' && <Preferences />}
                {activeTab === 'Security' && <Security />}
            </div>
        </main>
    );
};

export default UserProfile;
