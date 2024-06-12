import React from 'react';
import Sidebar from './Sidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { BellIcon } from '@heroicons/react/24/outline';

const Home = () => {
  return (
    <div className="bg-primaryBlack relative">
      <Sidebar />
      <div className="ml-60 border-l-2 border-secondaryBlack  w-[84.2%] bg-primaryBlack absolute min-h-screen ">
        <header className="flex items-center justify-between mb-8 border-b-2 border-secondaryBlack h-16 pb-5 mx-4 my-6">
          <h1 className="text-white text-3xl font-semibold ml-2">Overview</h1>
          <div className="flex items-center justify-between w-2/5 mr-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                placeholder="Search for something"
                className="p-2 pl-10 bg-secondaryBlack text-white placeholder-gray-400 rounded-full"
              />
            </div>
            <div className="w-1/2 flex justify-center items-center space-x-8">
              <div className='bg-secondaryBlack rounded-full w-10 h-10 flex items-center justify-center'>
                <BellIcon className='text-white h-6 w-6' />
              </div>
              <img
                src="/img/Ellipse.jpg"
                alt="Profile"
                className="h-10 w-10 rounded-full text-white"
              />
            </div>
          </div>
        </header>
        <main className="mx-10 mt-12 grid grid-cols-3 gap-8">
          <section className="bg-secondaryBlack p-8 rounded-lg col-span-2 h-fit">
            <div className='flex h-full'>
              <div className='w-1/2 h-full'>
                <h2 className="text-white text-2xl font-medium mb-4">Get your Designs At One Place</h2>
                <p className="text-gray-400 mb-6">
                  Logo Design Maker wasn’t born out of a boardroom meeting or a desire to replicate the status quo. It stemmed from a genuine passion for design and a frustration with the limitations of AI-generated logos.
                </p>
                <div className="flex space-x-4">
                  <button className="bg-primaryGreen text-primaryBlack px-4 py-2 font-bold rounded-lg">
                    Schedule Meet
                  </button>
                  <button className="border border-primaryGreen text-white px-4 py-2 rounded-lg">
                    Explore
                  </button>
                </div>
              </div>
              <div className='w-1/2 flex items-start justify-center h-full'>
                <img src="/img/Group.png" alt="" />
              </div>
            </div>
          </section>
          <section className="bg-secondaryBlack p-6 rounded-lg">
            <h2 className="text-white text-xl font-semibold mb-4">Calendar</h2>
            <div className='bg-secondaryBlack'>
              <Calendar  className="bg-secondaryBlack" />
            </div>
            <button className="bg-primaryGreen text-primaryBlack px-4 py-2 mt-4 rounded w-full font-bold">
              Schedule Your Meet
            </button>
          </section>
        </main>
        <footer className="mt-8">
          <h2 className="text-white text-4xl text-center">Let's Make Your First Design</h2>
          <div className="flex justify-center mt-4 space-x-4">
            <button className="bg-primaryGreen text-primaryBlack font-bold px-4 py-2 rounded-lg">
              Schedule Meet
            </button>
            <button className="border border-primaryGreen text-white px-4 py-2 rounded-lg">
              Explore
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
