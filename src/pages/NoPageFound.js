import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoPageFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className='h-screen relative'>
      <img src='/img/g10.png' className='h-screen w-full' alt='404' />
      <button
        onClick={goBack}
        className='absolute top-[80%] left-[45%] bg-primaryGreen text-primaryBlack font-bold text-lg rounded-lg px-12 py-2'
      >
        GO BACK
      </button>
    </div>
  );
};

export default NoPageFound;
