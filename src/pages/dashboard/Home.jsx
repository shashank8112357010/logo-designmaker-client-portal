import React from 'react';
import Sidebar from './Sidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from './Header';

const Home = () => {
  return (
    <div className="bg-primaryBlack relative">
      <Sidebar />
      <div className="ml-60 border-l-2 border-secondaryBlack  w-[84.2%] bg-primaryBlack absolute min-h-screen ">
       <Header />
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
