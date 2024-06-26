import React, { useState, useEffect } from 'react';

const NotificationsDropdown = ({ notifications, showNotifications, setShowNotifications }) => {
    const [isVisible, setIsVisible] = useState(showNotifications);
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        if (showNotifications) {
            setIsVisible(true);
            setAnimationClass('fade-in');
        } else {
            setAnimationClass('fade-out');
            const timeout = setTimeout(() => setIsVisible(false), 500);
            return () => clearTimeout(timeout);
        }
    }, [showNotifications]);

    return (
        isVisible && (
            <div className={`absolute top-12 right-10 mt-2 w-[500px] bg-secondaryBlack rounded-lg shadow-lg p-4 z-50 ${animationClass}`}>
                <div className="flex justify-end mb-2">
                    <button className="text-primaryGreen" onClick={() => setShowNotifications(false)}>Close</button>
                </div>
                <div className="space-y-6">
                    {notifications.map((notification, index) => (
                        <div key={index} className="p-3 bg-primaryBlack rounded-lg flex justify-between items-center border-l-8 border-primaryGreen">
                            <div className='flex flex-col gap-2 w-[70%]'>
                                <h4 className="text-white mt-2">{notification.title}</h4>
                                <p className="text-gray-400 text-sm">{notification.description}</p>
                            </div>
                            <span className="text-gray-400 ml-4 w-[30%] mt-9">{notification.date}</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    );
};

export default NotificationsDropdown;
