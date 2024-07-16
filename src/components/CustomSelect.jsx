import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export const CustomDropdown = ({ options, selectedOption, setSelectedOption }) => {
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
        className="bg-secondaryBlack text-white text-xs font-medium px-4 py-2 rounded border-primaryGreen border-2 focus:border-primaryGreen w-[170px] flex justify-between"
        onClick={handleToggle}
      >
        <div className='flex items-center justify-center'>
        <span className={`w-2 h-2 rounded-full mr-2 ${selectedOption.color}`}></span>
        {selectedOption.label}
        </div>
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

export const Dropdown = ({ options, value, onChange, placeholder, textColor }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedValue(option);
    onChange(option);
    setMenuOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="bg-primaryBlack text-customGray h-[56px] rounded-lg flex items-center justify-between px-4 cursor-pointer"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {selectedValue ? (
          <div className="flex items-center" style={{ color: textColor }}>
            {selectedValue}
          </div>
        ) : (
          <span className='text-customGray'>{placeholder}</span>
        )}
        <ChevronDownIcon className="w-5 h-5 text-gray-500" />
      </div>
      {menuOpen && (
        <ul className="absolute w-full bg-primaryBlack mt-2 rounded text-white shadow-lg z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className="p-2 flex items-center cursor-pointer hover:bg-secondaryBlack"
              onClick={() => handleOptionClick(option)}
              style={{ color: textColor }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
