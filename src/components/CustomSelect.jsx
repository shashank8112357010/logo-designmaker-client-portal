import React, { useState, useRef } from 'react';

const CustomSelect = ({ options, selectedOption, setSelectedOption }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                className="bg-secondaryBlack text-white text-xs font-medium px-4 py-2 rounded border-primaryGreen border-2 focus:border-primaryGreen w-40 flex justify-between"
                onClick={handleToggle}
            >
                {selectedOption.label}
                <span><img src="/img/arrow-down.png" alt="down" /></span>
            </button>
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute mt-1 bg-secondaryBlack border  border-primaryGreen rounded w-full z-10"
                >
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => handleOptionClick(option)}
                            className={`mx-2  cursor-pointer rounded-lg text-center pl-2 hover:bg-primaryBlack hover:text-[#7F56D8] text-xs py-2 text-customGray ${option.value === selectedOption.value ? 'bg-' : ''}`}
                        >
                            <span className="flex items-center">
                                <span className={`w-2 h-2 rounded-full mr-2 ${option.color}`}></span>
                                {option.label}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
