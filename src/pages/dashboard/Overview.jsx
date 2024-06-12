import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { BellIcon } from '@heroicons/react/24/outline';

const Overview = () => {
    const [date, setDate] = useState(new Date());
    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    };
    return (

        <div className="bg-primaryBlack relative">
            <Sidebar />
            <div className="ml-60 w-5/6 bg-primaryBlack min-h-screen p-6">
                <header className="flex items-center justify-between mb-8 border-b-2 border-secondaryBlack h-16 pb-5">
                    <h1 className="text-white text-3xl font-semibold ml-2">Overview</h1>
                    <div className="flex items-center justify-between w-1/2">
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
                        <div className="ml-4 flex justify-center items-center space-x-8">
                            <div className='bg-secondaryBlack rounded-full w-10 h-10 flex items-center justify-center'>
                                <BellIcon className='text-white h-8 w-8' />
                            </div>
                            <img
                                src="/img/Ellipse.jpg"
                                alt="Profile"
                                className="h-10 w-10 rounded-full text-white"
                            />
                        </div>
                    </div>
                </header>
                <main className="ml-8 mt-12 grid grid-cols-3 gap-8">
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
                                <img src="/img/Group.png" alt="Design illustration" />
                            </div>
                        </div>
                    </section>
                    <section className="bg-secondaryBlack p-6 rounded-lg">
                        <h2 className="text-white text-xl font-semibold mb-4">Calendar</h2>
                        <div className='bg-secondaryBlack'>
                            <Calendar
                                onChange={setDate}
                                value={getFirstDayOfMonth(date)}
                                tileClassName={({ activeStartDate, date, view }) => (view === 'month' && date.getDay() === 0 ? 'text-red-600' : null)}
                            />
                        </div>
                        <button className="bg-primaryGreen text-primaryBlack px-4 py-2 mt-4 rounded w-full font-bold">
                            Schedule Your Meet
                        </button>
                    </section>
                </main>
                <section className="mt-8">
                    <h2 className="text-white text-2xl font-semibold mb-4 ml-8">Recent Activity</h2>
                    <div className="bg-secondaryBlack p-6 rounded-lg ml-8">
                        <nav className="flex justify-around mb-4">
                            <a href="#" className="text-primaryGreen border-b-2 border-primaryGreen pb-2">All Meets</a>
                            <a href="#" className="text-white">Scheduled</a>
                            <a href="#" className="text-white">Cancelled</a>
                        </nav>
                        <table className="w-full text-left text-gray-400">
                            <thead>
                                <tr className="border-b border-gray-600">
                                    <th className="py-2">Description</th>
                                    <th className="py-2">Type</th>
                                    <th className="py-2">Date</th>
                                    <th className="py-2">Duration</th>
                                    <th className="py-2">Files</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2">Service number 1</td>
                                    <td className="py-2">Logo design</td>
                                    <td className="py-2">28 Jan, 12.30 AM</td>
                                    <td className="py-2">2 Hr</td>
                                    <td className="py-2"><button className="text-primaryGreen">See Files</button></td>
                                </tr>
                                <tr>
                                    <td className="py-2">Service number 1</td>
                                    <td className="py-2">Magazine design</td>
                                    <td className="py-2">25 Jan, 10.40 PM</td>
                                    <td className="py-2">2 Hr</td>
                                    <td className="py-2"><button className="text-primaryGreen">See Files</button></td>
                                </tr>
                                <tr>
                                    <td className="py-2">Service number 1</td>
                                    <td className="py-2">Logo design</td>
                                    <td className="py-2">20 Jan, 10.40 AM</td>
                                    <td className="py-2">2 Hr</td>
                                    <td className="py-2"><button className="text-primaryGreen">See Files</button></td>
                                </tr>
                                <tr>
                                    <td className="py-2">Service number 1</td>
                                    <td className="py-2">Magazine design</td>
                                    <td className="py-2">15 Jan, 03.29 PM</td>
                                    <td className="py-2">2 Hr</td>
                                    <td className="py-2"><button className="text-primaryGreen">See Files</button></td>
                                </tr>
                                <tr>
                                    <td className="py-2">Service number 1</td>
                                    <td className="py-2">Magazine design</td>
                                    <td className="py-2">14 Jan, 10.40 PM</td>
                                    <td className="py-2">2 Hr</td>
                                    <td className="py-2"><button className="text-primaryGreen">See Files</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Overview;
