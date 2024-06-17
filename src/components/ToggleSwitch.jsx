import React from 'react';

const ToggleSwitch = ({ isOn, handleToggle, label }) => {
    return (
        <div className="flex items-center mb-4">
            <div
                onClick={handleToggle}
                className={`w-12 h-7 flex items-center rounded-full p-1 cursor-pointer ${
                    isOn ? 'bg-primaryGreen' : 'bg-gray-200'
                }`}
            >
                <div
                    className={`bg-primaryBlack w-5 h-5 rounded-full shadow-md transform ${
                        isOn ? 'translate-x-5' : ''
                    }`}
                ></div>
            </div>
            <span className="ml-3 text-white">{label}</span>
        </div>
    );
};

export default ToggleSwitch;
